let _obj = {
			isNumeric: "Number",
			isBoolean: 'Boolean',
			isString: 'String',
			isNull: 'Null',
			isUndefined: 'Undefined',
			isSymbol: 'Symbol',
			isPlainObject: 'Object',
			isArray: 'Array',
			isRegExp: 'RegExp',
			isDate: 'Date',
			isFunction: "Function",
			isWindow: 'Window'
		},
		_toString = _obj.toString,
		_type = {};

	for (let key in _obj) {
		if (!_obj.hasOwnProperty(key)) break;
		let reg = new RegExp("^\\[object " + _obj[key] + "\\]$");
		_type[key] = function(val) {
			return reg.test(_toString.call(val));
		}
	}

export default _type