# React

## React 基础

```html
<div id="root"></div>

<!-- 引入核心库 -->
<script src="../js/react.development.js"></script>

<!-- 引入react-dom 用于支持react操作dom -->
<script src="../js/react-dom.development.js"></script>

<!-- 引入babel 用于将jsx解析为js -->
<script src="../js/babel.min.js"></script>

<!-- 引入prop-type -->
<script src="../js/prop-types.js"></script>

<!-- jsx语法 写为 text/babel  -->
<script type="text/babel">
  const VDOM = ()
  // 渲染虚拟DOM到页面
  ReactDOM.render(VDOM,document.getElementById('root'))
  // VDOM 将会通过babel转译为 React.createElement(xxx)
  // 相当于官方提供了jsx语法糖去便捷书写js代码
</script>
```

关于虚拟 DOM

- 本质是 `Object` 类型的对象 `VDOM instanceof Object // true`
- 虚拟 `DOM` 相较于原生 `DOM` 轻便
- 虚拟 `DOM` 会被 `React` 转换为真实 `DOM` 渲染在页面上

`jsx` 语法规则

- 定义虚拟 DOM 时，不要写引号
- 标签中要混入`js` 表达式 通过`{}`
  - `js` 表达式 => `a a+b fn(1) arr.map() function fn()`
    - 能够通过 `const a = js表示式` 进行赋值的
  - `js` 语句 => `if for while`
- 样式的类名指定不要用 `class` 用 `className` 驼峰表达式
  - `class -> className font-size -> fontSize`
- 内联样式
  - `要通过 style = {{key: value}} 的形式去表达 `
- 只有一个根标签
- `jsx` 标签必须闭合
- 标签首字母 若是小写，则转换味 `html` 中同名元素；若是大写，则当组件处理

#### 函数式组件

- 适用于简单组件 无状态

```jsx
function MyComponent() {
  console.log(this); // undefined => babel转译后 开启了严格模式下
  return <h5>创建函数式组件</h5>;
}
ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

- 执行 `ReactDOM.render` 之后
- `React` 解析组件标签 找到了`MyComponent` 组件
- 发现组件是使用函数定义的，随后调用该函数
- 将返回的虚拟 `DOM` 转换为真实 `DOM` 然后呈现在页面上

#### 类式组件

- 适用于复杂组件 有状态

```jsx
// 类式组件  继承 + render()
class MyComponent extends React.Component {
  render() {
    // render 放在MyComponent的原型对象上，供实例使用
    // render 中的this是 MyComponent的实例对象 => 组件实例对象
    console.log(this); // MyComponent
    return <h5>类式组件</h5>;
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

- 执行 `ReactDOM.render`之后
- `React` 解析组件标签 找到了`MyComponent` 组件
- 发现组件是使用类定义的，随后 `new` 出来该类的实例，并通过该实例调用到原型上的 `render` 方法
- 将 `render` 返回的虚拟 `DOM` 转换为真实 `DOM` 然后呈现在页面上

## 组件实例属性

#### `state`

```jsx
// 构造器调用1次  render调用1+n次
class Weather extends React.Component {
  constructor(props) {
    super(props);
    // 初始化状态
    this.state = { isHot: true };
    // 解决changeWeather中this指向问题
    this.changeWeather = this.handleClick.bind(this);
  }
  handleClick() {
    // handleClick 存放在Weather原型对象上 供实例使用
    // handleClick是作为onClick的回调 所以不是通过实例调用的 是直接调用  且 class 中默认开启了局部严格模式 输出为 undefined
    this.setState({ isHot: !this.state.isHot });
    console.log(this.state.isHot);
  }
  render() {
    const { isHot } = this.state;
    return (
      <h5 onClick={this.changeWeather}>今天天气：{isHot ? '炎热' : '凉爽'}</h5>
    );
  }
}
ReactDOM.render(<Weather />, document.getElementById('app'));
```

简写

```jsx
class Weather extends React.Component {
  state = { isHot: true };
  render() {
    const { isHot } = this.state;
    return (
      <h5 onClick={this.changeWeather}>今天天气：{isHot ? '炎热' : '凉爽'}</h5>
    );
  }
  // 自定义方法 => 赋值语句 + 箭头函数（不需要考虑this指向问题
  changeWeather = () => {
    this.setState({ isHot: !this.state.isHot });
  };
}

ReactDOM.render(<Weather />, document.getElementById('root'));
```



#### `props`

- props 是只读的

```jsx
<!-- 引入prop-type -->
<script src="../js/prop-types.js"></script>

class Person extends React.Component {
  render() {
    const { name, age } = this.props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>年龄：{age + 2}</li>
      </ul>
    )
  }
}
// 对标签属性进行类型 必要性的限制
Person.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  // speak: PropTypes.func
}
// 指定默认的标签属性值
Person.defaultProps = {
  age: 18,
}

ReactDOM.render(
  <Person name="honjay" age={18} />,
  document.getElementById('root1')
)
const p = { name: 'AAA', age: 18 }
// {} 是 babel转译的效果  并不是字面量对象创建
ReactDOM.render(<Person {...p} />, document.getElementById('root2'))
```

传入的属性为 age 对应的值为 18

```jsx
class Person extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
  };
  static defaultProps = {
    age: 18,
  };

  // state = {}

  render() {
    const { name, age } = this.props;
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>年龄：{age + 2}</li>
      </ul>
    );
  }
}

// 也可以写为函数式组件   函数式组件虽然不可以用实例的属性state和refs，但可以用props
// function Person(props) {
//   const { name, age } = props
//   return (
//     <ul>
//       <li>姓名：{name}</li>
//       <li>年龄：{age + 2}</li>
//     </ul>
//   )
// }

// Person.propTypes = {
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number,
// }
// Person.defaultProps = {
//   age: 18,
// }

ReactDOM.render(
  <Person name='honjay' age={18} />,
  document.getElementById('root1')
);
const p = { name: 'AAA', age: 18 };
// {} 是 babel转译的效果  并不是字面量对象创建
ReactDOM.render(<Person {...p} />, document.getElementById('root2'));
```

- 展开运算符 不能展开对象 `...` `iterator`
- 构造器是否接收 `props` 是否传递 `super` 取决于 是否希望在构造器中通过 `this` 访问 `props` 日常开发几乎用不到

#### `ref`

- 字符串形式 

```jsx
// 不推荐 写多了效率不高
<input type="text" ref="inputRef" />
```

- 回调形式  挂载到实例自身

```jsx
// 如果ref的回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数null 第二次传入参数DOM元素（每次渲染时会创建一个新的函数实例，所以react会清空旧的ref并且设置新的。通过将ref的回调函数定义为class的绑定函数的方式可以避免上述问题 但是大多数场景无关紧要）

<input type="text" ref={(c) => (this.inputRef = c)} />

// class 的绑定函数的方式
saveInput = (c) => { this.inputRef = c }
<input type="text" ref={this.saveInput} />
```

- `createRef API` 形式

```jsx
// React.createRef 调用后返回一个容器 该容器可以存储被ref所标识的节点  只能存一个
myRef = React.createRef();

<input type='text' ref={this.myRef} />
```

#### 非受控 & 受控

- 非受控组件 现用现取
- 受控组件 页面中输入类的 DOM 维护到状态中去 从状态中去取

```jsx
class Login extends React.Component {
  // 受控组件  页面中输入类的DOM 维护到状态中去 从状态中去取

  // 初始化状态
  state = {
    username: '',
    password: '',
  };
  // 保存表单数据到状态中
  // 事件回调  将this.saveFormData('xxx') 的返回值作为onchange回调
  saveFormData = dataType => {
    return event => {
      console.log(dataType, event.target.value);
      // [] 读 dataType 变量
      this.setState({ [dataType]: event.target.value });
    };
  };

  handleSubmit = event => {
    event.preventDefault(); // 阻止表单默认提交行为
    const { username, password } = this.state;
    console.log(username, password);
  };

  render() {
    return (
      <form action='http://www.atguigu.com' onSubmit={this.handleSubmit}>
        USER:{' '}
        <input
          onChange={this.saveFormData('username')}
          type='text'
          name='username'
        />
        {
          // 如果不用柯里化
          // <input
          //   onChange={(event) => this.saveFormData('password', event)}
          //   type="text"
          //   name="username"
          // />
        }
        <br />
        PASS: <input
          onChange={this.saveFormData('password')}
          type='text'
          name='password'
        />
        <br />
        <button>LOGIN</button>
      </form>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById('app'));
```

#### 事件处理

```jsx
class Demo extends React.Component {
  myRef1 = React.createRef();
  myRef2 = React.createRef();
  showText = () => {
    alert(this.myRef1.current.value);
    console.log(this); // Demo
  };
  // 发生事件的DOM元素 刚好是需要操作的DOM元素  则可以不用ref 通过event
  showText2 = event => {
    // alert(this.myRef2.current.value)
    alert(event.target.value);
  };
  render() {
    return (
      <div>
        <input type='text' ref={this.myRef1} />
        <button onClick={this.showText}>show</button>
        <br />
        <input type='text' ref={this.myRef2} onBlur={this.showText2} />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('app'));
```

`React` 通过 `onXxxx` 属性指定事件处理函数

- `React` 使用的是自定义（合成）事件，而不是使用原生 `DOM` 事件 为了更好的兼容性
- `React` 中的事件是通过事件委托的方式去处理的 为了高效（事件冒泡到外层容器
- 可以通过 `event.target` 得到发生事件的 DOM 元素对象

`onKeyUp` `event.keyCode`

## 生命周期

![react生命周期(旧)](<https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/react生命周期(旧).png>)

```jsx
class Count extends React.Component {
  constructor(props) {
    console.log('Count-constructor');
    super(props);
    this.state = { count: 0 };
  }
  add = () => {
    let { count } = this.state;
    this.setState({ count: ++count });
  };
  // 卸载组件 回调
  unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  };
  // 强制更新 回调 不受阀门限制
  force = () => {
    this.forceUpdate();
  };

  // 组件将要挂载的钩子
  componentWillMount() {
    console.log('Count-componentWillMount');
  }

  // 组件挂载完毕的钩子
  componentDidMount() {
    console.log('Count-componentDidMount');
  }
  // 组件将要卸载的钩子
  componentWillUnmount() {
    console.log('Count-componentWillUnmount');
  }
  // 控制组件更新的阀门 默认返回true  自己写必须返回bool
  shouldComponentUpdate() {
    console.log('Count-shouldComponentUpdate');
    return true;
  }
  // 组件将要更新的钩子
  componentWillUpdate() {
    console.log('Count-componentWillUpdate');
  }
  // 组件更新完毕的钩子
  componentDidUpdate() {
    console.log('Count-componentDidUpdate');
  }
  render() {
    console.log('Count-render');
    let { count } = this.state;
    return (
      <div>
        <h5>Current Sum: {count}</h5>
        <button onClick={this.add}>Click</button>
        <button onClick={this.unmount}>Unmount</button>
        <button onClick={this.force}>forceUpdate</button>
      </div>
    );
  }
}

ReactDOM.render(<Count />, document.getElementById('app'));

首次;
Count - constructor;
Count - componentWillMount;
Count - render;
Count - componentDidMount;

click;
Count - shouldComponentUpdate;
Count - componentWillUpdate;
Count - render;
Count - componentDidUpdate;

forceUpdate;
Count - componentWillUpdate;
Count - render;
Count - componentDidUpdate;

ummount;
Count - componentWillUnmount;
```

```jsx
// 父组件
class A extends React.Component {
  state = { car: 'BMW' }
  change = () => {
    this.setState({ car: 'BC' })
  }
  render() {
    return (
      <div>
        <p>A</p>
        <button onClick={this.change}>Change Car</button>
        <B car={this.state.car} />
      </div>
    )
  }
}
// 子组件
class B extends React.Component {
  // 组件将要接收新的props的钩子
  componentWillReceiveProps(props) {
    console.log('B-componentWillReceiveProps', props)
  }
  shouldComponentUpdate() {
    console.log('B-shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('B-componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('B-componentDidUpdate')
  }
  render() {
    console.log('B-render')
    const { car } = this.props
    return <p>B: Receive Car: {car}</p>
  }
}

ReactDOM.render(<A />, document.getElementById('app'))


首次
B-render

click
B-componentWillReceiveProps {car: "BC"}
B-shouldComponentUpdate
B-componentWillUpdate
B-render
B-componentDidUpdate
```

旧的生命周期

初始化阶段：由 `ReactDOM.render()` 触发 触发渲染

- `constructor()`
- `componentWillMount()`
- `render()`
- `componentDidMount()`
- 常用：做一些初始化的事情如：开启定时器、发送网络请求、订阅消息

更新阶段：由组件内部 `this.setState()` 或父组件 `render` 触发

- `shouldComponentUpdate()`
- `componentWillUpdate()`
- `render()` => 必须使用
- `componentDidUpdate()`

卸载组件：由 `ReactDOM.unmountComponentAtNode()` 触发

- `componentWillUnmount()`
- 常用： 一般在这个钩子里面做一些收尾的事：关闭定时器、取消订阅消息

!["react生命周期(新)](<https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/react生命周期(新).png>)

```jsx


 class Count extends React.Component {
   constructor(props) {
     console.log('Count-constructor')
     super(props)
     this.state = { count: 0 }
   }
   add = () => {
     let { count } = this.state
     this.setState({ count: ++count })
   }
   // 卸载组件 回调
   unmount = () => {
     ReactDOM.unmountComponentAtNode(document.getElementById('app'))
   }
   // 强制更新 回调 不受阀门限制
   force = () => {
     this.forceUpdate()
   }
   // 介于构造器和render之间  从props得到派生的状态
   static getDerivedStateFromProps(props, state) {
     console.log('Count-getDerivedStateFromProps', props, state)
     // return props
     return null
     // return { count: 10 }
   }

  // 组件挂载完毕的钩子
  componentDidMount() {
    console.log('Count-componentDidMount')
  }
  // 组件将要卸载的钩子
  componentWillUnmount() {
    console.log('Count-componentWillUnmount')
  }
  // 控制组件更新的阀门 默认返回true  自己写必须返回bool
  shouldComponentUpdate() {
    console.log('Count-shouldComponentUpdate')
    return true
  }

  // 在最近一次渲染输出（提交到DOM节点）之前调用  使得组件在发生更改之前从DOM中捕获一些信息  此生命周期的任何返回值都将作为参数传递给componentDidUpdate
  getSnapshotBeforeUpdate() {
    console.log('Count-getSnapShotBeforeUpdate')
    // return null
    return 'snapshotValue'
  }

  // 组件更新完毕的钩子
  componentDidUpdate(preProps, preState, snapshotValue) {
    console.log(
      'Count-componentDidUpdate',
      preProps,
      preState,
      snapshotValue
    )
  }
  render() {
    console.log('Count-render')
    let { count } = this.state
    return (
      <div>
        <h5>Current Sum: {count}</h5>
        <button onClick={this.add}>Click</button>
        <button onClick={this.unmount}>Unmount</button>
        <button onClick={this.force}>forceUpdate</button>
      </div>
    )
  }
}

ReactDOM.render(<Count count={199} />, document.getElementById('app'))

首次
Count-constructor
Count-getDerivedStateFromProps {count: 199} {count: 0}
Count-render
Count-componentDidMount

click
Count-getDerivedStateFromProps {count: 199} {count: 1}
Count-shouldComponentUpdate
Count-render
Count-getSnapShotBeforeUpdate
Count-componentDidUpdate {count: 199} {count: 0} snapshotValue

force
Count-getDerivedStateFromProps {count: 199} {count: 1}
Count-render
Count-getSnapShotBeforeUpdate
Count-componentDidUpdate {count: 199} {count: 1} snapshotValue

unmount
Count-componentWillUnmount
```

异步渲染 废弃三个 提出 2 个

- `componentWillMount => UNSAFE_componentWillMount`
- `componentWillReceiveProps => UNSAFE_componentWillReceiveProps`
- `componentWillUpdate => UNSAFE_componentWillUpdate`

新的生命周期

初始化阶段：由 `ReactDOM.render()` 触发 触发渲染

- `constructor()`
- `getDerivedStateFromProps()`
- `render()`
- `componentDidMount()`
- 常用：做一些初始化的事情如：开启定时器、发送网络请求、订阅消息

更新阶段：由组件内部 `this.setState()` 或父组件 `render` 触发

- `getDerivedStateFromProps()`
- `shouldComponentUpdate()`
- `render()` => 必须使用
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`

卸载组件：由 `ReactDOM.unmountComponentAtNode()` 触发

- `componentWillUnmount()`
- 常用： 一般在这个钩子里面做一些收尾的事：关闭定时器、取消订阅消息

` render()` 初始化渲染 or 更新渲染 调用

`componentDidMount()` 开启监听 发送 `ajax` 请求

`componentWillUnmount()` 做一些收尾工作 如 清理定时器









组件实例三大核心属性

- `state`
- `props`

- `refs`

函数式实例

- 通过自己传递 `props`

父子间值传递

祖孙传递

兄弟组件值传递

消息订阅发布

订阅消息 消息名

`PubSubJS`

`pubsub-js`

`yarn add nanoid`

`yarn add prop-types`

`yarn add axios`

`hooks`

```js
// setUpProxy.js

// commonJs 代码
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    // 遇见/api1前缀的请求 就会触发该代理配置
    proxy('/api1', {
      // 请求转发给谁
      target: 'http://localhost:5000',
      changeOrigin: true, // 控制服务器收到的响应头中Host字段的值
      pathRewrite: { '^/api1': '' }, // 重写请求路径
    })
  );
};
```

`jquery axios` 都是基于`xhr`的封装

`fetch`

单页面`WEB`应用 `SPA`

整个应用只有一个完整的页面

点击页面中的链接不会刷新页面。只会做页面的局部更新

数据都需要通过`AJAX`请求获取 并在前端异步展现

一个路由就是一个映射关系 `key:value`

`key`为路径。`value`可能是`functon` 或者 `component`

前端路由. `history`

`react-router` `web native any`

`react-router-dom`

`redux` 专门用于做状态管理的 `JS` 库 不是 `react` 插件库

作用：集中管理 react 应用中多个组件共享的状态

某个组件的状态 需要让其他组件使用 共享

一个组件需要改变另一个组件的状态 通信

## `Redux`

![redux原理图](https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/redux%E5%8E%9F%E7%90%86%E5%9B%BE.png)

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

对象式

`setState(,[callback])`

- 同步。但是引起的后续动作（状态更新）是异步的

```jsx
函数式
this.setState((state,props)=>{
  return {...}
})
```

## 补充

### setState 对象式 函数式

对象式 `setState(stateChange, [callback])`

- `stateChange` 状态改变对象 (该对象可以体现出状态的更改)
- `callback` 可选的回调函数, 它在状态更新完毕、界面也更新后( `render` 调用后)才被调用

```jsx
this.setState({ count: count + 1 });

this.setState({ count: count + 1 }, () => console.log(this.state.count)); // 不是解构的
```

函数式 `setState(updater, [callback])`

```jsx
this.setState((state, props) => ({ count: state.count + 1 }));

this.setState(
  (state, props) => ({ count: state.count + 1 }),
  () => console.log(this.state.count)
);
```

- `updater`
  - 为返回 `stateChange` 对象的函数
  - 可以接收到 `state` 和 `props`
- `callback` 是可选的回调函数, 它在状态更新、界面也更新后( `render` 调用后)才被调用

总结

- 对象式的 `setState` 是函数式的 `setState` 的简写方式(语法糖)
- 使用原则
  - 对象方式: 新状态不依赖于原状态
  - 函数方式: 新状态依赖于原状态
  - 如果需要在 `setState()` 执行后获取最新的状态数据, 要在第二个 `callback` 函数中读取

`lazyRouter`

`Hooks`

- `Hook` 是 `React 16.8.0` 版本增加的新特性/新语法
- 可以让你在函数组件中使用 `state` 以及其他的 `React` 特性

####

```jsx
import React, { useState, useEffect } from 'react';
const [xxx, setXxx] = useState(initValue);
```

- `useState`
- `useEffect`
- `useCallback`
- `useMeno`
- `useRef`

`React.useState()`

- `State Hook` 让函数组件也可以有 `state` 状态, 并进行状态数据的读写操作
- `useState()`

  - 参数: 第一次初始化指定的值在内部作缓存
  - 返回值: 包含 2 个元素的数组, 第 1 个为内部当前状态值, 第 2 个为更新状态值的函数

- 两种写法:
  - `setXxx(newValue)` 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
  - `setXxx(value => newValue)` 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

```jsx
setCount(count + 1);

setCount(count => count + 1);
```

- 不同于 `setState` 的合并操作, `setCount` 是直接替换原来的状态值

`React.useEffect()`

- `Effect Hook` 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
- `React`中的副作用操作:
  - 发 `ajax` 请求数据获取
  - 设置订阅 / 启动定时器
  - 手动更改真实 `DOM`
- 语法和说明:

```jsx
useEffect(() => {}, []);

useEffect(() => {
  // 在此可以执行任何带副作用操作
  return () => {
    // 在组件卸载前执行
    // 在此做一些收尾工作, 比如清除定时器/取消订阅等
  };
}, [stateValue]); // 如果指定的是[], 回调函数只会在第一次render()后执行

useEffect(() => {
  let timer = setTimeout(() => {
    setCount(count + 1);
  }, 1000);
  return () => {
    clearTimeout(timer);
  };
}, [count]);
```

- 可以把 `useEffect Hook` 看做如下三个函数的组合
  - `componentDidMount()` 传入空数组
  - `componentDidUpdate()`
  - `componentWillUnmount()` `return () => {}` 返回的函数

`React.useRef()`

- `Ref Hook` 可以在函数组件中存储/查找组件内的标签或任意其它数据
- 语法: `const refContainer = useRef()`
- 作用:保存标签对象,功能与`React.createRef()`一样

```jsx
const myRef = React.createRef();
this.myRef.current.value;

const myRef = useRef();
myRef.current.value;
```

`Fragment`

```jsx
import {Fragment} from 'react'

<></>

Fragment 可以指定key
空标签 什么都不能传
```

`React.Fragment`

`Context`

组件间通信 祖组件 与 后代组件 间的值传递

`PureComponent`

`renderProps`

Dom diffing

、

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

#### Hooks
