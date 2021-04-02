// 检验是否是数组
function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}

//判断是否是对象
function isObject(obj) {
	return Object.prototype.toString.call(obj) == '[object Object]';
}

/**对象克隆
 * @param {Object} obj 克隆对象
 */
function clone(obj) {
	if (typeof(obj) != 'object') return obj;
	if (obj == null) return obj;

	let newObj = {}
	if (obj.constructor) {
		newObj = new obj.constructor();
	}

	for (let i in obj)
		newObj[i] = clone(obj[i]);
	return newObj;
}


/**
 * 深度合并对象
 * @param target 目标对象
 * @param ...sources  合并对象集
 */
function merge(target, ...sources) {
	// 不是对象，则返回
	if (!isObject(target)) return
	// 参数长度大于0，开始合并操作
	if (sources.length > 0) {
		// 该层级合并操作
		(function fn(t, ...s) {
			// 开始递归遍历
			let source = s.shift();
			// 如果存在，则执行合并操作
			if (source && isObject(source)) {
				if (isArray(source)) {
					fn(t, ...source)
				} else {
					for (const k in source) {
						if (isObject(source[k])) {
							if (!t[k]) continue
							fn(t[k], source[k])
						} else {
							t[k] = source[k]
						}
					}
				}
			} else { // 不存在， 递归下一层
				fn(t, s)
			}

		})(target, ...sources)

	}

}

export {
	clone,
	merge
}
