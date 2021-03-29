<template>
	<view class="demo-radio">
		<v587-card label="基础用法">
			<v587-radio v-model="form.a" label="1">备选项</v587-radio>
			<v587-radio v-model="form.a" label="2">备选项</v587-radio>
			<v587-radio v-model="form.a" label="3">备选项</v587-radio>
		</v587-card>

		<v587-card label="禁用状态">
			<v587-radio v-model="form.b" label="1" disabled>备选项</v587-radio>
			<v587-radio v-model="form.b" label="2" disabled>备选项</v587-radio>
		</v587-card>

		<v587-card label="单选框组">
			<v587-radio-group v-model="form.c">
				<v587-radio label="1">备选项</v587-radio>
				<v587-radio label="2">备选项</v587-radio>
			</v587-radio-group>
		</v587-card>

		<v587-card label="带边框">
			<v587-radio-group v-model="form.d" border>
				<v587-radio label="1">备选项</v587-radio>
				<v587-radio label="2">备选项</v587-radio>
			</v587-radio-group>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: "1",
				b: "1",
				c: "1",
				d: "1"
			}
		};
	}
};
</script>
