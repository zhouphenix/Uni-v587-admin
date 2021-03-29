# v587-ui-sample v587-ui组件库 sample展示插件

目的：配合[v587-ui 组件库](https://ext.dcloud.net.cn/plugin?id=4330) 使用

插件类型： uni-admin 插件

## 配置

### 1.安装依赖（项目下）
+ 依赖组件库 [v587-ui](https://ext.dcloud.net.cn/plugin?name=v587-ui)

### 2.配置page

pages.json中subPackages节点中添加

```
"subPackages": [{
		"root": "uni_modules/v587-ui-sample/pages",
		"pages": [{
			"path": "/index/index",
			"style": {
				"navigationBarTitleText": "V587 UI展示"
			}
		}]
	}]

```

### 3. `uni-scrollbar ` 样式缺失，见【附】

## 成品展示

![组件库展示插件sample](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/2940eb41-b2bf-489a-acd7-096eebd1b5d3.gif)

## 附

 + `transform: scale(1);` 妙用: 可以将` position: fixed;` 全屏 转换成  限定区域， 如 phone 展示区域限定
 + uni-scrollbar 样式
 ```
 .uni-scrollbar {
 	overflow: overlay;
 }
 
 /*滚动条样式*/
 .uni-scrollbar::-webkit-scrollbar {
 	width: 6px;
 	height: 6px;
 }
 
 .uni-scrollbar::-webkit-scrollbar-corner {
 	background-color: transparent;
 }
 
 .uni-scrollbar:hover::-webkit-scrollbar-thumb {
 	border-radius: 10px;
 	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
 	background-color: transparent;
 	border: 1px solid transparent;
 }
 
 .uni-scrollbar::-webkit-scrollbar-thumb:hover {
 	background-color: rgb(167, 167, 171);
 	border-color: #cccccc;
 	border: 1px solid rgb(207, 207, 212);
 }
 
 .uni-scrollbar::-webkit-scrollbar-track {
 	background-color: transparent;
 }
 ```

## 功能在完善中，体验功能可关注订阅号

## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)

