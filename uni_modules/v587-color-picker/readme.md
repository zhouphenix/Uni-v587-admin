## v587-color-picker 颜色选择器组件

### 声明

组件基于[Color Picker](https://ext.dcloud.net.cn/plugin?id=2268)  基础上修改而来

### 介绍

+ 组件仅实现view渲染
+ 支持初始化颜色、自适应容器大小方便自定义开发、返回hex、rgba/rgb两种颜色格式。 
+ 推荐色（colorUI）
+ 做了PC端、移动端适配

#### 属性/事件列表:

|   属性/事件    | 必填 |  默认   |                             功能                             |
| :------------: | :--: | :-----: | :----------------------------------------------------------: |
|     color      |  是  | #ffffff |                      初始化picker的颜色                      |
|  @onPickColor  |  否  |    -    | 拖动颜色区域控制器选取颜色时触发，颜色变化时触发（任何方式改变），返回两种颜色格式：`{hex: '#ff0000', rgb: 'rgb(255, 0, 0)'}` |
| @onColorChange |  否  |    -    | 颜色变化时触发（任何方式改变），只返回hex色值：`'#ff0000'`， 对应color |

### 使用

直接引用

```vue
<v587-color-picker v-if="show" v-model="color" />
```

需要自行实现

+ 显示/隐藏 
+ 点击外部隐藏 
+ 显示位置

### 展示

![color-picker颜色选择器](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78a67da8-ae76-4f35-8fee-dac7cb24bcd4/9d0afdae-4515-4814-a2a3-a6d6395ccd7d.gif)

### 适配问题

#### 一、topWindow存在与否导致pageY不一致

##### 当存在topWindow 时, 假设topWindow的高度为topHeight
 + pageY 在pc下：
	1. 如mouseDown位置（300, 300）,获取到(pageX, pageY) = (300, 300-topHeight)
	2. mouseMove位置（300, 300）,获取到(pageX, pageY) = (300, 300)
	也就是说, topWindow存在时， mouseMove获取到真实值， mouseDown获取到减去topWindow高度之后的值

 + pageY 在mobile下：
	1. 如touchStart位置（300, 300）,获取到(pageX, pageY) = (300, 300-topHeight)
	2. mouseMove位置（300, 300）,获取到(pageX, pageY) = (300, 300-topHeight)
	也就是说, topWindow存在时，touchstart、mousedown事件获取到都是减去topWindow高度之后的值。
	此外, touchStart时, 会同时触发touchstart、mousedown事件。

#### 二、 uniapp在android、ios上适配（关于宏定义描述）
>注意
>
>  Android 和 iOS 平台不支持通过条件编译来区分，如果需要区分 Android、iOS 平台，请通过调用 uni.getSystemInfo 来获取平台信息。支持ifios、ifAndroid代码块，可方便编写判断。
>  
>  有些跨端工具可以提供js的条件编译或多态，但这对于实际开发远远不够。uni-app不止是处理js，任何代码都可以多端条件编译，才能真正解决实际项目的跨端问题。另外所谓多态在实际开发中会造成大量冗余代码，很不利于复用和维护。举例，微信小程序主题色是绿色，而百度支付宝小程序是蓝色，你的应用想分平台适配颜色，只有条件编译是代码量最低、最容易维护的。
>
>  有些公司的产品运营总是给不同平台提不同需求，但这不是拒绝uni-app的理由。关键在于项目里，复用的代码多还是个性的代码多，正常都是复用的代码多，所以仍然应该多端。而个性的代码放到不同平台的目录下，差异化维护。

#### 三、 在小程序上适配问题

+ css 不支持部分
> Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors

+ [关于小程序中获取组件boundingClientRect 信息](https://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery)

```
const query = uni.createSelectorQuery().in(this);
query.select('#id').boundingClientRect(data => {
  console.log("得到布局位置信息" + JSON.stringify(data));
  console.log("节点离页面顶部的距离为" + data.top);
}).exec();
```

> **注意** 支付宝小程序不支持in(component)，使用无效果

+ 阻止事件冒泡:  顶层容器使用  `@touchmove.stop.prevent` 修饰

+ 使用方式区别
```
<!-- #ifdef MP && !MP-ALIPAY -->
<v587-color-picker :color="color" @onColorChange="val => color = val"/>
<!-- #endif -->
<!-- #ifdef !(MP && !MP-ALIPAY) -->
<v587-color-picker v-model="color" />
<!-- #endif -->
```

## 关注订阅号

关注订阅号，回复“v587体验账号” 获取体验账号

![关注订阅号](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aeeaeb50-6081-4de4-b6ab-d4b54fca38bf/00aa4a73-04b4-4b1a-b6d1-161a2781ec88.jpg)
