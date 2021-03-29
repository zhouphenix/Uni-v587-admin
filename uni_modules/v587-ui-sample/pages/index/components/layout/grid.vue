<template>
	<view class="demo-grid">
		<v587-card label="默认">
			<v587-grid :column="4" @change="onChange" border>
				<v587-grid-item v-for="(item, index) in 12" :key="index" :index="index">
					<view class="block">
						<v587-button round size="small" :type="index | type" @tap="onTap(index)">{{
							index
						}}</v587-button>
					</view>
				</v587-grid-item>
			</v587-grid>
		</v587-card>

		<v587-toast ref="toast"></v587-toast>
	</view>
</template>

<script>
export default {
	methods: {
		onTap(index) {
			this.$refs["toast"].open(`点击了${index}`);
		}
	},

	filters: {
		type() {
			return ["primary", "success", "error", "warning", "info"][parseInt(Math.random() * 5)];
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-grid {
	.block {
		text-align: center;
		font-size: 30rpx;
		padding: 40rpx 0;
	}
}
</style>
