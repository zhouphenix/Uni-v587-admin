import store from '@/store';
import {
	KEY_THEME
} from '../config.js'

export default {
	namespaced: true,
	state: {
		theme: uni.getStorageSync(KEY_THEME),
		themeList: []
	},
	mutations: {
		SET_THEME: (state, theme) => {
			state.theme = theme
			uni.setStorageSync(KEY_THEME, theme)
		},
		SET_THEME_LIST: (state, themes) => {
			state.themeList = themes
		}
	}
}
