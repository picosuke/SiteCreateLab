// ① 定数設定
class TicketConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        // ここでへこみの半径を指定（20〜30くらいがかっこいいです）
        this.CUSTOM_TICKET_RADIUS = 20; 
    }
}

// ② 描画処理：ここで強引に形を書き換える
class TicketDrawer extends Blockly.zelos.Drawer {
    drawOutline_() {
        // 1. まずは普通に描く（この時点では外に膨らんでいるか、ただの四角）
        super.drawOutline_();

        // 2. このブロックが「TICKET」かどうかを【超確実】に判定
        const outputConn = this.block_.outputConnection;
        const isTicket = outputConn && outputConn.getCheck() && outputConn.getCheck().includes('TICKET');

        if (isTicket) {
            // 3. へこみの強さを取得
            const r = this.constants_.CUSTOM_TICKET_RADIUS;

            // 4. SVGのパス（線データ）をチケット型に作り直す
            // blockInfoから現在の幅と高さを取得
            const width = this.info_.width;
            const height = this.info_.height;

            // --- 魔法のチケットパス生成 ---
            // 詳しく説明：M(移動) -> a(内向き円弧) -> h(横線) -> a(内向き円弧) ...
            let path = `M 0,${r} `; // 左上スタート
            path += `a ${r},${r} 0 0,0 ${r},-${r} `; // 左上のへこみ
            path += `h ${width - 2 * r} `;           // 上の辺
            path += `a ${r},${r} 0 0,0 ${r},${r} `;  // 右上のへこみ
            path += `v ${height - 2 * r} `;          // 右の辺
            path += `a ${r},${r} 0 0,0 -${r},${r} `; // 右下のへこみ
            path += `h -${width - 2 * r} `;          // 下の辺
            path += `a ${r},${r} 0 0,0 -${r},-${r} `;// 左下のへこみ
            path += `z`;                             // 閉じる

            // 5. 元のパスを捨てて、自作のパスにすり替える！
            this.outlinePath_ = path;
        }
    }
}

// ③ 情報処理：丸薬型(Pill)にならないように設定
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const outputConn = this.block_.outputConnection;
        const isTicket = outputConn && outputConn.getCheck() && outputConn.getCheck().includes('TICKET');
        
        if (isTicket) {
            // これをfalseにしないと、自作パスが無視されることがあります
            this.isPill = false; 
        }
    }
}

// ④ レンダラー本体：すべてを合体
class TicketRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    makeConstants_() { return new TicketConstants(); }
    makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
    makeDrawer_(block, info) { return new TicketDrawer(block, info); }
}

// 登録（上書き）
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
