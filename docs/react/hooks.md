# Hooks

:::note Ref

- [React Hooks 详解 【近 1W 字】+ 项目实战](https://juejin.cn/post/6844903985338400782)
- [【译】什么时候使用 useMemo 和 useCallback](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)



:::

> 函数式组件捕获了渲染所使用的值

- `Hook` 是 `React 16.8.0` 版本增加的新特性/新语法
- 可以让你在函数组件中使用 `state` 以及其他的 `React` 特性

```jsx
import React, { useState, useEffect } from 'react';
const [xxx, setXxx] = useState(initValue);
```

- 自变量
- `useState`
- `useReducer`
- `useContext`
- 应变量
- `useEffect`
- `useCallback`
- `useMemo`
- 
- `useRef`

## `useState()`

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

- 每次渲染都是独立的闭包

#### 惰性初始化 state

```jsx
// 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
function getInitState(){
  return {number:props.number};
}
let [counter,setCounter] = useState(getInitState);
```

#### 性能

- `Hook` 内部使用 `Object.is` 来比较新旧 `state` 是否相等
  - 如果相等则不会像类组件重新渲染
- 不同于 `setState` 的合并操作, `setCount` 是直接替换原来的状态值

## `useReducer`

```jsx
const [state, dispatch] = useReducer(reducer, initialState, init)

const countReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state + 1;
    default:
      return state;
  }
};
const initialState = 0;

const App = () => {
  const [count, countDispatch] = useReducer(countReducer, initialState);

  const add = () => {
    countDispatch({ type: 'add' });
  };

  return (
    <>
      <span onClick={add}>{count}</span>
    </>
  );
};
```

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}


function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

### 异步处理

## `useContext`

`createContext  useContext`

```jsx
// HelloContext
const HelloContext = React.createContext(null)


//
const {Provider} = HelloContext

const Desendants = () => {
  const value = useContext(HelloContext)
  return <div>{value}</div>
  // 等价于 下面的👇
  // return <HelloContext.Consumer>
  //	{value => {
  //    return <div>{value}</div>
  //  }}
  // </HelloContext.Consumer>
  
  // static contextType = HelloContext
  // const value = this.context
  // <div>{value}</div>
}

const Child = () => {
  return <Desendants />
}

const Parent = () => {
  return <Provider value='hello world'><Child /></Provider>
}
```



## `useEffect()`

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


在每次useEffect之前调用清理函数  组件销毁时也会执行

每次useEffect包裹的函数 都是新的

render -> useEffect
render -> clearEffect -> useEffect
```

- 可以把 `useEffect Hook` 看做如下三个函数的组合
  - `componentDidMount()` 传入空数组
  - `componentDidUpdate()`
  - `componentWillUnmount()` `return () => {}` 返回的函数

> `useEffect` 重新`render`之前会执行`return`里面 即 `componentWillUnmount`

### 对比

React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。



真实DOM构建以后才会执行 异步的。不会阻塞浏览器更新屏幕 特殊情况layoutEffect



而cdp是在真实DOM之前

## `useRef()`

- `Ref Hook` 可以在函数组件中存储/查找组件内的标签或任意其它数据
- 语法: `const refContainer = useRef()`
- 作用: 保存标签对象,功能与`React.createRef()`一样
  - `createRef` 每次渲染都会返回一个新的引用，而 `useRef` 每次都会返回相同的引用
  - `useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数。返回的 ref 对象在组件的整个生命周期内保持不变。

```jsx
const myRef = React.createRef();
this.myRef.current.value;

const myRef = useRef();
myRef.current.value;
```

`forwardRef` 对函数式组件`ref`的转发

## `useCallback`

```js
useCallback(
  () => {
    callback
  },
  [input],
)
保证函数是同一引用？
```



`memoized fun`?

1. **useCallback**：接收一个内联回调函数参数和一个依赖项数组（子组件依赖父组件的状态，即子组件会使用到父组件的值） ，useCallback 会返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新

## `useMemo`

`memoized value`?

```js
React.memo  固定组件
React.pureComponent


useMemo(() => function, input)
?
```



```js
useCallback(fn, deps) === useMemo(() => fn, deps)
```





## `useLayoutEffect`





## 如何减少渲染次数







React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。



`useRef<HTMLInputElement>(null)`



如果你在渲染期间执行了高开销的计算，则可以使用 `useMemo` 来进行优化。

赋值给 `useEffect` 的函数会在组件渲染到屏幕之后执行。

虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行

React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`

### ``

```jsx

```









[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/#tldr)



在单次渲染的范围内，props和state始终保持不变。



*组件内的每一个函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获定义它们的那次渲染中的props和state。*



React只会在[浏览器绘制](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f)后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。**上一次的effect会在重新渲染后被清除：**

- **React 渲染`{id: 20}`的UI。**
- 浏览器绘制。我们在屏幕上看到`{id: 20}`的UI。
- **React 清除`{id: 10}`的effect。**
- React 运行`{id: 20}`的effect。



**当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用`useReducer`去替换它们。**



> useState => useReducer

```jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```



```jsx {5,10}
import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```

**React会保证`dispatch`在组件的声明周期内保持不变。所以上面例子中不再需要重新订阅定时器**



当我们需要将函数传递下去并且函数会在子组件的effect中被调用的时候，`useCallback` 是很好的技巧且非常有用。





`useCallback` 的作用在于利用 `memoize` 减少无效的 `re-render`，来达到性能优化的作用



```
reducer` 其实是在下次 `render` 时才执行的，所以在 `reducer` 里，访问到的永远是新的 `props` 和 `state
```





在 React 中 Props 是不可变(immutable)的，所以他们永远不会改变。**然而，`this`是，而且永远是，可变(mutable)的。**



## `setState` 更新问题

```js
const [n, setN] = useState(0);
const onClick = () => {
  // setN(n + 1);
  // setN(n + 1); // 此时发现，n只能+1，而不会+2
  setN((i) => i + 1);
  setN((i) => i + 1); // n+2
};
```

- `useState` 每次执行会返回一个新的 `state`（简单类型的等值拷贝）
- `setState` 会触发UI更新（重新`render`，执行函数组件）由于UI更新是异步任务，所以`setState` 也是一个异步过程。当我们两次`setN(n+1)`时候，实际上形成了两个闭包，都保存了对此时 `n`的状态 `(n=0)` 的引用
- 在`setN`后，先分别生成了两个新的`n`，数值上都等于`n+1 即1`，但彼此无关。分别进行了`render`，而只有最新一次`render`有效，此次`render`引用了最后一次`setN`函数里生成的`n`
- 接收的函数 `x=>x+1` 并未保持对`n`的引用，而是表达了一种 加1 操作



## `Immutable Data` 

:::note Ref

- [Immer 中文文档](https://github.com/ronffy/immer-tutorial)

:::

`js` 中的对象一般是可变的 `mutable`，因为使用了引用赋值，新的对象简单地引用了原始对象，改变新的对象将影响到原始对象

`Immutable Data` 就是一旦创建，就不能再更改的数据

`Immutable` 实现的原理是持久化的数据结构 `persistent data structure`，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免深拷贝把所有节点都复制一遍带来的性能损耗，`Immutable` 使用了结构共享 `structural sharing`，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其他节点则进行共享。

### `Immer`

`produce(currentState, producer: (draftState) => void): nextState`







