<template>
	<view class="ui-list">
		<text>v587-ui组件库sample展示插件(调试阶段)</text>
		<view style="text-align: end; "><text>(基于COOL-UNI) </text></view>
		<view class="group">
			<view class="item" v-for="(item, index) in list" :key="index">
				<text class="item__label">{{ item.label }}</text>
				
				<view class="item__container">
					<view v-for="(item2, index2) in item.children" :key="index2" class="block"
						:class="{'is-active' : check[0] === index && check[1] === index2}"
						@tap="onTap(index, index2)">
						<text class="label">{{ item2.label }}</text>
						<text class="v587-icon-arrow-right" v-if="item2.path"></text>
						<text class="v587-icon-close" v-else></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		model: {
			prop: 'select',
			event: 'onChange'
		},
		props: {
			list: Array,
			select: {
				type: Array,
				default: []
			}
		},
		watch: {
			select(val) {
				this.check = val
			}
		},
		data() {
			return {
				check: this.select
			}
		},
		methods: {
			onTap(...arr) {
				this.$emit('onChange', arr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.ui-list {
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
		margin: auto 0;
		padding: 20rpx 33rpx;
		box-sizing: border-box;
		
		
		.group {
			margin-bottom: 20rpx;
			background-color: #fff;
		
			.header {
				padding: 20rpx;
				font-size: 28rpx;
			}
		
			.container {
				padding: 10px;
		
				&.no-padding {
					padding: 0;
				}
			}
		}
		
		.item {
			&__label {
				display: inline-block;
				height: 70rpx;
				line-height: 70rpx;
				width: 100%;
				padding: 0 30rpx;
				font-size: 28rpx;
				color: #909ca2;
				box-sizing: border-box;
			}
		
			&__container {
				.block {
					display: flex;
					align-items: center;
					height: 80rpx;
					padding: 0 30rpx;
					margin-bottom: 30rpx;
					font-size: 26rpx;
					background-color: #f7f7f7;
					border-radius: 80rpx;
					transition: 0.3s;
		
					&:hover,
					&:active {
						background-color: #eee;
					}
		
					.label {
						flex: 1;
					}
				}
		
				.is-active {
					background-color: var(--color-primary);
					color: white;
				}
			}
		}
	}
</style>
