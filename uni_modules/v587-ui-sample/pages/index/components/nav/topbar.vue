<template>
	<view class="demo-topbar">
		<v587-card label="默认">
			<v587-topbar title="标题" :is-top="false"></v587-topbar>
		</v587-card>

		<v587-card label="带描述">
			<v587-topbar title="标题" description="描述" :is-top="false"></v587-topbar>
		</v587-card>

		<v587-card label="右侧图标">
			<v587-topbar title="标题" :is-top="false">
				<view class="v587-topbar__icon" slot="append">
					<text class="v587-icon-question-fill"></text>
				</view>
			</v587-topbar>
		</v587-card>

		<v587-card label="不需要返回键">
			<v587-topbar title="标题" :show-back="false" :is-top="false"></v587-topbar>
		</v587-card>

		<v587-card label="其他颜色">
			<v587-topbar
				title="标题"
				color="#fff"
				background-color="#000"
				:is-top="false"
			></v587-topbar>
		</v587-card>

		<v587-card label="复杂">
			<v587-topbar title="标题" :is-top="false">
				<template slot="prepend">
					<view class="v587-topbar__icon">
						<text class="v587-icon-question"></text>
					</view>
				</template>

				<template slot="append">
					<v587-button size="mini">设置</v587-button>
				</template>
			</v587-topbar>
		</v587-card>
	</view>
</template>
