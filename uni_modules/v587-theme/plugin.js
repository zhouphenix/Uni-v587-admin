import V587Store from './store/index.js'
import {
	KEY_THEME,
	KEY_LOCALE
} from './config.js'

//自定义字符处理函数---- 字符串替换格式化
String.prototype.format = function(kwargs) {
	// 正则表达式是在/ /内表示， 正则后的g表示去this里面匹配所有的字符(执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）)  i表示执行对大小写不敏感的匹配  m表示执行多行匹配
	return this.replace(/\{(\w+)\}/g, function(k, m) { //k表示匹配到的字符串，m表示匹配到的分组里的值，在正则中用()表示一个分组
		return kwargs[m] // 把匹配到的字符串用参数的值替换
	});
};

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
					value: function(name, args) {
						let rs = store.state.theme.localesMap[name]
						if (!rs) {
							console.error(`i18n国际化定义:关键字【${name}】未定义`);
						}
						if (args) {
							rs = rs.format(args)
						}
						return rs || name
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
