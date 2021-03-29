<template>
	<view class="demo-action-sheet">
		<v587-toast ref="v587-toast"></v587-toast>
		<v587-action-sheet ref="v587-action-sheet"></v587-action-sheet>
		<v587-confirm ref="v587-confirm"></v587-confirm>

		<v587-card label="基本用法">
			<v587-button @tap="open1">
				<text>默认操作</text>
			</v587-button>
		</v587-card>

		<v587-card label="关闭拦截">
			<v587-button @tap="open2">
				<text>退出登录</text>
			</v587-button>
		</v587-card>

		<v587-card label="禁用遮罩层">
			<v587-button @tap="open3">
				<text>打开</text>
			</v587-button>
		</v587-card>

		<v587-card label="微信开发能力">
			<v587-button @tap="open4">
				<text>打开</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		showToast(text) {
			this.$refs["v587-toast"].open(text);
		},

		open1() {
			this.$refs["v587-action-sheet"].open({
				list: [
					{
						label: "确认要清空历史记录吗？",
						disabled: true,
						size: "26rpx"
					},
					{
						label: "确定"
					}
				],
				callback: ({ action }) => {
					this.showToast(`你点击了：${action}`);
				}
			});
		},

		open2() {
			this.$refs["v587-action-sheet"].open({
				list: [
					{
						label: "退出登录会清除你的登录信息，确认退出吗？",
						disabled: true,
						size: "26rpx"
					},
					{
						label: "退出登录",
						color: "red",
						click: done => {
							this.$refs["v587-confirm"]
								.open({
									title: "提示",
									message: "再次确认是否退出"
								})
								.then(() => {
									this.showToast("你已成功退出");
									done();
								})
								.catch(err => {
									this.showToast(err);
								});
						}
					}
				],
				callback: ({ action }) => {
					this.showToast(`你点击了：${action}`);
				}
			});
		},

		open3() {
			this.$refs["v587-action-sheet"].open({
				closeOnClickModal: false,
				list: [
					{
						label: "禁用遮罩层",
						disabled: true,
						size: "26rpx"
					}
				]
			});
		},

		open4() {
			this.$refs["v587-action-sheet"].open({
				list: [
					{
						label: "保存海报分享",
						icon: "v587-icon-image",
						openType: "share"
					}
				]
			});
		}
	}
};
</script>
