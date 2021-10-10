# 场景题



## 前端实现并发请求

- 比如说五个 limit [前端请求并发控制](https://www.jianshu.com/p/232fcecc8225)

```js
var urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const limit = 5

function sendRequest(urls, limit, callback) {
  function _send(urls) {
    const url = urls.shift()
    if (url) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`当前发送：${url}`)
          resolve(url)
        }, 100)
      }).finally(() => {
        if (urls.length > 0) {
          return _send(urls)
        }
      })
    }
  }
  let asyncList = []
  while (limit--) {
    asyncList.push(_send(urls))
  }
  return Promise.all(asyncList).then(callback)
}

sendRequest(urls, limit, function() {
  console.log('all urls sended!')
})
```

- web worker









```js
同步处理
promise.all   并发发起请求
```



重复的异步请求，只需要最后一次的请求结果生效

```js
不就是防抖思想嘛  你怎么去点击按钮 输入文字 我都不立即触发 等你500ms这样都不动了那肯定是最后一次了呗
```

多次网络请求 按顺序返回

多次网络请求 你怎么知道全部返回了









