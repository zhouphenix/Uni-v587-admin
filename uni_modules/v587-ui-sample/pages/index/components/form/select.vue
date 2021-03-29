<template>
	<view class="demo-select">
		<v587-card label="基础用法">
			<v587-select v-model="form.a" :options="options" @confirm="onConfirm"></v587-select>
		</v587-card>

		<v587-card label="禁用状态">
			<v587-select v-model="form.b" :options="options" disabled></v587-select>
		</v587-card>

		<v587-card label="带边框">
			<v587-select border v-model="form.c" :options="options"></v587-select>
		</v587-card>

		<v587-card label="带边框禁用">
			<v587-select border v-model="form.c" :options="options" disabled></v587-select>
		</v587-card>

		<v587-card label="日期">
			<v587-select border v-model="form.d" mode="date"></v587-select>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				a: 1,
				b: 3,
				c: 0,
				d: ""
			},
			options: [
				{
					label: "海南东山羊",
					value: 0,
					d: 1,
					a: 2
				},
				{
					label: "乌鱼子",
					value: 1
				},
				{
					label: "葛仙米",
					value: 2
				},
				{
					label: "亚东鲑鱼",
					value: 3
				},
				{
					label: "虫草",
					value: 4
				},
				{
					label: "太湖银鱼",
					value: 5
				}
			]
		};
	},

	methods: {
		onConfirm(d) {
			console.log(d, this.form.a);
		}
	}
};
</script>
