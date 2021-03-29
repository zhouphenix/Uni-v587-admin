<template>
	<view class="theme-generator">
		<view class="theme-exhibition uni-scrollbar">
			<view>
				<uni-title type="h1" :title="`我的主题(${name})/${themeList.length}`"></uni-title>
				<view class="theme-list uni-scrollbar">
					<view class="theme-item" v-for="(item, index) in themeList" :key="index">
						<view class="theme-item__preview">
							<view
								:style="{backgroundColor: item.theme.Color['Brand Color']['color-primary'].value, width:'100%', height: '50px'}">
							</view>
							<view style="display: flex;justify-content: space-around;">
								<view v-for="(it, idx) in item.theme.Color['Functional Color']" :key="idx"
									:style="{flex: '1', height: '50px', backgroundColor: it.value}"></view>
							</view>
							<view class="theme-item__action">
								<view class="item-action__mask">
								</view>
								<view class="item-action">
									<view class="item-action__item" @click="handleEdit(item)">
										<view class="uni-icons-compose"></view>
										<text>编辑</text>
									</view>
									<view class="item-action__item" @click="downloadTheme(item.name)">
										<view class="uni-icons-cloud-download"></view>
										<text>下载</text>
									</view>
								</view>
							</view>
						</view>
						<view class="theme-item__info">
							<view class="item-info__title">
								<view><input ref="input-name" type="text" :class="{'input-edit': item.enableEdit }"
										:value="item.name" :disabled="!item.enableEdit"
										@blur="({detail})  => renameTheme(detail.value, item) " /></view>
								<view class="uni-icons-more-filled item-info__menu">
									<view class="item-menu">
										<view @click="enableEdit(item, index)">
											重命名
										</view>
										<view style="color: red;" @click="deleteTheme(index)">
											删除主题
										</view>
									</view>
								</view>
							</view>
							<view class="item-info__desc">最近修改
								<text>{{new Date(item.date).format('yyyy-MM-dd hh:mm:ss')}}</text>
							</view>
						</view>

					</view>

				</view>
			</view>
			<view class="theme-name">{{name}}</view>
			<uni-title class="uni-title" type="h3" title="Color" id="Color"></uni-title>
			<view class="theme-color">
				<view class="color-box" v-for="(value, key) in themeConfig.Color" :key="key">
					<view v-for="(v, k) in value" :key="k"
						:style="{backgroundColor: v.value, color: v.value > '#E4E4E4' ? 'black': 'white'}">
						<view class="color-name">{{k.replace(/color-/i, '')}}</view>
						<view class="color-value">{{v.value}}</view>
					</view>
				</view>

			</view>
			<uni-title class="uni-title" type="h3" title="Typography" id="Typography"></uni-title>
			<view class="theme-typography">
				<view>
					<view v-for="(value, key, index) in themeConfig.Typography['Font Size']" :key="key"
						:style="{fontSize: value.value, marginBottom: '15px'}">
						Heading{{index + 1}}
					</view>
				</view>
				<view>
					<view class="theme-typography__title">
						Example body text
					</view>
					<view :style="{'lineHeight': themeConfig.Typography['Line Height']['font-line-height-primary'].value ,
					 fontWeight: themeConfig.Typography['Font Weight']['font-weight-primary'].value,
					 fontSize: themeConfig.Typography['Font Size']['font-size-base'].value}">
						With MySpace becoming more popular every day, there is the constant need to be different. There
						are millions of
						users. If MySpace layouts are chosen well, then you can enhance your profile a great deal.
					</view>
				</view>
				<view>
					<view class="theme-typography__title">
						Example small text
					</view>
					<view :style="{'lineHeight': themeConfig.Typography['Line Height']['font-line-height-secondary'].value,
					 fontWeight: themeConfig.Typography['Font Weight']['font-weight-secondary'].value,
					 fontSize: themeConfig.Typography['Font Size']['font-size-small'].value}">
						Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend
						hours in front
						of their desktops, while delivery people scan bar codes with handhelds and workers in the field
						stay in touch
						with the central office via their notebooks. Computer hardware weaves itself through the fabric
						of our lives.
					</view>
				</view>
			</view>
			<view style="height: 500px;"></view>
			<view style="height: 500px;"></view>
			<view style="height: 500px;"></view>
		</view>
		<view class="theme-control-pane">
			<view class="control-header">
				<view class="control-header__actions">
					<button type="warn" size="mini" @click="reset">重置</button>
					<button type="default" size="mini" @click="save" :disabled="!hasChanged">保存</button>
					<button type="primary" size="mini" @click="downloadTheme(name)">下载</button>
				</view>
				<v587-select :options="classifies" v-model="classify" @change="selectClassify"></v587-select>
				<view class="line"> </view>
			</view>


			<view v-if="classify === 0" class="control-content uni-scrollbar">
				<view class="category" v-for="(value, key) in colors" :key="key">
					<text class="category-name">{{key}}</text>
					<view class="category-config" v-for="(v,k) in value">
						<text class="category-config__label">{{k}} ({{v.description}})</text>
						<view class="category-config__content">
							<input type="text" :value="v.value" />
							<view class="color-picker" @click.stop="$set(v, 'show',  !v.show)">
								<view :style="{background: v.value, width: '100%', height: '100%'}"></view>
								<text class="color-picker__arrow">﹀</text>
								<view class="color-picker__pane" v-clickoutside="_=> $set(v, 'show',  false)">
									<v587-color-picker v-if="v.show" v-model="v.value"
										@onColorChange="colorChanged = true" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-else-if="classify === 1" class="control-content uni-scrollbar">
				<view class="category" v-for="(value, key) in typographies" :key="key">
					<text class="category-name">{{key}}</text>
					<view class="category-config" v-for="(v,k) in value">
						<text class="category-config__label">{{k}} ({{v.description}})</text>
						<v587-select border :options="key|filterCandidates" v-model="v.value"
							@change="typographyChanged = true"></v587-select>
					</view>
				</view>
			</view>
			<view v-else class="control-content uni-scrollbar"></view>
		</view>

	</view>
</template>

<script>
	import config from '../../config.json'
	import FileSaver from 'file-saver'
	import JSZip from 'jszip'

	const KEY_THEME_STORE = 'key_theme-store'

	Date.prototype.format = function(format) {
		/*
	     * eg:format="YYYY-MM-dd hh:mm:ss";
	
	     */
		var o = {
			"M+": this.getMonth() + 1, // month
			"d+": this.getDate(), // day
			"h+": this.getHours(), // hour
			"m+": this.getMinutes(), // minute
			"s+": this.getSeconds(), // second
			"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
			"S": this.getMilliseconds()
			// millisecond
		}
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}

	export default {
		data() {
			return {
				name: 'V587-Theme1',
				themeConfig: JSON.parse(JSON.stringify(config)),
				classify: 0,
				themeList: [],
				colorChanged: false, // 记录颜色Color是否发生更改
				typographyChanged: false // 记录Typography是否发生更改
			}
		},
		computed: {
			classifies() {
				return Object.keys(this.themeConfig).map((item, index) => {
					return {
						label: item,
						value: index
					}
				})
			},
			colors() {
				return this.themeConfig.Color
			},
			typographies() {
				return this.themeConfig.Typography
			},
			hasChanged() {
				return this.colorChanged || this.typographyChanged
			}

		},
		filters: {
			filterCandidates(key) {
				if (key === 'Font Weight') {
					return ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800',
						'900', 'inherit'
					]
				} else if (key === 'Line Height') {
					return ['1', '1.3', '1.5', '1.7', '12px', '16px', '20px', '24px', '28px']
				} else {
					return [12, 13, 14, 16, 18, 20, 22, 28, 36, 48].map(item => `${item}px`)
				}
			}
		},
		mounted() {
			const storage = uni.getStorageSync(KEY_THEME_STORE)
			this.themeList = JSON.parse(storage || '[]')
			this.init()
		},
		beforeDestroy() {
			this.save()
		},
		methods: {
			init() {
				const reg = /^V587\-Theme\d+$/i
				const last = this.themeList.filter(item => reg.test(item.name)).sort((l, r) => l.name < r.name ? 1 : -1)[0]
				let suffix = last ? (Number(last.name.replace('V587-Theme', '')) + 1) : 1
				this.name = `V587-Theme${suffix}`
			},
			// 滚动到锚点
			toAnchor(id) {
				const returnEle = document.querySelector(id); //id是将要跳转区域的id
				returnEle && returnEle.scrollIntoView(true); // true 是默认的
			},

			selectClassify(c) {
				if (this.classifies.includes(c)) {
					this.toAnchor(`#${c.label}`)
				}
			},
			reset() {
				this.themeConfig = JSON.parse(JSON.stringify(config))
				this.colorChanged = false
				this.typographyChanged = false
			},

			save() {
				// 如果发生更改
				if (this.colorChanged) {
					const theme = this.themeList.find(item => item.name === this.name)
					if (!theme) { //如果不存在， 添加到缓存
						this.themeList.push({
							name: this.name,
							theme: this.themeConfig,
							date: Date.now()
						})
					} else {
						theme.date = Date.now()
					}
					this.restore()
				}

			},

			restore() {
				uni.setStorageSync(KEY_THEME_STORE, JSON.stringify(this.themeList))
			},

			deleteTheme(index) {
				this.themeList.splice(index, 1)
				this.restore()
			},

			enableEdit(item, index) {
				this.$set(item, 'enableEdit', true)
				this.$nextTick(function() {
					this.$refs['input-name'][index].$el.querySelector('input').focus()
				})
			},

			renameTheme(newVal, item) {
				item.name = newVal
				item.enableEdit = false;
				this.restore()
			},

			handleEdit(item) {
				if (item.name === this.name) {
					this.restore()
				} else {
					this.themeConfig = item.theme
					this.name = item.name
				}
				this.colorChanged = false
			},
			downloadTheme(name) {
				const index = this.themeList.findIndex(item => item.name === name)
				const theme = index !== -1 ? this.themeList[index] : {
					name: this.name,
					theme: this.themeConfig
				}
				const zip = new JSZip(); // 实例化zip
				const folder = zip.folder(theme.name); // zip包内的文件夹名字

				const d = []
				const mp = []
				
				for (let key in theme.theme) {
					for (let k in theme.theme[key]) {
						for (let j in theme.theme[key][k]) {
							d.push(`--${j}: ${theme.theme[key][k][j].value};  /*${theme.theme[key][k][j].description}*/`)
							mp.push(`'--${j}': '${theme.theme[key][k][j].value}',  /*${theme.theme[key][k][j].description}*/`)
						}
					}
				}
				let blob1 = new Blob([`:root{\n${d.join('\n')}\n}`], {
					type: "text/plain;charset=utf-8"
				});
				let blob2 = new Blob([`export default {\n${mp.join('\n')}\n}`], {
					type: "text/plain;charset=utf-8"
				});

				folder.file(`${theme.name}.css`, blob1)
				folder.file(`${theme.name}.js`, blob2)

				zip.generateAsync({
						type: "blob"
					}) // zip下载
					.then(function(content) {
						FileSaver.saveAs(content, `${theme.name}.zip`);
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.theme-generator {
		display: flex;
		flex-flow: row nowrap;
		font-size: 12px;

		.theme-exhibition {
			flex: 1;
			width: 50vw;
			padding: 0 15px;
			box-sizing: border-box;

			.theme-list {
				display: flex;
				flex-flow: row;
				padding: 10px;

				.theme-item {
					display: flex;
					flex-flow: column;
					user-select: none;
					border-radius: 4px;
					background: #fff;
					height: 150px;
					width: 250px;
					min-width: 250px;
					box-shadow: 0 0 1px 0 #666;
					position: relative;

					&:nth-child(n):not(:first-child) {
						margin-left: 10px;
					}

					&:hover {
						box-shadow: 0 0 10px 0 #999;
					}


					&:hover .theme-item__preview>.theme-item__action {
						display: flex;
					}

					.theme-item__preview {
						position: relative;
						border-radius: 4px 4px 0 0;
						overflow: hidden;
						width: 100%;

						.theme-item__action {
							display: none;
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;

							.item-action__mask {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								background: #000;
								opacity: .2;


							}

							.item-action {
								display: flex;
								flex-flow: row;
								width: 100%;
								justify-content: center;
								color: white;
								z-index: 1;

								.item-action__item {
									display: flex;
									flex-flow: column;
									justify-content: center;
									align-items: center;
									opacity: 0.6;
									transition: 0.3s;
									cursor: pointer;
									user-select: none;

									&:hover {
										opacity: 1;
									}

									[class^=uni-icons] {
										font-size: 28px;
										border: 1px solid white;
										border-radius: 50%;
										padding: 10px;
									}

									&:nth-child(n):not(:first-child) {
										margin-left: 20px;
									}
								}
							}

						}



					}

					.theme-item__info {
						display: flex;
						flex: 1;
						flex-flow: column;
						align-items: flex-start;
						justify-content: center;

						.item-info__title {
							width: 100%;
							display: flex;
							box-sizing: border-box;
							font-weight: 700;
							font-size: 16px;
							color: #303133;
							padding: 0 12px;
							align-items: center;
							justify-content: space-between;



							.item-info__menu {
								position: relative;
								cursor: pointer;

								&:hover .item-menu {
									display: block;
								}

								.item-menu {
									display: none;
									position: absolute;
									bottom: 100%;
									right: 0;
									min-width: 100px;
									background-color: white;
									border-radius: 2px;
									z-index: 1;
									font-size: 14px;
									padding: 8px 0 8px;
									box-sizing: border-box;
									box-shadow: 0 0 10px #999;

									&>view {
										line-height: 24px;
										height: 24px;
										padding: 0 8px;

										&:hover {
											background-color: #e9e6e9;
										}
									}
								}
							}


						}

						.item-info__desc {
							padding: 0 12px;
							font-size: 14px;
							color: #606266;
							margin-top: 2px;
						}
					}
				}

			}

			.theme-name {
				font-weight: 400;
				font-size: 24px;
				margin: 30px 0 0;
			}
		}

		.theme-color {

			.color-box {
				display: flex;
				flex-flow: row wrap;
				justify-content: flex-start;
				position: relative;
				border-radius: 4px;
				box-sizing: border-box;
				color: #fff;
				font-size: 14px;

				&>view {
					border: 1px solid rgb(238, 238, 238);
					margin: 8px 8px 0 0;
					width: 140px;
					padding: 20px;
					border-radius: 4px;
					min-width: 120px;

					.color-name {
						text-transform: capitalize;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.color-value {
						font-size: 12px;
						opacity: .69;
						line-height: 24px;
					}
				}
			}
		}

		.theme-typography {
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;

			&>view {
				width: 100%;
				flex: 1;
				margin-top: 15px;
				margin-right: 15px;

				&:nth-child(n):not(:first-child) {
					min-width: 200px;
				}

				.theme-typography__title {
					font-size: 18px;
					font-weight: 400;
				}


				.theme-typography__title+view {
					padding: 15px 0;
				}
			}


		}

		.theme-control-pane {
			overflow: hidden;
			background: #f5f7fa;
			width: 250px;
			min-width: 250px;
			height: 100%;
			box-sizing: border-box;
			border: 1px solid #ebeef5;
			border-radius: 5px;
			position: sticky;
			right: 0px;
			top: 0;
			box-shadow: 0 0 10px 4px rgba($color: #000000, $alpha: 0.1);

			.control-header {
				padding: 15px 10px 0;

				.control-header__actions {
					display: flex;
					flex-flow: row nowrap;
					margin-bottom: 10px;
					justify-content: flex-end;

					button {
						margin: 0 5px;
					}
				}

				uni-input {
					background: #f5f7fa;
					border: none;
					font-size: 18px;
					padding-left: 0;
					color: #606266;
				}
			}

			.control-content {
				padding: 0 15px 300px;
				height: calc(100vh - 187px);
				box-sizing: border-box;

				.category {
					.category-name {
						color: #c0c4cc;
						font-size: 18px;
						display: block;
						margin: 13px 0 3px;
					}

					.category-config {
						padding: 5px 0;

						.category-config__label {
							color: #606266;
							font-size: 14px;
							margin-bottom: 8px;
							display: block;
						}

						.category-config__content {
							display: flex;
							flex-flow: row nowrap;
							justify-content: space-between;
							align-items: center;

							input {
								height: 36px;
								line-height: 36px;
								box-sizing: border-box;
								font-size: 14px;
								background-color: #fff;
								background-image: none;
								border-radius: 4px;
								border: 1px solid #DCDFE6;
								padding: 0 10px;
								text-transform: uppercase;
							}

							.color-picker {
								display: inline-block;
								width: 30px;
								height: 30px;
								position: relative;
								display: block;
								box-sizing: border-box;
								border: 1px solid #999;
								border-radius: 2px;
								text-align: center;
								padding: 4px;
								cursor: pointer;

								.color-picker__arrow {
									position: absolute;
									width: 100%;
									top: 50%;
									left: 50%;
									transform: translate3d(-50%, -50%, 0);
									color: white;
									user-select: none;
								}

								.color-picker__pane {
									position: absolute;
									width: 220px;
									bottom: 0;
									right: 0;
									z-index: 1;
									transform: translateY(calc(100% + 10px));
								}

							}
						}
					}
				}

				.typography {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}

	.line {
		width: 100%;
		height: 0;
		border-bottom: 1px solid #dcdfe6;
	}

	.input-edit {
		border-bottom: 1px solid red;
	}

	.uni-title {
		margin-top: 20px;
		padding-left: 10px;
		position: relative;

		&::before {
			content: ' ';
			display: inline-block;
			width: 10px;
			height: 15px;
			position: absolute;
			left: 0;
			border-left: 4px solid red;
		}
	}
</style>
