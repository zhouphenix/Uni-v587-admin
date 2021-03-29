<template>
	<view class="demo-rate">
		<v587-card label="基础用法">
			<view class="row">
				<v587-rate :value="2.7"></v587-rate>
			</view>

			<view class="row">
				<v587-rate :value="2" :color="['#F56C6C', '#E6A23C', '#67C23A']"></v587-rate>
			</view>
		</v587-card>

		<v587-card label="不同图标">
			<view class="row">
				<v587-rate :value="1" icon="like"></v587-rate>
			</view>

			<view class="row">
				<v587-rate :value="3" icon="success-fill"></v587-rate>
			</view>
		</v587-card>

		<v587-card label="只读">
			<v587-rate :value="4" disabled></v587-rate>
		</v587-card>

		<v587-card label="显示数值">
			<v587-rate :value="3.4" show-text></v587-rate>
		</v587-card>
	</view>
</template>

<script>
export default {};
</script>
