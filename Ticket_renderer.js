// ==========================================
// 究極版：四隅が内側にへこむチケット型レンダラー (Zelosベース)
// ==========================================

// ① ブロックの輪郭線を描く「Drawer（描画係）」を拡張する
class TicketDrawer extends Blockly.zelos.Drawer {
    
    // 輪郭線を描き出すメソッドをフックする
    drawOutline_() {
        // まず、元のZelosの機能で「通常の丸っこいブロック」のパスを完全に描かせる
        super.drawOutline_();
        
        // このブロックが「TICKET」を出力する特別なブロックかどうかチェック
        const isTicket = this.block_.outputConnection && 
                         this.block_.outputConnection.getCheck() && 
                         this.block_.outputConnection.getCheck().includes('TICKET');
                         
        if (isTicket) {
            // 角の半径（通常は 8）を取得
            const r = this.constants_.CORNER_RADIUS;
            
            // --- 魔法のパス書き換え ---
            // Zelosが描いた「外側に膨らむ角丸」のコマンドを探し出す
            const tl_old = `a ${r},${r} 0 0,1 ${r},-${r}`; // 左上
            const tr_old = `a ${r},${r} 0 0,1 ${r},${r}`;  // 右上
            const br_old = `a ${r},${r} 0 0,1 -${r},${r}`; // 右下
            const bl_old = `a ${r},${r} 0 0,1 -${r},-${r}`;// 左下
            
            // それを「内側にへこむ角（逆アール）」のコマンドに書き換える（0,1 を 0,0 にするだけ！）
            const tl_new = `a ${r},${r} 0 0,0 ${r},-${r}`;
            const tr_new = `a ${r},${r} 0 0,0 ${r},${r}`;
            const br_new = `a ${r},${r} 0 0,0 -${r},${r}`;
            const bl_new = `a ${r},${r} 0 0,0 -${r},-${r}`;
            
            // ブロックの輪郭線データ（文字列）を直接置換して上書き！
            this.outlinePath_ = this.outlinePath_
                .replace(tl_old, tl_new)
                .replace(tr_old, tr_new)
                .replace(br_old, br_new)
                .replace(bl_old, bl_new);
        }
    }
}

// ② レンダラー本体を拡張して、さっきの描画係（TicketDrawer）を使うように指示
class TicketRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    
    // 描画係を呼び出すメソッド
    makeDrawer_(block, info) {
        return new TicketDrawer(block, info);
    }
}

// ③ 「ticket_renderer」としてシステムに登録！
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
