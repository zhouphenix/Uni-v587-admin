<template>
	<view class="v587-input" :class="[classList]">
		<view class="v587-input__prepend" v-if="$slots.prepend">
			<slot name="prepend"></slot>
		</view>

		<view class="v587-input__wrap">
			<text
				class="v587-input__icon"
				:class="[prefixIcon]"
				v-if="prefixIcon"
				@tap="prefixIconTap"
			></text>
			<text
				class="v587-input__icon"
				:class="[suffixIcon]"
				v-if="suffixIcon"
				@tap="suffixIconTap"
			></text>

			<template v-if="type == 'password'">
				<input
					class="v587-input__inner"
					v-model="value2"
					type="password"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'number'">
				<input
					class="v587-input__inner"
					v-model="value2"
					type="number"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'idcard'">
				<input
					class="v587-input__inner"
					v-model="value2"
					type="idcard"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else-if="type == 'digit'">
				<input
					class="v587-input__inner"
					v-model="value2"
					type="digit"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<template v-else>
				<input
					class="v587-input__inner"
					v-model="value2"
					type="text"
					:password="password"
					:placeholder="placeholder"
					:disabled="disabled"
					:focus="focus"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClass"
					:maxlength="maxlength"
					:cursor-spacing="cursorSpacing"
					:confirm-type="confirmType"
					:confirm-hold="confirmHold"
					:adjust-position="adjustPosition"
					:holdKeyboard="holdKeyboard"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardheightchange"
				/>
			</template>

			<!-- #ifdef MP-ALIPAY -->
			<text class="v587-input__clear v587-icon-close-border" @tap="clear" v-if="clearable"></text>
			<!-- #endif -->

			<!-- #ifndef MP-ALIPAY -->
			<text
				class="v587-input__clear v587-icon-close-border"
				@tap="clear"
				v-if="isFocus && clearable"
			></text>
			<!-- #endif -->
		</view>

		<view class="v587-input__append" v-if="$slots.append">
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script>
import Form from "../../mixins/form";

/**
 * input 输入框
 * @description 该组件基于官方的 input 组件。参数与官方一致，同时添加新的支持。
 * @tutorial https://docs.cool-js.com/uni/components/basic/input.html
 * @property {Boolean} round 是否圆角
 * @property {Boolean} border 是否带有边框
 * @property {String} prefixIcon 前缀图标
 * @property {String} suffixIcon 后缀图标
 * @event {Function} change 值发生改变时触发
 * @event {Function} search 搜索时触发
 * @event {Function} clear 清空值时触发
 * @event {Function} prefix-icon-tap 前缀图标点击时
 * @event {Function} suffix-icon-tap 后缀图标点击时
 * @example <v587-input v-model="val"></v587-input>
 */

export default {
	name: "v587-input",

	props: {
		value: [String, Number],
		type: {
			type: String,
			default: "text",
		},
		password: Boolean,
		placeholder: String,
		clearable: Boolean,
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		round: Boolean,
		border: {
			type: Boolean,
			default: true,
		},
		focus: Boolean,
		maxlength: {
			type: [Number, String],
			default: 140,
		},
		cursorSpacing: {
			type: Number,
			default: 0,
		},
		confirmType: {
			type: String,
			default: "done",
		},
		confirmHold: Boolean,
		adjustPosition: {
			type: Boolean,
			default: true,
		},
		holdKeyboard: {
			type: Boolean,
			default: false,
		},
		prefixIcon: String,
		suffixIcon: String,
	},

	computed: {
		classList() {
			let list = [];

			if (this.prefixIcon) {
				list.push("v587-input--prefix");
			}

			if (this.suffixIcon) {
				list.push("v587-input--suffix");
			}

			if (this.isFocus) {
				list.push("v587-input--focus");
			}

			if (this.disabled) {
				list.push("is-disabled");
			}

			if (this.round) {
				list.push("is-round");
			}

			if (this.border) {
				list.push("is-border");
			}

			return list.join(" ");
		},
	},

	mixins: [Form],

	data() {
		return {
			value2: null,
			isFocus: false,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val;
			},
		},
	},

	methods: {
		onInput() {
			this.$emit("input", this.value2);
			this.$emit("change", this.value2);
		},

		onFocus(e) {
			this.$emit("focus", e);
			this.isFocus = true;
		},

		onBlur(e) {
			this.$emit("blur", e);

			setTimeout(() => {
				this.isFocus = false;
			}, 0);
		},

		onConfirm(e) {
			this.$emit("confirm", e);
			this.search();
		},

		onKeyboardheightchange(e) {
			this.$emit("keyboardheightchange", e);
		},

		search() {
			this.$emit("search", this.value2);
		},

		clear() {
			this.value2 = "";
			this.$emit("input", "");
			this.$emit("change", "");
			this.$emit("clear");
		},

		prefixIconTap() {
			this.$emit("prefix-icon-tap", this.value2);
		},

		suffixIconTap() {
			this.$emit("suffix-icon-tap", this.value2);
		},
	},
};
</script>
