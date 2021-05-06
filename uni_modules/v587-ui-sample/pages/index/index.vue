<template>
	<view class="v587-ui-sample">
		<view class="ui-detail ">

		</view>
		<image v-if="platform === 'windows'" class="phone-frame" src="/uni_modules/v587-ui-sample/static/iphone_x.png"
			mode="scaleToFill"></image>
		<view class="phone-container" :class="{'is-phone-container': platform !== 'windows'}">
			<view class="phone uni-scrollbar">
				<view class="phone-content">
					<view class="phone-header" v-show="!hideHeader">
						<image src="/uni_modules/v587-ui-sample/static/logo.png" style="width: 100%;" mode="widthFix">
						</image>
					</view>
					<v587-topbar class="topbar" v-show="select.length > 0" :title="title" color="#fff"
						@back="_ =>{select = []}" background-color="var(--color-primary)" :is-top="false">
					</v587-topbar>
					<home v-if="!select.length" :list="list" v-model="select"></home>
					<view v-else
						style="padding: 10px 6px;background-color: #f7f7f7; height: 100%; box-sizing: border-box;">
						<component :is="currentComponent"></component>
					</view>

				</view>
			</view>
			<view class="tip">
				示例仅供参考，请以真机为主<text class="strong">({{platform}}渲染效果)</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Home from './components/index.vue'

	export default {
		components: {
			Home
		},
		data() {
			return {
				title: '',
				select: [],
				list: [{
						label: "Basic 基础组件",
						key: "basic",
						children: [{
								label: "Text 文本",
								path: "text"
							}, {
								label: "Button 按钮",
								path: "button"
							},
							{
								label: "Input 输入框",
								path: "input"
							},
							{
								label: "Image 图片",
								path: "image"
							},
							{
								label: "Icon 图标",
								path: "icon"
							},
							{
								label: "Tag 标签",
								path: "tag"
							},
							{
								label: "Divider 分割线",
								path: "divider"
							}
						]
					},
					{
						label: "Feedback 反馈组件",
						key: "feedback",
						children: [{
								label: "Toast 提示",
								path: "toast"
							},
							{
								label: "Message 消息",
								path: "message"
							},
							{
								label: "Loading 加载",
								path: "loading"
							}
						]
					},
					{
						label: "Form 表单组件",
						key: "form",
						children: [{
								label: "Radio 单选框",
								path: "radio"
							},
							{
								label: "Switch 开关",
								path: "switch"
							},
							{
								label: "Checkbox 多选框",
								path: "checkbox"
							},
							{
								label: "Select 下拉框",
								path: "select"
							},
							{
								label: "SelectRegion 下拉城市",
								path: "select-region"
							},
							{
								label: "Upload 上传",
								path: "upload"
							},
							{
								label: "Rate 评分",
								path: "rate"
							},
							{
								label: "Rules 校验",
								path: "rules"
							},
							{
								label: "InputNumber 计数器",
								path: "input-number"
							},
							{
								label: "Textarea 文本域",
								path: "textarea"
							}
						]
					},
					{
						label: "Operate 操作",
						key: "operate",
						children: [{
								label: "LoadMore 页底提示",
								path: "loadmore"
							},
							{
								label: "Dialog 对话框",
								path: "dialog"
							},
							{
								label: "Confirm 确认框",
								path: "confirm"
							},
							{
								label: "ActionSheet 底部菜单",
								path: "action-sheet"
							},
							{
								label: "Search 搜索",
								path: "search"
							}
						]
					},
					{
						label: "Nav 导航组件",
						key: "nav",
						children: [{
								label: "Tabs 选项卡",
								path: "tabs"
							},
							{
								label: "Topbar 顶部导航",
								path: "topbar"
							},
							{
								label: "Tabbar 底部导航",
								path: "tabbar"
							}
						]
					},
					{
						label: "Layout 布局",
						key: "layout",
						children: [{
								label: "Flex 柔性",
								path: "flex"
							},
							{
								label: "Grid 宫格",
								path: "grid"
							},
							{
								label: "WaterFall 瀑布流",
								path: "waterfall"
							},
							{
								label: "List 列表",
								path: "list"
							},
							{
								label: "Card 卡片",
								path: "card"
							},
							{
								label: "Scroller 滚动区域",
								path: "scroller"
							}
						]
					},
					{
						label: "View 视图",
						key: "view",
						children: [{
								label: "Popup 弹出层",
								path: "popup"
							},
							{
								label: "Badge 角标",
								path: "badge"
							},
							{
								label: "Avatar 头像",
								path: "avatar"
							},
							{
								label: "CountDown 倒计时",
								path: "countdown"
							},
							{
								label: "NoticeBar 通知公告栏",
								path: "noticebar"
							},
							{
								label: "Progress 进度条",
								path: "progress"
							},
							{
								label: "Slider 滑块",
								path: "slider"
							},
							{
								label: "TimeLine 时间轴",
								path: "timeline"
							},
							{
								label: "Swiper 轮播图",
								path: "swiper"
							}
						]
					},
					{
						label: "Advanced 高级组件",
						key: "advanced",
						children: [{
								label: "Filter-Bar 筛选栏",
								path: "filter-bar"
							},
							{
								label: "Captcha 验证码输入框",
								path: "captcha"
							},
							{
								label: "Drag 拖动排序"
							},
							{
								label: "Canvas 画布",
								path: "canvas"
							},
							{
								label: "Cropper 图片裁剪",
								path: "cropper"
							},
							{
								label: "Ticket 优惠券"
							},
							{
								label: "Guide 操作引导",
								path: "guide",
								hideHeader: true
							},
							{
								label: "RichText 富文本"
							},
							{
								label: "IndexList 索引列表",
								path: "list-index",
								hideHeader: true
							},
							{
								label: "Calendar 日历",
								path: "calendar"
							}
						]
					}
				]
			}
		},
		watch: {
			select(val) {
				if (val.length > 0) {
					const [f, s] = val
					this.title = this.list[f].children[s].label
				}
			}
		},
		computed: {
			currentComponent() {
				const [l1, l2] = this.select
				return this.select.length > 0 && require(
					`./components/${this.list[l1].key}/${this.list[l1].children[l2].path}`).default
			},
			hideHeader() {
				if (this.select.length > 0) {
					const [f, s] = this.select
					return !!this.list[f].children[s].hideHeader
				}
				return false
			},
			platform() {
				return uni.getSystemInfoSync().platform
			}
		},
		mounted() {
			const el = document.querySelector('.phone');
			const offsetHeight = el.offsetHeight;
			el.onscroll = () => {
				const scrollTop = el.scrollTop;
				const scrollHeight = el.scrollHeight;
				if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
					// 需要执行的代码
					uni.$emit('reachBottom')
				}
			};
		}
	}
</script>

<style lang="scss">
	.v587-ui-sample {
		display: flex;
		flex-flow: row wrap;
		height: 100%;

		.ui-detail {
			max-width: 400px;
			padding: 20px;
			box-sizing: border-box;
		}

		$phoneWidth: 364px;
		$phoneHeight: 754px;

		.phone-frame {
			position: fixed;
			top: 90px;
			right: 12px;
			z-index: 2021;
			pointer-events: none;
			width: $phoneWidth + 56px;
			height: $phoneHeight + 46px;
		}

		.is-phone-container {
			top: var(--window-top) !important;
			right: 0 !important;
			width: 100% !important;
			height: calc(100% -  var(--window-top) ) !important;
		}
		
		.phone-container {
			position: fixed;
			top: 112px;
			right: 40px;
			width: $phoneWidth;
			height: $phoneHeight;
			overflow: hidden;
			transform: scale(1);


			.phone {
				background-color: rgb(255, 255, 255);
				position: relative;
				width: 100%;
				height: 100%;


				.phone-header {
					width: 100%;
				}

				.phone-content {
					display: block;
					box-sizing: border-box;
					height: 100%;
				}

				.topbar {
					opacity: 0.3;
					position: sticky;
					top: 0;

					&:hover {
						opacity: 1;
					}
				}
			}

			.tip {
				text-align: center;
				width: 100%;
				position: absolute;
				bottom: 4px;
				left: 0px;
				z-index: 99;
				font-size: 13px;

				.strong {
					font-weight: var(--font-weight-primary);
					color: var(--color-primary);
				}
			}
		}
	}
</style>
