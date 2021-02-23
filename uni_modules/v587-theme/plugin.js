import V587Store from './store/index.js'
import {
	KEY_THEME
} from './config.js'

export default {
	install(Vue, options = {}) {
		const {
			store,
			theme
		} = options
		const lastTheme = uni.getStorageSync(KEY_THEME)
		if (store) {
			store.registerModule('theme', V587Store)
			// 提取主题文件
			const themeFiles = require.context('@/static/theme', true, /theme_.*\.css$/)
			if(themeFiles.keys().length > 0){
				// 提取主题名称
				const THEMES = themeFiles.keys().map(item => item.match(/theme_(.*)\.css$/)[1])
				store.commit('theme/SET_THEME_LIST', THEMES)
				store.commit('theme/SET_THEME', lastTheme || theme || THEMES[0])
				console.log('V587-theme主题插件加载成功');
			}else {
				console.warn('未检测到主题文件，请确认主题文件是否放置在/static/theme 目录下');
			}
			
		} else {
			console.warn('主题插件未正常加载，需传入Vuex.Store实例')
		}
	}
}
