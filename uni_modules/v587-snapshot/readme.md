# v587-snapshot 快照（撤回/重做/回档）

## 简介

顾名思义： 记录一段时间的操作步骤， 可以撤回、重做、回档这段时间的所有记录

## 兼容性 

同类 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## 配置

### 1. 安装依赖
无

### 2.配置page

+ pages.json中subPackages节点中添加

```
"subPackages": [{
		"root": "uni_modules/v587-snapshot/pages",
		"pages": [{
			"path": "/index/index",
			"style": {
				"navigationBarTitleText": "快照Snapshot"
			}
		}]
	}]

```


+ `main.js` 中引入插件

```
import V587Snapshot from '@/uni_modules/v587-snapshot'
Vue.use(V587Snapshot, {store, limit: 100})
```

+ 使用的地方引入

```
	import SNAPSHOT from 'uni_modules/v587-snapshot/mixins'
	import CRUD from 'uni_modules/v587-snapshot/js_sdk/v587-toolbox/crud.js'
	
	export default {
		//...
		mixins: [SNAPSHOT],
		//...
	}
```

+ 全局引入

`main.js` 文件中插入

```
import SNAPSHOT from 'uni_modules/v587-snapshot/mixins'
Vue.mixin(SNAPSHOT)
```

其中 `CRUD` 为定义的操作类型

```
const CRUD = {
	C: 'v587-create', // 创建操作
	R: 'v587-retrieve',// 聚合操作
	U: 'v587-update', // 更新操作
	D: 'v587-delete' // 删除操作
}

export default CRUD
```

## 使用

### 开启/关闭（默认开启） 操作 `this.enabledSnap(true/false)`,  如需屏蔽初始化操作，可以先关闭，再开启

### 创建监听对象(捕捉操作痕迹基于数据)

+ 数组 ` tableData: this._createObservable([]) ` 
+ 对象 `observeObj: this._createObservable({a: 1 })` 

### 深度监听（默认监听当前对象, 及false），开启设定为true， 如 `this._createObservable(obj, true)`

### 手动捕捉(单操作)

捕捉快照方法1： `_snap(action = CRUD.C, target, diff, key)`

捕捉快照方法2：`_snapshot(snapshot)` ，其中 `snapshot` 由 `_createSnapshot(action = CRUD.C, target, diff, key)` 创建而来


以更新表格中某一项为例

```
// 点击编辑时， 备份旧数据
edit(item, index) {
	item._backup = this._clone(item)
	this.$set(item, 'editable', true)
},

// 更新数据， 
updateItem(item, index) {
	item.editable = false
	const newVal = this._clone(item)
	delete newVal._backup
	this._snap(CRUD.U, this.tableData, {
		oldVal: item._backup,
		newVal
	}, index)
}
```

其中 `CRUD.U` 操作中 `_snap` 第三个参数`diff` 传入结构为 `{oldVal, newVal}`,

捕捉的数据需要通过`_clone(obj)` 方法，克隆一份，**不能传入原对象引用**

### 手动捕捉(多操作、组合操作)

提供了两种方式捕捉

+ 1. 通过`_composeObservables(fn)` 方法， 如批量删除

```
//批量删除
delTable() {
	this._composeObservables(_ => {
		// 逆向删除， 先删除序号大的
		this.selectedIndexs.reverse().forEach(i => this.tableData.splice(i, 1))
	})
},
```

+ 2. 通过 `_beginTransaction() ` 和 `_endTransaction()` 开启一段事务操作， 此过程中的所有单操作都会记录在这个过程中, 如插入操作

```
this._beginTransaction()
this.tableData.unshift(item)
this._endTransaction()
//  或
// this._composeObservables(_=>{
// 	this.tableData.unshift(item)
// })
```

**【注意】** 排序等复杂操作属于聚合操作类型， 需要包裹聚合操作或事务中


### 单独使用， 不创建监听对象

如交换位置操作（组合操作）

```
	// 交换位置， 两步操作
	this._beginTransaction()
	const {
		newIndex,
		oldIndex
	} = e
	const newVal = this._clone(this.children[newIndex])
	const oldVal = this._clone(this.children[oldIndex])
	let oldSnap = this._createSnapshot(this.U, this.children, {
		oldVal,
		newVal
	}, newIndex)
	
	const newSnap = this._createSnapshot(this.U, this.children, {
		oldVal: newVal,
		newVal: oldVal
	}, oldIndex)
	this.composeSnapshot.target.push(oldSnap, newSnap)
	this._endTransaction()
```




### 撤销 （actions 返回一个Promise， 携带快照数据）

```
	undo(e) {
		this._undo().then(res => {
			console.log('undo:', res);
		})
	}
```

### 重做 （actions 返回一个Promise， 携带快照数据）

```
	redo(e) {
		this._redo().then(res => {
			console.log('redo:', res);
		})
	}
```

### 回档 

```
	retreated(index) {
		this._retreated(index)
	}
```

【注意】 避免observable对象整体赋值操作，否则监听将会失效， 如数组concat操作（拷贝赋值）， 或重新observable包裹



### 数据结构

+ 创建操作

```
	{
		"action": "v587-create",
		"target": [
			{
				"date": 1616739373535,
				"name": "Dcloud48",
				"address": "上海市普陀区金沙江路 1516 弄"
			},
			{
				"date": "2020-09-01",
				"name": "Dcloud1",
				"address": "上海市普陀区金沙江路 1518 弄"
			},
			{
				"date": "2020-09-02",
				"name": "Dcloud2",
				"address": "上海市普陀区金沙江路 1517 弄"
			}
		],
		"diff": {
			"date": "2020-09-02",
			"name": "Dcloud2",
			"address": "上海市普陀区金沙江路 1517 弄"
		},
		"time": 1616739373535,
		"key": "2"
	}
```


+ 更新操作

```
	{
	"action": "v587-update",
	"target": [
		{
			"date": 1616739373535,
			"name": "Dcloud48",
			"address": "上海市普陀区金沙江路 1516 弄"
		},
		{
			"date": "2020-09-01",
			"name": "Dcloud1",
			"address": "上海市普陀区金沙江路 1518 弄"
		},
		{
			"date": "2020-09-02",
			"name": "Dcloud2",
			"address": "上海市普陀区金沙江路 1517 弄"
		}
	],
	"diff": {
		"oldVal": {
			"date": "2020-09-02",
			"name": "Dcloud2",
			"address": "上海市普陀区金沙江路 1517 弄"
		},
		"newVal": {
			"date": "2020-09-01",
			"name": "Dcloud1",
			"address": "上海市普陀区金沙江路 1518 弄"
		}
	},
	"time": 1616739373535,
	"key": "1"
}
```

+ 聚合操作

```
{
	"action": "v587-retrieve",
	"target": [
		{
			"action": "v587-create",
			"target": [
				{
					"date": 1616739373535,
					"name": "Dcloud48",
					"address": "上海市普陀区金沙江路 1516 弄"
				},
				{
					"date": "2020-09-01",
					"name": "Dcloud1",
					"address": "上海市普陀区金沙江路 1518 弄"
				},
				{
					"date": "2020-09-02",
					"name": "Dcloud2",
					"address": "上海市普陀区金沙江路 1517 弄"
				}
			],
			"diff": {
				"date": "2020-09-02",
				"name": "Dcloud2",
				"address": "上海市普陀区金沙江路 1517 弄"
			},
			"time": 1616739373535,
			"key": "2"
		},
		{
			"action": "v587-update",
			"target": [
				{
					"date": 1616739373535,
					"name": "Dcloud48",
					"address": "上海市普陀区金沙江路 1516 弄"
				},
				{
					"date": "2020-09-01",
					"name": "Dcloud1",
					"address": "上海市普陀区金沙江路 1518 弄"
				},
				{
					"date": "2020-09-02",
					"name": "Dcloud2",
					"address": "上海市普陀区金沙江路 1517 弄"
				}
			],
			"diff": {
				"oldVal": {
					"date": "2020-09-02",
					"name": "Dcloud2",
					"address": "上海市普陀区金沙江路 1517 弄"
				},
				"newVal": {
					"date": "2020-09-01",
					"name": "Dcloud1",
					"address": "上海市普陀区金沙江路 1518 弄"
				}
			},
			"time": 1616739373535,
			"key": "1"
		},
		{
			"action": "v587-update",
			"target": [
				{
					"date": 1616739373535,
					"name": "Dcloud48",
					"address": "上海市普陀区金沙江路 1516 弄"
				},
				{
					"date": "2020-09-01",
					"name": "Dcloud1",
					"address": "上海市普陀区金沙江路 1518 弄"
				},
				{
					"date": "2020-09-02",
					"name": "Dcloud2",
					"address": "上海市普陀区金沙江路 1517 弄"
				}
			],
			"diff": {
				"oldVal": {
					"date": "2020-09-01",
					"name": "Dcloud1",
					"address": "上海市普陀区金沙江路 1518 弄"
				},
				"newVal": {
					"date": 1616739373535,
					"name": "Dcloud48",
					"address": "上海市普陀区金沙江路 1516 弄"
				}
			},
			"time": 1616739373535,
			"key": "0"
		}
	],
	"time": 1616739373535
}
```


## 原理

目前web上的撤销重做有两种方式：

> 命令式：每步操作都要写逆操作方法，每次保存正向和逆向两个操作（命令）
>
> 快照式：维护一个数组，保存用户每次操作的数据快照，每次恢复都是一次页面数据重置



本插件采用的是**命令式**方式， 使用vuex管理数据快照， 为了通用性， 只管理数据， 快照的数据结构需要自行定

义， 为没类操作定义个类型， 然后通过类型去做数据回档（比如 diff操作）

### 功能分析(借用 [Web 应用的撤销重做实现](https://juejin.cn/post/6844903921878564872))

+ 用户的一系列操作会改变页面的状态：



![state.png](https://user-gold-cdn.xitu.io/2019/8/22/16cb86a8e04d7b58?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



+ 在进行了某个操作后，用户有能力回到之前的某个状态，即**撤销**：



![undo.png](https://user-gold-cdn.xitu.io/2019/8/22/16cb86a8d9c69394?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



+ 在撤销某个操作后，用户有能力再次恢复这个操作，即**重做**：



![redo.png](https://user-gold-cdn.xitu.io/2019/8/22/16cb86a8e64eb63c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



+ 当页面处于某个历史状态时，这时用户进行了某个操作后，这个状态后面的状态会被抛弃，此时产生一个新的状态**分支**： 

  

![branch.png](https://user-gold-cdn.xitu.io/2019/8/22/16cb86a86ea3d7aa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)




+ 通过设置回档索引， 可以直接回档到指定存档位置

 图略



+ 通过设置limit， 可以限定存档最大size， 保证不会过度占用内存， 默认size： 100，可以通过 `store.commit('snapshot/SET_LIMIT', limit || LIMIT)` 动态设定， 下次存档`snap` 时生效




## 成品展示

![快照撤销/重做、回档功能展示](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/07e60660-ccbc-4f09-a7f9-93cf5e5d8758.gif)

![快照撤销/重做、回档功能展示-- 实战项目](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/d961cc1f-321a-4a90-aaf2-dca7895895f7.gif)

## 功能在完善中，体验功能可关注订阅号

## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)


## 附
### 一、数组
#### + 一个插入操作触发proxy  set方法数据示例（unshift操作）， 具体查看‘步骤*’
```
// 原始数据
target[key]:  [
	{
		"date": "2020-09-01",
		"name": "Dcloud1",
		"address": "上海市普陀区金沙江路 1518 弄"
	},
	{
		"date": "2020-09-02",
		"name": "Dcloud2",
		"address": "上海市普陀区金沙江路 1517 弄"
	}
]
observable.js:35 target[key], type, key, indexOf:  {"date":"2020-09-02","name":"Dcloud2","address":"上海市普陀区金沙江路 1517 弄"} v587-create 2 1

// 步骤一：拷贝一份数据
observable.js:31 target[key]:  [
	{
		"date": "2020-09-01",
		"name": "Dcloud1",
		"address": "上海市普陀区金沙江路 1518 弄"
	},
	{
		"date": "2020-09-02",
		"name": "Dcloud2",
		"address": "上海市普陀区金沙江路 1517 弄"
	},
	{
		"date": "2020-09-02",
		"name": "Dcloud2",
		"address": "上海市普陀区金沙江路 1517 弄"
	}
]
observable.js:35 target[key], type, key, indexOf:  {"date":"2020-09-01","name":"Dcloud1","address":"上海市普陀区金沙江路 1518 弄"} v587-update 1 0

// 步骤二：交换位置
observable.js:31 target[key]:  [
	{
		"date": "2020-09-01",
		"name": "Dcloud1",
		"address": "上海市普陀区金沙江路 1518 弄"
	},
	{
		"date": "2020-09-01",
		"name": "Dcloud1",
		"address": "上海市普陀区金沙江路 1518 弄"
	},
	{
		"date": "2020-09-02",
		"name": "Dcloud2",
		"address": "上海市普陀区金沙江路 1517 弄"
	}
]
observable.js:35 target[key], type, key, indexOf:  {"date":1616726158414,"name":"Dcloud48","address":"上海市普陀区金沙江路 1516 弄"} v587-update 0 0

// 步骤三：将新数据插入到指定位置
observable.js:31 target[key]:  [
	{
		"date": 1616726158414,
		"name": "Dcloud48",
		"address": "上海市普陀区金沙江路 1516 弄"
	},
	{
		"date": "2020-09-01",
		"name": "Dcloud1",
		"address": "上海市普陀区金沙江路 1518 弄"
	},
	{
		"date": "2020-09-02",
		"name": "Dcloud2",
		"address": "上海市普陀区金沙江路 1517 弄"
	}
]
```