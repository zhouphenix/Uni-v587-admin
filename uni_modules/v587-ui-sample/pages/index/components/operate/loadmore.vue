<template>
	<view class="load-more">
		<v587-card label="提示类型">
			<v587-row>
				<v587-loadmore
					background-color="#fff"
					:loading="loading"
					:finish="finish"
					>没有更多了</v587-loadmore
				>
			</v587-row>

			<v587-button @tap="go('start')">
				<text>开始</text>
			</v587-button>
			<v587-button @tap="go('load')">
				<text>加载</text>
			</v587-button>
			<v587-button @tap="go('finish')">
				<text>结束</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			finish: false
		};
	},

	methods: {
		go(action) {
			if (action == "start") {
				this.loading = false;
				this.finish = false;
			}

			if (action == "load") {
				this.loading = true;
			}

			if (action == "finish") {
				this.finish = true;
			}
		}
	}
};
</script>