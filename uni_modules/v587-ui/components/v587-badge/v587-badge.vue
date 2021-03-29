<template>
	<view class="v587-badge" v-show="$slots.default || $slots.$default">
		<slot></slot>
		<text v-if="!hidden && (content != 0 || isDot)" :class="[classList]">{{ content }}</text>
	</view>
</template>

<script>
import { isNumber } from "../../js_sdk/v587-toolbox/common.js"

/**
 * badge 角标
 * @description 位于右上角的角标
 * @tutorial https://docs.cool-js.com/uni/components/view/badge.html
 * @property {Boolean} value 文本内容
 * @property {Number} max 最大值
 * @property {Boolean} isDot 是否点状
 * @property {Boolean} hidden 是否隐藏
 * @property {String} type 类型 primary | success | warning | error
 * @example <v587-badge :value="10">Hello !</v587-badge>
 */

export default {
	name: "v587-badge",

	props: {
		// 文本内容
		value: [String, Number],
		// 最大值
		max: Number,
		// 是否点状
		isDot: Boolean,
		// 是否隐藏
		hidden: Boolean,
		// 类型 primary | success | warning | error
		type: String,
	},

	computed: {
		content() {
			if (this.isDot) return "";

			const value = this.value;
			const max = this.max;

			if (isNumber(value) && isNumber(max) && max > 0) {
				return max < value ? `${max}+` : value;
			}

			return value;
		},

		classList() {
			let list = ["v587-badge__content"];

			if (this.type) {
				list.push(`v587-badge__content--${this.type}`);
			}

			if (this.isDot) {
				list.push("is-dot");
			}

			return list.join(" ");
		},
	},
};
</script>
