# JS 基础

:::note Ref

- [冴羽的博客](https://github.com/mqyqingfeng/Blog)
- [前端应该知道的 JavaScript 浮点数和大数的原理](https://zhuanlan.zhihu.com/p/66949640)

:::



### 浮点数精度问题

`ECMAScript` 中的 `Number` 类型使用 `IEEE754` 双精度格式存储整数和浮点数

- 64 个`bit`位来存储 => **1 个符号位+11 个指数位+52 个尾数位**

```javascript
// JS 的数字类型是浮点类型的，没有整型。
(1/3)===(1-2/3)
// false  // 避免使用浮点数进行计算 存在精度损失

// 浮点数转二进制计算

0.1 用二进制表示就是 0.00011001100110011……
在计算机存储下来时 就已经发生了精度丢失
toFixed
```

`BigInt`

- 值的范围`Number.MIN_VALUE&&Number.MAX_VALUE` `isFinite()`来判断一个数是不是有限大

```js
BigInt(10n);
let a = 10n;
```

`Number`类型的数字和`BigInt`类型的数字不能混合计算

`typeof null` 底层 000

`JavaScript`是解释型语言 单线程语言 支持面向对象 动态类型语言

动态类型语言是指在运行期间才去做数据类型检查的语言

静态类型语言的数据类型是在编译期间检查的

## 基础

- 严格检查模式

```js
'use strict'; //预防js的随意性而导致的一些问题  必须写在js文件第一行 ES5
```

- 三元表达式：`condition ? statement-if-true : statement-if-false;`

### `var let const`

- 局部作用域：
  - `var` 函数作用域 `let、const` 声明的是块级作用域
- var 是 ES5 语法，`let const` 是 ES6 语法；var 有变量提升
- 可否修改
  - `var、let` 声明的是变量，可以被修改
  - `const` 声明一个只读的常量 在声明的时候必须被赋值
- `var` 可以多次声明同一变量名，`let`不可以重复声明

#### 暂时性死区

- 暂时性死区”（`temporal dead zone`，简称 TDZ）
- 在代码块内，使用`let/const`命令声明变量之前，该变量都是不可用的
- 同时`typeof`也不再安全

```js
typeof x; // ReferenceError: x is not defined
let x;

typeof a; // undefined
```

#### class 不能变量提升

```js
const p = new Rectangle();
console.log(typeof p);

class Rectangle {}

//error   class 的定义不会提升，所以在new Rectangle()的时候会抛出错误。
```

## 数据类型

#### 数据类型

- 简单数据类型 => 原始类型:
  - `Undefined` `Null` `Boolean` `Number` `String` `Symbol`
  - 存放在 栈内
- 复杂数据类型 => 对象 => 引用类型: `Object`
  - 内存地址 栈 和 堆

#### 数据类型检测

##### 检测方法

- `typeof value`

  - 返回当前值的数据类型
  - 返回的都是字符串 `typeof(typeof(NaN)) ==> string`

- `instanceof` 判断一个对象是否是数据类型的实例

  ```js
  console.log(2 instanceof Number); // false
  console.log(new Number(2) instanceof Number); // true
  ```

- `constructor` 通过原型判断类型

  ```js
  console.log((2).constructor === Number); // true
  ```

  - `constructor` 能成功检测数据类型的前提是 原型没有被更改

- `Object.prototype.toString.call(value)` 精确检测数据类型

  - `[].toString.call(value)`
  - `[Object, String]`

##### `typeof`能判断哪些类型?

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
typeof function fun() {}; // 'function' 特殊引用类型，但不用于存储数据
```

- 判断是否是引用类型（不可再细分）

```js
typeof null; // 'object' 特殊引用类型，指针指向空地址
typeof [1, 2]; // 'object'
typeof { age: 18 }; // 'object'
```

#### Number

- 包括 `正数 负数 浮点数 0 +-Infinity NaN`
- `Number(value)` 将其他类型数据转为数字
- 如果参数无法被转换为数字，则返回 `NaN`

```js
// 下面三个也是js的全局内置对象
Number.parseInt(string, radix) // 从左向右解析 返回一个整数 或 NaN
Number.parseFloat(string) // 返回一个浮点数 或 NaN
Number.isNaN()

Number.MIN_SAFE_INTEGER -2^53+1
Number.MAX_SAFE_INTEGER 2^53-1
Number.isInteger() // 判断此参数是否为整数
Number.isSafeInteger()

Number(null) // 0
Number(undefined) // NaN

0/0 // NaN
1/0 // infinity
-1/0 // -Infinity
```

##### Number 的原型方法

- `Number.prototype.toFixed(digits)`

  - 返回包含指定小数点位数的数值字符串，不够补 0，多余四舍五入

  ```js
  var num = 12.3456;
  var numStr = num.toFixed(2); //保留两位小数==>12.34
  //typeof numStr	==>	String
  ```

- `Number.prototype.toString(radix)`

  - 返回指定 `Number` 对象的字符串表示形式
  - `radix` 默认为 10 可以用来二进制和十进制转换

  ```js
  var num = 10;
  console.log(num.toString()); // 10
  console.log(num.toString(2)); // 1010

  parseInt(num.toString(2), 2); // 10
  ```

- `Number.prototype.valueOf()`

  - 返回一个被 `Number` 对象包装的原始值

- 字符串转数字的方法

  - `Number(value)`
  - `* / -`
  - 单独使用`+` 而不是字符串拼接

  ```js
  let str = '12';
  let num = +str;
  console.log(typeof str, typeof num); // string number
  ```

- 数组里的字符串数字与数字互转

```js
// 字符串数字转数字
var arr = [1, 2, 3, 4, 5];
arr.map(String); // ['1', '2', '3', '4', '5']

// 数字转字符串数字
var arr2 = ['1', '2', '3', '4', '5'];
arr2.map(Number); // [1, 2, 3, 4, 5]
```

#### `null & undefined &NaN`

- `null` 空对象指针 对象的初始值 空对象的引用

```js
typeof null ==> 'object'
Object.prototype.toString.call(null) // [object Null]

null + '123' => 'null123'
null + 123 => 123
```

- `undefined` 未初始化变量 原始值的初始值 未定义
- `NaN` `not a number`

```js
Object.prototype.toString.call(NaN) // [object Number]
typeof NAN ==> 'number'

- NaN与任何值都不想等 NaN === NaN // false
- 只能通过 isNaN(NaN) 来判断这个数是否是NaN

isNaN(NaN) / isNaN('NaN') // true
isNaN(undefined) // true
isNaN() // true

isNaN(0) / isNaN('0') // false
isNaN('') // false
isNaN(null) // false

NaN 与任何数运算都返回NaN
1 + undefined
true + undefined
```

-

```js
undefined&null 既不大于0 也不小于0

undefined == null //true
undefined === null //false
```

##### 假值`false`

- `0 NaN '' false null undefined ==> false`

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

- 空数组和空对象对应的`bool`值都是`true` `{} []`

#### 类型转换

- 对象在转换基本类型时，首先会调用 `valueOf` 然后调用 `toString`
- 如果只改写 `valueOf()` 或是 `toString()` 其中一个，会优先调用被改写了的方法
- 当同时重写函数的 `toString` 方法与 `valueOf` 方法时，最终会调用`valueOf`
  - 重写的`valueOf`要比重写的`toString` 优先级高
  - 在 `valueOf()` 方法返回的是非原始类型的情况下再查询 `toString()` 方法

##### 强制类型转换

- `Number(null)==>0 Number('1a')==>NaN`
- `parseInt(string, radix)`
- ` parseFloat(string)`

##### 隐式类型转换

- ##### 字符串拼接 +

```js
const a = 100 + 10;
const b = 100 + '10';
const c = true + '10';
console.log(a, b, c); // 110 '10010' 'true10'
```

- `*/- ==> str -> num`

#### 运算符

- `=` 赋值操作符 --> 执行顺序是从右到左(把右边的结果赋值给左边)

- `==` 会先进行类型转换，然后再比较值
- `===` 会比较两个值的类型和值

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
if (obj.x == null) { }

if (obj.x === null || obj.x === undefined) { }
```

- 四则运算符

```javascript
// 只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。
// 其他运算只要其中一方是数字，那么另一方就转为数字。
1 + '1' // '11'
2 * '2' // 4

[1, 2] + [2, 1] // '1,22,1'
// [1, 2].toString() -> '1,2'
// [2, 1].toString() -> '2,1'
// '1,2' + '2,1' = '1,22,1'


'a' + + 'b' // -> "aNaN"


0/0	==> NaN
1/0	==> Infinity
```

- `&& ||`

```js
1 &&2 ==> 2 // 遇到真就往后走 遇到假或者走到最后就返回当前

1 || 2 ==> 1 // 遇到假就往后走 遇到真或者走到最后就返回当前

console.log(!window.abc) // true 		window.abc = undefined

a.onclick = function(e){
  var event = e || window.event;
}
```

- `~~`

```js
双非按位取反运算符
应该是截断吧，无论正数负数
~~1.1 -> 1
~~1.9 -> 1
~~-1.1 -> -1
~~-1.9 -> -1
```



#### `Symbol`

- 表示独一无二的值 符号是原始值，且符号实例是唯一、不可变的
- 符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

## 字符串

- `\` 转义字符
- `ECMAScript`中的字符串是不可变的，也就是说字符串一旦创建，他们的值就不能改变。要改变某个变量保存的字符串，首先要销毁原来的字符串，然后用另一个包含新值的字符串填充该变量

#### 多行字符串编写

```js
var msg = `hello
world
nihao`;
```

#### 模板字符串

```javascript
let name = 'honjay';
let msg = `nihao,${name}`;
console.log(msg); //nihao,honjay

`${condition ? :}` // 配合三元表达式
```

#### 方法

##### `substring substr`

- 都不修改原字符串

```js
//substring(start,end)    //返回位于 String 对象中指定位置的子字符串。
//substr(begin,length)
//[start,end)

str.substring(start, end);
```

根据字符获取字符串索引

- `indexof` : 该字符第一次出现的索引
- `lastIndexOf`: 该字符最后一次出现的索引 如果检测不到索引 则返回`-1`

##### 搜索字符串

- `includes()`: 搜索字符串是否包含另一个字符串
- `endsWith()`: 字符串是否是另一个字符串结尾
- `startsWith()`: 字符串是否是另一个字符串开始
- `search(regexp)`:搜索字符串是否匹配正则，有返回匹配的下标

##### 大小写转换

```javascript
str.toUpperCase();
str.toLowerCase();
```

##### `Ascii码 之间转换`

```javascript
String.fromCharCode(65); // A
String.fromCharCode(90); // Z

String.fromCodePoint(97); // a
String.fromCodePoint(122); // z

'A'.charCodeAt(); // 65
'a'.charCodeAt(); // 97

const sentence = 'The quick brown fox jumps over the lazy dog.';
const index = 4;
sentence.charCodeAt(index); ///113
sentence.charAt(index); //"q"
```

##### 字符串拼接

- `concat() / +`: 拼接多个字符串
- `repeat(times)`: 复制本身字符串并填充到本身
  - `str.repeat(2) =>'hello hello '`
- `padEnd()`: 用字符串从末尾填充字符串
- `padStart()`: 用字符串从开头填充字符串

```js
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padStart(4, 'ab'); // 'abax'
'x'.padEnd(5, 'ab'); // 'xabab'
'x'.padEnd(4, 'ab'); // 'xaba'
'abc'.padEnd(10); // "abc       "
'abc'.padEnd(10, 'foo'); // "abcfoofoof"
'abc'.padEnd(6, '123456'); // "abc123"
'abc'.padEnd(1); // "abc"
```

##### 去除空格

- 不改变原始字符串

- `trim()`: 去除字符串首尾的空格
- `trimStart() / trimLeft()`: 去掉字符串左侧(开头)的空格
- `trimEnd() / trimRight()`): 去掉字符串右侧(末尾)的空格

##### `replace() 替换`

## 数组

- `js`的数组可以存放不同类型的数据
- 改变`arr.length`的值 数组大小就会动态发生变化

```js
var arr = [1, 2, 3, 'hello', null, true];
```

### `创建数组`

```javascript
// 字面值
var arr1 = [1, 2, 3];
// 构造函数
var arr2 = new Array(4, 5, 6);
// 数组object
var arr3 = Array(7, 8, 9);
// Array.of 	ES6 新增static方法 
// 为了弥补 Array(n) -> 创建length 为 n 的数组
var arr4 = Array.of(10, 11, 12);

//如果创建的数组只有一个参数的时候用 arr1/arr4。其他两个代表的是数组的长度
```

> 判断变量是否数组

```js
function isArray(arr) {
  return arr instanceof Array;
}

arr.constructor === Array;

Object.prototype.toString().call();

Array.isArray();
```

### 方法

- 功能是什么？
- 返回值是什么？
- 是否会对原数组造成影响？

#### 纯函数 非纯函数

```js
// 纯函数		不改变源数组		返回一个数组
concat、join、map、filter、slice、replace

// 非纯函数
reverse、sort、splice、reduce、
push pop shift unshift
forEach
some every
```

- `Array.isArray()`

```js
let arr = [1, 2, 3];
Array.isArray(arr); // true
```

- `Array.from(arrayLike[, mapFn[, thisArg]])`
  - 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

```js
Array.from( { length: 4 } ); 
// [undefined, undefined, undefined, undefined]
```

`Array.from(..)` 检查第一个参数是否为 `iterable`，如果是的话，就使用迭代器 来产生值并“复制”进入返回的数组

#### `pop push unshift shift`

- 栈方法：`push(), pop()` 在栈顶操作 => 数组尾部操作
- 队列方法：`unshift(), shift()` 头部

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.pop(), arr); // 移除栈顶元素
// 5 [ 1, 2, 3, 4 ] 返回pop出的元素

console.log(arr.push(10), arr); // 向栈顶添加元素
// 6 [ 1, 2, 3, 4, 5, 10 ] 返回push后arr的长度

console.log(arr.shift(), arr); // 移除队列头部元素
// 1 [ 2, 3, 4, 5 ] 返回shift出的元素

console.log(arr.unshift(10), arr); // 向队列头部添加元素
// 6 [ 10, 1, 2, 3, 4, 5 ] 返回unshift后arr的长度
```

#### `slice splice`

- `slice: 切片` `splice: 剪接`

- `slice`既可以操作字符串也可以操作数组 `splice`只能操作数组
- `slice(start, end) [start, end)`
  - 类似于`String的substring()`

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.slice()); // [ 1, 2, 3, 4, 5 ]
console.log(arr.slice(2, 3)); // [ 3 ]
console.log(arr.slice(1)); // [ 2, 3, 4, 5 ]
console.log(arr.slice(-2)); // [ 4, 5 ]
```

- `arr.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

```js
//start	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//deleteCount	可选。要删除的项目数量。设置为 0，则不会删除项目。不设置则从index开始全删
//item1, ..., itemX	可选。向数组添加的新项目。

console.log(arr.splice(1, 4, 'a', 'b', 'c'), arr);
// [ 2, 3, 4, 5 ] [ 1, 'a', 'b', 'c' ]
```

#### `split join fill concat`

```javascript
const str = 'i am groot!'

console.log(str.split(' ')) // [ 'i', 'am', 'groot!' ] str->arr
console.log(str.split(' ').join('-')) // i-am-groot! arr->str

arr.fill(value[, start[, end]]) // [start, end)

arr.concat			//注意：concat()并没有修改数组，只是会返回一个新的数组
```

#### `toString() valueOf()`

- `valueOf()` 返回的还是数组本身。
- `toString() ` 返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串

```js
var arr = [1, 2, 3, 4];

console.log(arr.toString()); // '1,2,3,4'
console.log(arr.valueOf()); // [1, 2, 3, 4]
```

#### `find findIndex indexOf includes`

- `find() => return first value || undefined`
  - 只能在`Array`中使用
- `findIndex() => return first index || -1`
- `indexOf() => return first index || -1`
  - 可以不是单个字符
  - 可以接受第二个参数，确定查找的位置
  - `lastIndexOf()从后往前查找`
- `includes() => return true || false`
  - 可以接受第二个参数，确定查找的位置

```javascript
var arr = [1, 2, 3, 4, 5];
var above5 = arr.find(ele => ele > 5); // undefined
var below5 = arr.find(ele => ele < 5); // 1

var above5 = arr.findIndex(ele => ele > 5); // -1
var below5 = arr.findIndex(ele => ele < 5); // 0

var above5 = arr.indexOf(6); // -1
var below5 = arr.indexOf(3); // 2

var above5 = arr.includes(6); // false
var below5 = arr.includes(3); // true
```

#### `reverse sort`

- `sort()` 方法用**原地算法**对数组的元素进行排序，并返回数组
- `arr.sort([compareFunction])  =>  用来指定按某种顺序进行排列的函数` 默认是按 `ASCII` 码排列的

```javascript
let arr = [1, 3, 5, 0, 55, 6, 11];
arr.sort(); //0,1,11,3,5,55,6

arr.sort(function (a, b) {
  if (a < b) return a - b;
}); //0,1,3,5,6,11,55

arr.sort(function (a, b) {
  return a - b;
}); //0,1,3,5,6,11,55
arr.sort((a, b) => {
  return b - a;
}); //55,11,6,5,3,1,0

arr.sort(function (a, b) {
  return Math.random() - 0.5;
}); //随机

/*
 * 这个函数相当于一个委托(或许说谓词函数更为贴切一些)，因为要对数组排序，必然要涉及到两个数组成员的比较   
 * 这个函数为你提供一种选择，以改变默认的大小比较规则，排序结果根据这个规则进行比较
 * (函数返回值小于0认为是第一个元素小于第二个元素，等于0是两个元素相等，大于0则反之)。
 * 简单的改变这个函数，你就可以实现倒序排序。也可以对一个具有多个属性的对象进行排序。
 */
```

- 会原地排序原数组并返回原数组

```javascript
const arr1 = ['a', 'b', 'c'];
const arr2 = ['b', 'c', 'a'];
arr1.sort() === arr1; // true
arr2.sort() === arr2; // true
arr1.sort() === arr2.sort(); // false
```

#### `every() some()`

- `every()` 检测数组中所有元素是否**都**符合指定条件 满足返回布尔值`true`

```js
function checkPositive(arr) {
  return arr.every(value => value > 0);
}
checkPositive([1, 2, 3, -4, 5]); //false
```

- `some()` 检测数组中是否有元素符合指定条件 满足返回布尔值`true`

```js
function checkPositive(arr) {
  return arr.some(value => value > 0);
}
checkPositive([1, 2, 3, -4, 5]); //true
```

#### `map()`

- `array.map(function(currentValue, index, arr), thisValue)`

```javascript
var newArr = [55, 44, 66, 11].map(function (item, index, arr) {
  return item * 10;
});

newArr = arr.map(item => item * 10); //[550, 440, 660, 110]
```

#### `filter() `

`array.filter(function(currentValue, index, arr), thisValue)`

```javascript
var newArr = [32, 33, 12, 40].filter(function (item) {
  return item > 32;
});

newArr = arr.filter(item => item > 32); // [33, 40]

const words = [
  'spray',
  'limit',
  'elite',
  'exuberant',
  'destruction',
  'present',
];

const result = words.filter(word => word.length > 6);
// Array ["exuberant", "destruction", "present"]

const result = words.map(word => word.length > 6);
//Array [false, false, false, true, true, true]

arr = ['', null, 'undefined', 1];
arr.filter(Boolean); // 移除所有的 ”false“ 类型元素
// =>["undefined", 1]
```

#### `reduce() `

- 对于空数组是不会执行回调函数
- 从左到右

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

// initialValue：传递给函数的初始值  没有初始值 第一项作为初始值
// initialValue 可以是 [] {} 来做一些次数统计 二维数组展开等操作
var newArr = [1, 2, 3, 4].reduce(function(acc, cur){
	return acc + cur;//对数组元素进行四舍五入并计算总和
}, 0);

newArr = arr.reduce((acc, cur) => acc + cur, 0)
```

`reduceRight`

- 从数组的末尾向前将数组中的数组项做累加

```js
arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

#### `FlatMap()`

- `FlatMap` 和 `map` 的作用几乎是相同的，但是对于多维数组来说，会将原数组降维。可以将 `FlatMap` 看成是 `map` + `flatten` ，但是目前该函数在浏览器中还不支持。

```js
[1, [2], 3].flatMap(v => v + 1);
// -> [2, 3, 4]
```

如果想将一个多维数组彻底的降维，可以这样实现

```js
const flattenDeep = arr =>
  Array.isArray(arr)
    ? arr.reduce((a, b) => [...a, ...flattenDeep(b)], [])
    : [arr];

flattenDeep([1, [[2], [3, [4]], 5]]);
```

### 类数组

- 类数组有`length`属性和索引元素，但不具有数组原型上的方法
- `arguments`对象是所有（非箭头）函数中都可用的局部变量
- `document.querySelectorAll('div')`

> 类数组 转为 数组

```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }

// Array.prototype.slice.call()
const args = Array.prototype.slice.call(arguments);
const args = [].slice.call(arguments, 1); //相当于从第二项开始

// splice
const args = Array.prototype.splice.call(arguments, 0); 

// Array.from()  ES2015
const args = Array.from(arguments);

// 扩展运算符
const args = [...arguments];

// concat
Array.prototype.concat.apply([], arguments);
```

### `Spread rest`

- `Spread Operator and Rest Parameters`
- 两者都是 `... +` 变量/参数的形式

`spread`

- 操作对象

```js
//spread  展开语法
var post = {
  title: 'biaoti',
  content: 'neirong',
};
// 构造字面量对象时 使用展开语法
var postClone = { ...post }; //内容与post相同  浅拷贝

console.log(post === postClone);
// false		对象是引用类型 两者内存地址不一样

var post2 = { ...post, author: 'admin' }; //添加属性
```

- 操作数组 函数

```javascript
//还可以在函数中使用。
function savePost(id, title, content) {
  console.log('save article ', id, title, content);
}
//可以将数组spread(展开)为三个单独的变量
savePost(...[2, 'Title', 'Content']);
//==>save article 2 Title Content

//同样可以在数组中操作
var arr = [1, 2, 3];
let arr2 = [...arr]; // [1, 2, 3]
var arrClone = [...arr, 4, 5, 6]; //[1,2,3,4,5,6]

//使用 spread 运算符展开数组项
//从ES5的
var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr); // 返回 89
//变成ES6 的
const maximus = Math.max(...arr); // 返回 89
```

`rest`

- 主要是在函数的参数位置对于多个参数的转化成数组形式
- 而且只能把 rest 参数放在函数的最后一个位置

```js
function howMany(...args) {
  return 'You have passed ' + args.length + ' arguments.'
}

Array.prototype.slice.call(xxx) ==>  [...xxx]
// 能将有length属性的对象转换为数组
```

## 迭代器 & 生成器

### 迭代器

一个具有 `next()` 方法的对象，每次调用 `next()` 都会返回一个结果对象，该结果对象有两个属性，`value` 表示当前的值，`done` 表示遍历是否结束

### 生成器

- 生成 / 返回一个迭代器
- 调用 `Generator` 函数，会返回一个内部指针（即迭代器/遍历器 ），即执行它不会返回结果，返回的是指针对象

```js
const arr = [1, 2, 3];
function* generator() {
  for (let v of arr) {
    yield v;
  }
}

const iterator = generator(arr);
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next().value, iterator.next().done); // 2 false
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

> 自己编写 `generator`

```js
function generator(arr) {
  let nextIndex = 0;
  return {
    // 这里返回的是对象
    next() {
      return nextIndex < arr.length
        ? { value: arr[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}
```

### 遍历方法

#### `forEach`

```js
arr.forEach((val, index, arr) => {
  console.log(val, index, arr);
});
```

- 除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环
- `forEach()`返回值是`undefined`，不可以链式调用
- 不适合写异步

#### `for of`

> 本质遍历的是对象的 `Symbol.iterator` 属性

- 不能用于对象
- `for...of`语句在可迭代对象（包括 `Array，Map，Set，String，TypedArray，arguments 对象`等等 （但是对象不行））上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
- 常用于异步的遍历

```js
const list = [1, 2, 3];
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

(function test() {
  list.forEach(async x => {
    const res = await square(x);
    console.log(res);
  });
})();

(async function test2() {
  for (let v of list) {
    const res = await square(v);
    console.log(res);
  }
})();

// forEach 隔一秒 一起输出 不能异步
// for of 、 for in  普通for 都可以异步循环
```

#### `for in`

- `for...in`语句以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性
- `for-in`是为普通对象设计的，遍历得到字符串类型的键
- 不建议 `for in` 遍历数组

```js
let arr = [1, 2, 3];

for (let i in arr) {
  console.log(i, typeof i, arr[i], typeof arr[i], arr[i + 1]);
}
// 0 string 1 number undefined

// 因为 typeof i 是 string 这样就会导致 arr[i + 1] 发生字符串拼接
```

```js
var arr = [1, 2, 3, 4];

arr.forEach(function (item, index, array) {
  console.log(item, index, array);
});

var obj = { a: 1, b: 2, c: 3, d: 4 };

for (let key in obj) {
  // key 找的是对象的属性键名
  console.log(key, obj[key]);
}
// 数组 -> 特殊的对象
for (let key in arr) {
  console.log(key, arr[key]);
}


// 原型上有 Symbol(Symbol.iterator): ƒ values()

// for...in 语句以任意顺序迭代对象的可枚举属性。

// for...of 语句遍历可迭代对象定义要迭代的数据。
```

## `eval()`

- 通过`eval()`定义的任何变量和函数都不会被提升
- `eval(string)` `eval()` 函数会将传入的字符串当做 `JavaScript` 代码进行执行。

```js
console.log(eval('2 + 2')); // expected output: 4

console.log(eval(new String('2 + 2'))); // 2 + 2

console.log(eval('2 + 2') === eval('4')); //  true
```

## Global 对象属性

### window 对象

### `Math`

```javascript
Math.PI;
Math.abs(-1); //1
Math.sin(Math.PI / 2); //1
Math.floor(3.98); //3	向下取整
Math.ceil(5.01); //6	向上取整
Math.pow(10, 3); //1000
Math.trunc(10.78); //10	舍弃小数
Math.random(); //[0,1)
Math.round(); //四舍五入	//特例 Math.round(-20.5)==>-20
Math.min(); // Math.min(...arr)
Math.max();
```

```js
Math.max.apply(null, [1, 2, 10]); //10

Math.max(...[1, 2, 10]); //10
```

### `Date`

```javascript
Date.now(); // 获取当前时间毫秒数

var date = new Date();
console.log(date); //Wed Feb 26 2020 17:16:37 GMT+0800 (中国标准时间)
//一些属性
date.getFullYear(); //年
date.getMonth(); //月  0~11
date.getDate(); //日
date.getDay(); //星期几
date.getHours(); //时
date.getMinutes(); //分
date.getSeconds(); //秒
date.getTime(); //时间戳 1599442084987  以1970.1.1 0：00：00为基准
console.log(new Date(1582708597011)); //时间戳转为时间

date.toLocaleString(); //注意：此处为方法 不是属性  "2020/2/26 下午5:28:38"
date.toLocalDateString(); //2020/2/26
date.toLocalTimeString(); //下午5:28:38

date.setFullYear(2022);
date.setTime(); //时间戳

Date.parse();
let someDate = new Date(Date.parse('May 23, 2019'));
let someDate = new Date('May 23, 2019');

Date.UTC();
// GMT时间2005年5月5日下午5点55分55秒
let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));

return new Date().toLocaleDateString().split('/').join('-'); // 2021-3-14
```

### `Json`

- `JSON.stringify()`方法用于将一个值转为 `JSON` 字符串
- `JSON.parse()`方法用于将 `JSON` 字符串转换成对应的值

```javascript
var user = { name: 'A', age: 20 };

JSON.stringify(user); // {"name":"A","age":20}

JSON.parse('{"name":"A","age":20}'); // 要加引号

JSON.parse(JSON.stringify(user));
// => { name: 'A', age: 20 }
```

#### `json`与`js对象`区别

```javascript
var obj = { a: 'hello', b: 'world' };
var json = '{"a":"hello","b":"world"}';
```

- `JSON` 是对象，但对象不一定是 `JSON`
- 对象：`key -> value`
  - 对象中的 `value` 可以是任意的数据类型，包括函数
  - ` JSON` 中的 `value` 不能为函数或日期对象

## `Map & Set`

> `Set` 无序不重复的集合

- 成员不能重复
- 只有键值没有键名，类似数组
- 可以遍历，方法有`add, delete, has`

```js
var set = new Set([3, 1, 1, 1]);

set.add(2); //{3,1,2}
set.delete(3); // true {1,2}
set.has(2); //是否包含某个元素
set.size // 2
set.clear()

//遍历
set.forEach(value => {
  console.log(value);
});

const arr = [...new Set([3, 1, 2, 3, 4])];
console.log(arr.length, arr[2]);
// 4 2
```

> `Map` 数据储存 键值对

- 本质上是健值对的集合，类似集合
- 可以遍历，可以跟各种数据格式转换

```javascript
var map = new Map([
  ['tom', 100],
  ['jack', 90],
]);

map.get('tom'); // 100 通过key获得value
map.set('john', 80);
map.has('tom'); //true
map.delete('john'); //true
map.size //2
[...map.keys()] // ["tom", "jack"]
Array.from(map.values()); // [100, 90]
map.clear()

//遍历
map.forEach((value, key) => {
  console.log(key, value);
});

for (let [key, value] of map) {
  console.log(key, value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

> `WeakMap`

- 只接受对象作为键名，并且对于对象的引用是**弱引用**

##  `call apply bind`

- `call` 和 `apply` 都是为了解决改变 `this` 的指向 
- 传参方式不一样
- `fn.call(this, p1, p2, p3)`
- `fn.apply(this, [...arguments])`

```javascript
var emp = {
  id: 1,
  name: 'honjay',
};

function printInfo(dep1, dep2, dep3) {
  console.log('info ' + this.name, dep1, dep2, dep3);
}
//使用call可以更改this指向
printInfo.call(emp, 'WEB', 'IT', 'Office');
printInfo.apply(emp, ['WEB', 'IT', 'Office']); //可以作为数组传入

var empPrintInfo = printInfo.bind(emp, 'WEB', 'IT', 'Office'); 
//返回绑定参数的新函数 用于后续执行
empPrintInfo();
```

- `bind` 多次绑定 只会生效一次（第一次
- 当执行绑定函数时，`this`指向与形参在`bind`方法执行时已经确定了，无法改变

## 异常

- `Error` 所有错误的父类型

### 类型

- `ReferenceError`(引用错误)： 引用的变量不存在

```js
console.log(a);
// Uncaught ReferenceError: a is not defined
```

- `TypeError`(类型错误)： 数据类型不正确的错误

```js
let a = null;
a.length;
// Uncaught TypeError: Cannot read property 'length' of null
```

- `RangeError`： 数据值不在其所允许的范围

```js
function Fn() {
  Fn();
}
Fn(); // 递归调用
// Uncaught RangeError: Maximum call stack size exceeded
```

- `SyntaxError`： 语法错误

```js
let a = '1"
// Uncaught SyntaxError: Invalid or unexpected token
```

### 捕获异常

- `try catch finally`

```javascript
try {
} catch (err) {
  console.error(err);
} finally {
  console.log('go on');
}
```

- 自动捕获

```js
window.onerror = function (message, source, lineNum, colNum, error) {
  // 1、对于跨域的js如CDN 不会有详细的报错信息
  // 2、对于压缩的js 还要配合 sourceMap 反查到未压缩代码的行、列
};
```

### 抛出异常

- `throw error`

```javascript
//throw抛出异常对象
function fetchData() {
  console.log('get Data');
  throw new Error('404');
}
try {
  fetchData();
} catch (e) {
  console.error(e);
  // e.name, e.message Error 404
}
```

##  
