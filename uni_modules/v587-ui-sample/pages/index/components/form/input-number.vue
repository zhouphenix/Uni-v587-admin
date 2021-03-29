<template>
	<view class="demo-input-number">
		<v587-card label="基本用法">
			<v587-input-number v-model="val"></v587-input-number>
		</v587-card>

		<v587-card label="步数">
			<v587-input-number v-model="val1" :step="5"></v587-input-number>
		</v587-card>

		<v587-card label="范围（4~10）">
			<v587-input-number v-model="val2" :max="10" :min="4"></v587-input-number>
		</v587-card>

		<v587-card label="小数">
			<v587-input-number v-model="val3" :step="0.6" :precision="2"></v587-input-number>
		</v587-card>

		<v587-card label="可编辑">
			<v587-input-number v-model="val4" input></v587-input-number>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: 0,
			val1: 5,
			val2: 0,
			val3: 6.66,
			val4: 1
		};
	}
};
</script>
