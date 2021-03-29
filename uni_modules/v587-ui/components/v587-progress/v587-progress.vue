<template>
	<view class="v587-progress">
		<view class="v587-progress-bar" v-if="type === 'line'">
			<view class="v587-progress-bar__outer" :style="{ height }">
				<view
					class="v587-progress-bar__inner"
					:style="{
						backgroundColor,
						width
					}"
				></view>
			</view>
		</view>

		<slot name="text">
			<view class="v587-progress__text" v-if="showText">
				<template v-if="!status">{{ value }}%</template>
				<text class="v587-progress__icon" v-else :class="icon"></text>
			</view>
		</slot>
	</view>
</template>

<script>
import { getCurrentColor } from "../../js_sdk/v587-toolbox/common.js"

/**
 * progress 进度条
 * @description 支持多种颜色显示
 * @tutorial https://docs.cool-js.com/uni/components/view/progress.html
 * @property {Number} value 绑定值
 * @property {String} type 类型
 * @property {String} strokeWidth 线条宽度
 * @property {String} showText 是否显示文本
 * @property {String} color 线条颜色, 支持多色
 * @property {String} status 状态
 * @property {Boolean} icon 尾部图标
 * @example <v587-progress :value="40"></v587-progress>
 */

export default {
	name: "v587-progress",

	props: {
		// 绑定值
		value: {
			type: Number,
			default: 0,
			required: true
		},
		// 类型
		type: {
			type: String,
			default: "line"
		},
		// 线条宽度
		strokeWidth: {
			type: Number,
			default: 12
		},
		// 是否显示文本
		showText: {
			type: Boolean,
			default: true
		},
		// 线条颜色, 支持多色
		color: {
			type: [String, Array],
			default: ""
		},
		// 状态
		status: {
			type: Boolean
		},
		// 尾部图标
		icon: String
	},

	computed: {
		height() {
			return this.strokeWidth + "rpx";
		},
		width() {
			return (
				(() => {
					if (this.value > 100) {
						return 100;
					} else if (this.value < 0) {
						return 0;
					} else {
						return this.value;
					}
				})() + "%"
			);
		},
		backgroundColor() {
			return getCurrentColor({
				value: this.value,
				color: this.color,
				max: 100
			});
		}
	}
};
</script>
