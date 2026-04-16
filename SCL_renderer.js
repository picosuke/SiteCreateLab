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
                pathDown: function() { return `a ${r},${r} 0 0,0 0,${r * 2}`; },
                pathUp: function() { return `a ${r},${r} 0 0,1 0,-${r * 2}`; }
            };
        }
        return base;
    }
}

// ② 【完全新規】コアシステム拡張：暗い穴専用のSVGレイヤーを作る
class TicketPathObject extends Blockly.zelos.PathObject {
    constructor(root, style, constants) {
        super(root, style, constants);
        
        // ★ 暗い穴を描くための「専用のSVGパス要素」をシステム内に正式に新設！
        this.svgTicketHoles_ = Blockly.utils.dom.createSvgElement(
            'path',
            {
                'class': 'scl-ticket-holes',
                // 親ブロックの色を透かして暗く見せる（黒20%）
                'fill': 'rgba(0, 0, 0, 0.2)',
                // マウスクリック等は後ろのブロック本体に貫通させる
                'pointer-events': 'none'
            },
            this.svgRoot
        );
        
        // ★ ブロック本体のSVG（this.svgPath）のすぐ上に重ねる。
        // コアシステムで管理させるため、他のブロックに入っても絶対に裏に隠れない！
        this.svgRoot.insertBefore(this.svgTicketHoles_, this.svgPath.nextSibling);
    }

    // Drawerが計算した穴の形を受け取る関数
    setTicketHolesPath(pathString) {
        this.svgTicketHoles_.setAttribute('d', pathString);
    }
}

// ③ 描画処理
class TicketDrawer extends Blockly.zelos.Drawer {
    constructor(block, info) {
        super(block, info);
        // 今回描くべき暗い穴のパスを一時保存する変数
        this.myTicketHolesPath_ = ''; 
    }

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

    // 穴の形の計算
    drawInlineInput_(input) {
        // 近づけた時に黄色い枠を出させる
        this.positionInlineInputConnection_(input);

        // ブロックがハマっている時は暗い穴を描かない（空っぽにする）
        if (input.connectedBlock) {
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

            // ★ 透明にくり抜くのではなく、暗く塗るための「ブロックと同じ形」を計算する
            if (isTicket) {
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x},${y + r} a ${r},${r} 0 0,0 ${r},-${r} h ${width - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${height - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${width - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} z`;
            } else if (isTicket2) {
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;
                // アウトラインと全く同じ方向（0）でえぐることで、形が完璧に一致します！
                path += `M ${x},${y} h ${width} v ${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,${2 * safeR} v ${halfH - safeR} h -${width} v -${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} z`;
            }

            // 計算したパスを保存しておく
            this.myTicketHolesPath_ += path;

        } else {
            // 普通の丸い穴などは標準システムにくり抜かせる
            super.drawInlineInput_(input);
        }
    }

    // ★ 描画計算が終わった瞬間に、先ほどコアシステムに作った「暗い穴レイヤー」にパスを流し込む！
    recordSizeOnBlock_() {
        super.recordSizeOnBlock_();
        this.info_.block_.pathObject.setTicketHolesPath(this.myTicketHolesPath_);
    }
}

// ④ 情報処理（形が崩れるのを防ぐ）
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

// ⑤ レンダラー本体の再構築
class TicketRenderer extends Blockly.zelos.Renderer {
    makeConstants_() { return new SCLConstants(); }
    makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
    makeDrawer_(block, info) { return new TicketDrawer(block, info); }
    
    // ★ 追加：自作した「暗い穴レイヤーを持つPathObject」をコアシステムに登録！
    makePathObject(root, style) {
        return new TicketPathObject(root, style, this.getConstants());
    }
}

Blockly.blockRendering.register('SCL_renderer', TicketRenderer);
