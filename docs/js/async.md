# 异步

## 一些思考

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

## Promise

图源：[MDN 官网](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

![promises](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/promises.png)

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

- `promise`构造函数是同步执行的，`then`方法是异步执行的

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

console.log('Global'); 
// Global -> Then -> succ
// Global -> error
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
    // return new Promise((resolve) => resolve(value + 10))
    return Promise.resolve(value + 10); //简写
  })
  .then(value => console.log(value) )
  .catch(error => console.log(error) )
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
}); // [1,2,3] 按照数组传入的顺序按序输出而不是timeout
```

#### `Promise.allSettled()`

- 当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个`promise`的结果时，通常使用它
- 返回一个在所有给定的 promise 都已经`fulfilled`或`rejected`后的`promise`，并带有一个对象数组，每个对象表示对应的`promise`结果

## `async & await`

:::note Ref

- [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

:::

#### async/await 和 Promise 的关系

- `async await`和 `Promise` 并不互斥 两者相辅相成
- `Promise then catch` 链式调用，但也是基于回调函数
- `async/await` 是同步语法，彻底消灭回调函数
- `async` 同步代码样式执行异步 本质是 `promise`
- `async await` 优缺点
  - 优点：处理 `then` 的调用链，能够更清晰准确的写出代码
  - 缺点：滥用 `await` 可能会导致性能问题。因为 `await` 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性
- 多个用`async`单个用`primise`

> 并发与串行

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  // 同步 2s
  console.time('test1');
  await delay(1000);
  await delay(1000);
  console.timeEnd('test1');
  // 1s
  let a = delay(1000);
  let b = delay(1000);
  console.time('test2');
  await a;
  await b;
  console.timeEnd('test2');
  // 1s
  console.time('test3');
  await Promise.all([delay(1000), delay(1000)]);
  console.timeEnd('test3');
})();

当调用 a = delay(2000)的时候，发起delay的异步处理(setTimeout), 此时promise的状态是pending，await需要等promise状态变成resolved(rejected则抛出异常)才会继续后面的操作,可以理解为阻塞。 

第一种写法中，后一次的delay调用是等待前一次resolve才发起的，所以两次delay表现出来是串行的。 而第二种写法中，在await之前就已经调用了两次delay，所以表现出来的就是并发。


// 调用Promise.all，要求传入的参数是promise对象数组，调用
Promise.all([delay(2000), delay(2000)]);
// 其实相当于分两步走：
const p1 = delay(2000); const p2 = delay(2000); // step 1
Promise.all([p1, p2]); // step2

// 其实在传给Promise.all之前，异步处理已经都发起了，所以并发并不是Promise.all处理的，Promise.all只是做了类似如下操作：
async (promiseArray) => {
  const result = [];
  for (const promise of promiseArray) {
    result.push(await promise);
  }
  return result;
};
```

#### 关于`async await`

##### `async` 

`async` 函数会返回一个 `Promise` 对象，如果在函数中 `return` 一个直接量，`async` 会把这个直接量通过 `Promise.resolve()` 封装成 `Promise` 对象

- 如果`async` 函数没有返回值 会默认返回 `Promise { undefined }`
- `Promise.resolve(x)` 可以看作是 `new Promise(resolve => resolve(x))` 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 `Promise` 实例

```js
async function testAsync() {
  return 'hello async';
}

console.log(testAsync()); // Promise { 'hello async' }
```

##### `await` 

`await` 不仅仅用于等 `Promise` 对象，它可以等任意表达式的结果。如普通函数调用或者简单数据类型

```js
async function fn() {
  return 100; // 相当于 return Promise.resolve(100)
}
fn() // Promise {<fulfilled>: 100}

(async function () {
  const a = fn();
  const b = await 100;
  const c = await fn();
  const d = await Promise.resolve(100);
  console.log(a, b, c, d); // Promise { 100 } 100 100 100
})();
```

- 如果它等到的是一个 `Promise` 对象，它会阻塞后面的代码，等着 `Promise` 对象 `resolve`，然后得到 `resolve` 的值，作为 `await` 表达式的运算结果

- `await` 等待的不是一个 `Promise` 对象的时候，相当于 `await Promise.resolve(...)`



- 配合解构赋值解析数据请求

- 执行 `async` 函数，返回的是 `Promise` 对象
- 可以把 `async` 看成将函数返回值使用 `Promise.resolve()` 包裹了下

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

## `Event Loop`

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

:::note Ref

- [事件循环学习笔记](https://juejin.cn/post/6958460865905590285#comment)

:::

- 事件循环 事件轮询
- `JS`是单线程运行的，异步要基于回调来实现
- `event loop` 就是异步回调的实现原理

##### `Node`

`process.nextTick`

`setImmediate()`

- `nextTick`队列会比`Promie`先执行，`nextTick`中的可执行任务执行完毕之后，才会开始执行`Promise`队列中的任务
- `setTimeout` 比`setImmediate`先执行？ 倒不一定 比较复杂 得看`node`执行机制 暂时没深入

##### Event Loop 流程

- 首先执行同步代码，压入调用栈中，如果遇到微任务、宏任务放到对应队列中等待
- 当同步代码全部执行完成后，`call stack`此时为空，执行当前的微任务
- 开始更新`DOM`结构 尝试`DOM`渲染
- 最后触发`event loop`去宏任务队列，依次如上执行

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

## 题目

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


因为我们执行了一个未定义的函数，所以会报错 a is not defind，
又因为是在 async 中，所以报错信息会显示 in promise。
最后 try cathch 只能捕获同步代码的抛错，因为是 async，所以走不到 catch 里面。

// ReferenceError: a is not defined
```

> Event Loop 今日头条

```js
async function async1() {
  console.log('async1 start'); // 2
  // 从右向左，先执行async2后，发现有await关键字，于是让出线程，阻塞代码
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

// 打印同步代码 setTimeout加入宏任务队列 -> script start
// 执行async1 -> async1 start
// 遇到await 先计算出右侧的结果 先执行async2() 再中断async函数执行外面的代码 -> async2
// new Promise -> promise1
// 同步代码 -> script end
// 回到async？ 执行剩下的？同步任务 -> async1 end
// 执行微任务 -> promise2 then()
// 宏任务 -> setTimeout

script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout
```



```js {4}
new Promise((resolve, reject) => {
  console.log("async1 start");
  console.log("async2");
  resolve(Promise.resolve());
}).then(() => {
  console.log("async1 end");
});

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
}).then(function() {
  console.log("promise3");
}).then(function() {
  console.log("promise4");
});

async1 start
async2
promise1
promise2
promise3
async1 end
promise4

这个应该是因为在上面的resolve里面返回了promise.resolve()，这也是一个Promise对象，导致的延迟执行，但是不同浏览器在执行相关处理时候的顺序有时候是不一样的。  延迟是两次？3次？
```



未完待续。。。