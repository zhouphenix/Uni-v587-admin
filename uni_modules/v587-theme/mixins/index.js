// #ifndef MP
import {removeCss, loadCss} from '../js_sdk/v587-load_file.js'
// #endif
import {mapState} from 'vuex'

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
		...mapState('theme', ['theme', 'themeList', 'locale', 'localeList'])
	},
	methods: {
		// #ifdef MP
		onThemeChange(newVal, oldVal) {
			if (this.themeList.includes(newVal)) {
				this.$store.commit('theme/SET_THEME_MAP', require(`@/static/theme/theme_${newVal}.js`).default)
			}
		},
		// #endif
		
		// #ifndef MP
		onThemeChange(newVal, oldVal) {
			if (this.themeList.includes(oldVal)) {
				removeCss(`/static/theme/theme_${oldVal}.css`)
			}
			if (this.themeList.includes(newVal)) {
				loadCss(`/static/theme/theme_${newVal}.css`)
			}
		},
		// #endif
		
		onLocaleChange(newVal) {
			if (this.localeList.includes(newVal)) {
				this.$store.commit('theme/SET_LOCALES_MAP', require(`@/static/i18n/${newVal}.js`).default)
			}
		}
	}
}