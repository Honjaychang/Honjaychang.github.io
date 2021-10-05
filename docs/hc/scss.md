# scss

> misc 未整理



```
BEM
块 block
元素 element
修饰符 modifier

.block-name__element--modifier


名称以小写字母书写
名称中的单词用连字符（-）分隔
元素由双下划线（__）分隔
修饰符由双连字符（--）分隔
```

- [[译] 什么是模块化 CSS？](https://juejin.cn/post/6844903687173701645)



```js
$border-color:#aaa; //声明变量
.container {
$border-width:1px;
    border:$border-width solid $border-color; //使用变量
}


变量名使用中划线或下划线都是指向同一变量的。

后定义的变量声明会被忽略，但赋值会被执行，这一点和ES5中var声明变量是一样的。



SCSS提供了一个选择器可以选中当前元素的父元素，使用&表示
/*scss*/
.container ul {
    border:1px solid #aaa;
    list-style:none;
    
    &:after {
        display:block;
        content:"";
        clear:both;
    }
}


使用%定义一个被继承的样式
%border-style {
  border:1px solid #aaa;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

通过关键字@extend即可完成继承
  
.container {
	@extend %border-style;
}
```





```jsx
<div className={`menu-cover ${show?'menu-active':''}`}>
  {/* your code */}
</div>

<a className={styles['desc']}></a>
<a styleName="desc"></a>
```

- [CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

