import snapshot from './store'

const LIMIT = 100

export default {
	install(Vue, options = {}) {
		const {
			store,
			limit
		} = options
		if (store) {
			store.registerModule('snapshot', snapshot)
			store.commit('snapshot/SET_LIMIT', limit || LIMIT)
			console.log('V587-snapshot快照插件加载成功')
		} else {
			console.warn('V587-snapshot快照插件未正常加载，需传入Vuex.Store实例')
		}
	}
}
