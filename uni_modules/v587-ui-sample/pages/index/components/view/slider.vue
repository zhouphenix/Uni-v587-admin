<template>
	<view class="demo-slider">
		<v587-card label="基本用法">
			<v587-slider v-model="val" show-value></v587-slider>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val: 35
		};
	}
};
</script>

<style lang="scss">
.demo-slider {
}
</style>
