# CSS

:::note Ref

- [HOW TO ORGANIZE CSS @ 9ELEMENTS](https://9elements.com/css-rule-order/)

:::

## CSS 盒模型

- css 盒模型本质是一个盒子，它包括`margin、border、padding、content`
- 盒模型 `box-sizing`
  - 标准盒子模型 `box-sizing:content-box`
    - `content`不包括其他部分
  - `ie` 盒子模型 `box-sizing:border-box`
    - `content`部分包括`padding border`

#### 盒模型宽度计算

- `offsetWidth` => `content + padding + border` 无外边距

#### margin 纵向重叠的问题

- 相邻元素的`margin-top`和 `margin-bottom `会发生重叠

- 空白内容的`<p></p>`也会重叠

#### margin 负值的问题

- `margin-top` 和 `margin-left` 负值，元素向上、向左移动
- `margin-right`负值，右侧元素左移，自身不受影响
- `margin-bottom`负值，下方元素上移，自身不受影响

## 清除浮动

问题：清除浮动 高度撑开

在非 IE 浏览器下，当容器的高度为`auto`，且容器的内容中有浮动元素。导致容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响布局的现象。

##### `clear:both`

- `clear:left / clear:right` 左边或右边不允许存在浮动元素

- 父元素结束标签之前插入空白块级元素 `clear:both`

##### 伪元素 `clearfix`

- 父元素 上添加 `clearfix`类 (相当于添加了一个不可见的块级元素)

```css
.clearfix:after {
  content: ' ';
  display: table; /* display: block*/
  clear: both;
}
.clearfix {
  *zoom: 1; /*兼容 IE 低版本*/
}
```

##### `overflow` 清除浮动

- `overflow` 会使父元素的高度被撑开，将浮动元素包裹在内

##### 原理 `BFC`

- `Block format context` 块级格式化上下文
- 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素

- 同一个 BFC 下 `margin` 会重叠 不同不会
- `BFC` 在计算高度时会算上浮动元素
- `BFC` 内部元素是垂直排列的
- `BFC`区域不会与`float`元素重叠

##### 形成 BFC 的常见条件

- `float` 不是 `none`
- `overflow` 不是 `visible`
- `position` 是 `absolute` 或 `fixed`
- `display` 是 `flex inline-block table-cell` 等
  - `inline-block`元素与其兄弟元素、子元素和父元素的外边距都不会折叠

##### BFC 作用

- 清除浮动
- 阻止 `margin` 发生重叠
- 阻止元素被浮动的元素覆盖

:::note Ref

- [清除浮动的四种方式及其原理理解](https://blog.csdn.net/u012207345/article/details/78279961)
- [什么是 BFC？看这一篇就够了](https://blog.csdn.net/sinat_36422236/article/details/88763187)
- [史上最全面、最透彻的 BFC 原理剖析](https://juejin.cn/post/6844903496970420237)

:::

## 元素隐藏方法 区别

- `display: none`
  - 不会占据额外的空间 但会引起回流和重绘
- `visibility: hidden`
  - 元素虽然隐藏了，但仍然保持原来的位置和大小 只会引起页面重绘
- `opacity: 0` 设置元素为透明
-
- `overflow:hidden` 将要隐藏的元素移除父元素的范围
- 将元素的 `font-size line-height width height`设置为 0
- 设置元素的 `transform` 的 `translateX(Y)`的值为 `-100%`
- 设定它的位置，让其消失不见：`position:absolute / fixed`，用`z-index`遮盖` -9999px`

## CSS 布局

#### 左图右文

```css
左图 position: absolute
右文 设置margin-left 大于图片大小保留空间即可

左图 float: left
右文
```

#### 两栏布局

- 左边固定 右边自适应

- 左 浮动 右 通过 `margin-left` 实现
- 左 父相子绝 右 通过 `margin-left`实现
- 父 `display: table` 左右 `display：table-cell`

`flex`

```css
.wrap {
  display: flex;
}
.left {
  height: 200px;
  background: purple;
  flex: 0 0 200px;
}
.right {
  background: skyblue;
  height: 200px;
  flex: 1;
}
```

`ref`:

- [实现两栏布局的几种方式](https://www.jianshu.com/p/267239f8e4b2)

#### 九宫格布局

`Ref`:

- [css 布局 - 九宫格布局的方法汇总（更新中...）](https://www.cnblogs.com/padding1015/p/9566443.html)

#### 圣杯布局

```html
<div class="parent">
  <div class="middle">Middle</div>
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
```

-

```css
.parent {
  overflow: hidden;
  padding: 0 100px;
}

.middle {
  float: left;
  height: 100px;
  width: 100%;
  background-color: green;
}
.left {
  /* 以便申明 left 属性 */
  position: relative;
  /* 移出当前界面，注意和 parent 中的 padding-left 配合正好 */
  left: -100px;
  float: left;
  height: 100px;
  width: 100px;
  background-color: red;
  /* 上移一行 */
  margin-left: -100%;
}
.right {
  position: relative;
  right: -100px;
  float: left;
  height: 100px;
  width: 100px;
  background-color: blue;
  /* 上移到上一行末尾 */
  margin-left: -100px;
}
```

#### 双飞翼布局

```html
<style>
  body {
    min-width: 550px;
  }
  .fl {
    float: left;
  }
  #main {
    width: 100%;
    height: 200px;
    background-color: #ccc;
  }
  #left {
    width: 190px;
    height: 200px;
    background-color: #abc;
    margin-left: -100%; /* key */
  }
  #right {
    width: 190px;
    height: 200px;
    background-color: #cba;
    margin-left: -190px; /* key */
  }
  #main_wrap {
    margin: 0 190px 0 190px;
  }
</style>

<body>
  <div id="main" class="fl">
    <div id="main_wrap">Main</div>
  </div>
  <div id="left" class="fl">Left</div>
  <div id="right" class="fl">Right</div>
</body>
```

##### 圣杯布局和双飞翼布局的目的

- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

##### 圣杯布局和双飞翼布局的技术总结

- 使用 `float` 布局

- 两侧使用 `margin` 负值，以便和中间内容横向重叠

- 防止中间内容被两侧覆盖

  - 圣杯布局 通过 `padding` 左右留白 双飞翼通过`margin`

## 三角形

```css
div {
  width: 0px;
  height: 0px;
  border: 100px solid transparent;
  /* border-top-color: pink;
  border-right-color: red;
  border-bottom-color: blue; */
  border-left-color: green;
}
```

## FLEX 布局

#### flex 布局的问题（画骰子）

https://mastery.games/flexboxzombies/chapter/1/level/1

min|max-width > flex-basis > width > auto

- `Flex` [link](https://www.runoob.com/w3cnote/flex-grammar.html)

```css
display:flex;

flex-direction: row/column/row-reverse/column-reverse;/*横竖排列*/

flex-wrap: nowrap/wrap/wrap-reverse;/*换行*/

flex-flow: flex-direction flex-wrap；/*上述两个的汇总*/


justify-content: center/flex-start/flex-end/space-between/space-around;/*水平对齐*/

align-items: center/flex-start/flex-end/stretch/baseline;/*垂直对齐*/

/*以下作用于子元素*/
flex-shrink: number;/*使得项目被压缩的倍数*/

flex-grow: number;/*与shrink相对*/

flex-basis: ;/*设置盒子的初始值*/

flex:0 1 auto;/*对上述三种的汇总grow-shrink-basis*/

order: number; /*使用number  数字大的排在后面*/

align-self: ; /*参数和align-items一样 并且可以覆盖*/
```

- `Grid`

```css
父 container 容器
子 items 项

display:grid;

grid-template-columns: 50px 50px;/*在网格容器中添加两列，宽度均为 50px。*/
grid-template-rows: 50px 50px;/*添加两行*/
grid-template-rows: repeat(100,50px);/*添加100个 行高为50px*/
grid-template-rows: repeat(2,1fr 50px) 20px;/*5个*/

grid-template-columns: auto 50px 10% 2fr 1fr;
/*
 * 第一列的宽与它的内容宽度相等；第二列宽 50px；
 * 第三列宽是它容器的 10%；最后两列，将剩余的宽度平均分成三份，第四列占两份，第五列占一份。
 * fr浮动宽度 grid布局专用单位 代表剩余空间
 */

column-gap:20px;/* 在创建的列之间添加20px宽度的空白间隙*/
row-gap:20px;

gap: row column;/*行高与列宽*/

grid-column: 1/3;/*定义网格开始和结束位置  网格项从左侧第一条线开始到第三条线结束，占用两列*/
grid-row: 1/3;/*占用两行*/

justify-self: stretch/start/center/end;/*水平对齐项目 默认是拉伸*/
align-self: stretch/start/center/end;/*垂直对齐*/

justify-items: ;/*水平对齐所有项目*/
align-items: ;/*垂直对齐所有项目*/

/* 轨道小于容器*/
justify-content: ; /*水平对齐 轨道*/
align-content: ; /*垂直对齐 轨道*/

grid-template-areas:
  "header header header"
  "advert . content"
  "footer footer footer";
/*代码将顶部三个单元格合并成一个名为header的区域，
 *将底部三个单元格合并为一个名为footer的区域，
 *并在中间行生成三个区域————advert和空单元格和content。
 */

grid-area: footer;/*占底部所有空间*/
grid-area: 起始水平线 / 起始垂直线 / 末尾水平线 / 终止垂直线 ;

repeat()
minmax()

repeat(auto-fill, minmax(60px, 1fr));/*使用 auto-fill 创建弹性布局*/
repeat(auto-fit, minmax(60px, 1fr));/*在auto-fill的基础上 拉伸沾满整行*/
```

##### flex 实现一个三点的色子

```html
<style>
  .box {
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 200px;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 10px;
  }
  .item {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #111;
  }
  .item:nth-child(2) {
    align-self: center;
  }
  .item:nth-child(3) {
    align-self: flex-end;
  }
</style>

<body>
  <div class="box">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
</body>
```

## CSS 定位

#### absolute 和 relative 分别依据什么定位？

```css
relative依据自身定位

absolute依据最近一层的定位元素定位

定位元素
absolute relative fixed
body
```

`margin: 0 auto`

- 0
- 父元素剩余空间的宽度

#### 实现居中对齐

##### 水平居中

- 行内元素 `inline => text-align: center`
- 块级元素
  - 宽度固定 `margin: auto`
  - 不定宽度
    - `display: table; margin: auto;`
    - `子：display: inline-block; 父：text-align: center`
    - `父：display: flex; justify-content: center`
- 绝对定位 `absolute => left:50% + margin-left负值`

##### 水平垂直居中

- 单行文本 `inline => text-align: center; line-height = height`
- 绝对定位

  - `top: 50% + margin-top负值 left:50% + margin-left负值`
  - `top: 50% left: 50% + transform: translate(-50%, -50%);`
  - `top、left、bottom、right = 0 + margin: auto`

- `flex`
  - `父：display: flex; justify-content: center; align-items: center;`
- `table`

  - `父：display: table`
  - `子：display: table-cell; text-align: center; vertical-align: middle;`
  - `父：display: table-cell; text-align: center; vertical-align: middle;`
  - `子：display: inline-block; `

- 流体特征：当一个绝对定位元素，其对立定位方向属性同时有具体定位数值的时候，流体特性就发生了。
  - 使得元素可自动填充父级元素的可用尺寸

## CSS 图文样式

#### line-height 如何继承

```css
写具体数值，如 30px，则继承该值（比较好理解）

写比例，如2/1.5，则继承该比例（比较好理解）

写百分比，如200%，则继承计算出来的值（考点
```

## 响应式布局

#### 概念介绍

##### `viewport`

> 布局视口 `layout viewport`

- `<meta name="viewport" content="width=device-width">`
- 页面实际布局所占用的区域

```css
document.body.clientHeight	body高度
document.documentElement.clientHeight	获取布局视口的高度
```

> 视觉视口 `visual viewport`

- 网页视口尺寸 可视页面宽高

```css
window.innerHeight	网页视口高度
window.innerWidth 	网页视口宽度
```

> 理想视口 `ideal viewport`

```css
window.screen.height	屏幕高度
```

##### `rem em`

- `rem` 指相对于 HTML 根元素的字体大小`font-size`来计算长度单位

```css
html{ font-size: 100px }

1rem = 100px
```

- `em` 相对长度单位，~~相对于父元素~~
  - 不完全算是相对父元素。如果子元素没有才会继承父元素`font-size`的结果

```css
div {
  font-size: 20px;
  width: 10rem; /* width:200px; */
}
```

#### 布局方案

##### `rem`

- 通过动态改变根元素 `font-size`

```js
function refreshRem() {
  // 获取文档对象(根元素)
  const docEl = doc.documentElement;
  // 获取视图容器宽度
  const docWidth = docEl.getBoundingClientRect().width;
  // rem 取值为视图容器宽度的十分之一大小
  const rem = width / 10;
  // 设置 rem 大小
  docEl.style.fontSize = rem + 'px';
}
// 监听浏览器窗口大小的变化
window.addEventListener('resize', refreshRem);
```

##### `vh vw`

- 视窗单位

```css
vw: 如 10vw的意思是视窗宽度的 10%
vh: 如 3vh的意思是视窗高度的 3%
vmin: 如 70vmin的意思是视窗中较小尺寸的 70% (高度 VS 宽度)
vmax: 如 100vmax的意思是视窗中较大尺寸的 100% (高度 VS 宽度)

window.innerHeight === 100vh
window.innerWidth === 100vw
```

##### 媒体查询

- `media-query` 根据不同的屏幕宽度设置根元素 `font-size`

```css
/*下面是一个媒体查询的例子，当设备宽度小于或等于 100px 时返回内容：*/

@media (max-width: 100px) {
  /* CSS Rules */
}

/*以下定义的媒体查询，是当设备高度大于或等于 350px 时返回内容：*/

@media (min-height: 350px) {
  /* CSS Rules */
}
```

>

```css
@media only screen and (max-width: 374px) {
  /*  iphone5 或者更小的尺寸，以 iphone5 的宽度 (320px) 比列设置 font-size */
  html {
    font-size: 86px;
  }
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
  /* iphone6/7/8/x */
  html {
    font-size: 100px;
  }
}
@media only screen and (min-width: 414px) {
  /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度 (414px) 比列设置 font-size */
  html {
    font-size: 110px;
  }
}
```

- 使图片根据设备尺寸自如响应

```css
img {
  max-width: 100%;
  display: block;
  height: auto;
}
```

## 移动端

#### `1px` 问题

- 在一些 `Retina`屏幕的机型上，移动端页面的 `1px` 会变得很粗，呈现出不止 `1px `的效果
- 设备像素比：`window.devicePixelRatio = 设备的物理像素 / css像素 = 3 ?`

##### `1/devicePixelRatio px`

```jsx
<div id="container" data-device={{window.devicePixelRatio}}></div>

#container[data-device="2"] {
	border:0.5px solid #333
}
```

- 兼容性不好

##### 伪元素先放大后缩小

- 给需要加边框的元素插入一个伪类，伪类采用绝对定位，然后对伪类添加 `1px`边框，最后进行`0.5`倍缩放。

- `transform: scale(0.5)`

```css
#container[data-device='2'] {
  position: relative;
}
#container[data-device='2']::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  content: '';
  transform: scale(0.5);
  transform-origin: left top;
  box-sizing: border-box;
  border: 1px solid #333;
}
```

##### `box-shadow`

```css
// 下边框
box-shadow: 0 1px #e9e9e9;

// 全边框
box-shadow: 0 -1px #d9d9d9, 1px 0 #d9d9d9, 0 1px #d9d9d9, -1px 0 #d9d9d9;

// 其他的可以看看API更深入了解这个API
```

##### `viewport` 缩放来解决

```js
<meta name="viewport" content="initial-s	cale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">


const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom
metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
```

- 导致页面不需要缩放的元素也被缩放了

`Ref`

- [H5 常遇见的问题———移动端 1px 解决（完整版）](https://segmentfault.com/a/1190000037790305)
- [总结一下各种 0.5px 的线](https://segmentfault.com/a/1190000015385024)

## 补充

#### 纯 CSS 实现正方形、自适应正方形方法

##### `css vw`

- `width: 50%;height: 50vw;`

##### 设置垂直方向的 padding 撑开容器

```css
#container {
  width: 50%;
  height: 0; /* 防止内容益处 */
  padding-bottom: 50%;
  background-color: pink;
}
```

##### 利用伪元素的 `margin(padding)-top` 撑开容器

```css
#square {
  width: 30%;
  background: orange;
  /* overflow: hidden; */
  max-width: 200px;
}
#square:after {
  content: '';
  display: block;
  /* margin-top: 100%; */
  padding-top: 100%;
}
```

#### `offsetTop`

```css
clientHeight: content + padding
offsetHeight: content + padding + border + 滚动条
offsetTop: 当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系。
```

##### MouseEvent

```css
MouseEvent.clientX
它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)。
```

#### 使 p 标签有输入功能

##### JS 的 onchage 事件

```js
<div id="div1">
  <!--非vue-->
  JS的onchage事件：
<input type="text" id="t1" onchange="fn1()" />
  <p id="val1">原始值</p>
</div>
<script>
    function fn1() {
    var val1 = document.getElementById('val1')
    var txt_t1 = document.getElementById('t1').value
    val1.innerHTML = txt_t1
  }
</script>
```

##### JS 的 oninput 事件

```js
<div id="div2">
  <!--非vue-一些ie低版本不支持-->
  JS的oninput事件：
<input type="text" id="t2" oninput="fn2()" />
  <p id="val2">原始值</p>
</div>
<script>
    function fn2() {
    var val2 = document.getElementById('val2')
    var txt_t2 = document.getElementById('t2').value
    val2.innerHTML = txt_t2
  }
</script>
```

##### Vue 的 v-model 双向绑定

##### 选择器

- 权重：`!important > id > class = 属性 > 标签 > * `

##### 组合选择符

通配选择符 `*`

- 后代选择器 ` `
- 子元素选择器 `>`
- 相邻兄弟选择器 `+`
- 后续兄弟选择器 `~`

- 嵌入式 => `<style> xxx </style>`
- 内联式 => `<p style= "xxx"></p>`
- 外部式 => `<link href="xxx.css" rel="stylesheet" type="text/css" />`

- 优先级： `内联式 > 嵌入式 > 外部式`，但是 `嵌入式> 外部式` 有一个前提：嵌入式 css 样式的位置一定在外部式的后面。

```js
伪类，更多的定义的是状态。常见的伪类有
表单	:required、:valid 和 :invalid
:hover，:active，:focus，:visited，:link，:not，:first-child，:last-child等等。

伪元素，不存在于DOM树中的虚拟元素，它们可以像正常的html元素一样定义css，但无法使用JavaScript获取。常见伪元素有 ::before，::after，::first-letter，::first-line等等。
```

```js
:nth-of-type(n) 除了关注n之外，还需要关注最前面的类型，也就是标签。
	精准定位到第n个元素
:nth-child(n) 它关注的是：其父元素下的第n个孩子，与类型无关。
	定位到父级下的第n个元素
```

## `position`

- `static` 默认值，即没有定位，遵循正常的文档流对象
- `relative` 相对定位元素的定位是相对其正常位置 相对定位元素经常被用来作为绝对定位元素的容器块
- `absolute` 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于 `<html>` 定位使元素的位置与文档流无关，因此不占据空间。
- `fixed` 元素的位置相对于浏览器窗口是固定位置 即使窗口是滚动的它也不会移动 `Fixed` 定位使元素的位置与文档流无关，因此不占据空间
- `sticky`
  - 基于用户的滚动位置来定位
  - 粘性定位的元素是依赖于用户的滚动，在 `position:relative` 与 `position:fixed` 定位之间切换。正常行为就像 `position:relative`; 而当页面滚动超出目标区域时，它的表现就像 `position:fixed`，它会固定在目标位置。
  - 元素定位表现为在跨越特定阈值`top right bottom left`前为相对定位，之后为固定定位
- `inherit` 继续父元素的 `position` 值

```js
if (
  CSS.supports('position', 'sticky') ||
  CSS.supports('position', '-webkit-sticky')
) {
  // 支持 sticky
}
```

`Ref`

- [杀了个回马枪，还是说说 position:sticky 吧](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)
- [JS 解决 position:sticky 的兼容性问题](https://segmentfault.com/a/1190000011589375)

```css
css
  z-index
  过大
  导致被遮挡元素的点击跳转事件无法生效
  1.
  z-index
  =
  -1
  2.
  外层（被遮挡的层） {
  pointer-events: none; // 元素永远不会成为鼠标事件的target
}

内层（要发生事件的层） {
  pointer-events: auto; // 与pointer-events属性未指定时的表现效果相同（即将元素恢复成为鼠标事件的target）
}
```

vertical-align 文字下移？？

vertical-align:middle,设置为什么无效！

vertical-align 属性只对行内元素有效，对块内元素无效！

display:table-cell???

### 置换元素

置换元素`replaced element`主要是指 `img, input, textarea, select, object` 等这类默认就有 CSS 格式化外表范围的元素。进而可知，非置换元素`non-replaced element`就是除了 `img, input, textarea, select, object` 等置换元素以外的元素

在 CSS 中，可替换元素`replaced element`的展现效果不是由 `CSS` 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。
