<template>
	<view class="v587-color-picker" @click.prevent.stop>
		<view ref="slider" class="sv-picker" @touchstart="setSlider($event, 'sv')" @touchmove="moveSlide($event, 'sv')"
		 @mousedown="onMouseDown($event, 'sv')">
			<view class="sv-picker-background" :style="{backgroundColor: svBackgroundColor}"></view>
			<view class="sv-picker-background" :style="{background: 'linear-gradient(to right, white, #ffffff00)'}"></view>
			<view class="sv-picker-background" :style="{background: 'linear-gradient(to top, black, #ffffff00)'}"></view>
			<view class="sv-slider" :style="svSliderStyle"></view>
		</view>

		<view class="palette">
			<view class="result-color alpha-background-image" :style="{boxShadow: `0 0 10px ${color}`}">
				<view class="alpha-background" :style="{background: pickedColor.rgb}"></view>
			</view>
			<view ref="sliderBars" class="slider-bars">
				<view class="hue-slider" @touchstart="setSlider($event, 'hue')" @touchmove="moveSlide($event, 'hue')" @mousedown="onMouseDown($event, 'hue')">
					<view class="slider" :style="hueSliderStyle" @touchstart="touchSlider($event, 'hue')" @touchmove="moveSlide($event, 'hue')"></view>
				</view>
				<view class="alpha-slider alpha-background-image" @touchstart="setSlider($event, 'alpha')" @touchmove="moveSlide($event, 'alpha')"
				 @mousedown="onMouseDown($event, 'alpha')">
					<view class="alpha-background" :style="{background: alphaBackground}"></view>
					<view class="slider" :style="alphaSliderStyle" @touchstart="touchSlider($event, 'alpha')" @touchmove="moveSlide($event, 'alpha')"></view>
				</view>
			</view>
		</view>
		<view class="result">

			<view class="result-input">
				<view class="result-input__item" v-if="mode === 'HEX'">
					<input type="text" v-model.trim="hexInput" @input="onInput" data-tag='HEX' maxlength="9" />
					<text>HEX</text>
				</view>
				<template v-else>
					<view class="result-input__item">
						<input type="number" v-model.trim="rgbaInput.R" @input="onInput" data-tag='R' maxlength="3" />
						<text>R</text>
					</view>
					<view class="result-input__item">
						<input type="number" v-model.trim="rgbaInput.G" @input="onInput" data-tag='G' maxlength="3" />
						<text>G</text>
					</view>
					<view class="result-input__item">
						<input type="number" v-model.trim="rgbaInput.B" @input="onInput" data-tag='B' maxlength="3" />
						<text>B</text>
					</view>
					<view class="result-input__item">
						<input type="digit" v-model.trim="rgbaInput.A" @input="onInput" data-tag='A' maxlength="3" />
						<text>A</text>
					</view>
				</template>

			</view>

			<view class="model-button" @click="toggleMode"><text>▲\n▼</text></view>
		</view>
		<view class="fav-colors">
			<view v-for="(value, key) in favColors" :key="key" :style="{background: value}" @click.stop="pick(value)"></view>
		</view>
	</view>
</template>

<script>
	const MODES = ['HEX', 'RGBA']

	/**
	 * 原项目地址：  https://github.com/dying318/vue-color-picker
	 * @param {String} color 颜色属性  
	 * @event {Function(color)} pickerColor 实时触发取色事件
	 * 取色器发生取色动作触发，返回两种颜色格式：`{hex: '#ff0000', rgb: 'rgb(255, 0, 0)'}`
	 */
	export default {
		name: 'V587ColorPicker',
		model: {
			prop: 'color',
			event: 'onColorChange'
		},
		props: {
			color: {
				value: String,
				default: '#ffffff',
				required: true
			}
		},
		data() {
			return {
				mode: 'HEX',
				hueSlider: 0,
				alphaSlider: 0,
				saturationSlider: 0,
				valueSlider: 0,
				pickerWidth: 0,
				halfSilder: 15,
				sliderWidth: 0,
				keyIn: false, // 是否通过input输入
				hexInput: '',
				rgbaInput: '',
				favColors: [] // 颜色偏好
			}
		},
		mounted() {
			this.init()
		},
		watch: {
			color: {
				handler: 'colorChange',
				immediate: true
			},

			sliderWidth(val) {
				const {
					r,
					g,
					b,
					a
				} = hexToRgba(this.color)

				const {
					h,
					s,
					v
				} = rgbToHsv(r, g, b)
				this.hueSlider = h * this.sliderWidth
				this.alphaSlider = a * this.sliderWidth
				this.saturationSlider = s * this.pickerWidth
				this.valueSlider = this.pickerWidth - v * this.pickerWidth
			}
		},
		computed: {
			pickedHueColor() {
				const hue = this.hueSlider / this.sliderWidth
				return hsvToRgb(hue, 1, 1)
			},
			pickedColor() {
				if (!this.pickerWidth) {
					return {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
				}
				const hue = this.hueSlider / this.sliderWidth
				const saturation = this.saturationSlider / this.pickerWidth
				const value = (this.pickerWidth - this.valueSlider) / this.pickerWidth
				const alpha = this.alphaSlider / this.sliderWidth

				const rgb = hsvToRgb(hue, saturation, value)
				let color
				if (alpha === 1) {
					color = { ...rgb,
						a: alpha,
						rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
						hex: rgbaToHex(rgb.r, rgb.g, rgb.b, 255)
					}
				} else {
					color = { ...rgb,
						a: alpha,
						rgb: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.round(alpha * 100) / 100})`,
						hex: rgbaToHex(rgb.r, rgb.g, rgb.b, Math.round(alpha * 255))
					}
				}
				return color

			},
			svBackgroundColor() {
				return `rgb(${this.pickedHueColor.r}, ${this.pickedHueColor.g}, ${this.pickedHueColor.b})`
			},
			alphaBackground() {
				let {
					r,
					g,
					b
				} = this.pickedColor
				return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0),  rgba(${r}, ${g}, ${b}, 1))`
			},
			hueSliderStyle() {
				return {
					transform: `translate(${this.hueSlider - this.halfSilder/2}px, -50%)`
				}
			},
			alphaSliderStyle() {
				return {
					transform: `translate(${this.alphaSlider - this.halfSilder/2}px, -50%)`
				}
			},
			svSliderStyle() {
				return {
					transform: `translate(${this.saturationSlider - this.halfSilder}px, ${this.valueSlider - this.halfSilder}px)`
				}
			},

			modeHex() {
				return {
					HEX: this.pickedColor.hex
				}
			},
			modeRgba() {
				let {
					r,
					g,
					b,
					a
				} = this.pickedColor
				return {
					R: r,
					G: g,
					B: b,
					A: a
				}
			},

			modeMap() {
				return this.mode === 'RGBA' ? this.modeRgba : this.modeHex
			},
			isH5() {
				return uni.getSystemInfoSync().platform === 'other'
			},
			// topWindow 高度
			windowTop() {
				return uni.getSystemInfoSync().windowTop
			}

		},
		methods: {
			init() {
				this.initFavColors()
				const sliderInfo = this.$refs.slider.$el.getBoundingClientRect()
				this.pickerWidth = sliderInfo.width
				
				const sliderBarsInfo = this.$refs.sliderBars.$el.getBoundingClientRect()
				this.sliderWidth = this.alphaSlider = this.saturationSlider = sliderBarsInfo.width
				this.sliderBarOffsetX = sliderBarsInfo.x
			},
			initFavColors() {
				this.favColors.push('#e54d42') //嫣红
				this.favColors.push('#f37b1d') //桔橙
				this.favColors.push('#fbbd08') //明黄
				this.favColors.push('#8dc63f') //橄榄
				this.favColors.push('#39b54a') //森绿
				this.favColors.push('#1cbbb4') //天青
				this.favColors.push('#0081ff') //海蓝
				this.favColors.push('#6739b6') //姹紫
				this.favColors.push('#9c26b0') //木槿
				this.favColors.push('#e03997') //桃粉
				this.favColors.push('#a5673f') //棕褐
				this.favColors.push('#8799a3') //玄灰
				this.favColors.push('#aaaaaa') //草灰
				this.favColors.push('#333333') //墨黑
				// this.favColors.push('#ffffff') // 雅白
			},
			colorChange(color) {
				const {
					r,
					g,
					b,
					a
				} = hexToRgba(color)
				const {
					h,
					s,
					v
				} = rgbToHsv(r, g, b)
				if (this.keyIn) {
					this.hueSlider = h * this.sliderWidth
					this.alphaSlider = a * this.sliderWidth
					this.saturationSlider = s * this.pickerWidth
					this.valueSlider = this.pickerWidth - v * this.pickerWidth
				}


				this.hexInput = color
				this.rgbaInput = {
					R: r,
					G: g,
					B: b,
					A: a
				}
			},
			onMouseDown(e, component) {
				this.setSlider(e, component)
				const self = this

				function mouseMove(ev) {
					self.moveSlide(ev, component)
				}
				document.addEventListener('mousemove', mouseMove)
				document.addEventListener('mouseup', _ => {
					document.removeEventListener('mousemove', mouseMove)
				})
			},
			touchSlider(e, component) {
				let {
					pageX,
					pageY
				} = (e.touches && e.touches[0]) || e

				if (component === 'sv') {
					this.startLeft = this.saturationSlider
					this.startPageX = pageX
					this.startTop = this.valueSlider
					this.startPageY = pageY
				} else {
					this.startLeft = this[component + 'Slider']
					this.startPageX = pageX
				}
			},
			moveSlide(e, component) {
				let {
					pageX,
					pageY
				} = (e.touches && e.touches[0]) || e
				if (component === 'sv') {
					this.setSliderValue('saturation', this.startLeft + pageX - this.startPageX)
					this.setSliderValue('value', this.startTop + pageY - this.startPageY - (this.isH5 ? this.windowTop : 0))
				} else {
					this.setSliderValue(component, this.startLeft + pageX - this.startPageX)
				}

				this.emitPickedColor()
			},
			setSlider(e, component) {
				let {
					pageX,
					pageY
				} = (e.touches && e.touches[0]) || e
				if (component === 'sv') {
					const sliderInfo = this.$refs.slider.$el.getBoundingClientRect()
					this.setSliderValue('saturation', pageX - sliderInfo.x)
					this.setSliderValue('value', pageY - sliderInfo.y + this.windowTop)
				} else {
					this.setSliderValue(component, pageX - this.sliderBarOffsetX)
				}

				this.touchSlider(e, component)

				this.emitPickedColor()
			},
			setSliderValue(component, value) {
				this[component + 'Slider'] = Math.min(Math.max(value, 0), ['hue', 'alpha'].indexOf(component) !== -1 ? this.sliderWidth :
					this.pickerWidth)
			},
			emitPickedColor() {
				clearTimeout(this.emitTimer)
				this.emitTimer = setTimeout(() => {
					this.keyIn = false
					this.$emit('onPickColor', {
						rgb: this.pickedColor.rgb,
						hex: this.pickedColor.hex
					})
					this.emitColorChange(this.pickedColor.hex)
				}, 100);
			},

			emitColorChange(hexColor) {
				this.$emit('onColorChange', hexColor)
			},

			toggleMode() {
				let next = (MODES.indexOf(this.mode) + 1) % MODES.length
				this.mode = MODES[next]
			},
			onInput(e) {
				const tag = e.currentTarget.dataset.tag
				let value = e.detail.value
				this.pick(value, tag)
			},
			pick(value, tag = 'HEX') {
				if (tag === 'HEX') {
					// 非‘#’开头，切不属于0-9a-fA-F的字符
					const REG = /(?!^)#|[^#0-9a-fA-F]+/g
					let s = value.replaceAll(REG, '')
					this.$nextTick(_ => this.hexInput = s)
					if (s.startsWith('#') && [4, 7, 9].indexOf(s.length) > -1) { // 满足#fff、 #ffffff、 #ffffff00
						this.keyIn = true
						this.emitColorChange(s)
					}
				} else if (tag === 'R' || tag === 'G' || tag === 'B') {
					if (Number.parseInt(value) > 255) {
						this.$nextTick(_ => this.rgbaInput[tag] = 255)
					}
					let {
						R: r,
						G: g,
						B: b,
						A: a
					} = this.rgbaInput
					this.keyIn = true
					this.emitColorChange(rgbaToHex(r, g, b, Math.round(a * 255)))
				} else if (tag === 'A') {
					if (Number.parseFloat(value) > 1) {
						this.$nextTick(_ => this.rgbaInput[tag] = 1)
					} else if (Number.parseFloat(value) < 0) {
						this.$nextTick(_ => this.rgbaInput[tag] = 0)
					}
					let {
						R: r,
						G: g,
						B: b,
						A: a
					} = this.rgbaInput
					this.keyIn = true

					this.emitColorChange(rgbaToHex(r, g, b, Math.round(a * 255)))
				}
			}

		}
	}

	function hsvToRgb(h, s, v) {
		let r, g, b, i, f, p, q, t;
		if (arguments.length === 1) {
			s = h.s, v = h.v, h = h.h;
		}
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
			case 0:
				r = v, g = t, b = p;
				break;
			case 1:
				r = q, g = v, b = p;
				break;
			case 2:
				r = p, g = v, b = t;
				break;
			case 3:
				r = p, g = q, b = v;
				break;
			case 4:
				r = t, g = p, b = v;
				break;
			case 5:
				r = v, g = p, b = q;
				break;
		}
		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		}
	}

	function rgbToHsv(r, g, b) {
		if (arguments.length === 1) {
			g = r.g, b = r.b, r = r.r;
		}
		let max = Math.max(r, g, b),
			min = Math.min(r, g, b),
			d = max - min,
			h,
			s = (max === 0 ? 0 : d / max),
			v = max / 255;
		switch (max) {
			case min:
				h = 0;
				break;
			case r:
				h = (g - b) + d * (g < b ? 6 : 0);
				h /= 6 * d;
				break;
			case g:
				h = (b - r) + d * 2;
				h /= 6 * d;
				break;
			case b:
				h = (r - g) + d * 4;
				h /= 6 * d;
				break;
		}
		return {
			h,
			s,
			v
		};
	}
	/**rgba 转hex颜色
	 * @param {Object} r 【0, 255】
	 * @param {Object} g  【0, 255】
	 * @param {Object} b  【0, 255】
	 * @param {Object} a  【0, 255】, 如果是【0,1】，需Math.round(a * 255)转换
	 */
	function rgbaToHex(r, g, b, a) {
		let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		if (a !== 255) {
			hex += ((1 << 8) + a).toString(16).slice(1)
		}
		return hex
	}

	function hexToRgba(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: result[4] ? parseInt(result[4], 16) / 255 : 1,
		} : null;
	}
</script>

<style lang="scss" scoped>
	$pickerWidth: 30px;
	$sliderWidth: 15px;
	$sliderBarWidth: 80%;
	$sliderHeight: 30px;
	$verticalSpace: 6px;

	.v587-color-picker {
		position: relative;
		background-color: white;
		width: 220px;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 2px;
		user-select: none;
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);


		.sv-picker {
			position: relative;
			width: 100%;
			padding-top: 100%;

			.sv-slider {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				box-sizing: border-box;
				justify-content: center;
				align-items: center;
				color: rgba($color: white, $alpha: 0.6);
				width: $pickerWidth;
				height: $pickerWidth;
				user-select: none;
				border: 1px solid #FFF;
				background-color: rgba(73, 73, 73, 0.5);
				border-radius: 50px;
				z-index: 1;

				&:hover {
					box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5) inset;
				}

			}

			.sv-picker-background {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}

		.slider {
			position: absolute;
			left: 0;
			top: 50%;
			cursor: grabbing;
			transform: translateY(-50%);
			height: $sliderHeight;
			width: $sliderWidth;
			border: 1px solid #FFF;
			box-sizing: border-box;
			background-color: rgba(199, 199, 199, .7);
		}

		.palette {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;



			.result-color {
				width: 42px;
				height: 42px;
				position: relative;
				transition: 0.3s;

				.result-color__copy {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					display: none;
					cursor: copy;
				}

				&:hover .result-color__copy {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&:hover {
					border: none;
					overflow: hidden;
				}
			}

			.alpha-background {
				width: 100%;
				height: 100%;

			}

			.slider-bars {
				width: $sliderBarWidth;
				display: flex;
				flex-direction: column;
				padding: 10px 0;
				margin-left: 8px;

				.hue-slider,
				.alpha-slider {
					position: relative;
					width: 100%;
					height: 15px;
				}

				.alpha-slider {
					margin-top: $verticalSpace;
				}

				.hue-slider {
					background: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
				}
			}

		}

		.result {
			margin-top: $verticalSpace;
			display: flex;
			align-items: center;
			justify-content: center;


			&-input {
				font-size: 12px;
				display: flex;
				flex-grow: 1;
				justify-content: center;



				&__item {
					&:not(:first-child) {
						margin-left: 10px;
					}

					input {
						height: 22px;
						color: rgb(65, 80, 88);
						align-self: stretch;
						line-height: 22px;
						padding: 0px 4px;
						font-size: 12px;
						background: rgb(246, 247, 248);
						border-width: 1px;
						border-style: solid;
						border-color: rgb(242, 242, 243);
						border-image: initial;
						border-radius: 2px;
						text-align: center;
						overflow: hidden;
						transition: border 0.2s ease-out 0s, box-shadow;
						text-transform: uppercase;

						&:focus-within,
						&:hover {
							border-color: rgb(30, 152, 234);
						}

					}

					text {
						display: block;
						line-height: 12px;
						margin-top: 4px;
						color: rgb(141, 158, 167);
						text-align: center;
					}
				}


			}


			.model-button {
				font-size: 12px;
				text-align: center;
				margin-left: 20px;
				color: grey;
				cursor: pointer;

				&:hover {
					color: black;
					background-color: rgba($color: grey, $alpha: 0.3);
				}
			}
		}

		.fav-colors {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-evenly;
			margin-top: $verticalSpace;

			&>:nth-child(n) {
				width: 24px;
				height: 24px;
				border: 1px solid rgba($color: #000000, $alpha: 0.1);
				margin-top: 2px;
				cursor: pointer;

				&:hover {
					border-color: rgba($color: #000000, $alpha: 0.5);
					box-shadow: 0 0 8px 4px rgba($color: #000000, $alpha: 0.4) inset;
				}
			}

			&>:nth-child(even) {
				border-radius: 50% 0%;
			}

			&>:nth-child(odd) {
				border-radius: 0% 50%;
			}
		}

	}

	.alpha-background-image {
		background-size: 15px;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDkzNzZFN0RDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDkzNzZFN0VDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTM3NkU3QkM4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTM3NkU3Q0M4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktroGEAAAAoSURBVHjaYvz06RMDDPDy8sLZTAw4AOkSjP///4dzPn/+TAs7AAIMAG56COJosoI3AAAAAElFTkSuQmCC);
	}
</style>
