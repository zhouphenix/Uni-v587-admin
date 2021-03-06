<template>
	<view class="v587-scroller__wrap">
		<view
			class="v587-scroller"
			:style="{
				transform,
				transition,
			}"
			@touchmove="onTouchMove"
			@touchstart="onTouchStart"
			@touchend="onTouchEnd"
		>
			<view
				class="v587-scroller__loading"
				:style="{
					top: `-${height}px`,
				}"
			>
				<slot name="loading" :text="text" :status="status" :move="touch.move">
					<v587-loading :size="20" v-if="status == 'loading'"></v587-loading>
					<v587-text :size="26" :margin="[0, 0, 0, 14]" :value="text"></v587-text>
				</slot>
			</view>

			<scroll-view
				class="v587-scroller__view"
				scroll-y
				:lower-top="bottom"
				:scroll-top="scrollTop2"
				:scroll-into-view="scrollIntoView"
				:scroll-with-animation="scrollWithAnimation"
				:enable-back-to-top="enableBackToTop"
				:show-scrollbar="showScrollbar"
				:enable-flex="enableFlex"
				@scroll="onScroll"
				@scrolltolower="up"
			>
				<slot></slot>
			</scroll-view>
		</view>

		<!-- 回到顶部 -->
		<view
			class="v587-scroller__back-top"
			:class="[
				{
					fadeIn: backTopButtonFadeIn,
				},
			]"
			@tap="backTop"
			v-if="showBackTopButton"
		>
			<v587-icon name="top" color="#666"></v587-icon>
			<text class="v587-scroller__back-top-text">顶部</text>
		</view>
	</view>
</template>

<script>
/**
 * scroller 滚动区域
 * @description
 * @tutorial https://docs.cool-js.com/uni/components/layout/scroller.html
 * @property {Number} top 距离顶部多少px触发
 * @property {Number} bottom 距离底部多少px触发
 * @property {String} loadingText 正在刷新文案
 * @property {String} pullingText 下拉刷新文案
 * @property {String} releaseText 释放刷新文案
 * @property {Number} scrollTop 滚动条距离顶部位置
 * @property {String} scrollIntoView 滚动到对应元素id
 * @example 见教程
 */

export default {
	props: {
		// 距离顶部多少px触发
		top: {
			type: Number,
			default: 80,
		},
		// 距离底部多少px触发
		bottom: {
			type: Number,
			default: 100,
		},
		// 正在刷新文案
		loadingText: {
			type: String,
			default: "正在刷新",
		},
		// 下拉刷新文案
		pullingText: {
			type: String,
			default: "下拉刷新",
		},
		// 释放刷新文案
		releaseText: {
			type: String,
			default: "释放刷新",
		},
		// 滚动条距离顶部位置
		scrollTop: Number,
		// 滚动到对应元素id
		scrollIntoView: String,
		// 在设置滚动条位置时使用动画过渡
		scrollWithAnimation: {
			type: Boolean,
			default: true,
		},
		// 滚动条返回顶部
		enableBackToTop: Boolean,
		// 是否显示回到顶部按钮
		showBackTopButton: {
			type: Boolean,
			default: true,
		},
		// 控制是否出现滚动条
		showScrollbar: Boolean,
		// 启用 flexbox 布局
		enableFlex: Boolean,
		// 启用下拉刷新
		refresherEnabled: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			touch: {
				start: 0,
				move: 0,
			},
			height: 0,
			scrollTop2: 0,
			backTopButtonFadeIn: false,
			status: "end", // pulling, loading, end
		};
	},

	watch: {
		scrollTop: {
			immediate: true,
			handler(val) {
				this.scrollTop2 = val || "";
			},
		},
	},

	mounted() {
		this.init();
	},

	computed: {
		transform() {
			return this.touch.move ? `translate3d(0, ${this.touch.move}px, 0)` : "";
		},

		transition() {
			return ["end", "loading"].includes(this.status) ? "transform 0.3s" : "";
		},

		isReleasable() {
			return this.touch.move >= this.top;
		},

		text() {
			switch (this.status) {
				case "pulling":
					return this.isReleasable ? this.releaseText : this.pullingText;
				case "loading":
					return this.loadingText;
				default:
					return this.pullingText;
			}
		},
	},

	methods: {
		onTouchStart(e) {
			console.log(this.refresherEnabled);
			if (this.status == "end" && this.refresherEnabled) {
				this.touch.start = e.changedTouches[0].clientY;
				this.status = "pulling";
			}
		},

		onTouchMove(e) {
			if (this.status == "pulling" && this.scrollTop2 <= 10) {
				let offset = e.changedTouches[0].clientY - this.touch.start;

				if (offset <= 200) {
					this.touch.move = offset;
				}
			}
		},

		onTouchEnd(e) {
			if (this.isReleasable) {
				this.down();
			} else {
				this.end();
			}
		},

		// 滚动监听
		onScroll(e) {
			this.backTopButtonFadeIn = e.detail.scrollTop >= 200;
			this.$emit("scroll", e);
		},

		// 初始化
		init() {
			// 获取加载框的高度
			uni.createSelectorQuery()
				.in(this)
				.select(".v587-scroller__loading")
				.fields({ size: true }, (d) => {
					this.height = d.height;
				})
				.exec();
		},

		// 下拉刷新
		down() {
			this.status = "loading";
			this.touch.move = this.height;
			this.$emit("down");
		},

		// 上拉加载
		up() {
			this.$emit("up");
		},

		// 收起，结束
		end() {
			this.status = "end";
			this.touch.move = 0;
		},

		// 滚动到
		scrollTo(top) {
			this.scrollTop2 = top;
		},

		// 回到顶部
		backTop() {
			this.scrollTop2 = Math.random();
		},
	},
};
</script>
