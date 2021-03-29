<template>
	<view class="v587-message__wrap">
		<template v-for="(item, index) in list">
			<view
				class="v587-message"
				v-if="!item.closed"
				:key="item.id"
				:class="[item.visible ? 'is-show' : '']"
				:style="{
					top: item.visible ? item.top : '-200rpx',
				}"
			>
				<icon
					class="v587-message__icon"
					:type="item.type"
					:size="item.iconSize"
					v-if="item.type"
				/>
				<slot>
					<text class="v587-message__content">{{ item.message }}</text>
				</slot>
			</view>
		</template>
	</view>
</template>

<script>
import { isObject, isString, isFunction } from "../../js_sdk/v587-toolbox/common.js"

let id = 0;

/**
 * message 消息提示
 * @description 消息提示
 * @tutorial https://docs.cool-js.com/uni/components/feedback/message.html
 * @property {Boolean} single 是否单个显示，默认false
 * @example <v587-message ref="message"></v587-message>
 */

export default {
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
				message: "",
				type: "success",
				duration: 3000,
				timer: null,
				onClose: null,
				iconSize: 22,
				top: "120rpx",
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
			}, 600);
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
