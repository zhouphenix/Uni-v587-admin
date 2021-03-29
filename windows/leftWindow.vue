<template>
	<scroll-view class="sidebar" scroll-y="true">
<!-- 		<uni-data-menu v-model="current" collection="opendb-admin-menus" gettree field="url as value, name as text, menu_id, icon" orderby="sort asc" active-text-color="#409eff">
			<uni-menu-sidebar :data="staticMenu"></uni-menu-sidebar>
		</uni-data-menu> -->
		<uni-nav-menu :uniqueOpened="true" :active="splitFullPath(active)" activeKey="url" textColor="#666" activeTextColor="#409eff" @select="select" backgroundColor="transparent">
			<uni-menu-sidebar :data="navMenu"></uni-menu-sidebar>
			<uni-menu-sidebar :data="staticMenu"></uni-menu-sidebar>
		</uni-nav-menu>
		<view class="left-settings">
			<view class="uni-icons-gear-filled"><span>{{$t('settings')}}</span></view>
			<view class="uni-icons-hand-thumbsup-filled theme-toggle">
				<span>{{$t('theme')}}</span>
				<view class="theme-choice">
					<span v-for="item in themeList" :class="{'theme-active': theme === item}" @click="setTheme(item)">{{item}}</span>
					<span :class="{'theme-active': !theme}" @click="setTheme('')">默认</span>
				</view>
			</view>
			<view class="uni-icons-star-filled theme-toggle">
				<span>{{$t('language')}}</span>
				<view class="theme-choice">
					<span v-for="item in localeList" :class="{'theme-active': locale === item}"  @click="setLocale(item)">{{item}}</span>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import config from '@/admin.config.js'
	export default {
		data() {
			return {
				...config.sideBar,
				defaultValue: '',
				current: ''
			}
		},
		computed: {
			...mapState('app', ['inited', 'navMenu', 'active']),
			...mapState('theme', ['theme', 'themeList', 'locale', 'localeList']),
		},
		// #ifdef H5
		watch: {
			$route: {
				immediate: true,
				handler(newRoute, oldRoute) {
					if (newRoute.fullPath !== (oldRoute && oldRoute.fullPath)) {
						this.changeMenuActive(newRoute.fullPath)
					}
				}
			},
			current: {
				immediate: true,
				handler(newUrl) {
					this.select(newUrl)
				}
			}
		},
		// #endif
		methods: {
			...mapActions({
				changeMenuActive: 'app/changeMenuActive'
			}),
			select(e) {
				let url = e.url

				if (!url) {
					url = this.active
					this.current = url
				}
				this.clickMenuItem(url)
			},
			clickMenuItem(url) {
				// #ifdef H5
				if (url.indexOf('http') === 0) {
					return window.open(url)
				}
				// #endif

				// url 开头可用有 / ，也可没有
				if (url[0] !== '/' && url.indexOf('http') !== 0) {
					url = '/' + url
				}
				// TODO 后续要调整
				uni.redirectTo({
					url: url,
					fail: () => {
						uni.showModal({
							title: '提示',
							content: '页面 ' + url + ' 跳转失败',
							showCancel: false
						})
					}
				})
			},
			splitFullPath(path) {
				if (!path) path = '/'
				return path.split('?')[0]
			},
			setTheme(theme) {
				this.$store.commit('theme/SET_THEME', theme)
			},

			setLocale(locale) {
				this.$store.commit('theme/SET_LOCALE', locale)
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		position: fixed;
		top: var(--top-window-height);
		width: 240px;
		height: calc(100vh - (var(--top-window-height)));
		box-sizing: border-box;
		border-right: 1px solid darken($left-window-bg-color, 8%);
		//background-color: $left-window-bg-color;
		padding-bottom: 10px;
		background: var(--sidebarBg) no-repeat 0 0;
		background-position: center 0;
		background-size: cover;
	}

	.title {
		margin-left: 5px;
	}

	.left-settings {
		position: absolute;
		bottom: 10px;
		right: 10px;
		text-align: center;

		[class^=uni-icons-] {
			margin-left: 10px;
			cursor: pointer;
			transition: all 0.3s;
			color: #999;

			&:hover {
				color: #303133;
			}

			span {
				font-size: 14px;
				margin-left: 2px;
			}
		}
	}

	.theme-choice {
		display: none;
		position: absolute;
		top: 0;
		right: 0;
		transform: translateY(-100%);
		border: 1px solid #ccc;
		padding: 6px 10px;
		box-shadow: 4px 0 20px 4px #ccc inset;

		span:not(:last-child){
			border-right: 1px solid red;
			padding-right: 4px;
			margin-right: 4px;
		}

		span:hover {
			text-decoration: underline;
		}

		.theme-active {
			color: var(--color-primary);
			font-weight: 500;
		}
	}

	.theme-toggle {
		position: relative;
	}

	.theme-toggle:hover .theme-choice {
		display: flex;
		width: max-content;
	}
</style>
