import clickoutside from './clickoutside.js'
export default {
	install(Vue) {
		Vue.directive('clickoutside', clickoutside)
	}
}