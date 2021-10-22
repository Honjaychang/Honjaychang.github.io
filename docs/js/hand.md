# JS实现

## `call`

- 不传入第一个参数，那么默认为 `window`
- 改变 `this` 指向，让新的对象可以执行该函数
  - 将函数设为对象的属性	执行该函数	删除该函数

```js
Function.prototype.myCall = function (ctx, ...args) {
  let ctx = ctx || window;
  ctx.fn = this;
  let res = ctx.fn(...args);
  delete ctx.fn;
  return res;
};


const person = {
  age: 18,
};

function getVal(a, b, c) {
  console.log(a, b, c);
  console.log(this.age);
}

const arr = [1, 2, 3];

getVal.call(person, ...arr); // 1 2 3   18
getVal.call(person); // undefined undefined undefined    18

getVal.myCall(person, ...arr);
getVal.myCall(person);
```

## `apply`

```js
Function.prototype.myApply = function (ctx, ...args) {
  let ctx = ctx || window;
  ctx.fn = this;
  let res;
  if (args) res = ctx.fn(...args);
  else res = ctx.fn();
  delete ctx.fn;
  return res;
};
```

## `bind`

- `bind` 和其他两个方法作用也是一致的，只是该方法会返回一个函数

> 当 `bind` 返回的函数作为构造函数的时候，`bind` 时指定的 `this` 值会失效，但传入的参数依然生效

```js
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined daisy 18    (这时候this已经指向obj了)
```

> `bind`

```js
// 圣杯模式？
Function.prototype.myBind = function (ctx, ...args) {
  let self = this;

  // var fNOP = function () {};
  
  let fBound = function (...args2) {
    // 此处根据this是否被实例话来动态绑定
    return self.apply(this instanceof fBound ? this : ctx, args.concat(args2));
  };
  // 赋值为绑定函数的 prototype 使得实例可以继承绑定函数的原型中的值
  // fNOP.prototype = this.prototype;
  // fBound.prototype = new fNOP();
  
  fBound.prototype = Object.create(this.prototype)
  return fBound;
};
```

> `Object.create()`

```js
Object.create = function( o ) {
    function f(){}
    f.prototype = o;
    return new f;
};
```

## 深拷贝

- 注意判断值类型和引用类型
- 注意判断是数组还是对象
- 递归

```js
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // 如果obj是null 或者 obj不是对象和数组 就直接返回
    return obj;
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

const obj1 = {
  age: 18,
  name: 'John',
  address: { street: 'baiyang' },
  arr: ['a', 'b', 'c', ['d', 'e']],
};

const obj2 = deepClone(obj1);
obj2.address.street = 'baiyang111';
obj2.arr[3][0] = 'd111';
console.log(obj1);
console.log(obj2);
```

## `lodash.isEqual`

```js
// 判断是否是对象或数组
function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型 暂不考虑函数
    return obj1 === obj2;
  }

  if (obj1 === obj2) return true;

  // 两个都是对象或者数组，而且不相等

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  // 以 obj1 为基准 和 obj2 依次递归比较
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) return false;
  }
  return true;
}


const obj1 = { a: 10, b: { x: 100, y: { z: 200 } } };
const obj2 = { a: 10, b: { x: 100, y: { z: 200 } } };

console.log(isEqual(obj1, obj2));
```

:::note Ref

- [JavaScript 专题之如何判断两个对象相等](https://segmentfault.com/a/1190000010567491?utm_source=sf-similar-article)

:::

## 数组去重

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false,'true', 'a', {}, {}]
```

### 利用 Set

- `return Array.from(new Set(arr))`
- `return [...new Set(arr)]`
- `Array.from()` 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

### `indexOf includes`

```js
const unique = arr => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    // if (res.indexOf(arr[i]) === -1) res.push(arr[i])
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
};
```

### `filter`

```js
const unique = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
};
```

## 数组扁平化

- 数组扁平化是指将一个多维数组变为一个一维数组

```js
const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]
```

### `flat()`

- `const res= arr.flat(Infinity);`

### 正则

- `const res = JSON.parse('['+ JSON.stringify(arr).replace(/\[|\]/g,'')+']');`

### 递归

- 1、判断`arr[i]`是不是数组，如果是数组则递归调用`flat()`
- ~~2、判断`arr[i]`是不是数字，如果是就`push`，不是就调用~~ (感觉自己的方法不妥，数组又不一定只存放数字)

```js {7}
let newarr1 = [];

function flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) flat(arr[i]);
    else newarr1.push(arr[i]);
  }
  return newarr1;
}
```

- `Array.prototype.concat.apply([], arr)`

```js
function unique(arr) {
  // 验证数组中 还有没有 深层数组
  const isDeep = arr.some(item => item instanceof Array);
  if (!isDeep) return arr;
  const res = Array.prototype.concat.apply([], arr);
  // const res = [].concat.apply([], arr)
  return unique(res); // 递归
}
```

### `reduce`

```js
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
```

## 随机数组

> 随机生成一个正负数，并返回给`sort`方法

```js
function randomSortA(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
```

> 将当前遍历元素与一个随机位置元素互换

```js
function randSort(arr) {
  const len = arr.length;
  for (var i = 0; i < len; i++) {
    var rand = parseInt(Math.random() * len);
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
}
```

> 随机选中一个值，在原数组中删除它，并将它 push 到新数组中

```js
function randSort(arr) {
  var newArr = [];
  while (arr.length > 0) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    newArr.push(arr.splice(randomIndex, 1)[0]);
  }
  return newArr;
}
```

> 使用随机数映射到原数组，再排序

- 将原数组中的每个元素，都绑定一个随机数，然后对随机数做有序排序，再把随机数剔除，就实现了对原数组的随机排序。

```js
function randomSort(arr) {
  let mapped = arr.map(item => ({ value: item, sort: Math.random() }));
  mapped.sort((a, b) => a.sort - b.sort);
  return mapped.map(item => item.value);
}
```

### 洗牌算法

- 原始方法 `O(n^2)` 上面第三种
  - 写下从 1 到 N 的数字
  - 取一个从 1 到剩下的数字（包括这个数字）的随机数 k
  - 从低位开始，得到第 k 个数字（这个数字还没有被取出），把它写在独立的一个列表的最后一位
  - 重复第 2 步，直到所有的数字都被取出
  - 第 3 步写出的这个序列，现在就是原始数字的随机排列
- 现代方法 `O(n)`
  - **在每次迭代时交换这个被取出的数字到原始列表的最后**

```js
Array.prototype.shuffle = function () {
  var nums = this;
  let len = nums.length;
  while (len > 1) {
    let randomIndex = Math.floor(Math.random() * len--);
    [nums[len], nums[randomIndex]] = [nums[randomIndex], nums[len]];
  }
  return nums;
};
```

### 关于`sort`

- `v8`在处理`sort`方法时，使用了插入排序和快排两种方案
  - 当目标数组长度小于 10 时，使用插入排序；反之，使用快速排序

:::note Ref

- [数组随机排序的 4 中 JS 实现](https://juejin.cn/post/6850418109577347079#comment)
- [Fisher–Yates shuffle 洗牌算法](https://gaohaoyang.github.io/2016/10/16/shuffle-algorithm/#top)
- [「前端进阶」数组乱序](https://juejin.cn/post/6844903863812620296)

:::





## 