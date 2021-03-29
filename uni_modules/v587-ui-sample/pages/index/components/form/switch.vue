<template>
	<view class="demo-switch">
		<v587-card label="基本用法">
			<v587-switch type="success" v-model="form.a" color="var(--color-primary)"></v587-switch>
			<text class="label">{{ form.a ? '开启' : '关闭' }}</text>
		</v587-card>

		<v587-card label="禁用状态">
			<v587-switch type="success" v-model="form.b" disabled></v587-switch>
			<v587-switch color="var(--color-primary)" type="success" v-model="form.c" disabled></v587-switch>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: false,
				b: false,
				c: true
			}
		};
	}
};
</script>

<style lang="scss">
.demo-switch {
	.label {
		font-size: 26rpx;
	}

	.v587-switch {
		margin-right: 20rpx;
	}
}
</style>