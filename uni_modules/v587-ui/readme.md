# v587-ui 一套UI组件库

## [预想] 实现一套自己的UI组件库

### 选择基础组件库：为什么选择uni ui 作为基础库？

关于组件选择， 这里引用uni-ui 组件介绍

> + uni-ui 是全端兼容的基于flex布局的、无dom的ui库
> + uni-ui 是uni-app内置组件的扩展。注意与web开发不同，uni-ui不包括基础组件，它是基础组件的补充。web开发中有的开发者习惯用一个ui库完成所有开发，但在uni-app体系中，推荐开发者首先使用性能更高的基础组件，然后按需引入必要的扩展组件。
> + uni-ui 不支持使用 Vue.use() 的方式安装
> + uni-ui 依赖 scss，若是 HBuilderX 中创建的 uni-app 项目，需要在 HBuilderX 中安装 scss 插件；如果是使用 cli 创建的 uni-app 项目，需要在项目下npm安装 node-sass 和 sass-loader
> + CLI 引用方式 H5 端不支持在 main.js 中全局注册组件，如有需求请使用 easyCom 的方式引用组件

所以无论从性能上、还是全端兼容上、后续维护上，组件库开发基于**uni-ui** 无疑是最优

## 设计

+ 统一样式（高度一致、 点击、选中等效果一致、size大小一致（参考：mini、small、normal、big、large））
	- （Boolean）bordered 边框属性 
	- （String）size 大小属性mini、small、normal、big、large
	- （Boolean）pinned 展示，展览模式
	-  (Boolean) shadowed 阴影
	
+ 主题样式定制
+ 其他

## 已集成组件

### 1、v587-combox 下拉选择器组件(进行中)


## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)

