<template>
	<view class="demo-cropper">
		<v587-card label="默认">
			<v587-cropper ref="cropper" @success="onCropperSuccess" />
			<v587-button @tap="open()">打开</v587-button>
		</v587-card>

		<v587-card label="圆形">
			<v587-cropper ref="cropper1" round @success="onCropperSuccess" />
			<v587-button @tap="open1()">打开</v587-button>
		</v587-card>

		<v587-card label="背景模糊">
			<v587-cropper ref="cropper2" filter-blur @success="onCropperSuccess" />
			<v587-button @tap="open2()">打开</v587-button>
		</v587-card>

		<v587-card label="底色">
			<v587-cropper ref="cropper3" background-color="#fff" @success="onCropperSuccess" />
			<v587-button @tap="open3()">打开</v587-button>
		</v587-card>

		<v587-card label="自定义大小">
			<v587-cropper
				ref="cropper4"
				:crop-height="100"
				:crop-width="200"
				@success="onCropperSuccess"
			/>
			<v587-button @tap="open4()">打开</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	methods: {
		open() {
			this.$refs.cropper.open();
		},

		open1() {
			this.$refs.cropper1.open();
		},

		open2() {
			this.$refs.cropper2.open();
		},

		open3() {
			this.$refs.cropper3.open();
		},

		open4() {
			this.$refs.cropper4.open();
		},

		onCropperSuccess(base64) {
			uni.previewImage({
				urls: [base64]
			});
		}
	}
};
</script>

<style>
page {
	height: 100%;
	overflow: hidden;
}
</style>

<style lang="scss" scoped>
.demo-cropper {
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
