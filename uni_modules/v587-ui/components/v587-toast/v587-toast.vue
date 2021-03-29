<template>
	<view class="v587-toast__wrap">
		<template v-for="(item, index) in list">
			<view
				class="v587-toast"
				v-if="!item.closed"
				:key="item.id"
				:class="[
					`v587-toast--${item.type}`,
					`is-${item.position}`,
					item.visible ? 'is-show' : '',
					item.icon ? 'is-icon' : '',
				]"
			>
				<view class="v587-toast__icon" v-if="item.icon">
					<v587-icon :name="`v587-icon-toast-${item.icon}`"></v587-icon>
				</view>

				<slot>
					<text class="v587-toast__content">{{ item.message }}</text>
				</slot>
			</view>
		</template>
	</view>
</template>

<script>
import { isObject, isString, isFunction } from "../../js_sdk/v587-toolbox/common.js"

let id = 0;

/**
 * toast 吐司提示
 * @description 吐司提示
 * @tutorial https://docs.cool-js.com/uni/components/feedback/toast.html
 * @property {Boolean} single 是否单个显示，默认false
 * @example <v587-toast ref="toast"></v587-toast>
 */

export default {
	name: "v587-toast",

	props: {
		// 是否单个显示
		single: Boolean,
	},

	data() {
		return {
			list: [],
		};
	},

	methods: {
		open(d) {
			// 默认配置
			let options = {
				id: id++,
				visible: false,
				closed: false,
				icon: "",
				message: "",
				duration: 2000,
				type: "default",
				position: "bottom",
				timer: null,
				onClose: null,
				iconSize: 22,
			};

			// 合并参数
			if (isObject(d)) {
				Object.assign(options, d);
			} else {
				options.message = d;
			}

			// 是否同时存在多个提示
			if (this.single) {
				this.list = [options];
			} else {
				this.list.push(options);
			}

			setTimeout(() => {
				this.create(options);
			}, 50);
		},

		close(item) {
			// 清空计时器
			clearTimeout(item.timer);
			item.visible = false;

			// 关闭回调
			if (isFunction(item.onClose)) {
				item.onClose(this);
			}

			setTimeout(() => {
				item.closed = true;
			}, 300);
		},

		create(item) {
			const { duration } = item || {};

			if (duration > 0) {
				item.visible = true;

				item.timer = setTimeout(() => {
					this.close(item);
				}, duration);
			}
		},
	},
};
</script>
