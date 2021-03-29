<template>
	<view class="demo-message">
		<v587-message ref="message"></v587-message>
		<v587-card label="不同类型">
			<v587-button @tap="open('success')">
				<text>成功</text>
			</v587-button>
			<v587-button @tap="open('cancel')">
				<text>失败</text>
			</v587-button>
			<v587-button @tap="open('warn')">
				<text>警告</text>
			</v587-button>
			<v587-button @tap="open('info')">
				<text>消息</text>
			</v587-button>
		</v587-card>

		<v587-card label="自定义高度">
			<v587-button @tap="open('success', { top: '150rpx' })">
				<text>150rpx高度</text>
			</v587-button>
			<v587-button @tap="open('cancel', { top: '200rpx' })">
				<text>200rpx高度</text>
			</v587-button>
			<v587-button @tap="open('warn', { top: '250rpx' })">
				<text>250rpx高度</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	methods: {
		open(type, options) {
			this.$refs["message"].open({
				type,
				message: "这是一条消息",
				...options,
			});
		},
	},
};
</script>
