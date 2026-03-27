// ==========================================
// 最終進化版：深くへこむチケット型レンダラー
// ==========================================

// ① 定数（形）の定義
class TicketConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        // ★ ここを大きくすると「へこみ」がもっと強くなります（標準は8）
        this.TICKET_RADIUS = 16; 
    }

    // ブロック描画の直前に実行される
    beforeUpdateUnit_(block) {
        super.beforeUpdateUnit_(block);
        
        const isTicket = block.outputConnection && 
                         block.outputConnection.getCheck() && 
                         block.outputConnection.getCheck().includes('TICKET');

        if (isTicket) {
            const r = this.TICKET_RADIUS;
            // 角の形を「内側に深く曲がるアール」に上書き！
            this.TOP_LEFT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,0 ${r},-${r}`
            };
            this.TOP_RIGHT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,0 ${r},${r}`
            };
            this.BOTTOM_RIGHT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,0 -${r},${r}`
            };
            this.BOTTOM_LEFT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,0 -${r},-${r}`
            };
        } else {
            // 他のブロックは標準の丸みに戻す
            const r = this.CORNER_RADIUS; // 標準の8
            this.TOP_LEFT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,1 ${r},-${r}`
            };
            this.TOP_RIGHT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,1 ${r},${r}`
            };
            this.BOTTOM_RIGHT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,1 -${r},${r}`
            };
            this.BOTTOM_LEFT_CORNER = {
                width: r, height: r,
                path: `a ${r},${r} 0 0,1 -${r},-${r}`
            };
        }
    }
}

// ② 計測情報の定義（ここが重要：TICKETブロックの「全体が丸くなる現象」を止める）
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const isTicket = this.block_.outputConnection && 
                         this.block_.outputConnection.getCheck() && 
                         this.block_.outputConnection.getCheck().includes('TICKET');
        
        if (isTicket) {
            // Zelos特有の「全体をカプセル型にする設定」を強制解除して、定義した角を優先させる
            this.isPill = false; 
        }
    }
}

// ③ レンダラー本体の定義
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
