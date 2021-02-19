# uni-cloud-banner

# 云端一体banner插件


本插件仅支持在[uniCloud admin](https://ext.dcloud.net.cn/plugin?id=3268)，管理opendb-banner表。


插件目录文件：

`uni_modules/uni-cloud-banner/`

```
│  changelog.md
│  package.json
│  readme.md
├─js_sdk
│  └─validator
│        opendb-banner.js 
├─pages
│  └─opendb-banner
│        add.vue
│        edit.vue
│        list.vue
└─uniCloud
    └─database
          opendb-banner.schema.json
```

- uni_modules/uni-cloud-banner/uniCloud/databse/opendb-banner.schema.json 这是banner表的schema结构。
- uni_modules/uni-cloud-banner/pages/opendb-banner/ 目录下的 list.vue、add.vue、edit.vue。后端banner管理。事实上这些页面都是schema2code生成的


## 如何使用

1. 导入插件到 [uniCloud admin](https://ext.dcloud.net.cn/plugin?id=3268) 工程

2. 在工程的 `pages.json` 文件 `pages` 节点 增加插件的 `add`、`edit`、`list` 页面配置


`pages.json`

```json
{
	"pages": [
		{
			"path": "uni_modules/uni-cloud-banner/pages/opendb-banner/add",
			"style": {
					"navigationBarTitleText": "新增"
			}
		}, {
			"path": "uni_modules/uni-cloud-banner/pages/opendb-banner/edit",
			"style": {
					"navigationBarTitleText": "修改"
			}
		}, {
			"path": "uni_modules/uni-cloud-banner/pages/opendb-banner/list",
			"style": {
					"navigationBarTitleText": "列表"
			}
		}
	]
}
```
