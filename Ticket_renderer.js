// ==========================================
// 決定版：特定のブロック(TICKET)だけをへこませるレンダラー
// ==========================================

class TicketConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        // 通常の角丸（標準は8）
        this.NORMAL_RADIUS = 8;
        // チケットのへこみ具合（ここを好きなだけ大きくできます）
        this.TICKET_RADIUS = 4; 
    }

    // ★重要：描画の直前に「このブロック専用の形」をセットする
    beforeUpdateUnit_(block) {
        super.beforeUpdateUnit_(block);

        // 出力(check)に "TICKET" が含まれているか判定
        const isTicket = block.outputConnection && 
                         block.outputConnection.getCheck() && 
                         block.outputConnection.getCheck().includes('TICKET');
        if (isTicket) {
            // 【TICKETブロック用】半径を大きくし、sweep-flagを0（内曲がり）にする
            const r = this.TICKET_RADIUS;
            this.TOP_LEFT_CORNER.path = `a ${r},${r} 0 0,0 ${r},-${r}`;
            this.TOP_RIGHT_CORNER.path = `a ${r},${r} 0 0,0 ${r},${r}`;
            this.BOTTOM_RIGHT_CORNER.path = `a ${r},${r} 0 0,0 -${r},${r}`;
            this.BOTTOM_LEFT_CORNER.path = `a ${r},${r} 0 0,0 -${r},-${r}`;
        }
    }
}

class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const isTicket = this.block_.outputConnection && 
                         this.block_.outputConnection.getCheck() && 
                         this.block_.outputConnection.getCheck().includes('TICKET');
        
        if (isTicket) {
            // TICKETブロックの時だけ、全体を楕円形にする機能をOFFにする
            this.isPill = false; 
        }
    }
}

class TicketRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    makeConstants_() {
        return new TicketConstants();
    }
    makeRenderInfo_(block) {
        return new TicketRenderInfo(this, block);
    }
}

// 登録！
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
