# v587-theme-generator 主题包生成器

目的：配合[主题插件+ i18n国际化](https://ext.dcloud.net.cn/plugin?id=4227)组件使用

插件类型： uni-admin 插件

## 配置

### 1.安装依赖（项目下）
+ 安装file-saver：   `npm install file-saver --save`
+ 安装jszip：   `npm install jszip --save`
+ 依赖组件 [color picker 颜色选择器](https://ext.dcloud.net.cn/plugin?id=4298)
+ 依赖组件库 [v587-ui](https://ext.dcloud.net.cn/plugin?name=v587-ui)

### 2.配置page

pages.json中subPackages节点中添加

```
"subPackages": [{
		"root": "uni_modules/v587-theme-generator/pages",
		"pages": [{
			"path": "/index/index",
			"style": {
				"navigationBarTitleText": "主题生成器"
			}
		}]
	}]

```

## 3.成品展示

![主题生成器展示图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/ac4337a3-66ac-41e3-8753-6ff52f0675c1.gif)

## 功能在完善中，体验功能可关注订阅号

## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)

