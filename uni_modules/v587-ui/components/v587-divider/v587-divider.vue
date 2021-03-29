<template>
	<view class="v587-divider">
		<view class="v587-divider__line" :style="{ background: lineColor, width }"></view>

		<view
			class="v587-divider__text"
			:style="{
				backgroundColor
			}"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script>
import { isArray } from "../../js_sdk/v587-toolbox/common.js"
/**
 * divider 分隔符
 * @description 分割符组件，区隔内容的分割线
 * @tutorial https://docs.cool-js.com/uni/components/basic/divider.html
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String, Array} color 线条颜色，Array 下当渐变色处理
 * @property {String} width 线条宽度
 * @example <v587-divider>默认</v587-divider>
 */

export default {
	name: "v587-divider",

	props: {
		backgroundColor: {
			type: String,
			default: "#fff"
		},

		color: {
			type: [String, Array],
			default: "#dcdfe6"
		},

		width: {
			type: String,
			default: "100%"
		}
	},

	computed: {
		lineColor() {
			if (isArray(this.color)) {
				const [a, b] = this.color || [];
				return `linear-gradient(to right, ${a}, ${b}, ${b}, ${a})`;
			} else {
				return this.color;
			}
		}
	}
};
</script>
