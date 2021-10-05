# 网络请求

## `Xhr & Fetch`

### `XMLHttpRequest`

- 通过`XMLHttpRequest`向服务器发送异步请求，获得服务器返回的数据，利用`js`更新页面

#### Get实现

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

#### Post实现

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

- `fetch` 发送请求默认是不带 `cookie` 的，需要设置 `credentials`
  - `omit`: 默认值，忽略cookie的发送
  - `same-origin`: 表示cookie只能同域发送，不能跨域发送
  - `include`: cookie既可以同域发送，也可以跨域发送
  - 跨域设置为 `fetch(url, {credentials: 'include'})`
- `fetch`只对网络请求报错，对`400`，`500`都当做成功的请求，需要封装去处理
- `fetch`不支持`abort`，不支持超时控制，使用`setTimeout`及`Promise.reject`的实现超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- `fetch`没有办法原生监测请求的进度，而`XHR`可以

## 跨域

### 同源策略

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

### 跨域解决方案

#### 反向代理

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

#### `CORS（服务端支持）`

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

##### 简单请求

对那些可能对服务器数据产生副作用的 HTTP 请求方法，浏览器必须首先使用 `OPTIONS` 方法发起一个预检请求，从而获知服务端是否允许该跨源请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证 如`cookie`

> 简单请求不会触发CORS的预检请求

- 请求方法是以下三种方法之一：
  - HEAD
  - GET
  - POST
- HTTP的头信息不超出以下几种字段
  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于三个值
    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`

- 对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个`Origin`字段。用来说明，本次请求来自哪个源（协议 + 域名 + 端口）

##### 非简单请求

- 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`
- 会先发起预检请求，只有当前网页所在的域名在服务器的许可名单之中，以及合法的请求方法和头部信息，才会正常发起`XHR`请求

##### 预检请求

- 首先使用 `OPTIONS` 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求
- 可以避免跨域请求对服务器的用户数据产生未预期的影响。




::: note Ref
- [跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html)

:::

#### `JSONP`

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

#### `WebSocket`

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

#### `window.postMessage`

- `window.postMessage(data, origin, source)`
- 配合`iframe`

```js
// index
//获取iframe元素
iFrame = document.getElementById('myframe')

//iframe加载完毕后再发送消息，否则子页面接收不到message
iFrame.onload = function () {
  //iframe加载完立即发送一条消息
  iFrame.contentWindow.postMessage('MessageFromIndex1', '*');
};

// iframePage
//回调函数
function receiveMessageFromIndex ( event ) {
  console.log( 'receiveMessageFromIndex', event )
}

//监听message事件
window.addEventListener("message", receiveMessageFromIndex, false);
```

- 父窗口给子窗口发送消息的方式： `iFrame.contentWindow.postMessage('MessageFromIndex1','*')`其实就是在父窗口中操作子窗口发消息，然后让子窗口接收自己刚才发的消息。 
- 子窗口给父窗口发送消息的方式：`parent.postMessage( {msg: 'MessageFromIframePage'}, '*')`注意：此处`parent === window.parent`，即子窗口的父窗口 其实就是在子窗口中操作父窗口发消息，然后让父窗口接收自己刚才发的消息。 
- 总结：所谓的跨窗口发送消息，就是通过在别的窗口操作本窗口发送消息，然后本窗口再自己接收的方式实现。

::: note Ref

- [使用 postMessage 解决 iframe 跨域通信问题](https://juejin.cn/post/6844903477018116104)

:::