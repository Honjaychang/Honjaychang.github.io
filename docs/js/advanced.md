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

所有的自由变量的查找，是在**函数定义**的地方，向上级作用域查找 而不是在执行的地方！！！

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
test(2); // ƒ a(){} 1 1 ƒ (){}

/*
 * AO activation object 活跃对象 函数上下文
 * 1、寻找形参和变量声明
 * 2、实参值赋值给形参
 * 3、找函数声明 赋值
 * 4、执行
 * AO = {
 		a:undefined-->2-->function a(){}-->1
 		b:undefined-->function(){}  
 		d:function d(){}
 	}
 */
```

>

```js
console.log(a); //function a(){...}
var a = 1;
function a() {  
  console.log(2);
}

/*
 * GO global object 全局上下文
 * 1、寻找变量
 * 2、找函数声明
 * 3、执行
 * GO = {
 		a:undefined-->function a(){}-->1
 	}
 * GO === window
 */
```

>

```js
function test() {
  var a = (b = 1);
  console.log(a);
}
test();
console.log(a, b); //err 1 // b被挂载到全局变量window上了

/*
 * GO = {
 		b:1
 	}
 * AO = {
 		a:undefined-->1
 	}
 */
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
a(1); //function a(a){...}	function a(){}	2	5

/*
 * GO global object 全局上下文
 * 1、寻找变量
 * 2、找函数声明
 * 3、执行
 * GO = {
 		b:undefined-->3
 		a:function a(a){...}
 	}
 * AO = {
 		a:undefined-->1-->function a(){}-->2
 		b:undefined-->5
 	}
 * AO里面有值就不会去GO里面查找即使是undefined
 */
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
a(); 

/*
 * a定义 a.[[scope]] --> 0:GO
 * a执行 a.[[scope]] --> 0:a-->AO	1:GO
 * 
 * b定义 b.[[scope]] --> 0:a-->AO	1:GO
 * b执行 b.[[scope]] --> 0:b-->AO	1:a-->AO 2:GO
 * 
 * c定义 c.[[scope]] --> 0:b-->AO	1:a-->AO	2:GO
 * c执行 c.[[scope]] --> 0:c-->AO	1:b-->AO	2:a-->AO	3:GO
 * 
 * c结束 c.[[scope]] --> 0:b-->AO	1:a-->AO	2:GO
 *
 * b结束 b.[[scope]] --> 0:a-->AO	1:GO	c.[[scope]]销毁
 * 
 * a结束 a.[[scope]] --> 0:GO	b.[[scope]]销毁
 */
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
// 当内部函数被返回到外部并保存时，一定会产生闭包。
// 闭包会产生原来的作用域链不释放，过度的闭包可能会导致内存泄漏，或加载过慢。
function outer() {  
  var count = 0; //这个变量外部不可直接使用（可理解为受保护变量）  
  return function () {    
    count++; //通过内部函数操作受保护变量    
    console.log(count);  
  };
}
var inner = outer(); //调用外部函数获取内部函数inner(); //调用内部函数操作受保护变量
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
  const a = 200;  fn();
}
const a = 100;
function fn() {  
  console.log(a); // a是自由变量
}
console.log(print(fn)); //100
```

##### 实现私有变量

```js
var obj = function (initVal) {
  var p_val = initVal;
  this.get = function () {
    return p_val;
  };
  this.set = function (newValue) {
    p_val = newValue;
  };
};
const a = new obj(1)


var obj = (function (initVal) {
  var p_val = initVal;
  return {
    get: function () {
      return p_val;
    },
    set: function (newValue) {
      p_val = newValue;
    },
  };
})(1);
```

:::danger 

所有的自由变量的查找，是在函数定义的地方，向上级作用域查找  而不是在执行的地方！！！

:::

:::note Ref

- [闭包，看这一篇就够了——带你看透闭包的本质，百发百中](https://blog.csdn.net/weixin_43586120/article/details/89456183?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=1328626.21589.16154409814490145&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control)
- [对 JS 闭包的理解及常见应用场景](https://blog.csdn.net/qq_21132509/article/details/80694517?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=1328655.9588.16158629577837531&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)

:::

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

:::note Ref

- [【全网首发:已完结】『this 指向问题』全解析【面试开发必备知识】](https://www.bilibili.com/video/BV1qp4y1Y7yQ)
- [深入理解 ES6 箭头函数中的 this](https://zhuanlan.zhihu.com/p/26475137)
- [JS 中的箭头函数与 this](https://juejin.cn/post/6844903573428371464)
- [babel 转译](https://babeljs.io/repl)
- [this 关键字](https://wangdoc.com/javascript/oop/this.html)

:::

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
function greeting(name = 'honjay') {
  console.log('hello ' + name);
}
greeting(); 

//对于多个参数
function greetingWeather(name = 'honjay', weather) {  
  console.log('hello ' + name + 'today weather: ' + weather);
}
greetingWeather(undefined, 'sunny'); //使用undefined 只修改第二个参数
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

> 实现`add(1,2) = add(1)(2)`

```js
function add(...a) {
  return a.length > 1 
    			? a.reduce((a, b) => a + b) 
  				: (b) => a[0] + b;
}
// a -> [1] b -> 2
console.log(add(1, 2));
console.log(add(1)(2));
```

> 实现`add(1,2,3) = add(1)(2)(3)`

利用柯里化的思想，将输入参数存储到数组中，等到数组长度和设定好一样再求值

```js
const currying = (fn, len) => {
  return function curried(...arr) {
    if (arr.length >= len) {
      return fn(...arr);
    }
    return (...arr2) => curried(...arr, ...arr2);
  };
};

const add = currying((...arr) => arr.reduce((a, b) => a + b, 0), 4);
```

`valueOf`

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
- 构造函数里默认隐式返回`this`
- 如果手动返回`this` 或者 `return` 简单数据类型 会忽略 没有任何影响
- 如果`return Object` 不再返回`this`对象 返回`Object`

```js
function Dog(name, age) {
  this.name = name;
  this.age = age;
  return { name: age };
  // return 1; return this; 不写 都不影响
}

const dog = new Dog('a', 1);
console.log(dog); // { name: 1 }
// Dog { name: 'a', age: 1 }
```

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

