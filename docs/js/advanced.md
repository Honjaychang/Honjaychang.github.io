# JS 进阶

Object

Function

原型链

ES6

- `let const`
- 模板字符串 ``
- 解构赋值
- 扩展运算符 `...`
- 函数默认参数
- 箭头函数
- `class`
- `Map Set`
- `Array.from() Array.of() find() fill()`
- `repeat trim padStart`
- `Promise`
- `Module`

ES7

- `includes`
- `Math.pow()`

## 作用域和闭包

**如何理解作用域**

- 自由变量
- 作用域链，即自由变量的查找
- 闭包的两个场景

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

##### 自由变量

所有的自由变量的查找，是在==**函数定义**==的地方，向上级作用域查找 而不是在执行的地方！！！

- 一个变量在当前作用域没有定义，但被使用了
- 向上级作用域，一层一层依次寻找，直至找到为止
- 如果到全局作用域都没找到，则报错 `xx is not defined`

##### 作用域链

##### 预编译流程

暗示全局变量 `imply global variable`

```js
a = 1;
var a = 1;
window.a = 1;
```

##### 变量、函数声明提升

- 函数声明整体提升，变量只有声明提升，赋值不提升
- 函数声明执行优先级优于变量提升
- 同名的函数会覆盖同名函数与变量，但是同名的变量不会覆盖函数
- 在上下文的执行阶段，同名函数会被变量重新赋值

>

- `AO activation object` 活跃对象 函数上下文
- `GO global object` 全局上下文

```js
function test(a) {
  console.log(a);
  var a = 1;
  console.log(a);
  function a() {}
  console.log(a);
  var b = function () {};
  console.log(b);
  function d() {}
}
test(2); // ƒ a(){} 1 1 ƒ (){}// AO activation object 活跃对象 函数上下文// 1、寻找形参和变量声明// 2、实参值赋值给形参// 3、找函数声明 赋值// 4、执行// AO = {//	a:undefined-->2-->function a(){}-->1//  b:undefined-->function(){}//  d:function d(){}// }
```

>

```js
console.log(a); //function a(){...}var a = 1;function a() {  console.log(2);}// GO global object 全局上下文// 1、寻找变量// 2、找函数声明// 3、执行// GO = {//	a:undefined-->function a(){}    -->1// }// GO === window
```

>

```js
function test() {
  var a = (b = 1);
  console.log(a);
}
test();
console.log(a, b); //err 1 // b被挂载到全局变量window上了// GO = {// 	b:1// }// AO = {//	a:undefined-->1// }
```

>

```js
var b = 3;
console.log(a);
function a(a) {
  console.log(a);
  var a = 2;
  console.log(a);
  function a() {}
  var b = 5;
  console.log(b);
}
a(1); //function a(a){...}	function a(){}	2	5// GO = {// 	b:undefined-->3//	a:function a(a){...}// }// AO = {//	a:undefined-->1-->function a(){}-->2//	b:undefined-->5// }// AO里面有值就不会去GO里面查找即使是undefined
```

> 函数的作用域链上 永远都会挂载`GO` 当函数执行时（前一刻，预编译时） 函数的`AO`便会挂载在作用域链的首位

```js
function a() {
  function b() {
    function c() {}
    c();
  }
  b();
}
a(); // a定义 a.[[scope]] --> 0:GO// a执行 a.[[scope]] --> 0:a-->AO	1:GO//// b定义 b.[[scope]] --> 0:a-->AO	1:GO// b执行 b.[[scope]] --> 0:b-->AO	1:a-->AO	2:GO//// c定义 c.[[scope]] --> 0:b-->AO	1:a-->AO	2:GO// c执行 c.[[scope]] --> 0:c-->AO	1:b-->AO	2:a-->AO	3:GO//// c结束 c.[[scope]] --> 0:b-->AO	1:a-->AO	2:GO//// b结束 b.[[scope]] --> 0:a-->AO	1:GO	c.[[scope]]销毁//// a结束 a.[[scope]] --> 0:GO	b.[[scope]]销毁//
```

#### 闭包

##### 关于闭包

- 定义在一个函数内部的函数

- 闭包就是在函数里面声明函数并返回，当一个函数能够访问和操作另一个函数作用域中的变量时（即作用域链），就构成了一个闭包
- 闭包就是能够读取其他函数内部变量的函数。在`JS`中，只有函数内部的子函数才能读取局部变量。

**作用**

- 可以读取函数内部的变量，让这些变量的值始终保持在内存中，不会被垃圾回收机制回收

**优点**

- 使用闭包可以隐藏变量以及防止变量被篡改和作用域的污染，从而实现封装

**缺点**

- 缺点就是由于保留了作用域链，会增加内存的开销。因此需要注意内存的使用，并且防止内存泄露的问题
  - 在退出函数之前，将不使用的局部变量全部删除。

**闭包案例**

- 模块化
- 防抖和节流
- 函数柯里化
- 匿名自执行函数
- 缓存计算比较复杂的函数的结果
- 封装

```js
// 当内部函数被返回到外部并保存时，一定会产生闭包。闭包会产生原来的作用域链不释放，过度的闭包可能会导致内存泄漏，或加载过慢。function outer() {  var count = 0; //这个变量外部不可直接使用（可理解为受保护变量）  return function () {    count++; //通过内部函数操作受保护变量    console.log(count);  };}var inner = outer(); //调用外部函数获取内部函数inner(); //调用内部函数操作受保护变量
```

- 函数作为返回值

```js
function create() {  const a = 100;  return function () {    console.log(a); // a是自由变量  };}const fn = create();const a = 200;console.log(fn()); //100
```

- 函数作为参数被传递

```js
function print(fn) {  const a = 200;  fn();}const a = 100;function fn() {  console.log(a); // a是自由变量}console.log(print(fn)); //100// 所有的自由变量的查找，是在函数定义的地方，向上级作用域查找  而不是在执行的地方！！！
```

`ref`

- [闭包，看这一篇就够了——带你看透闭包的本质，百发百中](https://blog.csdn.net/weixin_43586120/article/details/89456183?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=1328626.21589.16154409814490145&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control)
- [对 JS 闭包的理解及常见应用场景](https://blog.csdn.net/qq_21132509/article/details/80694517?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=1328655.9588.16158629577837531&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)

## 关于 This

- `this`是`JS`的一个关键字 是当前环境执行期上下文对象的一个属性
- **`this` 的取值是在函数执行的时候决定的而不是在函数定义的**
- 全局 => `window`
- 类 构造函数 => 实例对象
- `call apply bind` => 传入什么绑定什么
- 作为对象方法被调用 => `this` 指向上级对象
- 在`class` 方法中调用 => 返回当前实例本身
- 箭头函数 => 找它上级作用域 `this` 的值来决定
- **箭头函数中的`this`是在定义函数的时候绑定，而不是在执行函数的时候绑定。继承的是父执行上下文里面的`this`**

#### 全局作用域

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

#### 对象

- `this` 总是指向**调用这个函数的对象**

```js
const obj = { a: 1 };

Object.defineProperty(obj, 'a', {
  get: function () {
    console.log(this); // obj
  },
});
```

#### 构造函数

- `this` 指向新创建的对象

```js
function Test() {
  this.a = 1;
  console.log(this);
}

const test = new Test(); // Test {a: 1}
```

#### 回调函数

```js
let arr = [1, 2, 3];
arr.forEach(function () {
  console.log(this); // window
});

setTimeout(function () {
  console.log(this); // this 指向 Window
});
```

#### 箭头函数

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

#### 事件处理函数

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

`ref`

- [【全网首发:已完结】『this 指向问题』全解析【面试开发必备知识】](https://www.bilibili.com/video/BV1qp4y1Y7yQ)
- [深入理解 ES6 箭头函数中的 this](https://zhuanlan.zhihu.com/p/26475137)
- [JS 中的箭头函数与 this](https://juejin.cn/post/6844903573428371464)
- [babel 转译](https://babeljs.io/repl)
- [this 关键字](https://wangdoc.com/javascript/oop/this.html)

## 函数

一个函数接收另一个函数做为参数，或者返回另一个函数，都是高阶函数

```js
function func(a, b) {}
console.log(func.name, func.length); // func 2
```

#### 定义函数

- 函数声明：`function fn(){}`
- 函数表达式：`let fn = function(){}`

区别：

- 通过 `var` 定义函数表达式 会使得变量提升为 `undefined`
- 函数声明会在代码执行前预加载，而函数表达式不会

#### 参数

- 形参&实参

```js
function test(a, b) {
  console.log(test.length);
  console.log(arguments.length);
}
test(1, 2, 3, 4); //2	4

//arguments 是一个js的关键字 代表传递进来的所有参数  是一个类数组

//函数内部可以更改实参的值
```

- 默认参数

```javascript
function greeting(name = 'honjay') {  console.log('hello ' + name);}greeting();//对于多个参数function greetingWeather(name = 'honjay', weather) {  console.log('hello ' + name + 'today weather: ' + weather);}greetingWeather(undefined, 'sunny'); //使用undefined 只修改第二个参数
```

##### 斐波那契数列

- 正常递归

```js
function fn(n) {
  if (n == 1 || n == 2) return 1;
  return fn(n - 1) + fn(n - 2);
}
console.log(fn(5));
```

- 尾递归优化

```js
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2;
  }

  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
```

##### 阶乘

- 正常递归

```js
function fn(n) {
  if (n == 1) return 1;
  return n * fn(n - 1);
}
console.log(fn(5));
```

- 尾递归优化

```js
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1); // 120
```

#### 函数柯里化

- 柯里化：把接收多个参数的函数变换成接收一个单一参数的函数
- 函数柯里化思想：预处理，降低通用性，提高适用性
- 柯里化是一种函数式编程的技术
- 只传递给函数一部分参数来调用它，并返回一个函数去处理剩下的参数

> 实现`add(1,2,3) = add(1)(2)(3)`

```javascript
function add() {
  var args = [...arguments];

  var fn = function () {
    var arg_fn = [...arguments];
    return add.apply(null, args.concat(arg_fn));
  };

  fn.valueOf = function () {
    return args.reduce((a, b) => a + b);
  };

  return fn;
}

console.log(add(1, 2, 3, 4));
console.log(add(1)(2)(3)(4));
console.log(add(1)(2, 3)(4));
```

#### 函数式编程

- 独立于程序状态或全局变量，只依赖于传递给它们的参数进行计算
- 限制更改程序状态，避免更改保存数据的全局对象
- 对程序的副作用尽量小

#### 立即执行函数

```js
IIFE
Immediately Invoked Function Expression
;(function (){})()

独立的作用域
执行完成以后 自动销毁
模拟模块化 向外抛出属性 和 方法
```

#### 箭头函数区别

- 箭头函数没有原型 `(prototype)` 所以箭头函数本身没有 `this`
- 箭头函数里面的`this`指向继承自外层第一个普通函数的`this`
- `call、apply、bind` 无法改变箭头函数中`this`的指向
- 箭头函数不能作为构造函数使用
- 箭头函数没有自己的`arguments`对象 通过`rest ...`来获取参数

## Function

#### 关于构造函数

##### `return this`

- 相对于普通函数，构造函数中的`this`是指向实例的，而普通函数调用中的`this`是指向`windows`的

- 构造函数里默认隐式返回`this`，或者手动返回`this` 这个`this`指向的新对象构造都是成功的
- 如果`return` 简单数据类型 会忽略
- 如果`return Object` 不再返回`this`对象 返回`Object`

##### `Function`

- 每个 `JavaScript` 函数实际上都是一个 `Function` 对象
- `(function(){}).constructor === Function // true`

```js
// const test = new Function("a", "b", "c", "console.log(a+b+c)");
const test = new Function('a, b, c', 'console.log(a+b+c)');
test(1, 2, 3); // 上述两种发放都能返回 6

var t1 = new Function('console.log("t1")');
var t2 = Function('console.log("t2")');
t1(); // t1
t2(); // t2

t1.__proto__ === Function.prototype; // true
Function.__proto__ === Function.prototype; // true
```

> `Function` 构造器与函数声明之间的不同

由 `Function` 构造器创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 `Function` 构造器创建时所在的作用域的变量。

```js
var x = 10;

function fn1() {
  var x = 20;
  return new Function('return x'); // 这里的 x 指向最上面全局作用域内的 x
}

function fn2() {
  var x = 20;
  return function f() {
    return x; // 这里的 x 指向上方本地作用域内的 x
  };
}

console.log(fn1()()); // 10
console.log(fn2()()); // 20
```

##### 构造函数题目

```js
function Foo() {
  // 没用 var 声明，全局变量赋值
  // 如果Foo没有执行 那么下面的赋值行为肯定是不会执行的
  getName = function () {
    console.log(1);
  };
  // console.log(this); // window
  return this;
}
// 函数Foo上的静态方法 -> 一个函数对象上的静态方法/属性
Foo.getName = function () {
  console.log(2);
};
// 扩展函数原型上的方法
// var foo = new Foo() ->foo.getName
// new Foo.getName
Foo.prototype.getName = function () {
  console.log(3);
};
// 给全局变量赋值为一个匿名函数
var getName = function () {
  console.log(4);
};
// 函数声明
function getName() {
  console.log(5);
}
/**
 * GO{
 *    getName:
 *      undefined ->
 *      function getName () {} ->
 *      function(){console.log(4)}
 * }
 */
Foo.getName(); // 2 执行Foo函数上的静态方法
getName(); // 4 函数声明优先级高于函数表达式 但是函数表达式后面又覆盖掉函数声明
Foo().getName(); // 1 Foo() 返回的 window.getName()
getName(); // 1
new Foo.getName(); // 2 访问
new Foo().getName(); // 3
new new Foo().getName(); // 3
```

##### `demo`

```js
class Father {
  // constructor() {
  //   // 目的：让函数内部的this指向固定
  //   this.eat = this.eat.bind(this)
  // }
  get fruit() {
    return 'apple';
  }
  eat() {
    console.log('I am eating an ' + this.fruit);
  }
}

class Son {
  get fruit() {
    return 'orange';
  }
}

const father = new Father();
const son = new Son();

father.eat();
son.eat = father.eat;
son.eat();

// 如果想让 son 也输出 I am eating an apple 呢
// -> 在Father的构造器里面设置this.eat
```

#### 静态方法 实例方法

- 实例方法
  - 通过对象原型定义 引用实例来调用
- 静态方法
  - 直接定义 直接调用

```js
function Fn() {
  this.hello = function () {
    console.log('实例方法');
  };
}

Fn.hello = function () {
  console.log('静态方法');
};

Fn.prototype.hello = function () {
  console.log('实例共享方法(对象方法)');
};

Fn.hello(); // 静态方法
new Fn().hello(); // 实例方法 || 实例共享方法(对象方法)
new Fn.hello(); // 静态方法
```

##### QA

- 为什么静态方法不能使用 `this` ？

  - 因为`this`代表的是调用这个函数的对象的引用，而静态方法是属于类的，不属于对象，静态方法成功加载后，对象还不一定存在

- 为什么要有静态方法？
  - 有些东西是不需要实例的，只要有类就存在的，比如`Array.isArray(obj);`
    - `eg:` 判断一个对象是不是数组，如果这个方法是数组实例才有的，那就无法判断了。

## 面向对象

#### `new` 的过程

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码。

```js
function _new(constructor, params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数  将新创建的对象作为This的上下文
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return typeof result === 'object' && result != null ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);
```

#### `instanceof`

`result = variable instanceof constructor ==> return boolean`

`instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

```js
function instanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype
  // 获得对象的原型
  left = left.__proto__
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}
```

#### 继承

> 典型的面向对象语言都是通过 `class` 类来继承，而 `JavaScript` 基于构造函数`(constructor)`和原型链`(prototype)`

- 构造函数：就是专门用来生成实例对象的函数
- 通过构造函数构造出来的实例，共有构造函数的属性或者方法，但是方法生成在实例对象上，这样就会导致每生成一个实例就新建一个方法造成资源的浪费，因此就出现了`prototype`使得每个实例都可以继承对应的方法。
- 原型对象的所有属性和方法，都能被实例对象共享

> 六种继承的演变

- 原型链继承

```js
// 父类 引用值会被子类共享 P242
// 创建实例时不能传递参数
function Parent() {
  this.colors = ['red', 'pink'];
}
function Child() {}
Child.prototype = new Parent(); // 将 Child的 原型对象 指向 Parent 构造函数

let child = new Child();
child.colors.push('orange');
console.log(child.colors); // [ 'red', 'pink', 'orange' ]

let child2 = new Child();
console.log(child2.colors); // [ 'red', 'pink', 'orange' ]

/**
 * Child
 *  __proto__: Parent
 *    colors: []
 *    __proto__: Object
 *      constructor: f Parnet()
 *      __proto__: Object
 */
```

- 盗用构造函数

```js
// 为防止引用值被共享 在子类构造函数中调用父类构造函数
// 同时也可以在Parent.call(this, '') 传递参数
// 缺点：必须在构造函数中定义方法不能复用
function Parent() {
  this.colors = ['red', 'pink'];
}
function Child() {
  Parent.call(this); // 每个实例都会有colors属性
}
Child.prototype = new Parent();

let child = new Child();
child.colors.push('orange');
console.log(child.colors); // [ 'red', 'pink', 'orange' ]

let child2 = new Child();
console.log(child2.colors); // [ 'red', 'pink' ]

/**
 * Child
 *  colors: []
 *  __proto__: Parent
 *    ...
 */
```

- 组合继承

```js
// 结合原型链 和 盗用构造函数
// 会调用两次父构造函数 一次设置子类型实例原型 一次创建子类型实例

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'pink'];
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();

let child = new Child('jack', 18);
```

- 原型式继承

```js
// 还是得考虑引用值的问题

function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: 'John',
  age: 18,
};
let person2 = Object.create(person, {
  age: 20,
});

console.log(person2); // { name: 'John', age: 20 }
```

- 寄生式继承

```js
// 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
// 难以复用
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log('hi');
  };
  return clone;
}
```

- 寄生式组合继承

```js
function inherit(Child, Parent) {
  let prototype = Object.create(Parent.prototype); // 创建对象
  prototype.constructor = Child; // 增强对象
  Child.prototype = prototype; // 赋值对象
}
/**
 * 创建父类原型的一个副本
 * 给返回的prototype对象设置constructor属性 解决由于重写原型导致默认constructor丢失问题
 * 将新创建的对象赋值给子类型的原型
 */

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'pink'];
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();
// inherit(Child, Parent)

let child = new Child('jack', 18);
```

- ES6 class
  - 类本质上就是函数
  - 类中是严格模式

```js
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类的constructor
    this.age = age;
  }
}

var child = new Child();
```

#### 构造函数 原型对象 实例对象

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.getAge = function () {};

const ali = new Parent('alibb');

/**
 * 构造函数 Parent
 * 原型对象 Parent.prototype [getAge()  constructor  __proto__]
 * 实例对象 ali
 *
 * 每个构造函数都有一个原型对象  Parent.prototype
 * 原型对象都包含一个指向构造函数的指针  => constructor
 * 实例都包含一个指向原型对象的内部指针  => __proto__
 */
ali.constructor === Parent; // 实例对象的构造器 指向 构造函数

Parent.prototype.constructor === Parent; // 原型对象的构造器 指向 构造函数

ali.__proto__ === Parent.prototype; // 实例对象的隐式原型 指向 原型对象
```

#### 原型和原型链

对应名称：`prototype 原型` `__proto__ 原型链（链接点）`

从属关系

- `prototype` -> 函数的一个属性: 对象 {}
- `__proto__` -> 对象 Object 的一个属性: 对象
- 对象的`__proto__`保存着(指向)该对象的构造函数的`prototype`

- 构造函数通过 new 生成实例

```js
function Test() {}
const test = new Test();

Test.prototype === test.__proto__; // true
Test.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__; // null
Object.getPrototypeOf(Object.prototype); // null

// prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数
Test.prototype.constructor === Test; //true

// test.constructor -> 实例化test对象的构造函数
test.constructor === Test; // true
test.constructor === Test.prototype.constructor; // true

// constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

// 修改原型对象时，一般要同时修改constructor属性的指向
```

##### 原型链

```js
function Test() {
  this.a = 1;
}
Test.prototype.b = 2;

Object.prototype.c = 3;
const test = new Test();
console.log(test);
/**
 * new Test(){
 *  a: 1,
 *  __proto__: Test.prototype = {
 *    b: 2,
 *    __proto__: Object.prototype = {
 *      c: 3
 *    }
 *  }
 * }
 */
```

`Function & Object`

- `prototype`是构造器 / 函数才具有的属性
- `JS`内置构造器的有如下所示：
  - `Object,Number,Boolean,String,Array,RegExp,Date,Function,Error, Math,JSON`
  - 其中`Math`和`JSON`是以对象形式存在的，无需`new`便可创建
  - `Math`和`JSON`对象的原型是`Object.prototype`
  - 上面其他的原型是`Function.prototype`

```js
// Function Object 函数 对象
Test.__proto__ === Function.prototype; // true

// const Test = new Function()
Function.__proto__; // ƒ () { [native code] }
Function.prototype; // ƒ () { [native code] }
Function.__proto__ === Function.prototype; // true

// const obj = {}
// const obj = new Object() // function
Object.__proto__ === Function.prototype; // true
Object.__proto__ === Function.__proto__; // true

Math.__proto__ === Object.prototype; // true
JSON.__proto__ === Object.prototype;
```

`hasOwnProperty in instanceof`

```js
// hasOwnProperty 是否是对象自身的属性 才为true
test.hasOwnProperty('a'); //true
test.hasOwnProperty('b'); //false

// in 在自己对象所在的原型链上有的属性 就是true
'a' in test; // true
'c' in test; // true
// 我们常常使用 in 的这种特性来判断当前页面所处的环境是否在移动端
// 特性检测，只有移动端环境才支持touchstart 事件
var isMobile = 'ontouchstart' in document;

// instanceof 判断一个引用类型（数组、对象、函数）是否是某个构造函数的方法
test instanceof Test; //true
```

##### `call、apply、bind`

```js
function fn(name, age) {
  console.log(name, age);
  console.log(this); // { x: 100 }
}
fn.call({ x: 100 }, 'zhang', 18);

let fn = function (name, age) {
  console.log(name, age);
  console.log(this);
}.bind({ x: 100 });
fn('zhang', 18);
```

## 异步

### 一些思考

#### 同步和异步的区别

- `js` 是单线程语言，执行代码是同步方式
- 异步不会阻塞代码执行
- 同步会阻塞代码执行 `(alert)`

#### 单线程和异步

- `JS`是单线程语言，只能同时做一件事
- 浏览器和 `nodejs` 已支持`JS`启动进程，如 Web Worker
- `JS` 和 `DOM` 渲染共用同一个线程，因为 `JS` 可修改`DOM`结构

- 遇到等待(网络请求,定时任务)不能卡住
- 需要异步
- `callback`回调函数形式

#### 前端使用异步的场景有哪些？

- 网络请求：如 `ajax` 、图片加载

  ```js
  // ajax
  $.get('./data.json', function (data) {
    console.log(data);
  });
  
  // 图片加载
  let img = document.createElement('img');
  img.onload = function () {
    console.log('loaded');
  };
  img.src = '/xxx.png';
  ```

- 定时任务：如 `setTimeout` `setInterval`

  ```js
  var timer = setTimeout(() => {}, 1000); // 一次
  setInterval(() => {}, 1000); // 循环
  
  clearTimeout(timer); // 可以在执行前取消定时器
  ```

- 事件绑定

  ```js
  let input = document.getElementsByTagName('input')[0];
  input.addEventListener('keyup', () => {
    console.log('keyup');
  });
  ```

#### 题目

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

### Promise

图源：[MDN 官网](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<img src="https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/promises.png" />

#### 关于`promise`

- 异步问题同步化解决方案
- 解决异步流程化的一种手段
- `ES6` 新增的语法，用同步的编码方式来处理异步代码，解决旧时代用回调函数来解决异步的问题，一定程度避免了回调地狱。

##### promise 三种状态

- `pending fulfilled rejected`
- `pending --> fulfilled`
- `pending --> rejected`
- 变化不可逆

##### 状态的表现

- `pending` 状态，不会触发 `then` 和 `catch`

- `fulfilled` 状态，会触发后续的 `then` 回调函数

- `rejected` 状态，会触发后续的 `catch` 回调函数

##### then 和 catch 对状态的影响

- `then` 正常返回 `fulfilled`，里面有报错则返回 `rejected`

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

- `catch` 正常返回 `fulfilled`，里面有报错则返回 `rejected`

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

##### 三种状态转变的题目

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

##### 同步执行 异步调用

- `promise`构造函数是同步执行的，`then`方法是异步执行的。

```js
// Promise 构造函数 需要new
// Promise 参数    executor 执行器
// executor -> resolve reject  函数
// executor  new Promise 调用

// executor 是同步执行
let promise = new Promise((resolve, reject) => {
  // resolve('succ')
  reject('error');
});
// then 异步调用
promise.then(
  res => {
    console.log('Then');
    console.log(res);
  },
  err => {
    console.log(err);
  }
);

console.log('Global'); // Global -> Then
```

#### 创建 promise

```javascript
// resolve执行成功。reject执行失败
// 参数==>函数(resolve,reject)(这两个参数本身又是函数)(如果没有错误处理只写resolve)
new Promise(参数);
new Promise(() => {});

var promise = new Promise(resolve => {
  setTimeout(() => {
    resolve('ex success');
  }, 2000);
});
//完成回调
promise.then(value => console.log(value));
console.log('ex before promise');

//捕获异常
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('ex failed');
  }, 2000);
});
//完成回调
//promise.then(value =>console.log(value));
promise.catch(error => console.log(error));
console.log('ex before promise');
```

#### promise 链式调用

- 因为 `then catch all race`等等所有的 `promise` 的 `api` 的返回值是新的 `promise` 对象

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1);//1  11
    reject('failed'); //failed
  }, 1000);
})
  .then(value => {
    console.log(value);
    //return new Promise((resolve) => resolve(value + 10))
    return Promise.resolve(value + 10); //简写
  })
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  });
```

#### `Promise.race()`

- 谁先完成就返回谁的`promise`结果 无论`fulfilled`还是`rejected`
- 可以用来测试资源或者接口的响应速度

#### `Promise.all()`

- 多个 `promise` 同时执行

- 更适合彼此相互依赖或者在其中任何一个`reject`时立即结束

- `Promise.all([]).then()`

  参数：`interable`类型的数据 -> `Array Set Map`

  功能：多个异步任务并发进行，会等待所有任务结果的完成，并按传入顺序依次输出

  - `interable`内部元素传递的是`promise`对象集合。如果不是`promise`，直接返回 `Promise.resolve`(数组里面的内容)。如果`interable`内部没有集合元素 返回空数组
  - 如果其中有一个`promise`返回的是`rejected`状态 -> 实例回调`rejected` 并且只返回第一个失败的

```js
var p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
var p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
var p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(3);
  }, 500);
});
Promise.all([p1, p2, p3]).then(values => {
  console.log(values);
}); //[1,2,3] 按照数组中的顺序执行而不是timeout
```

#### `Promise.allSettled()`

- 当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个`promise`的结果时，通常使用它
- 返回一个在所有给定的 promise 都已经`fulfilled`或`rejected`后的`promise`，并带有一个对象数组，每个对象表示对应的`promise`结果

### `async & await`

#### async/await 和 Promise 的关系

- `async await`和 `Promise` 并不互斥 两者相辅相成
- `Promise then catch` 链式调用，但也是基于回调函数
- `async/await` 是同步语法，彻底消灭回调函数

- `async` 同步代码样式执行异步 本质是 `promise`

- `async await` 优缺点
  - 优点：处理 `then` 的调用链，能够更清晰准确的写出代码
  - 缺点：滥用 `await` 可能会导致性能问题。因为 `await` 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性

#### 关于`async await`

- 配合解构赋值解析数据请求

- 执行 `async` 函数，返回的是 `Promise` 对象
- 可以把 `async` 看成将函数返回值使用 `Promise.resolve()` 包裹了下

```js
async function fn() {
  return 100; // 相当于 return Promise.resolve(100)
}
// fn() // Promise {<fulfilled>: 100}

(async function () {
  const a = fn();
  const b = await 100;
  const c = await fn();
  const d = await Promise.resolve(100);
  console.log(a, b, c, d); // Promise { 100 } 100 100 100
})();
```

- `await` 相当于 `Promise` 的 `then`

```js
(async function () {
  const p1 = Promise.reject('Error1'); // rejected
  const res = await p1; // await -> promise.then
  console.log(res); // 报错了
})();
```

- `try...catch` 可捕获异常，代替了`Promise` 的 `catch`

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

- `await` 会阻塞后面的同步代码

```js
function sleep() {
  return new Promise(resolve => {
    console.log('start');
    setTimeout(() => {
      console.log('finish');
      resolve('sleep');
    }, 2000);
  });
}
async function test() {
  let value = await sleep();
  console.log('object');
}
test();
console.log('end');

// => start end 暂停2000ms 再打印 finish object
// 首先调用test()  await 会等待 sleep()  resolve
// 执行sleep()中同步代码 start 由于setTimeout 是异步代码 加入宏任务队列 等待执行完 同步代码end 后再去调用 执行 finish 以及 object
// await 会阻塞test() 后面的同步代码
```

#### 图片加载例子对比

```js
const url1 = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/photo.ico';
const url2 = 'https://cdn.jsdelivr.net/gh/honjaychang/icopicture/favicon.ico';

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
```

- `promise`

```js
// 加载1张图片
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

// 加载多张图片
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

- `async`

```js
(async function () {
  // 同步的语法
  const img1 = await loadImage(url1);
  const img2 = await loadImage(url2);
  console.log(`img1 - width: ${img1.width} \nimg2 - width: ${img2.width}`);
  document.body.appendChild(img1);
  document.body.appendChild(img2);
})();
```

### `Event Loop`

#### 宏任务和微任务

- 宏任务: `setTimeout` `setInterval` ` Ajax` `DOM事件` `回调` `I/O操作`

- 微任务: `nextTick` `Promise` `async/await`

- 同一次事件循环中，微任务执行时机比宏任务要早

- 从 `event loop` 解释，为何微任务执行更早
  - 微任务是 ES6 语法规定的 宏任务是由浏览器规定的

#### DOM 事件和 event loop

- `JS`是单线程的 异步 `(setTimeout ajax等)` 使用回调，基于 `event loop`

- `DOM` 事件也使用回调，基于 `event loop`
- `JS`是单线程的，而且和`DOM`渲染共用一个线程

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

#### Event Loop

`Ref`

- [事件循环学习笔记](https://juejin.cn/post/6958460865905590285#comment)

- 事件循环 事件轮询

- `JS`是单线程运行的，异步要基于回调来实现
- `event loop` 就是异步回调的实现原理

##### Event Loop 流程

- 首先执行同步代码，压入调用栈中，如果遇到微任务、宏任务放到对应队列中等待
- 当同步代码全部执行完成后，`call stack`此时为空，执行当前的微任务
- 开始更新`DOM`结构 尝试`DOM`渲染
- 最后触发`event loop`去宏任务队列，依次如上执行

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

#### 宏任务和微任务区别

- 宏任务: DOM 渲染后触发，如 `setTimeout`

- 微任务: DOM 渲染前触发，如 `Promise`

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

通过`alert` 阻断 观察页面`dom`渲染变化 => 微任务 --> DOM 渲染 --> 宏任务

- 宏任务队列一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务

- 微任务队列中所有的任务都会被依次取出来执行，直到微任务队列为空

- 在执行完所有的微任务之后，执行下一个宏任务之前，浏览器会执行 UI 渲染操作、更新界面

### 题目

```js
setTimeout(function () {
  console.log(1);
});
Promise.resolve(function () {
  console.log(2);
}); // .then(val => val())
new Promise(function (resolve) {
  console.log(3);
  resolve();
}).then(function () {
  console.log(4);
});
console.log(5);
// =>  3 5 4 1
```

- 先执行同步代码 再执行微任务代码 最后执行宏任务代码

```js
// Promise.resolve 只是返回一个 fulfilled 状态的 Promise，
// 然后向下一个链式调用 then 传递了一个 function () {console.log(2)}
// 所以需要增加链式调用 .then((value) => value()),
// 这样处理这样才会输出 2 // 35241
```

>

```js
var a = 0;
var b = async () => {
  a = a + (await 10);
  console.log('2', a); // -> '2' 10
  a = (await 10) + a;
  console.log('3', a); // -> '3' 20
};
b();
a++;
console.log('1', a); // -> '1' 1

// => '1' 1  '2' 10  '3' 20
```

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为在 `await` 内部实现了 `generators` ，`generators` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来
- 因为 `await` 是异步操作，遇到`await`就会立即返回一个`pending`状态的`Promise`对象，暂时返回执行代码的控制权，使得函数外的代码得以继续执行，所以会先执行 `console.log('1', a)`
- 这时候同步代码执行完毕，开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 10`
- 然后后面就是常规执行代码了

> Byte

```js
try {
    (async function() { a().b().c() })()
} catch (e) {
    console.log(`执行出错：${e.message}`)
}

// 执行一个没有定义的函数会发生什么

// 在 async 内部发生报错会发生什么

// try catch 只能捕获同步代码的异常 因此答案就明了了。


因为我们执行了一个未定义的函数，所以会报错 a is not defind，又因为是在 async 中，所以报错信息会显示 in promise。最后 try cathch 只能捕获同步代码的抛错，因为是 async，所以走不到 catch 里面。
```

> Event Loop

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

console.log('script end'); // 5
// 同步代码执行完毕 --> event loop 中 call stack 被清空 --> 微 --> 宏
```

未完待续。。。
