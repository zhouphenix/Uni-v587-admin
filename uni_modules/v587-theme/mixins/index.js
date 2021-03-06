import {
	removeCss,
	loadCss
} from '../js_sdk/v587-load_file.js'
import {
	mapState
} from 'vuex'

export default {
	watch: {
		theme: {
			handler: 'onThemeChange',
			immediate: true
		},
		locale: {
			handler: 'onLocaleChange',
			immediate: true
		}
	},
	computed: {
		...mapState('theme', ['theme', 'themeList', 'locale', 'localeList', 'isH5Mode'])
	},
	methods: {
		onThemeChange(newVal, oldVal) {
			if (this.isH5Mode) {
				// 修改顺序， 防止切换过程中 当前主题 -> 默认主题（异常过程） -> 目标主题 （貌似第一次加载仍然存在）
				if (this.themeList.includes(newVal)) {
					loadCss(`/static/theme/theme_${newVal}.css`)
				}
				if (oldVal && this.themeList.includes(oldVal)) {
					removeCss(`/static/theme/theme_${oldVal}.css`)
				}
			} else {
				if (this.themeList.includes(newVal)) {
					this.$store.commit('theme/SET_THEME_MAP', require(`@/static/theme/theme_${newVal}.js`).default)
				}
			}

		},

		onLocaleChange(newVal) {
			if (this.localeList.includes(newVal)) {
				this.$store.commit('theme/SET_LOCALES_MAP', require(`@/static/i18n/${newVal}.js`).default)
			}
		}
	}
}
