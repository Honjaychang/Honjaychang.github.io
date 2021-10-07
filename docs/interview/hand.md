# 各种手写

## 手写深拷贝

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

## 手写防抖、节流

:::

- [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
- [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

:::

> 若写为箭头函数 需要注意 箭头函数 没有 `arguments`

#### 防抖

- 原理
  - 事件响应函数在一段时间后才执行，如果这段时间内再次调用，则重新计算执行时间
  - 也就是说，在这个时间内，无论你怎么触发事件，我都不会执行，只有这段时间无操作后才会执行！

```js
const debounce = (fn, delay = 500) => {
  let timer = null;
  return function (...args) {
    // 取debounce执行作用域的this (div容器)
    var ctx = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      // 用apply指向调用debounce的对象，相当于ctx.fn(args);
      fn.apply(ctx, args);
    }, delay);
  };
};

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
```

`immediate`

```jsx
const debounceImmediate = (fn, delay = 500, immediate = false) => {
  let timer = null;
  return function (...args) {
    let _this = this;
    timer && clearTimeout(timer);
    if (immediate) {
      let runNow = !timer;
      timer = setTimeout(() => (timer = null), delay);
      runNow && fn.apply(_this, args);
    } else {
      timer = setTimeout(function () {
        fn.apply(_this, ...args);
      }, delay);
    }
  };
};
```

#### 节流

- 原理
  - 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

```js
const throttle = (fn, delay) => {
  let timer;
  return function (...args) {
    let ctx = this;
    if (timer) return;
    timer = setTimeout(function () {
      fn.apply(ctx, ...args);
      timer = null;
    }, delay);
  };
};
```

#### 异同

目的都是：降低回调执行频率，节省计算资源

防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

#### Hook

因为函数组件每次渲染结束之后，内部的变量都会被释放，重新渲染时所有的变量会被重新初始化，产生的结果就是每一次都注册和执行了`setTimeout` 函数。想要得到正确的运行结果，必须以某种方式存储那些本会被删除的变量和方法的引用 `eg: timer`。

所以我们可以利用React组件的缓存机制，通过自定义 `Hook` 组件去解决这个问题

- 防抖

```jsx
import { useRef, useEffect, useCallback } from 'react';

const useDebounce = (fn, delay = 500, dep = []) => {
  const { current } = useRef({ fn, timer: null });
  console.log('debounce-', current);
  useEffect(() => (current.fn = fn), [fn, current]);

  return useCallback(function f(...args) {
    current.timer && clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      current.fn.apply(this, args);
    }, delay);
  }, dep);
};
```

- 节流

```jsx
export function useThrottle(fn, delay = 500, dep = []) {
  const { current } = useRef({ fn, timer: null });
  console.log('throttle-', current);
  useEffect(() => (current.fn = fn), [fn, current]);

  return useCallback((...args) => {
    if (current.timer) return;
    current.timer = setTimeout(() => {
      current.fn.apply(this, args);
      current.timer = null;
    }, delay);
  }, dep);
}
```

:::note Ref

- [防抖节流以及React Hook中的防抖节流](https://blog.csdn.net/lovezhuer1/article/details/112681236?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)

- [一起围观由React Hooks防抖引发的面试翻车现场](https://blog.csdn.net/qiwoo_weekly/article/details/105721412?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-4.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-4.control)

:::

## 手写 ajax

```js
// XMLHttpRequest get 请求
const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', false); // 是否异步 -> false 同步
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
      console.log(xhr.responseText);
    } else {
      console.log('some error happened');
    }
  }
};
xhr.send(null);
```

## 手写 call、apply、bind

- 不传入第一个参数，那么默认为 `window`
- 改变 `this` 指向，让新的对象可以执行该函数
  - 将函数设为对象的属性	执行该函数	删除该函数

```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1


var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```

#### `Function.prototype.call()`

```js
// myCall
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

#### `Function.prototype.apply()`

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

#### `Function.prototype.bind()`

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

  let fBound = function (...args2) {
    // 此处根据this是否被实例话来动态绑定
    return self.apply(this instanceof fBound ? this : ctx, args.concat(args2));
  };
  // 赋值为绑定函数的 prototype 使得实例可以继承绑定函数的原型中的值
  // fBound.prototype = Object.create(this.prototype)
  fBound.prototype = this.prototype;
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

## 手写 Promise

#### `Promise`

[面试够用版](https://juejin.cn/post/6844903809206976520#heading-17)

```js
function myPromise(constructor) {
  let self = this;
  self.status = 'pending'; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为resolved的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态
  function resolve(value) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }
  function reject(reason) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 同时，需要在myPromise的原型上定义链式调用的then方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case 'resolved':
      onFullfilled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break;
    default:
  }
};

// test
var p = new myPromise(function (resolve, reject) {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});
//输出1
```

#### TEST

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('第一个任务');
  }, 200);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('第二个任务');
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('第三个任务');
  }, 500);
});
```

#### `Promise.all`

- 全部成功是按照传入顺序输出，当出现失败的时候会优先输出失败的那个（执行还是按 `delay` 执行的

```js
Promise.all = (promises) => {
  // let promises = Array.from(promises); //将iterator转换为数组
  if (!Array.isArray(promises)) {
    return reject(new TypeError('arguments muse be an array'));
  }
  return new Promise((resolve, reject) => {
    let len = promises.length;
    let res = new Array(len); // 存放已成功的异步操作
    // 如果数组长度为0则返回空数组
    if (len === 0) resolve(res);

    let count = 0; // 记录已成功的操作数

    for (let i = 0; i < len; i++) {
      // 执行每一个promise
      Promise.resolve(promises[i]).then(
        (data) => {
          count++;
          res[i] = data;
          if (count === len) resolve(res);
        },
        (err) => reject(err)
      );
    }
  });
};

Promise.all([p1, p2, p3])
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

#### `Promise.race`

```js
Promise.race = (promises) => {
  let promises = Array.from(promise);
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        data => resolve(data),
        err => reject(err)
      );
    }
  });
}

Promise.race([p1, p2, p3])
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

#### `Promise.allSettled`

```js
Promise.allSettled = function (promises) {
  if (!Array.isArray(promises)) return new Error('xx');
  return new Promise((resolve, reject) => {
    let len = promises.length;
    let res = new Array(len);
    let count = 0;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(
        data => {
          res[i] = data;
          count++;
          if (count === len) resolve(res);
        },
        err => {
          res[i] = err;
          count++;
          if (count === len) resolve(res);
        }
      );
    }
  });
};
Promise.allSettled([p1, p2, p3])
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

## Jsonp

> 原理：`jsonp`发送的并不是`ajax`请求，其实是动态创建`script`标签。
>
> `script`标签是没有同源限制的，把`script`标签的`src`指向请求的服务端地址

```js
function jsonp(url, data = {}, callback = 'callback') {
  //处理json对象，拼接url
  data.callback = callback;
  let params = [];
  for (let key in data) {
    params.push(key + '=' + data[key]);
  }
  let script = document.createElement('script');
  script.src = url + '?' + params.join('&');
  document.body.appendChild(script);

  //返回Promise
  return new Promise((resolve, reject) => {
    window[callback] = data => {
      try {
        resolve(data);
      } catch (e) {
        reject(e);
      } finally {
        //移除script元素
        script.parentNode.removeChild(script);
      }
    };
  });
}

//请求数据
jsonp(
  'http://photo.sina.cn/aj/index',
  {
    page: 1,
    cate: 'recommend',
  },
  'jsoncallback'
).then(data => {
  console.log(data);
});
```

## 编写一个通用的事件监听函数

```js
function bindEvent(elem, type, selector, cb) {
  if (cb == null) {
    cb = selector;
    selector = null;
  }
  elem.addEventListener(type, event => {
    const target = event.target;
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        cb.call(target, event);
      }
    } else {
      // 普通绑定
      cb.call(target, event);
    }
  });
}

// 箭头函数的this 会绑定到全局  所以要改为普通的function
```

## `lodash.isEqual`

```js
const obj1 = { a: 10, b: { x: 100, y: { z: 200 } } };
const obj2 = { a: 10, b: { x: 100, y: { z: 200 } } };

console.log(isEqual(obj1, obj2));

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
```

:::note Ref

- [JavaScript 专题之如何判断两个对象相等](https://segmentfault.com/a/1190000010567491?utm_source=sf-similar-article)

:::

#### 写一个能遍历对象和数组的 forEach 函数

```js
let arr = [1, 2, 3, 4, 5];
let obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
function forEach(obj, fn) {
  if (obj instanceof Array) {
    obj.forEach((item, index) => {
      fn(index, item);
    });
  } else {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn(key, obj[key]);
      }
    }
  }
}
forEach(arr, function (index, item) {
  console.log(index, item);
});
forEach(obj, function (key, val) {
  console.log(key, val);
});
```

## 数组扁平化

- 数组扁平化是指将一个多维数组变为一个一维数组

```js
const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]
```

### 使用`flat()`

- `const res= arr.flat(Infinity);`

### 利用正则

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

### 使用 reduce

```js
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
```

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

## `node` 回调 `promise` 化

```js
// fs.readFile(filePath,(data,err)=>{
//   if(!err) console.log(data.toString());
//   else console.log(err);
// }

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (data, err) => {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });
}
```

## 用 `setTimeout` 实现 `setInterval`

基本思想：

```
function mySetInterval(handler, timeout, ...arguments) {
  const fn = () => { // 关键在于构造 fn 反复调用 handler
    handler()
    setTimeout(fn, timeout)
  }
  setTimeout(fn, timeout)
}
mySetInterval(() => {
  console.log(`bla bla...`)
}, 1000)
复制代码
```

另外，还可以实现 `clearTimeInterval`（利用全局 `obj` 存储自增的 `id` 到 `timeId` 的映射） 和 `arguments` 自定义参数。

## 发布订阅模式

发布订阅模式就是通过在事件调度中心`subscribers`添加订阅者的事件`subscribe`，等到发布事件`publish`时执行相应的事件

```js
let pubSub = {
  subscribers: {},
  subscribe(key, fn) {
    if (!this.subscribers[key]) this.subscribers[key] = [];
    this.subscribers[key].push(fn);
  },
  unSubscribe(key) {
    // if (!this.subscribes[key]) throw new Error('xxx');
    delete this.subscribers[key];
  },
  publish(key, ...args) {
    let listeners = this.subscribers[key];
    listeners.forEach(fn => fn(...args)); // 通知所有订阅者
  },
};
/* 为简化代码，省去了一些错误边界的处理，调试：*/
pubSub.subscribe('event', () => {
  console.log('first event');
});
pubSub.subscribe('event', () => {
  console.log('second event');
});

pubSub.publish('event'); // second event
```

> 实现一个 EventEmitter

- 创建一个 `EventEmitter`，承担全局事件总线功能 （事件中心）
- 实现 `on` 事件监听方法
- 实现 `emit` 事件订阅方法

- 发布者 事件中心 订阅者

```js
class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {};
  }
  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = [];
    }
    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb);
  }
  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }
}
```
