// --- 1. 公式カラーピッカー (ブロックのデザインを維持する) ---
/*! For license information please see index.js.LICENSE.txt */ ! function (e, t) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("blockly/core"));
	else if ("function" == typeof define && define.amd) define(["blockly/core"], t);
	else {
		var i = "object" == typeof exports ? t(require("blockly/core")) : t(e.Blockly);
		for (var r in i)("object" == typeof exports ? exports : e)[r] = i[r]
	}
}(this, (e => (() => {
	var t = {
			613: function (e, t, i) {
				var r;
				r = e => (() => {
					"use strict";
					var t = {
							573: t => {
								t.exports = e
							}
						},
						i = {};

					function r(e) {
						var o = i[e];
						if (void 0 !== o) return o.exports;
						var n = i[e] = {
							exports: {}
						};
						return t[e](n, n.exports, r), n.exports
					}
					r.d = (e, t) => {
						for (var i in t) r.o(t, i) && !r.o(e, i) && Object.defineProperty(e, i, {
							enumerable: !0,
							get: t[i]
						})
					}, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
						"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
							value: "Module"
						}), Object.defineProperty(e, "__esModule", {
							value: !0
						})
					};
					var o = {};
					return (() => {
						r.r(o), r.d(o, {
							FieldColour: () => t
						});
						var e = r(573);
						class t extends e.Field {
							constructor(t, i, r) {
								super(e.Field.SKIP_SETUP), this.picker = null, this.highlightedIndex = null, this.boundEvents = [], this.SERIALIZABLE = !0, this.CURSOR = "default", this.isDirty_ = !1, this.colours = ["#ffffff", "#cccccc", "#c0c0c0", "#999999", "#666666", "#333333", "#000000", "#ffcccc", "#ff6666", "#ff0000", "#cc0000", "#990000", "#660000", "#330000", "#ffcc99", "#ff9966", "#ff9900", "#ff6600", "#cc6600", "#993300", "#663300", "#ffff99", "#ffff66", "#ffcc66", "#ffcc33", "#cc9933", "#996633", "#663333", "#ffffcc", "#ffff33", "#ffff00", "#ffcc00", "#999900", "#666600", "#333300", "#99ff99", "#66ff99", "#33ff33", "#33cc00", "#009900", "#006600", "#003300", "#99ffff", "#33ffff", "#66cccc", "#00cccc", "#339999", "#336666", "#003333", "#ccffff", "#66ffff", "#33ccff", "#3366ff", "#3333ff", "#000099", "#000066", "#ccccff", "#9999ff", "#6666cc", "#6633ff", "#6600cc", "#333399", "#330099", "#ffccff", "#ff99ff", "#cc66cc", "#cc33cc", "#993399", "#663366", "#330033"], this.titles = [], this.columns = 7, t !== e.Field.SKIP_SETUP && (r && this.configure_(r), this.setValue(t), i && this.setValidator(i))
							}
							configure_(e) {
								super.configure_(e), e.colourOptions && (this.colours = e.colourOptions), e.colourTitles && (this.titles = e.colourTitles), e.columns && (this.columns = e.columns)
							}
							initView() {
								const t = this.getConstants();
								if (!t) throw Error("Constants not found");
								this.size_ = new e.utils.Size(t.FIELD_COLOUR_DEFAULT_WIDTH, t.FIELD_COLOUR_DEFAULT_HEIGHT), this.createBorderRect_(), this.getBorderRect().style.fillOpacity = "1", this.getBorderRect().setAttribute("stroke", "#fff"), this.isFullBlockField() && (this.clickTarget_ = this.sourceBlock_.getSvgRoot())
							}
							isFullBlockField() {
								if (!this.getSourceBlock()) throw new e.UnattachedFieldError;
								const t = this.getConstants();
								return this.blockIsSimpleReporter() && Boolean(null == t ? void 0 : t.FIELD_COLOUR_FULL_BLOCK)
							}
							blockIsSimpleReporter() {
								const t = this.getSourceBlock();
								if (!t) throw new e.UnattachedFieldError;
								if (!t.outputConnection) return !1;
								for (const e of t.inputList)
									if (e.connection || e.fieldRow.length > 1) return !1;
								return !0
							}
							applyColour() {
								const t = this.getSourceBlock();
								if (!t) throw new e.UnattachedFieldError;
								if (!this.fieldGroup_) return;
								const i = this.borderRect_;
								if (!i) throw new Error("The border rect has not been initialized");
								this.isFullBlockField() ? (i.style.display = "none", t.pathObject.svgPath.setAttribute("fill", this.getValue()), t.pathObject.svgPath.setAttribute("stroke", "#fff")) : (i.style.display = "block", i.style.fill = this.getValue())
							}
							getSize() {
								var e;
								return (null === (e = this.getConstants()) || void 0 === e ? void 0 : e.FIELD_COLOUR_FULL_BLOCK) && (this.render_(), this.isDirty_ = !1), super.getSize()
							}
							render_() {
								super.render_();
								const t = this.getSourceBlock();
								if (!t) throw new e.UnattachedFieldError;
								t.applyColour()
							}
							updateSize_(e) {
								const t = this.getConstants();
								if (!t) return;
								let i, r;
								this.isFullBlockField() ? (i = 2 * (null != e ? e : 0), r = t.FIELD_TEXT_HEIGHT) : (i = t.FIELD_COLOUR_DEFAULT_WIDTH, r = t.FIELD_COLOUR_DEFAULT_HEIGHT), this.size_.height = r, this.size_.width = i, this.positionBorderRect_()
							}
							doClassValidation_(t) {
								return "string" != typeof t ? null : e.utils.colour.parse(t)
							}
							getText() {
								let e = this.value_;
								return /^#(.)\1(.)\2(.)\3$/.test(e) && (e = "#" + e[1] + e[3] + e[5]), e
							}
							setColours(e, t) {
								return this.colours = e, t && (this.titles = t), this
							}
							setColumns(e) {
								return this.columns = e, this
							}
							showEditor_() {
								if (this.dropdownCreate(), !this.picker) throw Error("Picker not found");
								e.DropDownDiv.getContentDiv().appendChild(this.picker), e.DropDownDiv.showPositionedByField(this, this.dropdownDispose.bind(this)), this.picker.focus({
									preventScroll: !0
								})
							}
							onClick(t) {
								const i = t.target,
									r = i && i.getAttribute("data-colour");
								null !== r && (this.setValue(r), e.DropDownDiv.hideIfOwner(this))
							}
							onKeyDown(t) {
								let i, r = !0;
								switch (t.key) {
								case "ArrowUp":
									this.moveHighlightBy(0, -1);
									break;
								case "ArrowDown":
									this.moveHighlightBy(0, 1);
									break;
								case "ArrowLeft":
									this.moveHighlightBy(-1, 0);
									break;
								case "ArrowRight":
									this.moveHighlightBy(1, 0);
									break;
								case "Enter":
									if (i = this.getHighlighted(), i) {
										const e = i.getAttribute("data-colour");
										null !== e && this.setValue(e)
									}
									e.DropDownDiv.hideWithoutAnimation();
									break;
								default:
									r = !1
								}
								r && t.stopPropagation()
							}
							moveHighlightBy(e, t) {
								if (!this.highlightedIndex) return;
								const i = this.colours,
									r = this.columns;
								let o = this.highlightedIndex % r,
									n = Math.floor(this.highlightedIndex / r);
								o += e, n += t, e < 0 ? o < 0 && n > 0 ? (o = r - 1, n--) : o < 0 && (o = 0) : e > 0 ? o > r - 1 && n < Math.floor(i.length / r) - 1 ? (o = 0, n++) : o > r - 1 && o-- : t < 0 ? n < 0 && (n = 0) : t > 0 && n > Math.floor(i.length / r) - 1 && (n = Math.floor(i.length / r) - 1);
								const s = this.picker.childNodes[n].childNodes[o],
									l = n * r + o;
								this.setHighlightedCell(s, l)
							}
							onMouseMove(e) {
								const t = e.target,
									i = t && Number(t.getAttribute("data-index"));
								null !== i && i !== this.highlightedIndex && this.setHighlightedCell(t, i)
							}
							onMouseEnter() {
								var e;
								null === (e = this.picker) || void 0 === e || e.focus({
									preventScroll: !0
								})
							}
							onMouseLeave() {
								var t;
								null === (t = this.picker) || void 0 === t || t.blur();
								const i = this.getHighlighted();
								i && e.utils.dom.removeClass(i, "blocklyColourHighlighted")
							}
							getHighlighted() {
								var e;
								if (!this.highlightedIndex) return null;
								const t = this.highlightedIndex % this.columns,
									i = Math.floor(this.highlightedIndex / this.columns),
									r = null === (e = this.picker) || void 0 === e ? void 0 : e.childNodes[i];
								return r ? r.childNodes[t] : null
							}
							setHighlightedCell(t, i) {
								const r = this.getHighlighted();
								r && e.utils.dom.removeClass(r, "blocklyColourHighlighted"), e.utils.dom.addClass(t, "blocklyColourHighlighted"), this.highlightedIndex = i;
								const o = t.getAttribute("id");
								o && this.picker && e.utils.aria.setState(this.picker, e.utils.aria.State.ACTIVEDESCENDANT, o)
							}
							dropdownCreate() {
								const t = this.columns,
									i = this.colours,
									r = this.getValue(),
									o = document.createElement("table");
								o.className = "blocklyColourTable", o.tabIndex = 0, o.dir = "ltr", e.utils.aria.setRole(o, e.utils.aria.Role.GRID), e.utils.aria.setState(o, e.utils.aria.State.EXPANDED, !0), e.utils.aria.setState(o, e.utils.aria.State.ROWCOUNT, Math.floor(i.length / t)), e.utils.aria.setState(o, e.utils.aria.State.COLCOUNT, t);
								let n = null;
								for (let s = 0; s < i.length; s++) {
									s % t == 0 && (n = document.createElement("tr"), e.utils.aria.setRole(n, e.utils.aria.Role.ROW), o.appendChild(n));
									const l = document.createElement("td");
									n.appendChild(l), l.setAttribute("data-colour", i[s]), l.title = this.titles[s] || i[s], l.id = e.utils.idGenerator.getNextUniqueId(), l.setAttribute("data-index", `${s}`), e.utils.aria.setRole(l, e.utils.aria.Role.GRIDCELL), e.utils.aria.setState(l, e.utils.aria.State.LABEL, i[s]), e.utils.aria.setState(l, e.utils.aria.State.SELECTED, i[s] === r), l.style.backgroundColor = i[s], i[s] === r && (l.className = "blocklyColourSelected", this.highlightedIndex = s)
								}
								this.boundEvents.push(e.browserEvents.conditionalBind(o, "pointerdown", this, this.onClick, !0)), this.boundEvents.push(e.browserEvents.conditionalBind(o, "pointermove", this, this.onMouseMove, !0)), this.boundEvents.push(e.browserEvents.conditionalBind(o, "pointerenter", this, this.onMouseEnter, !0)), this.boundEvents.push(e.browserEvents.conditionalBind(o, "pointerleave", this, this.onMouseLeave, !0)), this.boundEvents.push(e.browserEvents.conditionalBind(o, "keydown", this, this.onKeyDown, !1)), this.picker = o
							}
							dropdownDispose() {
								for (const t of this.boundEvents) e.browserEvents.unbind(t);
								this.boundEvents.length = 0, this.picker = null, this.highlightedIndex = null
							}
							static fromJson(e) {
								return new this(e.colour, void 0, e)
							}
						}
						t.prototype.DEFAULT_VALUE = "#ffffff", e.fieldRegistry.unregister("field_colour"), e.fieldRegistry.register("field_colour", t), e.Css.register("\n.blocklyColourTable {\n  border-collapse: collapse;\n  display: block;\n  outline: none;\n  padding: 1px;\n}\n\n.blocklyColourTable>tr>td {\n  border: 0.5px solid #888;\n  box-sizing: border-box;\n  cursor: pointer;\n  display: inline-block;\n  height: 20px;\n  padding: 0;\n  width: 20px;\n}\n\n.blocklyColourTable>tr>td.blocklyColourHighlighted {\n  border-color: #eee;\n  box-shadow: 2px 2px 7px 2px rgba(0, 0, 0, 0.3);\n  position: relative;\n}\n\n.blocklyColourSelected, .blocklyColourSelected:hover {\n  border-color: #eee !important;\n  outline: 1px solid #333;\n  position: relative;\n}\n")
					})(), o
				})(), e.exports = r(i(573))
			},
			573: t => {
				"use strict";
				t.exports = e
			}
		},
		i = {};

	function r(e) {
		var o = i[e];
		if (void 0 !== o) return o.exports;
		var n = i[e] = {
			exports: {}
		};
		return t[e].call(n.exports, n, n.exports, r), n.exports
	}
	r.d = (e, t) => {
		for (var i in t) r.o(t, i) && !r.o(e, i) && Object.defineProperty(e, i, {
			enumerable: !0,
			get: t[i]
		})
	}, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	};
	var o = {};
	return (() => {
		"use strict";
		r.r(o), r.d(o, {
			FieldColourHsvSliders: () => n
		});
		var e = r(573),
			t = r(613);
		class i {
			constructor(e = 0, t = 0, i = 0) {
				this.r = e, this.g = t, this.b = i
			}
			static componentToHex(e) {
				return e <= 0 ? "00" : e >= 1 ? "ff" : ("0" + (255 * e + .5 >>> 0).toString(16)).slice(-2)
			}
			toHex() {
				return "#" + i.componentToHex(this.r) + i.componentToHex(this.g) + i.componentToHex(this.b)
			}
			loadFromHex(e) {
				return this.r = parseInt(e.slice(1, 3), 16) / 255, this.g = parseInt(e.slice(3, 5), 16) / 255, this.b = parseInt(e.slice(5, 7), 16) / 255, this
			}
			loadFromHsv(e) {
				const t = 6 * (e.h - Math.floor(e.h));
				return this.r = e.v * (1 - e.s * Math.max(0, Math.min(1, 2 - Math.abs(t - 3)))), this.g = e.v * (1 - e.s * Math.max(0, Math.min(1, Math.abs(t - 2) - 1))), this.b = e.v * (1 - e.s * Math.max(0, Math.min(1, Math.abs(t - 4) - 1))), this
			}
		}
		class n extends t.FieldColour {
			constructor() {
				super(...arguments), this.valueWhenEditorWasOpened = null, this.hsvBoundEvents = [], this.hueReadout = null, this.hueSlider = null, this.saturationReadout = null, this.saturationSlider = null, this.brightnessReadout = null, this.brightnessSlider = null, this.dropdownContainer = null
			}
			showEditor_() {
				if (this.createDropdownSliders(), !this.dropdownContainer || !this.hueSlider) throw new Error("Failed to initialize the HSV sliders.");
				e.DropDownDiv.getContentDiv().appendChild(this.dropdownContainer), e.DropDownDiv.showPositionedByField(this, this.dropdownDisposeSliders.bind(this)), this.valueWhenEditorWasOpened = this.value_, this.hueSlider.focus({
					preventScroll: !0
				})
			}
			static createLabelInContainer(e, t) {
				const i = document.createElement("div"),
					r = document.createElement("span"),
					o = document.createElement("span");
				return i.classList.add("fieldColourSliderLabel"), r.textContent = e, i.appendChild(r), i.appendChild(o), t.appendChild(i), o
			}
			static createSliderInContainer(e, t, i) {
				const r = document.createElement("input");
				return r.classList.add("fieldColourSlider"), r.type = "range", r.min = String(0), r.max = String(e), r.step = String(t), i.appendChild(r), r
			}
			createDropdownSliders() {
				const t = document.createElement("div");
				if (t.classList.add("fieldColourSliderContainer"),
          this.hueReadout = n.createLabelInContainer("濶ｲ", t), 
          this.hueSlider = n.createSliderInContainer(n.HUE_SLIDER_MAX, 2, t), 
          this.saturationReadout = n.createLabelInContainer("魄ｮ繧縺九＆", t), 
          this.saturationSlider = n.createSliderInContainer(n.SATURATION_SLIDER_MAX, 1, t), 
          this.brightnessReadout = n.createLabelInContainer("譏弱ｋ縺", t), 
          this.brightnessSlider = n.createSliderInContainer(n.BRIGHTNESS_SLIDER_MAX, 1, t), 
          this.hsvBoundEvents.push(e.browserEvents.conditionalBind(this.hueSlider, "input", this, this.onSliderChange)),
          this.hsvBoundEvents.push(e.browserEvents.conditionalBind(this.saturationSlider, "input", this, this.onSliderChange)), 
          this.hsvBoundEvents.push(e.browserEvents.conditionalBind(this.brightnessSlider, "input", this, this.onSliderChange)), 
          window.EyeDropper
        ) {
					const i = document.createElement("button");
					i.classList.add("fieldColourEyedropper"), 
          t.appendChild(document.createElement("hr")), 
          t.appendChild(i), 
          this.hsvBoundEvents.push(
            e.browserEvents.conditionalBind(
              i, "click", this, this.onEyedropperEvent
            )
          )
				}
				this.dropdownContainer = t, this.updateSliderValues()
			}
			dropdownDisposeSliders() {
				for (const t of this.hsvBoundEvents) e.browserEvents.unbind(t);
				this.hsvBoundEvents.length = 0, this.hueReadout = null, this.hueSlider = null, this.saturationReadout = null, this.saturationSlider = null, this.brightnessReadout = null, this.brightnessSlider = null, this.dropdownContainer = null, this.sourceBlock_ && e.Events.isEnabled() && null !== this.valueWhenEditorWasOpened && this.valueWhenEditorWasOpened !== this.value_ && (e.Events.fire(new(e.Events.get(e.Events.BLOCK_CHANGE))(this.sourceBlock_, "field", this.name || null, this.valueWhenEditorWasOpened, this.value_)), this.valueWhenEditorWasOpened = null)
			}
			static hsvToHex(e, t, i) {
				return n.helperHsv.h = e, n.helperHsv.s = t, n.helperHsv.v = i, n.helperRgb.loadFromHsv(n.helperHsv).toHex()
			}
			onSliderChange(e) {
				if (!this.hueSlider || !this.saturationSlider || !this.brightnessSlider) throw new Error("The HSV sliders are missing.");
				const t = parseFloat(this.hueSlider.value) / n.HUE_SLIDER_MAX,
					i = parseFloat(this.saturationSlider.value) / n.SATURATION_SLIDER_MAX,
					r = parseFloat(this.brightnessSlider.value) / n.BRIGHTNESS_SLIDER_MAX;
				this.setIntermediateValue(n.hsvToHex(t, i, r)), this.renderSliders()
			}
			onEyedropperEvent(e) {
				window.EyeDropper && (new window.EyeDropper).open().then((e => {
					this.setIntermediateValue(e.sRGBHex), this.updateSliderValues()
				}))
			}
			setIntermediateValue(t) {
				const i = this.value_;
				this.setValue(t, !1), this.sourceBlock_ && e.Events.isEnabled() && this.value_ !== i && e.Events.fire(new(e.Events.get(e.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE))(this.sourceBlock_, this.name || null, i, this.value_))
			}
			renderSliders() {
				if (!(this.hueSlider && this.hueReadout && this.saturationSlider && this.saturationReadout && this.brightnessSlider && this.brightnessReadout)) throw new Error("The HSV sliders are missing.");
				this.hueReadout.textContent = this.hueSlider.value, this.saturationReadout.textContent = this.saturationSlider.value, this.brightnessReadout.textContent = this.brightnessSlider.value;
				const e = parseFloat(this.hueSlider.value) / n.HUE_SLIDER_MAX,
					t = parseFloat(this.saturationSlider.value) / n.SATURATION_SLIDER_MAX,
					i = parseFloat(this.brightnessSlider.value) / n.BRIGHTNESS_SLIDER_MAX;
				let r = "linear-gradient(to right, ";
				r += n.hsvToHex(0, t, i) + ` ${n.THUMB_RADIUS}px, `, r += n.hsvToHex(1 / 6, t, i) + ", ", r += n.hsvToHex(2 / 6, t, i) + ", ", r += n.hsvToHex(.5, t, i) + ", ", r += n.hsvToHex(4 / 6, t, i) + ", ", r += n.hsvToHex(5 / 6, t, i) + ", ", r += n.hsvToHex(1, t, i) + ` calc(100% - ${n.THUMB_RADIUS}px))`, this.hueSlider.style.setProperty("--slider-track-background", r);
				let o = "linear-gradient(to right, ";
				o += n.hsvToHex(e, 0, i) + ` ${n.THUMB_RADIUS}px, `, o += n.hsvToHex(e, 1, i) + ` calc(100% - ${n.THUMB_RADIUS}px))`, this.saturationSlider.style.setProperty("--slider-track-background", o);
				let s = "linear-gradient(to right, ";
				s += n.hsvToHex(e, t, 0) + ` ${n.THUMB_RADIUS}px, `, s += n.hsvToHex(e, t, 1) + ` calc(100% - ${n.THUMB_RADIUS}px))`, this.brightnessSlider.style.setProperty("--slider-track-background", s)
			}
			updateSliderValues() {
				var e;
				if (!this.hueSlider || !this.saturationSlider || !this.brightnessSlider) return;
				const t = n.helperHsv.loadFromRgb(n.helperRgb.loadFromHex(null !== (e = this.getValue()) && void 0 !== e ? e : ""));
				this.hueSlider.value = String(t.h * n.HUE_SLIDER_MAX), this.saturationSlider.value = String(t.s * n.SATURATION_SLIDER_MAX), this.brightnessSlider.value = String(t.v * n.BRIGHTNESS_SLIDER_MAX), this.renderSliders()
			}
		}
		n.HUE_SLIDER_MAX = 360, n.SATURATION_SLIDER_MAX = 100, n.BRIGHTNESS_SLIDER_MAX = 100, n.THUMB_RADIUS = 12, n.helperHsv = new class {
			constructor(e = 0, t = 0, i = 0) {
				this.h = e, this.s = t, this.v = i
			}
			loadFromRgb(e) {
				const t = Math.max(Math.max(e.r, e.g), e.b),
					i = Math.min(Math.min(e.r, e.g), e.b);
				if (this.v = t, i === t) return this.h = 0, this.s = 0, this;
				const r = t - i;
				let o;
				return this.s = r / t, o = e.r === t ? (e.g - e.b) / r : e.g === t ? 2 + (e.b - e.r) / r : 4 + (e.r - e.g) / r, o /= 6, this.h = o - Math.floor(o), this
			}
			copy(e) {
				return this.h = e.h, this.s = e.s, this.v = e.v, this
			}
		}, n.helperRgb = new i, e.fieldRegistry.register("field_colour_hsv_sliders", n), e.Css.register(`\n.fieldColourSliderContainer {\n  padding: 4px;\n}\n.fieldColourSliderContainer hr {\n  border: none;\n  border-top: 1px solid #bbb;\n}\n.fieldColourSliderLabel {\n  display: flex;\n  justify-content: space-between;\n}\n.fieldColourEyedropper {\n  appearance: none;\n  position: relative;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n  width: 100%;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.fieldColourEyedropper:hover {\n  background: rgba(0,0,0,0.1)\n}\n.fieldColourEyedropper input {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.fieldColourEyedropper::before {\n  content: "繧ｹ繝昴う繝";\n}\n.fieldColourEyedropper::after {\n  content: "";\n  margin-left: 8px;\n  width: 24px;\n  height: 24px;\n  background: currentColor;\n  pointer-events: none;\n  -webkit-mask-image: var(--customize-dial-symbol);\n  -webkit-mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  mask-image: var(--customize-dial-symbol);\n  mask-repeat: no-repeat;\n  mask-position: center;\n  --customize-dial-symbol: url('data:image/svg+xml,    <svg xmlns="http://www.w3.org/2000/svg"          width="24px" height="24px"          viewBox="0 0 24 24">       <path stroke="black" strokewidth="1.414" fill="none"             d="m 13 8 L 6 15 Q 3 18 2 21 Q 0 23 .5 23.5 Q 1 24 3 22                 Q 6 21 9 18 L 16 11"/>       <path fill="black"             d="m 12 7 Q 11 6 12 5 Q 13 4 14 5 Q 15 6 16 5 Q 20 -1 22.5 1.5                 Q 25 4 19 8 Q 18 9 19 10 Q 20 11 19 12 Q 18 13 17 12"/>     </svg>');\n}\n.fieldColourSlider {\n  -webkit-appearance: none;\n  width: 150px;\n  height: 24px;\n  margin: 4px 8px 24px 8px;\n  padding: 0;\n}\n.fieldColourSlider:last-child {\n  margin-bottom: 4px;\n}\n.fieldColourSlider:focus {\n  outline: none;\n}\n/* Webkit */\n.fieldColourSlider::-webkit-slider-runnable-track {\n  background: var(--slider-track-background);\n  border-radius: 8px;\n  height: 16px;\n}\n.fieldColourSlider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  background: #fff;\n  border-radius: 50%;\n  box-shadow: 0 0 0 4px rgba(0,0,0,.15);\n  cursor: pointer;\n  width: ${2*n.THUMB_RADIUS}px;\n  height: ${2*n.THUMB_RADIUS}px;\n  margin-top: -4px;\n}\n/* Firefox */\n.fieldColourSlider::-moz-range-track {\n  background: var(--slider-track-background);\n  border-radius: 8px;\n  height: 16px;\n}\n.fieldColourSlider::-moz-range-thumb {\n  background: #fff;\n  border: none;\n  border-radius: 50%;\n  box-shadow: 0 0 0 4px rgba(0,0,0,.15);\n  cursor: pointer;\n  width: ${2*n.THUMB_RADIUS}px;\n  height: ${2*n.THUMB_RADIUS}px;\n}\n.fieldColourSlider::-moz-focus-outer {\n  /* override the focus border style */\n  border: 0;\n}\n/* IE */\n.fieldColourSlider::-ms-track {\n  background: var(--slider-track-background);\n  border-radius: 12px;\n  width: 100%;\n  height: 24px;\n  /* remove default tick marks */\n  color: transparent;\n}\n.fieldColourSlider::-ms-fill-lower  {\n  background: transparent;\n}\n.fieldColourSlider::-ms-fill-upper  {\n  background: transparent;\n}\n.fieldColourSlider::-ms-thumb {\n  background: #fff;\n  border: none;\n  border-radius: 50%;\n  box-shadow: 0 0 0 4px rgba(0,0,0,.15);\n  cursor: pointer;\n  width: ${2*n.THUMB_RADIUS}px;\n  height: ${2*n.THUMB_RADIUS}px;\n}\n`)
	})(), o
})()));
//# sourceMappingURL=index.js.map

// --- 2. ここから追加するパッチコード (要望完全対応＆左上に飛ぶバグ完全修正) ---
(function() {
    var FieldHsvSliders = null;
    if (Blockly.registry && typeof Blockly.registry.getClass === 'function') {
        FieldHsvSliders = Blockly.registry.getClass('field', 'field_colour_hsv_sliders');
    } else if (Blockly.fieldRegistry && Blockly.fieldRegistry.registry) {
        FieldHsvSliders = Blockly.fieldRegistry.registry['field_colour_hsv_sliders'];
    }

    if (!FieldHsvSliders) {
        console.error("カラーピッカーの取得に失敗しました。");
        return;
    }

    // --- CSSの注入 (要望のデザイン・幅狭め・はみ出し修正・スライダー太く・スクロールバー非表示) ---
    var style = document.createElement("style");
    style.innerHTML = `
        .custom-hsv-panel {
            width: 210px !important;
            padding: 10px !important;
            background: #ffffff;
            box-sizing: border-box;
            font-family: sans-serif;
            overflow-y: hidden;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .custom-hsv-panel::-webkit-scrollbar { display: none; }

        .custom-slider-row { margin-bottom: 8px; }
        .custom-slider-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }
        .custom-slider-label {
            font-size: 13px;
            font-weight: bold;
            color: #555;
        }
        .custom-slider-value {
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 2px 4px;
            font-size: 12px;
            font-weight: bold;
            color: #555;
            background: #fff;
            width: 45px;
            text-align: center;
            outline: none;
            -moz-appearance: textfield;
        }
        .custom-slider-value::-webkit-outer-spin-button,
        .custom-slider-value::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .custom-hex-row {
            display: flex;
            align-items: center;
            margin-top: 12px;
            margin-bottom: 12px;
            /* ★ はみ出し防止（幅いっぱいに収める） */
            width: 100%;
            box-sizing: border-box;
        }
        .custom-color-preview-bg {
            width: 36px;
            height: 26px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2NjYyIvPjxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIGZpbGw9IiNjY2MiLz48cmVjdCB4PSI1IiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMCIgeT0iNSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==');
            overflow: hidden;
            flex-shrink: 0;
        }
        .custom-color-preview-inner {
            width: 100%;
            height: 100%;
        }
        .custom-hex-input {
            flex-grow: 1;
            /* ★ はみ出し防止（余白を調整し、幅を100%以下に抑える） */
            margin-left: 8px;
            width: calc(100% - 44px);
            height: 26px;
            border: 1px solid #ccc;
            border-radius: 13px;
            text-align: center;
            font-size: 13px;
            font-weight: bold;
            color: #555;
            outline: none;
            background: #fff;
            box-sizing: border-box;
        }

        .custom-btn-row {
            display: flex;
            justify-content: space-between;
        }
        .custom-icon-btn {
            width: 28px;
            height: 28px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        .custom-icon-btn:hover { background: #f5f5f5; }
        .custom-btn-transparent::after {
            content: '';
            position: absolute;
            width: 140%;
            height: 3px;
            background: #ff4d4d;
            transform: rotate(-45deg);
        }

        .custom-hsv-panel .fieldColourSlider {
            margin: 0 !important;
            width: 100% !important;
            height: 20px !important;
        }
        .custom-hsv-panel .fieldColourSlider::-webkit-slider-runnable-track {
            height: 20px !important;
            border-radius: 10px !important;
        }
        .custom-hsv-panel .fieldColourSlider::-webkit-slider-thumb {
            width: 24px !important;
            height: 24px !important;
            margin-top: -2px !important;
            border: 2px solid #ccc !important;
            border-radius: 50% !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3) !important;
            background: #fff !important;
        }
        .custom-hsv-panel .fieldColourSlider::-moz-range-track {
            height: 20px !important;
            border-radius: 10px !important;
        }
        .custom-hsv-panel .fieldColourSlider::-moz-range-thumb {
            width: 24px !important;
            height: 24px !important;
            border: 2px solid #ccc !important;
            border-radius: 50% !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3) !important;
            background: #fff !important;
        }
    `;
    document.head.appendChild(style);

    // 1. バリデーション拡張 (8桁許可)
    var origDoClassValidation = FieldHsvSliders.prototype.doClassValidation_;
    FieldHsvSliders.prototype.doClassValidation_ = function(newValue) {
        if (typeof newValue === 'string' && /^#(?:[0-9a-fA-F]{3,4}){1,2}$/.test(newValue)) {
            return newValue;
        }
        return origDoClassValidation.call(this, newValue);
    };

    // ★ 根本修正：Zelosの時に左上に飛ぶのを防ぐため、showEditor_ を上書きして位置を強制指定 ★
    FieldHsvSliders.prototype.showEditor_ = function() {
        this.createDropdownSliders();
        if (!this.dropdownContainer || !this.hueSlider) return;
        Blockly.DropDownDiv.getContentDiv().appendChild(this.dropdownContainer);
        
        // 通常のドロップダウン表示
        Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDisposeSliders.bind(this));
        
        // 色を白ベースに
        if (Blockly.DropDownDiv.setColour) {
            Blockly.DropDownDiv.setColour('#ffffff', '#dddddd');
        }

        this.valueWhenEditorWasOpened = this.value_;
    };

    // 2. ドロップダウン生成
    FieldHsvSliders.prototype.createDropdownSliders = function() {
        var t = document.createElement("div");
        t.className = "custom-hsv-panel";

        var _this = this;
        this.activeInput = null;

        var createRow = function(labelTxt, max, step) {
            var row = document.createElement("div");
            row.className = "custom-slider-row";
            var header = document.createElement("div");
            header.className = "custom-slider-header";
            var label = document.createElement("span");
            label.className = "custom-slider-label";
            label.textContent = labelTxt;
            
            var valEl = document.createElement("input");
            valEl.type = "number";
            valEl.className = "custom-slider-value";
            valEl.min = 0; valEl.max = max; valEl.step = step;
            
            header.appendChild(label);
            header.appendChild(valEl);
            
            var input = document.createElement("input");
            input.type = "range";
            input.min = 0; input.max = max; input.step = step;
            input.className = "fieldColourSlider";
            
            row.appendChild(header);
            row.appendChild(input);
            t.appendChild(row);

            _this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(valEl, "input", _this, function() {
                var v = parseFloat(valEl.value);
                if (!isNaN(v)) {
                    if (v < 0) v = 0;
                    if (v > max) v = max;
                    input.value = v;
                    _this.onSliderChange();
                }
            }));
            _this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(valEl, "focus", _this, function() { _this.activeInput = valEl; }));
            _this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(valEl, "blur", _this, function() { _this.activeInput = null; _this.renderSliders(); }));
            
            return { input: input, valEl: valEl };
        };

        var hueObj = createRow("色", 360, 0.1);
        this.hueSlider = hueObj.input;
        this.hueReadout = hueObj.valEl;

        var satObj = createRow("鮮やかさ", 100, 1);
        this.saturationSlider = satObj.input;
        this.saturationReadout = satObj.valEl;

        var briObj = createRow("明るさ", 100, 1);
        this.brightnessSlider = briObj.input;
        this.brightnessReadout = briObj.valEl;

        var alphaObj = createRow("透明度", 100, 1);
        this.alphaSlider = alphaObj.input;
        this.alphaReadout = alphaObj.valEl;

        var hexRow = document.createElement("div");
        hexRow.className = "custom-hex-row";
        
        var previewBg = document.createElement("div");
        previewBg.className = "custom-color-preview-bg";
        this.previewColor = document.createElement("div");
        this.previewColor.className = "custom-color-preview-inner";
        previewBg.appendChild(this.previewColor);
        
        this.hexInput = document.createElement("input");
        this.hexInput.type = "text";
        this.hexInput.className = "custom-hex-input";
        
        hexRow.appendChild(previewBg);
        hexRow.appendChild(this.hexInput);
        t.appendChild(hexRow);

        var btnRow = document.createElement("div");
        btnRow.className = "custom-btn-row";
        
        var btnTrans = document.createElement("button");
        btnTrans.className = "custom-icon-btn custom-btn-transparent";
        btnTrans.title = "完全透明にする";
        btnRow.appendChild(btnTrans);

        if (window.EyeDropper) {
            var btnEye = document.createElement("button");
            btnEye.className = "custom-icon-btn";
            btnEye.title = "画面から色を取得";
            btnEye.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path stroke="#555" stroke-width="1.414" fill="none" d="m 13 8 L 6 15 Q 3 18 2 21 Q 0 23 .5 23.5 Q 1 24 3 22 Q 6 21 9 18 L 16 11"/><path fill="#555" d="m 12 7 Q 11 6 12 5 Q 13 4 14 5 Q 15 6 16 5 Q 20 -1 22.5 1.5 Q 25 4 19 8 Q 18 9 19 10 Q 20 11 19 12 Q 18 13 17 12"/></svg>';
            btnRow.appendChild(btnEye);
            this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(btnEye, "click", this, this.onEyedropperEvent));
        }
        t.appendChild(btnRow);

        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.hueSlider, "input", this, this.onSliderChange));
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.saturationSlider, "input", this, this.onSliderChange));
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.brightnessSlider, "input", this, this.onSliderChange));
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.alphaSlider, "input", this, this.onSliderChange));

        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(btnTrans, "click", this, function() {
            this.alphaSlider.value = 0;
            this.onSliderChange();
        }));

        this.isHexEditing = false;
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.hexInput, "focus", this, function() { this.activeInput = this.hexInput; }));
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.hexInput, "blur", this, function() {
            this.activeInput = null;
            this.renderSliders();
        }));
        this.hsvBoundEvents.push(Blockly.browserEvents.conditionalBind(this.hexInput, "input", this, function() {
            var val = this.hexInput.value;
            if (/^#(?:[0-9a-fA-F]{3,4}){1,2}$/.test(val)) {
                this.setIntermediateValue(val);
                this.updateSliderValues();
            }
        }));

        this.dropdownContainer = t;
        this.updateSliderValues();
    };

    // 3. 値の変更時
    FieldHsvSliders.prototype.onSliderChange = function() {
        var h = parseFloat(this.hueSlider.value) / 360;
        var s = parseFloat(this.saturationSlider.value) / 100;
        var v = parseFloat(this.brightnessSlider.value) / 100;
        var a = parseFloat(this.alphaSlider.value) / 100;
        
        var hex = FieldHsvSliders.hsvToHex(h, s, v);
        if (a < 1) { 
            hex += Math.round(a * 255).toString(16).padStart(2, '0');
        }
        this.setIntermediateValue(hex);
        this.renderSliders();
    };

    // 4. 見た目の更新
    FieldHsvSliders.prototype.renderSliders = function() {
        if (this.activeInput !== this.hueReadout) {
            this.hueReadout.value = parseFloat(this.hueSlider.value).toFixed(1).replace(/\.0$/, '');
        }
        if (this.activeInput !== this.saturationReadout) {
            this.saturationReadout.value = this.saturationSlider.value;
        }
        if (this.activeInput !== this.brightnessReadout) {
            this.brightnessReadout.value = this.brightnessSlider.value;
        }
        if (this.activeInput !== this.alphaReadout) {
            this.alphaReadout.value = this.alphaSlider.value;
        }
        
        var hVal = parseFloat(this.hueSlider.value) / 360;
        var sVal = parseFloat(this.saturationSlider.value) / 100;
        var vVal = parseFloat(this.brightnessSlider.value) / 100;
        var aVal = parseFloat(this.alphaSlider.value) / 100;

        var currentHex = FieldHsvSliders.hsvToHex(hVal, sVal, vVal);
        if (aVal < 1) currentHex += Math.round(aVal * 255).toString(16).padStart(2, '0');

        if (this.activeInput !== this.hexInput) {
            this.hexInput.value = currentHex;
        }
        if (this.previewColor) {
            this.previewColor.style.backgroundColor = currentHex;
        }

        var TR = 12;

        var r = "linear-gradient(to right, ";
        r += FieldHsvSliders.hsvToHex(0, sVal, vVal) + " " + TR + "px, ";
        r += FieldHsvSliders.hsvToHex(1 / 6, sVal, vVal) + ", ";
        r += FieldHsvSliders.hsvToHex(2 / 6, sVal, vVal) + ", ";
        r += FieldHsvSliders.hsvToHex(.5, sVal, vVal) + ", ";
        r += FieldHsvSliders.hsvToHex(4 / 6, sVal, vVal) + ", ";
        r += FieldHsvSliders.hsvToHex(5 / 6, sVal, vVal) + ", ";
        r += FieldHsvSliders.hsvToHex(1, sVal, vVal) + " calc(100% - " + TR + "px))";
        this.hueSlider.style.setProperty("--slider-track-background", r);

        var o = "linear-gradient(to right, ";
        o += FieldHsvSliders.hsvToHex(hVal, 0, vVal) + " " + TR + "px, ";
        o += FieldHsvSliders.hsvToHex(hVal, 1, vVal) + " calc(100% - " + TR + "px))";
        this.saturationSlider.style.setProperty("--slider-track-background", o);

        var l = "linear-gradient(to right, ";
        l += FieldHsvSliders.hsvToHex(hVal, sVal, 0) + " " + TR + "px, ";
        l += FieldHsvSliders.hsvToHex(hVal, sVal, 1) + " calc(100% - " + TR + "px))";
        this.brightnessSlider.style.setProperty("--slider-track-background", l);

        var checkerURL = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2NjYyIvPjxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIGZpbGw9IiNjY2MiLz48cmVjdCB4PSI1IiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMCIgeT0iNSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')";
        var aGrad = "linear-gradient(to right, transparent, " + FieldHsvSliders.hsvToHex(hVal, sVal, vVal) + "), " + checkerURL;
        this.alphaSlider.style.setProperty("--slider-track-background", aGrad);
    };

    // 5. ブロックから初期値セット
    FieldHsvSliders.prototype.updateSliderValues = function() {
        var val = this.getValue() || "#ffffff";
        var hex = val;
        var a = 1;
        if (val.length === 9) { 
            hex = val.substring(0, 7);
            a = parseInt(val.substring(7, 9), 16) / 255;
        }

        var rgbObj = FieldHsvSliders.helperRgb.loadFromHex(hex);
        var hsvObj = FieldHsvSliders.helperHsv.loadFromRgb(rgbObj);

        this.hueSlider.value = String(hsvObj.h * 360);
        this.saturationSlider.value = String(Math.round(hsvObj.s * 100));
        this.brightnessSlider.value = String(Math.round(hsvObj.v * 100));
        this.alphaSlider.value = String(Math.round(a * 100));

        this.renderSliders();
    };
})();