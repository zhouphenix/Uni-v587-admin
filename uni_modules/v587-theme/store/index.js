import store from '@/store';
import {
	KEY_THEME,
	KEY_LOCALE
} from '../config.js'

export default {
	namespaced: true,
	state: {
		// 当前主题
		theme: uni.getStorageSync(KEY_THEME),
		// 支持主题列表， 读取/static/theme/theme_*.css 或 /static/theme/theme_*.js
		themeList: [], // 方便管理， 动态读取主题目录的下的主题文件， 方便后续扩展
		// 主题字典
		themeMap: {},
		// 当前语音
		locale: uni.getStorageSync(KEY_LOCALE),
		// 支持语言列表， 读取/static/i18n/*.js 
		localeList: [],
		// 语言字典
		localesMap: {}
	},
	mutations: {
		SET_THEME: (state, theme) => {
			state.theme = theme
			uni.setStorageSync(KEY_THEME, theme)
		},
		SET_THEME_LIST: (state, themes) => {
			state.themeList = themes
		},
		SET_THEME_MAP: (state, themeMap) => {
			state.themeMap = themeMap
		},
		SET_LOCALE: (state, locale) => {
			state.locale = locale
			uni.setStorageSync(KEY_LOCALE, locale)
		},
		SET_LOCALE_LIST: (state, locales) => {
			state.localeList = locales
		},
		SET_LOCALES_MAP: (state, localesMap) => {
			state.localesMap = localesMap
		}
	},
	getters: {
		themeMap: state => {
			let rs = []
			for(const [k,v] of Object.entries(state.themeMap)) {
				if(k.startsWith('_')) {
					rs.push(`${k.replace(/_/, '--')}: ${v}`)
				} else {
					rs.push(`${k}: ${v}`)
				}
				
			}
			return rs.join(';')
		}
	}
}
