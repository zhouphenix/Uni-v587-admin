<template>
	<view>
		<scroll-view style="padding: 15px;box-sizing: border-box;">
			<view>sayHi: {{$t('hi')}}</view>
			<view v-html="$t('home_desc', {adminVersion})"></view>
			<view>
				<image :src="`../../static/theme/${theme}/bg_sidebar.jpg`" mode="aspectFill"></image>
			</view>
			<!-- #ifndef H5 -->
			<fix-window />
			<!-- #endif -->
		</scroll-view>
		<v587-todo style="position: fixed;left: 50%;top: 50%;transform: translate(-50%, -50%); min-width: 450px;"></v587-todo>
	</view>
</template>

<script>
	import {
		version
	} from '../../package.json'


	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				adminVersion: version
			}
		},
		computed: {
			...mapState('theme', ['theme', 'locale'])
		},
		onLoad() {

		},
		methods: {}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}

	/* #endif */
	
	
</style>
