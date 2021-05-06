import _type from './type.js'
import observable from './observable.js'
import CRUD from './crud.js'
import {
	merge
} from './object.js'

/**
 * 创建快照
 * action： CRUD方式或自定义
 * target： 操作对象
 * diff：   变化的值
 * key：    数组索引或对象key
 */
function createSnapshot(action = CRUD.C, target, diff, key) {
	return {
		action,
		target,
		diff,
		time: Date.now(),
		key
	}
}

function createObservable(obj, callback, deep = false) {
	return observable(obj, callback, deep)
}

function undo({
	action,
	target,
	diff,
	key
}) {
	switch (action) {
		case CRUD.C:
			if (_type.isArray(target)) {
				target.splice(key, 1)
			} else {
				delete target[key]
			}
			break
		case CRUD.U:
			if (_type.isArray(target)) {
				// console.log("merge: ", JSON.stringify(target[key]), key, diff.oldVal);
				merge(target[key], diff.oldVal)
				// console.log("merge#2: ", JSON.stringify(target[key]));
			} else {
				target[key] = diff.oldVal
			}
			break
		case CRUD.D:
			if (_type.isArray(target)) {
				target.splice(key, 0, diff)
			} else {
				target[key] = diff
			}
			break
			// 组合操作
		case CRUD.R:
		default:
			let i = target.length - 1
			while(i >= 0){
				undo(target[i--])
			}
			break
	}

}

function redo({
	action,
	target,
	diff,
	key
}) {
	switch (action) {
		case CRUD.C:
			if (_type.isArray(target)) {
				target.splice(key, 0, diff)
			} else {
				target[key] = diff
			}
			break
		case CRUD.U:
			if (_type.isArray(target)) {
				merge(target[key], diff.newVal)
			} else {
				target[key] = diff.newVal
			}
			break
		case CRUD.D:
			if (_type.isArray(target)) {
				target.splice(key, 1)
			} else {
				delete target[key]
			}
			break
			// 组合操作
		case CRUD.R:
		default:
			target.forEach(item => redo(item))
			break
	}
}

export {
	createSnapshot,
	createObservable,
	undo,
	redo
}
