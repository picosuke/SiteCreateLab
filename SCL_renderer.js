// ① 定数設定（黄色い枠を出すための設定）
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
                // エラー回避のため、必ず関数(function)で返す
                pathDown: function() { return `a ${r},${r} 0 0,0 0,${r * 2}`; },
                pathUp: function() { return `a ${r},${r} 0 0,1 0,-${r * 2}`; }
            };
        }
        return base;
    }
}

// ② コアシステム拡張：暗い穴専用のSVGレイヤー
class TicketPathObject extends Blockly.zelos.PathObject {
    constructor(root, style, constants) {
        super(root, style, constants);
        this.svgTicketHoles_ = Blockly.utils.dom.createSvgElement('path', {
            'class': 'scl-ticket-holes',
            'fill': 'rgba(0, 0, 0, 0.2)',
            'pointer-events': 'none'
        }, this.svgRoot);
        this.svgRoot.insertBefore(this.svgTicketHoles_, this.svgPath.nextSibling);
    }

    setTicketHolesPath(pathString) {
        this.svgTicketHoles_.setAttribute('d', pathString);
    }
}

// ③ 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    constructor(block, info) {
        super(block, info);
        this.myTicketHolesPath_ = ''; 
    }

    drawOutline_() {
        // ★重要：先に標準の計算を走らせる
        super.drawOutline_();

        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        const w = this.info_.width;
        const h = this.info_.height;

        if (checkArr.includes('TICKET')) {
            const r = this.constants_.CUSTOM_TICKET_RADIUS;
            this.outlinePath_ = `M 0,${r} a ${r},${r} 0 0,0 ${r},-${r} h ${w - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${h - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${w - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} z`;
        } else if (checkArr.includes('TICKET2')) {
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const halfH = h / 2;
            // 左右のへこみ。Puzzle Tabの位置を壊さないようにパスを描く
            this.outlinePath_ = `M 0,0 h ${w} v ${halfH - r} a ${r},${r} 0 0,0 0,${2 * r} v ${halfH - r} h -${w} v -${halfH - r} a ${r},${r} 0 0,0 0,-${2 * r} z`;
        }
    }

    drawInlineInput_(input) {
        const checkArr = input.connectionModel.getCheck() ? input.connectionModel.getCheck() : [];
        const isTicket = checkArr.includes('TICKET');
        const isTicket2 = checkArr.includes('TICKET2');

        // ★修正1：Ticket型以外の場合は、標準処理に完全に任せる
        // これにより、通常のパズルタブ引数スロットの座標計算が正常化される
        if (!isTicket && !isTicket2) {
            super.drawInlineInput_(input);
            return;
        }

        // ★修正2：Ticket型の場合のみ、位置計算を実行
        this.positionInlineInputConnection_(input);

        // ★修正3：シャドウブロックの表示判定を厳密に
        // targetBlockがnullでない場合、物理的に接続されている
        const targetBlock = input.connectionModel.targetBlock();
        if (targetBlock !== null) {
            // 本物のブロックが接続されている→シャドウを非表示にして早期リターン
            return;
        }

        const width = input.width;
        const height = input.height;
        const x = input.xPos;
        const y = input.centerline - height / 2;
        let path = '';

        if (isTicket) {
            const r = this.constants_.CUSTOM_TICKET_RADIUS;
            path += `M ${x},${y + r} a ${r},${r} 0 0,0 ${r},-${r} h ${width - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${height - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${width - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} z`;
        } else if (isTicket2) {
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const safeR = Math.min(r, height / 3); 
            const halfH = height / 2;
            path += `M ${x},${y} h ${width} v ${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,${2 * safeR} v ${halfH - safeR} h -${width} v -${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} z`;
        }
        
        this.myTicketHolesPath_ += path;
    }

    recordSizeOnBlock_() {
        super.recordSizeOnBlock_();
        this.info_.block_.pathObject.setTicketHolesPath(this.myTicketHolesPath_);
    }
}

// ④ 情報処理
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

// ⑤ レンダラー本体
class TicketRenderer extends Blockly.zelos.Renderer {
    makeConstants_() { return new SCLConstants(); }
    makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
    makeDrawer_(block, info) { return new TicketDrawer(block, info); }
    makePathObject(root, style) {
        return new TicketPathObject(root, style, this.getConstants());
    }
}

Blockly.blockRendering.register('SCL_renderer', TicketRenderer);
