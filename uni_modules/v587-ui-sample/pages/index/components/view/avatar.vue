<template>
	<view class="demo-avatar">
		<v587-card label="头像形状">
			<v587-row>
				<v587-col :span="6">
					<view @tap="onTap">
						<v587-avatar></v587-avatar>
					</view>
				</v587-col>

				<v587-col :span="6">
					<v587-avatar shape="square"></v587-avatar>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="头像大小">
			<v587-row>
				<v587-col :span="6">
					<v587-avatar :size="70"></v587-avatar>
				</v587-col>
				<v587-col :span="6">
					<v587-avatar :size="80"></v587-avatar>
				</v587-col>
				<v587-col :span="6">
					<v587-avatar :size="90"></v587-avatar>
				</v587-col>
				<v587-col :span="6">
					<v587-avatar :size="100"></v587-avatar>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="异常">
			<v587-avatar src="https://">
				<template #error>
					神仙
				</template>
			</v587-avatar>
		</v587-card>

		<v587-card label="文字头像">
			<v587-avatar :size="70">cool</v587-avatar>
		</v587-card>

		<v587-card label="头像组">
			<v587-avatar-group :urls="avatarGroup"></v587-avatar-group>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarGroup: new Array(6).fill(1).map((e, i) => {
				return `https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/${i +
					1}.jpg`;
			})
		};
	},

	methods: {
		onTap() {
			console.log(1111);
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-avatar {
}
</style>
