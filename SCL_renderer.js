// =========================
// ① Constants（ここが最重要）
// =========================
class SCLConstants extends Blockly.zelos.ConstantProvider {
  constructor() {
    super();
    this.TICKET2_RADIUS = 8;
  }

  shapeFor(connection) {
    const base = super.shapeFor(connection);
    if (!base) return base;

    const checks = connection.getCheck();
    if (checks && checks.includes('TICKET2')) {
      const r = this.TICKET2_RADIUS;

      return {
        ...base,

        // ★ Zelos対応：必ず文字列
        pathDown: `l -6 0 a ${r},${r} 0 0,0 0,${2*r} l 6 0`,
        pathUp:   `l -6 0 a ${r},${r} 0 0,1 0,-${2*r} l 6 0`,

        // ★ これがないと100%崩れる
        width: base.width,
        height: base.height,
        widthWithPadding: base.widthWithPadding ?? base.width,
        heightWithPadding: base.heightWithPadding ?? base.height,
        connectionOffsetX: base.connectionOffsetX ?? 0,
        connectionOffsetY: base.connectionOffsetY ?? base.height / 2,
      };
    }

    return base;
  }
}

// =========================
// ② Drawer（触りすぎ禁止）
// =========================
class TicketDrawer extends Blockly.zelos.Drawer {
  drawOutline_() {
    super.drawOutline_();

    const output = this.block_.outputConnection;
    const checks = output?.getCheck?.() || [];

    if (checks.includes('TICKET2')) {
      const r = this.constants_.TICKET2_RADIUS;
      const w = this.info_.width;
      const h = this.info_.height;
      const mid = h / 2;

      // ★ 上書きではなく「追加」
      this.outlinePath_ += `
        M ${w},${mid - r}
        a ${r},${r} 0 0,0 0,${2*r}
      `;
    }
  }

  // ★ 絶対に壊さない
  drawInlineInput_(input) {
    super.drawInlineInput_(input);
  }
}

// =========================
// ③ RenderInfo（pill無効化だけ）
// =========================
class TicketRenderInfo extends Blockly.zelos.RenderInfo {
  makeInput_(input) {
    const res = super.makeInput_(input);

    const checks = input.connection.getCheck();
    if (checks && checks.includes('TICKET2')) {
      res.isPill = false;
    }

    return res;
  }

  finalize_() {
    super.finalize_();

    const output = this.block_.outputConnection;
    const checks = output?.getCheck?.() || [];

    if (checks.includes('TICKET2')) {
      this.isPill = false;
    }
  }
}

// =========================
// ④ Renderer
// =========================
class TicketRenderer extends Blockly.zelos.Renderer {
  makeConstants_() { return new SCLConstants(); }
  makeRenderInfo_(block) { return new TicketRenderInfo(this, block); }
  makeDrawer_(block, info) { return new TicketDrawer(block, info); }
}

Blockly.blockRendering.register('SCL_renderer', TicketRenderer);
