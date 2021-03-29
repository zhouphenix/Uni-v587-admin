<template>
	<view class="v587-checkbox" :class="[classList]" @tap="change">
		<view class="v587-checkbox__input">
			<text class="v587-icon-toast-success" v-if="checked"></text>
		</view>

		<view class="v587-checkbox__label">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter"
import Form from "../../mixins/form"
import Parent from "../../mixins/parent"
import { isBoolean } from "../../js_sdk/v587-toolbox/common.js"

/**
 * checkbox 多选框
 * @description 多选框
 * @tutorial https://docs.cool-js.com/uni/components/form/checkbox.html
 * @property {String, Number} value 绑定值
 * @property {String, Number} label 标识
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @property {Boolean} round 是否圆角
 * @property {Boolean} fill 是否宽度填充
 * @event {Function} change 绑定值改变时触发
 * @example <v587-checkbox label="1"></v587-checkbox>
 */

export default {
	name: "v587-checkbox",

	componentName: "ClCheckbox",

	props: {
		// 绑定值
		value: null,
		// 标识
		label: [String, Number],
		// 是否禁用
		disabled: Boolean,
		// 是否边框样式
		border: Boolean,
		// 是否圆角
		round: Boolean,
		// 是否宽度填充
		fill: Boolean,
	},

	mixins: [Emitter, Form, Parent],

	data() {
		return {
			checked: false,
			Keys: ["border", "disabled", "value"],
			ComponentName: "ClCheckboxGroup",
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.checked = Boolean(val);
			},
		},
		"parent.value": {
			immediate: true,
			handler(val) {
				if (this.hasParent) {
					this.checked = val.includes(this.label);
				}
			},
		},
	},

	computed: {
		isRound() {
			return this.hasParent ? this.parent.round || this.round : this.round;
		},

		isBorder() {
			return this.hasParent ? this.parent.border || this.border : this.border;
		},

		isDisabled() {
			let disabled = this.hasParent ? this.parent.disabled || this.disabled : this.disabled;
			return this.$form ? this.$form.disabled || disabled : disabled;
		},

		classList() {
			let list = [];

			if (this.isBorder) {
				list.push("v587-checkbox--border");
			}

			if (this.isRound) {
				list.push("v587-checkbox--round");
			}

			if (this.isDisabled) {
				list.push("is-disabled");
			}

			if (this.checked) {
				list.push("is-checked");
			}

			if (this.fill) {
				list.push("is-fill");
			}

			return list.join(" ");
		},
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = !this.checked;

			// 回调到组件或者多选框组
			if (this.hasParent) {
				this.dispatch("ClCheckboxGroup", "checkbox.change", this.label);
			} else {
				this.$emit("input", this.checked);
				this.$emit("change", this.checked);
			}
		},
	},
};
</script>
