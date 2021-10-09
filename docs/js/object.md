# JS 对象

## 对象

### 创建对象

```js
let obj1 = { name: 'obj1' }; // 字面量
let obj2 = new Object({ name: 'obj2' });

let M = function (name) {
  this.name = name;
}; // 构造函数
let obj3 = new M('obj3');

let p = { name: 'p' }; // Object.create
let obj4 = Object.create(p);
```

- 使用字面量 `{}` 创建的对象 形式上和 `new Object()` 没有区别，但并不相等

```js
const obj1 = { a: 10 };

const obj2 = new Object({ a: 10 });
const obj3 = new Object(obj1);

console.log(obj1 === obj2); // false 引用类型
console.log(obj1 === obj3); // true
```

- `Object.create(null)` 创建的对象没有原型
- `Object.create({..})`可以指定原型

```js
const obj1 = { a: 10 };

const obj2 = Object.create({ a: 10 });
const obj3 = Object.create(obj1);

console.log(obj2.__proto__ === obj1); // false
console.log(obj3.__proto__ === obj1); // true
```

### 基本操作

- `JS` 对象：若干个键值对
- 创建

```js
// JS中所有的键都是字符串，值是任意对象！
var person = {
  name: 'hello',
  age: 3,
};
```

- 对象赋值

```js
person.name = 'Honjay'; // person['name'] = 'Honjay'
// . 和 [''] 的区别
// 中括号运算符总是能代替点运算符，反之不行
// 如：属性名为 数字 含有空格 js关键字等等
```

- 动态添加 删除属性

```js
person.love = 'Fortnite';

delete person.love; // true
// delete 只会影响到对象自身的property 不会影响到原型链上的
```

- 遍历对象属性

```js
Object.keys(person) // ["name", "age"]
Object.values(person) // [ 'hello', 3 ]
Object.entries(person) // [ [ 'name', 'hello' ], [ 'age', 3 ] ]

for in

Object.getOwnPropertyNames(person) // [ 'name', 'age' ]
```

- `Object.assign()`
  - 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象
  - 返回目标对象

```js
Object.assign(target, ...sources);
```

- `Object.freeze(obj)`
  - 冻结对象 使得属性无法被改变 浅冻结
- `Object.is()`

```js
Object.is(val1, val2) // val1 === val2
// 两个特例
Object.is(NaN, NaN) -> true
Object.is(-0, +0) -> false (-0 === +0 //true)
```

#### `in instacnceOf`

```js
'age' in person // true
'toString' in person // 继承  true


instanceof
```

##### 判断空对象

- `for in` 遍历属性
- `JSON.stringify(data) === '{}'`
- `Object.keys(obj).length` 遍历属性、直接查看长度

> ECMAScript 委员会 对象操作 14 种

##### `Object.getPrototypeOf(obj)`

- 获取原型

```js
var obj = { a: 1, b: 2 };

obj.__proto__ === Object.prototype // true
Object.getPrototypeOf(obj) === Object.prototype // true
```

##### `Object.setPrototypeOf(obj)`

- 设置原型

```js
Object.setPrototypeOf(obj, { c: 3, d: 4 });
console.log(obj);
/**
 * obj.__proto__:
 *    {c:3, d:4}
 *    {c:3, d:4}.__proto__:
 *        Object.prototype
 *            Object.prototype.__proto__ === null
 */
```

##### `Object.getOwnPropertyNames(obj)`

- 获取自有属性

```js
var obj = { a: 1, b: 2 };
Object.getOwnPropertyNames(obj, { c: 3, d: 4 }); 
// ["a", "b"]
```

##### `obj.hasOwnProperty(x)`

- 判断是否是自身属性

```js
var obj = { a: 1, b: 2 };
obj.hasOwnProperty("a"); // true
```

##### `Object.prototype.isPrototypeOf(obj)`

- 检查一个对象是否是另一个对象的原型

```js
var A = {}
var B = Object.create(A)
var C = Object.create(B)
A.isPrototypeOf(B) // true
C.isPrototypeOf(A) // false
```



```js
// 3、获取对象的可拓展性 [[IsExtensible]]
var obj = { a: 1, b: 2 };
var extensible = Object.isExtensible(obj);
console.log(extensible); // true

Object.freeze(obj); // 冻结对象
var extensible2 = Object.isExtensible(obj);
console.log(extensible2); // false
obj.c = 3; // 不可修改
console.log(obj); // { a: 1, b: 2 }
delete obj.a; // 不可删除
console.log(obj); // { a: 1, b: 2 }
obj.a = 3; // 不可写
console.log(obj); // { a: 1, b: 2 }
for (let key in obj) {
  console.log(key); // a b
}

但是 freeze() 不会冻结嵌套的子对象，它所执行的是浅冻结。 
嵌套层还是可以修改删除和遍历的  
Object.seal(obj) 也是

复杂类型冻结的是指向堆内存存放数据的内存地址
所以引用类型中的深层数据并不受影响

// Object.seal(obj); // 封闭对象
// obj.c = 3; // 不可修改
// console.log(obj); // { a: 1, b: 2 }
// delete obj.a; // 不可删除
// console.log(obj); // { a: 1, b: 2 }
// obj.a = 3; // 可写
// console.log(obj); // { a: 3, b: 2 }
// for (let key in obj) {
//   console.log(key); // a b
// }
```



```js
// 5、禁止扩展对象[[ PreventExtensions]]
var obj = { a: 1, b: 2 };
Object.preventExtensions(obj);
obj.c = 3; // 禁止增加属性
console.log(obj); // { a: 1, b: 2 }

delete obj.a;
console.log(obj); // { b: 2 } 可以删除属性

// 6、拦截对象[[ DefineOwnProperty]]
Object.defineProperty();



// 8、[[GET]]
console.log("a" in obj); // true
console.log(obj.a); // 1

// 9、[[SET]]
obj.a = 3;
obj["b"] = 4;
console.log(obj); // {a: 3, b: 4}

// 10、[[DELETE]]
delete obj.a;
console.log(obj); // {b: 4}

var obj = { a: 1, b: 2 };

// 11、[[Enumerable]]
for (var k in obj) {
  console.log(obj[k]);
} // 1 2

// 12、获取键集合[[OwnPropertyKeys]]
console.log(Object.keys(obj)); // [ 'a', 'b' ]
```



### 解构赋值

- 使用解构赋值从对象中分配变量

```javascript
var post = {
  status: 200,
  data: {
    result: true,
  },
};

const { status, data } = post;
console.log(status, data); // 200 { result: true }

//利用别名
const { data: res } = post;
console.log(res); // { result: true }

//默认值
var [a, b = 2] = [1];
console.log(a, b); //1 2

//解构赋值+rest操作符实现重新分配数组元素
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
//等同于  Array.prototype.slice()
```

### `Object.defineProperty()`

- `Object.defineProperty() `方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
- 更加具体的去描述或设置一个对象内部属性的操作性

```js
var obj = {};
var newObj = Object.defineProperty(obj, 'a', { value: 1 });
newObj === obj // true
```

- 默认情况下 使用`Object.defineProperty()`添加的属性是不可修改的

```js
// 如：对上述由Object.defineProperty添加的a属性 进行重新赋值 删除 遍历都是无法获取的
obj.a = 2

delete obj.a // false

for (let key in obj) {
  console.log(key, obj[key])
}
```

- `Object.defineProperty(obj, prop, descriptor)`

关于`descriptor`

- 如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常。

```js
var obj = {};
Object.defineProperty(obj, 'a', {
  value: 1,
  configurable: true,
  enumerable: true,
  writable: true,
});
```

关于`descriptor`

- `configurable`: 当且仅当该属性的`configurable`为`true`时，该属性的描述符才能被改变，同时该属性也能从对应的对象上删除
- `enumerable`: 当且仅当该属性的`enumerable`为`true`时，该属性才会出现在对象的枚举属性中
- `writable`: 当且仅当该属性的`writable`为`true`时，该属性(即`value`) 才能被赋值运算符改变

> `getter setter` 数据劫持 实现私有变量

```js
var obj = {
  _a: 1
};
Object.defineProperty(obj, 'a', {
  // value: 1
  get() {
    return this._a;
  },
  set(newValue) {
    this._a = newValue;
  },
});
obj.a;
obj.a = 2;
```

### 深浅拷贝

- 浅拷贝只是将数据中存放的引用拷贝下来，但还是指向同一个存放地址
- 深拷贝将数据中所有的数据拷贝下来，而不是引用，修改拷贝下来的数据并不会影响原数据。

#### 为什么要进行拷贝

- 因为对象是引用类型，所以赋值时的操作仅是赋予相同的地址，当对其中一个对象进行操作时，就会影响另外一个对象。

#### 浅拷贝

- 使用原生的 `Object.assign()`

```js
let a = { age: 1 };
let b = Object.assign({}, a);
a.age = 2;
console.log(b.age); // 1
```

- 通过展开运算符`Array.from() | ...`来解决
  - `Array.from()` 只针对数组
  - `...` 数组对象都可以

```js
let a = { age: 1 };
let b = { ...a };
a.age = 2;
console.log(b.age); // 1
```

- 由于浅拷贝只拷贝一层，所以当遇到第二层为对象时又会出现引用类型 拷贝内存地址的问题

#### 深拷贝

- 使用原生的 `JSON.parse(JSON.stringify(object))`

```js
let a = { age: 1, jobs: { first: 'FE' } };
let b = JSON.parse(JSON.stringify(a));
a.jobs.first = 'native';
console.log(b.jobs.first); // FE
```

但是该方法也是有局限性的：

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象

##### 递归

```js
// null undefined Date RegExp
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // 如果obj是null 或者 obj不是对象和数组 就直接返回
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 初始化返回结果
  // let res = new obj.constructor();
  let res = obj instanceof Array ? [] : {};

  for (let key in obj) {
    // 保证key不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      res[key] = deepClone(obj[key]);
    }
  }
  return res;
}
```

由于`xxx.constructor()` 的隐式原型指向 `Object/Array.prototype` 那么我们就可以通过`new xxx.constructor()`的方法来创建对应的数据类型

```js
const obj = {};
const newObj = new obj.constructor();
newObj.a = 1;
console.log(obj, newObj); // {} {a: 1}

const arr = [];
const newArr = new arr.constructor();
newArr.push(1);
console.log(arr, newArr); // [] [1]

obj.constructor().__proto__ === Object.prototype; // true
arr.constructor().__proto__ === Array.prototype; // true

let res = new obj.constructor(); // 根据当前的constructor来决定生成数组还是对象
for (let key in obj) {
  res[key] = deepClone(obj[key]);
}
```

##### WeakMap

```js
Map 键名 -> 任意类型 {} []
WeakMap 键名 -> 对象

弱引用   方便垃圾回收机制
```

循环引用

```js
// 用 WeakMap 记录 当前是否存在 hashkey 如果存在就不用进行深拷贝 直接返回就好 
// Map也可以 只是WeakMap 弱引用 方便垃圾回收

function deepClone(obj = {}, hashMap = new WeakMap()) {
  if (typeof obj !== 'object' || obj == null) {
    // 如果obj是null 或者 obj不是对象和数组 就直接返回
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  const hashKey = hashMap.get(obj);

  if (hashKey) return hashKey;

  let res = new obj.constructor(); // 根据当前的constructor来决定生成数组还是对象
  hashMap.set(obj, res);
  for (let key in obj) {
    res[key] = deepClone(obj[key], hashMap);
  }
  return res;
}

let test1 = {};
let test2 = {};
test2.test1 = test1;
test1.test2 = test2;
console.log(deepClone(test2));
```

:::note Ref

- [ES6 系列之 WeakMap](https://segmentfault.com/a/1190000015774465)

:::



## `new` 

```js
// 只是一个函数
function Person(name) {
  this.name = name;
}
var fred = new Person('Fred'); // ✅ Person {name: 'Fred'}
```

**创建一个 `{}` 对象并把 `Person` 中的 `this` 指向那个对象，以便我可以通过类似 `this.name` 的形式去设置一些东西，然后把这个对象返回给我。**

这就是 `new` 操作符所做的事。

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码。

```js
// function _new(constructor, ...args) {
function _new() {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var obj = Object.create(constructor.prototype);
  // 执行构造函数  将新创建的对象作为This的上下文
  var res = constructor.apply(obj, args);
  // 如果返回结果是对象，就直接返回，否则返回 obj 对象
  return typeof res instanceof Object ? res : obj;
}

// 实例
var actor = _new(Person, '张三', 28);
```

## `instanceof`

`x instanceof Y` 沿着 `x.__proto__` 链寻找 `Y.prototype` 是否在那儿

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

## 继承

> 典型的面向对象语言都是通过 `class` 类来继承，而 `JavaScript` 基于构造函数`(constructor)`和原型链`(prototype)`

- 构造函数：就是专门用来生成实例对象的函数
- 通过构造函数构造出来的实例，共享构造函数的属性或者方法，但是方法生成在实例对象上，这样就会导致每生成一个实例就新建一个方法造成资源的浪费，因此就出现了`prototype`使得每个实例都可以继承对应的方法。
- 原型对象的所有属性和方法，都能被实例对象共享

> 六种继承的演变

### 原型链继承

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

### 盗用构造函数

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

### 组合继承

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

### 原型式继承

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

### 寄生式继承

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

### 寄生式组合继承

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

### ES6 class

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

`class` 作为构造函数的语法糖同时拥有 `__proto__`属 性和 `prototype` 属性，因此同时存在两条继承链:

- 子类的 `__proto__` 属性表示构造函数的继承，总是指向父类
  - `Child.__proto__ === Parent`
- 子类 `prototype` 属性的 `__proto__`属性表示方法的继承，总是指向父类的 `prototype` 属性
  - `Child.prototype.__proto__ === Parent.prototype`



## 构造函数 原型对象 实例对象

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.getAge = function () {};

const bob = new Parent('Bob');
```

 - 构造函数 `Parent`
 - 原型对象 
```js
Parent.prototype{
  getAge: ƒ ()
	constructor: ƒ Parent(name)
	[[Prototype]]: Object
}
```
 - 实例对象 `bob`
 - 每个构造函数都有一个原型对象 =>  `Parent.prototype`
 - 原型对象都包含一个指向构造函数的指针  => `constructor`
 - 实例都包含一个指向原型对象的内部指针  => `__proto__`

```js
// 实例对象的构造器 指向 构造函数
bob.constructor === Parent

// 原型对象的构造器 指向 构造函数
Parent.prototype.constructor === Parent

// 实例对象的隐式原型 指向 原型对象
bob.__proto__ === Parent.prototype
```

## 原型和原型链

> 函数和类的 `prototype` 属性 是用 `new` 调用那个类或函数生成的所有对象的 `__proto__`

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

### 原型链

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



![image-20211004175142864](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211004175143.png)

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    console.log('bark!!!');
  }
}

class Husky extends Dog {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  run() {
    console.log('run!!!');
  }
}

const husky = new Husky('husky', 2);
console.log(husky);

husky instanceof Husky
husky instanceof Dog
husky instanceof Object

[] instanceof Array
[] instanceof Object
{} instanceof Object

// class 实际上是属性，可见是语法糖
typeof Husky // 'function'
typeof Dog // 'function'

Husky.prototype.__proto__ === Dog.prototype

Object.prototype.__proto__ === null

`hasOwnProperty()` 判断是否是自己的属性
husky.hasOwnProperty('name') // true
husky.hasOwnProperty('run') // false 方法不行？
```

基于原型的执行规则

- 获取属性`husky.name`或执行方法`husky.bark()`时
- 先在自身属性和方法寻找
- 如果找不到则自动去`__proto__`中査找

[图源](https://clarkdo.js.org/javascript/2014/08/21/17/)

![jsobj_full](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/jsobj_full.jpg)

