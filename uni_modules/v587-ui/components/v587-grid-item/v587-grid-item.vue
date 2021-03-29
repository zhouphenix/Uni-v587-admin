<template>
	<view class="v587-grid-item" :style="{ width }">
		<slot></slot>
	</view>
</template>

<script>
import Parent from "../../mixins/parent";

/**
 * grid-item 宫格布局项
 * @description 宫格布局，n * n 布局
 * @tutorial https://docs.cool-js.com/uni/components/layout/grid.html
 * @example 见教程
 */

export default {
	name: "v587-grid-item",

	componentName: "ClGridItem",

	mixins: [Parent],

	data() {
		return {
			Keys: ["column", "border"],
			ComponentName: "ClGrid",
		};
	},

	computed: {
		width() {
			return 100 / (this.parent.column || 0) + "%";
		},
	},
};
</script>
