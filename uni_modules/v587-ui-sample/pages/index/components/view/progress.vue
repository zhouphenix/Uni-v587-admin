<template>
	<view class="demo-progress">
		<v587-card label="基本用法">
			<v587-progress :value="val"></v587-progress>
		</v587-card>

		<v587-card label="不同颜色">
			<v587-row :margin="[0, 0, 20, 0]">
				<v587-progress color="#67C23A" :value="40"></v587-progress>
			</v587-row>

			<v587-row :margin="[0, 0, 20, 0]">
				<v587-progress color="#E6A23C" :value="90"></v587-progress>
			</v587-row>

			<v587-row :margin="[0, 0, 20, 0]">
				<v587-progress color="#F56C6C" :value="20"></v587-progress>
			</v587-row>
		</v587-card>

		<v587-card label="可调节颜色">
			<v587-progress :value="val1" :color="['#F56C6C', '#E6A23C', '#67C23A']"></v587-progress>

			<v587-row :margin="[20, 0, 0, 0]">
				<v587-button round size="mini" @tap="val1 += 10">增加10</v587-button>
				<v587-button round size="mini" @tap="val1 -= 10">减少10</v587-button>
			</v587-row>
		</v587-card>

		<v587-card label="自定义">
			<v587-progress :value="val2">
				<view class="score" slot="text">
					<text v-if="val2 >= 90">优</text>
					<text v-else-if="val2 >= 80">良</text>
					<text v-else-if="val2 >= 60">及格</text>
					<text v-else>{{ val2 }}</text>
				</view>
			</v587-progress>

			<v587-row :margin="[20, 0, 0, 0]">
				<v587-button round size="mini" @tap="val2 += 10">增加10</v587-button>
				<v587-button round size="mini" @tap="val2 -= 10">减少10</v587-button>
			</v587-row>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: 35,
			val1: 15,
			val2: 70
		};
	}
};
</script>

<style lang="scss" scoped>
.demo-progress {
	.score {
		font-size: 28rpx;
		width: 60rpx;
		text-align: center;
	}
}
</style>
