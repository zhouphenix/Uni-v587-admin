<template>
	<view class="demo-divider">
		<v587-card label="基础用法">
			<v587-divider>默认</v587-divider>
			<v587-divider color="#409EFF">不同颜色</v587-divider>
			<v587-divider :color="['#fff', '#F56C6C']">渐变颜色</v587-divider>
			<v587-divider width="50%">线条宽度</v587-divider>
		</v587-card>

		<v587-card label="自定义内容">
			<v587-divider>
				<view class="cs-1">
					<text class="v587-icon-favor"></text>
					<text>猜你喜欢</text>
				</view>
			</v587-divider>
		</v587-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-divider {
	.cs-1 {
		display: flex;
		align-items: center;
		color: $uni-color-error;

		.v587-icon-favor {
			font-size: 32rpx;
			margin-right: 10rpx;
		}
	}
}
</style>