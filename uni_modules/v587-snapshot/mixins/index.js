import {
	createSnapshot,
	createObservable,
	composeObservable
} from '../js_sdk/v587-toolbox/snapshot.js'

import CRUD from '../js_sdk/v587-toolbox/crud.js'

import {clone} from '../js_sdk/v587-toolbox/object.js'

import { mapState} from 'vuex'

export default {
	data() {
		return {
			...CRUD
		}
	},
	
	computed:{
		...mapState('snapshot', ['enableSnap', 'composeSnapshot'])
	},

	methods: {
		// 使能开关
		enabledSnap(canSnap) {
			this.$store.commit('snapshot/SET_ENABLE_SNAP', canSnap)
		},
		// 创建快照
		_createSnapshot(action = CRUD.C, target, diff, key) {
			return createSnapshot(action, target, diff, key)
		},
		
		// 创建观察对象
		_createObservable(obj, deep=false) {
			let callback = (type, {target, key, value}) =>{
				if(this.enableSnap){
					// console.log("【callback】type, target, value, key: ",type, JSON.stringify(target), JSON.stringify(value), key);
					if(this.composeSnapshot){
						this.composeSnapshot.target.push( this._createSnapshot(type, target, value, key))
					}else {
						this._snap(type, target, value, key)
					}
				}
			} 
			return createObservable(obj, callback, deep)
		},
		
		// 聚合多个操作	
		_composeObservables(fn) {
			if (fn) {
				this._beginTransaction()
				fn()
				this._endTransaction()
			}
			
		},
		// 事务操作begin
		_beginTransaction(){
			if (this.composeSnapshot) {
				throw '请结束当前事务，再尝试...'
			}
			this.$store.commit('snapshot/SET_COMPOSE_SNAPSHOT', this._createSnapshot(CRUD.R, []) )
		},
		// 事务操作end
		_endTransaction() {
			this.composeSnapshot && this._snapshot(this.composeSnapshot)
			this.$store.commit('snapshot/SET_COMPOSE_SNAPSHOT', null )
		},

		_snapshot(snapshot) {
			return this.$store.dispatch('snapshot/snap', snapshot)
		},

		// 存档
		_snap(action = CRUD.C, target, diff, key) {
			return this._snapshot(this._createSnapshot(action, target, diff, key))
		},

		// 撤销 
		_undo(e) {
			return this.$store.dispatch('snapshot/undo')
		},

		// 重做
		_redo(e) {
			return this.$store.dispatch('snapshot/redo')
		},

		// 回档
		_retreated(index) {
			return this.$store.dispatch('snapshot/retreated', index)
		},
		
		_clone(obj) {
			return clone(obj)
		}

	}
}
