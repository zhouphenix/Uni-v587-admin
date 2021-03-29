<template>
	<view
		class="v587-waterfall-column"
		:style="{
			margin,
			width,
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import Parent from "../../mixins/parent";

export default {
	name: "v587-waterfall-column",

	componentName: "ClWaterfallColumn",

	mixins: [Parent],

	data() {
		return {
			Keys: ["gutter", "column"],
			ComponentName: "ClWaterfall",
		};
	},

	computed: {
		width() {
			return `calc(${100 / this.parent.column}% - ${this.parent.gutter}rpx)`;
		},

		margin() {
			return `0 ${this.parent.gutter / 2}rpx`;
		},
	},

	methods: {
		getRect() {
			return new Promise((resolve) => {
				uni.createSelectorQuery()
					.in(this)
					.select(`.v587-waterfall-column`)
					.boundingClientRect(resolve)
					.exec();
			});
		},
	},
};
</script>
