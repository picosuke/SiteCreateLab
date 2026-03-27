// ==========================================
// カスタムレンダラー（四隅がへこむチケット型 ＆ 新しいプラグ）
// ==========================================

// ① 定数プロバイダ（形やサイズを決めるクラス）を拡張する
class TicketConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        
        // 【1】ブロックの四隅を「内側にへこむ形（チケット型）」に変更！
        this.CORNER_RADIUS = 8; // へこみの大きさ
        
        // ※ SVGの A（Arc）コマンドを使って、丸みを内側にえぐる
        this.TOP_LEFT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 ' + this.CORNER_RADIUS + ',-' + this.CORNER_RADIUS + ' ';
        this.TOP_RIGHT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' ';
        this.BOTTOM_RIGHT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 -' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' ';
        this.BOTTOM_LEFT_CORNER = 'A ' + this.CORNER_RADIUS + ',' + this.CORNER_RADIUS + ' 0 0,0 -' + this.CORNER_RADIUS + ',-' + this.CORNER_RADIUS + ' ';

        // 【2】新しいOutput（左の出っ張り）の形：三角形（▶）
        this.TRIANGLE_OUTPUT = {
            type: 4, // オリジナルの識別番号（1〜3は標準で使われているため4以降にする）
            isDynamic: false,
            width: 15,
            height: 30,
            connectionOffsetY: 15,
            connectionPathDown: ' l 15,15 l -15,15 ', // 下に向かって描く三角
            connectionPathUp: ' l 15,-15 l -15,-15 '  // 上に向かって描く三角
        };
    }

    // 【3】どのブロックの時に、どの出っ張りの形にするかのルール
    shapeFor(connection) {
        const checks = connection.getCheck();
        // ブロックの出力(check)が "TICKET" だった場合、出っ張りを「三角形」にする！
        if (checks && checks.includes('TICKET')) {
            return this.TRIANGLE_OUTPUT;
        }
        // それ以外はいつものZelosの形
        return super.shapeFor(connection);
    }
}

// ② レンダラー本体（描画エンジン）を拡張する
class TicketRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }

    // 新しく作った「形の設定（TicketConstants）」を呼び出す
    makeConstants_() {
        return new TicketConstants();
    }
}

// ③ 完成したオリジナルレンダラーを「ticket_renderer」という名前で登録！
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
