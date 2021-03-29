<template>
	<view class="demo-checkbox">
		<v587-card label="基础用法">
			<v587-checkbox v-model="form.a">复选项</v587-checkbox>
		</v587-card>

		<v587-card label="圆形">
			<v587-checkbox label="1" round>复选项 A</v587-checkbox>
		</v587-card>

		<v587-card label="禁用状态">
			<v587-checkbox v-model="form.b" disabled>复选项</v587-checkbox>
			<v587-checkbox v-model="form.b1" disabled>复选项</v587-checkbox>
		</v587-card>

		<v587-card label="多选框组">
			<v587-checkbox-group v-model="form.c">
				<v587-checkbox label="1">复选项 A</v587-checkbox>
				<v587-checkbox label="2">复选项 B</v587-checkbox>
				<v587-checkbox label="3">复选项 C</v587-checkbox>
			</v587-checkbox-group>
		</v587-card>

		<v587-card label="带边框">
			<v587-checkbox-group v-model="form.d" border>
				<v587-checkbox label="1">复选项 A</v587-checkbox>
				<v587-checkbox label="2" :border="true">复选项 B</v587-checkbox>
			</v587-checkbox-group>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: true,
				b: false,
				b1: true,
				c: ["1"],
				d: ["1"]
			}
		};
	}
};
</script>
