##### 路由

:::note Ref

- [React Router 入门完全指南(包含 Router Hooks)🛵](https://juejin.cn/post/6948226424427773983#heading-0)

:::



```js
history

// 返回当前会话浏览过的页面数量
window.history.length

// 接收一个整数作为参数，按照当前页面在会话浏览历史记录中的位置进行移动。
// 如果参数为0、undefined、null、false 将刷新页面，相当于执行window.location.reload()方法。如果参数大于浏览器浏览的数量，或小于浏览器的数量的话，什么都不会做。
window.history.go(?delta): 

// 移动到上一页。相当于点击浏览器的后退按钮，等价于window.history.go(-1)
window.history.back()

// 移动到下一页，相当于点击浏览器的前进按钮，等价于window.history.go(1)
window.history.forward()

// h5
// 该参数是只读的，表示与会话浏览历史的当前记录相关联的状态对象
window.history.state

// 向历史记录中追加一条记录
window.history.pushState(data, title, ?url)

// 替换当前页在历史记录中的信息
window.history.replaceState(data, title, ?url)

执行上面两种方法后，url地址会发生改变。但是不会刷新页面。
```





### `BrowserRouter` 

使用 `pushState` 和 `popState` 事件构建路由

- `browserHistory` 需要 server 端支持
- 浏览器从 `/ `到 `/repos` 是会向 `server` 发送 `request` 的。所以 `server` 端是要做特殊配置的

提供`onpopstate`事件来监听历史栈的改变

```js
const historyUpdatePage = () => {}

window.addEventListener('onpopstate', historyUpdatePage)
```



###  `HashRouter` 

> 使用 `window.location.hash` 和 `hashchange` 事件构建路由

主要实现原理是：`hash` 改变时，不会向服务器发出请求，所以不会刷新页面。并且每次`hash`值发生改变的时候，都会触发`hashchange`事件。因此我们可以通过监听该事件，来知道`hash`值发生了哪些变化。

```js
const hashUpdatePage = () => {}

window.addEventListener('hashchange', hashUpdatePage)
```



对比`hash` `pushState`

- `hash`只能修改`url`的片段标识符的部分，并且必须从`#`号开始。而`pushState`能修改路径、查询参数和片段标识符。
- `pushState`比`hash`更符合前端路由的访问方式，因为不带#号
- `hash` 必须和原先的值不同，才能新增会话浏览历史的记录，但是`pushState`新增相同的值也会增加会话浏览历史的记录

```js
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))
```

- `http://localhost:8080/#/?_k=pigdrh`
- 从 `/#/` 到 `/#/repos` 浏览器并不会去发送一次 `request`，`react-router` 自己根据 `url` 去 `render` 相应的模块









基本用法

```js
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'));
```

路由器`Router`就是React的一个组件

`Router`组件本身只是一个容器，真正的路由要通过`Route`组件定义。

嵌套路由

```js
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```

用户访问`/repos`时，会先加载`App`组件，然后在它的内部再加载`Repos`组件。





```js
import { BrowserRouter as Router } from "react-router-dom";

```



为了渲染出路由，我们需要导入 `Route` 组件

```js
import { BrowserRouter as Router, Route } from "react-router-dom";

<Route path="/" render={() => <h1>Welcome!</h1>} />
<Route path="/" component={Home} />
```



`Route`组件有很多属性，在代码中，我们使用了 `path`, `render`属性

- `path`: 页面的路径
- `render`: 对应的页面渲染的是什么
- `component`: 用来渲染 React 组件

使用`Link`组件实现页面之间的跳转  `Link to`

给Home组件添加 exact 只有`path`的值被完全匹配时才会渲染对应的组件

```js
<Router>
  <ul>
  	<li><Link to="/">Home</Link></li>
		<li><Link to="/about">About</Link></li>
    <li><Link to="/contact">Contact</Link></li>
	</ul>

	<Route path="/" exact component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Router>

```

使用`Switch`包裹路由来告诉 React Router 一次仅加载一条路由

```js
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>;

```



```js
const name = 'react'

<li><Link to={`/about/${name}`}>About</Link></li>

<Switch>
	<Route path="/about/:name" component={About} />
</Switch>
```

`About`组件就可以通过`props.match.params.name`接受到路由传递过来的参数

```js
const About = ({
  match: {
    params: { name },
  },
}) => (
  // props.match.params.name
  <Fragment>
    <h1>About {name}</h1>
    <FakeText />
  </Fragment>
);
```



JS实现页面跳转





```js
import { Router, Route, hashHistory } from 'react-router'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))

localhost/#/repos
```



```js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    )
  }
})
```

单页面`WEB`应用 `SPA`

整个应用只有一个完整的页面

点击页面中的链接不会刷新页面。只会做页面的局部更新

数据都需要通过`AJAX`请求获取 并在前端异步展现

一个路由就是一个映射关系 `key:value`

`key`为路径。`value`可能是`functon` 或者 `component`

前端路由. `history`