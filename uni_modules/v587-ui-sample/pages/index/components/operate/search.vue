<template>
	<view class="demo-search">
		<v587-toast ref="v587-toast"></v587-toast>

		<v587-card label="默认">
			<v587-search
				v-model="val1"
				placeholder="搜索图片、文章、链接"
				@search="onSearch"
			>
			</v587-search>
		</v587-card>

		<v587-card label="后缀">
			<v587-search
				v-model="val2"
				placeholder="搜索图片、文章、链接"
				@search="onSearch"
			>
				<v587-avatar
					:src="avatarUrl"
					slot="append"
					:size="60"
				></v587-avatar>
			</v587-search>
		</v587-card>

		<v587-card label="前缀">
			<v587-search
				v-model="val3"
				placeholder="搜索图片、文章、链接"
				search-button-text="搜索区域"
				@search="onSearch"
			>
				<v587-select
					v-model="val5"
					:options="options.city"
					slot="prepend"
				></v587-select>
			</v587-search>
		</v587-card>

		<v587-card label="自定义搜索">
			<v587-search
				v-model="val4"
				placeholder="搜索图片、文章、链接"
				:show-search-button="false"
			>
				<v587-button slot="append" type="error" @tap="onSearch2">
					<text>搜索</text>
				</v587-button>
			</v587-search>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl:
				"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/avatar.jpeg",
			val1: "",
			val2: "",
			val3: "",
			val4: "",
			val5: 1,

			options: {
				city: [
					{
						label: "厦门市",
						value: 1,
					},
					{
						label: "福州市",
						value: 2,
					},
					{
						label: "龙岩市",
						value: 3,
					},
				],
			},
		};
	},

	methods: {
		onSearch(val) {
			console.log(val);
			if (val) {
				this.$refs["v587-toast"].open(val);
			}
		},
		onSearch2() {
			if (this.val4) {
				this.$refs["v587-toast"].open(`搜索的是：${this.val4}`);
			}
		},
	},
};
</script>
