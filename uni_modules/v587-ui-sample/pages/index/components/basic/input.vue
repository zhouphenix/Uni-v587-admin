<template>
	<view class="demo-input">
		<v587-card label="基础用法">
			<v587-input placeholder="请输入内容"></v587-input>
		</v587-card>

		<v587-card label="禁用状态">
			<v587-input placeholder="请输入内容" disabled></v587-input>
		</v587-card>

		<v587-card label="可清空">
			<v587-input placeholder="请输入内容" clearable></v587-input>
		</v587-card>

		<v587-card label="圆角">
			<v587-input placeholder="请输入内容" round></v587-input>
		</v587-card>

		<v587-card label="带icon">
			<view class="row">
				<v587-input
					v-model="val3"
					placeholder="请输入内容"
					prefix-icon="v587-icon-search"
					@prefix-icon-tap="onPrefixIconTap"
				></v587-input>
			</view>

			<view class="row">
				<v587-input placeholder="请输入内容" suffix-icon="v587-icon-search"></v587-input>
			</view>
		</v587-card>

		<v587-card label="自定义">
			<view class="row">
				<v587-input placeholder="请输入内容">
					<text slot="prepend">https://</text>
				</v587-input>
			</view>

			<view class="row">
				<v587-input placeholder="请输入内容">
					<text slot="append">.com</text>
				</v587-input>
			</view>

			<view class="row">
				<v587-input placeholder="请输入内容">
					<view slot="prepend">
						<v587-select v-model="val5" :options="options.city" style="width: 100px;"></v587-select>
					</view>
					<v587-button type="success" size="mini" round slot="append">搜索关键字</v587-button>
				</v587-input>
			</view>
		</v587-card>

		<v587-toast ref="toast"></v587-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			val1: "",
			val2: "",
			val3: "",
			val4: "",
			val5: 1,
			options: {
				city: [
					{
						label: "厦门市",
						value: 0
					},
					{
						label: "福州市",
						value: 1
					},
					{
						label: "龙岩市",
						value: 2
					}
				]
			}
		};
	},

	methods: {
		onPrefixIconTap(val) {
			this.$refs["toast"].open("输入" + val);
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-input {
	.row {
		margin-bottom: 9px;
	}
}
</style>
