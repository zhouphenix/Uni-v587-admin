<template>
	<view class="demo-textarea">
		<v587-card label="默认">
			<v587-textarea placeholder="请填写内容"></v587-textarea>
		</v587-card>

		<!-- #ifndef MP-ALIPAY -->
		<v587-card label="带计数">
			<v587-textarea placeholder="请填写内容" count></v587-textarea>
		</v587-card>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>
