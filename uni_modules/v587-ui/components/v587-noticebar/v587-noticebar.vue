<template>
	<view
		class="v587-noticebar"
		:class="[classList]"
		:style="{
			color,
			backgroundColor,
		}"
		v-if="visible"
	>
		<view class="v587-noticebar__close" @tap="close" v-if="closeable">
			<v587-icon name="v587-icon-close-border" :size="36"></v587-icon>
		</view>

		<view class="v587-noticebar__icon" v-if="$slots.icon || icon">
			<slot v-if="$slots.icon" name="icon"></slot>
			<v587-icon v-else :name="icon" :size="36"></v587-icon>
		</view>

		<view class="v587-noticebar__box">
			<view
				class="v587-noticebar__scroller"
				:class="[`is-${direction}`]"
				:style="{
					top: scroll.top + 'px',
					left: scroll.left + 'px',
					transition,
					transform: `translateX(-${scroll.translateX}px)`,
				}"
			>
				<text class="v587-noticebar__text" v-for="(item, index) in list" :key="index">{{
					item
				}}</text>
			</view>
		</view>

		<view class="v587-noticebar__more"></view>
	</view>
</template>

<script>
import { isArray } from "../../js_sdk/v587-toolbox/common.js"

/**
 * noticebar 通知栏
 * @description 支持水平垂直方式滚动
 * @tutorial https://docs.cool-js.com/uni/components/view/noticebar.html
 * @property {String, Array} text 文本内容
 * @property {String} direction 方向 horizontal | vertical，默认horizontal
 * @property {String} color 字体颜色
 * @property {String} backgroundColor 背景颜色
 * @property {String} type 通知类型
 * @property {Boolean} scrollable 能否滚动
 * @property {Boolean} closeable 能否关闭
 * @property {String} icon 图标
 * @property {Number} duration 滑动时长（秒），默认6
 * @example <v587-noticebar text="云想衣裳花想容，春风拂槛露华浓。"></v587-noticebar>
 */

export default {
	name: "v587-noticebar",

	props: {
		// 文本内容
		text: {
			type: [String, Array],
			default: "",
			required: true,
		},
		// 方向 horizontal | vertical
		direction: {
			type: String,
			default: "horizontal",
		},
		// 字体颜色
		color: {
			type: String,
			default: "#444",
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		// 通知类型
		type: {
			type: String,
			default: "default",
		},
		// 能否滚动
		scrollable: Boolean,
		// 能否关闭
		closeable: Boolean,
		// 图标
		icon: String,
		// 滑动时长（秒），默认6
		duration: {
			type: Number,
			default: 6,
		},
	},

	data() {
		return {
			scroll: {
				left: 0,
				top: 0,
				translateX: 0,
				duration: 0,
			},
			timer: null,
			visible: true,
		};
	},

	computed: {
		list() {
			return isArray(this.text) ? this.text : [this.text];
		},

		classList() {
			let list = [];

			if (this.scrollable) {
				list.push("v587-noticebar--scrollable");
			}

			return list.join(" ");
		},

		transition() {
			if (this.direction == "horizontal") {
				return `transform ${this.scroll.duration}s linear`;
			} else {
				return `top 0.3s`;
			}
		},
	},

	mounted() {
		this.refresh();
	},

	destroyed() {
		this.clear();
		this.timer = null;
	},

	methods: {
		close() {
			this.visible = false;
		},

		clear() {
			clearInterval(this.timer);
			clearTimeout(this.timer);
		},

		refresh() {
			if (this.scrollable) {
				// 清除定时器
				this.clear();

				// 获取盒子大小
				uni.createSelectorQuery()
					.in(this)
					.select(`.v587-noticebar__box`)
					.boundingClientRect((box) => {
						// 获取文本大小
						uni.createSelectorQuery()
							.in(this)
							.select(`.v587-noticebar__text`)
							.boundingClientRect((text) => {
								let duration = this.duration * 1000;

								// 水平滑动
								if (this.direction == "horizontal") {
									const fn = () => {
										this.scroll.duration = this.duration;
										this.scroll.left = box.width;
										this.scroll.translateX = text.width + this.scroll.left;

										this.timer = setTimeout(() => {
											this.scroll.translateX = 0;
											this.scroll.duration = 0;

											setTimeout(fn, 500);
										}, duration);
									};

									fn();
								}
								// 垂直滑动
								else {
									this.timer = setInterval(() => {
										if (
											Math.abs(this.scroll.top) >=
											box.height * (this.list.length - 1)
										) {
											this.scroll.top = 0;
										} else {
											this.scroll.top -= box.height;
										}
									}, duration);
								}
							})
							.exec();
					})
					.exec();
			}
		},
	},
};
</script>
