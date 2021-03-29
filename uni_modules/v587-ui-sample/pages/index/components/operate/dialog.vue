<template>
	<view class="demo-dialog">
		<v587-card label="基本弹窗">
			<v587-button @tap="open">打开</v587-button>
		</v587-card>

		<v587-card label="带有关闭按钮">
			<v587-button @tap="open2">打开</v587-button>
		</v587-card>

		<v587-card label="禁用点击遮罩关闭">
			<v587-button @tap="open3">打开</v587-button>
		</v587-card>

		<!-- 基本弹窗 -->
		<v587-dialog title="清平调" :visible.sync="visible">
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
		</v587-dialog>

		<!-- 带有关闭按钮 -->
		<v587-dialog title="清平调" :visible.sync="visible2" show-close-btn>
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
		</v587-dialog>

		<!-- 是否可通过点击遮罩关闭 -->
		<v587-dialog
			title="清平调"
			:visible.sync="visible3"
			show-close-btn
			:close-on-click-modal="false"
		>
			<text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
		</v587-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			visible2: false,
			visible3: false
		};
	},

	methods: {
		open() {
			this.visible = true;
		},
		open2() {
			this.visible2 = true;
		},
		open3() {
			this.visible3 = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-dialog {
}
</style>
