<template>
	<view class="theme-generator">
		<view class="theme-exhibition"></view>
		<view class="theme-control-pane">
			<view class="control-header">
				<view class="control-header__actions">
					<button type="default" size="mini">重置</button>
					<button type="primary" size="mini">下载</button>
				</view>
				<input type="text" :value="name" placeholder="主题名称" />
				<view class="line"> </view>
			</view>


			<view class="control-content uni-scrollbar">
				<view class="category" v-for="(value, key) in themeConfig.Color" :key="key">
					<text class="category-name">{{key}}</text>
					<view class="category-config" v-for="(v,k) in value">
						<text class="category-config__label">{{k}} ({{v.description}})</text>
						<view class="category-config__content">
							<input type="text" :value="v.value" />
							<view class="color-picker" @click.stop="$set(v, 'show',  !v.show)">
								<view :style="{background: v.value, width: '100%', height: '100%'}"></view>
								<text class="color-picker__arrow">﹀</text>
								<view class="color-picker__pane" v-clickoutside="_=> $set(v, 'show',  false)">
									<v587-color-picker v-if="v.show" v-model="v.value" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import config from '../../config.json'

	export default {
		data() {
			return {
				name: '',
				themeConfig: Object.assign({},config)
			}
		},
		mounted() {},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.theme-generator {
		display: flex;
		flex-flow: row nowrap;
		font-size: 12px;

		.theme-exhibition {
			flex-grow: 1;
		}

		.theme-control-pane {
			overflow: hidden;
			background: #f5f7fa;
			width: 250px;
			border: 1px solid #ebeef5;
			border-radius: 5px;
			position: fixed;
			right: 15px;
			top: 75px;
			box-shadow: 0 0 10px 4px rgba($color: #000000, $alpha: 0.1);

			.control-header {
				padding: 15px 10px 0;

				.control-header__actions {
					display: flex;
					flex-flow: row nowrap;
					margin-bottom: 10px;
					justify-content: flex-end;
					button {
						margin: 0 5px;
					}
				}

				uni-input {
					background: #f5f7fa;
					border: none;
					font-size: 18px;
					padding-left: 0;
					color: #606266;
				}
			}

			.control-content {
				padding: 0 15px 300px;
				height: 80.8vh;
				box-sizing:border-box;

				.category {
					.category-name {
						color: #c0c4cc;
						font-size: 18px;
						display: block;
						margin: 13px 0 3px;
					}

					.category-config {
						padding: 5px 0;

						.category-config__label {
							color: #606266;
							font-size: 14px;
							margin-bottom: 8px;
							display: block;
						}

						.category-config__content {
							display: flex;
							flex-flow: row nowrap;
							justify-content: space-between;
							align-items: center;

							input {
								height: 36px;
								line-height: 36px;
								box-sizing: border-box;
								font-size: 14px;
								background-color: #fff;
								background-image: none;
								border-radius: 4px;
								border: 1px solid #DCDFE6;
								padding: 0 10px;
								text-transform: uppercase;
							}

							.color-picker {
								display: inline-block;
								width: 30px;
								height: 30px;
								position: relative;
								display: block;
								box-sizing: border-box;
								border: 1px solid #999;
								border-radius: 2px;
								text-align: center;
								padding: 4px;
								cursor: pointer;

								.color-picker__arrow {
									position: absolute;
									width: 100%;
									top: 50%;
									left: 50%;
									transform: translate3d(-50%, -50%, 0);
									color: white;
									user-select: none;
								}
								
								.color-picker__pane {
									position: absolute;
									width: 220px;
									bottom: 0;
									right: 0;
									z-index: 1;
									transform: translateY(calc(100% + 10px));
								}
								
							}
						}
					}
				}
			}
		}
	}

	.line {
		width: 100%;
		height: 0;
		border-bottom: 1px solid #dcdfe6;
	}
</style>
