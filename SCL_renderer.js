// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

    // 黄色い枠（ハイライト）を出すために、システムの形だけは残しておきます
    shapeFor(connection) {
        const base = super.shapeFor(connection);
        if (!base) return base;

        const checks = connection.getCheck();
        if (checks && checks.includes('TICKET2')) {
            const r = this.CUSTOM_TICKET2_RADIUS;
            return {
                ...base,
                pathDown: function() { return `a ${r},${r} 0 0,0 0,${r * 2}`; },
                pathUp: function() { return `a ${r},${r} 0 0,1 0,-${r * 2}`; }
            };
        }
        return base;
    }
}

// ② 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
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
            this.outlinePath_ = `M 0,0 h ${w} v ${halfH - r} a ${r},${r} 0 0,0 0,${2 * r} v ${halfH - r} h -${w} v -${halfH - r} a ${r},${r} 0 0,0 0,-${2 * r} z`;
        }
    }

    // ★ あなたのアイデアを採用！自分で色を塗る！
    drawInlineInput_(input) {
        // 黄色い枠を出すための位置計算
        this.positionInlineInputConnection_(input);

        // ブロックのSVG本体に直接アクセス
        let svgRoot = this.block_.getSvgRoot();
        let holeId = 'scl_hole_' + input.name;
        let holePath = svgRoot.querySelector('.' + holeId);

        // ブロックがはまったら、暗い色を隠す
        if (input.connectedBlock || this.info_.isInserted) {
            if (holePath) holePath.style.display = 'none';
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

            // 透明にくり抜くのをやめ、直接シルエットの形を作る
            if (isTicket) {
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x + r},${y} h ${width - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${height - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${width - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} v -${height - 2 * r} a ${r},${r} 0 0,0 ${r},-${r} z`;
            } else if (isTicket2) {
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;
                // ★修正：右側のへこみを直しました！（フラグを 1 にして内側にへこませる）
                path += `M ${x + width},${y} h -${width} v ${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,${2 * safeR} v ${halfH - safeR} h ${width} v -${halfH - safeR} a ${safeR},${safeR} 0 0,1 0,-${2 * safeR} v -${halfH - safeR} z`;
            }

            // 新しいSVG要素を作って、暗い色を「fill」で塗る！
            if (!holePath) {
                holePath = Blockly.utils.dom.createSvgElement('path', {
                    'class': holeId,
                    'fill': 'rgba(0, 0, 0, 0.2)' // ★ ここで黒色（透過度20%）を指定！
                }, svgRoot);
            }
            holePath.style.display = 'block';
            holePath.setAttribute('d', path);

        } else {
            // 他の丸い穴などは標準システムに任せる
            super.drawInlineInput_(input);
        }
    }
}

// ③ 情報処理：形が丸っこくなるのを防ぐ
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    makeInput_(input) {
        const res = super.makeInput_(input);
        const checks = input.connection.getCheck();
        if (checks && (checks.includes('TICKET') || checks.includes('TICKET2'))) {
            res.isPill = false; 
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
