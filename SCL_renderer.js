// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    init() {
        super.init();
        
        // ★あなたのご指摘通りの「正しい方法」です！
        // TICKET2専用の「接続の形（Connection Shape）」を定義して登録するだけで、
        // Blocklyが勝手に「暗い色」「黄色い枠」付きの穴を完璧に描画してくれます。
        const r2 = this.CUSTOM_TICKET2_RADIUS;
        this.TICKET2_SHAPE = {
            type: Blockly.blockRendering.Types.INPUT,
            isOutput: true,
            width: r2,
            height: r2 * 2,
            // 穴の左側の出っ張り（右向きの凸）
            pathDown: `a ${r2},${r2} 0 0,0 0,${r2 * 2}`,
            // 穴の右側の出っ張り（左向きの凸）
            pathUp: `a ${r2},${r2} 0 0,1 0,-${r2 * 2}`
        };
    }

    // TICKET2のチェックを持つ穴は、上で作った専用の形を使う！
    shapeFor(connection) {
        const checks = connection.getCheck();
        if (checks && checks.includes('TICKET2')) {
            return this.TICKET2_SHAPE;
        }
        return super.shapeFor(connection);
    }
}

// ② 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    
    // --- ブロック本体の外枠を描く ---
    // ※外枠全体の形はShapeだけでは決められないため、ここだけは残します
    drawOutline_() {
        super.drawOutline_();

        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        
        const isTicket = checkArr.includes('TICKET');
        const isTicket2 = checkArr.includes('TICKET2'); 

        if (isTicket) {
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
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const width = this.info_.width;
            const height = this.info_.height;
            const halfH = height / 2;

            let path = `M 0,0 `;                     
            path += `h ${width} `;                   
            path += `v ${halfH - r} `;           
            path += `a ${r},${r} 0 0,0 0,${2 * r} `; // 右辺の凹み
            path += `v ${halfH - r} `;           
            path += `h -${width} `;                  
            path += `v -${halfH - r} `;          
            path += `a ${r},${r} 0 0,0 0,-${2 * r} `; // 左辺の凹み
            path += `z`;                             

            this.outlinePath_ = path;
        }
    }

    // ★私が今まで書いていた「穴を無理やり描くコード」は全て削除しました！
    // 穴の描画はすべてBlocklyの標準エンジンに任せることで、バグが消滅します。
}

// ③ 情報処理：丸薬型(Pill)にならないように設定
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        
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
