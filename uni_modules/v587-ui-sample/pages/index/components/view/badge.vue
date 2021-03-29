<template>
	<view class="demo-badge">
		<v587-card label="默认">
			<v587-row>
				<v587-col span="12">
					<v587-badge value="16">
						<v587-button>评论</v587-button>
					</v587-badge>
				</v587-col>
				<v587-col span="12">
					<v587-badge value="NEW">
						<v587-button>自定义内容</v587-button>
					</v587-badge>
				</v587-col>
				<v587-col span="12">
					<v587-badge :value="132" :max="99">
						<v587-button>最大</v587-button>
					</v587-badge>
				</v587-col>
				<v587-col span="12">
					<v587-badge is-dot>
						<v587-button>点形状</v587-button>
					</v587-badge>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="不同状态">
			<v587-row>
				<v587-col span="6">
					<v587-badge type="primary" is-dot>
						<v587-button type="text" size="mini">主要</v587-button>
					</v587-badge>
				</v587-col>
				<v587-col span="6">
					<v587-badge type="success" is-dot>
						<v587-button type="text" size="mini">成功</v587-button>
					</v587-badge>
				</v587-col>
				<v587-col span="6">
					<v587-badge type="error" is-dot>
						<v587-button type="text" size="mini">失败</v587-button>
					</v587-badge>
				</v587-col>
				<v587-col span="6">
					<v587-badge type="info" is-dot>
						<v587-button type="text" size="mini">消息</v587-button>
					</v587-badge>
				</v587-col>
			</v587-row>
		</v587-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-badge {
	.v587-col {
		padding: 10rpx;
		text-align: center;
	}
}
</style>
