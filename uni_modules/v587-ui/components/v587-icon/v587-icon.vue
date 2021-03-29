<template>
	<text :class="['v587-icon', `v587-icon-${name2}`]" :style="style"></text>
</template>

<script>
	import {
		isNumber,
		parseRpx
	} from "../../js_sdk/v587-toolbox/common.js"

	/**
	 * icon 图标
	 * @description 字体图标
	 * @tutorial https://docs.cool-js.com/uni/components/basic/icon.html
	 * @property {String} name 图标名称
	 * @property {String, Number} size 图标大小
	 * @property {String} color 图标颜色
	 * @example <v587-icon name="search" />
	 */

	export default {
		name: "v587-icon",

		props: {
			name: String,
			size: [String, Number],
			color: String,
		},

		computed: {
			name2() {
				return this.name.replace("v587-icon-", "");
			},
			style() {
				return {
					fontSize: parseRpx(this.size),
					color: this.color
				}
			}
		},

		methods: {
			parseRpx,
		},
	};
</script>
