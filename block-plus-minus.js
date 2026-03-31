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
    // Site Create Lab 専用魔改造プラグイン
    // ==========================================

    const plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAybDRWMTRINmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDJoNHY0YzAgMS4xLjkgMiAyIDJzMi0uOSAyLTJ2LTRoNGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';
    const minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTFINmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDJoMTJjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';

    // ----------------------------------------------------
    // 【重要】文字（ラベル）の日本語化と、増え方のカスタマイズ
    // ----------------------------------------------------
    const controlsIfMutator = {
        elseifCount_: 0,
        elseCount_: 0,

        // ブロックが読み込まれた時に1回だけ呼ばれる
        suppressPrefixSuffix: true,
        
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

        // 【＋】ボタンを押した時の動作（理想の増え方にする）
        plus: function(workspace) {
            // まだ「でなければ（else）」がなければ、それを追加する
            if (this.elseCount_ === 0) {
                this.elseCount_ = 1;
            } 
            // すでに「でなければ」があるなら、その間に「でなければもし（else if）」を追加する
            else {
                this.elseifCount_++;
            }
            this.updateShape_();
        },

        // 【−】ボタンを押した時の動作（減らし方）
        minus: function(id) {
            if (this.elseCount_ > 0 && id === 'ELSE') {
                this.elseCount_ = 0;
            } else {
                this.elseifCount_--;
            }
            this.updateShape_();
        },

        // 形を作る（ここで日本語の文字を指定する！）
        updateShape_: function() {
            // 一旦、追加分の穴をすべて消す（初期化）
            if (this.getInput('ELSE')) this.removeInput('ELSE');
            let i = 1;
            while (this.getInput('IF' + i)) {
                this.removeInput('IF' + i);
                this.removeInput('DO' + i);
                i++;
            }

            // 1. 「でなければもし（else if）」の穴を作る
            for (let j = 1; j <= this.elseifCount_; j++) {
                this.appendValueInput('IF' + j)
                    .setCheck('Boolean')
                    // ★ ここが日本語化のポイント！
                    .appendField(createMinusField('IF' + j))
                    .appendField('でなければもし');
                
                this.appendStatementInput('DO' + j)
                    .setCheck('js')
                    .appendField('なら');
            }

            // 2. 「でなければ（else）」の穴を作る
            if (this.elseCount_) {
                this.appendStatementInput('ELSE')
                    .setCheck('js')
                    // ★ ここが日本語化のポイント！
                    .appendField(createMinusField('ELSE'))
                    .appendField('でなければ');
            }
            
            // 3. 一番最初の「もし」の横に「＋」ボタンをつける
            if (this.getInput('IF0') && !this.getField('PLUS')) {
                this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
            }
        }
    };

    // ----------------------------------------------------
    // ボタンを作る便利関数
    // ----------------------------------------------------
    function createPlusField() {
        const plusField = new Blockly.FieldImage(plusImage, 15, 15, '+');
        plusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block && block.plus) {
                block.plus(block.workspace);
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

    // ----------------------------------------------------
    // Site Create Lab 専用に拡張機能を登録
    // ----------------------------------------------------
    Blockly.Extensions.registerMutator(
        'controls_if_mutator', // 名前は元のままで上書きする
        controlsIfMutator,
        function() {
            this.elseifCount_ = 0;
            this.elseCount_ = 0;
            this.updateShape_();
        }
    );

})));
