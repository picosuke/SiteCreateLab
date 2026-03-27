// ==========================================
// 究極版：へこみ具合を自由に変えられるチケット型レンダラー
// ==========================================

// ① 定数：ここで「へこみの大きさ」を決めます
class TicketConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        // ★ この数値を大きくすると、へこみがどんどん深くなります（例: 15, 20, 30...）
        this.CORNER_RADIUS = 20; 
    }
}

// ② 描画：ここが魔法の正体です
class TicketDrawer extends Blockly.zelos.Drawer {
    drawOutline_() {
        // 1. まず普通に描く（この時点では外側に膨らんでいる）
        super.drawOutline_();
        
        // 2. TICKETブロックかどうか判定
        const isTicket = this.block_.outputConnection && 
                         this.block_.outputConnection.getCheck() && 
                         this.block_.outputConnection.getCheck().includes('TICKET');

        if (isTicket) {
            // 3. SVGパスを直接改造する！
            // 「0 0,1（外向き）」という描画命令を、すべて「0 0,0（内向き）」に書き換える
            // さらに、Zelos特有のReporter丸みを無効化するために、全ての角にこの魔法をかけます。
            this.outlinePath_ = this.outlinePath_.split('0 0,1').join('0 0,0');
        }
    }
}

// ③ 情報：Zelosの「自動で楕円にする機能」をオフにする
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const isTicket = this.block_.outputConnection && 
                         this.block_.outputConnection.getCheck() && 
                         this.block_.outputConnection.getCheck().includes('TICKET');
        if (isTicket) {
            // これをfalseにしないと、CORNER_RADIUSを大きくしても無視されてしまいます
            this.isPill = false; 
        }
    }
}

// ④ 本体：上記の設定を合体させる
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
    makeDrawer_(block, info) {
        return new TicketDrawer(block, info);
    }
}

// 登録！
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
