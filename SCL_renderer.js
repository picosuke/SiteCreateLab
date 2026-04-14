// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    init() {
        super.init();
        
        // ★【ここがエラーの原因でした！】
        // 形のタイプを正しい「PUZZLE_TAB（接続用タブ）」に修正しました。
        // これによりエラーが消え、Blocklyが「近づいた時の黄色い枠」を正しく計算して出せるようになります！
        const r2 = this.CUSTOM_TICKET2_RADIUS;
        this.TICKET2_SHAPE = {
            type: Blockly.blockRendering.Types.PUZZLE_TAB,
            width: r2,
            height: r2 * 2,
            pathDown: `a ${r2},${r2} 0 0,0 0,${r2 * 2}`,
            pathUp: `a ${r2},${r2} 0 0,1 0,-${r2 * 2}`
        };
    }

    // ★システム連動：TICKET2を受け入れる穴には、上で作った形を自動適用する
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

    // --- 中の「穴（暗い色）」の描画 ---
    drawInlineInput_(input) {
        // ★この1行が超重要：ここで接続位置を計算させることで、黄色い枠が出現します！
        this.positionInlineInputConnection_(input);

        // ブロックが繋がっている時は穴を描かない
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
                path += `a ${safeR},${safeR} 0 0,0 0,${2 * safeR} `; // 右側の凹み
                path += `v ${halfH - safeR} `;           
                path += `h -${width} `;                  
                path += `v -${halfH - safeR} `;          
                path += `a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} `; // 左側の凹み
                path += `v -${halfH - safeR} `;
                path += `z`;                             
            }

            // 暗い色レイヤー（inlinePath_）に登録
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
