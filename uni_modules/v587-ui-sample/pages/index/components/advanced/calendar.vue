<template>
	<view class="demo-calendar">
		<v587-card label="默认">
			<v587-button @tap="open">打开</v587-button>
			<v587-text :margin="[0, 0, 0, 20]" :value="date"></v587-text>
			<v587-calendar ref="calendar" v-model="date" />
		</v587-card>

		<v587-card label="日期范围">
			<v587-button @tap="open2">打开</v587-button>
			<v587-text :margin="[0, 0, 0, 20]" :value="daterange.join('~')"></v587-text>
			<v587-calendar ref="calendar2" type="daterange" v-model="daterange" />
		</v587-card>

		<v587-card label="农历">
			<v587-button @tap="open3">打开</v587-button>
			<v587-text :margin="[0, 0, 0, 20]" :value="date2"></v587-text>
			<v587-calendar ref="calendar3" lunar v-model="date2" />
		</v587-card>

		<v587-card label="自定义块">
			<v587-button @tap="open4">打开</v587-button>
			<v587-text :margin="[0, 0, 0, 20]" :value="date3"></v587-text>
			<v587-calendar
				ref="calendar4"
				lunar
				v-model="date3"
				:custom-list="[
					{
						date: '2020-11-27',
						color: 'red',
						remark: '我们',
						value: '敏'
					}
				]"
			/>
		</v587-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			date: "",
			date2: "2020-06-06",
			date3: "2020-11-27",
			daterange: ["2020-12-01", "2021-01-01"]
		};
	},

	methods: {
		open() {
			this.$refs.calendar.open();
		},

		open2() {
			this.$refs.calendar2.open();
		},

		open3() {
			this.$refs.calendar3.open();
		},

		open4() {
			this.$refs.calendar4.open();
		}
	}
};
</script>
