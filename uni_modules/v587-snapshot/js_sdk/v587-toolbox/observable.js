import CRUD from './crud.js'
import _type from './type.js'
import {
	clone
} from './object.js'

/**
 * 对象、数组变化监听(增删改)
 * @param {Object} obj
 * @param {Function} cb
 * @param {Boolean} deep 是否深度监听
 * @return {Proxy}
 */
function observable(obj, cb, deep = false) {
	if ( !(_type.isPlainObject(obj) ||  _type.isArray(obj))) {
		throw 'TypeError: Cannot create observable with a non-object as target'
	}
	
	if (deep && _type.isPlainObject(obj)) {
		for (let key in obj) {
			if (_type.isPlainObject(obj[key])) {
				obj[key] = observable(obj[key], cb, deep);
			}
		}
	}

	return new Proxy(obj, {
		/**
		 * @param {Object, Array} target 设置值的对象
		 * @param {String} key 属性
		 * @param {any} value 值
		 * @param {Object} receiver this({Proxy}),操作target， 不要直接操作proxy对象
		 */
		set(target, key, value, receiver) {
			// 涉及到数组排序， key与value 对应不上
			// 1.target[key] === undefined  不存在， Object.values(target).indexOf(value) !== -1, 说明数据存在排序
			const oldVal = target[key]
			const actionType = oldVal === undefined ? CRUD.C : CRUD.U
			// console.log("target[key], type, key, indexOf: ", JSON.stringify(target[key]), Object.values(target).indexOf(value));
			const rs = Reflect.set(target, key, value, receiver)
			const newVal = target[key]
			//后于 Reflect.set 调用才能判断propertyIsEnumerable， 排除非枚举类型(如数组length), 只对枚举类型回调
			if (target.propertyIsEnumerable(key)) {
				// console.log("#2target[key], type, key, indexOf: ", JSON.stringify(target[key]), actionType, key, Object.values(target).indexOf(value));
				const val = actionType === CRUD.C ? clone(value) : {
					oldVal: clone(oldVal),
					newVal: clone(newVal)
				}
				if (deep && _type.isPlainObject(value)) {
					value = observable(value, cb, deep);
				}

				cb && cb(actionType, {
					target,
					key,
					value: val
				});
			}
			return rs

		},

		deleteProperty(target, key) {
			const value = target[key]
			cb && cb(CRUD.D, {
				target,
				key,
				value
			});
			return Reflect.deleteProperty(target, key)
		}

	});

}
export default observable
