<template>
	<view class="demo-flex">
		<v587-card label="flex布局">
			<v587-row>
				<v587-col span="12">
					<view class="a"></view>
				</v587-col>
				<v587-col span="12">
					<view class="b"></view>
				</v587-col>
			</v587-row>

			<v587-row>
				<v587-col span="8">
					<view class="a"></view>
				</v587-col>
				<v587-col span="8">
					<view class="b"></view>
				</v587-col>
				<v587-col span="8">
					<view class="a"></view>
				</v587-col>
			</v587-row>

			<v587-row>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="b"></view>
				</v587-col>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="b"></view>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="分栏间隔">
			<v587-row gutter="20">
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="混合布局">
			<v587-row gutter="20">
				<v587-col span="4">
					<view class="a"></view>
				</v587-col>
				<v587-col span="10">
					<view class="b"></view>
				</v587-col>
				<v587-col span="10">
					<view class="a"></view>
				</v587-col>
			</v587-row>

			<v587-row gutter="20">
				<v587-col span="12">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="b"></view>
				</v587-col>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="分栏偏移">
			<v587-row gutter="20">
				<v587-col span="6" offset="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6" offset="6">
					<view class="a"></view>
				</v587-col>
			</v587-row>

			<v587-row gutter="20">
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6" push="6">
					<view class="a"></view>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="对齐方式（H5）">
			<v587-row type="flex" justify="space-between" gutter="20">
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
				<v587-col span="6">
					<view class="a"></view>
				</v587-col>
			</v587-row>
		</v587-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.demo-flex {
	/deep/.v587-row {
		margin-bottom: 20rpx !important;
	}

	.a,
	.b {
		border-radius: 6rpx;
		height: 60rpx;
	}

	.a {
		background-color: #d3dce6;
	}

	.b {
		background-color: #e5e9f2;
	}
}
</style>
