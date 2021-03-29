<template>
	<view class="demo-loading">
		<v587-card label="主题图标">
			<v587-row>
				<v587-col :span="6">
					<v587-loading></v587-loading>
				</v587-col>

				<v587-col :span="6">
					<v587-loading theme="spin"></v587-loading>
				</v587-col>
			</v587-row>
		</v587-card>

		<v587-card label="区域加载">
			<v587-loading-mask :loading="true" text="拼命加载中">
				<v587-form>
					<v587-form-item label="姓名">
						<v587-input placeholder="请填写名称"></v587-input>
					</v587-form-item>

					<v587-form-item label="手机号">
						<v587-input placeholder="请填写手机号"></v587-input>
					</v587-form-item>
				</v587-form>
			</v587-loading-mask>
		</v587-card>

		<v587-card label="自定义">
			<v587-loading-mask
				:loading="true"
				background="rgba(0, 0, 0, 0.6)"
				color="#fff"
				text="拼命加载中"
			>
				<v587-form>
					<v587-form-item label="姓名">
						<v587-input placeholder="请填写名称"></v587-input>
					</v587-form-item>

					<v587-form-item label="手机号">
						<v587-input placeholder="请填写手机号"></v587-input>
					</v587-form-item>
				</v587-form>
			</v587-loading-mask>
		</v587-card>

		<v587-card label="基本用法">
			<v587-loading-mask
				:loading="loading"
				color="red"
				text="数据配置中"
				fullscreen
			></v587-loading-mask>
			<v587-button @tap="open()" size="small">
				<text>全屏</text>
			</v587-button>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false
		};
	},

	methods: {
		open() {
			this.loading = true;

			setTimeout(() => {
				this.loading = false;
			}, 1500);
		}
	}
};
</script>

<style lang="scss">
.demo-loading {
	/deep/.v587-card__container {
		position: relative;
	}
}
</style>
