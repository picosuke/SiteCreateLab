// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;   // 元のチケットのへこみ
        this.CUSTOM_TICKET2_RADIUS = 8;   // 追加: 新しいチケットのへこみ
    }
}

// ② 描画処理：ここで強引に形を書き換える
class TicketDrawer extends Blockly.zelos.Drawer {
    
    // --- ブロック本体の外枠を描く ---
    drawOutline_() {
        super.drawOutline_();

        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        
        const isTicket = checkArr.includes('TICKET');
        const isTicket2 = checkArr.includes('TICKET2'); 

        if (isTicket) {
            // 元の「四隅」がへこむチケット（時計回り）
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
            // 「左右の中央」がへこむチケット（時計回り）
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const width = this.info_.width;
            const height = this.info_.height;
            const safeR = Math.min(r, height / 3); 
            const halfH = height / 2;

            let path = `M 0,0 `;                     
            path += `h ${width} `;                   
            path += `v ${halfH - safeR} `;           
            path += `a ${safeR},${safeR} 0 0,0 0,${2 * safeR} `; // 右のへこみ
            path += `v ${halfH - safeR} `;           
            path += `h -${width} `;                  
            path += `v -${halfH - safeR} `;          
            path += `a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} `;// 左のへこみ
            path += `z`;                             

            this.outlinePath_ = path;
        }
    }

    // --- ★追加: ブロックの中の「穴」をくり抜く ---
    drawInlineInput_(input) {
        // この穴が受け入れるブロックのタイプを取得
        const checkArr = input.connectionModel.getCheck() ? input.connectionModel.getCheck() : [];
        const isTicket = checkArr.includes('TICKET');
        const isTicket2 = checkArr.includes('TICKET2');

        if (isTicket || isTicket2) {
            // 穴のサイズと位置を取得
            const width = input.width;
            const height = input.height;
            const x = input.xPos;
            const y = input.centerline - height / 2;
            
            let path = '';

            if (isTicket) {
                // 四隅がへこむチケット用の穴
                // ※くり抜くために、右上の角から反時計回りで描画＆フラグを反転（1）させる
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x + width},${y + r} `;
                path += `a ${r},${r} 0 0,1 -${r},-${r} `; // 右上の出っ張り（へこみにフィット）
                path += `h -${width - 2 * r} `;           // 上の辺（左へ）
                path += `a ${r},${r} 0 0,1 -${r},${r} `;  // 左上の出っ張り
                path += `v ${height - 2 * r} `;           // 左の辺（下へ）
                path += `a ${r},${r} 0 0,1 ${r},${r} `;   // 左下の出っ張り
                path += `h ${width - 2 * r} `;            // 下の辺（右へ）
                path += `a ${r},${r} 0 0,1 ${r},-${r} `;  // 右下の出っ張り
                path += `z`;                              // 右の辺（上へ）を閉じる

            } else if (isTicket2) {
                // 左右がへこむチケット用の穴
                // ※右上から反時計回り
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;

                path += `M ${x + width},${y} `;                      // 右上スタート
                path += `h -${width} `;                              // 上の辺（左へ）
                path += `v ${halfH - safeR} `;                       // 左の辺の上半分（下へ）
                path += `a ${safeR},${safeR} 0 0,1 0,${2 * safeR} `; // 左の出っ張り（右向きに膨らむ）
                path += `v ${halfH - safeR} `;                       // 左の辺の下半分（下へ）
                path += `h ${width} `;                               // 下の辺（右へ）
                path += `v -${halfH - safeR} `;                      // 右の辺の下半分（上へ）
                path += `a ${safeR},${safeR} 0 0,1 0,-${2 * safeR}`; // 右の出っ張り（左向きに膨らむ）
                path += `z`;                                         // 閉じる
            }

            // 作った穴のパスを元のブロックの枠線に足す（これで穴が空く）
            this.outlinePath_ += path;

        } else {
            // チケット以外の普通の丸穴などは、デフォルトの描画に任せる
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
