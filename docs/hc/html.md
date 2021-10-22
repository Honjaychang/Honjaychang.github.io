# HTML

## HTML语义化

- 让人更容易读懂 --> 增加代码可读性

- 让搜索引擎更容易读懂 --> SEO



#### 块级元素、内联元素

```basic
display: block/table; 有 div h1 h2 table ul ol p 等
display: inline/inline-block;  有span img input button 等
```

`inline`：

- 内联元素、行内元素、行间元素
  - 不 独占一行	无法定义宽高
  - `span/a/label/strong/em/del/ins/sub/sup`

`block`：

- 块级元素
  - 独占一行	可以定义宽高
  - `div/p/hx/ul/ol/li/dl/dt/dd/table/form/fieldset/legend/address`

`inline-block`：

- 内联块级元素
  - 不 独占一行	可以定义宽高
  - `img/iframe/input/select/textarea`



- 行内元素会在一条直线上排列，都是同一行的，水平方向排列
- 块级元素独占一行，垂直方向排列
- 行内元素不能包含块级元素，只能包含文本或者其他行内元素
- 块级元素可以包含行内元素和块级元素
- 行内元素
  - 不能设置宽高
  - 不能设置上下的`margin`  可以设置上下左右的`padding`



`onchange oninput`的区别

- `onchange` 在元素失去焦点时触发
- `oninput` 在 `value` 变化时立即触发 通过 `js ` 改变不会触发





```html
<meta charset="UTF-8">

<meta name="参数" content="具体的描述">

<meta http-equiv="参数" content="具体的描述">

```



- [HTML meta标签总结与属性使用介绍](https://segmentfault.com/a/1190000004279791)



#### H5新增

