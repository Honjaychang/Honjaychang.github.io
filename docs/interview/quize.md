#### 作用域和自由变量

- 所有的自由变量的查找，是在**函数定义**的地方，向上级作用域查找  而不是在执行的地方！！！

```js
let i
for (i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 300)
} // 4 4 4


let a = 100
function test() {
  alert(a) // 100
  a = 10
  alert(a) // 10
}
test()
alert(a) // 10
```

- 

```js
var var1 = 1
function a() {
  console.log(var1) // 1
  console.log(var2) // ReferenceError: var2 is not defined
}

function b() {
  var var1 = 2
  var var2 = 3
  a() // 闭包 调用 a() 无法访问b()里面的变量
}
b()
console.log(var1)
```





#### 类型转换

##### `a == 1 && a == 2 && a == 3`

```js
var a = {
  _default: 0,
  // == 发生隐式转换 使其转为字符串
  toString: function () {
    return ++this._default
  },
}

if (a == 1 && a == 2 && a == 3) {
  console.log('winner')
}
```

那如何使其在`===`的情况下也成立呢

```js
// getter -> 访问一个变量的时候进行拦截
var _default = 0
Object.defineProperty(window, 'a', {
  get() {
    return ++_default
  },
})

if (a === 1 && a === 2 && a === 3) {
  console.log('winner')
}
```

##### 隐式转换 `{} []`

```js
let len1 = ({} + {}).length // 类型转换 toString
// ({}).toString() // => [object object]
// '[object object][object object]'.length // => 30

let len2 = ([] + []).length // 类型转换 toString
// [].toString() // => '' // 0

let len3 = function () {}.length // 形参个数 0
```



```js
console.log(!!' ' + !!'' + !!false)
// true + false + false => 1 
```





```js
window.a || (window.a = '1')
console.log(window.a)// 1
//()优先级高于 || 先赋值 这样前面的window.a就是真 直接返回了
```





##### `[10, 20, 30].map(parseInt)`

- `map`的参数和返回值
- `parseInt`参数和返回值

```js
[10, 20, 30].map(parseInt)
// [ 10, NaN, NaN ]

;[10, 20, 30].map((item, index) => {
  return parseInt(item, index)
  // parseInt(10, 0) parseInt(20, 1) parseInt(30, 2)
})
```





#### This

- 

```js
const User = {
  count: 1,
  getCount: function () {
    return this.count
  },
}
console.log(User.getCount()) // 1 this-->user
const func = User.getCount
console.log(func()) // undefined 

// 函数里面的this在执行的时候才知道指向谁 call apply bind指向绑定的对象
console.log(func.call(User)) // 1
```

- 

```js
function foo() {
  console.log(a)
}
function bar() {
  var a = 3
  console.log(this.a + a)
  foo()
}
var a = 2
bar() // 5 2 // this指向 win
bar.call({ a: 4 }) //7 2
```



#### Promise

- 

```js
new Promise((resolve) => {
  console.log(1);
  setTimeout(resolve, 0, "done"); // fn timer 传递给执行函数的其他参数
}).then(console.log);

console.log("start"); // 1 start done
```

- 

```js
setTimeout(function () {
  console.log(1)
}, 1000)

new Promise((resolve, reject) => {
  console.log(2)
  resolve()
}).then(console.log(3))

console.log(4) // 2 3 4 1
```

- 

```js
setTimeout(function () {
  console.log(1)
}, 0)
new Promise(function executor(resolve) {
  console.log(2)
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve()
  }
  console.log(3)
}).then(function () {
  console.log(4)
})
console.log(5) // 2 3 5 4 1
```

- 

```js
var p = new Promise().then(f1,f2).then(f3,f4)

var p = new Promise((resolve, reject) => {
    reject(1);
}).then(()=>{
    console.log(1);
    return true
},()=>{
    console.log(2); // 2
    //reject(1);
    return false;
}).then((x)=>{
    console.log(x) // false
},()=>{
    console.log(4)
})

var p = new Promise((resolve, reject) => {
    reject(1);
}).then(()=>{
    console.log(1);
    return true
},()=>{
    console.log(2); // 2
    reject(1);
    return false;
}).then((x)=>{
    console.log(x)
},()=>{
    console.log("reject成功调用") // reject成功调用
})
```

- 

```js
setTimeout(function () {
  Promise.resolve().then(function () {
    console.log(8)
  })
  console.log(2)
}, 0)

setTimeout(function () {
  console.log(3)
})

Promise.resolve()
  .then(function () {
    console.log(4)
    setTimeout(function () {
      console.log(7)
    })
  })
  .then(function () {
    console.log(5)
  })

console.log(6)

// 6 4 5 2 8 3 7
// 同步 不用说   setTimeout 加入 宏任务队列  promise 微任务  6
// 微任务输出4 同时将setTimeout 加入 宏任务队列 继续执行微任务 输出5  4 5 此时微任务空 宏任务3个
// 执行第一个宏任务 2 8
// 执行第二个宏任务 3
// 执行第三个宏任务 7
```











#### Set get应用

```js
var obj = {
  _a: 1,
  get a() {
    return this._a;
  },
  set a(val) {
    if (val % 2 === 1) {
      this._a = val;
    } else {
      // throw new Error("wrong");
      this._a = this._a;
    }
  },
};



let obj = {};
let aValue = 1;
Object.defineProperty(obj, "a", {
  // value: 1, // 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。
  get: function () {
    return aValue;
  },
  set: function (val) {
    aValue = val % 2 === 1 ? val : aValue;
  },
});

class Obj {
  constructor() {
    this._a = 1;
  }
  set a(val) {
    if (val % 2 === 1) this._a = val;
    else this._a = this._a;
  }
  get a() {
    return this._a;
  }
}
let obj = new Obj();

console.log(obj.a); // 1
obj.a = 2;
console.log(obj.a); // 1
obj.a = 3;
console.log(obj.a); // 3
```









```js
function formatDate(t, str) {
  var obj = {
    y: "",
    m: "",
    d: "",
  };
  return str.replace(/([a-z]+)/gi, function ($1) {
    return obj[$1];
  });
}
console.log(formatDate(new Date(1409894060000), "yyyy-MM-dd HH:mm:ss 星期w"));
```



```js
node.contains( otherNode )

该Node.contains()方法返回一个Boolean值，该 值指示节点是否为给定节点的后代，即节点本身，其直接子代（childNodes）之一，子代的直接子代之一，等等。

// 查找两个节点的最近的一个共同父节点，可以包括节点自身
// oNode1 和 oNode2 在同一文档中，且不会为相同的节点
function commonParentNode(oNode1, oNode2) {
  return oNode1.contains(oNode2)
    ? oNode1
    : commonParentNode(oNode1.parentNode, oNode2);
}
```



```js
// 获取 url 中的参数
// 1. 指定参数名称，返回该参数的值 或者 空字符串
// 2. 不指定参数名称，返回全部的参数对象 或者 {}
// 3. 如果存在多个同名参数，则返回数组

// http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key

// [1, 2, 3]

function getUrlParam(sUrl, sKey) {
  let res = [];
  let obj = {};
  let param = sUrl.split("?")[1].split("#")[0]; // key=1&key=2&key=3&test=4
  let arr = param.split("&"); // [ 'key=1', 'key=2', 'key=3', 'test=4' ]
  console.log(param, arr);
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



```js

function namespace(oNamespace, sPackage) {
  sPackage.split(".");
}
// 根据包名，在指定空间中创建对象
console.log(namespace({ a: { test: 1, b: 2 } }, "a.b.c.d"));
// {a: {test: 1, b: {c: {d: {}}}}}


// 而包名字符串是简单顺序的，所以可以直接 split 出来遍历，利用引用赋值的特性逐级跟进到包里面（可以把遍历用的 ns 想象成指针）：
function isPlainObject(value) {
  return Object.prototype.toString.call(value).slice(8, -1) == "Object";
} // 判断对象

function namespace(oNamespace, sPackage) {
  var scope = sPackage.split("."); // ['a', 'b', 'c', 'd']
  var ns = oNamespace;
  for (var i = 0; i < scope.length; ++i) {
    // 如果 scope[i]不是自身属性 或者 ns[scope[i]] 不是对象
    if (!ns.hasOwnProperty(scope[i]) || !isPlainObject(ns[scope[i]])) {
      ns[scope[i]] = {};
    }
    ns = ns[scope[i]];
  }
  return oNamespace;
}
console.log(namespace({ a: { test: 1, b: 2 } }, "a.b.c.d"));
// {a: {test: 1, b: {c: {d: {}}}}}

// ns
// { a: { test: 1, b: 2 } }
// a => { test: 1, b: 2 }
// b => {}
// c => {}
// d => {}

// oNamespace
// { a: { test: 1, b: 2 } }
// a => { a: { test: 1, b: 2 } }
// b => { a: { test: 1, b: { } } }
// c => { a: { test: 1, b: { c: { } } } }
// d => { a: { test: 1, b: { c: { d: { } } } } }

// 递归
function namespace(oNamespace, sPackage) {
  var pointer = oNamespace;
  function fn(oNamespace, sPackage) {
    var list = sPackage.split(".");
    if (list[0] === "") {
      return;
    }
    if (oNamespace[list[0]] instanceof Object) {
      namespace(oNamespace[list[0]], list.slice(1).join("."));
    } else {
      oNamespace[list[0]] = {};
      namespace(oNamespace[list[0]], list.slice(1).join("."));
    }
  }
  fn(oNamespace, sPackage);
  return pointer;
}
console.log(namespace({ a: { test: 1, b: 2 } }, "a.b.c.d"));

```









##### 字符串操作

- 语句分割 `ss= s.split(" ");` 以空格形式分割 返回新数组

```javascript
return str.split(/\W/) //和正则一起使用
```

- 通过比较前后出现次数 来确定只出现过一次

```js
arr.indexOf(elem) != arr.lastIndexOf(elem) 
```

- 

- 字符串反转 `return str.split("").reverse().join("");`

- 单词的首字母大写

```javascript
arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1); 
arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1)
```

- `对多个空格的处理`

```javascript
urlSlug(" Winter Is  Coming")应返回"winter-is-coming"。
// 全局变量
var globalTitle = "Winter Is Coming";

function urlSlug(title) {
  return title.split(/\W/)
    .filter(obj => {
      return obj !== "";
    }).join('-').toLowerCase();
}
var winterComing = urlSlug(globalTitle); // 应为 "winter-is-coming"
```

- 

```javascript
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
}
// Using a regex, replace characters with it's corresponding html entity
return str.replace(/([&<>"'])/g, (match) => htmlEntities[match])
```

##### 数组操作

不改变原始数组情况下

- 将两个数组合并并返回

```js
arr1.concat(arr2)

const arr = [1, 2]
[].push.apply(arr, [3, 4]) // 4
console.log(arr) // [1, 2, 3, 4]
```

- 向数组末尾添加元素

```js
function append(arr, item) {
  return [...arr,item]
  // return arr.concat(item)
}
```

- 将数组末尾元素删除

```js
// return arr.slice(0, arr.length-1)
return arr.slice(0, -1)
```

- 获取数组中最大的一项

```js
Math.max.apply(null, arr);
sort()
```





- 

```js
fn.apply(null, [].slice.call(arguments, 1))
fn(...[].slice.call(arguments, 1))
```











#####  `url` 参数解析

```js
const search = location.search.substr(1) // ?...

const pList = new URLSearchParams('?a=10&b=20&c=30')
for (const [key, value] of pList) {
  console.log(key,value) // a 10 b 20 ...
}
```







```js
在正则表达式中，利用()进行分组，使用斜杠加数字表示引用，\1就是引用第一个分组，\2就是引用第二个分组。将[a-zA-Z]做为一个分组，然后引用，就可以判断是否有连续重复的字母。


function containsRepeatingLetter(str) {
  console.log(str.match(/([a-zA-Z])\1/)); 
  // [ 'll', 'l', index: 4, input: 'l311ll3t', groups: undefined ]
  return /([a-zA-Z])\1/.test(str);
}

function containsRepeatingLetter(str) {
  for (let i = 0; i < str.length; i++) {
    if (
      str[i] === str[i + 1] &&
      str[i].charCodeAt(0) >= 65 &&
      str[i].charCodeAt(0) <= 122
    ) {
      return true;
    }
  }
  return false;
}
```

##### 判断字符串以字母开头，后面字母数字下划线，长度6-30

```js
const reg = /^[a-zA-Z]\w{5,29}$/

// ^[a-zA-Z] 匹配字母开头
// \w{5,29}$ 匹配后面的5-29的字母数字或下划线 结尾
```



##### 手写字符串`trim`方法，保证浏览器兼容性

```js
String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
// 原型 this 正则
```







#### 字符转Base64-最优解

- `（window.btoa，window.atob）`

```js
let encodedData = window.btoa("this is a example");
console.log(encodedData); // dGhpcyBpcyBhIGV4YW1wbGU=

let decodeData = window.atob(encodedData);
console.log(decodeData); // this is a example
```

###### [第 143 题：将'10000000000'形式的字符串，以每3位进行分隔展示'10.000.000.000',多种实现方式 #296]

#### 常规

```js
const splitStr = (str, point = 3, split = '.') => {
    let newStr = '';
    const reverseStr = str.split('').reverse().join('');
    for (const s in reverseStr) {
        newStr = (s !== '0' && s % point === 0) ? newStr + split + reverseStr[s] : newStr + reverseStr[s];
    }
    return newStr.split('').reverse().join('');
}
```

#### 奇淫巧技

```js
// 德国以 . 分割金钱, 转到德国当地格式化方案即可
10000000000..toLocaleString('de-DE') 

// 寻找字符空隙加 .
'10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

// 寻找数字并在其后面加 . 
'10000000000'.replace(/(\d)(?=(\d{3})+\b)/g, '$1.')
```

两数之和

```js
// nums = [2,7,11,5]; target = 9; return index
// 普通遍历
function returnIndex(nums, target) {
  const length = nums.length
  for (let i = 0; i < length; i++) {
    let res = target - nums[i]
    for (let j = length; j > i; j--) {
      if (res === nums[j]) {
        return [i, j]
      }
    }
  }
  return []
}

returnIndex([2, 7, 11, 5], 9) // 0, 1
returnIndex([3, 4, 3, 4], 6) // 0, 2

// 哈希表
// new Map() 遍历数组 计算每一个数 组成target的差值
// 如果map里面存在 差值 则直接返回 差值的val 以及当前的 i
// 如果map里面没有 则将当前的val, index 存入map
// 遍历完还没有得到解的话则返回 []

function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let res = target - nums[i]
    if (map.has(res)) {
      return [map.get(res), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}

twoSum([2, 7, 11, 5], 9) // 0, 1
twoSum([3, 4, 3, 4], 6) // 0, 2
```







Tree

```js
// 树形结构数据结构化

const data = [
  { id: 1, pid: 0 },
  { id: 2, pid: 1 },
  { id: 3, pid: 1 },
  { id: 4, pid: 3 },
  { id: 5, pid: 0 },
  { id: 6, pid: 5 },
]

/**
 * { id: 1, pid: 0 
 *   children: [
 *      { id: 2, pid: 1 },
        { id: 3, pid: 1 
          children: [
            { id: 4, pid: 3 },
          ]
        }
      ]
 * }
 * { id: 5, pid: 0 
 *   children: [{ id: 6, pid: 5}]
 * }
 */

// 先筛选出顶级数据 然后处理顶级和子集 最后递归处理子集与子集的子集
function formatDataTree(data) {
  let parents = data.filter((p) => p.pid === 0)
  let children = data.filter((p) => p.pid !== 0)

  dataToTree(parents, children)

  return parents
  // parents children 都是数组
  function dataToTree(parents, children) {
    parents.map((p) => {
      children.map((c, i) => {
        if (c.pid === p.id) {
          let _children = JSON.parse(JSON.stringify(children))
          _children.splice(i, 1)
          dataToTree([c], _children)
          if (p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }
}

console.log(formatDataTree(data))

// 扁平化数据
function formatDataTree2(data) {
  let _data = JSON.parse(JSON.stringify(data))
  return _data.filter((p) => {
    let _arr = _data.filter((c) => c.pid === p.id)
    _arr.length && (p.children = _arr)
    return p.pid === 0
  })
}

console.log(formatDataTree2(data))

```













##### 实际开发中闭包的应用场景，举例说明

- 隐藏数据：如做一个简单的cache 工具

```js
// 闭包隐藏数据，只提供API
function createCache() {
  const data = {} // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    },
  }
}
const c = createCache()
c.set('a', 100)
console.log(c.get('a')) //100
```

##### 创建10个`<a>`标签点击的时候弹出来对应的序号

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

