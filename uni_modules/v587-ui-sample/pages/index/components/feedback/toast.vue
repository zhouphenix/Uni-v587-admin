<template>
	<view class="demo-toast">
		<v587-toast ref="toast"></v587-toast>

		<v587-card label="文字提示">
			<v587-button @tap="open('文字提示')">
				<text>文字提示</text>
			</v587-button>
			<v587-button @tap="open('这是一条长文字提示，超过一定字数就会换行')">
				<text>长文字提示</text>
			</v587-button>
		</v587-card>

		<v587-card label="不同位置">
			<v587-button @tap="openPosition('top')">
				<text>顶部</text>
			</v587-button>
			<v587-button @tap="openPosition('middle')">
				<text>居中</text>
			</v587-button>
			<v587-button @tap="openPosition('bottom')">
				<text>底部</text>
			</v587-button>
		</v587-card>

		<v587-card label="不同状态">
			<v587-button @tap="openType('default')">
				<text>默认</text>
			</v587-button>
			<v587-button @tap="openType('primary')" type="primary">
				<text>主要</text>
			</v587-button>
			<v587-button @tap="openType('success')" type="success">
				<text>成功</text>
			</v587-button>
			<v587-button @tap="openType('error')" type="error">
				<text>失败</text>
			</v587-button>
			<v587-button @tap="openType('warning')" type="warning">
				<text>警告</text>
			</v587-button>
		</v587-card>

		<v587-card label="带图标">
			<v587-button type="success" @tap="openIcon('success')">
				<text>success</text>
			</v587-button>
			<v587-button type="error" @tap="openIcon('error')">
				<text>error</text>
			</v587-button>
			<v587-button type="warning" @tap="openIcon('warning')">
				<text>warning</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true
		};
	},

	methods: {
		open(message) {
			this.$refs["toast"].open(message);
		},

		openPosition(position) {
			this.$refs["toast"].open({
				position,
				message: "消息提示"
			});
		},

		openType(type) {
			this.$refs["toast"].open({
				type,
				message: "消息提示"
			});
		},

		openIcon(icon) {
			this.$refs["toast"].open({
				icon,
				position: "middle",
				message: "消息提示"
			});
		}
	}
};
</script>
