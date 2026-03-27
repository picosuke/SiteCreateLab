// ==========================================
// 完璧版：チケット型カスタムレンダラー
// ==========================================

class TicketConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CORNER_RADIUS = 8; // へこみのサイズ

        // 標準の角（Zelosの丸み）を保存しておく
        this.STANDARD_CORNERS = {
            topL: this.TOP_LEFT_CORNER,
            topR: this.TOP_RIGHT_CORNER,
            bottomR: this.BOTTOM_RIGHT_CORNER,
            bottomL: this.BOTTOM_LEFT_CORNER
        };

        // 【新開発】内側にへこむ角（チケット型）の定義
        // pathプロパティを正しく設定することで undefined エラーを防ぎます
        this.CONCAVE_CORNERS = {
            topL: {
                width: this.CORNER_RADIUS, height: this.CORNER_RADIUS,
                path: `a ${this.CORNER_RADIUS},${this.CORNER_RADIUS} 0 0,0 ${this.CORNER_RADIUS},-${this.CORNER_RADIUS}`
            },
            topR: {
                width: this.CORNER_RADIUS, height: this.CORNER_RADIUS,
                path: `a ${this.CORNER_RADIUS},${this.CORNER_RADIUS} 0 0,0 ${this.CORNER_RADIUS},${this.CORNER_RADIUS}`
            },
            bottomR: {
                width: this.CORNER_RADIUS, height: this.CORNER_RADIUS,
                path: `a ${this.CORNER_RADIUS},${this.CORNER_RADIUS} 0 0,0 -${this.CORNER_RADIUS},${this.CORNER_RADIUS}`
            },
            bottomL: {
                width: this.CORNER_RADIUS, height: this.CORNER_RADIUS,
                path: `a ${this.CORNER_RADIUS},${this.CORNER_RADIUS} 0 0,0 -${this.CORNER_RADIUS},-${this.CORNER_RADIUS}`
            }
        };
    }

    // ブロックを描画する直前に呼ばれる関数
    // ここで「TICKET」かどうかを判定して角を入れ替える！
    // これにより、他のブロック（文字や数字）の見た目は壊れません。
    beforeUpdateUnit_(block) {
        super.beforeUpdateUnit_(block);
        
        // 出力(output)に "TICKET" が設定されているかチェック
        const isTicket = block.outputConnection && 
                         block.outputConnection.getCheck() && 
                         block.outputConnection.getCheck().includes('TICKET');

        if (isTicket) {
            // チケット型にする
            this.TOP_LEFT_CORNER = this.CONCAVE_CORNERS.topL;
            this.TOP_RIGHT_CORNER = this.CONCAVE_CORNERS.topR;
            this.BOTTOM_RIGHT_CORNER = this.CONCAVE_CORNERS.bottomR;
            this.BOTTOM_LEFT_CORNER = this.CONCAVE_CORNERS.bottomL;
        } else {
            // 普通の丸い形に戻す
            this.TOP_LEFT_CORNER = this.STANDARD_CORNERS.topL;
            this.TOP_RIGHT_CORNER = this.STANDARD_CORNERS.topR;
            this.BOTTOM_RIGHT_CORNER = this.STANDARD_CORNERS.bottomR;
            this.BOTTOM_LEFT_CORNER = this.STANDARD_CORNERS.bottomL;
        }
    }
}

class TicketRenderer extends Blockly.zelos.Renderer {
    constructor(name) {
        super(name);
    }
    makeConstants_() {
        return new TicketConstants();
    }
}

// 登録（以前の登録名は上書きされます）
Blockly.blockRendering.register('ticket_renderer', TicketRenderer);
