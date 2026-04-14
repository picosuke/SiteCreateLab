class SCLConstants extends Blockly.zelos.ConstantProvider {
    constructor() {
        super();
        this.CUSTOM_TICKET_RADIUS = 10;
        this.CUSTOM_TICKET2_RADIUS = 8;
    }
}

class TicketDrawer extends Blockly.zelos.Drawer {
    drawOutline_() {
        super.drawOutline_();
        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        
        if (checkArr.includes('TICKET')) {
            const r = this.constants_.CUSTOM_TICKET_RADIUS;
            const width = this.info_.width;
            const height = this.info_.height;
            this.outlinePath_ = `M 0,${r} a ${r},${r} 0 0,0 ${r},-${r} h ${width - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${height - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${width - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} z`;
        } else if (checkArr.includes('TICKET2')) {
            const r = this.constants_.CUSTOM_TICKET2_RADIUS;
            const width = this.info_.width;
            const height = this.info_.height;
            const safeR = Math.min(r, height / 3); 
            const halfH = height / 2;
            this.outlinePath_ = `M 0,0 h ${width} v ${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,${2 * safeR} v ${halfH - safeR} h -${width} v -${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} z`;
        }
    }

    drawInlineInput_(input) {
        this.positionInlineInputConnection_(input);
        if (input.connectedBlock || this.info_.isInserted) return;

        const checkArr = input.connectionModel.getCheck() ? input.connectionModel.getCheck() : [];
        if (checkArr.includes('TICKET') || checkArr.includes('TICKET2')) {
            const width = input.width;
            const height = input.height;
            const x = input.xPos;
            const y = input.centerline - height / 2;
            let path = '';

            if (checkArr.includes('TICKET')) {
                const r = this.constants_.CUSTOM_TICKET_RADIUS;
                path += `M ${x + r},${y} h ${width - 2 * r} a ${r},${r} 0 0,0 ${r},${r} v ${height - 2 * r} a ${r},${r} 0 0,0 -${r},${r} h -${width - 2 * r} a ${r},${r} 0 0,0 -${r},-${r} v -${height - 2 * r} a ${r},${r} 0 0,0 ${r},-${r} z`;
            } else if (checkArr.includes('TICKET2')) {
                const r = this.constants_.CUSTOM_TICKET2_RADIUS;
                const safeR = Math.min(r, height / 3); 
                const halfH = height / 2;
                path += `M ${x},${y} h ${width} v ${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,${2 * safeR} v ${halfH - safeR} h -${width} v -${halfH - safeR} a ${safeR},${safeR} 0 0,0 0,-${2 * safeR} v -${halfH - safeR} z`;
            }
            this.inlinePath_ += path;
        } else {
            super.drawInlineInput_(input);
        }
    }
}

class TicketRenderInfo extends Blockly.zelos.RenderInfo {
    finalize_() {
        super.finalize_();
        const outputConn = this.block_.outputConnection;
        const checkArr = outputConn && outputConn.getCheck() ? outputConn.getCheck() : [];
        if (checkArr.includes('TICKET') || checkArr.includes('TICKET2')) {
            this.isPill = false; 
        }
    }
}

class TicketRenderer extends Blockly.zelos.Renderer {
    makeConstants_() { return new SCLConstants(); }
    makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
    makeDrawer_(block, info) { return new TicketDrawer(block, info); }
}

Blockly.blockRendering.register('SCL_renderer', TicketRenderer);
