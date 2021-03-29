<template>
	<view class="demo-list">
		<v587-card label="基础用法">
			<v587-list-item label="账单"></v587-list-item>
		</v587-card>

		<v587-card label="带图标">
			<v587-list-item label="总资产">
				<image slot="icon" :src="require('../../../../static/icon/all.png')" alt />
			</v587-list-item>
		</v587-card>

		<v587-card label="带描述">
			<v587-list-item label="余额">
				<v587-text type="price" :size="30" :value="159.2"></v587-text>
			</v587-list-item>
		</v587-card>

		<v587-card label="禁用">
			<v587-list-item label="银行卡" disabled>
				<text>兴业银行(***1113)</text>
			</v587-list-item>
		</v587-card>

		<v587-card label="滑动">
			<v587-list-item label="右滑动" swipe="left">
				<text slot="append" class="v587-icon-arrow-right"></text>

				<view class="append" slot="menu">
					<button class="primary-btn">置顶</button>
					<button class="error-btn">删除</button>
				</view>
			</v587-list-item>

			<v587-list-item label="左滑动" swipe="right">
				<text slot="append" class="v587-icon-arrow-right"></text>

				<view class="append" slot="menu">
					<button class="primary-btn">置顶</button>
					<button class="error-btn">删除</button>
				</view>
			</v587-list-item>
		</v587-card>

		<v587-card label="自定义">
			<v587-list-item type="success">
				<view class="cs-block">
					<v587-avatar :src="avatarUrl"></v587-avatar>
					<text>神仙都没用</text>
				</view>

				<view class="append" slot="append">
					<v587-button type="primary" @tap="chooseImage">修改头像</v587-button>
				</view>
			</v587-list-item>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl: "https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
		};
	},

	methods: {
		chooseImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.avatarUrl = res.tempFilePaths[0];
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-list {
	/deep/.v587-card__container {
		padding: 0;
	}

	.cs-block {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 20rpx 10rpx;

		/deep/.v587-avatar {
			height: 100rpx;
			width: 100rpx;
			margin-right: 30rpx;
			border-radius: 10rpx;
		}
	}

	.append {
		display: flex;

		.primary-btn,
		.error-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 0;
			height: 100rpx;
			width: 130rpx;
			font-size: 26rpx;
			color: #fff;
			box-sizing: border-box;
			margin: 0;
			border: 0;

			&::after {
				border: 0;
			}
		}

		.primary-btn {
			background-color: $uni-color-primary;
		}

		.error-btn {
			background-color: $uni-color-error;
		}
	}
}
</style>
