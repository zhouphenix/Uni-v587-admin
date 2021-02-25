import V587Store from './store/index.js'
import {
	KEY_THEME,
	KEY_LOCALE
} from './config.js'

export default {
	install(Vue, options = {}) {
		const {
			store,
			theme,
			locale
		} = options
		const lastTheme = uni.getStorageSync(KEY_THEME)
		const lastLocale = uni.getStorageSync(KEY_LOCALE)
		
		if (store) {
			store.registerModule('theme', V587Store)
			// 提取主题文件
			const themeFiles = require.context('@/static/theme', true, /theme_.*\.css$/)
			if (themeFiles.keys().length > 0) {
				// 提取主题名称
				const THEMES = themeFiles.keys().map(item => item.match(/theme_(.*)\.css$/)[1])
				store.commit('theme/SET_THEME_LIST', THEMES)
				store.commit('theme/SET_THEME', lastTheme || theme || THEMES[0])
				console.log('V587-theme主题插件加载成功')
			} else {
				console.warn('未检测到主题文件，请确认主题文件是否放置在/static/theme 目录下');
			}

			// 提取locale 文件
			const localeFiles = require.context('@/static/i18n', true, /\.js$/)
			if (localeFiles.keys().length > 0) {
				// 提取主题名称
				const LOCALES = localeFiles.keys().map(item => item.match(/\/(.*)\.js$/)[1])
				const currentLocale = lastLocale || locale || LOCALES[0]
				store.commit('theme/SET_LOCALE_LIST', LOCALES)
				store.commit('theme/SET_LOCALE', currentLocale)
				store.commit('theme/SET_LOCALES_MAP', require(`@/static/i18n/${currentLocale}.js`).default)
				Object.defineProperty(Vue.prototype, '$t', {
					value: function(arg) {
						const rs = store.state.theme.localesMap[arg]
						if(!rs){
							console.error(`i18n国际化定义:关键字【${arg}】未定义`);
						}
						return rs || arg
					}
				})
				console.log('V587-theme i18n插件加载成功')
			} else {
				console.warn('未检测到主题文件，请确认i18n文件是否放置在/static/i18n 目录下')
			}

		} else {
			console.warn('主题插件未正常加载，需传入Vuex.Store实例')
		}
	}
}
