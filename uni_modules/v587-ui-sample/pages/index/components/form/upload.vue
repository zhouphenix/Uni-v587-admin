<template>
	<view class="demo-upload">
		<v587-toast ref="toast"></v587-toast>

		<v587-card label="单图上传">
			<v587-upload v-model="form.url1" :action="action"></v587-upload>
		</v587-card>

		<v587-card label="多图上传">
			<v587-upload v-model="form.url2" multiple :action="action"></v587-upload>
		</v587-card>

		<v587-card label="上传校验（图片大小不能大于50K）">
			<v587-upload
				v-model="form.url3"
				:before-upload="onBeforeUpload"
				:action="action"
			></v587-upload>
		</v587-card>

		<v587-card label="禁用状态">
			<v587-upload v-model="form.url4" disabled></v587-upload>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				url: "",
				url2: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/avatar.jpeg"],
				url3: "",
				url4: ""
			},
			action: "/pro/admin/comm/upload"
		};
	},

	methods: {
		onBeforeUpload(file, index) {
			if (file.size > 51200) {
				this.$refs["toast"].open("图片大小不能大于50K");
				return false;
			}
		}
	}
};
</script>
