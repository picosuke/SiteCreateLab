// ==========================================
// カスタムレンダラー（専用の出っ張りと穴の形）
// ==========================================

class CustomConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        
        // 新しいOutput（出っ張り・穴）の形：カクカクしたリボン型（チケットの切れ端風）
        this.SHAPES.TICKET = {
            type: 4, 
            isDynamic: false,
            width: 15,
            height: 36,
            connectionOffsetY: 18,
            // 下に向かって描くときの線（斜めに出っ張って、まっすぐ降りて、斜めに戻る）
            connectionPathDown: ' l 15,10 v 16 l -15,10 ', 
            // 上に向かって描くときの線
            connectionPathUp: ' l 15,-10 v -16 l -15,-10 '  
        };
    }

    // どのブロックの時に、どの出っ張り（穴）の形にするかのルール
    shapeFor(connection) {
        const checks = connection.getCheck();
        // ブロックの出力(check)に "TICKET" が含まれていれば、専用の形にする！
        if (checks && checks.includes('TICKET')) {
            return this.SHAPES.TICKET;
        }
        // それ以外は、いつもの丸っこい形
        return super.shapeFor(connection);
    }
}

class CustomRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    // カスタムした形の設定を呼び出す
    makeConstants_() {
        return new CustomConstants();
    }
}

// 登録！
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
