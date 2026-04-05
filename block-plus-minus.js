(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('blockly/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'blockly/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BlocklyBlockPlusMinus = {}, global.Blockly));
}(this, (function (exports, Blockly) { 'use strict';

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
        Blockly.Events.setGroup(true);
        const oldState = getMutationState(block);

        block.plus(e.args_);

        const newState = getMutationState(block);
        if (oldState !== newState) {
            Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, oldState, newState));
        }
        Blockly.Events.setGroup(false);
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

    const controlsIfMutator = {
        elseIfCount_: 0,
        hasElse_: false,

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

        plus() {
            if (!this.hasElse_) {
                this.hasElse_ = true;
            } else {
                this.elseIfCount_++;
            }
            this.updateShape_();
        },

        minus(inputId) {
            if (inputId === 'ELSE') {
                this.hasElse_ = false;
            } else {
                this.elseIfCount_--;
            }
            this.updateShape_();
        },

        updateShape_() {

            // --- 接続保存 ---
            const connections = [];
            let i = 1;
            while (this.getInput('IF' + i)) {
                connections.push({
                    if: this.getInput('IF' + i).connection.targetConnection,
                    do: this.getInput('DO' + i).connection.targetConnection
                });
                i++;
            }
            const elseConn = this.getInput('ELSE_DO')?.connection.targetConnection;

            // --- 全削除 ---
            i = 1;
            while (this.getInput('IF' + i)) {
                this.removeInput('IF' + i);
                this.removeInput('THEN' + i);
                this.removeInput('DO' + i);
                i++;
            }
            if (this.getInput('ELSE_ROW')) this.removeInput('ELSE_ROW');
            if (this.getInput('ELSE_DO')) this.removeInput('ELSE_DO');

            // --- elseif ---
            for (let j = 1; j <= this.elseIfCount_; j++) {

                // ① 条件（前半）
                this.appendValueInput('IF' + j)
                    .setCheck('Boolean')
                    .appendField(createMinusField(j))
                    .appendField('ではなく もし');

                // ② 「なら」専用（これでズレ防止）
                this.appendDummyInput('THEN' + j)
                    .appendField('なら');

                // ③ 処理
                this.appendStatementInput('DO' + j)
                    .setCheck('js');

                // --- 接続復元 ---
                if (connections[j - 1]) {
                    if (connections[j - 1].if) {
                        this.getInput('IF' + j).connection.connect(connections[j - 1].if);
                    }
                    if (connections[j - 1].do) {
                        this.getInput('DO' + j).connection.connect(connections[j - 1].do);
                    }
                }
            }

            // --- else（必ず最後） ---
            if (this.hasElse_ || this.elseIfCount_ > 0) {
                this.hasElse_ = true; // ★ 強制維持

                this.appendDummyInput('ELSE_ROW')
                    .appendField(createMinusField('ELSE'))
                    .appendField('でなければ');

                this.appendStatementInput('ELSE_DO')
                    .setCheck('js');

                if (elseConn) {
                    this.getInput('ELSE_DO').connection.connect(elseConn);
                }
            }

            // --- プラス ---
            if (this.getInput('IF0') && !this.getField('PLUS')) {
                this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
            }
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
