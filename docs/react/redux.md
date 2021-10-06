# Redux

:::note Ref
图雀社区

- [Redux 包教包会（一）：介绍 Redux 三大核心概念](https://juejin.cn/post/6844904021187117069)
- [Redux 包教包会（二）：引入 combineReducers 拆分和组合状态逻辑](https://juejin.cn/post/6844904022143434766)
- [Redux 包教包会（三）：使用容器组件和展示组件近一步分离组件状态](https://juejin.cn/post/6844904037620400136)

[Redux 莞式教程](https://github.com/kenberkeley/redux-simple-tutorial)

阮一峰

- [Redux 入门教程（一）：基本用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [Redux 入门教程（二）：中间件与异步操作](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
- [Redux 入门教程（三）：React-Redux 的用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

:::

![redux原理图](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/redux.png)

![img](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211006133544.png)

> Redux 三大原则

- 单一数据源
- 状态是只读的
- 状态修改均由纯函数完成

> Redux 是一个可预测的 JavaScript 应用状态管理容器

![img](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211005192215.jpeg)

- `View` - **视图层**	就是展示给最终用户的效果 -> `React`

- `Store` - **状态容器**    在 Redux 中，状态将保存在 Store里面

- `Reducers` 是**负责更新 Store 中状态的 JavaScript 函数**

>  `store->view`

- 将 `Store` 里面的状态传递到 `View` 中，具体我们是通过 `React` 的 `Redux` 绑定库 `react-redux` 中的 `connect` 实现的

```js
const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

const mapStateToProps = (state, props) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(App); 
```

`connect` 其实是一个高阶函数。这里 `connect` 通过接收 `mapStateToProps` 然后调用返回一个新函数，接着这个新函数再接收 `App` 组件作为参数，通过 `mapStateToProps` 注入 `todos`属性，最后返回注入后的 `App` 组件。

这里之所以我们能在 `App` 组件中通过 `mapStateToProps` 拿到 Store 中保存的 `js`  对象状态树，是因为我们在之前通过 `Provider` 包裹了 `App` 组件，并将 `store` 作为属性传递给了 `Provider`。

## Redux

### `store`

- 跨级组件通信较为繁琐 -> `store`出现了
- `store` 的存在无需让每个组件单独保持状态`state`，而是构造一颗状态树，它是一个普通的 `js`  对象，通过对象的嵌套来类比组件的嵌套组合
- 有了 `Redux Store` 之后，所有 `React` 应用中的状态修改都是对这棵 `js` 对象树的修改，所有状态的获取都是从这棵`js` 对象树获取，这棵`js`  对象代表的状态树成了整个应用的 **数据的唯一真相来源**

```js
import { createStore } from 'redux'
...
const store = createStore(reducer, initialState) 
// store 是靠传入 reducer 生成的哦！

store.getState() // 获取整个 state
store.dispatch(action) // 触发 state 改变的【唯一途径】
store.subscribe(listener) // 可以理解成是 DOM 中的 addEventListener

// 只要 redux 中值发生变化 旧 render  DOM diff
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
```

### `Action`

在 `Redux` 中，更新 `Store` 的状态有且仅有一种方式：那就是调用 `dispatch` 函数，传递一个 `action` 给这个函数 。

一个 `Action` 就是一个简单的 `js` 对象：

- 它包含动作的类型，以及更新状态需要的数据，其中 `type` 是必须的
- 更新 `Store` 状态，就需要调用 `dispatch` 函数

```js
{ type: 'ADD_TODO', payload: xxx }

store.dispatch({ type: 'ADD_TODO', payload: xxx })
```

#### `Action Creators`

- 动作创建器: 本质上是一个函数，返回一个`action` 对象

```js
const addTodo = payload => ({
  type: "ADD_TODO",
  payload
});

// 当我们使用 Action Creators 来创建 Action 之后，我们再想要修改 Store 的状态就变成了下面这样：

store.dispatch(addTodo('redux'))

// dispatch 后 都会触发 reducer 来响应执行
```

### `Reducer`

- 为了修改 `Store` 中的 `State`，我们需要定义 `Reducers`，用于响应我们 `dispatch` 的 `Action`，并根据 `Action` 的要求修改 `Store` 中对应的数据

`reducer` 是一个普通的 `js` 函数，它接收两个参数：`state` 和 `action`，前者为 `Store` 中存储的那棵 `js` 对象状态树，后者即为我们在组件中 `dispatch` 的那个 `Action`

```js
reducer(state, action) {
  // 对 state 进行操作
  return newState;
}
```

`reducer` 根据 `action` 的指示，对 `state` 进行对应的操作，然后返回操作后的 `state`，`Redux Store` 会自动保存这份新的 `state`

`reducer` 必须是一个纯函数，即我们不能直接修改 `state` ，而是可以使用 `{...}` 等对象解构手段返回一个被修改后的新 `state`

####  `combineReducers` 

`Redux` 为我们提供了 `combineReducers` API，用来组合多个小的 `reducer`

- 组合所有 `reducer` 的 `state`，最后形成一颗`js` 对象状态树，自动存储在 `Redux Store` 里面
- 分发 `dispatch` 的 Action

`combineReducers` 后无需显示传递 `initialState`

```js
const store = createStore(rootReducer)
```



## `Redux`重构

- 定义 `Action Creators`
- 定义 `Reducers`
- `connect` 组件以及在组件中 `dispatch` `Action`

当定义了 `Action`，声明了响应 `Action` 的 `Reducers` 之后，我们开始定义 `React` 和 `Redux` 交流的接口：`connect` 和 `dispatch`，前者负责将 `Redux` Store 的内容整合进 `React`，后者负责从 `React` 中发出操作 `Redux Store` 的指令。

![image-20211006095338072](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211006095338.png)

- `dispatch(action)` 用来在 React 组件中发出修改 `Store` 中保存状态的指令
- `reducer(state, action)` 用来根据这一指令修改 `Store` 中保存状态对应的部分
- `connect(mapStateToProps)` 用来将更新好的数据传给组件，然后触发 `React` 重新渲染，显示最新的状态。它架设起 `Redux` 和 `React` 之间的数据通信桥梁

## 总结

- `store` 由 `Redux` 的 `createStore(reducer)` 生成
- `state` 通过 `store.getState()` 获取，本质上一般是一个存储着整个应用状态的**对象**
- `action` 本质上是一个包含 `type` 属性的普通**对象**，由 `Action Creator `(**函数**) 产生
- 改变 `state` 必须 `dispatch` 一个 `action`
- `reducer` 本质上是根据 `action.type` 来更新 `state` 并返回 `nextState` 的**函数**
- `reducer` 必须返回值，否则 `nextState` 即为 `undefined`
- 实际上，**`state` 就是所有 `reducer` 返回值的汇总**

> Action Creator => `action` => `store.dispatch(action)` => `reducer(state, action)` => ~~`原 state`~~ `state = nextState`



## 异步操作

> 使用中间件 `middleware` 让 Reducer 在异步操作结束后自动执行

> 中间件的雏形  		举例来说，要添加日志功能

```js
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```

- 中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 `Action` 和执行 `Reducer` 这两步之间，添加了其他功能。



```js
// 专门用于创建 redux 中最为核心的store对象
import { createStore, applyMiddleware } from 'redux'

// 引入redux-thunk 用于支持异步action
import thunk from 'redux-thunk'

// 暴露 store
// const store = c...
export default createStore(reducer, applyMiddleware(thunk))
```

### `applyMiddleware`

- 它是 `Redux` 的原生方法，作用是将所有中间件组成一个数组，依次执行
- 所有中间件被放进了一个数组`chain`，然后嵌套执行，最后执行`store.dispatch`
- 可以看到，中间件内部（`middlewareAPI`）可以拿到`getState`和`dispatch`这两个方法

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```

### 同步与异步

- 同步操作只要发出一种 Action 即可
- 异步操作的差别是它要发出三种（2｜3？） Action
  - 操作发起时的 Action
  - 操作成功时的 Action    ｜    操作失败时的 Action

> 异步操作的思路

- 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
- 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

### `redux-thunk` 中间件

异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？

> 关键就在 Action Creator 之中

- 普通的 `Action Creator` 默认返回一个对象 	参数是 Action 的内容
- 异步的 `Action Creator`  需要返回一个函数     且返回的函数的参数是`dispatch`和`getState`这两个 Redux 方法

```js
componentDidMount() {
  const { dispatch, selectedPost } = this.props
  dispatch(fetchPosts(selectedPost))
}

const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```

- 在返回的函数之中，先发出一个 Action（`requestPosts(postTitle)`），表示操作开始。
- 异步操作结束之后，再发出一个 Action（`receivePosts(postTitle, json)`），表示操作结束。

异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用`redux-thunk`中间件改造`store.dispatch`

### `redux-promise` 中间件

另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。

```js
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware)
); 
```

想要 Action 对象的`payload`属性是一个 Promise 对象。这需要从[`redux-actions`](https://github.com/acdlite/redux-actions)模块引入`createAction`方法

```js
import { createAction } from 'redux-actions';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    // 发出同步 Action
    dispatch(requestPosts(selectedPost));
    // 发出异步 Action
    dispatch(createAction(
      'FETCH_POSTS', 
      fetch(`/some/API/${postTitle}.json`)
        .then(response => response.json())
    ));
  }
```

第二个`dispatch`方法发出的是异步 Action，只有等到操作结束，这个 Action 才会实际发出。注意，`createAction`的第二个参数必须是一个 Promise 对象。

## 进阶 源码

### `compose`

```js
compose(f, g, h)(...args) => f(g(h(...args))) // reduceRight

var re1 = func3(func2(func1(0)));

var re2 = Redux.compose(func3, func2, func1)(0);
```

```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}
```



### `createStore()`

## `React-redux`

### UI组件 容器组件

> UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑

![image-20211006144456292](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211006144456.png)

### `connect`

- 用于从 UI 组件生成容器组件

```js
import { connect } from 'react-redux'
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

- `mapStateToProps`	输入逻辑：将`state`映射到 UI 组件的参数（`props`）
- `mapDispatchToProps`    输出逻辑：将用户对 UI 组件的操作映射成 Action

### `mapStateToProps`

```js
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

- `mapStateToProps`是一个函数，它接受`state`作为参数，返回一个对象
- `mapStateToProps`会订阅 Store，每当`state`更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
- `mapStateToProps`的第一个参数总是`state`对象，还可以使用第二个参数，代表容器组件的`props`对象。

这个对象有一个`todos`属性，代表 UI 组件的同名参数，后面的`getVisibleTodos`也是一个函数，可以从`state`算出 `todos` 的值。  `(reducer???)`

### `mapDispatchToProps` 

- 可以是一个函数，也可以是一个对象
- 如果是一个函数，会得到`dispatch`和`ownProps`（容器组件的`props`对象）这两个参数

```js
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}

const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

### `<Provider>`组件

`connect`方法生成容器组件以后，需要让容器组件拿到`state`对象，才能生成 UI 组件的参数。

`React-Redux` 提供`Provider`组件，可以让容器组件拿到`state`

通过使用`Provider`在根组件外面包了一层，这样一来，`App`的所有子组件就默认都可以拿到`state`了。

```js
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import App from './components/App'

let store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```



> 下面先留着吧。虽然没啥用



```jsx
01 - redux完整版;

this.setState({ count: count + value });
```

-

```jsx
- redux
	- actions
		- count.js
	- reducers
		- count.js
	- store.js
  - constant.js

// 该模块用于定义action对象中type类型的常量值
export const INCREMENT = 'increment'


// Count/index.js
// store.dispatch({type: 'increment', data: value})
store.dispatch(createIncrementAction(value))

store.getState() VS 之前的this.state.count

// index.js
// 只要 redux 中值发生变化 旧 render  DOM diff
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
```

`action`

```jsx
// action文件专门为 count组件 创建 action对象
import { INCREMENT } from './constant';
export const createIncrementAction = data => ({ type: INCREMENT, data });
```

`reducer`

```jsx
// redux/reducer 文件用于创建一个为Count组件服务的reducer
// reducer 本质是一个函数 会接到两个参数 分别为 之前的状态 preState 动作对象 action
import { INCREMENT } from './constant';
const initState = 0;
// 通过默认值 来避免初始化为undefined的情况
function countReducer(preState = initState, action) {
  // 从 action对象中获取 type、data
  const { type, data } = action;
  // 根据type决定如何加工数据
  switch (type) {
    case INCREMENT:
      return preState + data;
    default:
      return preState;
  }
}
export default countReducer;
```

`store`

```jsx
// store.js 文件专门用于暴露一个store对象

// 专门用于创建 redux 中最为核心的store对象
import { createStore } from 'redux';
// 引入为Count组件服务的reducer
import countReducer from './count_reducer';

// 暴露 store
export default createStore(countReducer);
```

-

```jsx
02 - redux异步action;

// action 可以是Object（同步）  或者  function（异步action）

// 异步 action 的值为函数  需要一个中间件 交给store直接执行一下（无需交给reducer）
export const createIncrementAsyncAction = (data, time) => {
  // return ()=>{
  return dispatch => {
    setTimeout(() => {
      // store.dispatch({ type: INCREMENT, data })
      // 可以不用自己写 调用同步的action
      // store.dispatch(createIncrementAction(data))
      // 异步action 一般都会调用同步action  异步action不是必要的
      dispatch(createIncrementAction(data));
    }, time);
  };
};
```

`react-redux`

```jsx
App.js
// 引入containers 下的 容器组件
import Count from './containers/Count'
import store from './redux/store'
<Count store={store} />




store.js

// 专门用于创建 redux 中最为核心的store对象
import { createStore, applyMiddleware } from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'

// 引入redux-thunk 用于支持异步action
import thunk from 'redux-thunk'

// 暴露 store
export default createStore(countReducer, applyMiddleware(thunk))




容器组件    UI组件

// 引入Count组件的UI组件
import CountUI from '../../components/Count'
import {
  createIncrementAction,
} from '../../redux/count_action'
/**
 * 引入 Redux 里最核心的store
 * // import store from '../../redux/store'
 * 但是 store 不能自己引入 需要通过props 传递
 */

// 引入 connect  用于链接UI组件与redux
import { connect } from 'react-redux'

/**
 * 1、mapStateToProps 函数返回的是一个对象
 * 2、返回对象中的key就作为传递给UI组件props的key value就作为传递给UI组件props的value（状态）
 * 3、mapStateToProps 用于传递状态
 */
const mapStateToProps = (state) => ({ count: state })
/**
 * 1、mapDispatchToProps 函数返回的是一个对象
 * 2、返回对象中的key就作为传递给UI组件props的key value就作为传递给UI组件props的value
 * 3、mapDispatchToProps 用于完成 操作状态的方法
 */
const mapDispatchToProps = (dispatch) => {
  // 通知redux执行加法
  return {
    increment: (number) => dispatch(createIncrementAction(number)),
  }
}

/**
 * 使用connect()()  创建暴露    建立连接   connect 形成 父子组件关系
 * connect 第一个参数两个函数  函数的返回值作为状态传递给了UI组件
 */
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)



this.props.increasement(value)
```

优化 `dispatch` `provider`

```jsx
export default connect(
  (state) => ({ count: state }),
  // mapDispatchToProps 简写 react-redux 会帮你dispatch
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    incrementAsync: createIncrementAsyncAction,
  }
)(CountUI)




// 通过 react-redux 就不需要再次监测  容器组件已经具备监测监测能力
<Provider store={store}>
  <App />
</Provider>

```

```jsx
import { composeWithDevTools } from 'redux-devtools-extension';

// 暴露 store
export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

// 该文件用来汇总所有的reducer

import count from './count';
import persons from './person';

import { combineReducers } from 'redux';

// 汇总所有的reducers
export const allReducers = combineReducers({
  count: count,
  persons: persons,
});
```

内部运行机制 设计原理

数据驱动更新

## TodoList 演练

```jsx
-src -
  components -
  Item -
  index.jsx -
  List -
  index.jsx -
  redux -
  actions.js -
  reducers.js -
  store.js -
  constant.js -
  App.js -
  index.js;
```

#### Basic

> `index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

> `App.js`

```jsx
import React from 'react';
import List from './components/List';
function App() {
  return (
    <React.Fragment>
      <List />
    </React.Fragment>
  );
}

export default App;
```

> `List/index.jsx`

```jsx
import React, { Component } from 'react';
import Item from '../Item';

let uid = 3;
export default class List extends Component {
  addTodo = e => {
    // const { todos } = this.state;
    if (e.keyCode !== 13) return;
    const newTodo = { id: uid++, value: e.target.value };
    this.setState({ todos: [newTodo, ...this.state.todos] });
    e.target.value = '';
  };
  deleteTodo = id => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  };

  render() {
    const { todos } = this.state;
    return (
      <React.Fragment>
        <h5>Todo List</h5>
        <input onKeyUp={this.addTodo} />
        {todos.map(todo => {
          return <Item key={todo.id} {...todo} deleteTodo={this.deleteTodo} />;
        })}
      </React.Fragment>
    );
  }
}
```

> `Item/index.jsx`

```jsx
import React, { Component } from 'react';

export default class Item extends Component {
  deleteItem = id => {
    this.props.deleteTodo(id);
  };
  render() {
    const { id, value } = this.props;
    return (
      <React.Fragment>
        <li onClick={() => this.deleteItem(id)}>{value}</li>
      </React.Fragment>
    );
  }
}
```

#### Redux

> `index.js` `add...`

```jsx
import store from './redux/store';

//
store.subscribe(() =>
  ReactDOM.render(<App />, document.getElementById('root'))
);
```

> `App.js`

> `List/index.jsx`

```jsx
import React, { Component } from 'react';
import Item from '../Item';
import {
  addTodoAction,
  deleteTodo,
  countAdd,
  countAddAsync,
} from '../../redux/actions';
import store from '../../redux/store';

let uid = 3;
export default class List extends Component {
  addTodo = e => {
    if (e.keyCode !== 13) return;
    const newTodo = { id: uid++, value: e.target.value };
    store.dispatch(addTodoAction(newTodo));
    e.target.value = '';
  };
  deleteTodo = id => {
    store.dispatch(deleteTodo(id));
  };

  plus = num => {
    store.dispatch(countAdd(num));
  };
  asyncPlus = num => {
    store.dispatch(countAddAsync(num, 1000));
  };

  render() {
    const todos = store.getState().todossss;
    const num = store.getState().count;
    return (
      <React.Fragment>
        <h5>Todo List</h5>
        <input onKeyUp={this.addTodo} />
        {todos.map(todo => {
          return <Item key={todo.id} {...todo} deleteTodo={this.deleteTodo} />;
        })}
        <h5>counter: {num}</h5>
        <button onClick={() => this.plus(num)}>Plus</button>
        <button onClick={() => this.asyncPlus(num)}>Plus Async</button>
      </React.Fragment>
    );
  }
}
```

> `Item/index.jsx`

> `constant.js`

```js
export const ADD_TODO = 'addTodo';
export const DELETE_TODO = 'deleteTodo';

export const COUNT_ADD = 'countAdd';
export const COUNT_ADD_ASYNC = 'countAddAsync';
```

> `action.js`

```js
import { ADD_TODO, DELETE_TODO, COUNT_ADD } from './constant';

// action 创建函数 简写 + 非简写
// 通过 action 创建函数 addTodoAction 来创建 action ADD_TODO
export function addTodoAction(todo) {
  return { type: ADD_TODO, todo };
}

export const deleteTodo = id => ({ type: DELETE_TODO, id });

export const countAdd = num => ({ type: COUNT_ADD, num });
export const countAddAsync = (num, delay) => {
  // return () => {
  //   setTimeout(() =>{
  //     store.dispatch({ type: ADD_ADD_ASYNC, num})
  //   },delay);
  // }
  return dispatch => {
    setTimeout(() => {
      dispatch(countAdd(num));
    }, delay);
  };
};

// dispatch(deleteTodo(id))

// 创建一个 被绑定的 action 创建函数 来自动 dispatch
// const boundDeleteTodo = id => dispatch(deleteTodo(id))
```

> `reducers.js`

```js
import { ADD_TODO, DELETE_TODO, COUNT_ADD } from './constant';

const initState = {
  todos: [
    { id: 1, value: 'abc' },
    { id: 2, value: 'cba' },
  ],
  count: 0,
};

export const todoReducer = (state = initState.todos, action) => {
  switch (action.type) {
    case ADD_TODO:
      // return { todos: [action.todo, ...state.todos] };
      return [action.todo, ...state];
    case DELETE_TODO:
      // return { todos: state.todos.filter(todo => todo.id !== action.id) };
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export const count = (state = initState.count, action) => {
  switch (action.type) {
    case COUNT_ADD:
      const count = action.num + 1;
      return count;
    default:
      return state;
  }
};
```

> `store.js`

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todoReducer, count } from './reducers';
// 引入redux-thunk 用于支持异步action
import thunk from 'redux-thunk';

const allReducers = combineReducers({ todossss: todoReducer, count });

export default createStore(allReducers, applyMiddleware(thunk));
```

#### React-redux

区分容器组件`containers`和 UI 组件`components`

`react-redux` 里面的 store 需要自己 自己通过 props 传递

> `index.js` `add...`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

// 通过在index.js中给App组件 通过Provider 传递props store 来避免给每个组件都要传递
// 通过 react-redux 就不需要再次监测  容器组件已经具备监测监测能力
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

> `App.js`

> `List/index.jsx`

```jsx
import React, { Component } from 'react';
import Item from '../Item';
import {
  addTodoAction,
  deleteTodo,
  countAdd,
  countAddAsync,
} from '../../redux/actions';

// 引入 connect  用于链接UI组件与redux
import { connect } from 'react-redux';

let uid = 3;
class List extends Component {
  addTodo = e => {
    if (e.keyCode !== 13) return;
    const newTodo = { id: uid++, value: e.target.value };
    this.props.addTodoAction(newTodo);
    e.target.value = '';
  };
  deleteTodo = id => {
    this.props.deleteTodo(id);
  };
  plus = num => {
    // console.log(num);
    this.props.countAdd(num);
  };

  asyncPlus = num => {
    this.props.countAddAsync(num, 1000);
  };

  render() {
    const todos = this.props.todos;
    const num = this.props.count;
    return (
      <React.Fragment>
        <h5>Todo List</h5>
        <input onKeyUp={this.addTodo} />
        {todos.map(todo => {
          return <Item key={todo.id} {...todo} deleteTodo={this.deleteTodo} />;
        })}
        <h5>counter: {num}</h5>
        <button onClick={() => this.plus(num)}>Plus</button>
        <button onClick={() => this.asyncPlus(num)}>Plus Async</button>
      </React.Fragment>
    );
  }
}
export default connect(
  state => ({ todos: state.todossss, count: state.count }),
  {
    addTodoAction: addTodoAction,
    deleteTodo: deleteTodo,
    countAdd: countAdd,
    countAddAsync: countAddAsync,
  }
)(List);



// 👆上面是简写
/**
 * 1、mapStateToProps 函数返回的是一个对象  用于传递状态
 * 2、返回对象中的key就作为传递给UI组件props的key value就作为传递给UI组件props的value（状态）
 */
const mapStateToProps = state => ({
  todos: state.todossss,
  count: state.count,
});
/**
 * 1、mapStateToProps 函数返回的是一个对象  用于完成 操作状态的方法
 * 2、返回对象中的key就作为传递给UI组件props的key value就作为传递给UI组件props的value
 */
const mapDispatchToProps = dispatch => {
  // 通知redux执行
  return {
    addTodoAction: todoObj => dispatch(addTodoAction(todoObj)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    countAdd: number => dispatch(countAdd(number)),
    countAddAsync: (number, delay) => dispatch(countAddAsync(number, delay)),
  };
};

/**
 * 使用connect()()  创建暴露    建立连接   connect 形成 父子组件关系
 * connect 第一个参数两个函数  函数的返回值作为状态传递给了UI组件
 */
export default connect(mapStateToProps, mapDispatchToProps)(List);
```

> `Item/index.jsx`

> `constant.js`

> `action.js`

> `reducers.js`

> `store.js`

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todoReducer, count } from './reducers';
// 引入redux-thunk 用于支持异步action
import thunk from 'redux-thunk';

const allReducers = combineReducers({ todossss: todoReducer, count });

export default createStore(allReducers, applyMiddleware(thunk));
```

#### Hook

