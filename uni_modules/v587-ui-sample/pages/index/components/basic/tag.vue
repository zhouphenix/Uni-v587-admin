<template>
	<view class="demo-tag">
		<v587-card label="基础用法">
			<v587-tag type="primary">默认</v587-tag>
			<v587-tag type="primary" round>圆角</v587-tag>
		</v587-card>

		<v587-card label="标签尺寸">
			<v587-tag type="primary" size="small">默认尺寸</v587-tag>
			<v587-tag type="primary" size="mini">小尺寸</v587-tag>
		</v587-card>

		<v587-card label="标签颜色">
			<v587-tag type="primary">标签1</v587-tag>
			<v587-tag type="success">标签2</v587-tag>
			<v587-tag type="error">标签3</v587-tag>
			<v587-tag type="warning">标签4</v587-tag>
			<v587-tag type="info">标签5</v587-tag>
		</v587-card>

		<v587-card label="镂空标签">
			<v587-tag type="primary" plain>标签1</v587-tag>
			<v587-tag type="success" plain>标签2</v587-tag>
			<v587-tag type="error" plain>标签3</v587-tag>
			<v587-tag type="warning" plain>标签4</v587-tag>
			<v587-tag type="info" plain>标签5</v587-tag>
		</v587-card>

		<v587-card label="可移除标签">
			<v587-tag type="primary" closable>标签1</v587-tag>
			<v587-tag type="primary" closable>标签2</v587-tag>
		</v587-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-tag {
}
</style>
