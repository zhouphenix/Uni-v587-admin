<template>
	<view class="demo-scroller">
		<v587-scroller ref="scroller" @up="onUp" @down="onDown">
			<view class="item" v-for="(item, index) in list" :key="index">
				<v587-list-item :label="`${index + 1}`"></v587-list-item>
			</view>

			<v587-loadmore v-if="list.length > 0" :loading="loading"></v587-loadmore>
		</v587-scroller>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			loading: false
		};
	},

	created() {
		this.list = new Array(20).fill(1);
	},

	methods: {
		onUp() {
			this.loading = true;

			setTimeout(() => {
				this.list.push(...new Array(20).fill(1));
				this.loading = false;
			}, 1000);
		},

		onDown() {
			setTimeout(() => {
				this.list = new Array(20).fill(1);
				this.$refs["scroller"].end();
			}, 1000);
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
}

.demo-scroller {
	height: 500px;
	overflow: hidden;
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: border-box;

	.item {
		margin: 20rpx;
	}
}
</style>
