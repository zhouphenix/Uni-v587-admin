<template>
	<view class="demo-popup">
		<v587-card :label="item.label" v-for="(item, index) in dirs" :key="index">
			<v587-popup
				:visible.sync="item.visible"
				:direction="item.value"
				@close="onClose"
				@closed="onClosed"
				@open="onOpen"
				@opened="onOpened"
			>
				<p class="f-26">这是{{ item.label }}</p>
			</v587-popup>

			<v587-button @tap="openItem(item)">弹出</v587-button>
		</v587-card>

		<v587-card label="自定义内容">
			<v587-confirm ref="confirm"></v587-confirm>

			<v587-popup
				ref="popup"
				:visible.sync="visible"
				direction="bottom"
				radius="20rpx 20rpx 0 0"
				@close="onClose"
				@open="onOpen"
			>
				<v587-form label-position="top">
					<v587-form-item label="名称">
						<v587-input placeholder="请填写名称" maxlength="11" type="text"> </v587-input>
					</v587-form-item>
					<v587-form-item label="手机号">
						<v587-input placeholder="请填写手机号" maxlength="11" type="text"> </v587-input>
					</v587-form-item>
				</v587-form>

				<view class="footer">
					<v587-row :gutter="20">
						<v587-col :span="12">
							<v587-button fill round @tap="close">取消</v587-button>
						</v587-col>
						<v587-col :span="12">
							<v587-button fill round type="primary" @tap="submit">提交</v587-button>
						</v587-col>
					</v587-row>
				</view>
			</v587-popup>

			<v587-button @tap="open">
				<text>新增联系方式</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			dirs: [
				{
					label: "顶部弹出",
					value: "top",
					visible: false
				},
				{
					label: "右侧弹出",
					value: "right",
					visible: false
				},
				{
					label: "底部弹出",
					value: "bottom",
					visible: false
				},
				{
					label: "左侧弹出",
					value: "left",
					visible: false
				},
				{
					label: "中间弹出",
					value: "center",
					visible: false
				}
			]
		};
	},

	methods: {
		openItem(item) {
			item.visible = true;
		},
		open() {
			// this.$refs["popup"].open();
			this.visible = true;
		},
		close() {
			// this.$refs["popup"].close();
			this.visible = false;
		},
		onOpen() {
			console.log("open");
		},
		onOpened() {
			console.log("opened");
		},
		onClose() {
			console.log("close");
		},
		onClosed() {
			console.log("closed");
		},
		submit() {
			this.$refs["confirm"].open({
				title: "提示",
				message: "确定添加该条数据吗？",
				callback: ({ action }) => {
					if (action === "confirm") {
						this.visible = false;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-popup {
	.f-26 {
		font-size: 26rpx;
	}

	.footer {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
}
</style>
