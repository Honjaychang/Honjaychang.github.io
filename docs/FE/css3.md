# CSS3

::: tip Link/Todo

- waiting for update!
  :::

## 基础知识



内核

- Google Chrome --> webkit/blink
- Safari --> webkit
- Firefox --> gecko
- IE --> trident
- Opera --> presto（360和昆仑万维）



cascading style sheet层叠样式表



```css
/* 内联样式 */
<div style="height: 100px; width: 100px; background-color: #bbb"></div>


/* 内部样式表 */
<head>
  <style type="text/css">
    div {
      height: 100px;
      width: 100px;
      background-color: #096;
    }
  </style>
</head>

/* 外部样式表 */
<link rel="stylesheet" type="text/css" href="css/index.css" />
div {
  height: 100px;
  width: 100px;
  background-color: pink;
}

/* 优先级 */
/* 内联样式 > 内部样式表 > 外部样式表 */

内部样式表 测试 display: none;
```



选择器

id#

类选择器class.

标签 div

通配符 *



```css
/* 属性选择器[id="box"] [href] */
<input type="text" />
<input type="password" />


[type='text'] {
  width: 200px;
}
[type='password'] {
  width: 300px;
}
```





派生选择器

div a {}



css权重



```css
* 0
标签 伪元素	1
class 属性 伪类	10
id	100
内联样式	1000
!important 正无穷


计算机 正无穷 < 正无穷 + 1
```



并列选择器

分组选择器

```css
input,textarea{
  outline:none;
}
```

从右到左匹配  可以越级 不是父子关系也可以匹配。效率



```css
.btn-success
#btn_success

button. display:inline-block


文本分隔符
inline inline-block 换行 空格
```



```css
min-width: /* 滚动条 自适应 */

max-width:

min-height

max-height

overflow:hidden;
overflow:scroll;/* 滚动条占用盒子内部宽度 17px */
overflow:auto;

font-size:12px;/* pixel 字体大小设置的是高度*/
font-weight:lighter/normal/bold/bolder/100-900;
font-style: italic/oblique/normal;
font-family: 'Hiragino Sans GB', 'MICrosoft YaHei', Arial, \5b8b\4f53, 'Helvetica Neue', Helvetica, STHeiTi, sans-serif;/* 有空格/中文 需要加引号*/
color:pink;/* 00-ff RGBA 0-255*/


border: 1px solid #000;

```



```css
div{
  width:100px;height:100px;
  border: 1px solid #000;
}
/* 可视宽度102*102
 * 顺时针
 * 上右下左 
 * 上下 左右 
 * 上 左右 下 
 */
```









```css
text-align:left/center/right;/* 文本对齐 水平居中 */
line-height:22px;/* 一行默认占的高度 垂直居中 */
text-indent:10px/2em;
px 绝对单位（像素单位）
em 相对单位
1em = 16px
font-size:62.5%;




text-decoration:underline/line-through/overline/none;

cursor:pointer/not-allowed/help/resize;

单行文本截断和显示省略号的三大件
white-space:nowrap;/* 不换行 */
overflow-x:hidden;
text-overflow:ellipsis;/* 隐藏部分加省略号 */


display
inline: 
inline-block: button  
block



伪类
:hover
:disabled
checkbox:checked
input:focus


ul{
  list-style:none;
}



display:none;/* 不保留被隐藏的元素所占据的HTML文档空间 */
visibility:hidden;/* 保留被隐藏的元素所占据的HTML文档空间 */

opacity:0
filter:alpha(opacity=0)



li:first-child
li:last-child
li:nth-child(n/odd/even)


/* 行内块和行内元素文本对齐的问题*/
vertical-align:middle/top/bottom/px


/* 容器内多行文本居中 */
div{
  display:table;
}
span{
  display:table-cell;
  vertical-align:center;
}
```



```css
box model

可视区域
不算外边距

box-sizing:border-box;
box-sizing:content-box;

div{
  box-sizing:border-box;
  -moz-box-sizing:border-box;/* firefox */
  -webkit-box-sizing:border-box;/* chrome safari */
  -ms-box-sizing:border-box;/* IE8以下 */
  -o-box-sizing:border-box;/* presto opera */
}
.content-box{
  box-sizing:content-box;
  -moz-box-sizing:content-box;/* firefox */
  -webkit-box-sizing:content-box;/* chrome safari */
  -ms-box-sizing:content-box;/* IE8以下 */
  -o-box-sizing:content-box;/* presto opera */
}

body{
  margin:0px;
}
/*
 *IE8 上下16左右8px
 *IE8 上下16左右11px
 */


/*
 * 绝对定位
 * 相对定位--> 占用之前的空间
 * 父相子绝
 */


阴影层级覆盖
position:relative;
z-index:1;



html,
body {
  margin: 0;
  height: 100%;
  overflow-y:hidden;/* 防止滚动条 */
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 100%;
  background-color: #096;
}
.right {
  margin-left: 200px;
  height: 100%;
  background-color: pink;
}

z-index:


float
/* 内联 内联块 浮动 溢出隐藏 纯文本都可以识别浮动元素的位置
 * 除了块级元素
 * 块级元素加float就变成内联块级元素
 */
<p class="clearfix"></p>
.clearfix{
  clear:both;
}
伪元素  内联元素
::before
::after

.clearfix::after{
  content:"";
  display:block/table;
  clear:both;
}

添加图标
p:before{
  content:url(icon.png)
  margin-right:5px;
  vertical-align:middle;
}
添加用户名
<p data-username="honjay ">welcome</p>
p::before {
  content: attr(data-username);
}
/* margin塌陷 */
```





```css
box-shadow:水平位置 垂直位置 模糊距离 阴影尺寸 阴影颜色 阴影种类(inset)


border-radius:50%;
-moz-
-webkit-
-o-
半圆角 height/2 px

圆角容器被非圆角的子元素遮盖（如图片
overflow:hidden;




background-image:url()
background-size:cover/contain
background-repeat
background-position
background-attachment: scroll|fixed;

background:color image repeat attachment position/size
```



```css
<style type="text/css">
h1 {
  margin: 0;
}
.logo {
  width: 142px;
  height: 58px;
  /* border: 1px solid #000; */
}
.logo h1 .logo-hd {
  display: block;
  width: 142px;
  height: 0px;
  /* border: 1px solid #000; */
  padding-top: 58px;
  background: url(https://gw.alicdn.com/tfs/TB176rg4VP7gK0jSZFjXXc5aXXa-286-118.png)
    no-repeat 0 0 /142px 58px;
  overflow: hidden;
}
</style>

<div class="logo">
  <h1>
  	<a href="" class="logo-hd">淘宝网</a>
  </h1>
</div>
```



```css
caption-side:top|bottom;


tabel{
  border-collapse: separation|collapse;
  table-layout:auto|fixed
}




普通流	normal flow
浮动流	float
绝对定位	absolute 
```







```css
margin合并 两个盒子放在有BFC属性的盒子里面就

BFC margin合并的问题 清除浮动（浮动流造成父级元素坍塌的问题  盒子margin塌陷 浮动元素覆盖的问题
虽然可以但是不提倡
float:left
position: absolute/fixed
display:inline-block/table-cell
overflow:hiddden/auto


float的元素自动转换为inline-block
img inline-block




css书写顺序
显示属性：display, position, float, clear
自身属性：width, height, margin, padding, border, background
文本属性：color,font, text-align, vertical-align, whitespace



font-style font-weight font-size line-height font-family 
font:italic bold 12px/20px "微软雅黑"

opacity:.8

选择器名称
选择器复合单词-
JS钩子ID 复合单词_下划线  J_nav
选择器 小写
结构化命名 header nav sidebar 
```





```css
/* 语义化*/
em{
  font-style: normal;
}
<ins></ins>
<del></del>
```



```css
body{
  font-family:;
}
h1,h2,h3,h4,h5,h6{
  font-weight:normal;
}
ul{
  margin:0;
  padding:0;
  list-style:none;
}
input,textarea,button{
  outline:none;
}
a{
  text-decoration:none;
}
i,em{
  font-style:normal;
}
```





```css
标签借用


雪碧图sprite精灵图   多图标在一张图上 定位
加快网站加载速度
```





## 第 154 题：弹性盒子中 flex: 0 1 auto 表示什么意思 #380

```css
flex: flex-grow flex-shrink flex-basis
放大比例
缩小比例	
设置了宽度跟宽度走，没设置宽度跟内容实际宽度走？
```



## 第 155 题：求最终 left、right 的宽度 #381

```css
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 500px;
    background: red;
  }
  .right {
    flex: 2 1 400px;
    background: blue;
  }
</style>
```

- 600px<500px+400px ==> flex-shrink 300
- 500-300*(2\*500/1400)=285.72
- 400-300*(1\*400/1400)=314.28

## 第 156 题：求最终 left、right 的宽度（变形） #382

```css
.left {
  flex: 1 2 300px;
  background: red;
}
.right {
  flex: 2 1 200px;
  background: blue;
}
```

- 200+300px<600px==>flex-grow
- 300+100/3*1
- 200+100/3*2





##### css 变量

```css
:root {
  --sky: #124380;
}
body {
  background: var(--sky);
}
```

```css
最常用的滤镜效果是不透明效果，如果要实现50%的不透明度 div {
  filter: alpha(opacity=50);
} /* for IE8 and earlier */
div {
  opacity: 0.5;
} /* for IE9 and other browsers */
```

```javascript

```



`background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#0319f4);`

```css
background-clip: text; /*只显示文字区域背景*/
clip-path: circle(100px at 0% 50%); /*只显示指定区域背景 左上角为00*/
```

`filter: blur(20px);`背景虚化

```javascript
window.onload = function() {}
```

```css
z-index用于确定元素在当前层叠上下文中的层叠级别

同一个层叠上下文中，层叠级别大的显示在上面，反之显示在下面。

默认为auto即0
```

##### [var ev = ev || event]

```javascript
event是事件对象(也是window的属性)，但不是标准的，只有IE支持。
在W3C标准支持的浏览器下事件对象是引发事件函数的第一个参数，参数名随意。
所以，我们一般使用事件对象：

function (ev){
	var ev = ev || event;
}

而 || 的两边是不能反过来写的，不了解ev || event和event || ev 只能说明你对||操作符不熟悉。
||返回第一个Boolean类型为true的值，
在IE中执行var oEvent = ev || event;时，ev为undefined，即为false，而event为true。所以返回的是它所支持的event。
在其他浏览器中，第一个ev为true，直接返回，不用理会后面的event。

而反过来写，var oEvent = event || ev;
IE下不会报错，直接返回第一个为true的event
但在其他浏览器中，event没有被定义，直接报错。
```

##### Animation

| 属性                      | 描述                                   |
| ------------------------- | -------------------------------------- |
| animation                 | 检索或设置对象所应用的动画特效         |
| animation-name            | 检索或设置对象所应用的动画名称         |
| animation-duration        | 检索或设置对象动画的持续时间           |
| animation-timing-function | 检索或设置对象动画的过渡类型           |
| animation-delay           | 检索或设置对象动画的延迟时间           |
| animation-iteration-count | 检索或设置对象动画的循环次数           |
| animation-direction       | 检索或设置对象动画在循环中是否反向运动 |
| animation-play-state      | 检索或设置对象动画的状态               |
| animation-fill-mode       | 检索或设置对象动画时间之外的状态       |

```javascript
transform: rotate(90deg);//默认中心旋转 顺时针

transform: rotate(-180deg);//可以让文本转180倒到下方


/* 等同于 scaleX(2) scaleY(0.5) */
  transform: scale(2, 0.5);
  transform-origin: left;//用origin改变转为中心位置
//默认值：50% 50%；如果只提供一个，该值将用于横坐标；纵坐标将默认为50%。可以用百分数来设置值



/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;


innerHTML指的是从对象的起始位置到终止位置的全部内容,包括Html标签。
innerText   指的是从起始位置到终止位置的内容,但它去除Html标签。
```

















