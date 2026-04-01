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
    // Site Create Lab 専用：完全日本語版 プラスマイナスプラグイン
    // ==========================================

    const plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAybDRWMTRINmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDJoNHY0YzAgMS4xLjkgMiAyIDJzMi0uOSAyLTJ2LTRoNGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';
    const minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTExSDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyaDEyYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnoiIGZpbGw9IndoaXRlIiAvPjwvc3ZnPgo=';

    // ★ エラー回避：公式プラグインと同じように「クラス」として機能を作る
    const controlsIfMutator = {
        elseifCount_: 0,
        elseCount_: 0,

        saveExtraState: function() {
            return {
                'elseIfCount': this.elseifCount_,
                'hasElse': this.elseCount_ > 0,
            };
        },
        loadExtraState: function(state) {
            this.elseifCount_ = state['elseIfCount'] || 0;
            this.elseCount_ = state['hasElse'] ? 1 : 0;
            this.updateShape_();
        },

        plus: function() {
            if (this.elseCount_ === 0) {
                this.elseCount_ = 1;
            } else {
                this.elseifCount_++;
            }
            this.updateShape_();
        },

        minus: function(id) {
            if (this.elseCount_ > 0 && id === 'ELSE') {
                this.elseCount_ = 0;
            } else {
                this.elseifCount_--;
            }
            this.updateShape_();
        },

        updateShape_: function() {
            if (this.getInput('ELSE')) this.removeInput('ELSE');
            let i = 1;
            while (this.getInput('IF' + i)) {
                this.removeInput('IF' + i);
                this.removeInput('DO' + i);
                i++;
            }

            for (let j = 1; j <= this.elseifCount_; j++) {
                this.appendValueInput('IF' + j)
                    .setCheck('Boolean')
                    // ★ 美しい日本語に書き換え！
                    .appendField(createMinusField('IF' + j))
                    .appendField('でなければもし');
                
                this.appendStatementInput('DO' + j)
                    .setCheck('js')
                    .appendField('なら');
            }

            if (this.elseCount_) {
                this.appendStatementInput('ELSE')
                    .setCheck('js')
                    // ★ 美しい日本語に書き換え！
                    .appendField(createMinusField('ELSE'))
                    .appendField('でなければ');
            }
            
            if (this.getInput('IF0') && !this.getField('PLUS')) {
                this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
            }
        }
    };

    function createPlusField() {
        const plusField = new Blockly.FieldImage(plusImage, 15, 15, '+');
        plusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block && block.plus) {
                block.plus();
            }
        };
        return plusField;
    }

    function createMinusField(inputId) {
        const minusField = new Blockly.FieldImage(minusImage, 15, 15, '-');
        minusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block && block.minus) {
                block.minus(inputId);
            }
        };
        return minusField;
    }

    // ==========================================
    // ★ エラー回避：Blockly公式と「全く同じ方法」で登録する
    // （registerMutatorではなく、registerとcompose/decomposeのダミーを使う）
    // ==========================================
    Blockly.Extensions.register(
        'scl_if_mutator', // 名前
        function() {
            // この関数が、ブロックが作られた瞬間に走る
            this.elseifCount_ = 0;
            this.elseCount_ = 0;
            
            // ブロックにメソッド（機能）を直接追加する（Mixin）
            this.saveExtraState = controlsIfMutator.saveExtraState;
            this.loadExtraState = controlsIfMutator.loadExtraState;
            this.plus = controlsIfMutator.plus;
            this.minus = controlsIfMutator.minus;
            this.updateShape_ = controlsIfMutator.updateShape_;
            
            // 初回の形を作る
            this.updateShape_();
        }
    );

})));
