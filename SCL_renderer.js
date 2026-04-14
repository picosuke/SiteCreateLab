// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;   // 元のチケットのへこみ
        this.CUSTOM_TICKET2_RADIUS = 8;   // 新しいチケットのへこみ
    }
}

// ② 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    
    // --- ブロック本体の外枠を描く（ここは変更なし・時計回り） ---
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
            const safeR = Math.min(r, height / 3); 
            const halfH = height / 2;

            let path = `M 0,0 `;                     
            path += `h ${width} `;                   
            path += `v ${halfH - safeR} `;           
            path += `a ${safeR},${safeR} 0 0,0 0,${2 * safeR} `; 
            path += `v ${halfH - safeR} `;           
            path += `h -${width} `;                  
            path += `v -${halfH - safeR} `;          
            path += `a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} `;
            path += `z`;                             

            this.outlinePath_ = path;
        }
    }

    // --- ★修正: ブロックの中の「穴」を【反時計回り】で描く ---
    drawInlineInput_(input) {
        this.positionInlineInputConnection_(input);

        // すでにブロックが繋がっている場合は描画しない
        if (input.connectedBlock || this.info_.isInserted) {
            return;
        }

        const checkArr = input.connectionModel.getCheck() ? input.connectionModel.getCheck() : [];
        const isTicket = checkArr.includes('TICKET');
        const isTicket2 = checkArr.includes('TICKET2');

        if (isTicket || isTicket2) {
            const width = input.width;
            const height = input.height;
            const x = input.xPos;
            const y = input.centerline - height / 2;
            
            let path = '';

            // ★ここが最大のポイント！
            // 右上の角からスタートして、左へ、下へ、右へ、上へと逆回り（反時計回り）にパスを引くことで
            // 「出っ張ったブロック」ではなく「へこんだ穴」として認識させる！

            if (isTicket) {
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x + width - r},${y} `;         // 右上からスタート
                path += `h -${width - 2 * r} `;             // 左へ
                path += `a ${r},${r} 0 0,0 -${r},${r} `;    // 左上の凹み
                path += `v ${height - 2 * r} `;             // 下へ
                path += `a ${r},${r} 0 0,0 ${r},${r} `;     // 左下の凹み
                path += `h ${width - 2 * r} `;              // 右へ
                path += `a ${r},${r} 0 0,0 ${r},-${r} `;    // 右下の凹み
                path += `v -${height - 2 * r} `;            // 上へ
                path += `a ${r},${r} 0 0,0 -${r},-${r} `;   // 右上の凹み
                path += `z`;

            } else if (isTicket2) {
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;

                path += `M ${x + width},${y} `;                      // 右上からスタート
                path += `h -${width} `;                              // 左へ
                path += `v ${halfH - safeR} `;                       // 下へ
                path += `a ${safeR},${safeR} 0 0,0 0,${2 * safeR} `; // 左辺の凹み
                path += `v ${halfH - safeR} `;                       // 下へ
                path += `h ${width} `;                               // 右へ
                path += `v -${halfH - safeR} `;                      // 上へ
                path += `a ${safeR},${safeR} 0 0,0 0,-${2 * safeR}`; // 右辺の凹み
                path += `v -${halfH - safeR} `;                      // 上へ
                path += `z`;                             
            }

            this.inlinePath_ += path;

        } else {
            super.drawInlineInput_(input);
        }
    }
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
