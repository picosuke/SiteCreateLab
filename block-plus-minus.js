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

    // ==========================================
    // Site Create Lab 専用魔改造プラグイン (Zelos最適化・完全版)
    // ==========================================

    const plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNzFjLTEuMTA0IDAtMiAuODk2LTIgMnMyIC44OTYgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MWMwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
    const minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTExSDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyaDEyYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnoiIGZpbGw9IndoaXRlIiAvPjwvc3ZnPgo=';

    // 先に関数を定義しておくことでエラーを回避します
    function createPlusField() {
        const plusField = new Blockly.FieldImage(plusImage, 15, 15, '+');
        plusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block.isInFlyout) return;
            Blockly.Events.setGroup(true);
            const oldMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            
            if (typeof block.plus === 'function') block.plus();
            
            const newMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            if (oldMutation !== newMutation) {
                Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldMutation, newMutation));
            }
            Blockly.Events.setGroup(false);
        };
        return plusField;
    }

    function createMinusField(inputId) {
        const minusField = new Blockly.FieldImage(minusImage, 15, 15, '-');
        minusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block.isInFlyout) return;
            Blockly.Events.setGroup(true);
            const oldMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            
            if (typeof block.minus === 'function') block.minus(inputId);
            
            const newMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            if (oldMutation !== newMutation) {
                Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldMutation, newMutation));
            }
            Blockly.Events.setGroup(false);
        };
        return minusField;
    }

    // ==========================================
    // 拡張機能の登録
    // ==========================================
    Blockly.Extensions.register(
        'scl_if_mutator',
        function() {
            this.elseIfCount_ = 0;
            this.hasElse_ = false;

            this.mixin({
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

                plus: function() {
                    if (!this.hasElse_) {
                        this.hasElse_ = true;
                    } else {
                        this.elseIfCount_++;
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

                // ★ Zelosのインライン表示（美しい改行レイアウト）に最適化された形作り
                updateShape_: function() {
                    if (this.getInput('ELSE')) this.removeInput('ELSE');
                    let i = 1;
                    while (this.getInput('IF' + i)) {
                        this.removeInput('IF' + i);
                        this.removeInput('DO' + i);
                        i++;
                    }

                    for (let j = 1; j <= this.elseIfCount_; j++) {
                        // 【変更点1】「なら」を条件の穴の後ろにくっつける（これで1行になる）
                        this.appendValueInput('IF' + j)
                            .setCheck('Boolean')
                            .appendField(createMinusField('IF' + j))
                            .appendField('でなければもし')
                            .appendField('なら', 'THEN' + j); // ★文字として追加
                        
                        // 【変更点2】DOには文字を入れない
                        this.appendStatementInput('DO' + j)
                            .setCheck('js');
                    }

                    if (this.hasElse_) {
                        this.appendStatementInput('ELSE')
                            .setCheck('js')
                            .appendField(createMinusField('ELSE'))
                            .appendField('でなければ');
                    }

                    if (this.getInput('IF0') && !this.getField('PLUS')) {
                        this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
                    }

                    // ★重要：横並びを解除することで、DO（コの字の穴）が綺麗に次の行に落ちる！
                    this.setInputsInline(false);
                }
            });
            
            this.updateShape_();
        }
    );

})));
