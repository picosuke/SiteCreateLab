Blockly.Extensions.registerMutator(
  'ks_mutator',
  {
    arguments_: [], 

    saveExtraState: function() { return { 'arguments': this.arguments_ }; },
    loadExtraState: function(state) { this.arguments_ = state['arguments'] || []; this.updateShape_(); },
    decompose: function(workspace) {
      const containerBlock = workspace.newBlock('ks_mutator_container');
      containerBlock.initSvg();
      let connection = containerBlock.getInput('STACK').connection;
      for (let i = 0; i < this.arguments_.length; i++) {
        const argBlock = workspace.newBlock('ks_mutator_arg');
        argBlock.initSvg();
        argBlock.setFieldValue(this.arguments_[i], 'NAME');
        connection.connect(argBlock.previousConnection);
        connection = argBlock.nextConnection;
      }
      return containerBlock;
    },
    compose: function(containerBlock) {
      this.arguments_ = [];
      let clauseBlock = containerBlock.getInputTargetBlock('STACK');
      while (clauseBlock) {
        if (clauseBlock.type === 'ks_mutator_arg') {
          this.arguments_.push(clauseBlock.getFieldValue('NAME'));
        }
        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
      }
      this.updateShape_();
    },
    
    updateShape_: function() {
      let existingArgs = 0;
      while (this.getInput('ARG' + existingArgs)) {
        this.removeInput('ARG' + existingArgs);
        existingArgs++;
      }

      for (let i = 0; i < this.arguments_.length; i++) {
        let argName = this.arguments_[i];
        
        let input = this.appendValueInput('ARG' + i)
                        .setAlign(Blockly.inputs.Align.RIGHT);
                        
        // ★【安全なロック】この穴には、この世に存在しない型のブロックしか入らないようにする
        input.setCheck('NO_CONNECTION');
                        
        if (i === 0) {
            input.appendField("引数");
        }

        if (this.getInput('js')) {
          this.moveInputBefore('ARG' + i, 'js');
        }

        Blockly.Events.disable();
        try {
            let shadow = this.workspace.newBlock('KS_ARG_REPORTER');
            shadow.setShadow(true);
            shadow.setFieldValue(argName, 'ARG_NAME');
            shadow.initSvg();
            shadow.render();
            
            // ★ シャドウブロックをはめる一瞬だけロックを解除し、すぐまた鍵をかける！
            input.setCheck(null);
            input.connection.connect(shadow.outputConnection);
            input.setCheck('NO_CONNECTION');
            
        } finally {
            Blockly.Events.enable();
        }
      }

      if (!this.getInput('js')) {
        this.appendStatementInput('js')
            .setCheck('js')
      }
    }
  },
  function() { this.updateShape_(); },
  ['ks_mutator_arg']
);

// ==========================================
// ★ 安全なハック：シャドウブロックを掴むとクローンになる
// ==========================================
const origOnMouseDown = Blockly.BlockSvg.prototype.onMouseDown_;

Blockly.BlockSvg.prototype.onMouseDown_ = function(e) {
    if (this.isShadow() && this.type === 'KS_ARG_REPORTER') {
        const workspace = this.workspace;
        const gesture = workspace.getGesture(e);

        if (e.button === 0 && gesture) {
            Blockly.Events.disable();
            let clone;
            try {
                clone = workspace.newBlock('KS_ARG_REPORTER');
                clone.setFieldValue(this.getFieldValue('ARG_NAME'), 'ARG_NAME');

                const targetConn = this.outputConnection.targetConnection;
                if (targetConn) {
                    const parentInputName = targetConn.getParentInput().name;
                    const parentFunctionBlock = this.getParent();
                    clone.data = JSON.stringify({
                        parentId: parentFunctionBlock.id,
                        inputName: parentInputName,
                        originalName: this.getFieldValue('ARG_NAME')
                    });
                }

                clone.initSvg();
                clone.render();

                const xy = this.getRelativeToSurfaceXY();
                clone.moveBy(xy.x, xy.y);
            } finally {
                Blockly.Events.enable();
            }

            gesture.setTargetBlock(clone);
            gesture.handleWsStart(e, workspace);
            return; 
        }
    }
    origOnMouseDown.call(this, e);
};

workspace.addChangeListener(function(e) {
    // もしイベントが「ブロックの変更（BLOCK_CHANGE）」だったら
    if (e.type === Blockly.Events.BLOCK_CHANGE) {
        
        // 変更されたブロックを取得
        const changedBlock = workspace.getBlockById(e.blockId);
        if (!changedBlock) return;

        // 1. 【本体が更新された場合】関数ブロック（KS）の歯車が閉じられて、引数が再生成された時
        if (changedBlock.type === 'KS' && changedBlock.arguments_) {
            
            // ワークスペース上の「すべての引数クローン」を探す
            const allBlocks = workspace.getAllBlocks(false);
            for (let i = 0; i < allBlocks.length; i++) {
                let clone = allBlocks[i];
                
                // もしそれがクローン（KS_ARG_REPORTER で、親情報 data がある）なら
                if (clone.type === 'KS_ARG_REPORTER' && clone.data) {
                    try {
                        let cloneData = JSON.parse(clone.data);
                        
                        // 「自分を生み出した関数ブロック」が、今回変更されたブロックだったら
                        if (cloneData.parentId === changedBlock.id) {
                            
                            // 自分のいた穴（例：ARG0）が、新しい引数リストの何番目か調べる
                            let argIndex = parseInt(cloneData.inputName.replace('ARG', ''));
                            
                            // もしその番号の引数がまだ存在していれば、新しい名前に更新する！
                            if (argIndex >= 0 && argIndex < changedBlock.arguments_.length) {
                                let newName = changedBlock.arguments_[argIndex];
                                
                                // 名前が変わっていたら更新し、記憶データも書き換える
                                if (clone.getFieldValue('ARG_NAME') !== newName) {
                                    clone.setFieldValue(newName, 'ARG_NAME');
                                    cloneData.originalName = newName;
                                    clone.data = JSON.stringify(cloneData);
                                }
                            }
                        }
                    } catch (err) {
                        // dataがJSONじゃなかった場合は無視
                    }
                }
            }
        }
    }
});
