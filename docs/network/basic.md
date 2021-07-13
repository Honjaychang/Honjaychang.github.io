# 计网

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



## TCP 和 UDP 的区别

##### 连接方面

- TCP 面向连接，UDP 不需要连接
- TCP 需要三次握手四次挥手请求连接 [TCP 是如何实现可靠连接的？](https://segmentfault.com/a/1190000018592072)
  - 超时重传

##### 可靠性

- TCP 是可靠传输；一旦传输过程中丢包的话会进行重传
- UDP 是不可靠传输，但会最大努力交付

##### 工作效率

- UDP 实时性高，比 TCP 工作效率高
- 因为不需要建立连接，更不需要复杂的握手挥手以及复杂的算法，也没有 4 重传机制

##### 是否支持多对多

- TCP 是点对点的
- UDP 支持一对一，一对多，多对多

##### 首部大小

- TCP 首部占 20 字节
- UDP 首部占 8 字节，首部开销小。同样的报文内容，UDP 会比 TCP 更高效。

## 三次握手四次挥手

- `SYN(Synchronize) 同步` `ACK 确认`

##### 三次握手

![三次握手](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/threeHands.png)

**实质**：客户端连接服务器指定端口 建立 TCP 连接，并同步双方的序列号和确认号，交换`TCP窗口大小`信息

- 服务端调用`listen`系统命令，进入监听状态，等待客户端的连接。
- 客户端向服务端发送`连接请求报文`，其中 TCP 标志位里`SYN=1，ACK=0`，选择一个初始的序号`x`。
- 服务端收到请求报文，向 客户端 发送 `连接确认报文` ，`SYN=1，ACK=1`，确认号为 `x+1`，同时也选择一个初始的序号` y`。
- 客户端 收到 服务端的连接确认报文后，还要向 服务端 `发出确认`，确认号为 `y+1`，序号为 `x+1`。
- 服务端 收到 客户端 的确认后，`连接建立`。

##### 四次挥手

![四次挥手](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/fourHands.png)

- 当主动方关闭连接时，会发送 `FIN` 报文，此时主动方的连接状态由 `ESTABLISHED` 变为 `FIN_WAIT1`。当被动方收到 `FIN` 报文后，内核自动回复 `ACK` 报文，连接状态由 `ESTABLISHED` 变为 `CLOSE_WAIT`，顾名思义，它在等待进程调用 `close` 函数关闭连接。当主动方接收到这个 `ACK` 报文后，连接状态由 `FIN_WAIT1` 变为 `FIN_WAIT2`，主动方的发送通道就关闭了。
- 再来看被动方的发送通道是如何关闭的。当被动方进入 `CLOSE_WAIT` 状态时，进程的 `read` 函数会返回 0，这样开发人员就会有针对性地调用 `close 函数`，进而触发内核发送 `FIN` 报文，此时被动方连接的状态变为 `LAST_ACK`。当主动方收到这个 `FIN` 报文时，内核会自动回复 `ACK`，同时连接的状态由 `FIN_WAIT2` 变为 `TIME_WAIT`，`Linux` 系统下大约 `1 分钟`后 TIME_WAIT 状态的连接才会彻底关闭。而被动方收到 `ACK` 报文后，连接就会关闭。

```js
那为什么需要三次握手，四次挥手呢？
3次握手的作用就是双方都能明确自己和对方的收、发能力是正常的，三次连接是保证可靠性的最小握手次数。
4次挥手呐，TCP的全双工通信断开连接，需要双方的都确认断开。
	当客户端确认自己没有数据要传给服务器时，并不能保证服务器也没有数据要发送了
  前两次挥手是客户端和服务器对连接断开的确认
  第三次服务器会将剩下的数据发给客户端
```

:::note Ref

- 图源：博客 [两张动图-彻底明白 TCP 的三次握手与四次挥手](https://blog.csdn.net/qzcsu/article/details/72861891)
- [面试官，不要再问我三次握手和四次挥手](https://yuanrengu.com/2020/77eef79f.html)
- [硬不硬你说了算！近 40 张图解被问千百遍的 TCP 三次握手和四次挥手面试题](https://mp.weixin.qq.com/s/tH8RFmjrveOmgLvk9hmrkw)
- [一文搞定 UDP 和 TCP 高频面试题！](https://zhuanlan.zhihu.com/p/108822858)

:::

## OSI 七层模型

- TCP 属于传输层
- 发送数据是封装过程 接收则是解封装

![OSI 七层模型](HTTPs://cdn.jsdelivr.net/gh/honjaychang/bp/fe/osiModel.png)

- 物理层：利用物理传输介质为数据链路层提供物理连接，实现比特流的透明传输
- 数据链路层：
  - 交换机 帧（帧是放置数据的、逻辑的、结构化的包
  - 将来自物理层的原始数据进行 MAC 地址的封装与解封装
  - 点到点传输
- 网络层：
  - ARP：地址解析协议
  - 路由器 数据包分组
  - 将数据链路层的数据进行 IP 地址的封装与解封装
  - IP 地址寻址问题 路由算法：确定从源结点沿着网络到目的结点的路由选择
  - 数据链路层是解决同一网络内节点之间的通信，而网络层主要解决不同子网间的通信
- 传输层：
  - 定义传输数据的协议和端口 TCP UDP
  - 将从下层接收的数据进行分段和传输，到达目的地址后再进行重组
  - 向用户提供可靠的、透明的、端到端的数据传输，以及差错控制和流量控制机制
  - [TCP 流量控制](https://blog.csdn.net/weixin_43914604/article/details/105531547?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242)
- 会话层：
  - 会话层建立、管理和终止应用程序进程之间的会话和数据交换
- 表示层
  - 主要是进行对接收的数据进行解释、加密与解密、压缩与解压缩等
- 应用层
  - 终端应用

## HTTPS & HTTP

HTTP：无状态`(stateless)`协议。HTTP 协议自身不对请求和响应之间的通信状态进行保存。即协议对于发送过的请求或响应都不做持久化处理

#### 区别

- `HTTP`：无状态无连接，而且是明文传输，不安全 80
- `HTTPS`：传输内容加密，身份验证，保证数据完整性 `HTTP + SSL/TLS` 443

##### HTTP 的不足

- 通信使用明文，内容可能会被窃听 -> 通信加密 ~~数据加密~~
- 不验证通信方的身份，因此有可能遭遇伪装 -> `SSL HTTPS` 数字证书
- 无法证明报文的完整性，所以有可能已遭篡改 -> 中间人攻击 MD5 数字签名

##### 完整性检测 - 数字签名

- 将一段文本通过`hash`函数生成消息摘要，再通过客户端的私钥进行加密生成数字签名
- 服务器收到数字签名后先用公钥进行解密 得到消息摘要
  - 然后对收到的原文也进行`hash`生成消息摘要
  - 比较前后两次消息摘要 如果相同 则证明完整没有被篡改

##### 数字证书

- 解决通信身份可能被伪装问题
- 服务器运营人员向第三方证书机构提交 CA 公钥、组织信息、域名等信息进行申请认证
- 数字证书机构通过线上线下等手段去验证所提供的信息是否合法。合法的话会向申请者颁发证书（包含 CA 公钥、证书机构和所有者组织信息、证书有效时间、序列号等信息，还包含一个签名（使用散列函数计算公开明文的消息摘要并通过 CA 的私钥进行加密 => 签名
- 客户端向目标服务器发起请求时会返回相应的证书文件
- 客户端读取证书中信息，进行相同的散列函数计算得到消息摘要。通过 CA 中的公钥解密签名数据，对比证书的消息摘要是否一致来判断是否合法

#### HTTPS 实现原理

**HTTP +** 加密 **+** 认证 **+** 完整性保护 = **HTTPS**

- 过程

  - 客户端发送消息给服务器（包含可用的加密算法和压缩算法
  - 服务器返回消息给客户端（包含选用的加密和压缩算法以及数字证书认证机构 CA 签发的证书（包含公钥 + 证书所应用的域名范围
  - 客户端去验证公钥证书 是否合法
  - 客户端使用伪随机数生成传输信息所用的对称密钥，然后通过证书的公钥去传输对称密钥
  - 服务端接收到信息后，用自己的私钥去解密来获得对称密钥
  - 服务端使用对称密钥与客户端进行通信（此时双方都已经拥有了对称密钥

- SSL 公钥加密的算法

  - 对称加密的问题：密钥分发的问题 安全性问题

- HTTPS 采用 共享密钥(对称加密) 和 公开密钥(非对称加密)两者混用的加密机制
  - 非对称：交换对称密钥
  - 对称：信息交换

:::note Ref

- [深入理解 HTTPS 工作原理](https://juejin.cn/post/6844903830916694030)
- [深入浅出 HTTPS 工作原理](https://cloud.tencent.com/developer/article/1005197)

:::

#### HTTP 版本

```js
使用长连接之后，客户端、服务端怎么知道本次传输结束呢？两部分：1. 判断传输数据是否达到了Content-Length 指示的大小；2. 动态生成的文件没有 Content-Length ，它是分块传输（chunked），这时候就要根据 chunked 编码来判断，chunked 编码的数据在最后有一个空 chunked 块，表明本次传输数据结束，
```

- HTTP/0.9：只能进行`get`请求，发送纯文本
- HTTP/1.0：添加了`POST、HEAD、OPTION、PUT、DELETE`等
- HTTP/1.1：
  - 默认支持了长连接`keep-alive`：旨在建立 **1** 次 **TCP** 连接后进行多次请求和响应的交互 `Keep-Alive: timeout=5, max=100`
  - 管线化：不用等待响应亦可直接发送下一个请求，就能够做到同时并行发送多个请求
  - 虽然是无状态协议，但为了实现期望的保持状态功能，于是引入了 `Cookie` 技术（通过在请求和响应报文中写入 Cookie 信息来控制客户端的状态
  - 增加了`host` 域，而且节约带宽?
- HTTP/2：
  - 多路复用：让所有的通信都在一个 TCP 连接上完成，实现了请求的并发
  - 头部压缩：利用 HPACK 算法压缩头部的`User-Agent Cookie Accept Server Rabge`等字段
  - 服务器推送：使得服务器可以预测客户端需要的资源，主动推送到客户端

:::note Ref

- [简介: http/https/http2](https://g.yuque.com/kougazhang/network/ccyd8g)
- [http1.0，http1.1 和 http2.0 的区别](https://blog.51cto.com/12118369/1962662)

:::

`cookie` 是存储在浏览器的小段文本，会在浏览器每次向同一服务器再发起请求时被携带并发送到服务 器上。我们可以把状态信息放在`cookie`里，带给服务器。

`session` 是存储在服务器的用户数据。浏览器第一次向服务器发起请求时，服务器会为当前会话创建一个 `session`，并且把对应的 `session-id` 写入 `cookie` 中，用来标识 `session`。此后，每次用户的请求都会携带 一个包含了 `session-id` 的 `cookie`，服务器解析出了 `session-id`，便能定位到用户的用户信息。

## 浏览器输入网址到页面渲染全过程







![DNS域名解析过程1](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/dns.png)





- DNS 解析：域名解析为 IP 地址
  - 缓存命中：浏览器缓存 => 操作系统缓存 => `LDNS` 本地区域名服务器缓存（学校机房 / `ISP`）
  - `LDNS` => 根域名服务器   根域名服务器返回给 `LDNS` 一个所查询的主域名服务器 `gTLD` 地址
  - `LDNS` => `gTLD` 发起请求   返回域名对应的 `Name Server` 域名服务器地址
  - `LDNS` => `Name Server` 查询请求域名的对应IP地址  返回对应IP以及TTL
  - `LDNS` 根据返回的TTL对IP进行缓存 并将结果返回给用户
  - `TTL: time to live` 域名缓存的最长时间
- TCP 连接：三次握手
- 发送 HTTP 请求
- 服务器处理请求 并 返回 HTTP 响应报文



- 浏览器解析渲染页面：`HTML、CSS、JS`文件
- `DOM Tree + CSSOM => Render Tree => JS => Render Tree`
- 连接结束

:::note Ref

- [前端经典面试题: 从输入 URL 到页面加载发生了什么？](https://segmentfault.com/a/1190000006879700)
- [经典面试题：从 URL 输入到页面展现到底发生什么？](https://blog.fundebug.com/2019/02/28/what-happens-from-url-to-webpage/)
- [五月的仓颉 DNS域名解析过程](https://www.cnblogs.com/xrq730/p/4931418.html)

:::
