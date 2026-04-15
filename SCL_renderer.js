// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    // ★ 黄色い枠を出すために、システムに接続の形を教える
    shapeFor(connection) {
        const base = super.shapeFor(connection);
        if (!base) return base;

        const checks = connection.getCheck();
        if (checks && checks.includes('TICKET2')) {
            const r = this.CUSTOM_TICKET2_RADIUS;
            return {
                ...base,
                pathDown: function() { return `a ${r},${r} 0 0,0 0,${r * 2}`; },
                pathUp: function() { return `a ${r},${r} 0 0,1 0,-${r * 2}`; }
            };
        }
        return base;
    }
}

// ② 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    drawOutline_() {
        super.drawOutline_();
        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];

        if (checkArr.includes('TICKET')) {
            const r = this.constants_.CUSTOM_TICKET_RADIUS;
            const w = this.info_.width;
            const h = this.info_.height;
            this.outlinePath_ = `M 0,${r} a ${r},${r} 0 0,0 ${r},-${r} h ${w - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${h - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${w - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} z`;
        } else if (checkArr.includes('TICKET2')) {
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const w = this.info_.width;
            const h = this.info_.height;
            const halfH = h / 2;
            this.outlinePath_ = `M 0,0 h ${w} v ${halfH - r} a ${r},${r} 0 0,0 0,${2 * r} v ${halfH - r} h -${w} v -${halfH - r} a ${r},${r} 0 0,0 0,-${2 * r} z`;
        }
    }

    // ★ 形の歪みを防ぐため、自分で穴を描く！
    drawInlineInput_(input) {
        // これを呼ぶことで黄色い枠が正しい位置に出ます
        this.positionInlineInputConnection_(input);

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

            // システムの「丸くする処理」を無視し、完璧なチケット型を描く
            if (isTicket) {
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x + r},${y} `;
                path += `h ${width - 2 * r} `;
                path += `a ${r},${r} 0 0,0 ${r},${r} `;
                path += `v ${height - 2 * r} `;
                path += `a ${r},${r} 0 0,0 -${r},${r} `;
                path += `h -${width - 2 * r} `;
                path += `a ${r},${r} 0 0,0 -${r},-${r} `;
                path += `v -${height - 2 * r} `;
                path += `a ${r},${r} 0 0,0 ${r},-${r} `;
                path += `z`;

            } else if (isTicket2) {
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;

                path += `M ${x},${y} `;                     
                path += `h ${width} `;                   
                path += `v ${halfH - safeR} `;           
                path += `a ${safeR},${safeR} 0 0,0 0,${2 * safeR} `; 
                path += `v ${halfH - safeR} `;           
                path += `h -${width} `;                  
                path += `v -${halfH - safeR} `;          
                path += `a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} `; 
                path += `v -${halfH - safeR} `;
                path += `z`;                             
            }

            // これにより、この形が暗い色で塗られます
            this.inlinePath_ += path;

        } else {
            super.drawInlineInput_(input);
        }
    }
}

// ③ 情報処理
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

// ④ レンダラー本体
class TicketRenderer extends Blockly.zelos.Renderer {
    makeConstants_() { return new SCLConstants(); }
    makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
    makeDrawer_(block, info) { return new TicketDrawer(block, info); }
}

Blockly.blockRendering.register('SCL_renderer', TicketRenderer);
