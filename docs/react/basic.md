# React 基础



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
  ReactDOM.render(VDOM, document.getElementById('root'))
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

#### 旧

![react生命周期(旧)](<https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/oldLC.png>)

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
```

> `mount => constructor -> componentWillMount -> render -> componentDidMount`

> `click => shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate`

> `forceUpdate => componentWillUpdate -> render -> componentDidUpdate`

> `unmount => componentWillUnmount`



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
```


> `mount => render`

> `click => componentWillReceiveProps {car: "BC"} => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate`

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

#### 新

![react生命周期(新)](<https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/newLC.png>)

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





## 补充

### setState 对象式 函数式

对象式 `setState(stateChange, [callback])`

- `stateChange` 状态改变对象 (该对象可以体现出状态的更改)
- `callback` 可选的回调函数, 它在状态更新完毕、界面也更新后( `render` 调用后)才被调用

```jsx
this.setState({ count: count + 1 });

this.setState({ count: count + 1 }, () => console.log(this.state.count)); // 不是解构的
  // 类比 Vue 的 $nextTick
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



#### `React.Fragment`

```jsx
import {Fragment} from 'react'

<></>
```

- `Fragment` 可以指定 `key`
- 空标签 什么都不能传

#### `Context`

- 使用 `context`, 我们可以避免通过中间元素传递 `props`：

```jsx
const MyContext = React.createContext(defaultValue)

// 通过 MyContext.Provider 传递prop
<MyContext.Provider value={{ name, age }}>
  <C1 />
</MyContext.Provider>
  
// 在对应的组件里 指定 contextType 读取当前的 MyContext
static contextType = MyContext
// 通过this.context.xxx调用



<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

当 `React` 渲染一个订阅了这个 `Context` 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 `context` 值

**只有**当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。

当 `Provider` 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。`Provider` 及其内部 `consumer` 组件都不受制于 `shouldComponentUpdate` 函数，因此当 `consumer `组件在其祖先组件退出更新的情况下也能更新。











```jsx
函数绑定的性能 差异


<Child handleClick={this.handleClick} />
<Child handleClick={() => this.handleClick()} />
  // 会导致每次父组件render方法被调用时，一个新的函数被创建，已将其传入handleClick。这会有一个改变每个子组件props的副作用，它将会造成他们全部重新渲染，即使数据本身没有发生变化。
<Child handleClick={this.handleClick.bind(this)} />
  
  
  将父组件的原型方法的引用传递给子组件。子组件的handleClick属性将总是有相同的引用，这样就不会造成不必要的重新渲染。
```





#### `pureComponent`

`PureComponent` 通过 `prop` 和 `state` 的浅比较来实现 `shouldComponentUpdate`，当 `prop` 或 `state` 的值或者引用地址发生改变时，组件就会发生更新。

而 `Component` 只要 `state` 发生改变， 不论值是否与之前的相等，都会触发更新。



`shouldComponentUpdate(nextProps, nextState)`

```jsx
// 对子组件应用 避免不必要的渲染

shouldComponentUpdate(nextProps, nextState) {
  // console.log(nextProps, nextState);
  if (nextProps.xxx === this.props.xxx) return false;
  return true;
}

// 也可以对子组件采用 PureComponent
```

`classComponent` 中使用 `PureComponent`  无状态组件 `FuncComponent`使用 `React.memo`



`React.memo`

`export default React.memo(Child);`

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```jsx
function areEqual(prevProps, nextProps) {
  if (prevProps.seconds===nextProps.seconds) return true
  else return false
}

// 默认浅层对比 可以传第二个参数
export default React.memo(MyComponent, areEqual)
```



#### Hoc

高阶组件

- 接收一个组件并返回一个新的组件
- 高阶组件就是接受一个组件作为参数，在函数中对组件做一系列的处理，随后返回一个新的组件作为返回值

高阶函数

- 接受一个或多个函数作为输入
- 输出一个函数

高阶组件的缺点

高阶组件也有一系列的缺点，首先是被包裹组件的静态方法会消失，这其实也是很好理解的，我们将组件当做参数传入函数中，返回的已经不是原来的组件，而是一个新的组件，原来的静态方法自然就不存在了。如果需要保留，我们可以手动将原组件的方法拷贝给新的组件，或者使用hoist-non-react-statics之类的库来进行拷贝。

#### `renderProps`

```jsx
import React, { Component } from 'react';

export default class RenderProps extends Component {
  render() {
    return (
      <div>
        <Child1 render={(name) => <Child2 name={name} />} />
      </div>
    );
  }
}

class Child1 extends Component {
  state = { name: 'Tom' };
  render() {
    return <div>{this.props.render(this.state.name)}</div>;
  }
}

class Child2 extends Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

```

#### Todo


通讯

- props

- context

- redux

组件间通信 祖组件 与 后代组件 间的值传递

