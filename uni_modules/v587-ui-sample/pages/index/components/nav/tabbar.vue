a<template>
	<view class="demo-tabbar">
		<v587-text :size="50" :value="active" :margin="[20, 0, 0, 20]"></v587-text>

		<view class="footer">
			<v587-tabbar ref="tabbar" v-model="active" border-style="#eee">
				<v587-tabbar-item
					text="首页"
					name="home"
					icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/home.png"
					selected-icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/home-hl.png"
				></v587-tabbar-item>

				<v587-tabbar-item
					text="活动"
					name="activity"
					icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/activity.png"
					selected-icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/activity-hl.png"
				></v587-tabbar-item>

				<v587-tabbar-item name="add">
					<view class="add">
						<image src="/uni_modules/v587-ui-sample/static/icon/tabbar/add.png" />
					</view>
				</v587-tabbar-item>

				<v587-tabbar-item
					text="购物车"
					name="cart"
					:badge="8"
					icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/shopping-cart.png"
					selected-icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/shopping-cart-hl.png"
				></v587-tabbar-item>

				<v587-tabbar-item
					text="我的"
					name="my"
					icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/my.png"
					selected-icon-path="/uni_modules/v587-ui-sample/static/icon/tabbar/my-hl.png"
				></v587-tabbar-item>
			</v587-tabbar>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: "home"
		};
	}
};
</script>

<style lang="scss" scoped>
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;

	.add {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 70rpx;
		width: 70rpx;

		image {
			height: 60rpx;
			width: 60rpx;
		}
	}
}
</style>
