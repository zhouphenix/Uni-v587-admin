<template>
	<view class="demo-button">
		<v587-card label="默认按钮">
			<v587-row>
				<v587-col v-for="(item, index) in list" :key="index" :span="8">
					<v587-button :type="item.value">
						<text>{{ item.label }}</text>
					</v587-button>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="朴素按钮">
			<v587-row>
				<v587-col v-for="(item, index) in list" :key="index" :span="8">
					<v587-button :type="item.value" plain>
						<text>{{ item.label }}</text>
					</v587-button>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="圆角按钮">
			<v587-row>
				<v587-col v-for="(item, index) in list" :key="index" :span="8">
					<v587-button :type="item.value" round>
						<text>{{ item.label }}</text>
					</v587-button>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="图标按钮">
			<v587-button type="primary" icon="v587-icon-arrow-left">
				<text>上一页</text>
			</v587-button>
			<v587-button type="primary">
				<text>下一页</text>
				<text class="v587-icon-arrow-right"></text>
			</v587-button>
			<v587-button type="primary" icon="v587-icon-search">
				<text>搜索</text>
			</v587-button>
		</v587-card>

		<v587-card label="文字按钮">
			<v587-button type="text">
				<text>文字按钮</text>
			</v587-button>

			<v587-button type="text" disabled>
				<text>文字按钮</text>
			</v587-button>
		</v587-card>

		<v587-card label="按钮阴影">
			<v587-button type="primary" shadow>
				<text>图标按钮</text>
			</v587-button>
		</v587-card>

		<v587-card label="禁用">
			<v587-row>
				<v587-col v-for="(item, index) in list" :key="index" :span="8">
					<v587-button :type="item.value" disabled>
						<text>{{ item.label }}</text>
					</v587-button>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="加载">
			<v587-row>
				<v587-col v-for="(item, index) in list" :key="index" :span="8">
					<v587-button :type="item.value" loading>
						<text>{{ item.label }}</text>
					</v587-button>
				</v587-col>

				<v587-button loading-theme="spin" loading>不同加载图标</v587-button>

				<v587-button
					loading-theme="spin"
					loading
					loading-mask
					loading-text="加载中"
					type="primary"
					>填充loading</v587-button
				>
			</v587-row>
		</v587-card>

		<v587-card label="按钮尺寸">
			<v587-button size="default">
				<text>默认按钮</text>
			</v587-button>

			<v587-button size="small">
				<text>小号按钮</text>
			</v587-button>

			<v587-button size="mini">
				<text>超小号按钮</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					label: "默认按钮",
					value: ""
				},
				{
					label: "主要按钮",
					value: "primary"
				},
				{
					label: "成功按钮",
					value: "success"
				},
				{
					label: "失败按钮",
					value: "error"
				},
				{
					label: "警告按钮",
					value: "warning"
				},
				{
					label: "信息按钮",
					value: "info"
				}
			]
		};
	}
};
</script>

<style lang="scss">
.demo-button {
	.v587-button {
		margin-bottom: 20rpx;
	}
}
</style>
