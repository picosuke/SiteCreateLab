// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    // ★ 解決策：システムに「正しい形」を「文字列」で教える
    shapeFor(connection) {
        const base = super.shapeFor(connection);
        if (!base) return base;

        const checks = connection.getCheck();
        if (checks && checks.includes('TICKET2')) {
            const r = this.CUSTOM_TICKET2_RADIUS;
            return {
                ...base,
                // ChatGPTの指摘通り、関数ではなく「文字列」で返す
                // これによりクラッシュが消え、黄色い枠の計算が正しくなります
                pathDown: `a ${r},${r} 0 0,0 0,${r * 2}`,
                pathUp: `a ${r},${r} 0 0,1 0,-${r * 2}`
            };
        }
        return base;
    }
}

// ② 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    
    // ブロック本体の外枠
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
            // 右側の凹みを含めた外枠パス
            this.outlinePath_ = `M 0,0 h ${w} v ${halfH - r} a ${r},${r} 0 0,0 0,${2 * r} v ${halfH - r} h -${w} v -${halfH - r} a ${r},${r} 0 0,0 0,-${2 * r} z`;
        }
    }

    // ★ 解決策：穴の描画は100%システム(super)に任せる！
    // shapeForを文字列にしたので、superを呼ぶだけで「暗い色」と「黄色枠」が出ます。
    drawInlineInput_(input) {
        super.drawInlineInput_(input);
    }
}

// ③ 情報処理：形が崩れる（お椀状になる）のを防ぐ
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    
    // スロット生成時に「丸薬型(isPill)」フラグをへし折る
    makeInput_(input) {
        const res = super.makeInput_(input);
        const checks = input.connection.getCheck();
        if (checks && (checks.includes('TICKET') || checks.includes('TICKET2'))) {
            res.isPill = false; 
        }
        return res;
    }

    // ブロック本体の丸薬型設定も解除
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
