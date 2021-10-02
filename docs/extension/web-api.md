# Web-API

- JS 基础知识 --> 规定语法 --> ECMA 262 标准

- JS Web API --> 网页操作的 API --> W3C 标准

## 内存泄露

##### 什么是内存泄漏?

- 内存泄露是指不再用的内存没有被及时释放出来，导致该段内存无法被使用就是内存泄漏。

##### 为什么会导致内存泄漏?

- 内存泄漏指我们无法在通过`js`访问某个对象，而垃圾回收机制却认为该对象还在被引用，因此垃圾回收机制不会释放该对象，导致该块内存永远无法释放，积少成多，系统会越来越卡以至于崩溃。

## 垃圾回收机制

- `GC => Garbage Collection`
- ♻️回收程序不用的内存或者是之前用过了，以后不会再用的内存空间

> 可达性

- 指那些以某种方式可访问或者说可用的值，它们被保证存储在内存中，反之不可访问则需回收

#### 垃圾回收机制的策略

##### 标记清除法

> `Mark-Sweep`

- 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为0
- 然后从各个根对象开始遍历，把不是垃圾的节点改成1
- 清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间
- 最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收

> 优缺点

- 优点：实现比较简单，只涉及打与不打标记的情况，通过01就可以实现
- 缺点：
  - 内存碎片：清除完之后会出现闲置内存不连续的情况
  - 分配速度慢：`First-fit | Best-fit | Worst-fit` 

> 标记整理 `Mark-Compact`

- 它的标记阶段和标记清除算法没有什么不同，只是标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存

##### 引用计数法

> `Reference Counting`

- 当声明一个变量并给该变量赋值一个引用类型的值时候，该值的计数+1
- 当该值赋值给另一个变量的时候，该计数+1
- 当该值被其他值取代的时候，该计数-1
- 当计数变为 0 的时候，说明无法访问该值了，垃圾回收机制清除该对象

> 优缺点

- 优点：当计数为0 就会直接清除
- 缺点：如果出现循环引用 引用计数就会出现问题 无法回收 （将引用地址置为`null`

#### V8下的优化

:::note Ref

- [前端面试：谈谈 JS 垃圾回收机制](https://segmentfault.com/a/1190000018605776)
- [「硬核JS」你真的了解垃圾回收机制吗](https://juejin.cn/post/6981588276356317214)

:::





## DOM

- `Document Object Model:`文档对象模型

#### DOM 本质

- DOM 是哪种数据结构 ==> 树 DOM 树

#### DOM 节点操作

- DOM 操作的常用 API
  - DOM 节点操作
  - DOM 结构操作
  - `Attribute property`

##### 获取 DOM 节点

```js
const div1 = document.getElementById('div1');
const divList = document.getElementsByTagName('div'); // div集合
const cla = document.getElementsByClassName('red-border'); // 集合
const div1 = document.querySelector('#div1');
const pList = document.querySelectorAll('p'); // 集合
```

##### `attribute`

```js
对DOM结构节点属性;
p.setAttribute('data-name', 'pNode');
console.log(p.getAttribute('data-name'));

p.setAttribute('style', 'font-size:20px');
console.log(p.getAttribute('style'));
```

##### `property`

```js
// 通过js属性 property 形式
const p = pList[0];
p.style.color = 'pink';
p.className = 'ppp';
console.log(p.nodeName); // P nodeName 为大写
console.log(p.nodeType); // 1
```

##### `property` 和 `attribute`区别

- `property:`
  - DOM 元素在 `JavaScript` 中作为对象拥有的属性
  - 修改对象属性，不会体现到`html`结构中
- `attribute:`
  - DOM 元素在文档中作为 `HTML` 标签拥有的属性
  - 修改`html`属性，会改变`html`结构
- 两者都有可能引起 DOM 重新渲染
- 尽量使用`property`
- 数据绑定：
  - `attributes`的数据会同步到`property`上，然而`property`的更改不会改变`attribute`

##### 获取`class`

```js
var dom = document.querySelector('#box');
console.log(dom.getAttribute('class'));
console.log(dom.className);
```

##### DOM 结构操作

- 新增/插入节点
- 获取子元素列表，获取父元素

- 删除子元素

```js
// 新建节点
const p1 = document.createElement('p');
p1.innerHTML = '123';

// 插入节点
document.body.appendChild(p1);

// 移动节点
const p2 = document.getElementById('p2');
div1.appendChild(p2);

// 获取父元素
console.log(p1.parentNode);

// 获取子元素列表
const divChildNodes = container.childNodes;
const divChildNodesP = Array.prototype.slice
  .call(container.childNodes)
  .filter(num => num.nodeType === 1);
// 将节点列表 NodeList 转化为数组 Array 使用filter过滤节点类型为1 的元素
console.log(divChildNodesP);

// 删除子元素
const container = document.getElementById('container');
// const p = document.getElementsByTagName('p')[0]
const child = Array.prototype.slice
  .call(container.childNodes)
  .filter(num => num.nodeType === 1);
container.removeChild(child[0]);
```

##### DOM 性能

- DOM 操作非常“昂贵”，避免频繁的 DOM 操作

###### 如何减少 DOM 操作？

- 对 DOM 查询做缓存

```js
// 不缓存 DOM 查询结果
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // 每次循环都会计算 length ，频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const len = document.getElementsByTagName('p').length;
for (let i = 0; i < len; i++) {
  // 缓存 length 只进行一次DOM 查询
}
```

- 将多次 DOM 操作合并为一次性操作

```js
const list = document.getElementById('list');

// 创建一个文档片段，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragment();

// 执行插入
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  li.innerHTML = 'List item ' + i;
  frag.appendChild(li);
}

// 都完成之后，再插入到DOM树中
list.appendChild(frag);
```

- 一次性插入多个 DOM 节点，考虑性能: `const frag = document.createDocumentFragment()`

##### 小结

- DOM 本质
- DOM 节点操作
- DOM 结构操作
- DOM 性能

## BOM

- `Browser Object Model` 浏览器对象模型

#### BOM-API

- `navigator`

```js
const ua = navigator.userAgent;
const isChrome = ua.includes('Chrome');
console.log(ua, isChrome);
// Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Mobile Safari/537.36 true
```

- `screen`

```js
console.log(screen.width, screen.height);
```

- `location`

```js
console.log(location.hostname, location.port); // 域名 端口
console.log(location.href, location.pathname); // 链接 路径
console.log(location.protocol); // 协议
console.log(location.search); // ？+ 后 搜索的内容
console.log(location.hash); // #后 hash值
```

- `history`

```js
history.back();
history.forward();
```

##### URI 编码

```js
encodeURI(); // 将元字符和语义字符之外的字符，都进行转义
encodeURIComponent(); // 会转码除了语义字符之外的所有字符

encodeURI('http://www.example.com/q=春节');
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节');
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"

decodeURI();
decodeURIComponent();
```

- `URI` => 统一资源标识符
- `URL` => `Uniform Resource Locator`，统一资源定位符

- `URI` 用字符串标识某一互联网资源，而 `URL` 表示资源的地点 => 可见 `URL` 是 `URI` 的子集

##### 如何识别浏览器的类型

- `navigator.userAgent.includes('Chrome')`

##### 分析拆解 url 各个部分

- `location.xxx`

## 事件

#### 一些概念

##### 事件绑定方式

- dom 元素绑定

```js
<button type='button' onclick="alert('hello'')"></button>
```

- on 绑定
  - 同一个 dom 元素，on 只能绑定一个同类型事件，后者会覆盖前者
  - 不同类型的事件可以绑定多个

```js
document.body.onclick = function () {
  alert('hello');
};
// 解绑
document.body.click = null;
```

- `attachEvent`

  - 同一个 dom 元素上事件执行顺序：随机

- `addEventListener('', cb, boolean)`
  - 同一个 dom 元素上事件执行顺序：按照事件的绑定顺序先后执行
  - `bool`: 默认`false` 冒泡阶段 / `true ` 捕获阶段

```js
// 绑定
document.body.addEventListener('click', bodyClick, false);
// 解绑
document.body.removeEventListener('click', bodyClick, false);

e = e || window.event;
```

##### 三个阶段

- 事件捕获： 当鼠标点击或者触发 dom 事件时（被触发 dom 事件的这个元素被叫作事件源），浏览器会从根节点到事件源（由外到内）进行事件传播。
- 目标阶段：事件到达目标元素
- 事件冒泡：与事件捕获相反，事件源到根节点（由内到外）进行事件传播。

##### 阻止默认行为

- `event.stopPropagation()`：阻止事件冒泡 和 捕获
- `event.stopImmediatePropagation()` 阻止绑定事件的其他处理函数
- `event.cancelBubble = true` 做一些兼容性处理
- `event.preventDefault()`：阻止事件默认行为

#### 事件绑定

```js
<p>事件绑定</p>
<button>button</button>

// 事件绑定
const bindEvent = function (elem, type, cb) {
  elem.addEventListener(type, cb)
}


const btn = document.getElementsByTagName('button')[0]
bindEvent(btn, 'click', (event) => {
  // console.log(event.target) // 获取触发的元素
  event.preventDefault() // 阻止事件的默认行为
  alert('Click')
})
```

#### 事件冒泡

- 事件冒泡：触出发元素根据 DOM 结构从内至外进行事件响应

```js
<p>事件冒泡</p>
<div id="div1">
  <p id="p1">激活</p>
  <p id="p2">取消</p>
  <p id="p3">取消</p>
  <p id="p4">取消</p>
</div>
<div id="div2">
  <p id="p5">取消</p>
	<p id="p6">取消</p>
</div>

// 事件冒泡 顺着DOM结构向上冒泡
const p1 = document.getElementById('p1')
const body = document.body
bindEvent(p1, 'click', (e) => {
  e.stopPropagation() // 阻止事件向上冒泡行为 即阻止 弹出 取消 而只执行 弹出 激活
  alert('激活')
  console.log(e.target)
})
bindEvent(body, 'click', (e) => {
  alert('取消')
  console.log(e.target)
})
```



```js
e.type
e.target
e.bubbles // true -> 可以冒泡
// focus onblur scroll 不可以冒泡
```



#### 事件代理（委托）

- 事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

##### 事件委托的原理

- 根据冒泡机制，子元素触发的事件会冒泡到父元素，触发相同类型的事件。那么我把想要绑定的事件挂载到父元素上，并且判断一下触发的元素是不是我想要触发的，就实现了事件代理。
- 不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。

##### 事件委托的作用

- 我们只操作了一次 DOM，提高了程序的性能。

```js
<p>事件代理</p>
<div id="div3">
  <a href="https://www.google.com">a1</a><br />
  <a href="#">a2</a><br />
  <a href="#">a3</a><br />
  <a href="#">a4</a><br />
</div>
<button id="btn1">点击增加a标签</button>

// 事件代理
const div3 = document.getElementById('div3')
bindEvent(div3, 'click', (e) => {
  e.preventDefault() // 阻止a链接默认跳转
  const target = e.target
  console.log(target, target.nodeName)
  if (target.nodeName === 'A') {
    alert(target.innerHTML)
  }
})
```

- 代码简洁

- 减少浏览器内存占用

- 但是，不要滥用（在瀑布流 或者结构复杂的时候比较方便

题目

##### 编写一个通用的事件监听函数

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

##### 描述事件冒泡的流程

- 基于 DOM 树形结构
- 事件会顺着触发元素向上冒泡
- 应用场景：代理

##### 无限下拉的图片列表，如何监听每个图片的点击？

- 事件代理
- 用 `e.target` 获取触发元素
- 用 `matches` 来判断是否是触发元素



## `Xhr & Fetch`

### `XMLHttpRequest`

- 通过`XMLHttpRequest`向服务器发送异步请求，获得服务器返回的数据，利用`js`更新页面

#### 实现

##### Get

- 创建`XMLHttpRequest`对象，也就是创建一个异步调用对象
- 创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息
- 设置响应 HTTP 请求状态变化的函数
- 发送 HTTP 请求
- 获取异步调用返回的数据
- 使用`JavaScript`和`DOM`实现局部刷新

```js
// XMLHttpRequest get 请求
let xhr;

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP'); //兼容ie5/6
}
// 0
xhr.open('GET', 'data.json', false); // 是否异步 false // 1
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 2 3 4
    console.log(JSON.parse(xhr.responseText));
    console.log(xhr.responseText);
  } else {
    console.log('some error happened');
  }
};
xhr.send(null);
```

##### Post

```js
// XMLHttpRequest post 请求
const xhr = new XMLHttpRequest();
xhr.open('POST', '/login', true); // 是否异步 true --> 异步
/* xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
 * xhr.send('status=1&flag=1')
 * POST请求方式必须设置这个请求头信息，目的是请求体中的数据转换为键值对，这样后端接收到status=1&flag=1这样的数据才知道是这是一个POST方式传来的数据
 */
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
    console.log(xhr.responseText);
  } else {
    console.log('some error happened');
  }
};
const postData = {
  username: 'zhangsan',
  password: 'xxx',
};
xhr.send(JSON.stringify(postData));
```

#### 状态码

##### `xhr.readyState`

- 0 -（请求未初始化）还没有调用`send()`方法
- 1 -（服务器连接已建立）已调用`send()`方法，正在发送请求
- 2 -（请求已接收） `send()`方法执行完成，已经接收到全部响应内容
- 3 -（请求处理中）正在解析响应内容
- 4 -（请求已完成，且响应已就绪）响应内容解析完成，可以在客户端调用

```js
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.readyState); // readyState 为 0

xhr.open('GET', '/api', true);
console.log('OPENED', xhr.readyState); // readyState 为 1

xhr.onprogress = function () {
  console.log('LOADING', xhr.readyState); // readyState 为 3
};

xhr.onload = function () {
  console.log('DONE', xhr.readyState); // readyState 为 4
};

xhr.send(null);
```

##### `xhr.status`

- 2xx - 表示成功处理请求，如 200
- 3xx - 需要重定向，浏览器直接跳转，如 301 302 304
- 4xx - 客户端请求错误，如 404 403
- 5xx - 服务器端错误

### `AJAX`

- `Asynchronous Javascript and XML`
- 异步`JavaScrpt`和`xml`，用于在 Web 页面中实现异步数据交互，实现页面局部刷新
- `ajax` 基于 `XMLHttpRequest`分别执行成功和失败的回调。

优点：

- 异步请求响应快，用户体验好（使用异步的方式与服务器通信，不打断用户的操作）
- 页面无刷新、数据局部更新（在不刷新整个页面的情况下维持与服务器通信）
- 按需取数据，减少了冗余请求和服务器的负担。前端和后端负载均衡（将一些后端的工作交给前端，减少服务器与宽度的负担）

缺点：

- 对搜索引擎不友好
- `ajax`不支持返回上一次请求内容 不支持浏览器`back`按钮
  - `location.hash`来解决`Ajax`过程中导致的浏览器前进后退按键失效
- 可能造成请求数的增加 跨域问题限制

### `axios`

- `Axios` 是一个基于 `promise` 的 `HTTP` 库，可以用在浏览器和 `node.js` 中。它本质也是对原生`XMLHttpRequest` 的封装，只不过它是 `Promise` 的实现版本，符合最新的ES规范。

### `Fetch`

`Fetch API`提供了一个 `JavaScript` 接口，用于访问和操作`HTTP`管道的部分，例如请求和响应。它还提供了一个全局`fetch()`方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

`fetch`是低层次的API，代替`XHR`，可以轻松处理各种格式，非文本化格式。可以很容易的被其他技术使用，例如`Service Workers`。但是想要很好的使用`fetch`，需要做一些封装处理。

```js
fetch(url, {
  method: 'POST', 
  mode: 'no-cors', // 跨域
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
```

- `fetch` 请求默认是不带 `cookie` 的，需要设置 `fetch(url, {credentials: 'include'})`
- `fetch`只对网络请求报错，对`400`，`500`都当做成功的请求，需要封装去处理
- `fetch`不支持`abort`，不支持超时控制，使用`setTimeout`及`Promise.reject`的实现超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- `fetch`没有办法原生监测请求的进度，而`XHR`可以

## 跨域

#### 同源策略

- `ajax`请求时，浏览器要求当前网页和 `server` 必须同源（安全）
- 同源：协议、域名、端口，三者必须一致
  - 子域名也不同源

如下所示就是不同源，且协议、域名、端口都不同源

```basic
前端 : http://a.com:8080/;
server : https://b.com/api/xxx

三者都不同源: http VS https		a VS b		8080 VS 443

同源策略仅限于浏览器 在浏览器中生效
服务端并没有，如：爬虫、攻击……
```

- 加载 **`图片 css js`** 可无视同源策略

```js
<img src=跨域的图片地址/>  //但是图片可能出现防盗链 这是由服务器端限制的

<link href=跨域的css地址/>

<script src=跨域的js地址></script>

<img />可用于统计打点，可使用第三方统计服务

<link/><script>可使用CDN， CDN 一般都是外域

<script>可实现 JSONP
```

- 跨域
  - 所有的跨域请求，都必须经过 `server` 端 允许和配合
  - 未经 `server` 端允许就实现跨域，说明浏览器有漏洞，危险信号

#### 跨域解决方案

##### 反向代理

- 在`vue`中使用`proxy`进行跨域的原理是：将域名发送给本地的服务器（启动 vue 项目的服务,`loclahost:8080`），再由本地的服务器去请求真正的服务器。

```js
devServer: {
    proxy: {  //配置跨域
      '/api': {
            target: 'xxx.com',  // 后台接口地址
            changOrigin: true,  // 允许跨域
            pathRewrite: { // 重写路径
              '^/api': '/'
        }
      },
    }
  },

// axios.defaults.baseURL = '/api'
```

:::note Ref

- [[VUE] vue 配置反向代理解决跨域](https://juejin.cn/post/6844904033874886663)

:::

##### `CORS（服务端支持）`

- `CORS(Cross-Origin Resourse Sharing)`，跨域资源共享
- 相比 `JSONP` 只能发`GET`请求，`CORS` 允许任何类型的请求

```js
// CORS  服务器端设置 http header

// 第二个参数填写允许跨域的域名，不建议直接写*
response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
response.setHeader(
  'Access-Control-Allow-Methods',
  'PUT,POST,GET,DELETE,OPTIONS'
);

// 接收跨域的cookie
response.setHeader('Access-Control-Allow-Credentials', 'true');
```

##### `JSONP`

- `JSON with Padding => <script>` `AJAX => XML`
- `JSONP` 缺点：只限于`get`请求 但是兼容性好
- 封装`jsonp`的核心就在于我们监听`window`上的`jsonp`进行回调时的名称

```js
<script src='http://api.foo.com?callback=bar'></script>
```

- 告诉服务器，客户端的回调函数: `bar`
- 服务器收到请求后，拼接一个字符串，将 `JSON` 数据放在函数名里面，作为字符串返回`bar({...})`
- 客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是`<script>`标签请求的脚本内容。这时，客户端只要定义了`bar()`函数，就能在该函数体内，拿到服务器返回的 `JSON` 数据。

下面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求

```js
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
};

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
}
```

- `jQuery` 实现`jsonp`

```js
<script>
  $.ajax({
  url: 'http://127.0.0.1:5500/JS/jsonp.js',
  dataType: 'jsonp',
  jsonpCallback: 'callback',
  success: function (data) {
    console.log(data)
  },
})
</script>
```

##### `WebSocket`

- `websocket` 是 HTML5 的一个新协议，它允许服务端向客户端传递信息，实现浏览器和客户端双工通信。
- 使用`ws://`和`wss://`（加密）作为协议前缀 该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信
- `websocket` 弥补了 HTTP 不支持长连接的特点

关于`webSocket`

- `HTTP` 通信只能由客户端发起 如果服务器有连续的状态变化，客户端只能使用“轮询”的方法获取新的信息 效率很低 浪费资源（不停连接 或 连接始终打开
- `WebSocket` 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息

```js
var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function (evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};

ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data);
  ws.close();
};

ws.onclose = function (evt) {
  console.log('Connection closed.');
};
ws.onerror = function (evt) {};
ws.addEventListener('error', function (event) {});
```

- `webSocket.readyState` 返回实例对象的当前状态
  - `CONNECTING`：值为 0，表示正在连接
  - `OPEN`：值为 1，表示连接成功，可以通信了
  - `CLOSING`：值为 2，表示连接正在关闭
  - `CLOSED`：值为 3，表示连接已经关闭，或者打开连接失败

心跳机制

- 每隔一段时间会向服务器发送一个数据包，告诉服务器自己还活着，同时客户端会确认服务器端是否还活着，如果还活着的话，就会回传一个数据包给客户端来确定服务器端也还活着，否则的话，有可能是网络断开连接了，需要重连。

实现思路

- 每隔一段固定的时间，向服务器端发送一个 `ping` 数据，如果在正常的情况下，服务器会返回一个 `pong` 给客户端，如果客户端通过 `onmessage` 事件能监听到的话，说明请求正常，这里我们使用了一个定时器，每隔 3 秒的情况下，如果是网络断开的情况下，在指定的时间内服务器端并没有返回心跳响应消息，因此服务器端断开了，因此这个时候我们使用 `ws.close` 关闭连接，在一段时间后可以通过 `onclose` 事件监听到。因此在 `onclose` 事件内，我们可以调用 `reconnect` 事件进行重连操作。

##### `window.postMessage`

- `window.postMessage(data, origin, source)`
