/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('blockly/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'blockly/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BlocklyBlockPlusMinus = {}, global.Blockly));
}(this, (function (exports, Blockly) { 'use strict';

    // 状態を文字列にするヘルパー関数
    function getMutationState(block) {
        if (block.saveExtraState) {
            const state = block.saveExtraState();
            return state ? JSON.stringify(state) : "";
        }
        if (block.mutationToDom) {
            const dom = block.mutationToDom();
            return dom ? Blockly.Xml.domToText(dom) : "";
        }
        return "";
    }

    // ==========================================
    // ボタン作成関数
    // ==========================================
    const plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNzFjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MWMwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
    const minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTExSDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyaDEyYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnoiIGZpbGw9IndoaXRlIiAvPjwvc3ZnPgo=';

    function createPlusField(args = undefined) {
        const plusField = new Blockly.FieldImage(plusImage, 15, 15, undefined, plusClick);
        plusField.args_ = args;
        return plusField;
    }
    function plusClick(e) {
        const block = e.getSourceBlock();
        if (block.isInFlyout) return;
        Blockly.Events.setGroup(true);
        const oldState = getMutationState(block);
        
        block.plus(e.args_); 
        
        const newState = getMutationState(block);
        if (oldState !== newState) {
            Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldState, newState));
        }
        Blockly.Events.setGroup(false);
    }

    function createMinusField(args = undefined) {
        const minusField = new Blockly.FieldImage(minusImage, 15, 15, undefined, minusClick);
        minusField.args_ = args;
        return minusField;
    }
    function minusClick(e) {
        const block = e.getSourceBlock();
        if (block.isInFlyout) return;
        Blockly.Events.setGroup(true);
        const oldState = getMutationState(block);
        
        block.minus(e.args_); 
        
        const newState = getMutationState(block);
        if (oldState !== newState) {
            Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldState, newState));
        }
        Blockly.Events.setGroup(false);
    }

    // ==========================================
    // ifブロックのミューテーター（完全日本語・理想の増減版）
    // ==========================================
    const controlsIfMutator = {
        elseIfCount_: 0,
        hasElse_: false,

        mutationToDom: function() {
            if (!this.elseIfCount_ && !this.hasElse_) return null;
            const container = document.createElement('mutation');
            if (this.elseIfCount_) container.setAttribute('elseif', this.elseIfCount_);
            if (this.hasElse_) container.setAttribute('else', 1);
            return container;
        },
        domToMutation: function(xmlElement) {
            this.elseIfCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
            this.hasElse_ = !!parseInt(xmlElement.getAttribute('else'), 10);
            this.updateShape_();
        },
        saveExtraState: function() {
            if (!this.elseIfCount_ && !this.hasElse_) return null;
            const state = Object.create(null);
            if (this.elseIfCount_) state['elseIfCount'] = this.elseIfCount_;
            if (this.hasElse_) state['hasElse'] = true;
            return state;
        },
        loadExtraState: function(state) {
            this.elseIfCount_ = state['elseIfCount'] || 0;
            this.hasElse_ = state['hasElse'] || false;
            this.updateShape_();
        },

        // 【理想の増え方】
        plus: function() {
            if (!this.hasElse_) {
                this.hasElse_ = true; // 1回目は「でなければ」
            } else {
                this.elseIfCount_++;  // 次からは「でなければもし」
            }
            this.updateShape_();
        },
        minus: function(inputId) {
            if (inputId === 'ELSE') {
                this.hasElse_ = false;
            } else {
                this.elseIfCount_--;
            }
            this.updateShape_();
        },

        // 【理想のレイアウト】
        // 【理想のレイアウト】
        updateShape_: function() {
            // 一旦消す
            if (this.getInput('ELSE')) this.removeInput('ELSE');
            let i = 1;
            while (this.getInput('IF' + i)) {
                this.removeInput('IF' + i);
                this.removeInput('DO' + i);
                i++;
            }

            // 「ではなく もし ＜＞ なら」の追加（1行にまとめる）
            for (let j = 1; j <= this.elseIfCount_; j++) {
                this.appendValueInput('IF' + j)
                    .setCheck('Boolean')
                    .appendField(createMinusField(j), 'MINUS' + j) // マイナスボタン
                    // ★ 魔法の順番：「ではなく」＋「もし」＋[条件の穴]＋「なら」
                    .appendField('ではなく もし') 
                    .appendField('なら', 'THEN' + j); 
                
                // 処理の穴を追加
                this.appendStatementInput('DO' + j)
                    .setCheck('js');
            }

            // 「でなければ」の追加
            if (this.hasElse_) {
                // ★ 重要な修正：StatementInput ではなく、DummyInput と StatementInput を分ける！
                // これにより「でなければ」の文字が改行されず、左端から綺麗に表示されます
                this.appendDummyInput('ELSE_LABEL')
                    .appendField(createMinusField('ELSE'), 'MINUS_ELSE')
                    .appendField('でなければ');
                this.appendStatementInput('ELSE')
                    .setCheck('js');
            }

            // 一番最初の「もし」にプラスボタンを付ける
            if (this.getInput('IF0') && !this.getField('PLUS')) {
                this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
            }

            // ★ 超重要：追加された穴もすべて「インライン（横並び）」として扱うように命令！
            // これで画像の一番上のブロックと同じ、美しい形が全体に適用されます
            this.setInputsInline(true);
        }
    };

    // Blocklyに新しい名前で登録する
    Blockly.Extensions.registerMutator(
        'scl_if_mutator', // ★ 新しい名前
        controlsIfMutator,
        function() {
            this.elseIfCount_ = 0;
            this.hasElse_ = false;
            this.updateShape_();
        }
    );

})));
