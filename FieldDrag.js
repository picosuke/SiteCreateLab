// ==========================================
// ★ 究極の魔法：ドラッグでクローンを生み出す専用フィールド（完全版）
// ==========================================
class FieldDragArg extends Blockly.FieldLabel {
    constructor(value) {
        super(value);
        this.CURSOR = 'grab'; // マウスを乗せると「掴める手」になる
    }

    initView() {
        // フィールドの背景（角丸の枠）を作る
        this.borderRect_ = Blockly.utils.dom.createSvgElement(
            'rect',
            {
                'rx': 12, 'ry': 12, 
                'fill': '#ff6b5c', 
                'stroke': '#cc4a3d',
                'stroke-width': 1
            },
            this.fieldGroup_
        );

        super.initView();

        // 文字色を白にして太字にする
        this.textElement_.setAttribute('fill', '#ffffff');
        this.textElement_.style.fontWeight = 'bold';

        // ★ エラー修正箇所1：addEventListener をやめて、Blocklyのシステムに登録！
        // （これでクリックが2回反応するバグが消えます）
        Blockly.browserEvents.bind(this.getSvgRoot(), 'mousedown', this, this.onMouseDown_);
    }

    updateSize_() {
        super.updateSize_();
        if (this.borderRect_) {
            const width = this.size_.width + 20;
            const height = this.size_.height + 8;
            this.borderRect_.setAttribute('width', width);
            this.borderRect_.setAttribute('height', height);
            this.borderRect_.setAttribute('y', -4);
            this.textElement_.setAttribute('x', 10);
            this.size_.width = width;
        }
    }

    // ★ エラー修正箇所2：安全で確実なドラッグの開始処理
    onMouseDown_(e) {
        if (e.button !== 0) return; // 左クリック以外は無視
        e.stopPropagation(); // 親の関数ブロックを一緒に掴まないようにする

        const workspace = this.sourceBlock_.workspace;
        
        Blockly.Events.disable();
        let newBlock;
        try {
            // 1. 取り出して使えるレポーターブロックを生成
            newBlock = workspace.newBlock('KS_ARG_REPORTER');
            newBlock.setFieldValue(this.getValue(), 'ARG_NAME');
            newBlock.initSvg();
            newBlock.render();

            // 2. 親ブロックの少し右下にクローンを瞬間移動させる
            const blockXY = this.sourceBlock_.getRelativeToSurfaceXY();
            newBlock.moveBy(blockXY.x + 15, blockXY.y + 15);
            
        } finally {
            Blockly.Events.enable();
        }

        // 3. 【重要】Blockly(v10)の正しいドラッグ開始ジェスチャー！
        // 前のコードは「start workspace is undefined」というエラーが出ていたので、正しく引数を渡します
        const gesture = new Blockly.Gesture(e, workspace);
        workspace.currentGesture_ = gesture;
        
        // ジェスチャーに「今マウスで触っているのはこの新しいブロックだ」と教える
        gesture.setStartBlock(newBlock);
        gesture.setTargetBlock(newBlock);
        
        // エラーを出さずにスムーズにドラッグを開始する
        gesture.doStart(e);
    }
}
// この魔法のフィールドをシステムに登録
Blockly.fieldRegistry.register('field_drag_arg', FieldDragArg);
