# HTTP-Browser

## HTTP[状态码](HTTPs://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

#### 分类

| 分类  | 分类描述                                         |
| :---- | :----------------------------------------------- |
| 1\*\* | 信息响应，服务器收到请求，需要请求者继续执行操作 |
| 2\*\* | 成功响应，操作被成功接收并处理                   |
| 3\*\* | 重定向，需要进一步的操作以完成请求               |
| 4\*\* | 客户端错误，请求包含语法错误或无法完成请求       |
| 5\*\* | 服务器错误，服务器在处理请求的过程中发生了错误   |

#### 常见状态码

- 200 - 请求成功
- 204 - 请求处理成功，但没有资源可返回
- 206 - 对资源的某一部分进行请求
- 301 - 资源被永久转移到其它 URL(永久重定向到新的 location)
- 302 - 资源临时移动(临时重定向)
- 304 - 所请求的资源未修改
- 307 - 临时重定向
- 400 - 请求报文存在语法错误
- 403 - 没有权限
- 404 - 请求的资源不存在
- 500 - 内部服务器错误
- 502 - 网关错误
- 504 - 网关超时

## HTTP Method

#### 传统的 methods

- `get` 获取服务器的数据
- `post` 向服务器提交数据

#### 现在的 methods

- `get` 获取数据
- `post` 新建数据
- `patch/put` 更新数据
- `delete` 删除数据

#### Restful API

- 传统 API 设计:把每个 url 当做一个功能

- Restful API 设计:一种新的 API 设计方法，把每个 url 当做一个唯一的资源

- 如何设计成一个资源？

  - 尽量不用 url 参数

  ```basic
  传统API设计: /api/list?pageIndex=2
  Restful API设计: /api/list/2
  ```

  - 用 method 表示操作类型

  ```basic
  传统API设计:
  post请求	/api/create-blog
  post请求	/api/update-blog?id=100
  get请求	/api/get-blog?id=100

  Restful API设计:
  post请求	/api/blog
  patch请求	 /api/blog/100
  get请求	/api/blog/100
  ```

## Get 和 Post 的区别？

- 缓存：`get`请求的数据是可以缓存的；`post`是不可缓存的。
- 功能
  - `get`请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
  - `post`做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。
- 传参：`get`传参，参数是在 url 中的；`post`传参，参数是在请求体中。
- 安全性：`get`不安全，`post`较为安全：`post`易于防止`CSRF`。
- 参数长度：`get`参数长度有限，是较小的；`post`传参长度不受限制。

#### get 请求传参长度的误区

**误区**：我们经常说 get 请求参数的大小存在限制，而 post 请求的参数大小是无限制的。

- `HTTP`协议未规定`GET`和`POST`的请求长度限制

- `GET`的最大长度显示是因为：浏览器和 web 服务器限制了 URL 的长度

- 不同的浏览器和 WEB 服务器，限制的最大长度不一样

- 要支持`IE`，则最大长度为`2083byte`，若只支持`Chrome`，则最大长度 `8182byte`

## HTTP 首部

- `HTTP` 请求报文：请求方法、`URI`、`HTTP`版本、`HTTP`首部字段

- `HTTP` 响应报文：`HTTP`版本、状态码、`HTTP`首部字段

#### `HTTP`首部字段

- 首部字段名：字段值

#### 通用首部字段

- `Cache-Control` ：能够控制缓存的行为
- `Connection`
  - 控制不再转发给代理的首部字段
  - 管理持久连接 `Connection: Keep-Alive / close` 一次 TCP 连接重复使用
- `Date`：表明创建 HTTP 报文的日期和时间
- `Warning`：会告知用户一些与缓存相关的问题的警告

#### 请求首部字段

- `Accept`：告知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级
  - `Accept-Charset `：优先的字符集
  - `Accept-Encoding`：可接收的压缩算法 `gzip`
  - `Accept-Language`：`zh-cn`
- `Authorization`：Web 认证信息
- `Host`：请求的域名是什么
- `User-Agent`：浏览器信息
- `If-Match If-Modified-Since If-None-Match If-Range`
- `Cookie`

#### 响应首部字段

- `ETag`：资源的匹配信息
- `Location`：提供重定向`url`
- `Server`：HTTP 服务器的安装信息
- `Set-Cookie`

#### 实体首部字段

- 包含在请求报文和响应报文中的实体部分所使用的首部，用于补充内容的更新时间等与实体相关的信息

- `Content-Type: text/html`
- `Keep-Alive: timeout=15, max=100 `
- `Allow`：请求资源允许使用的方法
- `Content`
  - `Content-Encoding`：返回数据的压缩算法，如 `gzip`
  - `Content-Language`
  - `Content-Length`
  - `Content-Type`：返回 / 发送数据的格式，如`application/json`
- `Expires Last-Modified`

#### 缓存相关

```text
Cache-Control	Expires
Last-Modified If-Modified-Since
Etag	If-None-Match
```

## HTTP 缓存策略

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

##### `Last-Modified`

- 对应 `If-Modified-Since`
- 响应资源的最后修改时间 只能精确到秒级

##### `Etag`

- 对应 `If-None-Match`
- `Etag`是服务器响应请求时，返回当前资源文件的一个唯一标识(类似指纹 由服务器生成)
- 同时存在 会优先使用 `Etag`
- 如果资源被重复生成，而内容不变，则`Etag`更精确

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

## 运行环境

#### 网页加载过程

##### 渲染过程

- 根据 `HTML` 代码生成 `DOM Tree`
- 根据 `CSS` 代码生成 `CSSOM`
  - `css` 不会阻塞`DOM`树的解析
  - `css` 加载会阻塞`DOM`树渲染
- 将 `DOM Tree` 和 `CSSOM` 整合形成 `Render Tree`
- 根据 `Render Tree` 渲染页面
- 遇到 `<script>` 则暂停渲染，优先加载并执行`JS`代码，完成再继续
- 直至把 `Render Tree` 渲染完成

##### 为什么要将 `CSS <link href="#">` 放在 head 中

- 在`DOM`树生成前就将`CSS`规则加载完
- 在`DOM`生成完成后直接和所有的`CSS`规则整合 => 一步渲染完成 `Render Tree`

##### 为何建议将`JS`放在`body`最后

- 不放在最后的话，`JS` 代码会阻塞 `render tree` 的渲染，可能会导致页面渲染时间比较长

:::note Ref

- [css 加载会造成阻塞吗](https://segmentfault.com/a/1190000018130499)

:::

##### 图片的加载不会阻塞 DOM 渲染过程

```js
<p>111</p>
<p><img src = "test.png"/></p> //图片的加载不会阻塞DOM渲染过程
<p>222</p>
```

#### `window.onload` 和 `DOMContentLoaded`的区别

- 建议使用`document.addEventListener('DOMContentLoaded', fn(){...})`

```js
window.addEventListener('load', function () {
  // 页面的全部资源加载完成后才会执行，包括图片、视频等
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完成即可执行，此时图片、视频可能还没有加载完
});
```

#### 什么是回流 什么是重绘？

- 回流`reflow`：`render`树中一部分或全部元素需要改变尺寸、布局、或着需要隐藏而需要重新构建
- 重绘`repaint`：`render`树中一部分元素改变，而不影响布局的，只影响外观的，比如颜色
- 回流必将引起重绘

##### 优化方案

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

#### JS 脚本的异步加载

:::note Ref

- [浏览器环境概述](https://wangdoc.com/javascript/bom/engine.html)

:::

如何使`JS`文件在顶部仍然稍后加载呢？

常应用在引用了广告和统计的页面中，不会影响、堵塞，更不会影响到到页面其他元素

- 使用`defer`
  - `<script src="a.js" defer></script>`
  - `defer`的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本
  - 浏览器发现带有`defer`属性的`script`会继续往下解析 HTML 网页，同时并行下载`script`的外部脚本，等待网页解析完成再去执行脚本
- 使用`async`

  - `<script src="a.js" async></script>`
  - `async`的作用是使用另一个进程下载脚本，下载时不会阻塞渲染
  - 浏览器发现带有`async`属性的`script`会继续往下解析 HTML 网页，同时并行下载`script`的外部脚本。当脚本下载完成会暂停 HTML 解析，先去执行脚本，执行完再来解析 HTML。 这与`defer`有点差异
  - `async`会无视脚本顺序，优先执行先下载完成的
  - 当同时存在`defer async`的时候 `defer`将会失效

- 动态插入 `script` 标签
  - 动态生成的`script`标签不会阻塞页面渲染，但无法保证脚本的执行顺序

```js
['a.js', 'b.js'].forEach(function (src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
```

- 通过 `ajax` 去获取 js 代码，然后通过 eval 执行
- 创建并插入 `iframe`，让它异步执行 js

:::note Ref

- [`JS脚本异步加载浅析`](https://juejin.cn/post/6844903661139656718)

:::

## 性能优化

:::note Ref

- [2020 年了,再不会 webpack 敲得代码就不香了(近万字实战)](https://juejin.cn/post/6844904031240863758)
- [你可能不知道的 9 条 Webpack 优化策略](https://juejin.cn/post/6854573213171580941)

:::

#### 性能优化原则

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

```js
// 一张图片就是一个`<img>`标签，浏览器是否发起请求图片是根据`<img>`的`src`属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给`<img>`的`src`赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给`src`赋值

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

##### 首屏优化

- 尽可能的缩小 webpack 或者其他打包工具生成的包的大小
- 路由懒加载
- 组件按需加载
- 图片懒加载
- 服务端渲染 SSR
- gzip

##### CSR SSR

- `CSR` 客户端渲染
- `SSR` 服务端渲染
  - 由服务端把渲染的完整的页面返回给客户端，减少了一次客户端到服务端的一次 http 请求
  - 返回完整页面 就利于 SEO 优化
  - SSR 强在首屏渲染。而 CSR 强在用户和页面多交互的场景

## 安全

#### `XSS` 跨站脚本攻击

##### 攻击

> 反射型`XSS`

- 反射型`XSS`，非持久化，需要欺骗用户自己去点击链接才能触发`XSS`代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。

> 存储型`XSS`

一个博客网站，我发表一篇博客，其中嵌入`<script>`脚本，脚本内容：获取`cookie`，发送到我的服务器（服务器配合跨域）。发布这篇博客，有人查看它，我轻松收割访问者的`cookie`。

##### 预防

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

#### `CSRF` 跨站请求伪造

##### 攻击

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

##### 预防

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

#### `sql` 注入

> 权限最小化

- 严格限制 Web 应用的数据库的操作权限，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害。

> 正则匹配 字符转义

- `const reg = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;`

#### 点击劫持

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
