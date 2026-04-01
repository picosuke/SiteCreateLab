(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('blockly/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'blockly/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BlocklyBlockPlusMinus = {}, global.Blockly));
}(this, (function (exports, Blockly) { 'use strict';

    // プラスとマイナスの画像データ
    const plusImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNzFjLTEuMTA0IDAtMiAuODk2LTIgMnMyIC44OTYgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MWMwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==";
    const minusImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAwIDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K";

    // ボタンを作る関数（クリックされたら中身の形を更新する）
    function createPlusField() {
        const plusField = new Blockly.FieldImage(plusImage, 15, 15, '+');
        plusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block.isInFlyout) return;
            Blockly.Events.setGroup(true);
            const oldMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            block.plus(); // プラスの動作を呼ぶ
            const newMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            if (oldMutation !== newMutation) {
                Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldMutation, newMutation));
            }
            Blockly.Events.setGroup(false);
        };
        return plusField;
    }

    function createMinusField(args) {
        const minusField = new Blockly.FieldImage(minusImage, 15, 15, '-');
        minusField.onClick_ = function(e) {
            const block = this.getSourceBlock();
            if (block.isInFlyout) return;
            Blockly.Events.setGroup(true);
            const oldMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            block.minus(args); // マイナスの動作を呼ぶ
            const newMutation = block.mutationToDom ? Blockly.Xml.domToText(block.mutationToDom()) : "";
            if (oldMutation !== newMutation) {
                Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldMutation, newMutation));
            }
            Blockly.Events.setGroup(false);
        };
        return minusField;
    }

    // ★ 公式と同じ必須関数を全て備えた「最強のミューテーター」
    const customIfMutator = {
        elseIfCount_: 0,
        hasElse_: false,

        // 【重要】エラーを防ぐための必須関数たち
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

        // 【ご要望の増え方】
        plus: function() {
            if (!this.hasElse_) {
                this.hasElse_ = true; // 1回目は「でなければ」を追加
            } else {
                this.elseIfCount_++;  // 次からは「でなければもし」を追加
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

        updateShape_: function() {
            // 一旦消す
            if (this.getInput('ELSE')) this.removeInput('ELSE');
            let i = 1;
            while (this.getInput('IF' + i)) {
                this.removeInput('IF' + i);
                this.removeInput('DO' + i);
                i++;
            }

            // 「でなければもし」の追加
            for (let j = 1; j <= this.elseIfCount_; j++) {
                this.appendValueInput('IF' + j)
                    .setCheck('Boolean')
                    .appendField(createMinusField('IF' + j))
                    .appendField('でなければもし');
                this.appendStatementInput('DO' + j)
                    .setCheck('js')
                    .appendField('なら');
            }

            // 「でなければ」の追加
            if (this.hasElse_) {
                this.appendStatementInput('ELSE')
                    .setCheck('js')
                    .appendField(createMinusField('ELSE'))
                    .appendField('でなければ');
            }

            // プラスボタンの設置
            if (this.getInput('IF0') && !this.getField('PLUS')) {
                this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
            }
        }
    };

    // 拡張機能をシステムに登録
    Blockly.Extensions.registerMutator(
        "p_control_if_mutator", 
        customIfMutator, 
        function() { this.updateShape_(); }
    );

})));
