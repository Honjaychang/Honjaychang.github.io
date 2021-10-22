# 模块化

- 解决的问题：加载顺序、变量全局污染

## ES5

```js
// 立即执行函数 解决全局污染
;(function(){
  // 可以使模块拥有独立的作用域  执行上下文
})();
```

#### Demo

```js
//ES5 可以解决全局污染 还是无法解决加载顺序

// index.html
    <script src="./a.js"></script>
    <script src="./b.js"></script>
    <script src="./index.js"></script>

// a.js
let moduleA = (function () {
  let a = [1, 2, 3, 4, 5].reverse()
  return { a: a }
})()

// b.js
let moduleB = (function (moduleA) {
  let b = moduleA.a.concat([6, 7, 8])
  return { b: b }
})(moduleA)

// index.js
;(function (moduleA, moduleB) {
  console.log(moduleA.a)
  console.log(moduleB.b)
})(moduleA, moduleB)
```

## `CommonJs`

- `CommonJs` 是 Node 独有的规范，浏览器中使用就需要用到 `Browserify` 解析了。
- `CommonJs` 引用 就会创建模块实例 实例化`JS`文件
- 同步加载文件  
- 缓存机制（缓存模块  判断前后两次异同
- 服务端 Node
- 导入：`require`
- 导出：`module.exports = {}`

#### Demo

```js
// index.html
    <script src="./index.js"></script>

// a.js
let a = (function () {
  return [1, 2, 3, 4, 5].reverse()
})()
module.exports = {a}//exports.a?

// b.js
let moduleA = require('./a.js')
let b = (function () {
  return moduleA.a.concat([6, 7, 8])
})()
module.exports = {b}

// index.js
let moduleA = require('./a'),
    moduleB = require('./b')
console.log(moduleA.a)
console.log(moduleB.b)
```

## AMD

- `Asynchronous Module Definition` 异步模块定义
- AMD 是由 `RequireJS` 提出的 执行时也需要`requireJs`

```js
define(moduleName,[module],factory)// 模块名 依赖模块 工厂函数
require([module],callback)
```

#### Demo

```js
// index.html
		<script src="./require.js"></script>
    <script src="./index.js"></script>

// index.js
// 前置依赖(等模块全部加载完才执行回调函数) 异步执行(async) 不考虑模块加载顺序
require.config({
  path: {
    moduleA: './a',
    moduleB: './b',
  },
})

require(['moduleA', 'moduleB'], function (moduleA, moduleB) {
  console.log(moduleA.a)
  console.log(moduleB.b)
})

// a.js
define('moduleA', function () {
  let a = [1, 2, 3, 4, 5]
  return {
    a: a.reverse(),
  }
})

// b.js
define('moduleB', ['moduleA'], function (moduleA) {
  let b = [6, 7, 8]
  return {
    b: moduleA.a.concat(b),
  }
})
```

## CMD

- `Common Module Definition` 通用模块定义

```js
define(function (require, exports, module){})
seajs.use([module], function(moduleA,...){})
```

#### Demo

```js
// index.html
		<script src="./sea.js"></script>
    <script src="./index.js"></script>

// index.js
// 依赖就近 按需加载(需要的时候才去加载。 不像依赖前置)
seajs.use(['a.js', 'b.js'], function(moduleA,moduleB,moduleC){
  console.log(moduleA.a)
  console.log(moduleB.b)
})


// a.js
define(function (require, exports, module) {
  let a = [1, 2, 3, 4, 5]
  return {
    a: a.reverse(),
  }
})

// b.js
define(function (require, exports, module) {
  let moduleA = require('a'),
  		b = [6, 7, 8]
  return {
    b: moduleA.a.concat(b),
  }
})

//require 加载 define 定义
//exports 导出 module 操作模块
```

## ES6模块化

- `export`
-  `import... from `
- 加上`default`  `import`时不能使用解构赋值了

#### Demo

```js
// index.html
    <script src="./index.js"></script>

// index.js
import moduleA from './a'
import moduleB from './b'
console.log(moduleA.a)
console.log(moduleB.b)

// a.js
export default {
  a:[1,2,3,4,5].reverse()
}

// b.js
import moduleA from './a'
export default {
  b : moduleA.a.concat([6,7,8])
}
```

## ES6与`CommonJs`区别

- `CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块输出的是值的引用
- `CommonJS`  模块是运行时加载，`ES6`  模块是编译时加载
- `CommonJS`  是单个值导出，`ES6 Module`可以导出多
- `CommonJS`  是动态语法可以写在判断里，`ES6 Module` 静态语法只能写在顶层
- `CommonJS`  的 `this` 是当前模块，`ES6 Module` 的 `this` 是 `undefined`



- 前者支持动态导入，也就是 `require(${path}/xx.js)`，后者目前不支持，但是已有提案
- 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- 前者在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
- 后者会编译成 `require/exports` 来执行的

```js
//export.js	1
exports.a = 0
setTimeout(()=>{
  console.log('来自export', ++exports.a)
},300)

//commonjs	0
const {a} = require('./export.js')
setTimeout(()=>{
  console.log('来自commonjs', a)
},500)

//ES6	1
import {a} from './export'
setTimeout(()=>{
  console.log('来自ES6', a)
},500)
```



## `import`和`export`的区别？

- Module 主要由两个命令组成，import和export，export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
- 导出模块是export，导入模块是import。

模块化的优势有以下几点：

- 防止命名冲突
- 代码复用
- 高维护性