// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    // ★ ChatGPTの正解を取り入れた「安全なShape（接続判定）」の登録
    shapeFor(connection) {
        // 1. まず標準の形データ（ベース）を取得してエラーを防ぐ！
        const base = super.shapeFor(connection);
        if (!base) return base;

        const checks = connection.getCheck();
        
        // 2. チケット2の場合、ベースを継承しつつ「凹みのパス」だけ上書きして返す
        if (checks && checks.includes('TICKET2')) {
            const r = this.CUSTOM_TICKET2_RADIUS;
            return {
                ...base, 
                // 左辺と右辺の凹みにフィットするパス（これのおかげで黄色い枠が正しい形で出ます！）
                pathDown: `a ${r},${r} 0 0,0 0,${r * 2}`,
                pathUp: `a ${r},${r} 0 0,1 0,-${r * 2}`
            };
        }
        
        // 3. チケット1の場合も、エラーを防ぐためにベースを継承させる
        if (checks && checks.includes('TICKET')) {
            return {
                ...base,
                pathDown: '',
                pathUp: ''
            };
        }
        
        return base;
    }
}

// ② 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    
    // --- ブロック本体の外枠 ---
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

    // --- 中の「穴」の描画（濃い色をつける） ---
    drawInlineInput_(input) {
        this.positionInlineInputConnection_(input);

        // すでにブロックが繋がっている時は穴を描かない
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

            // 暗い色でペタッと塗るための正しいシルエットパス
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

            // ★ inlinePath_ に追加することで、暗い色の穴として塗られます！
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
