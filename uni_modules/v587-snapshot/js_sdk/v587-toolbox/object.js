/**对象克隆
 * @param {Object} myObj 克隆对象
 */
function clone(myObj) {
	if (typeof(myObj) != 'object') return myObj;
	if (myObj == null) return myObj;

	var myNewObj;
	if (myObj.constructor) {
		myNewObj = new myObj.constructor();
	} else
		myNewObj = {}
	for (var i in myObj)
		myNewObj[i] = clone(myObj[i]);
	return myNewObj;
}

function isObject(obj) {
	return typeof obj === 'object'
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function merge(target, ...sources) {
	if (!sources.length) return target;

	const source = sources.shift();

	if (!source) {
		return merge(target, ...sources);
	}

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, {
					[key]: {}
				});
				merge(target[key], source[key]);
			} else {
				Object.assign(target, {
					[key]: source[key]
				});
			}
		}
	}

	return merge(target, ...sources);
}

export {
	clone,
	merge
}
