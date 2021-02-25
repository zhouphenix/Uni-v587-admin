<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title"></view>
				<view class="uni-sub-title"></view>
			</view>
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
				<button class="uni-button" type="default" size="mini" @click="delTable">批量删除</button>
			</view>
		</view>
		<view class="uni-container">
			<unicloud-db ref="udb" collection="opendb-news-articles,opendb-news-categories" field="user_id,category_id{name},title,content,excerpt,article_status,comment_status,last_comment_user_id,avatar,publish_date,last_modify_date,mode,view_count,like_count,is_sticky,is_essence,comment_count"
			 :where="where" page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
			 v-slot:default="{data,pagination,loading,error,options}" :options="options">
				<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection"
				 @selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">user_id</uni-th>
						<uni-th align="center">分类</uni-th>
						<uni-th align="center">标题</uni-th>
						<uni-th align="center">文章内容</uni-th>
						<uni-th align="center">摘要</uni-th>
						<uni-th align="center">文章状态</uni-th>
						<uni-th align="center">开放评论</uni-th>
						<uni-th align="center">last_comment_user_id</uni-th>
						<uni-th align="center">封面大图</uni-th>
						<uni-th align="center">发表时间</uni-th>
						<uni-th align="center">最后修改时间</uni-th>
						<uni-th align="center">排版显示模式</uni-th>
						<uni-th align="center">阅读数量</uni-th>
						<uni-th align="center">like_count</uni-th>
						<uni-th align="center">是否置顶</uni-th>
						<uni-th align="center">阅读加精</uni-th>
						<uni-th align="center">comment_count</uni-th>
						<uni-th width="204" align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center"> {{item.user_id}} </uni-td>
						<uni-td align="center"> {{item.category_id[0] && item.category_id[0].name}} </uni-td>
						<uni-td align="center"> {{item.title}} </uni-td>
						<uni-td align="center"> <p v-html="item.content"></p> </uni-td>
						<uni-td align="center"> {{item.excerpt}} </uni-td>
						<uni-td align="center"> {{options.article_status_valuetotext[item.article_status]}} </uni-td>
						<uni-td align="center"> {{options.comment_status_valuetotext[item.comment_status]}} </uni-td>
						<uni-td align="center"> {{item.last_comment_user_id}} </uni-td>
						<uni-td align="center"> {{item.avatar}} </uni-td>
						<uni-td align="center">
							<uni-dateformat :date="item.publish_date" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="center">
							<uni-dateformat :date="item.last_modify_date" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="center"> {{item.mode}} </uni-td>
						<uni-td align="center"> {{item.view_count}} </uni-td>
						<uni-td align="center"> {{item.like_count}} </uni-td>
						<uni-td align="center"> {{item.is_sticky == true ? '✅' : '❌'}} </uni-td>
						<uni-td align="center"> {{item.is_essence == true ? '✅' : '❌'}} </uni-td>
						<uni-td align="center"> {{item.comment_count}} </uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini" type="primary">修改</button>
								<button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count"
					 @change="onPageChanged" />
				</view>
			</unicloud-db>
		</view>
	</view>
</template>

<script>
	import {
		enumConverter
	} from '@/uni_modules/v587-blog/js_sdk/validator/opendb-news-articles.js';

	const db = uniCloud.database()
	// 表查询配置
	const dbOrderBy = '' // 排序字段
	const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 20
	const pageCurrent = 1

	export default {
		data() {
			return {
				query: '',
				where: '',
				orderby: dbOrderBy,
				options: {
					pageSize,
					pageCurrent,
					...enumConverter
				},
				imageStyles: {
					width: 64,
					height: 64
				}
			}
		},
		methods: {
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			search() {
				const newWhere = this.getWhere()
				const isSameWhere = newWhere === this.where
				this.where = newWhere
				if (isSameWhere) { // 相同条件时，手动强制刷新
					this.loadData()
				}
			},
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			onPageChanged(e) {
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadData(clear)
						}
					}
				})
			},
			// 多选处理
			selectedItems() {
				var dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			//批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems())
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				this.$refs.udb.remove(id)
			}
		}
	}
</script>
<style>
</style>
