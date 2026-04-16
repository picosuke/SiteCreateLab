// ① 定数設定
class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }

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

    drawInlineInput_(input) {
        this.positionInlineInputConnection_(input);

        let svgRoot = this.block_.getSvgRoot();
        let holeId = 'scl_hole_' + input.name;
        let holePath = svgRoot.querySelector('.' + holeId);

        // ★修正2：他のブロックに入った時に消えてしまう原因を削除しました！
        // 「自分の穴にブロックが入った時」だけ暗い色を消すようにします。
        if (input.connectedBlock) {
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

            if (isTicket) {
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x + r},${y} h ${width - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${height - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${width - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} v -${height - 2 * r} a ${r},${r} 0 0,0 ${r},-${r} z`;
            } else if (isTicket2) {
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;
                
                path += `M ${x + width},${y} h -${width} v ${halfH - safeR} `;
                // ★修正1：左側のフラグを「1」にして、しっかり内側にえぐれるようにしました！
                path += `a ${safeR},${safeR} 0 0,1 0,${2 * safeR} `; 
                path += `v ${halfH - safeR} h ${width} v -${halfH - safeR} `;
                path += `a ${safeR},${safeR} 0 0,1 0,-${2 * safeR} `; 
                path += `v -${halfH - safeR} z`;
            }

            if (!holePath) {
                holePath = Blockly.utils.dom.createSvgElement('path', {
                    'class': holeId,
                    'fill': 'rgba(0, 0, 0, 0.2)' 
                }, svgRoot);
            }
            holePath.style.display = 'block';
            holePath.setAttribute('d', path);

        } else {
            super.drawInlineInput_(input);
        }
    }
}

// ③ 情報処理
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
