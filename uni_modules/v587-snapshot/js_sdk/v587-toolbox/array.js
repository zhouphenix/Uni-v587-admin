//数组元素互换位置
function swap(arr, index1, index2) {
	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
}



function move(arr, fromIndex, toIndex) {
	const element = arr[fromIndex];
	arr.splice(fromIndex, 1);
	arr.splice(toIndex, 0, element);
}

// 上移
function up(arr, index) {
	if (index > 0) {
		swap(arr, index, index - 1);
		return true
	}
	return false
}

// 下移
function down(arr, index) {
	if (index < arr.length - 1) {
		swap(arr, index, index + 1);
		return true
	}
	return false
}

// 置顶
function top(arr, index) {
	if (index > 0) {
		// 将要置顶的元素存储后删除
		const temp = arr.splice(index, 1)[0]
		// 将元素unshift到数组第一位
		arr.unshift(temp)
		return true
	}
	return false
}

// 置底
function bottom(arr, index) {
	if (index < arr.length - 1) {
		// 将要置底的元素存储后删除
		const temp = arr.splice(index, 1)[0]
		// 将元素push到数组最后一位
		arr.push(temp)
		return true
	}
	return false
}


export {
	swap,
	up,
	top,
	bottom,
	move,
	down
}
