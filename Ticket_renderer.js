// ==========================================
// カスタムレンダラー（四隅がへこむチケット型 ＆ 新しいプラグ）
// ==========================================

const TicketRenderer = function(name) {
    TicketRenderer.superClass_.constructor.call(this, name);
};
Blockly.utils.object.inherits(TicketRenderer, Blockly.zelos.Renderer);

TicketRenderer.prototype.makeConstants_ = function() {
    return new TicketConstants();
};

// 🌟 ここでオリジナルの「形」を定義します！
const TicketConstants = function() {
    TicketConstants.superClass_.constructor.call(this);
    
    // 【1】ブロックの四隅を「内側にへこむ形（チケット型）」に変更！
    this.CORNER_RADIUS = 8; // へこみの大きさ
    // ※ Aコマンドの sweep-flag(0) を使って、丸みを逆（内側）に曲げています
    this.TOP_LEFT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 ' + this.CORNER_RADIUS + ',-' + this.CORNER_RADIUS + ' ';
    this.TOP_RIGHT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' ';
    this.BOTTOM_RIGHT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 -' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' ';
    this.BOTTOM_LEFT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 -' + this.CORNER_RADIUS + ',-' + this.CORNER_RADIUS + ' ';

    // 【2】新しいOutput（左の出っ張り）の形：三角形（▶）
    this.TRIANGLE_OUTPUT = {
        type: 4, // オリジナルの識別番号
        isDynamic: false,
        width: 15,
        height: 30,
        connectionOffsetY: 15,
        connectionPathDown: ' l 15,15 l -15,15 ', // 下に向かって描く三角
        connectionPathUp: ' l 15,-15 l -15,-15 '  // 上に向かって描く三角
    };
};
Blockly.utils.object.inherits(TicketConstants, Blockly.zelos.ConstantProvider);

// 【3】どのブロックの時に、どの出っ張りの形にするかのルール
TicketConstants.prototype.shapeFor = function(connection) {
    const checks = connection.getCheck();
    // ブロックの出力(check)が "TICKET" だった場合、出っ張りを「三角形」にする！
    if (checks && checks.includes('TICKET')) {
        return this.TRIANGLE_OUTPUT;
    }
    // それ以外はいつものZelosの形
    return TicketConstants.superClass_.shapeFor.call(this, connection);
};

// 登録！
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
