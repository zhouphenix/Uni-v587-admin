<template>
	<view class="demo-countdown">
		<v587-card label="10分钟倒计时">
			<v587-countdown :minute="10"></v587-countdown>
		</v587-card>

		<v587-card label="距离圣诞节还有">
			<v587-countdown datetime="2021-12-25"></v587-countdown>
		</v587-card>

		<v587-card label="中文">
			<v587-countdown :minute="10" splitor="cn"></v587-countdown>
		</v587-card>

		<v587-card label="英文">
			<v587-countdown :minute="5" splitor="en"></v587-countdown>
		</v587-card>

		<v587-card label="自定义">
			<v587-countdown :minute="10" :splitor="['Tian', 'Shi', 'Fen', 'Miao']"></v587-countdown>
		</v587-card>

		<v587-card label="精简模式">
			<v587-countdown :hour="1" :minute="0" :second="5" mode="simple"></v587-countdown>
		</v587-card>

		<v587-card label="添加毫秒">
			<v587-countdown :hour="1" :splitor="[':', ':', ':', ':']" is-millisecond></v587-countdown>
		</v587-card>

		<v587-card label="只显示分秒(大于当前时间)">
			<v587-countdown
				datetime="2021-12-31"
				:layout="['minute', 'second']"
				:splitor="['分', '秒']"
			></v587-countdown>
		</v587-card>

		<v587-card label="分秒倒序(大于当前时间)">
			<v587-countdown
				datetime="2021-12-31"
				:layout="['second', 'minute']"
				:splitor="['秒', '分']"
			></v587-countdown>
		</v587-card>

		<v587-card label="监听">
			<v587-countdown
				:second="countdown"
				:layout="['second']"
				:splitor="['s']"
				ref="cd"
				@change="onChange"
				@done="onDone"
			></v587-countdown>

			<v587-progress
				:value="progress"
				:color="['#F56C6C', '#E6A23C', '#67C23A']"
				:show-text="false"
			></v587-progress>
		</v587-card>

		<v587-card label="操作">
			<v587-countdown :hour="2" ref="op"></v587-countdown>

			<v587-row :margin="[20, 0, 0, 0]">
				<v587-button size="mini" type="success" round @tap="start">开始</v587-button>
				<v587-button size="mini" type="error" round @tap="stop">暂停</v587-button>
			</v587-row>
		</v587-card>

		<v587-card label="自定义样式">
			<v587-countdown
				:hour="2"
				:number-style="{
					'background-color': '#000',
					color: '#fff',
					margin: '0 10rpx',
					'border-radius': '10rpx'
				}"
			></v587-countdown>
		</v587-card>

		<v587-toast ref="toast"></v587-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			progress: 100,
			countdown: 5
		};
	},

	methods: {
		onChange([s]) {
			this.progress = parseInt((s * 100) / 10);
		},

		onDone() {
			this.$refs["toast"].open("Game Over");
			this.$refs["cd"].start({ second: 10 });
		},

		start() {
			this.$refs.op.next();
		},

		stop() {
			this.$refs.op.stop();
		}
	}
};
</script>

<style lang="scss">
.demo-countdown {
	.font-24 {
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}

	.cs-countdown {
		/deep/.v587-countdown__number {
			height: 100rpx;
			line-height: 100rpx;
			min-width: 80rpx;
			font-size: 50rpx;
			font-weight: bold;
			background-color: #fff;
			border: 1rpx solid #eee;
			border-radius: 10rpx;
			color: $uni-color-primary;
		}
	}
}
</style>
