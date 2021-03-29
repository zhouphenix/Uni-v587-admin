<template>
	<view class="demo-captcha">
		<v587-card label="默认">
			<v587-captcha v-model="val" @done="done"></v587-captcha>
		</v587-card>

		<v587-card label="设置高度">
			<v587-captcha v-model="val1" :height="150" @done="done"></v587-captcha>
		</v587-card>

		<v587-card label="设置位数">
			<v587-captcha v-model="val2" :length="6" :gutter="10" @done="done"></v587-captcha>
		</v587-card>

		<v587-toast ref="toast"></v587-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: "",
			val1: "1",
			val2: "123"
		};
	},

	methods: {
		done(v) {
			this.$refs["toast"].open(v);
		}
	}
};
</script>

<style lang="scss">
.demo-captcha {
}
</style>
