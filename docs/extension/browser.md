# 浏览器相关

## 浏览器输入网址到页面渲染全过程

- DNS 解析：域名解析为 IP 地址
- TCP 连接：三次握手
- 发送 HTTP 请求
- 服务器处理请求 并 返回 HTTP 响应报文

- 浏览器解析渲染页面：`HTML、CSS、JS`文件
- `DOM Tree + CSSOM => Render Tree => JS => Render Tree`
- 连接结束：四次挥手

:::note Ref

- [前端经典面试题: 从输入 URL 到页面加载发生了什么？](https://segmentfault.com/a/1190000006879700)
- [经典面试题：从 URL 输入到页面展现到底发生什么？](https://blog.fundebug.com/2019/02/28/what-happens-from-url-to-webpage/)
- [五月的仓颉 DNS域名解析过程](https://www.cnblogs.com/xrq730/p/4931418.html)

isboyjc

- [「一道面试题」输入URL到渲染全面梳理上-网络通信篇](https://juejin.cn/post/6844904132071915527)
- [「一道面试题」输入URL到渲染全面梳理中-页面渲染篇](https://juejin.cn/post/6844904134307495943)
- [「一道面试题」输入URL到渲染全面梳理下-总结篇](https://juejin.cn/post/6844904155077672968)

:::

## 页面渲染

:::note Ref

- [浏览器环境概述](https://wangdoc.com/javascript/bom/engine.html)
- [css 加载会造成阻塞吗](https://segmentfault.com/a/1190000018130499)
- [JS脚本异步加载浅析](https://juejin.cn/post/6844903661139656718)

:::

### 渲染进程

- 即通常所说的浏览器内核(`Renderer`进程，内部是多线程)
- 每个Tab页面都有一个渲染进程，互不影响
- 主要作用为页面渲染，脚本执行，事件处理等

![image-20211024104939801](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211024104939.png)

### 渲染流程

![Webkit渲染流程图](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/webkitflow.png)

### 解析HTML构建DOM树

- 根据 `HTML` 代码生成 `DOM Tree`

```bash
Bytes(字节) -> Characters(字符) -> Tokens(词) -> Nodes(节点) -> DOM(DOM树)
```

### 解析CSS构建CSSOM树

- 根据 `CSS` 代码生成 `CSSOM`
  - `css` 不会阻塞`DOM`树的解析
  - `css` 加载会阻塞`DOM`树渲染

```bash
Bytes(字节) -> Characters(字符) -> Tokens(词) -> Nodes(节点) -> CSSOM(CSSOM树)
```

### 解析JS脚本

- 遇到正常 `<script>` 则暂停渲染，优先加载并执行`JS`代码，完成再继续

#### `async`

- `<script src="a.js" async></script>`
- 异步执行，并行下载，下载过程不阻碍HTML解析
- 下载完成，立即执行。会 **暂停 HTML 解析**
- `async` 不确保执行顺序，优先执行先下载完成的。一定在 `onload` 前，但不确定在 `DOMContentLoaded` 事件的前或后
- 当同时存在`defer async`的时候 `defer`将会失效

#### `defer`

- `<script src="a.js" defer></script>`
- 延迟执行，并行下载，下载过程不阻碍HTML解析
- 等到 DOM 加载生成后，再执行脚本（即触发 `DOMContentLoaded` 事件前执行

> [图源](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

### ![image-20211013215208374](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211013215208.png)构建渲染树

渲染树 `Render Tree` 由 `DOM树`、`CSSOM树` 合并而成，并且无先后条件，会有所交叉，并行构建。因此会形成一边加载，一边解析，一边渲染的工作现象

- 浏览器首先会从DOM树的根节点开始遍历每个**可见节点**
- 对于每个可见节点，找到其对应的的 CSSOM 规则并应用它们
- 输出可见节点，连同其内容和计算的样式

### 布局

计算它们在设备 视口 内的确切位置和大小

此阶段如果元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树

### 绘制

经由前几步我们知道了哪些节点可见、它们的计算样式以及几何信息，我们将这些信息传递给最后一个阶段将渲染树中的每个节点转换成屏幕上的实际像素，也就是俗称的 `绘制` 或 `栅格化`

#### 回流 重绘

- 回流`reflow`：`render`树中一部分或全部元素需要改变尺寸、布局、或着需要隐藏而需要重新构建
- 重绘`repaint`：`render`树中一部分元素改变，而不影响布局的，只影响外观的，比如颜色
- 回流必将引起重绘

### 合成

图成的概念 未深入

### 总结

- 调用 `GUI` 渲染线程 解析 `HTML CSS `
- 调用 `JS` 引擎 解析 `JS`



- 解析代码：解析 `HTML` 构建 `DOM` 树 解析 `CSS` 构建 `CSSOM` 树
  - 解析过程中碰到 `js` 代码会停止解析去请求
- 对象合成：根据 `DOM CSSOM` 生成 `Render Tree`
- 布局：计算出 `Render Tree` 的布局
- 绘制：将 `Render Tree` 绘制到屏幕



- `CSS` 的加载与解析不会阻塞 `HTML` 的解析，他们是并行的。
  - 但会阻塞渲染树 `RenderTree` 的生成，也会阻塞界面的渲染！
- `CSS` 不会阻塞 `DOM` 的解析，但会阻塞 `DOM` 渲染。
- `JS` 会阻塞 `DOM` 的解析和渲染
  - 浏览器需要等`css|js`都解析完成之后才会执行渲染
- 媒体资源 (如:图片音视频等) 的加载不会阻塞HTML的解析 所以他们可以并行加载

### 渲染优化

> 为什么要将 `CSS <link href="#">` 放在 head 中

- 在`DOM`树生成前就将`CSS`规则加载完
- 在`DOM`生成完成后直接和所有的`CSS`规则整合 => 一步渲染完成 `Render Tree`

> 为何建议将`JS`放在`body`最后

- 不放在最后的话，`JS` 代码会阻塞 `render tree` 的渲染，可能会导致页面渲染时间比较长

> `window.onload` 和 `DOMContentLoaded`的区别

- 建议使用`document.addEventListener('DOMContentLoaded', callback)`

```js
window.addEventListener('load', function () {
  // 页面的全部资源加载完成后才会执行，包括图片、视频等
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完成即可执行，此时图片、视频可能还没有加载完
});
```

> 优化方案

- 缓存 DOM 操作 多次 DOM 变成插入一个`createDocumentFragment`
- 使用`window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
- 使用虚拟 DOM

##### RAF

- **`window.requestAnimationFrame()`** 告诉浏览器：你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。

- 要想动画流畅，更新频率要 60 帧/s，即 16.67ms 更新一次视图
- `setTimeout` 要手动控制频率，而 RAF 浏览器会自动控制

```js
后台标签或者隐藏在iframe中， RAF 会暂停，而setTimeout 依然执行


// 3s 把宽度 从100px -> 640px 增加 540px
// 60帧/s 3s 180帧 每次变化 3px
// 而且当页面切换的时候会暂停执行
const div1 = document.getElementById('div1')
let curWidth = 100
const maxWidth = 640

// setTimeout
function animate() {
  curWidth = curWidth + 3
  div1.style.width = curWidth + 'px'

  console.log(curWidth, div1.style.width)
  if (curWidth < maxWidth) {
    setTimeout(animate, 16.7) // 这里的animate 没加括号
  }
}

// RAF
function animate() {
  curWidth = curWidth + 3
  div1.style.width = curWidth + 'px'

  console.log(curWidth, div1.style.width)
  if (curWidth < maxWidth) {
    window.requestAnimationFrame(animate) // 时间不用自己控制
  }
}
animate()
```







## 性能优化

:::note Ref

- [2020 年了,再不会 webpack 敲得代码就不香了(近万字实战)](https://juejin.cn/post/6844904031240863758)
- [你可能不知道的 9 条 Webpack 优化策略](https://juejin.cn/post/6854573213171580941)

:::

### 性能优化原则

- 多使用内存、缓存或其他方法
- 减少 CPU 计算量，减少网络请求，减少网络加载耗时
- 空间换时间

#### 从何入手

##### 让加载更快

- 减少资源体积：压缩代码
- 减少访问次数：合并代码，SSR 服务器端渲染，缓存
- 使用更快的网络： CDN

##### 让渲染更快

- `CSS` 放在`head` ，`JS`放在`body`最下面
- 尽早开始执行`JS`，用`DOMContentLoaded`
- 触发懒加载（图片懒加载，上滑加载更多）
- 对 DOM 查询进行缓存
- 频繁 DOM 操作，合并到一起插入 DOM 结构
- 节流`throttle`防抖`debounce`

#### 实例

- 资源合并 ==> 请求三次 3kb 和请求一次 9kb 3 次网络请求--> 1 次
- 缓存 ==> webpack 生成的`bundle.[contenthash].js `
  - 如果生成的内容没有发生变化即哈希值没有发生改变 则不需要重新进行请求
  - 静态资源加`hash`后缀，根据文件内容计算`hash`。如果文件内容不变，则`hash`不变，则`url`不变。既然 url 和文件不变，则会自动触发 HTTP 缓存机制，返回 304
- `CDN` ==> 根据地域做网络服务。静态文件 满足 304 机制
- `SSR` ==> 服务器端渲染：网页和数据一起加载，一起渲染
- 非 `SSR` ==> （前后端分离）：先加载网页，再加载数据，再渲染数据 (早先的`JSP ASP PHP` ，现在的`vue React `
- 懒加载

  - 加载`loading`图片
  - 判断哪些图片要加载
  - 隐形加载图片
  - 替换真图片

一张图片就是一个`<img>`标签，浏览器是否发起请求图片是根据`<img>`的`src`属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给`<img>`的`src`赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给`src`赋值

```js
// 可以给img标签统-自定义属性data=src='default.png'，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载
function lazyload() {
  const imgs = document.getElementsByTagName('img');
  const len = imgs.length;
  // 视口高度
  const viewHeight = document.documentElement.clientHeight;
  //滚动务高度
  const scrollHeight =
    document.documentElement.scrolltop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i.offsetTop];
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}
//可以使用节流优化一下
window.addEventlListener('scroll', lazyload);
```

:::note Ref

- [js 实现图片懒加载原理](https://blog.csdn.net/w1418899532/article/details/90515969)

:::

- 缓存 DOM 查询

```js
// 不缓存 DOM 查询结果
for (let i = 0; i < document.getElementsByTagName('p'); i++) {
  // 每次循环 都会计算length 频繁进行DOM查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p');
const length = pList.length;
for (let i = 0; i < length; i++) {
  // 缓存length 只进行一次 DOM 查询
}
```

- 多个 DOM 操作一起插入到 DOM 结构：
  - `document.createDocumentFragment()`
- 尽早开始`JS`执行
- `document.addEventListener('DOMContentLoaded', function () {}`
- 防抖节流

### 首屏优化

- 尽可能的缩小 webpack 或者其他打包工具生成的包的大小
- 路由懒加载
- 组件按需加载
- 图片懒加载
- 服务端渲染 SSR
- gzip

#### CSR SSR

- `CSR` 客户端渲染
- `SSR` 服务端渲染
  - 由服务端把渲染的完整的页面返回给客户端，减少了一次客户端到服务端的一次 http 请求
  - 返回完整页面 就利于 SEO 优化
  - SSR 强在首屏渲染。而 CSR 强在用户和页面多交互的场景



## 存储

:::note Ref

- [HTTP cookies 详解](https://www.kancloud.cn/kancloud/http-cookies-explained/48333)
- [浏览器系列之 Cookie 和 SameSite 属性](https://github.com/mqyqingfeng/Blog/issues/157)

:::

### `cookie`

> 如何设置`cookie` 

- 客户端发送 HTTP 请求到服务器
- 当服务器收到 HTTP 请求时，在响应头里面添加一个 `Set-Cookie` 字段
- 浏览器收到响应后保存下 `Cookie`
- 之后对该服务器每一次请求中都通过 `Cookie` 字段将 `Cookie` 信息发送给服务器

- `cookie`的编码方式：`encodeURI()`

#### 属性

```json
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>; Max-Age=<non-zero-digit>; 
Domain=<domain-value>; Path=<path-value>; Secure; HttpOnly; SameSite=Strict
```

- `name`:  `key-value` 键值对
- `Expires`: `cookie` 的最长有效时间
  - 会话性 `cookie`: `Expires` 属性缺省时，值保存在客户端内存中，并在用户关闭浏览器时失效
  - 持久性 `cookie`，保存在用户的硬盘中，直至过期或者清除 `Cookie`
- `Max-Age`: `cookie` 生成后失效的秒数
  - `Expires` 和 `Max-Age` 都存在，`Max-Age` 优先级更高
- `Domain`: 指定了 `cookie` 可以送达的主机名
  - 如淘宝设置 `Domain = .taobao.com`，这样无论是 `a.taobao.com` 还是 `b.taobao.com` 都可以使用 `cookie`

> 通过设置`document.domain`使得二级域名共享`cookie` 解决跨域问题

- `Path`: 可以限制当前`cookie`只属于某个路径下
  - `Domain` 和 `Path` 标识共同定义了 `cookie` 的作用域：即 `cookie` 应该发送给哪些 URL
- `Secure`：只允许在 `https` 下传输 以免被 窃取 或 篡改
- `HttpOnly`: 使得不能被客户端更改访问，无法通过`js`脚本读取到该`cookie`的信息。但还是能通过 `Application`中手动修改`cookie`，所以只是在一定程度上可以防止`xss`攻击，并不是绝对的安全
- `SameSite`: 让 `cookie` 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击`CSRF`
  - `Strict`: 浏览器将只发送相同站点请求的 `cookie` 完全一致才可以
  - `Lax`: 允许部分第三方请求携带 `cookie`
  - `None`: 无论是否 **跨站** 都会发送 `cookie`

#### 作用

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

#### 缺点

可以从大小、安全、增加请求大小等方面回答

### 三者区别

- 容量
- API 易用性
- 是否跟随`http`请求发送出去

> 比较`cookie、localStorage、sessionStorage`

相同点：都是存储数据，存储在 web 端，并且都是同源

不同点：

- `cookie` 只有 4K 并且每一次 http 请求都会带上`cookie` ，增加请求数据量，浪费带宽
- `sessionStorage`和`localStorage`直接存储在本地，请求不会携带，并且容量比`cookie`要大的多（5M？）
- 生命周期：
  - `sessionStorage` 是临时会话，当前窗口被关闭的时候就清除掉
  - `localStorage` 永久存在，除非手动删除或用代码删除，一般用`localStorage` 会更多一些
  - `cookie` 有过期时间
- `cookie` 和`localStorage`都可以支持多窗口共享(同源策略)，而`session`不支持多窗口共享。但是都支持 a 链接跳转的新窗口

#### API

- `cookie:` 可用`document.cookie = '...'`来修改，但一次只能赋值一个且同一个 key 会覆盖，不同的 key 是追加的过程。
- `localStorage sessionStorage:` API 简易使用`setItem getItem`

- `setItem(key, value)`设置存储内容

- `getItem(key)`读取存储内容

- `removeItem(key)`删除键值为`key`的存储内容

- `clear()`清空所有存储内容

- `key(n)` 以索引值来获取键名

- `length`存储的数据的个数



### `IndexDB`





## HTTP 缓存策略

![image-20211004094906556](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211022223403.png)

#### 浏览器的三级缓存

- 内存 => 磁盘 => 网络请求

#### 强制缓存

- 在过期时间内，未被主动清除 都不会请求服务器 而使用强制缓存 => 协商缓存

- `200 from disk cache` `200 from memory cache`

##### `cache-control`

- `max-age`：浏览器可以接收生存期不大于指定时间（秒）的响应
- `no-cache`：不用强制缓存，让服务端缓存
- `no-store`：不用强制缓存，也不让服务端缓存
- `private`：允许终端用户
- `public`：允许中间代理

##### `Expires`

- 同为控制缓存过期。如果 `cache-control` 与 `expires` 同时存在的话，`cache-control` 的优先级高于`expires`

#### 协商缓存（对比缓存）

- 浏览器和服务器协商，每次都需要和服务器通信
- 第一次请求时，服务器会返回资源和一个资源的缓存标识
- 第二次请求时，浏览器会先将缓存标识发给服务器 然后服务器对标识进行匹配
  - 不匹配 => 资源有更新 => 服务器返回新资源和新的缓存标识
  - 匹配 => 资源未更改 => 返回 304 状态码 读取本地浏览器缓存

> `200 from cache` `304 Not Modified`

- `200 OK from cache` 不向服务器发送请求，直接使用本地缓存文件
- `304 Not Modified` 则向服务器询问，若服务器认为浏览器的缓存版本还可用，那么便会返回304

> 服务端如何判断缓存失效

##### `Last-Modified`

- `Last-Modified` 响应资源的最后修改时间	对应 `If-Modified-Since`
- 只能精确到秒级		配合 `cache-control` 使用

##### `Etag`

- `Etag`是服务器响应请求时，返回当前资源文件的一个唯一标识(类似指纹 由服务器生成)		对应 `If-None-Match`
- 同时存在 会优先使用 `Etag`

主要解决`Last-Modified` 存在的问题

- `Last-Modified` 只能精确到秒级，如果1秒内被多次修改无法获取精确时间
- 文件定期生成，但文件内容不变，会导致`Last-Modified`变化，而无法使用缓存  此时使用 `Etag` 会更合适
- 服务器时间不一致的情况

##### 浏览器加载`JS`文件有缓存

- 浏览器加载 js 文件是根据路径加载，首先根据路径在缓存里查找
- 解决办法：打包时加一些哈希值 or 版本号

:::note Ref

- [js 浏览器缓存机制](https://blog.csdn.net/i13738612458/article/details/80383390?utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-1.control)
- [浏览器缓存带来的前端项目更新问题及解决方法](https://blog.csdn.net/feiyu_may/article/details/88376945)

:::

##### 刷新操作对缓存的影响

- 正常操作:
  - 地址栏输入`url`，跳转链接，前进后退等
  - 强制缓存有效，协商缓存有效
- 手动刷新:
  - `F5`，点击刷新按钮，右击菜单刷新
  - 强制缓存失效，协商缓存有效
- 强制刷新:
  - `ctrl + F5`
  - 强制缓存失效，协商缓存失效

##### 不能被缓存的请求

- HTTP信息头中包含`Cache-Control:no-cache | max-age = 0`，等告诉浏览器不用缓存的请求
- 需要根据`Cookie`，认证信息等决定输入内容的动态请求是不能被缓存的
- 经过`HTTPS`安全加密的请求
- POST请求无法被缓存
- HTTP响应头中不包含`Last-Modified/Etag`，也不包含`Cache-Control/Expires`的请求无法被缓存

## 
