import {
	createSnapshot,
	undo,
	redo
} from '../js_sdk/v587-toolbox/snapshot'

export default {
	namespaced: true,
	state: {
		timeline: [], // 存储数据快照
		current: -1, // 当前数据快照的指针, 为 timeline 建立的索引
		limit: 100, // 规定了 timeline 的最大长度，防止存储的数据量过大
		enableSnap: true, // 启用快照
		composeSnapshot: null // 组合快照存储
	},

	mutations: {
		SET_LIMIT(state, limit) {
			state.limit = limit
		},

		PUSH_SNAPSHOT(state, snapshot) {
			state.timeline.push(snapshot)
			while (state.timeline.length > state.limit) {
				state.timeline.shift()
			}
			state.current = state.timeline.length - 1
		},
		
		SET_ENABLE_SNAP(state, enable) {
			state.enableSnap = enable
		},
		
		SET_COMPOSE_SNAPSHOT(state, composeSnapshot) {
			state.composeSnapshot = composeSnapshot
		}
	},

	getters: {
		// 可撤销
		hasPre: (state) => {
			return state.current >= 0
		},
		// 可重做
		hasNext: (state) => {
			return state.current < state.timeline.length - 1
		},
		// 快照列表
		snapshots: (state) => {
			return state.timeline
		},
		// 当前快照索引
		currentSnapshotIndex: (state) => {
			return state.current
		},
		// 根据索引获取快照
		getSnapshotBy: (state) => (index) => {
			return state.timeline[index]
		}
	},
	actions: {

		// 撤销
		undo: ({
			state,
			getters,
			dispatch,
			commit
		}) => {
			if (!getters.hasPre) {
				return Promise.reject('已经回到【1st】步， 无法撤销')
			}
			return new Promise((resolve, reject) => {
				const snapshot = getters.getSnapshotBy(state.current--)
				undo(snapshot)
				resolve(snapshot)
			})
		},

		// 重做
		redo: ({
			state,
			getters,
			dispatch,
			commit
		}) => {
			return new Promise((resolve, reject) => {
				if (!getters.hasNext) {
					reject('已经处于【最新】状态， 无法重做')
				}else {
					const snapshot = getters.getSnapshotBy(++state.current)
					redo(snapshot)
					resolve(snapshot)
				}
				
			})
		},
		// 回档
		retreated: ({
			state,
			getters,
			dispatch,
			commit
		}, index) => {
			return new Promise((resolve, reject) => {
				if (index < 0 || index >= state.limit) {
					reject('无效的存档索引：' + index)
				} else {
					const isUndo = index < state.current
					if (isUndo) {
						while (index < state.current) {
							dispatch('undo')
						}
					} else {
						while (index > state.current) {
							dispatch('redo')
						}
					}
					resolve()
				}
			})
		},

		// context 对象
		// 		commit: ƒ (_type, _payload, _options)
		// 		dispatch: ƒ (_type, _payload, _options)
		// 		getters: {}
		// 		rootGetters: {}
		// 		rootState: {…}
		// 		state:
		// 捕获action, target(目标对象), diff（数据）, key（数组索引或对象key）
		snap: ({
			state,
			commit
		}, {
			action,
			target,
			diff,
			key
		}) => {
			return new Promise((resolve, reject) => {
				// 废弃其他分支
				while (state.current < state.timeline.length - 1) {
					// 不记录操作， 直接操作state
					state.timeline.pop()
				}
				const snapshot = createSnapshot(action, target, diff, key)
				// 压栈
				commit('PUSH_SNAPSHOT', snapshot)
				resolve(snapshot)
			})

		}
	}
}
