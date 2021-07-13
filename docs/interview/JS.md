# JavaScript

迁移中...

## 变量类型和计算

#### `var`和`let const`的区别

- var 是 ES5 语法，`let const` 是 ES6 语法；var 有变量提升
- `var or let` 声明的是变量，可以被修改; `const` 声明的是常量，值类型不能被重新赋值
- `let or const` 有块级作用域，var 声明的范围是函数作用域 (块作用域 是函数作用域的子集)

#### 变量提升

```js
var 声明的函数表达式 undefined

同名的话

function 先被提升
然后是变量 变量只有在赋值之后才会覆盖同名函数 否则输出函数

待补充
```

#### 变量类型

##### 值类型 存放在 栈内

- 基本类型：`String、Number、Boolean、Null、Undefined、Symbol`

```js
let a = 100;
let b = a;
a = 200;
console.log(b); //100
```

- 以下都为值类型

```js
let a //undefined -> Undeined
const s = 'abc' -> String
const n = 100 -> Number
const b = true -> Boolean
const s = Symbol('s') -> Symbol
```

##### 引用类型 内存地址 栈 和 堆

- 引用数据类型：`Object、Array、Function`

```js
let a = { age: 18 };
let b = a;
b.age = 20;
console.log(a.age); //20
```

- 以下为引用类型（对象、数组、函数）

```js
const obj = { age: 18 };
const arr = [1, 2, 3];
const n = null; // 特殊引用类型，指针指向空地址
function fn() {} //特殊引用类型，但不用于存储数据
```

#### typeof 运算符

**typeof 能判断哪些类型?**

- 识别所有值类型

```js
let a //undefined				typeof a // 'undefined'
const s = 'abc'					typeof s // 'string'
const n = 100					typeof n // 'number'
const b = true					typeof b // 'boolean'
const s = Symbol('s')			typeof s // 'symbol'
```

- 识别函数

```js
typeof console.log; // 'function'
typeof function fun() {}; // 'function'
```

- 判断是否是引用类型（不可再细分）

```js
typeof null; // 'object'
typeof [1, 2]; // 'object'
typeof { age: 18 }; // 'object'
```

- `Object.prototype.toString.call(null) // [object Null]`

#### 强制类型转换

- `parseInt parseFloat toString `

##### `parseInt()`

##### `parseFloat()`

##### `toString()`

#### 隐式类型转换

##### 字符串拼接 +

```js
const a = 100 + 10;
const b = 100 + '10';
const c = true + '10';
console.log(a, b, c); // 110 '10010' 'true10'
```

- `*/- ==> str -> num`

##### == 和 ===

- `==`会先进行类型转换，然后再比较值
- `===`会比较两个值的类型和值

```js
// true
100 == '100';
0 == '0';
0 == false;
false == '';
null == undefined;
```

- 何时使用`=== `何时使用` ==`

```js
// 除了 == null之外，其他都用 ===
const obj = { x: 100 };
if (obj.x == null) {
}

if (obj.x === null || obj.x === undefined) {
}
```

##### if 语句和逻辑运算符

- `truly变量: !!a===true的变量`
- `falsely变量: !!a===false的变量`

```js
// 以下都是falsely变量，此外都是truly变量
!!0 === false;
!!NAN === false;
!!'' === false;
!!null === false;
!!undefined === false;
!!false === false;
```

- `|| &&`

```js
console.log(10 && 0); // 0
console.log('' || 'abc'); // 'abc'
console.log(!window.abc); // true 		window.abc = undefined
```

#### JS 中有哪些内置函数 -- 数据封装类对象

```js
Object	Array	Boolean	Number	String
Function	Date	RegExp	Error

作用？
```

#### JS 变量按照存储方式区分为哪些类型，并描述其特点

- 值类型、引用类型

#### 如何理解 JSON

```js
内置对象 Math JSON   json也是一种数据格式

JSON.stringify({})
JSON.parse({})
```

#### 深拷贝

## 作用域和闭包

#### 作用域

- 全局作用域

- 函数作用域

- 块级作用域（ES6 新增）

```js
if (true) {
  let x = 100;
}
console.log(x); // ReferenceError
```

##### 作用域链

**自由变量**

所有的自由变量的查找，是在函数定义的地方，向上级作用域查找 而不是在执行的地方！！！

- 一个变量在当前作用域没有定义，但被使用了
- 向上级作用域，一层一层依次寻找，直至找到为止
- 如果到全局作用域都没找到，则报错 `xx is not defined`

#### 闭包

##### 闭包是什么，有什么特性？有什么负面影响？

:::note Ref

- [闭包，看这一篇就够了——带你看透闭包的本质，百发百中](https://blog.csdn.net/weixin_43586120/article/details/89456183?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=1328626.21589.16154409814490145&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control)
- [对 JS 闭包的理解及常见应用场景](https://blog.csdn.net/qq_21132509/article/details/80694517?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=1328655.9588.16158629577837531&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)

:::

- 闭包就是能够读取其他函数内部变量的函数。

- 由于在 javascript 中，只有函数内部的子函数才能读取局部变量。所以我们可以将闭包理解为：定义在一个函数内部的函数

###### 作用

- 可以读取函数内部的变量，让这些变量的值始终保持在内存中
- 可以使用函数内部的变量，使变量不会被垃圾回收机制回收

###### 优点

- 避免全局变量的污染
- 防抖和节流
- 函数柯里化
  - 柯里化：把接收多个参数的函数变换成接收一个单一参数的函数（单一参数为多个参数中的第一个）
  - 函数柯里化思想：一个 JS 预处理的思想，降低通用性，提高适用性。

###### 缺点

- 闭包使函数中的变量都保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
- 会出现内存泄漏的问题

###### 闭包案例

- 定义外部函数,用于封装要保护的变量以及可外部访问的内部函数。
- 定义外部函数中受保护的变量以及用于操作保护变量的的内部函数并将内部函数返回。
- 调用外部函数获取内部函数,然后基于内部函数操作受保护变量

```js
function outer() {
  var count = 0; //这个变量外部不可直接使用（可理解为受保护变量）
  return function () {
    count++; //通过内部函数操作受保护变量
    console.log(count);
  };
}
var inner = outer(); //调用外部函数获取内部函数
inner(); //调用内部函数操作受保护变量
```

- 函数作为返回值

```js
function create() {
  const a = 100;
  return function () {
    console.log(a); // a是自由变量
  };
}
const fn = create();
const a = 200;
console.log(fn()); //100
```

- 函数作为参数被传递

```js
function print(fn) {
  const a = 200;
  fn();
}
const a = 100;
function fn() {
  console.log(a);
}
console.log(print(fn)); //100

// 所有的自由变量的查找，是在函数定义的地方，向上级作用域查找  而不是在执行的地方！！！
```

#### 关于 This

- `this`是`JS`的一个关键字 是当前环境执行期上下文对象的一个属性
- **this 的取值是在函数执行的时候决定的而不是在函数定义的**
- 全局 => `window`
- 类 构造函数 => 实例对象
- `call apply bind` => 传入什么绑定什么
- 作为对象方法被调用 => this 指向上级对象
- 在 class 方法中调用 => 返回当前实例本身
- 箭头函数 => 找它上级作用域 this 的值来决定
- **箭头函数中的 this 是在定义函数的时候绑定，而不是在执行函数的时候绑定。继承的是父执行上下文里面的 this**

##### 全局作用域

- 全局作用域下的`this` -> 全局对象
- `window` 和 `this` 的关系：`console.log(this === window) // true`

This 在不同环境下的全局指向不同

```basic
this -> 浏览器 node web worker

获取全局对象
web: window self frames this
node: global
web worker: self

通用 globalThis
```

##### 对象

- `this` 总是指向**调用这个函数的对象**

```js
const obj = { a: 1 };

Object.defineProperty(obj, 'a', {
  get: function () {
    console.log(this); // obj
  },
});
```

##### 构造函数

- `this` 指向新创建的对象

```js
function Test() {
  this.a = 1;
  console.log(this);
}

const test = new Test(); // Test {a: 1}
```

##### 回调函数

```js
let arr = [1, 2, 3];
arr.forEach(function () {
  console.log(this); // window
});

setTimeout(function () {
  console.log(this); // this 指向 Window
});
```

##### 箭头函数

- 箭头函数中的 `this` **指向外层作用域的 this 指向**
- 箭头函数的 `call、apply、bind` 不会改变 `this` 指向

```js
const obj = { a: 1 };

obj.test = function () {
  // let _this = this
  console.log('test', this);
  var t1 = () => {
    console.log('t1', this);
    var t2 = () => {
      // t1 是箭头函数 t1 t2 指向 this -> obj
      // t1 是普通函数 t1 t2 指向 this -> window
      console.log('t2', this);
    };
    t2();
  };
  t1();
};
obj.test();
```

##### 事件处理函数

- 事件处理函数内部的`this`总是指向被绑定的 DOM 元素

```js
<button id="J_Btn">Test</button>
<script>
  ;(function (doc) {
    var oBtn = doc.getElementById('J_Btn')
    function Add(a, b) {
      this.a = a
      this.b = b

      this.init()
    }
    Add.prototype.init = function () {
      this.bindEvent()
    }
    Add.prototype.bindEvent = function () {
      // oBtn.addEventListener('click', this.handleBtnClick, false)// NAN
      // oBtn.addEventListener('click', this.handleBtnClick(), false) // 虽然输出3 但是加括号会立即执行 并不是我们预期的效果
      console.log(this) //  Add {a: 1, b: 2}
      oBtn.addEventListener('click', this.handleBtnClick.bind(this), false) // bingo 将函数内部this指向Add实例
      // var _self = this
      // oBtn.addEventListener('click', function () {
      //   _self.handleBtnClick()
      // }) // bingo
    }
    Add.prototype.handleBtnClick = function () {
      console.log(this.a + this.b)
    }
    window.Add = Add
  })(document)

new Add(1, 2)
</script>
```

:::note Ref

- [【全网首发:已完结】『this 指向问题』全解析【面试开发必备知识】](https://www.bilibili.com/video/BV1qp4y1Y7yQ)
- [深入理解 ES6 箭头函数中的 this](https://zhuanlan.zhihu.com/p/26475137)
- [JS 中的箭头函数与 this](https://juejin.cn/post/6844903573428371464)
- [babel 转译](https://babeljs.io/repl)
- [this 关键字](https://wangdoc.com/javascript/oop/this.html)

:::

##### 实际开发中闭包的应用场景，举例说明

- 隐藏数据：如做一个简单的 cache 工具

```js
// 闭包隐藏数据，只提供API
function createCache() {
  const data = {}; // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}
const c = createCache();
c.set('a', 100);
console.log(c.get('a')); //100
```

##### 创建 10 个`<a>`标签点击的时候弹出来对应的序号

```js
// let i, a
let a
for (let i = 0; i < 10; i++) {
  // 使得i变成块级作用域
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i) // i也是 一个自由变量要去父作用域获取
  })
  // click执行的时候 for遍历早已完成 i=10 i是全局作用域 ==> 使得i变成块级作用域
  document.body.appendChild(a)
}

块级作用域 立即执行函数
```

##### 如何理解作用域

- 自由变量
- 作用域链，即自由变量的查找
- 闭包的两个场景

##### 实际开发中闭包的应用

- 匿名自执行函数
- 缓存计算比较复杂的函数的结果
- 封装

## 原型和原型链

- JS 是基于原型继承的语言

#### 如何准确判断一个变量是不是数组？

-

```js
function isArray(arr) {
  return arr instanceof Array;
}

arr.constructor === Array;

Object.prototype.toString().call();

Array.isArray();
```

#### 手写一个简易的 jQuery ，考虑插件和扩展性

```js
// jquery demo  DOM 查询
class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i]; // 类数组
    }
    this.length = length;
    this.selector = selector;
  }
  get(index) {
    return this[index];
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }
  on(type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false);
    });
  }
}

// const $p = new JQuery('p')
// console.log($p)
// console.log($p.get(1)) // <p>Text 2</p>
// $p.each((elem) => console.log(elem.nodeName)) // P P P
// $p.on('click', (e) => console.log(e.target))
```

- 考虑插件和扩展性

```js
JQuery.prototype.dialog = function (info) {
  console.log(info);
};
const $p = new JQuery('p');

// 复写机制 造轮子
class myJQuery extends JQuery {
  constructor(selector) {
    super(selector);
  }
  style(data) {
    // ……
  }
}
// JQuery.prototype.myGet(index)
```

##### 类和继承

- ##### `class`

```js
class Student {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
  sayHi() {
    console.log(`姓名 ${this.name} 学号 ${this.number}`);
  }
}

const zhangsan = new Student('zhangsan', 1234);
console.log(zhangsan.sayHi());
```

![](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/prototype.png)

- ##### `extends`

```js
// 继承	extends
// super	扩展或重写方法

class People {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Stu extends People {
  constructor(name, number) {
    super(name);
    this.number = number;
  }
  sayHi() {
    console.log(`姓名 ${this.name} 学号 ${this.number}`);
  }
}
const lisi = new Stu('lisi', 1234);
console.log(lisi.eat());
console.log(lisi.sayHi());
```

![](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/prototypeLink.png)

##### 类型判断`instanceof`

```js
// true

lisi instanceof Stu
lisi instanceof People
lisi instanceof Object

[] instanceof Array
[] instanceof Object
{} instanceof Object

// class 实际上是属性，可见是语法糖
typeof Stu // 'function'
typeof People // 'function'
```

##### 原型和原型链

- 隐式原型和显示原型

```js
console.log(lisi.__proto__); // 隐式原型
console.log(Stu.prototype); // 显示原型
console.log(lisi.__proto__ === Stu.prototype); // true
```

- 原型关系
  - 每个 `class` 都有显示原型 ` prototype`
  - 每个 实例 都有隐式原型 `__proto__`
  - 实例的`__proto__`指向对应` class` 的 `prototype`（实例的隐式原型指向对应类的显示原型）
- 基于原型的执行规则

  - 获取属性`lisi.name`或执行方法`lisi.sayhi()`时
  - 先在自身属性和方法寻找
  - 如果找不到则自动去`__proto__`中査找

- 原型链

```js
console.log(Stu.prototype.__proto__);
console.log(People.prototype);
console.log(Stu.prototype.__proto__ === People.prototype);

Object.prototype.__proto__ === null;
```

- `hasOwnProperty()` 判断是否是自己的属性

```js
console.log(lisi.hasOwnProperty('name'))//true
console.log(lisi.hasOwnProperty('sayHi'))//false

重要提示！！！
class是ES6 语法规范，由ECMA委员会发布
ECMA只规定语法规则，即我们代码的书写规范，不规定如何实现
以上实现方式都是V8引擎的实现方式，也是主流的
```

[图源](https://clarkdo.js.org/javascript/2014/08/21/17/)

![jsobj_full](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/jsobj_full.jpg)

## 异步

##### 题目

```js
console.log(1);
setTimeout(function () {
  console.log(2);
}, 1000);
console.log(3);
setTimeout(function () {
  console.log(4);
}, 0);
console.log(5); // 1 3 5 4 2
```

##### 单线程和异步

- JS 是单线程语言,只能同时做一件事儿
- 浏览器和 nodejs 已支持 JS 启动进程,如 Web Worker
- JS 和 DOM 渲染共用同一个线程，因为 JS 可修改 DOM 结构

- 遇到等待(网络请求,定时任务)不能卡住
- 需要异步
- callback 回调函数形式

##### 同步和异步的区别是什么？

- 基于 JS 是单线程语言 异步不会阻塞代码执行 同步会阻塞代码执行`(alert)`

##### 前端使用异步的场景有哪些？

- 网络请求：如 `ajax` 、图片加载

```js
// ajax
console.log('start');
$.get('./data.json', function (data) {
  console.log(data);
});
console.log('end');

// 图片加载
console.log('start');
let img = document.createElement('img');
img.onload = function () {
  console.log('loaded');
};
img.src = '/xxx.png';
console.log('end');
```

- 定时任务：如 `setTimeout`

```js
setTimeout(() => {}, 1000); // 一次
setInterval(() => {}, 1000); // 循环
```

- 事件绑定：

```js
console.log('start');
let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup', () => {
  console.log('keyup');
});
console.log('end');
```

##### 手写用 Promise 加载一张图片

```js
// 手写promise 加载图片
const url = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/photo.ico';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      const err = new Error(`图片加载失败 ${src}`);
      reject(err);
    };
    img.src = src;
  });
}
loadImage(url)
  .then(img => {
    console.log(img.width);
    return img;
  })
  .then(img => {
    document.body.appendChild(img);
  })
  .catch(err => {
    console.log(err);
  });
console.log('Loading');
```

- 手写 promise 加载多张图片

```js
// 手写promise 加载多张图片
const url1 = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/photo.ico';
const url2 = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/favicon.ico';

loadImage(url1)
  .then(img1 => {
    // console.log(`img1 - width: ${img1.width}`)
    return img1; //return 普通对象
  })
  .then(img1 => {
    console.log(img1);
    document.body.appendChild(img1);
    return loadImage(url2); // return Promise实例
  })
  .then(img2 => {
    console.log(img2);
    // console.log(`img2 - width: ${img2.width}`)
    return img2;
  })
  .then(img2 => {
    document.body.appendChild(img2);
  })
  .catch(err => {
    console.log(err);
  });
```

##### 小结

- 单线程和异步，异步和同步区别

- 前端异步的应用场景:网络请求&定时任务

- Promise 解决 callback hell

## 异步--进阶

#### promise 进阶

图源：[MDN 官网](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

![](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

##### promise 三种状态

- `pending fulfilled rejected`
- `pending--> fulfilled pending --> rejected`
- 变化不可逆

##### 状态的表现

- `pending` 状态，不会触发 then 和 catch

- `fulfilled` 状态，会触发后续的 then 回调函数

- `rejected`状态，会触发后续的 catch 回调函数

##### then 和 catch 对状态的影响

- then 正常返回 fulfilled，里面有报错则返回 rejected

```js
const p1 = Promise.resolve().then(() => {
  console.log('...');
});
console.log('p1', p1); //fulfilled 触发后续 then 回调函数

const p2 = Promise.resolve().then(() => {
  throw new Error('catch error');
});
console.log('p2', p2); //rejected 触发后续 catch 回调函数
```

- catch 正常返回 fulfilled，里面有报错则返回 rejected

```js
const p3 = Promise.reject('My error').catch(err => {
  console.error(err);
});
console.log('p3', p3); //fulfilled 触发 then 回调

const p4 = Promise.reject('My error').catch(err => {
  throw new Error('catch error');
});
console.log('p4', p4); //rejected 触发 catch 回调
```

##### 题目

```js
Promise.resolve()
  .then(() => {
    console.log(1); // fulfilled --> then
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  }); // 1 3
```

```js
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error('Error1'); // rejected --> catch
  })
  .catch(() => {
    console.log(2); // fulfilled --> then
  })
  .then(() => {
    console.log(3);
  }); // 1 2 3
```

```js
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error('Error1'); // rejected --> catch
  })
  .catch(() => {
    console.log(2); // fulfilled --> then
  })
  .catch(() => {
    console.log(3);
  }); // 1 2
```

#### async/await

##### `async/await`

- 异步回调 callback hell

- Promise then catch 链式调用，但也是基于回调函数

- async/await 是同步语法，彻底消灭回调函数

```js
// 手写promise 加载多张图片 ==> async
const url1 = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/photo.ico';
const url2 = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/favicon.ico';

(async function () {
  // 同步的语法
  const img1 = await loadImage(url1);
  const img2 = await loadImage(url2);
  console.log(`img1 - width: ${img1.width} \nimg2 - width: ${img2.width}`);
  document.body.appendChild(img1);
  document.body.appendChild(img2);
})();
```

##### async/await 和 Promise 的关系

- async/await 是消灭异步回调的终极武器

- 但和 Promise 并不互斥 反而，两者相辅相成

- 执行 async 函数，返回的是 Promise 对象

```js
async function fn() {
  return 100; // 相当于 return Promise.resolve(100)
}

(async function () {
  const a = fn();
  const b = await 100;
  const c = await fn();
  const d = await Promise.resolve(100);
  console.log(a, b, c, d); // Promise { 100 } 100 100 100
})();
```

- await 相当于 Promise 的 then

```js
(async function () {
  const p1 = Promise.reject('Error1'); // rejected
  const res = await p1; // await -> promise.then
  console.log(res); // 报错了
})();
```

- try...catch 可捕获异常，代替了 Promise 的 catch

失败了 所以就可以考虑使用下面的 try catch

```js
(async function () {
  const p1 = Promise.reject('Error1'); // rejected
  try {
    const res = await p1;
    console.log(res);
  } catch (err) {
    console.error(err); // try .. catch 相当于 promise  catch
  }
})();
```

```js
(async function () {
  {
    console.log('start');
    const a = await 100;
    console.log('a', a);
    const b = await Promise.resolve(200);
    console.log('b', b);
    const c = await Promise.reject(300);
    console.log('c', c);
    console.log('end');
  }
})(); // start a 100 b 200 Error
```

##### 异步的本质

- async/await 是消灭异步回调的终极武器
- JS 还是单线程，还得是有异步，还得是基于 event loop
- async/await 解决了异步回调 是一个很香的语法糖

##### for of 异步遍历

- for ... in（以及 forEach for ）是常规的同步遍历

- for ... of 常用于异步的遍历

```js
function muti(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}

const nums = [1, 2, 3];
// 同步循环
// nums.forEach(async (i) => {
//   const res = await muti(i)
//   console.log(res) // 隔一秒后一起打印
// })

// 异步循环
(async function () {
  for (num of nums) {
    const res = await muti(num);
    console.log(res); // 1 4 9 每隔一秒依次打印
  }
})();
```

#### event loop

##### 宏任务和微任务

- 宏任务: `setTimeout` `setInterval` ` Ajax` `DOM事件` `(计时器，事件回调，http回调,I/O)`

- 微任务: `Promise` `async/await` `nextTick`

- 同一次事件循环中，微任务执行时机比宏任务要早

```js
console.log(100);
setTimeout(() => {
  console.log(200);
});
Promise.resolve().then(() => {
  console.log(300);
});
console.log(400); // 100 400 300 200  优先级：promise（微任务队列 > setTimeout （宏任务队列
```

- 从 event loop 解释，为何微任务执行更早
  - 微任务是 ES6 语法规定的 宏任务是由浏览器规定的

##### DOM 事件和 event loop

- JS 是单线程的 异步（setTimeout， ajax 等）使用回调，基于 event loop

- DOM 事件也使用回调，基于 event loop
- JS 是单线程的，而且和 DOM 渲染共用一个线程

```js
<button id="btn1">提交</button>

<script>
  console.log('hi')
  $('#btn1').click(function(e) {
    console.log('button clicked')
  })
  console.log('bye')
</script>
```

##### event loop （事件循环/事件轮询）

- JS 是单线程运行的，异步要基于回调来实现
- event loop 就是异步回调的实现原理

##### event loop 流程

- 首先执行同步代码，压入调用栈中，如果遇到微任务、宏任务放到对应队列中等待
- 当同步代码全部执行完成后，call stack 此时为空，执行当前的微任务
- 开始更新 DOM 结构 尝试 DOM 渲染
- 最后触发 event loop 去宏任务队列，依次如上执行

```js
const $p1 = $('<p>One</p>');
const $p2 = $('<p>Two</p>');
const $p3 = $('<p>Three</p>');

$('#container').append($p1).append($p2).append($p3);
console.log('length ', $('#container').children().length);
alert('本次 call stack 结束， DOM结构已更新，但尚未触发渲染');
// alert会阻断JS执行 也会阻断DOM渲染 便于查看效果
// 可见alert弹出时页面上的One TWO。。还没有加载
```

##### 宏任务和微任务区别

- 宏任务: DOM 渲染后触发，如 setTimeout

- 微任务:DOM 渲染前触发，如 Promise

```js
// 微任务 DOM渲染 前  触发
Promise.resolve().then(() => {
  console.log('lengthP ', $('#container').children().length);
  alert('Promise');
});
// 宏任务 DOM渲染 后  触发
setTimeout(() => {
  console.log('lengthS ', $('#container').children().length);
  alert('setTimeout');
});
```

通过 alert 阻断 观察页面 dom 渲染变化

- 顺序：微任务 --> DOM 渲染 --> 宏任务

##### 题目

```js
async function async1() {
  console.log('async1 start'); // 2
  await async2();
  // await 后面的内容都可以看作是 callback 即异步
  console.log('async1 end'); // 6
}
async function async2() {
  console.log('async2'); // 3
}
console.log('script start'); // 1

setTimeout(function () {
  console.log('setTimeout'); // 8
}, 0);

async1();
// 初始化 Promise 时，传入的函数会立刻被执行
new Promise(function (resolve) {
  console.log('promise1'); // 4
  resolve();
}).then(function () {
  console.log('promise2'); // 7
});

console.log('script end'); // 5 同步代码执行完毕 --> event loop 中 call stack 被清空 --> 微 --> 宏
```

##### 请描述 event loop（事件循环/事件轮询）的机制，可画图

- 自行回顾 event loop 的过程
- 和 DOM 渲染的关系
- 微任务和宏任务在 event loop 过程中的不同处理
