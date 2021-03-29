<template>
	<view class="demo-text">
		<v587-card label="默认">
			<v587-text value="云想衣裳花想容，春风拂槛露华浓。"></v587-text>
		</v587-card>

		<v587-card label="不同颜色">
			<view class="color">
				<v587-text value="主色" color="primary"></v587-text>
				<v587-text value="成功" color="success"></v587-text>
				<v587-text value="错误" color="error"></v587-text>
				<v587-text value="警告" color="warning"></v587-text>
				<v587-text value="信息" color="info"></v587-text>
			</view>
		</v587-card>

		<v587-card label="手机号">
			<v587-text type="phone" value="13255022022"></v587-text>
		</v587-card>

		<v587-card label="金额">
			<v587-text type="price" :size="40" value="19450"></v587-text>
		</v587-card>

		<v587-card label="下划线">
			<v587-text underline value="https://uni.cool-js.com" @tap="toLink"></v587-text>
		</v587-card>

		<v587-card label="前缀图标">
			<v587-text prefix-icon="help-border" value="有哪些小众又高级的礼物?"></v587-text>
		</v587-card>

		<v587-card label="后缀图标">
			<v587-text suffix-icon="smile-fill" value="君远隔重楼，北望愿相逢"></v587-text>
		</v587-card>

		<v587-card label="超出隐藏">
			<v587-text
				:ellipsis="2"
				block
				value="锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"
			></v587-text>
		</v587-card>
	</view>
</template>

<script>
export default {
	methods: {
		toLink() {
			location.href = "https://uni.cool-js.com";
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-text {
	padding-bottom: env(safe-area-inset-bottom);

	.color {
		/deep/.v587-text {
			margin-right: 20rpx;
		}
	}
}
</style>
