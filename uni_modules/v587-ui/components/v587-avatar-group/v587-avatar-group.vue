<template>
	<view class="v587-avatar-group">
		<template v-for="(item, index) in urls">
			<v587-avatar
				v-if="index < max"
				:key="index"
				:size="size"
				:shape="shape"
				:mode="mode"
				:src="item"
			></v587-avatar>
		</template>

		<v587-avatar :size="size" :shape="shape" v-if="overLen > 0 && showMore">
			<view class="v587-avatar-group__more"> {{ overLen }} </view>
		</v587-avatar>
	</view>
</template>

<script>
/**
 * avatar-group 头像组
 * @description 头像组
 * @tutorial https://docs.cool-js.com/uni/components/view/avatar.html
 * @property {Array} urls 图片链接
 * @property {Number} max 最大数量，默认5
 * @property {Number} size 头像大小，默认80
 * @property {String} shape 头像的形状，默认circle
 * @property {String} mode 裁剪,缩放模式
 * @example <v587-avatar-group :urls="['http://']" />
 */

export default {
	name: "v587-avatar-group",

	props: {
		urls: Array,
		size: {
			type: Number,
			default: 80,
		},
		max: {
			type: Number,
			default: 5,
		},
		shape: {
			type: String,
			default: "circle",
		},
		showMore: {
			type: Boolean,
			default: true,
		},
		mode: {
			type: String,
			default: "scaleToFill",
		},
	},

	computed: {
		overLen() {
			return this.urls.length - this.max;
		},
	},
};
</script>
