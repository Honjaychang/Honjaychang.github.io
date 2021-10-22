# 各种手写

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

## 通用 `forEach`

- 写一个能遍历对象和数组的 `forEach` 函数

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

## `url` 参数解析

```js
const search = location.search.substr(1) // ?...

const pList = new URLSearchParams('?a=10&b=20&c=30')
for (const [key, value] of pList) {
  console.log(key,value) // a 10 b 20 ...
}
```

> 获取 url 中的参数

```js
// 1. 指定参数名称，返回该参数的值 或者 空字符串
// 2. 不指定参数名称，返回全部的参数对象 或者 {}
// 3. 如果存在多个同名参数，则返回数组

// http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key

// [1, 2, 3]

function getUrlParam(sUrl, sKey) {
  let res = [];
  let obj = {};
  let param = sUrl.split("?")[1].split("#")[0]; 
  // key=1&key=2&key=3&test=4
  let arr = param.split("&"); 
  // [ 'key=1', 'key=2', 'key=3', 'test=4' ]
  if (sKey) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      if (arr[i][0] === sKey) {
        res.push(arr[i][1]);
      }
    }
    if (res.length === 0) {
      return "";
    } else if (res.length === 1) {
      return res[0];
    } else return res;
  } else {
    if (param === "" || param == null) {
      return {};
    } else {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=");
        if (!Object.keys(obj).includes(arr[i][0])) {
          obj[arr[i][0]] = [];
        }
        obj[arr[i][0]].push(arr[i][1]);
      }
      return obj;
    }
  }
}

console.log(
  getUrlParam("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe")
);
```

