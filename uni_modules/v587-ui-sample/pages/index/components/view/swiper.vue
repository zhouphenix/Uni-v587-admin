<template>
	<view class="demo-swiper">
		<v587-card label="默认">
			<v587-swiper :list="list"> </v587-swiper>
		</v587-card>

		<v587-card label="卡片式">
			<v587-swiper type="card" :list="list"></v587-swiper>
		</v587-card>

		<v587-card label="链式">
			<v587-swiper type="chain" :list="list"></v587-swiper>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				"/uni_modules/v587-ui-sample/static/images/banner1.png",
				"/uni_modules/v587-ui-sample/static/images/banner2.png",
				"/uni_modules/v587-ui-sample/static/images/banner3.png"
			]
		};
	}
};
</script>
