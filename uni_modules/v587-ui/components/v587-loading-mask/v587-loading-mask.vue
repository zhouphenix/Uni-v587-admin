<template>
	<view class="v587-loading-mask__wrap">
		<view
			class="v587-loading-mask"
			:class="[classList]"
			:style="{
				background,
				color,
			}"
		>
			<view class="v587-loading-mask__content" v-if="loading">
				<v587-loading :color="color" :loading-theme="loadingTheme"></v587-loading>
				<text v-if="text" class="v587-loading-mask__text">{{ text }}</text>
			</view>
		</view>

		<slot></slot>
	</view>
</template>

<script>
/**
 * loading-mask 加载区域
 * @description 加载区域
 * @tutorial https://docs.cool-js.com/uni/components/feedback/loading.html
 * @property {String} text 加载时文本，默认不显示
 * @property {Boolean} loading 是否加载中
 * @property {String} loadingTheme 加载图标主题
 * @property {Boolean} fullscreen 是否全屏显示
 * @property {String} color 加载图标颜色
 * @property {String} background 背景颜色，默认rgba(255,255,255,0.7)
 * @example <v587-loading-mask :loading="true"></v587-loading-mask>
 */

export default {
	name: "v587-loading-mask",

	props: {
		text: String,
		loading: Boolean,
		loadingTheme: String,
		fullscreen: Boolean,
		color: String,
		background: {
			type: String,
			default: "rgba(255, 255, 255, 0.7)",
		},
	},

	computed: {
		classList() {
			let list = [];

			if (this.fullscreen) {
				list.push("v587-loading-mask--fixed");
			}

			if (this.loading) {
				list.push("is-show");
			}

			return list.join(" ");
		},
	},
};
</script>
