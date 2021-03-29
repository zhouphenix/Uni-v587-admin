<template>
	<view class="v587-radio-group">
		<slot></slot>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { cloneDeep } from "../../js_sdk/v587-toolbox/common.js"

/**
 * radio-group 单选框组
 * @description 单选框组
 * @tutorial https://docs.cool-js.com/uni/components/form/radio.html
 * @property {String, Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @event {Function} change 绑定值改变时触发
 * @example <v587-radio-group v-model="val"><v587-radio label="1" /><v587-radio label="2" /></v587-radio-group>
 */

export default {
	name: "v587-radio-group",

	componentName: "ClRadioGroup",

	props: {
		// 绑定值
		value: null,
		// 是否禁用
		disabled: Boolean,
		// 是否边框样式
		border: Boolean,
	},

	mixins: [Emitter],

	created() {
		// 监听单选框的变化
		this.$on("radio.change", (label) => {
			this.$emit("input", label);
			this.$emit("change", label);
		});
	},
};
</script>
