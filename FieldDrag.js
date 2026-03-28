class FieldDragArg extends Blockly.FieldLabel {
    constructor(value) {
        super(value);
        this.CURSOR = 'grab'; // マウスを乗せると「掴める手」になる
    }

    initView() {
        // フィールドの背景（ExtForgeのような角丸の枠）を作る
        this.borderRect_ = Blockly.utils.dom.createSvgElement(
            'rect',
            {
                'rx': 12, 'ry': 12, // 綺麗な角丸
                'fill': '#ff6b5c',  // 背景色（少し明るい赤）
                'stroke': '#cc4a3d',// 枠線
                'stroke-width': 1
            },
            this.fieldGroup_
        );

        super.initView();

        // 文字色を白にして太字にする
        this.textElement_.setAttribute('fill', '#ffffff');
        this.textElement_.style.fontWeight = 'bold';

        // マウスダウン（ドラッグ開始）のイベントを捕まえる
        this.getSvgRoot().addEventListener('mousedown', (e) => this.onMouseDown_(e));
    }

    updateSize_() {
        super.updateSize_();
        if (this.borderRect_) {
            // 文字の長さに合わせて背景の枠をピッタリ広げる
            const width = this.size_.width + 20;
            const height = this.size_.height + 8;
            this.borderRect_.setAttribute('width', width);
            this.borderRect_.setAttribute('height', height);
            this.borderRect_.setAttribute('y', -4);
            this.textElement_.setAttribute('x', 10);
            this.size_.width = width;
        }
    }

    onMouseDown_(e) {
        if (e.button !== 0) return; // 左クリック以外は無視
        e.stopPropagation(); // ★重要：親の関数ブロックを一緒に掴まないようにする

        const workspace = this.sourceBlock_.workspace;
        
        Blockly.Events.disable();
        let newBlock;
        try {
            // 1. 取り出して使えるレポーターブロックを生成
            newBlock = workspace.newBlock('KS_ARG_REPORTER');
            newBlock.setFieldValue(this.getValue(), 'ARG_NAME');
            newBlock.initSvg();
            newBlock.render();

            // 2. マウスの現在位置（クリックした場所）に新しいブロックを瞬間移動させる
            const svgPoint = workspace.getParentSvg().createSVGPoint();
            svgPoint.x = e.clientX;
            svgPoint.y = e.clientY;
            const ctm = workspace.getInjectionDiv().getScreenCTM().inverse();
            const pt = svgPoint.matrixTransform(ctm);
            newBlock.moveBy(pt.x - 20, pt.y - 10);
            
        } finally {
            Blockly.Events.enable();
        }

        // 3. ここが魔法の核心：新しいブロックのドラッグを強制的にスタートさせる！
        const gesture = new Blockly.Gesture(e, workspace);
        workspace.currentGesture_ = gesture; // Blocklyのシステムに登録
        gesture.setTargetBlock(newBlock);
        gesture.doStart(e); // ドラッグ開始！
    }
}
// この魔法のフィールドをシステムに登録
Blockly.fieldRegistry.register('field_drag_arg', FieldDragArg);
