// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;   // 元のチケットのへこみ
        this.CUSTOM_TICKET2_RADIUS = 8;   // ★追加: 新しいチケットのへこみ
    }
}

// ② 描画処理：ここで強引に形を書き換える
class TicketDrawer extends Blockly.zelos.Drawer {
    drawOutline_() {
        // 1. まずは普通に描く
        super.drawOutline_();

        const outputConn = this.block_.outputConnection;
        // 配列かどうか安全にチェックして取得
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        
        const isTicket = checkArr.includes('TICKET');
        const isTicket2 = checkArr.includes('TICKET2'); // ★追加: 左右へこみ型

        if (isTicket) {
            // --- 元の「四隅」がへこむチケット ---
            const r = this.constants_.CUSTOM_TICKET_RADIUS;
            const width = this.info_.width;
            const height = this.info_.height;

            let path = `M 0,${r} `;
            path += `a ${r},${r} 0 0,0 ${r},-${r} `;
            path += `h ${width - 2 * r} `;
            path += `a ${r},${r} 0 0,0 ${r},${r} `;
            path += `v ${height - 2 * r} `;
            path += `a ${r},${r} 0 0,0 -${r},${r} `;
            path += `h -${width - 2 * r} `;
            path += `a ${r},${r} 0 0,0 -${r},-${r} `;
            path += `z`;

            this.outlinePath_ = path;

        } else if (isTicket2) {
            // --- ★新規追加: 「左右の中央」がへこむチケット ---
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const width = this.info_.width;
            const height = this.info_.height;
            
            // ブロックの高さが低い時に、へこみが突き抜けないようにする安全対策
            const safeR = Math.min(r, height / 3); 
            const halfH = height / 2;

            let path = `M 0,0 `;                     // 左上（角は直角）
            path += `h ${width} `;                   // 上の辺
            path += `v ${halfH - safeR} `;           // 右の辺（へこみの上まで）
            
            // 右辺のへこみ（内側=左向きに半円を描く）
            path += `a ${safeR},${safeR} 0 0,1 0,${2 * safeR} `; 
            
            path += `v ${halfH - safeR} `;           // 右の辺（へこみの下から下端まで）
            path += `h -${width} `;                  // 下の辺
            path += `v -${halfH - safeR} `;          // 左の辺（へこみの下まで）
            
            // 左辺のへこみ（内側=右向きに半円を描く）
            path += `a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} `; 
            
            path += `z`;                             // 閉じる

            this.outlinePath_ = path;
        }
    }
}

// ③ 情報処理：丸薬型(Pill)にならないように設定
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        
        // TICKET または TICKET2 の場合は丸薬型を強制解除
        if (checkArr.includes('TICKET') || checkArr.includes('TICKET2')) {
            this.isPill = false; 
        }
    }
}

// ④ レンダラー本体：すべてを合体
class TicketRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    makeConstants_() { return new SCLConstants(); }
    makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
    makeDrawer_(block, info) { return new TicketDrawer(block, info); }
}

// 登録（上書き）
Blockly.blockRendering.register('SCL_renderer', TicketRenderer);
