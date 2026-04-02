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

    // プラス・マイナスの画像データ
    const plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNzFjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MWMwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
    const minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTExSDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyaDEyYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnoiIGZpbGw9IndoaXRlIiAvPjwvc3ZnPgo=';

    // ボタン作成関数（公式のまま）
    function createPlusField(args = undefined) {
        const plusField = new Blockly.FieldImage(plusImage, 15, 15, undefined, plusClick);
        plusField.args_ = args;
        return plusField;
    }
    function plusClick(e) {
        const block = e.getSourceBlock();
        if (block.isInFlyout) return;
        Blockly.Events.setGroup(true);
        const oldMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
        block.plus(e.args_);
        const newMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
        if (oldMutation !== newMutation) {
            Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldMutation, newMutation));
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
        const oldMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
        block.minus(e.args_);
        const newMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
        if (oldMutation !== newMutation) {
            Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldMutation, newMutation));
        }
        Blockly.Events.setGroup(false);
    }

    // ==========================================
    // 公式プラグインそのままのロジック
    // ==========================================
    const controlsIfMutator = {
        elseIfCount_: 0,
        hasElse_: false,

        mutationToDom: function() {
            if (!this.elseIfCount_ && !this.hasElse_) return null;
            const container = Blockly.utils.xml.createElement('mutation');
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

        // 公式の増え方（1回目: else if, 2回目: else if...）
        plus: function() {
            this.elseIfCount_++;
            this.updateShape_();
        },
        minus: function(inputId) {
            if (this.elseIfCount_ === 0) return;
            this.elseIfCount_--;
            this.updateShape_();
        },

        updateShape_: function() {
            // お掃除
            if (this.getInput('ELSE')) this.removeInput('ELSE');
            let i = 1;
            while (this.getInput('IF' + i)) {
                this.removeInput('IF' + i);
                this.removeInput('DUMMY' + i); // ★ 追加したダミーも消す
                this.removeInput('DO' + i);
                i++;
            }

            // 追加
            for (let j = 1; j <= this.elseIfCount_; j++) {
                // ★ 1行目：「でなければもし」＋ 条件穴 ＋「なら」 ＋ マイナスボタン
                this.appendValueInput('IF' + j)
                    .setCheck('Boolean')
                    .appendField('でなければもし')
                    .appendField('なら', 'THEN' + j) // ← これが条件の後ろにつく魔法
                    .appendField(createMinusField(j), 'MINUS' + j);
                
                // ★ 改行用のダミー
                this.appendDummyInput('DUMMY' + j);

                // ★ 2行目：文字のない処理の穴
                this.appendStatementInput('DO' + j)
                    .setCheck('js');
            }

            if (this.hasElse_) {
                this.appendStatementInput('ELSE')
                    .appendField('でなければ');
            }

            // プラスボタン（IF0がない場合は追加する）
            if (this.getInput('IF0') && !this.getField('PLUS')) {
                this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
            }
        }
    };

    // 公式プラグインと同じように「scl_if_mutator」として登録
    Blockly.Extensions.registerMutator(
        'scl_if_mutator',
        controlsIfMutator,
        function() {
            this.elseifCount_ = 0;
            this.elseCount_ = 0;
            this.updateShape_();
        }
    );

})));
