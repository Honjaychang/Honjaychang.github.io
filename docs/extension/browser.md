# Browser

## 运行环境

### 页面渲染

:::note Ref

- [浏览器环境概述](https://wangdoc.com/javascript/bom/engine.html)
- [css 加载会造成阻塞吗](https://segmentfault.com/a/1190000018130499)
- [JS脚本异步加载浅析](https://juejin.cn/post/6844903661139656718)

:::

![Webkit渲染流程图](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/webkitflow.png)

#### 构建DOM树

- 根据 `HTML` 代码生成 `DOM Tree`

```bash
Bytes(字节) -> Characters(字符) -> Tokens(词) -> Nodes(节点) -> DOM(DOM树)
```

#### 构建CSSOM树

- 根据 `CSS` 代码生成 `CSSOM`
  - `css` 不会阻塞`DOM`树的解析
  - `css` 加载会阻塞`DOM`树渲染

```bash
Bytes(字节) -> Characters(字符) -> Tokens(词) -> Nodes(节点) -> CSSOM(CSSOM树)
```

> 为什么要将 `CSS <link href="#">` 放在 head 中

- 在`DOM`树生成前就将`CSS`规则加载完
- 在`DOM`生成完成后直接和所有的`CSS`规则整合 => 一步渲染完成 `Render Tree`

#### 解析JS脚本

- 遇到 `<script>` 则暂停渲染，优先加载并执行`JS`代码，完成再继续

> 为何建议将`JS`放在`body`最后

- 不放在最后的话，`JS` 代码会阻塞 `render tree` 的渲染，可能会导致页面渲染时间比较长

##### `defer`

- `<script src="a.js" defer></script>`
- `defer`的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本
- 浏览器发现带有`defer`属性的`script`会继续往下解析 HTML 网页，同时并行下载`script`的外部脚本，等待网页解析完成再去执行脚本

##### `async`

- `<script src="a.js" async></script>`
- `async`的作用是使用另一个进程下载脚本，下载时不会阻塞渲染
- 浏览器发现带有`async`属性的`script`会继续往下解析 HTML 网页，同时并行下载`script`的外部脚本。当脚本下载完成会暂停 HTML 解析，先去执行脚本，执行完再来解析 HTML。 这与`defer`有点差异
- `async`会无视脚本顺序，优先执行先下载完成的
- 当同时存在`defer async`的时候 `defer`将会失效

> `window.onload` 和 `DOMContentLoaded`的区别

- 建议使用`document.addEventListener('DOMContentLoaded', fn(){...})`

```js
window.addEventListener('load', function () {
  // 页面的全部资源加载完成后才会执行，包括图片、视频等
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完成即可执行，此时图片、视频可能还没有加载完
});
```

#### 构建渲染树

- 将 `DOM Tree` 和 `CSSOM` 整合形成 `Render Tree`
- 根据 `Render Tree` 渲染页面

- 直至把 `Render Tree` 渲染完成

#### 回流 重绘

- 回流`reflow`：`render`树中一部分或全部元素需要改变尺寸、布局、或着需要隐藏而需要重新构建
- 重绘`repaint`：`render`树中一部分元素改变，而不影响布局的，只影响外观的，比如颜色
- 回流必将引起重绘

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

#### 总结

- 调用 `GUI` 渲染线程 解析 `HTML CSS `
- 调用 `JS` 引擎 解析 `JS`



- 解析代码：解析 `HTML` 构建 `DOM` 树 解析 `CSS` 构建 `CSSOM` 树
  - 解析过程中碰到 `js` 代码会停止解析去请求
- 对象合成：根据 `DOM CSSOM` 生成 `Render Tree`
- 布局：计算出 `Render Tree` 的布局
- 绘制：将 `Render Tree` 绘制到屏幕



- `CSS` 的加载与解析不会阻塞 `HTML` 的解析，他们是并行的。
  - 但会阻塞渲染树 `RenderTree` 的生成，也会阻塞界面的渲染！
- 媒体资源 (如:图片音视频等) 的加载不会阻塞HTML的解析 所以他们可以并行加载



















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

## 安全

### `XSS` 跨站脚本攻击

#### 攻击

> 反射型`XSS`

- 反射型`XSS`，非持久化，需要欺骗用户自己去点击链接才能触发`XSS`代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。

> 存储型`XSS`

一个博客网站，我发表一篇博客，其中嵌入`<script>`脚本，脚本内容：获取`cookie`，发送到我的服务器（服务器配合跨域）。发布这篇博客，有人查看它，我轻松收割访问者的`cookie`。

#### 预防

> 转译字符

- 前端要替换，后端也要替换，都做总不会有错
- `https://www.npmjs.com/package/xss`

```js
function escape(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quto;');
  str = str.replace(/'/g, '&#39;');
  str = str.replace(/`/g, '&#96;');
  str = str.replace(/\//g, '&#x2F;');
  return str;
}
```

> `HttpOnly`

- 禁止通过`document.cookie`的方式获取`cookies`

> 设置白名单或者黑名单

- 对于富文本编辑器 建议使用 白名单

> `csp`

- `Content Security Policy` 内容安全策略
- 实质：白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行

如何启用`CSP`

- 通过 HTTP 头信息的`Content-Security-Policy`的字段

```js
Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```

- 通过网页的`<meta>`标签

```js
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

- 如上设置
  - 脚本：只信任当前域名
  - `<object>`标签：不信任任何 URL，即不加载任何资源
  - 样式表：只信任`cdn.example.org`和`third-party.org`
  - 框架 `(frame)`：必须使用`HTTPS`协议加载
  - 其他资源：没有限制

### `CSRF` 跨站请求伪造

#### 攻击

原理： 诱导用户打开黑客的网站，在黑客的网站中，利用用户登录状态发起跨站点请求。

1. 浏览器向网站 A 发起通信请求
2. 网站 A 验证通过，建立了通信连接，在浏览器存了 A 的 cookie
3. 浏览器在未关闭 A 的连接下访问网站 B
4. 网站 B 含有恶意请求代码，向网站 A 发起请求
5. 浏览器根据 B 发起的请求并且携带 A 的 cookie 访问 A
6. 网站 A 验证 cookie 并且响应了这个请求

网站 B 就通过盗用保存在客户端的 cookie，以客户端的身份来访问网站 A，以客户端身份进行一些非法操作。

```js
你正在购物，看中了某个商品，商品id是100
付费接口是xxx.com/pay?id=100，但没有任何验证
我是攻击者，我看中了一个商品，id是200

我向你发送一封电子邮件，邮件标题很吸引人
但邮件正文隐藏着<img src=xxx.com/pay?id=200/>
你一查看邮件，就帮我购买了id是200的商品
```

#### 预防

> `SameSite`

- 对 `Cookie` 设置 `SameSite` 属性。表示 `Cookie` 不随着跨域请求发送，可以很大程度减少 `CSRF` 的攻击，但是存在兼容性问题。

  - `Strict`：所有从当前域发送出来的非同域请求都不会带上`cookie`

  - `Lax`：就是在 GET 方式提交表单时会携带`cookie，post、iframe/img`等标签加载时不会携带`cookie`。
  - `None`：关闭`SameSite`，不过，前提是必须同时设置`Secure`属性`(Cookie 只能通过 HTTPS 协议发送)`，否则无效。

```js
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
//这个规则过于严格，可能造成非常不好的用户体验。
//比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。

Set-Cookie: CookieName=CookieValue; SameSite=Lax;
//Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

Set-Cookie: widget_session=abc123; SameSite=None; Secure
```

> 验证 `HTTP Referer` 字段

- `HTTP Referer`是`header`的一部分，当浏览器向 web 服务器发送请求时，一般会带上`Referer`信息告诉服务器是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。可以通过检查请求的来源来防御`CSRF`攻击。正常请求的`referer`具有一定规律，如在提交表单的`referer`必定是在该页面发起的请求。所以通过检查`http`包头`referer`的值是不是这个页面，来判断是不是`CSRF`攻击。
- `Refer` 可能被伪造

> 在请求地址中添加 `token` 并验证

- `token` 请求拦截 验证是否合法

- 使用 `post` 接口
- 增加验证，例如密码、短信验证码、指纹等

### `sql` 注入

> 权限最小化

- 严格限制 Web 应用的数据库的操作权限，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害。

> 正则匹配 字符转义

- `const reg = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;`

### 点击劫持

- 通过覆盖不可见的框架误导受害者点击
  - 使用一个透明的`iframe`，覆盖在一个网页上，诱使用户在该页面上进行操作
  - 使用一张图片覆盖在网页，遮挡网页原有位置的含义

使用 HTTP 头 `X-Frame-Options` 进行攻击防御这个

- `deny`：表示该页面不允许在 `frame` 中展示，即便是在相同域名的页面中嵌套也不允许
- `sameorigin`：表示该页面可以在相同域名页面的 `frame` 中展示
- `allow-form url`：表示该页面可以在指定来源的 `frame` 中展示

:::note Ref

- [前端安全](https://zhuanlan.zhihu.com/p/83865185)
- [Content Security Policy 入门教程](http://www.ruanyifeng.com/blog/2016/09/csp.html)
- [一、web 安全（xss/csrf）简单攻击原理和防御方案（理论篇）](https://juejin.cn/post/6951571103953190925)

:::



## 存储

### `cookie localStorage sessionStorage` 区别

- 容量
- API 易用性
- 是否跟随`http`请求发送出去

##### 比较`cookie、localStorage、sessionStorage`

相同点：都是存储数据，存储在 web 端，并且都是同源

不同点：

- `cookie` 只有 4K 并且每一次 http 请求都会带上`cookie` ，增加请求数据量，浪费带宽
- `sessionStorage`和`localStorage`直接存储在本地，请求不会携带，并且容量比`cookie`要大的多（5M？）
- 生命周期：
  - `sessionStorage` 是临时会话，当前窗口被关闭的时候就清除掉
  - `localStorage` 永久存在，除非手动删除或用代码删除，一般用`localStorage` 会更多一些
  - `cookie` 有过期时间
- `cookie` 和`localStorage`都可以支持多窗口共享(同源策略)，而`session`不支持多窗口共享。但是都支持 a 链接跳转的新窗口

##### API

- `cookie:` 可用`document.cookie = '...'`来修改，但一次只能赋值一个且同一个 key 会覆盖，不同的 key 是追加的过程。
- `localStorage sessionStorage:` API 简易使用`setItem getItem`

#### 方法详解

- `setItem(key, value)`设置存储内容

- `getItem(key)`读取存储内容

- `removeItem(key)`删除键值为`key`的存储内容

- `clear()`清空所有存储内容

- `key(n)` 以索引值来获取键名

- `length`存储的数据的个数

#### 关于`cookie`

- `cookie`的编码方式：`encodeURI()`

#### cookie 有哪些字段可以设置

- [HTTP cookies 详解](https://www.kancloud.cn/kancloud/http-cookies-explained/48333)
- `Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]`
- `Set-Cookie: name=Nicholas; expires=Sat, 02 May 2021 23:38:25 GMT domain=nczonline.net; path=/blog; secure`
  - `secure`：只允许在 https 下传输
  - `Max-age`: cookie 生成后失效的秒数
  - `expire`: cookie 的最长有效时间，若不设置则 cookie 生命期与会话期相同
- `document.cookie="name=Nicholas;domain=nczonline.net;path=/";`
- 通过给`cookie`设置`http-only`属性，使得不能被客户端更改访问，无法通过`js`脚本读取到该`cookie`的信息。但还是能通过 `Application`中手动修改`cookie`，所以只是在一定程度上可以防止`xss`攻击，并不是绝对的安全。
- `cookie`数据有路径`path`的概念，可以限制当前`cookie`只属于某个路径下

#### cookie 与 session

- `cookie`数据存放在客户的浏览器上，`session`数据放在服务器上
- `cookie`在`http`下是明文传输的，不是很安全。别人可以分析存放在本地的`cookie`并进行`cookie`欺骗
  考虑到安全应当使用`session`。
- `session`的运行依赖`sessionId`，而`sessionId`又保存在`cookie`中，所以如果禁用的`cookie`，`session`也是不能用的，不过硬要用也可以，可以把`sessionId`保存在`url`中
- `session`会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用`cookie`
- 单个`cookie`保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个`cookie`

#### localstorage 存满了怎么办？

- 划分域名：各域名下的存储空间由各业务组统一规划使用
- 跨页面传数据：考虑单页应用、优先采用 url 传输数据
- 最后兜底方案：清掉别人的存储

- `cookie` 的跨域问题
  - 存在，`cookie`是跟域名绑定的；可以通过二级域名来解决跨域问题

