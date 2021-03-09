# v587-theme 一键换肤、 I18N国际化

为了更好的用户体验， 更多的情景模式， 更多的产品需求

## 需求
+ 替换颜色（包括主体色调、组件色调）
+ logo、背景等图片
+ 其他
+ I18N国际化（由于原理比较简单，所以和一键换肤放在一起）
+ 小程序适配

## 分析
+ 基本上只有html、css、静态资源层面的东西有改动
+ 后续主体皮肤增加
+ js文件替换不同于静态资源（如何动态管理？require 直接覆盖）
+ I18N国际化：不同语言放置在不通js目录，后面覆盖前面（而不是全部都加载管理）
+ 小程序拥有诸多限制，采用js处理

一套代码基本足以

## 一键换肤开发

### 1. 首先定义一个目录存储主题（固定如此）： `/static/theme/`

	/static/theme/目录结构
	│  theme_dark.css
	│  theme_light.css
	│  theme_dark.js  // 小程序使用
	│  theme_light.js // 小程序使用
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

theme_dark.js，theme_light.js	分别对应预设的两个主题包， 对应dark、light资源目录

```
export default {
	_primaryColor: '#616161',
	_sidebarBg: 'url(/static/theme/dark/bg_sidebar.jpg)',
	'color': 'red'
}
```

其中以‘_’开头表示需要转义 ‘--’开头变量,  反之。


+ 颜色处理：
  css中使用 `primaryColor: #616161;`

+ 图片处理(背景、img)：

  css中使用 `background: var(--sidebarBg) no-repeat 0 0;` 
  
  html中使用 ```<image :src="`../../static/theme/${theme}/bg_sidebar.jpg`" ></image>```
	
  【注意】 小程序背景图： 网络加载 或 base64
	
### 2. 再定义一个变量存储当前主题, 此处使用vuex管理这个状态
```
export default {
	state: {
		// 当前主题
		theme: uni.getStorageSync(KEY_THEME),
		// 支持主题列表， 读取/static/theme/theme_*.css 或 /static/theme/theme_*.js
		themeList: [], // 方便管理， 动态读取主题目录的下的主题文件， 方便后续扩展
		// 主题字典
		themeMap: {},
	}
}
```

### 3. 监听主题变化，加载对应主题

```
// #ifdef MP
onThemeChange(newVal, oldVal) {
	if (this.themeList.includes(newVal)) {
		this.$store.commit('theme/SET_THEME_MAP', require(`@/static/theme/theme_${newVal}.js`).default)
	}
},
// #endif

// #ifndef MP
onThemeChange(newVal, oldVal) {
	if (this.themeList.includes(oldVal)) {
		removeCss(`/static/theme/theme_${oldVal}.css`)
	}
	if (this.themeList.includes(newVal)) {
		loadCss(`/static/theme/theme_${newVal}.css`)
	}
},
// #endif
		
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

+ 步骤三（小程序）引入样式

```
computed: {
	...mapGetters('theme',['themeMap']),
	}
	
// 使用的地方root 节点添加style
<view class="container" :style="themeMap"></view>
```

## I18N国际化开发

### 1. 首先定义一个目录存储语言资源（固定如此）： `/static/i18n/`

	│
	├─i18n
	│      en_US.js
	│      ja.js
	│      zh_CN.js
	
**【注意】** 语言文件命名需要符合js命名规则，代码中会当做变量名使用

文件格式如下：

```
export default {
	hi : '你好 V587 phenix',
	settings: '设置',
	theme: '换肤',
	language: '语言',
	home_desc: `内容主体，可自定义内容及样式<text style="color: #666; font-size: 15px;">（ uniCloud admin 当前版本号 {{adminVersion}},
				运行到浏览器可在控制台打印信息中查看当前的版本，也可在代码 package.json 中查看）</text>`,
	search: '搜索',
	fullscreen: '全屏',
	change_password: '修改密码',
	logout: '退出'
}

```

### 2. 再定义一个变量存储当前主题, 此处使用vuex管理这个状态
```
export default {
	state: {
		// 当前语音
		locale: uni.getStorageSync(KEY_LOCALE),
		// 支持语言列表， 读取/static/i18n/*.js 
		localeList: [],
		// 语言字典
		localesMap: {}
	}
}
```

### 3. 监听主题变化，加载对应主题

```
onLocaleChange(newVal) {
		if (this.localeList.includes(newVal)) {
			this.$store.commit('theme/SET_LOCALES_MAP', require(`@/static/i18n/${newVal}.js`).default)
		}
	}
```


### 4.使用

+ 步骤一、main.js 文件中引入

```
import V587Theme from '@/uni_modules/v587-theme/plugin.js'
// 传入store 实例， 指定默认主题：theme: 'light'
Vue.use(V587Theme, {store, theme: 'light', locale: 'zh_CN'})
```

+ 步骤二、App.vue 或任意使用的地方引入

```
import themeMixin from '@/uni_modules/v587-theme/mixins/index.js'
export default {
	mixins:[themeMixin]
}

// 使用
<view>sayHi: {{$t('hi')}}</view>

```

对于需要格式化文本， 如

```
home_desc: `内容主体，可自定义内容及样式<text style="color: #666; font-size: 15px;">（ uniCloud admin 当前版本号 {adminVersion},
				运行到浏览器可在控制台打印信息中查看当前的版本，也可在代码 package.json 中查看）</text>`
				
<view v-html="$t('home_desc', {adminVersion})"></view>
```


## 作品展示

![一键换肤效果图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/69719962-dac3-4b1b-8dac-89163421fc17.gif)

![i18n国际化效果图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/bae3ac06-9cd9-488f-9359-ef58a4bf3f58.gif)

## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)


## 附录
| **语言代码** | **语言名称**                               |
| ------------ | :----------------------------------------- |
| af           | 南非语                                     |
| af-ZA        | 南非语                                     |
| ar           | 阿拉伯语                                   |
| ar-AE        | 阿拉伯语(阿联酋)                           |
| ar-BH        | 阿拉伯语(巴林)                             |
| ar-DZ        | 阿拉伯语(阿尔及利亚)                       |
| ar-EG        | 阿拉伯语(埃及)                             |
| ar-IQ        | 阿拉伯语(伊拉克)                           |
| ar-JO        | 阿拉伯语(约旦)                             |
| ar-KW        | 阿拉伯语(科威特)                           |
| ar-LB        | 阿拉伯语(黎巴嫩)                           |
| ar-LY        | 阿拉伯语(利比亚)                           |
| ar-MA        | 阿拉伯语(摩洛哥)                           |
| ar-OM        | 阿拉伯语(阿曼)                             |
| ar-QA        | 阿拉伯语(卡塔尔)                           |
| ar-SA        | 阿拉伯语(沙特阿拉伯)                       |
| ar-SY        | 阿拉伯语(叙利亚)                           |
| ar-TN        | 阿拉伯语(突尼斯)                           |
| ar-YE        | 阿拉伯语(也门)                             |
| az           | 阿塞拜疆语                                 |
| az-AZ        | 阿塞拜疆语(拉丁文)                         |
| az-AZ        | 阿塞拜疆语(西里尔文)                       |
| be           | 比利时语                                   |
| be-BY        | 比利时语                                   |
| bg           | 保加利亚语                                 |
| bg-BG        | 保加利亚语                                 |
| bs-BA        | 波斯尼亚语(拉丁文，波斯尼亚和黑塞哥维那)   |
| ca           | 加泰隆语                                   |
| ca-ES        | 加泰隆语                                   |
| cs           | 捷克语                                     |
| cs-CZ        | 捷克语                                     |
| cy           | 威尔士语                                   |
| cy-GB        | 威尔士语                                   |
| da           | 丹麦语                                     |
| da-DK        | 丹麦语                                     |
| de           | 德语                                       |
| de-AT        | 德语(奥地利)                               |
| de-CH        | 德语(瑞士)                                 |
| de-DE        | 德语(德国)                                 |
| de-LI        | 德语(列支敦士登)                           |
| de-LU        | 德语(卢森堡)                               |
| dv           | 第维埃语                                   |
| dv-MV        | 第维埃语                                   |
| el           | 希腊语                                     |
| el-GR        | 希腊语                                     |
| en           | 英语                                       |
| en-AU        | 英语(澳大利亚)                             |
| en-BZ        | 英语(伯利兹)                               |
| en-CA        | 英语(加拿大)                               |
| en-CB        | 英语(加勒比海)                             |
| en-GB        | 英语(英国)                                 |
| en-IE        | 英语(爱尔兰)                               |
| en-JM        | 英语(牙买加)                               |
| en-NZ        | 英语(新西兰)                               |
| en-PH        | 英语(菲律宾)                               |
| en-TT        | 英语(特立尼达)                             |
| en-US        | 英语(美国)                                 |
| en-ZA        | 英语(南非)                                 |
| en-ZW        | 英语(津巴布韦)                             |
| eo           | 世界语                                     |
| es           | 西班牙语                                   |
| es-AR        | 西班牙语(阿根廷)                           |
| es-BO        | 西班牙语(玻利维亚)                         |
| es-CL        | 西班牙语(智利)                             |
| es-CO        | 西班牙语(哥伦比亚)                         |
| es-CR        | 西班牙语(哥斯达黎加)                       |
| es-DO        | 西班牙语(多米尼加共和国)                   |
| es-EC        | 西班牙语(厄瓜多尔)                         |
| es-ES        | 西班牙语(传统)                             |
| es-ES        | 西班牙语(国际)                             |
| es-GT        | 西班牙语(危地马拉)                         |
| es-HN        | 西班牙语(洪都拉斯)                         |
| es-MX        | 西班牙语(墨西哥)                           |
| es-NI        | 西班牙语(尼加拉瓜)                         |
| es-PA        | 西班牙语(巴拿马)                           |
| es-PE        | 西班牙语(秘鲁)                             |
| es-PR        | 西班牙语(波多黎各(美))                     |
| es-PY        | 西班牙语(巴拉圭)                           |
| es-SV        | 西班牙语(萨尔瓦多)                         |
| es-UY        | 西班牙语(乌拉圭)                           |
| es-VE        | 西班牙语(委内瑞拉)                         |
| et           | 爱沙尼亚语                                 |
| et-EE        | 爱沙尼亚语                                 |
| eu           | 巴士克语                                   |
| eu-ES        | 巴士克语                                   |
| fa           | 法斯语                                     |
| fa-IR        | 法斯语                                     |
| fi           | 芬兰语                                     |
| fi-FI        | 芬兰语                                     |
| fo           | 法罗语                                     |
| fo-FO        | 法罗语                                     |
| fr           | 法语                                       |
| fr-BE        | 法语(比利时)                               |
| fr-CA        | 法语(加拿大)                               |
| fr-CH        | 法语(瑞士)                                 |
| fr-FR        | 法语(法国)                                 |
| fr-LU        | 法语(卢森堡)                               |
| fr-MC        | 法语(摩纳哥)                               |
| gl           | 加里西亚语                                 |
| gl-ES        | 加里西亚语                                 |
| gu           | 古吉拉特语                                 |
| gu-IN        | 古吉拉特语                                 |
| he           | 希伯来语                                   |
| he-IL        | 希伯来语                                   |
| hi           | 印地语                                     |
| hi-IN        | 印地语                                     |
| hr           | 克罗地亚语                                 |
| hr-BA        | 克罗地亚语(波斯尼亚和黑塞哥维那)           |
| hr-HR        | 克罗地亚语                                 |
| hu           | 匈牙利语                                   |
| hu-HU        | 匈牙利语                                   |
| hy           | 亚美尼亚语                                 |
| hy-AM        | 亚美尼亚语                                 |
| id           | 印度尼西亚语                               |
| id-ID        | 印度尼西亚语                               |
| is           | 冰岛语                                     |
| is-IS        | 冰岛语                                     |
| it           | 意大利语                                   |
| it-CH        | 意大利语(瑞士)                             |
| it-IT        | 意大利语(意大利)                           |
| ja           | 日语                                       |
| ja-JP        | 日语                                       |
| ka           | 格鲁吉亚语                                 |
| ka-GE        | 格鲁吉亚语                                 |
| kk           | 哈萨克语                                   |
| kk-KZ        | 哈萨克语                                   |
| kn           | 卡纳拉语                                   |
| kn-IN        | 卡纳拉语                                   |
| ko           | 朝鲜语                                     |
| ko-KR        | 朝鲜语                                     |
| kok          | 孔卡尼语                                   |
| kok-IN       | 孔卡尼语                                   |
| ky           | 吉尔吉斯语                                 |
| ky-KG        | 吉尔吉斯语(西里尔文)                       |
| lt           | 立陶宛语                                   |
| lt-LT        | 立陶宛语                                   |
| lv           | 拉脱维亚语                                 |
| lv-LV        | 拉脱维亚语                                 |
| mi           | 毛利语                                     |
| mi-NZ        | 毛利语                                     |
| mk           | 马其顿语                                   |
| mk-MK        | 马其顿语(FYROM)                            |
| mn           | 蒙古语                                     |
| mn-MN        | 蒙古语(西里尔文)                           |
| mr           | 马拉地语                                   |
| mr-IN        | 马拉地语                                   |
| ms           | 马来语                                     |
| ms-BN        | 马来语(文莱达鲁萨兰)                       |
| ms-MY        | 马来语(马来西亚)                           |
| mt           | 马耳他语                                   |
| mt-MT        | 马耳他语                                   |
| nb           | 挪威语(伯克梅尔)                           |
| nb-NO        | 挪威语(伯克梅尔)(挪威)                     |
| nl           | 荷兰语                                     |
| nl-BE        | 荷兰语(比利时)                             |
| nl-NL        | 荷兰语(荷兰)                               |
| nn-NO        | 挪威语(尼诺斯克)(挪威)                     |
| ns           | 北梭托语                                   |
| ns-ZA        | 北梭托语                                   |
| pa           | 旁遮普语                                   |
| pa-IN        | 旁遮普语                                   |
| pl           | 波兰语                                     |
| pl-PL        | 波兰语                                     |
| pt           | 葡萄牙语                                   |
| pt-BR        | 葡萄牙语(巴西)                             |
| pt-PT        | 葡萄牙语(葡萄牙)                           |
| qu           | 克丘亚语                                   |
| qu-BO        | 克丘亚语(玻利维亚)                         |
| qu-EC        | 克丘亚语(厄瓜多尔)                         |
| qu-PE        | 克丘亚语(秘鲁)                             |
| ro           | 罗马尼亚语                                 |
| ro-RO        | 罗马尼亚语                                 |
| ru           | 俄语                                       |
| ru-RU        | 俄语                                       |
| sa           | 梵文                                       |
| sa-IN        | 梵文                                       |
| se           | 北萨摩斯语                                 |
| se-FI        | 北萨摩斯语(芬兰)                           |
| se-FI        | 斯科特萨摩斯语(芬兰)                       |
| se-FI        | 伊那里萨摩斯语(芬兰)                       |
| se-NO        | 北萨摩斯语(挪威)                           |
| se-NO        | 律勒欧萨摩斯语(挪威)                       |
| se-NO        | 南萨摩斯语(挪威)                           |
| se-SE        | 北萨摩斯语(瑞典)                           |
| se-SE        | 律勒欧萨摩斯语(瑞典)                       |
| se-SE        | 南萨摩斯语(瑞典)                           |
| sk           | 斯洛伐克语                                 |
| sk-SK        | 斯洛伐克语                                 |
| sl           | 斯洛文尼亚语                               |
| sl-SI        | 斯洛文尼亚语                               |
| sq           | 阿尔巴尼亚语                               |
| sq-AL        | 阿尔巴尼亚语                               |
| sr-BA        | 塞尔维亚语(拉丁文，波斯尼亚和黑塞哥维那)   |
| sr-BA        | 塞尔维亚语(西里尔文，波斯尼亚和黑塞哥维那) |
| sr-SP        | 塞尔维亚(拉丁)                             |
| sr-SP        | 塞尔维亚(西里尔文)                         |
| sv           | 瑞典语                                     |
| sv-FI        | 瑞典语(芬兰)                               |
| sv-SE        | 瑞典语                                     |
| sw           | 斯瓦希里语                                 |
| sw-KE        | 斯瓦希里语                                 |
| syr          | 叙利亚语                                   |
| syr-SY       | 叙利亚语                                   |
| ta           | 泰米尔语                                   |
| ta-IN        | 泰米尔语                                   |
| te           | 泰卢固语                                   |
| te-IN        | 泰卢固语                                   |
| th           | 泰语                                       |
| th-TH        | 泰语                                       |
| tl           | 塔加路语                                   |
| tl-PH        | 塔加路语(菲律宾)                           |
| tn           | 茨瓦纳语                                   |
| tn-ZA        | 茨瓦纳语                                   |
| tr           | 土耳其语                                   |
| tr-TR        | 土耳其语                                   |
| ts           | 宗加语                                     |
| tt           | 鞑靼语                                     |
| tt-RU        | 鞑靼语                                     |
| uk           | 乌克兰语                                   |
| uk-UA        | 乌克兰语                                   |
| ur           | 乌都语                                     |
| ur-PK        | 乌都语                                     |
| uz           | 乌兹别克语                                 |
| uz-UZ        | 乌兹别克语(拉丁文)                         |
| uz-UZ        | 乌兹别克语(西里尔文)                       |
| vi           | 越南语                                     |
| vi-VN        | 越南语                                     |
| xh           | 班图语                                     |
| xh-ZA        | 班图语                                     |
| zh           | 中文                                       |
| zh-CN        | 中文(简体)                                 |
| zh-HK        | 中文(香港)                                 |
| zh-MO        | 中文(澳门)                                 |
| zh-SG        | 中文(新加坡)                               |
| zh-TW        | 中文(繁体)                                 |
| zu           | 祖鲁语                                     |
| zu-ZA        | 祖鲁语                                     |