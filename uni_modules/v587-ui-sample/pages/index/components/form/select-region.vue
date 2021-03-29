<template>
	<view class="demo-select">
		<v587-card label="默认">
			<v587-select-region v-model="val" value-key="value"></v587-select-region>
		</v587-card>

		<v587-card label="省市区">
			<v587-select-region v-model="val1" value-key="label"></v587-select-region>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: [],
			val1: ["福建省", "厦门市", "湖里区"]
		};
	}
};
</script>
