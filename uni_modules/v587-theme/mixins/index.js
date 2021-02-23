import {removeCss, loadCss} from '../js_sdk/v587-load_file.js'
import {mapState} from 'vuex'

export default {
	watch: {
		theme: {
			handler: 'onThemeChange',
			immediate: true
		}
	},
	computed: {
		...mapState('theme', ['theme', 'themeList'])
	},
	methods: {
		onThemeChange(newVal, oldVal) {
			if (this.themeList.includes(oldVal)) {
				removeCss(`/static/theme/theme_${oldVal}.css`)
			}
			if (this.themeList.includes(newVal)) {
				loadCss(`/static/theme/theme_${newVal}.css`)
			}
		}
	}
}