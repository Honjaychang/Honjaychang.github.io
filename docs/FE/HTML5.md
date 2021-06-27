# h5

## Markdown File For H5

### To Be Continuted







```html
web front-end development
web back-end development

结构布局 样式呈现 页面的动态交互

数据交互处理。数据格式化渲染


结构布局 样式呈现 行为逻辑
HTML		CSS			JavaScript
分离开发



超文本标记语言
HyperText Markup Language

<br />
<hr />


<head>
  <title>Document</title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />
</head>

title:	30-40
	主页：网站名称 + 主要的关键字/关键词的描述
	详情页：详情名称 + 网站名称 + 简介
	列表页：分类名称 + 关键字 + 网站名称
	文章页：标题 + 分类 + 网站名称
keywords:	100个字符
	网站名称 + 分类信息 + 网站名称
description:	80-120汉字
	综合title + keywords 的简单描述

越往前搜索引擎优先级越高


搜索引擎优先级
title > description > keywords



搜索引擎

<html lang="zh-CN">
  简体中文	zh-hans zh-CHS
  繁体中文	zh-hant zh-CHT
</html>


设置编码字符集
GB2312	中国信息处理国家标准码
GBK	汉字扩展规范	扩大汉字收入 增加繁体收入 增加少数民族文字收入
UTF-8	万国码
<meta charset="UTF-8" />
中文不乱码


<!DOCTYPE html> H5声明方式
console.log(document.compatMode)

CSS1Compat	W3C标准兼容性模式
BackCompat	浏览器的怪异兼容性模式（没有声明的话



浏览器默认文字大小是16px
默认1em = 16px

text-indent:2em;

<strong></strong>
<em></em>
<del></del>删除线 text-decoration:line-through;
<ins></ins>下划线 text-decoration:underline;

<address></address>


division
<div></div>
网站的结构标签  布局标签
中英文换行问题
英文有空格才会换行

实体字符
<	&lt;
>	&gt;
  &nbsp;
```





```html
<img src="" alt="图片加载失败时显示图片主题" title="鼠标划到显示图片主题"/>






anchor 锚点 作用
1、超链接标签
2、打电话
3、发邮件
4、锚点定位
5、协议限定符
Hypertext Reference	超文本引用
<a href="www.baidu.com" target="_blank">baidu</a>
<a href="tel:130XXXXXXX">call me</a>
<a href="mailto:honjaychang@qq.com">发邮件</a>
<a href="#box">点击回到box</a>
<a href="javascript:;">点击不刷新页面</a>





标签嵌套

p不可以嵌套div
a不可以嵌套a
a可以嵌套img

<!-- -->

<sub></sub>下标	subscripted
<sup></sup>上标	superscripted
FE<sup><a href="www.baidu.com">[1]</a></sup>
10<sup>5</sup>
H<sub>2</sub>SO<sub>4</sub>
```



```html
order list	有序列表
<ol type="" start="" reversed="reversed"></ol>
1、i、I、a、A		type是数字 start可以指定

unorder list	无序列表
<ul type="">
	<li></li>
</ul>
type: disc/square/circle


definition list	定义列表
definition term	
definition description	
<dl>
  <dt>
  <dd></dd>
  </dt>
</dl>
```







```html
cellpadding单元格内边距	cellspacing单元格间距
<table border="1" cellpadding="10" cellspacing="10">
  <caption></caption>
  <tr>
  	<th></th>
  </tr>
  <tr>
  	<td></td>
  </tr>
</table>

列合并
<td colspan="2"></td>
行合并
<td rowspan="2"></td>

<td align="center"></td>

caption	标题标签
tr	table row	行标签
th	table head cell 表头标签
td	table data cell 单元格标签

thead	表格页眉标签
tbody	表格主体标签
tfoot	表格页尾标签

如果不添加这三个标签 表格要等所有数据加载出来才能展示出来
加载顺序thead->tfoot->tbody
```



```html
frameset 不用放在body里面

<frameset rows="10%, 90%">
  <frame src="head.html" />
  <frameset cols="20%, 80%">
    <frame src="left.html" />
    <frame name="mainFrame" src="https://www.taobao.com" />
  </frameset>
</frameset>


<a href="https://www.taobao.com" target="mainFrame">TB</a>
```





```html
iframe	内联框架

<p>
  <a href="https://www.baidu.com" target="mainFrame">baidu</a>
  <a href="https://www.tmall.com" target="mainFrame">tmall</a>
  <a href="https://www.taobao.com" target="mainFrame">taobao</a>
</p>
<iframe width="80%" height="1000" frameborder="1" src="https://www.baidu.com" name="mainFrame" ></iframe>

frameborder="1" 1显示 0不显示？
scrolling="yes|no|auto" 是否禁用滚动条

搜索引擎检索
滚动条混乱
```



```html
用户提交数据

数据名称 + 数据的值



<form method="" action="url">
  <input type="text|password" name="username|password" value="" maxlength="" />
</form>
maxlength="5"  算字符

<input type="submit" value="login" />


<form method="get" action="url">
	<label for="username">用户</label>
  <input type="text" id="username" name="username" />
</form>

label for属性与input id 相同 点击label可以聚焦input输入框


<input type="text" id="username" name="username" disabled="disabled" />
<input type="text" id="username" name="username" readonly="readonly" />
区别：禁用数据不可提交 只读可以

<input type="text" id="username" name="username" readonly="readonly" disabled="disabled"/>




<form method="get" action="url">
  <input type="radio" id="male" name="sex" value="male" checked="checked" />
  <label for="male">男</label>
  <input type="radio" id="female" name="sex" value="female" />
  <label for="female">女</label>
  <input type="submit" />
</form>


name约束 value传值。可能


<form method="get" action="url">
  <select name="l
                ang">
    <option value="">请选择？</option>
    <option value="js==">JS</option>
    <option value="h5==">H5</option>
    <option>Vue</option>
    <option>CSS</option>
    <input type="submit" />
  </select>
</form>
如果option没有value值传递的就是?lang="Vue"
贩子?lang="js=="
但是可以将“请选择置为空”  然后判断用户是否输入




多行文本
<textarea cols="30" rows="20"></textarea>
261 306？
cols可见宽度 8px*cols+17px（滚动条？（宋体

不可换行或者空格 因为textarea的值放在标签中间


placeholder=""


<fieldset>
  <legend></legend>
</fieldset>
封装表单组
```



```html
<video src=""></video>
<audio src=""></audio>


H5新增
JS API
地理定位 离线存储 canvas 应用缓存

结构化标签
<header></header>

拖拽 Web存储



css3 过渡 转换 动画
```

