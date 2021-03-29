<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title">表</view>
			</view>
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="searchVal" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="primary" size="mini" @click="add(true)">新增(首行)</button>
				<button class="uni-button" type="primary" size="mini" @click="add()">新增(末尾)</button>
				<button class="uni-button" type="warn" size="mini" @click="delTable"
					:disabled="selectedIndexs.length === 0">删除</button>
			</view>
		</view>
		<view style="display: flex; flex-flow: row wrap;">
			<view class="uni-container">
				<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
					@selection-change="selectionChange">
					<uni-tr>
						<uni-th width="150" align="center">日期</uni-th>
						<uni-th width="150" align="center">姓名</uni-th>
						<uni-th align="center">地址</uni-th>
						<uni-th width="204" align="center">设置</uni-th>
					</uni-tr>
					<uni-tr v-for="(item ,index) in tableData" :key="index">
						<uni-td>{{item.date}}</uni-td>
						<uni-td>
							<view class="name">{{item.name}}</view>
						</uni-td>
						<uni-td>
							<uni-easyinput v-model="item.address" placeholder="请输入" :disabled="!item.editable"
								@confirm="updateItem(item, index)" />
						</uni-td>
						<uni-td>
							<view class="uni-group">
								<button class="uni-button" size="mini" type="primary"
									@tap="edit(item, index)">修改</button>
								<button class="uni-button" size="mini" type="warn" @tap="del(index)">删除</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
						@change="change" />
				</view>
			</view>
			<view class="uni-container">
				<view class="uni-header">
					<view class="uni-group">
						<view class="uni-title">撤销/重做 回档记录</view>
						<view style="color: red;">(对象示例observeObj: {{observeObj}})</view>
					</view>

					<view class="uni-group">
						<button class="uni-button" type="default" size="mini" @click="undo"
							:disabled="!hasPre">撤销</button>
						<button class="uni-button" type="default" size="mini" @click="redo"
							:disabled="!hasNext">重做</button>
					</view>
				</view>
				<uni-table border stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th width="50" align="center">序号</uni-th>
						<uni-th width="150" align="center">Time</uni-th>
						<uni-th width="150" align="center">Action</uni-th>
						<uni-th align="center" width="50">Key</uni-th>
						<uni-th width="50" align="center">Actions</uni-th>
					</uni-tr>
					<uni-tr v-for="(item ,index) in snapshots" :key="index"
						:class="{'is-select': index === currentSnapshotIndex}">
						<uni-td>No.{{index}}</uni-td>
						<uni-td>{{item.time | formatTime}}</uni-td>
						<uni-td>
							<view class="name">{{item.action}}</view>
						</uni-td>
						<uni-td>{{item.key}}</uni-td>
						<uni-td>
							<view class="uni-group">
								<button class="uni-button" size="mini" type="primary"
									@click="retreated(index)">回档到当前</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	import tableData from './tableData.js'

	import SNAPSHOT from 'uni_modules/v587-snapshot/mixins'
	import CRUD from 'uni_modules/v587-snapshot/js_sdk/v587-toolbox/crud.js'

	export default {
		mixins: [SNAPSHOT],
		data() {
			return {
				searchVal: '',
				tableData: this._createObservable([]),
				// 每页数据量
				pageSize: 5,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				selectedIndexs: [],
				observeObj: this._createObservable({
					a: 1
				})
			}
		},
		filters: {
			formatTime(val) {
				return new Date(val)
			}
		},
		computed: {
			...mapGetters('snapshot', ['snapshots', 'currentSnapshotIndex', 'hasPre', 'hasNext'])
		},
		onLoad() {
			this.getData(1)
			this.enabledSnap(false)
		},
		methods: {

			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			undo(e) {
				this._undo().then(res => {
					console.log('undo:', res);
				})
			},
			redo(e) {
				this._redo().then(res => {
					console.log('redo:', res);
				})
			},
			add(isFirst) {
				const item = {
					"date": Date.now(),
					"name": "Dcloud48",
					"address": "上海市普陀区金沙江路 1516 弄"
				}
				if (isFirst) {
					this._beginTransaction()
					this.tableData.unshift(item)
					this._endTransaction()
					//  或
					// this._composeObservables(_=>{
					// 	this.tableData.unshift(item)
					// })
				} else {
					this.tableData.push(item)
				}



			},

			del(index) {
				this.tableData.splice(index, 1)
			},

			edit(item, index) {
				item._backup = this._clone(item)
				this.$set(item, 'editable', true)
			},

			updateItem(item, index) {
				console.log("updateItem: ", item, this.tableData[index])
				item.editable = false
				const newVal = this._clone(item)
				delete newVal._backup
				this._snap(CRUD.U, this.tableData, {
					oldVal: item._backup,
					newVal
				}, index)
			},

			retreated(index) {
				this._retreated(index)
			},
			//批量删除
			delTable() {
				console.log(this.selectedIndexs);
				this._composeObservables(_ => {
					// 逆向删除， 先删除序号大的
					this.selectedIndexs.reverse().forEach(i => this.tableData.splice(i, 1))
					this.$refs.table.clearSelection()
				})
			},
			// 分页触发
			change(e) {
				this.getData(e.current)
			},
			// 搜索
			search() {
				this.getData(1, this.searchVal)
			},
			// 测试监听 Object
			testObserveObj() {
				this.observeObj.a = 2
				this.observeObj.b = '新增属性b'
			},
			// 获取数据
			getData(pageCurrent, value = "") {
				this.loading = true
				this.pageCurrent = pageCurrent
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					value: value,
					success: (res) => {
						this.tableData.splice(0)
						this.tableData.push(...res.data)
						this.total = res.total
						this.loading = false

						this.enabledSnap(true)
						this.testObserveObj()
					}
				})
			},
			// 伪request请求
			request(options) {
				const {
					pageSize,
					pageCurrent,
					success,
					value
				} = options
				let data = tableData.slice(0, 2).filter((item, index) => {
					const idx = index - (pageCurrent - 1) * pageSize
					return idx < pageSize && idx >= 0
				})
				let total = data.length
				if (value) {
					data = []
					tableData.forEach(item => {
						if (item.name.indexOf(value) !== -1) {
							data.push(item)
						}
					})
					total = data.length
				}

				setTimeout(() => {
					typeof success === 'function' && success({
						data: data,
						total: total
					})
				}, 500)

			}

		}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}

	/* #endif */

	.is-select {
		background-color: #f5f7fa !important;
		font-weight: bold;
		box-sizing: border-box;
	}
</style>
