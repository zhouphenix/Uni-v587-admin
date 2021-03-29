<template>
	<view class="demo-icon">
		<v587-card label="图标">
			<v587-row :gutter="20">
				<v587-col span="8" v-for="(item, index) in list" :key="index">
					<view class="block">
						<v587-icon :name="item" :size="44"></v587-icon>
						<text class="label">v587-icon-{{ item }}</text>
					</view>
				</v587-col>
			</v587-row>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				"refresh",
				"search",
				"check",
				"close",
				"plus",
				"minus",
				"plus-border",
				"minus-border",
				"check-border",
				"close-border",
				"help-border",
				"warning-border",
				"wait-border",
				"meh-border",
				"cry-border",
				"smile-border",
				"back-top",
				"calendar",
				"customer-service",
				"scan",
				"pay",
				"stop",
				"play",
				"more",
				"map",
				"keyboard-9",
				"keyboard-26",
				"edit",
				"chart-bar",
				"chart-pie",
				"cloud-upload",
				"cloud-download",
				"eye-open",
				"eye-close",
				"like",
				"my",
				"friend",
				"set",
				"arrow-top",
				"arrow-bottom",
				"arrow-left",
				"arrow-double-left",
				"arrow-right",
				"arrow-double-right",
				"top",
				"upgrade",
				"rise",
				"decline",
				"active",
				"fullscreen",
				"enlarge",
				"shrink",
				"cropper",
				"share",
				"link",
				"back",
				"enter",
				"notification",
				"toast-waiting",
				"toast-success",
				"toast-error",
				"toast-warning",
				"caret-bottom",
				"caret-top",
				"clock-fill",
				"favor-fill",
				"success-fill",
				"delete-fill",
				"smile-fill",
				"meh-fill",
				"cry-fill",
				"like-fill",
				"history-fill",
				"map-fill"
			]
		};
	}
};
</script>

<style lang="scss">
.demo-icon {
	.block {
		text-align: center;
		box-sizing: border-box;
		height: 200rpx;
		padding-top: 50rpx;

		.label {
			display: block;
			font-size: 22rpx;
			margin-top: 10rpx;
		}
	}
}
</style>
