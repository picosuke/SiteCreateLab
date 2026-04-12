(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('blockly/core')) :
typeof define === 'function' && define.amd ? define(['exports', 'blockly/core'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BlocklyBlockPlusMinus = {}, global.Blockly));
}(this, (function (exports, Blockly) { 'use strict';
// --- 画像 ---
const plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTE4IDEwaC00VjZjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAydjRINmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDJoNHY0YzAgMS4xLjkgMiAyIDJzMi0uOSAyLTJ2LTRoNGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==';
const minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTE4IDExSDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyaDEyYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';

function createPlusField(args) {
    const f = new Blockly.FieldImage(plusImage, 15, 15, undefined, plusClick);
    f.args_ = args;
    return f;
}
function createMinusField(args) {
    const f = new Blockly.FieldImage(minusImage, 15, 15, undefined, minusClick);
    f.args_ = args;
    return f;
}

function plusClick(e) {
    const block = e.getSourceBlock();
    if (block.isInFlyout) return;
    block.plus(e.args_);
}

function minusClick(e) {
    const block = e.getSourceBlock();
    if (block.isInFlyout) return;
    block.minus(e.args_);
}

const controlsIfMutator = {

    elseIfCount_: 0,
    hasElse_: false,

    // --- mutation ---
    mutationToDom() {
        if (!this.elseIfCount_ && !this.hasElse_) return null;
        const container = document.createElement('mutation');
        if (this.elseIfCount_) container.setAttribute('elseif', this.elseIfCount_);
        if (this.hasElse_) container.setAttribute('else', 1);
        return container;
    },

    domToMutation(xmlElement) {
        this.elseIfCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.hasElse_ = !!parseInt(xmlElement.getAttribute('else'), 10);
        this.updateShape_();
    },

    saveExtraState() {
        if (!this.elseIfCount_ && !this.hasElse_) return null;
        return {
            elseIfCount: this.elseIfCount_,
            hasElse: this.hasElse_
        };
    },

    loadExtraState(state) {
        this.elseIfCount_ = state['elseIfCount'] || 0;
        this.hasElse_ = state['hasElse'] || false;
        this.updateShape_();
    },

    // --- ＋ ---
    plus() {
        if (!this.hasElse_) {
            this.hasElse_ = true;
        } else {
            this.elseIfCount_++;
        }
        this.updateShape_();
    },

    // --- － ---
    minus(inputId) {
        if (inputId === 'ELSE') {
            // ★ 「一番下をELSEに昇格」するロジックを削除し、素直にELSEを消す
            this.hasElse_ = false;
        } else {
            this.elseIfCount_--;
            // ★ 追加: どの「ではなく」が消されたかを記憶しておく（間が抜けた時に上に詰めるため）
            this.removeElseIfIndex_ = inputId;
        }
        this.updateShape_();
    },

    // --- 描画 ---
    updateShape_() {
        // ★ ここにあった「自動ELSE維持」のロジックを削除しました

        // --- 接続保存 ---
        const connections = [];
        let i = 1;
        while (this.getInput('IF' + i)) {
            // ★ 修正: 消された行のブロック接続は保存せず、下のブロックを上に詰める
            if (i !== this.removeElseIfIndex_) {
                connections.push({
                    if: this.getInput('IF' + i).connection.targetConnection,
                    do: this.getInput('DO' + i).connection.targetConnection
                });
            }
            i++;
        }
        this.removeElseIfIndex_ = null; // 記憶をリセット

        let elseConn = null;
        if (this.getInput('ELSE')) {
            elseConn = this.getInput('ELSE').connection.targetConnection;
        }

        // --- 全削除 ---
        i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('THEN' + i);
            this.removeInput('DO' + i);
            i++;
        }
        if (this.getInput('ELSE_ROW')) this.removeInput('ELSE_ROW');
        if (this.getInput('ELSE')) this.removeInput('ELSE');

        // --- elseif ---
        for (let j = 1; j <= this.elseIfCount_; j++) {

            this.appendValueInput('IF' + j)
                .setCheck('Boolean')
                .appendField(createMinusField(j))
                .appendField('ではなく もし');

            this.appendDummyInput('THEN' + j)
                .appendField('なら');

            this.appendStatementInput('DO' + j)
                .setCheck('js');

            // 接続復元
            if (connections[j - 1]) {
                if (connections[j - 1].if) {
                    this.getInput('IF' + j).connection.connect(connections[j - 1].if);
                }
                if (connections[j - 1].do) {
                    this.getInput('DO' + j).connection.connect(connections[j - 1].do);
                }
            }
        }

        // --- else ---
        if (this.hasElse_) {

            this.appendDummyInput('ELSE_ROW')
                .appendField(createMinusField('ELSE'))
                .appendField('でなければ');

            this.appendStatementInput('ELSE')
                .setCheck('js');

            // 復元
            if (elseConn) {
                this.getInput('ELSE').connection.connect(elseConn);
            }
        }

        // --- ＋ボタン ---
        if (this.getInput('IF0') && !this.getField('PLUS')) {
            this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
        }

        this.setInputsInline(true);
    }
};

Blockly.Extensions.registerMutator(
    'scl_if_mutator',
    controlsIfMutator,
    function () {
        this.elseIfCount_ = 0;
        this.hasElse_ = false;
        this.updateShape_();
    }
);
})));
