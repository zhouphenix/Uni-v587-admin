<template>
	<view class="demo-confirm">
		<v587-card label="基本弹窗">
			<v587-button @tap="open()">打开</v587-button>
			<v587-confirm ref="confirm"></v587-confirm>
		</v587-card>

		<v587-card label="自定义内容">
			<v587-button @tap="open2()">打开</v587-button>
			<v587-confirm ref="confirm2">
				<v587-input v-model="text" placeholder="请填写名称"></v587-input>
			</v587-confirm>
		</v587-card>

		<v587-toast ref="toast"></v587-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			text: ""
		};
	},

	methods: {
		open() {
			this.$refs.confirm
				.open({
					title: "提示",
					message: "你已成功使用了 COOL-UNI 组件， 祝你有个愉快的体验~~"
				})
				.then(() => {
					this.$refs.toast.open("你点了确认");
				})
				.catch(action => {
					this.$refs.toast.open(`你点了${action == "cancel" ? "取消" : "关闭"}`);
				});
		},

		open2() {
			this.text = "";

			this.$refs.confirm2
				.open({
					title: "提示"
				})
				.then(() => {
					this.$refs.toast.open(this.text ? `你填写的是${this.text}` : "你干嘛不填！！");
				})
				.catch(() => {
					this.$refs.toast.open("你干嘛关闭！！");
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-confirm {
}
</style>
