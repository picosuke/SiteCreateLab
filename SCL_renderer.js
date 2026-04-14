// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    init() {
        super.init();
        const r = this.CUSTOM_TICKET2_RADIUS;
        // ★ TICKET2の形を「公式な接続形状」としてシステムに完全登録
        // これにより、黄色い枠も暗い穴も、システムが自動で完璧に計算します
        this.TICKET2_SHAPE = {
            type: Blockly.blockRendering.Types.PUZZLE_TAB, // 接続タイプ
            width: r,
            height: r * 2,
            pathDown: function() { return `a ${r},${r} 0 0,0 0,${r * 2}`; },
            pathUp: function() { return `a ${r},${r} 0 0,1 0,-${r * 2}`; }
        };
    }

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
    drawOutline_() {
        // ★ 核心：接続の「出っ張り」はシステム(super)に描かせる！
        // 自分では、上・右・下の辺だけを描く。
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
            
            // 左側の出っ張りは super.drawOutline_() が描いてくれるので、
            // 私たちは「右側の凹み」を含めた外枠だけを整える
            let path = `M 0,0 `;
            path += `h ${w} `;
            path += `v ${halfH - r} `;
            path += `a ${r},${r} 0 0,0 0,${2 * r} `; // 右側の凹み
            path += `v ${halfH - r} `;
            path += `h -${w} `;
            // 左側は自動で接続されるので閉じなくて良い(z)
            this.outlinePath_ += path;
        }
    }

    // ★ 穴の描画は100%システムに任せる。これが「崩れない」唯一の方法。
    drawInlineInput_(input) {
        super.drawInlineInput_(input);
    }
}

// ③ 情報処理
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    makeInput_(input) {
        const res = super.makeInput_(input);
        const checks = input.connection.getCheck();
        if (checks && (checks.includes('TICKET') || checks.includes('TICKET2'))) {
            res.isPill = false; // 丸薬型を無効化
        }
        return res;
    }

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
