<template>
	<view class="demo-noticebar">
		<v587-card label="单行">
			<v587-noticebar text="云想衣裳花想容，春风拂槛露华浓。"></v587-noticebar>
		</v587-card>

		<v587-card label="多行">
			<v587-noticebar
				text="锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"
			></v587-noticebar>
		</v587-card>

		<v587-card label="水平滚动">
			<v587-noticebar
				scrollable
				text="枕前发尽千般愿，要休且待青山烂。水面上秤锤浮，直待黄河彻底枯"
			></v587-noticebar>
		</v587-card>

		<v587-card label="垂直滚动">
			<v587-noticebar
				:text="[
					'云想衣裳花想容，春风拂槛露华浓。',
					'枕前发尽千般愿，要休且待青山烂。水面上秤锤浮，直待黄河彻底枯',
					'我欲与君相知，长命无绝衰。山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。'
				]"
				direction="vertical"
				scrollable
			></v587-noticebar>
		</v587-card>

		<v587-card label="带图标">
			<v587-noticebar
				scrollable
				icon="v587-icon-notification"
				text="我欲与君相知，长命无绝衰。山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。"
			></v587-noticebar>
		</v587-card>

		<v587-card label="自定义">
			<v587-noticebar
				scrollable
				color="#E6A23C"
				background-color="#FBF5E9"
				text="情不知所起，一往而深；生者可以死，死可以生。"
			>
				<v587-avatar
					slot="icon"
					:size="50"
					src="http://pic2.zhimg.com/50/v2-fb824dbb6578831f7b5d92accdae753a_hd.jpg"
				></v587-avatar>
			</v587-noticebar>
		</v587-card>

		<v587-card label="带关闭">
			<v587-noticebar
				closeable
				text="去年今日此门中，人面桃花相映红。人面不知何处去，桃花依旧笑春风。"
			>
			</v587-noticebar>
		</v587-card>

		<v587-card label="超慢 20s">
			<v587-noticebar
				scrollable
				:duration="20"
				text="年年有风，风吹年年，慢慢即漫漫。日日升日，日落日日，旧旧亦久久。"
			>
			</v587-noticebar>
		</v587-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.demo-noticebar {
}
</style>
