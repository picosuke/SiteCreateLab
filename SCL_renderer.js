// =========================
// ① Constants（完全版）
// =========================
class SCLConstants extends Blockly.zelos.ConstantProvider {
  constructor() {
    super();
    this.TICKET2_RADIUS = 8;
    this.TAB_WIDTH = 12;   // ← ここ重要
    this.TAB_HEIGHT = 16;  // ← ここ重要
  }

  shapeFor(connection) {
    const base = super.shapeFor(connection);
    if (!base) return base;

    const checks = connection.getCheck();

    if (checks && checks.includes('TICKET2')) {
      const r = this.TICKET2_RADIUS;
      const w = this.TAB_WIDTH;
      const h = this.TAB_HEIGHT;

      return {
        type: Blockly.blockRendering.Types.PUZZLE_TAB,

        width: w,
        height: h,
        widthWithPadding: w,
        heightWithPadding: h,

        connectionOffsetX: 0,
        connectionOffsetY: h / 2,

        // 🔥 Zelos完全対応（配列）
        pathDown: [
          Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(-w/2, 0),
            Blockly.utils.svgPaths.arc('a', r, r, 0, 0, 0, 0, h),
            Blockly.utils.svgPaths.point(w/2, 0),
          ])
        ],

        pathUp: [
          Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(-w/2, 0),
            Blockly.utils.svgPaths.arc('a', r, r, 0, 0, 1, 0, -h),
            Blockly.utils.svgPaths.point(w/2, 0),
          ])
        ],
      };
    }

    return base;
  }
}

// =========================
// ② Drawer（超重要修正）
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

      // 🔥 connection位置と完全一致させる
      this.outlinePath_ += `
        M ${w},${mid - r}
        a ${r},${r} 0 0,0 0,${2*r}
      `;
    }
  }

  drawInlineInput_(input) {
    // 🔥 触らない（これ絶対）
    super.drawInlineInput_(input);
  }
}

// =========================
// ③ RenderInfo（最小だけ）
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
