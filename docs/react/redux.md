# Redux

![redux原理图](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/redux.png)

Model-State-View

store view action

Store 对应 stateManager/state

Action 对应 StateManager/updater

1. View 通过监听获取 State 数据
2. 用户事件触发时，View 上的逻辑将调用 StateManager/Updater 方法来触发 State 更新逻辑
3. StateManager/Updater 执行计算，并更新 State 数据
4. State 数据更新后，通知监听该 State 的 View 更新视图

```js
dispatch 分发

初始化 type:@@init@@  previousState undefined
action 动作对象
	type	标识属性 string 唯一 必要属性
  data	数据属性 any 可选属性


reducer
	用于初始化状态 加工状态
  加工时，根据旧的state 和 action 产生新的state的纯函数

store
	将state action reducer 联系在一起

import { createStore } from 'redux'
import reducer from './reducers'
const store = createStore(reducer)
```

yarn add redux-thunk

react-redux

facebook 出品的自己的 redux

所有的 UI 组件都应该包裹一个容器组件 他们是父子关系

容器组件是真正和 redux 打交道的，里面可以随意 的使用 redux 的 api

UI 组件中不能使用任何 redux 的 api

容器组件会传给 UI 组件

- redux 中所保存的状态
- 用于操作状态的方法

备注：容器给 UI 传递 状态方法操作状态的方法 均通过 props 传递

redux

yarn add redux-devtools-extension

Store



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
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
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

