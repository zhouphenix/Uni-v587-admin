# v587-theme 一键换肤

为了更好的用户体验， 更多的情景模式， 更多的产品需求

## 需求
+ 替换颜色（包括主体色调、组件色调）
+ logo、背景等图片
+ 其他

## 分析
+ 基本上只有html、css、静态资源层面的东西有改动
+ 后续主体皮肤增加

一套代码基本足以

## 开发

### 1. 首先定义一个目录存储主题（固定如此）： `/static/theme/`
	
	/static/theme/目录结构
	│  theme_dark.css
	│  theme_light.css
	│
	├─dark
	│      bg_sidebar.jpg
	│
	└─light
			bg_sidebar.jpg
			
theme_dark.css，theme_light.css	分别对应预设的两个主题包， 对应dark、light资源目录
文件中定义一些变量， 使用的地方引用即可
	
```
:root{
  --primaryColor: #616161;
	--sidebarBg: url(/static/theme/dark/bg_sidebar.jpg)
}
```
	
+ 颜色处理：
  css中使用 `primaryColor: #616161;`

+ 图片处理(背景、img)：

  css中使用 `background: var(--sidebarBg) no-repeat 0 0;` 
  
  html中使用 ```<image :src="`../../static/theme/${theme}/bg_sidebar.jpg`" ></image>```
	
	
	
### 2. 再定义一个变量存储当前主题, 此处使用vuex管理这个状态
```
export default {
	state: {
		theme: uni.getStorageSync(KEY_THEME), // 当前主题
		themeList: [] // 方便管理， 动态读取主题目录的下的主题文件， 方便后续扩展
	}
}
```

### 3. 监听主题变化，加载对应主题

```
onThemeChange(newVal, oldVal) {
		if (this.themeList.includes(oldVal)) {
			removeCss(`/static/theme/theme_${oldVal}.css`)
		}
		if (this.themeList.includes(newVal)) {
			loadCss(`/static/theme/theme_${newVal}.css`)
		}
	}
```

### 4.使用

+ 步骤一、main.js 文件中引入

```
import V587Theme from '@/uni_modules/v587-theme/plugin.js'
// 传入store 实例， 指定默认主题：theme: 'light'
Vue.use(V587Theme, {store, theme: 'light'})
```

+ 步骤二、App.vue 或任意使用的地方引入

```
import themeMixin from '@/uni_modules/v587-theme/mixins/index.js'
export default {
	mixins:[themeMixin]
}
```

## 作品效果
![一键换肤效果图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/69719962-dac3-4b1b-8dac-89163421fc17.gif)

## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)

