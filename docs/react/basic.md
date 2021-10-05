# React 基础

:::note Todo

需要进一步系统完善

- 合成事件
- HOC

:::

## 基础

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

### 函数式组件

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

### 类式组件

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

### `state`

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

### `props`

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

### `ref`

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

### 非受控 & 受控

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

### 事件处理

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

> 红色的在React v16.3 被废弃			绿色的为新增的

![image-20210826154257258](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/LifeCycle.png)

- 调用组件的生命周期函数前必须取得组件实例
- 首次渲染会创建组件实例
- 更新渲染会从fiber结点获取组件实例

### 旧的生命周期

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
- 一般在这个钩子里面做一些收尾的事：关闭定时器、取消订阅消息

### V16.4

- [图片引自：  >=v16.4](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![image-20211005140430672](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211005140430.png)

### 废弃

> 主要原因：React改为Fiber架构后，如果要开启 `async rendering`，在`render`函数之前的所有生命周期函数，都有可能被执行多次

所以在`render`前除了`shouldComponentUpdate` 其他三个都被废弃了被`getDerivedStateFromProps`替代了

#### `componentWillMount`

#### `componentWillReceiveProps(nextProps)`

#### `componentWillUpdate`


### 新增

#### `static getDerivedStateFromProps`

- 在组件创建时和更新时的`render`方法之前调用，它应该返回一个对象来更新状态，或者返回`null`来不更新任何内容
- 从 `props` 中获取 `state` ，换句话说就是将传入的`props` 映射到 `state` 中

```js
static getDerivedStateFromProps(nextProps, prevState) {
  if(nextProps.xxx !== prevState.xxx){
		return {xxx: nextProps.xxx}
  }
  return null； // 返回null则说明不需要更新state
}
```

- 第一个参数为即将更新的 `props`,
- 第二个参数为上一个状态的 `state` 
- 可以比较`props` 和 `state`来加一些限制条件，防止无用的state更新
- `static`静态方法只能构造函数来调用，而实例是不能的

  - `App.staticMethod✅` ` (new App()).staticMethod ❌ `
  - 因此静态方法里面的`this`为`undefined`
  - 因此只能作一些无副作用的操作

#### `getSnapshotBeforeUpdate`

- 被调用于`render`之后挂载之前，可以读取但无法使用DOM的时候
- 它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）
- 此生命周期返回的任何值都将作为参数传递给`componentDidUpdate()`

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
  return 'snapshotValue'
}
```

> React 官网的例子

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    //我们是否要添加新的 items 到列表?
    // 捕捉滚动位置，以便我们可以稍后调整滚动.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //如果我们有snapshot值, 我们已经添加了 新的items.
    // 调整滚动以至于这些新的items 不会将旧items推出视图。
    // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

### 常用

#### `constructor`

- 来初始化函数内部 state
- 为 事件处理函数 绑定实例

#### `componentDidMount`

- `componentDidMount()` 在组件挂载后 (插入DOM树后) 立即调用
- `componentDidMount() `是发送网络请求、启用事件监听方法的好时机
- 可以在此钩子函数里直接调用 `setState()`

#### `shouldComponentUpdate`

- 在组件更新之前调用，可以控制组件是否进行更新， 返回`true`时组件更新， 返回`false`则不更新
- 可以使用内置 `PureComponent` 组件替代  浅比较

```js
// 默认返回true  自己写必须返回bool
// 组件更新时会调用，react性能优化非常重要的一环，此处可阻止不必要的更新
shouldComponentUpdate(nextProps, nextState) {
	// ...
  return true;
}
```

#### `componentDidUpdate`

- 在所有的子组件都更新之后被调用

```js
componentDidUpdate(prevProps, prevState, snapshotValue) {}
```

- 这两个参数的值就是在方法调用之前的`this.props`和`this.state`

#### `componentWillUnmount`

- 此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如关闭定时器、取消订阅消息，清除`componentDidMount`中手动创建的DOM元素等，以免造成内存泄漏

#### `this.forceUpdate()`

- 强制更新 不受`shouldComponentUpdate`限制

### 父子组件执行顺序

- 当子组件自身状态改变时，不会对父组件产生副作用的情况下，父组件不会进行更新，即不会触发父组件的生命周期
- 当父组件中状态发生变化（包括子组件的挂载以及卸载）时，会触发自身对应的生命周期以及子组件的更新
  - `render  `以及 `render` 之前的生命周期，则 父组件先执行
  - `render` 以及 `render`之后的声明周期，则子组件先执行，并且是与父组件交替执行
- 当子组件进行卸载时，只会执行自身的 `componentWillUnmount` 生命周期，不会再触发别的生命周期

:::note Ref

- [深入详解React生命周期](https://juejin.cn/post/6914112105964634119)

:::

## React事件机制

由于`fiber`机制的特点，生成一个`fiber`节点时，它对应的`dom`节点有可能还未挂载，`onClick`这样的事件处理函数作为`fiber`节点的`prop`，也就不能直接被绑定到真实的DOM节点上。

为此，React提供了一种“顶层注册，事件收集，统一触发”的事件机制。

React 合成事件 `SyntheticEvent` 是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

`React` 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等

在`React17`之前，`React`是把事件委托在`document`上的，`React17`及以后版本不再把事件委托在`document`上，而是委托在挂载的容器上了。

以`v16.8.4`版本的`React`为例来探寻`React`的合成事件。当真实的`dom`触发事件时，此时构造`React`合成事件对象，按照冒泡或者捕获的路径去收集真正的事件处理函数，在此过程中会先处理原生事件，然后当冒泡到`document`对象后，再处理`React`事件。

- React 所有事件都挂载在 `document` 对象上；
- 当真实 DOM 元素触发事件，会冒泡到 `document` 对象后，再处理 React 事件；
- 所以会先执行原生事件，然后处理 React 事件；
- 最后真正执行 `document` 上挂载的事件。

### 同时绑定合成与原生事件

- 原生事件阻止冒泡 肯定会阻止合成事件的触发
- 合成事件阻止冒泡 不会影响原生事件的执行

因为合成事件的触发是基于浏览器的事件机制来实现的，通过冒泡机制冒泡到最顶层元素，然后再由 `dispatchEvent`统一去处理。

浏览器事件的执行需要经过三个阶段，捕获阶段-目标元素阶段-冒泡阶段。

- 节点上的原生事件的执行是在目标阶段，然而合成事件的执行是在冒泡阶段，所以原生事件会先合成事件执行，然后再往父节点冒泡。
- 在原生事件中，可以通过返回 `false` 方式来阻止默认行为，但是在 React 中，需要显式使用 `preventDefault()` 方法来阻止

### 合成表现

#### 对原生事件的封装

- `e` 其实不是原生事件对象而是`react`包装过的对象
- 可以通过 `e.nativeEvent` 来访问原生事件对象

```js
handleClick = (e) => console.log(e)
```

#### 对某些原生事件的升级和改造

- 如：`react`在注册了`onchange`事件时，还注册了很多其他事件

#### 不同浏览器事件兼容的处理

```js
addEventListener
addchEvent
```

### 合成事件优点

#### 更好的兼容性 跨平台

`React` 采用的是顶层事件代理机制，能够保证冒泡一致性，可以跨浏览器执行。`React `提供的合成事件用来抹平不同浏览器事件对象之间的差异，将不同平台事件模拟合成事件。

#### 避免垃圾回收

事件对象可能会被频繁创建和回收，因此 React 引入**事件池**，在事件池中获取或释放事件对象。**即 React 事件对象不会被释放掉，而是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)**

#### 方便事件统一管理和事务机制

:::note Ref

- [探索 React 合成事件](https://juejin.cn/post/6897911576053940231)
- [「react进阶」一文吃透react事件系统原理](https://juejin.cn/post/6955636911214067720#comment)

:::

它并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

在 React 中使用 DOM 原生事件时，一定要在组件卸载时手动移除，否则很可能出现内存泄漏的问题。而使用合成事件系统时则不需要，因为 React 内部已经帮你妥善地处理了。

图片引自：[Event flow](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2FTR%2FDOM-Level-3-Events%2F%23event-flow)

![Graphical representation of an event dispatched in a DOM tree using the DOM event flow](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211005160805.svg)

## HOC

> 高阶函数

- 接受一个或多个函数作为输入
- 输出一个函数

### 高阶组件

- 接收一个组件并返回一个新的组件
- 高阶组件就是接受一个组件作为参数，在函数中对组件做一系列的处理，随后返回一个新的组件作为返回值

```js
// 高阶组件 基本用法 函数嵌套类组件？
const HOCFactory = (Component) => {
    class HOC extends React.Component {
        // 在此定义多个组件的公共逻辑
        render () {
            return <Component {...this.props} /> // 返回拼装的结果
        }
    }
    return HOC
}
const MyComponent1 = HOCFactory(WrappedComponent1)
const MyComponent2 = HOCFactory(WrappedComponent2)
```

- 属性代理 `props proxy`	
  - 高阶组件通过被包裹的 `React` 组件来操作 `props`
- 反向继承 `inheritance inversion`    
  - 高阶组件继承于被包裹的 React 组件
  - 高阶组件返回的组件继承于 WrappedComponent

```js
// 待完善 时间久了 记不清了
import React, { Component } from 'React';
const MyContainer = (WrappedComponent) => 
	class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    } 
  }

类似于堆栈调用:
didmount→HOC didmount→(HOCs didmount)→(HOCs will unmount)→HOC will unmount→unmount

const MyContainer = (WrappedComponent) => 
	class extends WrappedComponent {
    render() {
    	return super.render();
    } 
  }
因为依赖于继承的机制，HOC 的调用顺序和队列是一样的
didmount→HOC didmount→(HOCs didmount)→will unmount→HOC will unmount→(HOCs will unmount)
```

比较

- 渲染劫持指的就是高阶组件可以控制 `WrappedComponent` 的渲染过程，并渲染各种各样的结果
- 反向继承就不行

### 高阶组件的缺点

- 被包裹组件的静态方法会消失
- 这其实也是很好理解的，我们将组件当做参数传入函数中，返回的已经不是原来的组件，而是一个新的组件，原来的静态方法自然就不存在了。如果需要保留，我们可以手动将原组件的方法拷贝给新的组件，或者使用hoist-non-react-statics之类的库来进行拷贝。

## `renderProps`

核心思想：通过一个函数将 `class` 组件的 `state` 作为 `props` 传递给纯函数组件

```jsx
class Factory extends React.Component {
    constructor () {
        this.state = {
            /* 这里 state 即多个组件的公共逻辑的数据 */
        }
    }
    /* 修改 state */
    render () {
        return <div>{this.props.render(this.state)}</div>
    }
}

const App = () => {
    /* render 是一个函数组件 */
    <Factory render={
        (props) => <p>{props.a} {props.b}...</p>
    } />
}
```

## 回调写法对比

> 利用`proposal-class-public-fields` 直接绑定箭头函数

- `fn`直接绑定在实例的属性上，并利用箭头函数继承父级`this`作用域达到了`this`绑定的效果

```js
fn = () => { }
render() {
  return <div onClick={this.fn}></div>;
}
```

> `constructor`中使用 bind

- `fn`函数在组件多次实例化过程中只生成一次（因为是用实例的`fn`属性直接指向了组件的原型，并绑定了`this`属性）

```js
constructor(props) {
  super(props);
  // this.fn = () => { }  // 上面babel转译
  this.fn = this.fn.bind(this);
}
fn() { }
return <div onClick={this.fn}></div>
```

> 在`render`中进行`bind`绑定

- `fn`函数多次实例化只生成一次，存在类的属性上。
- 缺点：`this.fn.bind(this)`会导致每次渲染都是一个全新的函数，在使用了组件依赖属性进行比较、`pureComponent`、函数组件`React.memo`的时候会失效。

```js
fn() { }
return <div onClick={this.fn.bind(this)}></div>
```

> 箭头函数内联写法

- 传参灵活
- 缺点：每次渲染都是一个全新的函数

```js
fn() { }
return <div onClick={() => fn()}></div>;
```

:::note Ref

- [带你找出react中，回调函数绑定this最完美的写法！](https://cloud.tencent.com/developer/article/1596042)

:::



## React性能优化

- `classComponent` 中使用 `PureComponent`  
- 无状态组件 `FuncComponent`使用 `React.memo`

### `pureComponent` 与 `Com`

- `PureComponent` 通过 `prop` 和 `state` 的浅比较来实现 `shouldComponentUpdate`，当 `prop` 或 `state` 的值或者引用地址发生改变时，组件就会发生更新。
- 而 `Component` 只要 `state` 发生改变， 不论值是否与之前的相等，都会触发更新。

### `shouldComponentUpdate()`

```jsx
shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.xxx === this.props.xxx) return false;
  return true;
}

// 也可以对子组件采用 PureComponent
```

### `React.memo`

- `React.memo()` 接收一个组件作为参数并返回一个组件
- 如果函数组件在给定相同 `props` 的情况下渲染相同的结果，那么就可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，`React` 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```jsx
function areEqual(prevProps, nextProps) {
  if (prevProps.seconds===nextProps.seconds) return true
  return false
}

// 默认浅层对比 可以传第二个参数
export default React.memo(MyComponent, areEqual)
```



## Todo 组件间通信


通讯

- props

- context

- redux

组件间通信 祖组件 与 后代组件 间的值传递



父子间值传递

祖孙传递

兄弟组件值传递

消息订阅发布

订阅消息 消息名

`PubSubJS`



`redux` 专门用于做状态管理的 `JS` 库 不是 `react` 插件库

作用：集中管理 react 应用中多个组件共享的状态

某个组件的状态 需要让其他组件使用 共享

一个组件需要改变另一个组件的状态 通信

## 补充

## setState

> 对象式 `setState(stateChange, [callback])`

- `stateChange` 状态改变对象 (该对象可以体现出状态的更改)
- `callback` 可选的回调函数, 它在状态更新完毕、界面也更新后( `render` 调用后)才被调用

```jsx
const {count} = this.state;
this.setState({ count: count + 1 });

this.setState(
  { count: count + 1 }, 
  () => console.log(this.state.count)
);

// 类比 Vue 的 $nextTick ?
```

> 函数式 `setState(updater, [callback])`

- `updater`
  - 为返回 `stateChange` 对象的函数	可以接收到 `state` 和 `props`
- `callback` 是可选的回调函数, 它在状态更新、界面也更新后( `render` 调用后)才被调用

```jsx
this.setState(
  (state, props) => ({ count: state.count + 1 })
);

this.setState(
  (state, props) => ({ count: state.count + 1 }),
  () => console.log(this.state.count)
);
```

总结

- 对象式的 `setState` 是函数式的 `setState` 的简写方式(语法糖)
- 使用原则
  - 对象方式: 新状态不依赖于原状态
  - 函数方式: 新状态依赖于原状态
  - 如果需要在 `setState()` 执行后获取最新的状态数据, 要在第二个 `callback` 函数中读取

## `React.Fragment`

```jsx
import {Fragment} from 'react'

<></>
```

- `Fragment` 可以指定 `key`
- 空标签 什么都不能传

## `Context`

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




