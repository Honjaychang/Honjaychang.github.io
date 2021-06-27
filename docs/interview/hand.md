# 各种手写

## 手写深拷贝

- 注意判断值类型和引用类型
- 注意判断是数组还是对象
- 递归

```js
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // 如果obj是null 或者 obj不是对象和数组 就直接返回
    return obj
  }
  // 初始化返回结果
  let res = obj instanceof Array ? [] : {}

  for (let key in obj) {
    // 保证key不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      res[key] = deepClone(obj[key])
    }
  }
  return res
}

const obj1 = {
  age: 18,
  name: 'John',
  address: { street: 'baiyang' },
  arr: ['a', 'b', 'c', ['d', 'e']],
}

const obj2 = deepClone(obj1)
obj2.address.street = 'baiyang111'
obj2.arr[3][0] = 'd111'
console.log(obj1)
console.log(obj2)
```



## 手写防抖、节流

#### 防抖

- 原理
  - 事件响应函数在一段时间后才执行，如果这段时间内再次调用，则重新计算执行时间
  - 也就是说，在这个时间内，无论你怎么触发事件，我都不会执行，只有这段时间无操作后才会执行！

```js
/**
 * 手写防抖 debounce
 * 监听一个输入框的，文字变化后触发 change 事件
 * 直接用 keyup 事件，则会频发触发 change 事件
 * 防抖: 用户输入结束或暂停时，才会触发 change事件
 */

const input1 = document.getElementById('input1')
let timer = null
input1.addEventListener('keyup', function () {
  if (timer) clearTimeout(timer)
  timer = setTimeout(function () {
    console.log(input1.value) // 模拟触发change事件
    // 清空定时器
    timer = null
  }, 500)
})

// 封装
function debunce(fn, delay = 500) {
  // timer 是闭包中的
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => { // 下面用this这边必须要用箭头 历史遗留问题？
      fn.apply(this, arguments) // fn() 也可以 但是不能用this了
      timer = null
    }, delay)
  }
}
input1.addEventListener(
  'keyup',
  debunce(function () {
    console.log(this.value)
  })
  // debunce(() => { console.log(input1.value) })
)
```

#### 节流

- 原理
  - 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

```js
/**
 * 节流throttle
 * 拖拽一个元素时，要随时拿到该元素被拖拽的位置
 * 直接用 drag 事件，则会频发触发，很容易导致卡顿
 * 节流:无论拖拽速度多快，都会每隔100ms触发一次
 */

const div1 = document.getElementById('div1')
let timer = null
div1.addEventListener('drag', function (e) {
  if (timer) return
  timer = setTimeout(function () {
    console.log(e.offsetX, e.offsetY)
    timer = null
  }, 500)
})
// 封装
function throttle(fn, delay = 100) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments) // throttle 的 event事件对象 会传递给throttle返回的函数 若想console输出event相关的信息就要通过apply 传递this 单纯通过fn()是不行的
      timer = null
    }, delay)
  }
}
div1.addEventListener(
  'drag',
  throttle(function (e) {
    console.log(e.offsetX, e.offsetY)
  })
)
```

#### 异同

##### 同

- 目的都是：降低回调执行频率，节省计算资源


##### 异

* 防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
* 区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于 wait，防抖的情况下只会调用一次，而节流的情况会每隔一定时间（参数 wait）调用函数。
* 防抖：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
* 节流：规定在一个单位时间内，只能触发一次函数。

## 手写ajax

```js
// XMLHttpRequest get 请求
const xhr = new XMLHttpRequest()
xhr.open('GET', 'data.json', false) // 是否异步 false
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText))
      console.log(xhr.responseText)
    } else {
      console.log('some error happened')
    }
  }
}
xhr.send(null)
```





## 手写call、apply、bind

- 不传入第一个参数，那么默认为 `window`
- 改变 this 指向，让新的对象可以执行该函数 ==> 给新的对象添加一个函数，然后在执行完以后删除

#### `Function.prototype.call()`

```js
const person = {
  age: 18,
}

function getVal(a, b, c) {
  console.log(a, b, c)
  console.log(this.age)
}

const arr = [1, 2, 3]

// myCall
Function.prototype.myCall = function (ctx, ...args) {
  // Object(null) {}
  // this -> fn -> ctx
  let _this = ctx || window;
  // originFn & fn 指向一个内存地址
  _this.originFn = this; // 引用
  let res = _this.originFn(...args);
  delete _this.originFn;
  return res;
};


getVal.call(person, ...arr) // 1 2 3   18
getVal.call(person) // undefined undefined undefined    18

getVal.myCall(person, ...arr)
getVal.myCall(person)
```

#### `Function.prototype.apply()`

```js
// myApply
Function.prototype.myApply = function (ctx, arr) {
  let _this = ctx || window;
  _this.originFn = this;
  let res;
  if (arr) _this.originFn(...arr);
  else _this.originFn();
  delete _this.originFn;
  return res;
};
```

#### `Function.prototype.bind()`

- `bind` 和其他两个方法作用也是一致的，只是该方法会返回一个函数。

```js
function fn1(a, b, c) {
  console.log('this: ', this)
  console.log(a, b, c)
}

// const fn2 = fn1.bind({ x: 100 }, 10, 20, 30)
// console.log(fn2()) // this:  { x: 100 } 10 20 30
console.log(fn1.__proto__ === Function.prototype)

// bind 传参与call类似
Function.prototype.myBind = function (ctx) {
  let originFn = this,
      // bind传递的test的参数
      args = [].slice.call(arguments, 1);
  // // 原型传递中介参数
  // _tempFn = function () {}; // 圣杯模式
  var newFn = function () {
    // 返回的新函数t的参数列表
    var newArgs = [].slice.call(arguments);
    // 如果 new t,  this => newFn构造函数(即实例化了) 
    // this => newFn的实例 ||ctx
    return originFn.apply(
      this instanceof newFn ? this : ctx,
      args.concat(newArgs)
    );
  };
  newFn.prototype = this.prototype;
  // // 将test.prototype => 中介函数的原型属性
  // _tempFn.prototype = this.prototype;
  // // 将中介函数的实例化对象 => newFn的原型属性
  // newFn.prototype = new _tempFn();
  return newFn;
};

const fn2 = fn1.myBind({ x: 100 }, 10, 20, 30)
console.log(fn2()) // this:  { x: 100 } 10 20 30
```



## 手写Promise

#### `Promise`

 [面试够用版](https://juejin.cn/post/6844903809206976520#heading-17) 

```js
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}

// 同时，需要在myPromise的原型上定义链式调用的then方法
myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}

// test
var p=new myPromise(function(resolve,reject){resolve(1)});
p.then(function(x){console.log(x)})
//输出1
```

#### TEST

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('第一个任务')
  }, 200)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('第二个任务')
  }, 1000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('第三个任务')
  }, 500)
})
```

#### `Promise.all`

- 全部成功是按照传入顺序输出，当出现失败的时候会优先输出失败的那个（执行还是按delay执行的

```js
function promiseAll(promise) {
  let promises = Array.from(promise) //将iterator转换为数组
  if (!Array.isArray(promises)) {
    return reject(new TypeError('arguments muse be an array'))
  }
  return new Promise((resolve, reject) => {
    //如果数组长度为0则返回空数组
    if (promises.length === 0) resolve([])
    else {
      let result = [] //存放已成功的异步操作
      let count = 0 //记录已成功的操作数
      let len = promises.length
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]) //执行每一个promise
          .then(
            (data) => {
              count++
              result[i] = data
              if (count === len) return resolve(result)
            },
            (err) => {
              return reject(err)
            }
          )
      }
    }
  })
}

promiseAll([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((e) => console.log(e))
```

#### `Promise.race`

```js
function promiseRace (promise) {
  let promises = Array.from(promise)
  return new Promise((resolve, reject) => {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        data => resolve(data),
        err => reject(err)
      )
    }
  })
}
promiseRace([p1, p2, p3])
  .then(result => console.log(result))
  .catch(e => console.log(e))
```

#### `Promise.allSettled`

```js
Promise.allSettled = function (promises) {
  if (!Array.isArray(promises)) return new Error('xx')
  return new Promise((resolve, reject) => {
    let len = promises.length
    let res = new Array(len)
    let count = 0
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(
        (data) => {
          res[i] = data
          count++
          if (count === len) return resolve(res)
        },
        (err) => {
          res[i] = err
          count++
          if (count === len) return resolve(res)
        }
      )
    }
  })
}
Promise.allSettled([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((e) => console.log(e))
```



## Jsonp

```js
// jsonp原理：因为jsonp发送的并不是ajax请求，其实是动态创建script标签
// script标签是没有同源限制的，把script标签的src指向请求的服务端地址。

function jsonp(url, data = {}, callback = 'callback') {
  //处理json对象，拼接url
  data.callback = callback
  let params = []
  for (let key in data) {
    params.push(key + '=' + data[key])
  }
  let script = document.createElement('script')
  script.src = url + '?' + params.join('&')
  document.body.appendChild(script)

  //返回Promise
  return new Promise((resolve, reject) => {
    window[callback] = (data) => {
      try {
        resolve(data)
      } catch (e) {
        reject(e)
      } finally {
        //移除script元素
        script.parentNode.removeChild(script)
        console.log(script)
      }
    }
  })
}

//请求数据
jsonp(
  'http://photo.sina.cn/aj/index',
  {
    page: 1,
    cate: 'recommend',
  },
  'jsoncallback'
).then((data) => {
  console.log(data)
})
```





#### 手写一个简易的jQuery ，考虑插件和扩展性

```js
// jquery demo  DOM 查询
class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector)
    const length = result.length
    for (let i = 0; i < length; i++) {
      this[i] = result[i] // 类数组
    }
    this.length = length
    this.selector = selector
  }
  get(index) {
    return this[index]
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i]
      fn(elem)
    }
  }
  on(type, fn) {
    return this.each((elem) => {
      elem.addEventListener(type, fn, false)
    })
  }
}

// const $p = new JQuery('p')
// console.log($p)
// console.log($p.get(1)) // <p>Text 2</p>
// $p.each((elem) => console.log(elem.nodeName)) // P P P
// $p.on('click', (e) => console.log(e.target))
```

## 编写一个通用的事件监听函数

```js
function bindEvent(elem, type, selector, cb) {
  if (cb == null) {
    cb = selector
    selector = null
  }
  elem.addEventListener(type, (event) => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        cb.call(target, event)
      }
    } else {
      // 普通绑定
      cb.call(target, event)
    }
  })
}

// 箭头函数的this 会绑定到全局  所以要改为普通的function
```

## 手写深度比较，模拟`lodash.isEqual`

```js
const obj1 = { a: 10, b: { x: 100, y: { z: 200 } } }
const obj2 = { a: 10, b: { x: 100, y: { z: 200 } } }

console.log(isEqual(obj1, obj2))

// 判断是否是对象或数组
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型 暂不考虑函数
    return obj1 === obj2
  }

  if (obj1 === obj2) return true

  // 两个都是对象或者数组，而且不相等

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  // 以 obj1 为基准 和 obj2 依次递归比较
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key])
    if (!res) return false
  }
  return true
}
```

`Ref`

- [JavaScript专题之如何判断两个对象相等](https://segmentfault.com/a/1190000010567491?utm_source=sf-similar-article)

#### 写一个原型链继承的例子

```js
function Elem(id) {
    this.elem = document.getElementById(id)
  }
Elem.prototype.html = function (val) {
  var elem = this.elem
  if (val) {
    elem.innerHTML = val
    // return this // 方便链式调用
  } else {
    return elem.innerHTML
  }
}
Elem.prototype.on = function (type, fn) {
  var elem = this.elem
  elem.addEventListener(type, fn)
  // return this
}

let div1 = new Elem('div')
div1.html()
div1.html('hello')
div1.on('click', function () {
  console.log(this.innerHTML)
})
// div1.html('hello').on('click', function () { console.log(this.innerHTML) })
```

#### 写一个能遍历对象和数组的forEach函数

```js
let arr = [1, 2, 3, 4, 5]
let obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
function forEach(obj, fn) {
  if (obj instanceof Array) {
    obj.forEach((item, index) => {
      fn(index, item)
    })
  } else {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
          fn(key, obj[key])
      }
    }
  }
}
forEach(arr, function (index, item) {
  console.log(index, item)
})
forEach(obj, function (key, val) {
  console.log(key, val)
})
```











## 数组扁平化

- 数组扁平化是指将一个多维数组变为一个一维数组

```js
const arr = [1, [2, [3, [4,5]]], 6];
// => [1, 2, 3, 4, 5, 6]
```

##### 使用`flat()`

- `const res= arr.flat(Infinity);`

##### 利用正则

- `const res = JSON.parse('['+ JSON.stringify(arr).replace(/\[|\]/g,'')+']');`

##### 递归

- 1、判断`arr[i]`是不是数组，如果是数组则递归调用`flat()`
- ~~2、判断`arr[i]`是不是数字，如果是就`push`，不是就调用~~ (感觉自己的方法不妥，数组又不一定只存放数字)

```js {7}
let newarr1 = []

function flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    // if (typeof arr[i] === 'number') newarr1.push(arr[i])
    // else flat(arr[i])
    if (Array.isArray(arr[i])) flat(arr[i])
    else newarr1.push(arr[i])
  }
  return newarr1
}
```

- `Array.prototype.concat.apply([], arr)`

```js
function unique(arr) {
  // 验证数组中 还有没有 深层数组
  const isDeep = arr.some((item) => item instanceof Array)
  if (!isDeep) return arr
  const res = Array.prototype.concat.apply([], arr)
  // const res = [].concat.apply([], arr)
  return unique(res) // 递归
}
```

##### 使用reduce

```js
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
```



## 数组去重

```js
const arr = [1, 1, '1', 17, true, true, false, false,'true', 'a', {}, {}]
// => [1, '1', 17, true, false,'true', 'a', {}, {}]
```

##### 利用Set

- `return Array.from(new Set(arr))`
- `return [...new Set(arr)]`
- `Array.from()` 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

##### `indexOf includes`

```js
const unique = (arr) => {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    // if (res.indexOf(arr[i]) === -1) res.push(arr[i])
    if (!res.includes(arr[i])) res.push(arr[i])
  }
  return res
}
```

##### `filter`

```js
const unique = (arr) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
```

## 随机数组

##### 随机生成一个正负数，并返回给`sort`方法

```js
function randomSortA (arr) {
  return arr.sort(() => Math.random() - 0.5);
}
```

##### 将当前遍历元素与一个随机位置元素互换

```js
function randSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var rand = parseInt(Math.random() * len)
    ;[arr[i], arr[rand]] = [arr[rand], arr[i]]
  }
  return arr
}
```

##### 随机选中一个值，在原数组中删除它，并将它push到新数组中

```js
function randSort(arr) {
  var newArr = []
  while (arr.length > 0) {
    var randomIndex = Math.floor(Math.random() * arr.length)
    newArr.push(arr.splice(randomIndex, 1)[0])
  }
  return newArr
}
```

##### 使用随机数映射到原数组，再排序

- 将原数组中的每个元素，都绑定一个随机数，然后对随机数做有序排序，再把随机数剔除，就实现了对原数组的随机排序。

```js
function randomSort(arr) {
  let mapped = arr.map(item => ({value: item, sort: Math.random()}));
  mapped.sort((a, b) => a.sort - b.sort);
  return mapped.map(item => item.value);
}
```

##### 洗牌算法

- 原始方法  `O(n^2)` 上面第三种
  - 写下从 1 到 N 的数字
  - 取一个从 1 到剩下的数字（包括这个数字）的随机数 k
  - 从低位开始，得到第 k 个数字（这个数字还没有被取出），把它写在独立的一个列表的最后一位
  - 重复第 2 步，直到所有的数字都被取出
  - 第 3 步写出的这个序列，现在就是原始数字的随机排列
- 现代方法  `O(n)`
  - **在每次迭代时交换这个被取出的数字到原始列表的最后**

```js
Array.prototype.shuffle = function () {
  var nums = this
  let len = nums.length
  while (len > 1) {
    let randomIndex = Math.floor(Math.random() * len--)
    ;[nums[len], nums[randomIndex]] = [nums[randomIndex], nums[len]]
  }
  return nums
}
```

##### 关于`sort`

- `v8`在处理`sort`方法时，使用了插入排序和快排两种方案
  - 当目标数组长度小于10时，使用插入排序；反之，使用快速排序

`Ref`:

- [数组随机排序的4中JS实现](https://juejin.cn/post/6850418109577347079#comment)
- [Fisher–Yates shuffle 洗牌算法](https://gaohaoyang.github.io/2016/10/16/shuffle-algorithm/#top)
- [「前端进阶」数组乱序](https://juejin.cn/post/6844903863812620296)

## 数组中出现次数大于1/2

```js
let arr = [1, 2, 3, 2, 2, 2, 5, 4, 2]; // 2
```

- `sort`

```js
return arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
```

- Map 存储遍历 

```js
function fn(arr) {
  let length = arr.length;
  let map = new Map();
  let count;
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      count = map.get(arr[i]);
      map.set(arr[i], ++count);
    } else {
      map.set(arr[i], 1);
    }
  }

  for (let [key, value] of map) {
    if (value > Math.floor(length / 2)) return key;
  }
}
```

- 摩尔投票

```js
function moer(arr) {
  let candiater = arr[0];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (count === 0) {
      // 如果此时没有候选人 就让当前这人为候选人
      candiater = arr[i];
    }
    if (arr[i] === candiater) {
      // 如果此时有候选人 且与候选人相等 ++
      count++;
    } else count--; // 不一样 count--
  }
  return candiater;
}
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
      if (err) return reject(err)
      resolve(data.toString())
    })
  })
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

