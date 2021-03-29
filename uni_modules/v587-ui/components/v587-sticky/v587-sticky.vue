<template>
	<view class="v587-sticky" :class="[{ 'is-flex': isFlex }]" :style="{ zIndex, top: top2 }">
		<slot></slot>
	</view>
</template>

<script>
	import {
		isNumberString
	} from "../../js_sdk/v587-toolbox/common.js"

	export default {
		name: "v587-sticky",

		props: {
			zIndex: {
				type: Number,
				default: 99,
			},
			top: {
				type: Number | String,
				default: 0,
			},
			isFlex: Boolean,
		},

		computed: {
			top2() {
				const isNumber = isNumberString(this.top)
				// #ifdef H5
				return isNumber ? `calc(44px + ${this.top}rpx)` : this.top;
				// #endif

				// #ifndef H5
				return isNumber ? `calc(0rpx + ${this.top}rpx)` : this.top;
				// #endif
			},
		},
	};
</script>
