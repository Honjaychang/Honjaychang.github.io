# 一些概念

:::note Ref

好文力荐

- [React技术揭秘](https://react.iamkasong.com/)
- 
- [React 架构的演变 - 从同步到异步](https://blog.shenfq.com/2020/react-架构的演变-从同步到异步/)
- [React 架构的演变 - 从递归到循环](https://blog.shenfq.com/2020/react-架构的演变-从递归到循环/)
- [React 架构的演变 - 更新机制](https://blog.shenfq.com/2020/react-架构的演变-更新机制/)
- [React 架构的演变 - Hooks 的实现](https://blog.shenfq.com/posts/2020/React%20%E6%9E%B6%E6%9E%84%E7%9A%84%E6%BC%94%E5%8F%98%20-%20Hooks%20%E7%9A%84%E5%AE%9E%E7%8E%B0.html)
- 
- [React16源码解析(一)- 图解Fiber架构](https://segmentfault.com/a/1190000020736966)
- [React16源码解析(二)-创建更新](https://segmentfault.com/a/1190000020736982)
- [React16源码解析(三)-ExpirationTime](https://segmentfault.com/a/1190000020736992)
- [React16源码解析(四)-Scheduler](https://segmentfault.com/a/1190000020737020)
- [React16源码解析(五)-更新流程渲染阶段1](https://segmentfault.com/a/1190000020737050)
- [React16源码解析(六)-更新流程渲染阶段2](https://segmentfault.com/a/1190000020737054)
- [React16源码解析(七)-更新流程渲染阶段3](https://segmentfault.com/a/1190000020737059)
- [React16源码解析(八)-更新流程提交阶段](https://segmentfault.com/a/1190000020737069)

:::





> Children 先欠着 experationTime
>



`enableSchedulerTracing` 分支内容，有关 React DevTools











## React 理念

React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式

> 快速响应

### CPU的瓶颈

- 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行**样式布局**和**样式绘制**了。

在浏览器每一帧的时间中，预留一些时间给JS线程，`React`利用这部分时间更新组件。

当预留的时间不够用时，`React`将线程控制权交还给浏览器使其有时间渲染UI，`React`则等待下一帧时间到来继续被中断的工作。（一直吃不到 则有timeout）

这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）

解决`CPU瓶颈`的关键是实现`时间切片`，而`时间切片`的关键是：将**同步的更新**变为**可中断的异步更新**。

### IO的瓶颈

- 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

`网络延迟`是前端开发者无法解决的。如何在`网络延迟`客观存在的情况下，减少用户对`网络延迟`的感知？

`React`给出的答案是[将人机交互研究的结果整合到真实的 UI 中](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production)

`React`实现了[Suspense](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)功能及配套的`hook`——[useDeferredValue](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)

`React`为了践行“构建**快速响应**的大型 Web 应用程序”理念做出的努力。

其中的关键是解决CPU的瓶颈与IO的瓶颈。而落实到实现上，则需要将**同步的更新**变为**可中断的异步更新**。

## React15架构

可以分为两层：

- `Reconciler`（协调器）—— 负责找出变化的组件
- `Renderer`（渲染器）—— 负责将变化的组件渲染到页面上

### `Reconciler`

每当有更新发生时，`Reconciler`会做如下工作：

- 调用函数组件、或class组件的`render`方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知`Renderer`将变化的虚拟DOM渲染到页面上

### `Renderer`

由于`React`支持跨平台，所以不同平台有不同的`Renderer`。我们前端最熟悉的是负责在浏览器环境渲染的`Renderer` —— `ReactDOM`

在每次更新发生时，`Renderer`接到`Reconciler`通知，将变化的组件渲染在当前宿主环境。

### 缺点 

- 在`Reconciler`中，`mount`的组件会调用`mountComponent`，`update`的组件会调用`updateComponent`。这两个方法都会递归更新子组件。
- 由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。
- `Reconciler`和`Renderer`是交替工作的，当第一个`li`在页面上已经变化后，第二个`li`再进入`Reconciler`。整个过程是同步不可中断的

## React16架构

可以分为三层：

- `Scheduler`（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- `Reconciler`（协调器）—— 负责找出变化的组件
- `Renderer`（渲染器）—— 负责将变化的组件渲染到页面上
- 
- 其中 `Scheduler Reconciler` 随时可能由于以下原因被中断
  - 有其他更高优任务需要先更新
  - 当前帧没有剩余时间

> 相较于15

- 新增`Scheduler`
- 采用新的`Reconciler`  且`Reconciler`内部采用了`Fiber`的架构
- `Scheduler`和 `Reconciler` 都是平台无关的

### `Scheduler`

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

`React`实现了功能更完备的`requestIdleCallback`polyfill，这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。

放弃使用`requestIdleCallback`原因

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换`tab`后，之前`tab`注册的`requestIdleCallback`触发的频率会变得很低

### `Reconciler`

> 协调器（`Reconciler`）重构的一大目的是：将老的`同步更新`的架构变为`异步可中断更新`

- 更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

在React16中，**Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表增/删/更新的标记，类似这样：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

### `Renderer`

**Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。

### `render`和`commit`阶段

- `Reconciler`工作的阶段被称为`render`阶段。因为在该阶段会调用组件的`render`方法。
- `Renderer`工作的阶段被称为`commit`阶段。就像你完成一个需求的编码后执行`git commit`提交代码。`commit`阶段会把`render`阶段提交的信息渲染在页面上。
- `render`与`commit`阶段统称为`work`，即`React`在工作中。相对应的，如果任务正在`Scheduler`内调度，就不属于`work`。

## Fiber架构

`React Fiber`可以理解为：

`React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

- 其中每个任务更新单元为`React Element`对应的`Fiber节点`
- 在新的架构中，虚拟DOM在`React`中有个正式的称呼——`Fiber`

### 弃用`generate`原因

`generate`是可以实现中断的 但是却被弃用 原因如下

- `Generator`是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变。这样心智负担比较重。
- `Generator`执行的`中间状态`是上下文关联的。
- 当考虑高优先级任务插队时 需要全局变量保存之前执行的中间状态 会引入新的复杂度

### `Fiber`的含义

- 作为架构来说
  - `React15`的`Reconciler`采用递归的方式执行，被称为`stack Reconciler`。
  - `React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。

- 作为静态的数据结构来说
  - 每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

- 作为动态的工作单元来说
  - 每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

#### 架构

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

#### 静态的数据结构

作为一种静态的数据结构，保存了组件相关的信息

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

#### 动态的工作单元

作为动态的工作单元，`Fiber`中如下参数保存了本次更新相关的信息

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;
```

## `JSX Fiber`

- `createElement => jsx -> React element `

在组件`mount`时，`Reconciler`根据`JSX`描述的组件内容`(react element)`生成组件对应的`Fiber节点`。

在`update`时，`Reconciler`将`JSX`与`Fiber节点`保存的数据对比，生成组件对应的`Fiber节点`，并根据对比结果为`Fiber节点`打上`标记`

## `render`阶段

```js
同步 - workLoopSync -> performUnitOfWork
异步 - workLoopConcurrent -> performUnitOfWork
```

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

- `shouldYield`  如果当前浏览器帧没有剩余时间，`shouldYield`会中止循环，直到浏览器有空闲时间后再继续遍历。
- `performUnitOfWork` 方法会创建下一个`Fiber节点`并赋值给`workInProgress`，并将`workInProgress`与已创建的`Fiber节点`连接起来构成`Fiber树`。

`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分：“递”和“归”。

### 递 `beginWork`

首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个 `Fiber节点` 调用 `beginWork方法` 

该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个 `Fiber节点` 连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

### 归  `completeWork`

在“归”阶段会调用 `completeWork` 处理`Fiber节点`。

当某个`Fiber节点`执行完`completeWork`，如果其存在`兄弟Fiber节点`（即`fiber.sibling !== null`），会进入其`兄弟Fiber`的“递”阶段。

如果不存在`兄弟Fiber`，会进入`父级Fiber`的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render阶段`的工作就结束了。

![image-20211001145029076](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001145029.png)

`performUnitOfWork`递归版本

```js

```

#### `performUnitOfWork`

```js

```

#### `beginWork`

- `beginWork`的工作是传入`当前Fiber节点`，创建`子Fiber节点`


```js

```

得益于双缓存树的机制，在组件`mount`时，由于是首次渲染，是不存在当前组件对应的`Fiber节点`在上一次更新时的`Fiber节点`，即`mount`时`current === null`。所以可以通过`current === null ?`来区分组件是处于`mount`还是`update`

- `mount`时：除`fiberRootNode`以外，`current === null`。会根据`fiber.tag`不同，创建不同类型的`子Fiber节点`
- `update`时：如果`current`存在，在满足一定条件时可以复用`current`节点，这样就能克隆`current.child`作为`workInProgress.child`，而不需要新建`workInProgress.child`。

```js
font-size: 0.875em;font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;git add--bg-color: #363B40;
```

`update` 时 `workInProgress` 会复用 `current` 节点



## `commit`阶段

`commit`阶段的主要工作（即`Renderer`的工作流程）分为三部分：

- before mutation阶段（执行`DOM`操作前）
- mutation阶段（执行`DOM`操作）
- layout阶段（执行`DOM`操作后）











`concurrent模式`相较我们当前使用的`legacy模式`最主要的区别是**将同步的更新机制重构为异步可中断的更新**。















# setState 同步异步问题

:::note Ref

两篇思路一致，后者还分析了 `concurrent` 模式

- [setState 到底是同步的，还是异步的](https://jishuin.proginn.com/p/763bfbd5e4cd)
- [React 架构的演变 - 从同步到异步](https://blog.shenfq.com/posts/2020/React%20%E6%9E%B6%E6%9E%84%E7%9A%84%E6%BC%94%E5%8F%98%20-%20%E4%BB%8E%E5%90%8C%E6%AD%A5%E5%88%B0%E5%BC%82%E6%AD%A5.html)

:::

#### 结论

- 在 `legacy` 模式下，正常会触发 `batchUpdate` 呈现异步的感觉
  - `ReactDOM.render(<App />, rootNode)`
  - 多个 `setState()` 会触发React的性能优化 只计算最后一次
  - 不在React上下文 如 `setTimeout` 则表现同步
    - 多个 `setState()` 会按顺序依次执行
- `concurrent` 模式 都呈现异步
  - `ReactDOM.createRoot(rootNode).render(<App />)`
  - `concurrent` 模式下在 `setTimeout` 里面的多个 `setState` 也会只执行最后一个
  - 说明在 `concurrent` 模式下，即使脱离了 `React` 的生命周期，`setState` 依旧能够合并更新。主要原因是 `concurrent` 模式下，真正的更新操作被移到了下一个事件队列中，类似于 `Vue` 的 `nextTick`。
- `setState` 是一次同步操作，只是每次操作之后并没有立即执行，而是将 `setState` 进行了缓存，`mount` 流程结束或事件操作结束，才会拿出所有的 `state` 进行一次计算。如果 `setState` 脱离了 `React` 的生命周期或者 `React` 提供的事件流，`setState` 之后就能立即拿到结果。
- `this.setState()`是否异步，看 `isBatchingUpdates` 的状态，为 `true` 就是异步，为 `false` 就是同步



```js
在一段代码中连续使用多个setState React处理方式
如果有多个同步 setState(...) 操作，React 会将它们的更新(update)先后依次加入到更新队列(updateQueue)，在应用程序的 render 阶段处理更新队列时会将队列中的所有更新合并成一个，合并原则是相同属性的更新取最后一次的值。如果有异步 setState(...) 操作，则先进行同步更新，异步更新则遵循EventLoop原理后续处理。


state = { text: '', count: 0 };

// 同步更新
handleClick = () => {
  this.setState({ count: this.state.count + 1 });
  this.setState({ text: 'Click times ' + this.state.count });
};
// Click times 会比展示的会比 count 少1  --> Click times 4 : 5

// 异步更新
handleClick = () => {
  this.setState({ count: this.state.count + 1 });
  setTimeout(() => {
    this.setState({ text: 'Click times ' + this.state.count });
  }, 500);
};
// 先count -> 1  再延迟500 Click times 1
```











React内部运行机制



ReactDOM.render 函数的返回值是当前应用程序根组件的实例

![image-20210927174634712](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20210927174634.png)





当组件内部有this.setState( ... )操作时，React 首先根据this对象找到对应的 Fiber 结点，然后将更新加入到当前 Fiber 结点的更新队列。





组件的设计思想 数据驱动更新

当一个组件内部的数据发生变化时，组件中返回的 UI 也随之变化并更新到屏幕

> 这段话有点意思

React 使用 state 为组件维护了自己的内部状态，使用 props 为组件维护了自己的外部状态。 state 和 props 的变化 意味着组件的 UI 需要更新 事实上，React 组件中的 UI 就是它的「元素」，React 元素是一种普通的 JavaScript 对象。因此，state和props的变化只需要更新 JavaScript 对象即可。由于更新 JavaScript 对象要远比直接 DOM 树更加轻巧便利也使得 React 组件的更新渲染性能达到了很高的标准。









```jsx
// 验证一下 再看下原文

Counter.__proto__ === Component

Counter.prototype.__proto__ === Component.prototype

Counter组件实例的__proto__ 指向了Counter构造函数的原型对象


组件实例在react运行时
会返回组件元素与状态 state	var nextChildren = instance.render()

调用生命周期函数 instance.componentDidMount()

触发更新 执行setState操作
应用程序在首次渲染时会为组件实例绑定对应 的更新器。当组件接收到事件触发更新的时候 会通过组件实例上的更新器执行更新流程
instance.updater = classComponentUpdater

组件实例是 React 应用程序运行时组件被实例化后的状态，每一个组件实例都拥有自身的属性和继承于 的属性。应用程序首次渲染时通过调用组件实例的   返 回 React 元素，用于构建页面 (UI)。当应用程序被(事件)触发更新时，组件实例调用自身的更新器(updater)进入更新渲染流程。此外，在
应用程序渲染的 render 或者 commit 阶段(前后)中会通过组件实例调用对应的生命周期函数。 组件实例调用自身的函数返回 React 元素
```









```jsx
Fiber 架构 主要目标是解决应用程序的更新任务与(外部)其他任务(如动 画渲染)在 CPU 资源分配方面的问题


从概念上将 React Fiber 是一种程序架构，但是在 React 应用程序运行过程中它的实际体现是一个 JavaScript对象，该对象主要是由两个构造函数的实例层层引用组成。这两个构造函数分别是 FiberRootNode和FiberNode。

在后面文章中将统一称 FiberRootNode 的实例为 fiberRoot 对象， FiberNode 的实例为 Fiber 对象或者 Fiber 结 点



React元素包含的属性 主要是对应用程序UI部分都描述
React元素的数据结构并不能完成 创建更新 以及 将更新渲染到屏幕 等渲染工作

所以这些工作需要 由Fiber结点（具有更加丰富的数据结构）来完成






React v15 版本应用程序调用 setState() 和 render() 方法进行更新和渲染时主要包含两个阶段:
调度阶段(reconciler):React Fiber 之前的 reconciler(被称为 Stack reconciler)是自顶向下的递归算 法，遍历新数据生成新的Virtual DOM。通过 diff 算法，找出需要更新的元素，放到更新队列中去。 渲染阶段(render): 根据所在的渲染环境，遍历更新队列，调用渲染宿主环境的 API, 将对应元素更新渲 染。在浏览器中，就是更新对应的 DOM 元素，除浏览器外，渲染环境还可以是 Native、WebGL 等等。
React Fiber 之前的调度策略 Stack Reconciler，这个策略像函数调用栈一样，递归遍历所有的 Virtual DOM 结点进 行 diff，一旦开始无法被中断，要等整棵 Virtual DOM 树计算完成之后，才将任务出栈释放主线程。而浏览器中的 渲染引擎是单线程的，除了网络操作，几乎所有的操作都在这个单线程中执行，此时如果主线程上的用户交互、动 画等周期性任务无法立即得到处理，就会影响体验。



16
1. 将任务按照单个 Fiber 结点为单位，拆分成细小的单元。
2. 重写render和commit两阶段的逻辑，render阶段的任务每次在执行前先请求任务体系获得执行权。 
3. 对任务建立优先级体系，高优先级任务优于低优先级工作执行。



React 应用程序首次渲染时在 prerender 阶段会初始化 「current 树」(本质上也是对象哦)。最开始的 current 树只有一个根结点— HostRoot类型的 Fiber 结点。在后面的 render 阶段会根据此时的 current 树创建 「workInProgress 树」(同样是对象哦，每个结点都是FiberNode 的实例)。在 workInProgress 树上面进行一 系列运算(计算更新等)，最后将副作用列表(Effect List)传入到 commit 阶段。当 commit 阶段运行完成后将当 前的 current 树替换为 workInProgress 树，至此一个更新流程就完成了。这个过程简化描述就是:

1. 在 render 阶段 React 依赖 current 树通过工作循环(workLoop)构建 workInProgress 树; 
2. 在 workInProgress 树进行一些更新计算，得到副作用列表(Effect List);
3. 在 commit 阶段将副作用列表渲染到页面后，将 current 树替换为 workInProgress 树(执行 current = workInprogress)。





Fiber 树



FiberRootNode 构造函数只有一个实例就是 fiberRoot 对象。而每个 Fiber 结点都是 FiberNode 构造函数的实例， 它们通过 return ， child 和 sibling 三个属性连接起来，形成了一个巨大链表。React 对每个结点的更新计算都是在这 个链表上完成的。React 在对 Fiber 结点标记更新标识的时候的做法就是为结点的 effectTag 属性赋不同的值，这个 赋值逻辑用了较多的位运算，下一节将会详细 Fiber 结点中的 effectTag 与位运算。

```



 JS 和渲染引擎是一个互斥关系

```text
Fiber 和 fiber 不是同一个概念。前者代表新的调和器，后者代表 fiber node，也可以认为是改进后的虚拟 DOM。
```



### 浏览器的一帧

![life of a frame](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/Life-Of-A-Frame.png)

主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。

浏览器每一帧都需要完成这些任务：

1. 处理用户交互
2. JS执行
3. 一帧的开始，处理视窗变化、页面滚动等
4. requestAnimationFrame(rAF)
5. 重排(layout)
6. 绘制(draw)



## 调度

![image-20211002112241751](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002112241.png)

#### `scheduleWork`

```jsx
// 主要的事情就是找到我们要处理的root,设置刚才获取到的执行优先级，然后调用 requestWork
function scheduleWork(fiber, expirationTime) {
  var root = scheduleWorkToRoot(fiber, expirationTime);
  if (root === null) {
    return;
  }
  
  // 存在上一个任务 且 上一个任务未执行完，但执行权交给了浏览器 且 发现当前更新的优先级高于上一个任务 调用resetStack 重置 stack
  // resetStack会从nextUnitOfWork开始一步一步往上恢复，前一个任务执行的那一半白做了
  if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime > nextRenderExpirationTime) {
    // This is an interruption. (Used for performance tracking.)
    interruptedBy = fiber;
    resetStack();
  }
  markPendingPriorityLevel(root, expirationTime);
  // If we're in the render phase, we don't need to schedule this root for an update, because we'll do it before we exit...unless this is a different root than the one we're rendering.
  if (!isWorking || isCommitting$1 || nextRoot !== root) {
    var rootExpirationTime = root.expirationTime;
    requestWork(root, rootExpirationTime);
  }
  // 告知你的代码触发无限循环了
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    // Reset this back to zero so subsequent updates don't throw.
    nestedUpdateCount = 0;
    invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
  }
}
```

#### `scheduleWorkToRoot`

```js
function scheduleWorkToRoot(fiber, expirationTime) {

  // Update the source fiber's expiration time
  if (fiber.expirationTime < expirationTime) {
    fiber.expirationTime = expirationTime;
  }
  var alternate = fiber.alternate;
  if (alternate !== null && alternate.expirationTime < expirationTime) {
    alternate.expirationTime = expirationTime;
  }
  // Walk the parent path to the root and update the child expiration time.
  var node = fiber.return;
  var root = null;
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode;
  } else {
    while (node !== null) {
      alternate = node.alternate;
      if (node.childExpirationTime < expirationTime) {
        node.childExpirationTime = expirationTime;
        if (alternate !== null && alternate.childExpirationTime < expirationTime) {
          alternate.childExpirationTime = expirationTime;
        }
      } else if (alternate !== null && alternate.childExpirationTime < expirationTime) {
        alternate.childExpirationTime = expirationTime;
      }
      if (node.return === null && node.tag === HostRoot) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  }
  return root;
}
```

#### `requestWork`

```js
function requestWork(root, expirationTime) {
  // 将Root加入到Schedule，更新root.expirationTime
  addRootToSchedule(root, expirationTime);
  if (isRendering) {
    // Prevent reentrancy. Remaining work will be scheduled at the end of the currently rendering batch.
    return;
  }

  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should flush it now.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    return;
  }

  // TODO: Get rid of Sync and use current time?
  if (expirationTime === Sync) {
    performSyncWork();
  } else {
    // 函数核心是实现了 requestIdleCallback 的 polyfill 版本
    scheduleCallbackWithExpirationTime(root, expirationTime);
  }
}
```

#### `addRootToSchedule`

```js
function addRootToSchedule(root, expirationTime) {
  // Add the root to the schedule.
  // Check if this root is already part of the schedule.
  // 判断 root 是否调度过
  if (root.nextScheduledRoot === null) {
    // This root is not already scheduled. Add it.
    root.expirationTime = expirationTime;
    if (lastScheduledRoot === null) {
      firstScheduledRoot = lastScheduledRoot = root;
      root.nextScheduledRoot = root;
    } else {
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
      lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
    }
  } else {
    // This root is already scheduled, but its priority may have increased.
    // root 已经调度过，判断是否需要更新优先级
    var remainingExpirationTime = root.expirationTime;
    if (expirationTime > remainingExpirationTime) {
      // Update the priority.
      root.expirationTime = expirationTime;
    }
  }
```

#### `performSyncWork`

```js
function performSyncWork() {
  performWork(Sync, false);
}
```

#### `performWork`

```js
function performWork(minExpirationTime, isYieldy) {
  // Keep working on roots until there's no more work, or until there's a higher
  // priority event.
  findHighestPriorityRoot();

  if (isYieldy) {
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;

    if (enableUserTimingAPI) {
      var didExpire = nextFlushedExpirationTime > currentRendererTime;
      var timeout = expirationTimeToMs(nextFlushedExpirationTime);
      stopRequestCallbackTimer(didExpire, timeout);
    }

    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime && !(didYield && currentRendererTime > nextFlushedExpirationTime)) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, currentRendererTime > nextFlushedExpirationTime);
      findHighestPriorityRoot();
      recomputeCurrentRendererTime();
      currentSchedulerTime = currentRendererTime;
    }
  } else {
    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
      findHighestPriorityRoot();
    }
  }

  // We're done flushing work. Either we ran out of time in this callback,
  // or there's no more work left with sufficient priority.

  // If we're inside a callback, set this to false since we just completed it.
  if (isYieldy) {
    callbackExpirationTime = NoWork;
    callbackID = null;
  }
  // If there's work left over, schedule a new callback.
  if (nextFlushedExpirationTime !== NoWork) {
    scheduleCallbackWithExpirationTime(nextFlushedRoot, nextFlushedExpirationTime);
  }

  // Clean-up.
  finishRendering();
}
```

#### `scheduleCallbackWithExpirationTime`

```js
// requestIdleCallback 的 polyfill 版本
function scheduleCallbackWithExpirationTime(root, expirationTime) {
  if (callbackExpirationTime !== NoWork) {
    // A callback is already scheduled. Check its expiration time (timeout).
    if (expirationTime < callbackExpirationTime) {
      // Existing callback has sufficient timeout. Exit.
      return;
    } else {
      if (callbackID !== null) {
        // Existing callback has insufficient timeout. Cancel and schedule a new one.
        unstable_cancelCallback(callbackID);
      }
    }
    // The request callback timer is already running. Don't start a new one.
  } else {
    startRequestCallbackTimer();
  }

  callbackExpirationTime = expirationTime;
  var currentMs = unstable_now() - originalStartTimeMs;
  var expirationTimeMs = expirationTimeToMs(expirationTime);
  var timeout = expirationTimeMs - currentMs;
  callbackID = unstable_scheduleCallback(performAsyncWork, { timeout: timeout });
}
```

#### `unstable_scheduleCallback`

```js
function unstable_scheduleCallback(callback, deprecated_options) {
  var startTime = currentEventStartTime !== -1 ? currentEventStartTime : getCurrentTime();

  var expirationTime;
  if (typeof deprecated_options === 'object' && deprecated_options !== null && typeof deprecated_options.timeout === 'number') {
    // FIXME: Remove this branch once we lift expiration times out of React.
    expirationTime = startTime + deprecated_options.timeout;
  } else {
    switch (currentPriorityLevel) {
      case ImmediatePriority:
        expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        expirationTime = startTime + USER_BLOCKING_PRIORITY;
        break;
      case IdlePriority:
        expirationTime = startTime + IDLE_PRIORITY;
        break;
      case LowPriority:
        expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
    }
  }

  var newNode = {
    callback: callback,
    priorityLevel: currentPriorityLevel,
    expirationTime: expirationTime,
    next: null,
    previous: null
  };

  // Insert the new callback into the list, ordered first by expiration, then
  // by insertion. So the new callback is inserted any other callback with
  // equal expiration.
  if (firstCallbackNode === null) {
    // This is the first callback in the list.
    firstCallbackNode = newNode.next = newNode.previous = newNode;
    ensureHostCallbackIsScheduled();
  } else {
    var next = null;
    var node = firstCallbackNode;
    do {
      if (node.expirationTime > expirationTime) {
        // The new callback expires before this one.
        next = node;
        break;
      }
      node = node.next;
    } while (node !== firstCallbackNode);

    if (next === null) {
      // No callback with a later expiration was found, which means the new
      // callback has the latest expiration in the list.
      next = firstCallbackNode;
    } else if (next === firstCallbackNode) {
      // The new callback has the earliest expiration in the entire list.
      firstCallbackNode = newNode;
      ensureHostCallbackIsScheduled();
    }

    var previous = next.previous;
    previous.next = next.previous = newNode;
    newNode.next = next;
    newNode.previous = previous;
  }

  return newNode;
}
```

#### `ensureHostCallbackIsScheduled`

```js
function ensureHostCallbackIsScheduled() {
  if (isExecutingCallback) {
    // Don't schedule work yet; wait until the next time we yield. // 调度正在执行 返回 也就是不能打断已经在执行的
    return;
  }
  // Schedule the host callback using the earliest expiration in the list. 让优先级最高的 进行调度 如果存在已经在调度的 直接取消
  var expirationTime = firstCallbackNode.expirationTime;
  if (!isHostCallbackScheduled) {
    isHostCallbackScheduled = true;
  } else {
    // Cancel the existing host callback.
    cancelHostCallback();
  }
  requestHostCallback(flushWork, expirationTime);
}
```

#### `requestHostCallback`

```js
requestHostCallback = function (callback, absoluteTimeout) {
  scheduledHostCallback = callback;
  timeoutTime = absoluteTimeout;
  if (isFlushingHostCallback || absoluteTimeout < 0) {
    // Don't wait for the next frame. Continue working ASAP, in a new event.
    port.postMessage(undefined);
  } else if (!isAnimationFrameScheduled) {
    // If rAF didn't already schedule one, we need to schedule a frame.
    // TODO: If this rAF doesn't materialize because the browser throttles, we
    // might want to still have setTimeout trigger rIC as a backup to ensure
    // that we keep performing work.
    isAnimationFrameScheduled = true;
    requestAnimationFrameWithTimeout(animationTick);
  }
};
```

#### `requestAnimationFrameWithTimeout`

```js
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID;
var rAFTimeoutID;
var requestAnimationFrameWithTimeout = function (callback) {
  // schedule rAF and also a setTimeout
  // 这里的 local 开头的函数指的是 requestAnimationFrame 及 setTimeout
  // requestAnimationFrame 只有页面在前台时才会执行回调
  // 如果页面在后台时就不会执行回调，这时候会通过 setTimeout 来保证执行 callback
  // 两个回调中都可以互相 cancel 定时器
  // callback 指的是 animationTick
  rAFID = localRequestAnimationFrame(function (timestamp) {
    // cancel the setTimeout
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function () {
    // cancel the requestAnimationFrame
    localCancelAnimationFrame(rAFID);
    callback(getCurrentTime());
  }, ANIMATION_FRAME_TIMEOUT);
};
```

#### `animationTick`

```js
var animationTick = function (rafTime) {
    if (scheduledHostCallback !== null) {
      // scheduledHostCallback 不为空的话就继续递归
      // 但是注意这里的递归并不是同步的，下一帧的时候才会再执行 animationTick
      requestAnimationFrameWithTimeout(animationTick);
    } else {
      // No pending work. Exit.
      isAnimationFrameScheduled = false;
      return;
    }
  	
		// frameDeadline 初始值为0，计算当前帧的截止时间
		// activeFrameTime 初始值为33 ，一帧的渲染时间33ms
    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If the calculated frame time gets lower than 8, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isMessageEventScheduled) {
      isMessageEventScheduled = true;
      port.postMessage(undefined);
    }
  };
```

#### `MessageChannel`

```js
// We use the postMessage trick to defer idle work until after the repaint.
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = function (event) {
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;

    var currentTime = getCurrentTime();

    var didTimeout = false;
    if (frameDeadline - currentTime <= 0) {
      // There's no time left in this idle period. Check if the callback has
      // a timeout and whether it's been exceeded.
      if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
        // Exceeded the timeout. Invoke the callback even though there's no
        // time left.
        didTimeout = true;
      } else {
        // No timeout.
        if (!isAnimationFrameScheduled) {
          // Schedule another animation callback so we retry later.
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
        // Exit without invoking the callback.
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        return;
      }
    }

    if (prevScheduledCallback !== null) {
      isFlushingHostCallback = true;
      try {
        prevScheduledCallback(didTimeout);
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };
```

#### `flushWork`

```js
function flushWork(didTimeout) {
  // Exit right away if we're currently paused

  if (enableSchedulerDebugging && isSchedulerPaused) {
    return;
  }

  isExecutingCallback = true;
  var previousDidTimeout = currentDidTimeout;
  currentDidTimeout = didTimeout;
  try {
    if (didTimeout) {
      // Flush all the expired callbacks without yielding.
      while (firstCallbackNode !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {
        // TODO Wrap in feature flag
        // Read the current time. Flush all the callbacks that expire at or
        // earlier than that time. Then read the current time again and repeat.
        // This optimizes for as few performance.now calls as possible.
        var currentTime = getCurrentTime();
        if (firstCallbackNode.expirationTime <= currentTime) {
          do {
            flushFirstCallback();
          } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime && !(enableSchedulerDebugging && isSchedulerPaused));
          continue;
        }
        break;
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      if (firstCallbackNode !== null) {
        do {
          if (enableSchedulerDebugging && isSchedulerPaused) {
            break;
          }
          flushFirstCallback();
        } while (firstCallbackNode !== null && !shouldYieldToHost());
      }
    }
  } finally {
    isExecutingCallback = false;
    currentDidTimeout = previousDidTimeout;
    if (firstCallbackNode !== null) {
      // There's still work remaining. Request another callback.
      ensureHostCallbackIsScheduled();
    } else {
      isHostCallbackScheduled = false;
    }
    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}
```

#### `flushFirstCallback`

#### `performAsyncWork`

```js
function performAsyncWork() {
  try {
    if (!shouldYieldToRenderer()) {
      // The callback timed out. That means at least one update has expired.
      // Iterate through the root schedule. If they contain expired work, set
      // the next render expiration time to the current time. This has the effect
      // of flushing all expired work in a single batch, instead of flushing each
      // level one at a time.
      if (firstScheduledRoot !== null) {
        recomputeCurrentRendererTime();
        var root = firstScheduledRoot;
        do {
          didExpireAtExpirationTime(root, currentRendererTime);
          // The root schedule is circular, so this is never null.
          root = root.nextScheduledRoot;
        } while (root !== firstScheduledRoot);
      }
    }
    performWork(NoWork, true);
  } finally {
    didYield = false;
  }
}
```

#### `performWork`

#### `performWorkOnRoot`

```js
function performWorkOnRoot(root, expirationTime, isYieldy) {

  isRendering = true;

  // Check if this is async work or sync/expired work.
  if (!isYieldy) {
    // Flush work without yielding.
    // TODO: Non-yieldy work does not necessarily imply expired work. A renderer
    // may want to perform some work without yielding, but also without
    // requiring the root to complete (by triggering placeholders).

    var finishedWork = root.finishedWork;
    if (finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var timeoutHandle = root.timeoutHandle;
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(timeoutHandle);
      }
      renderRoot(root, isYieldy);
      finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        // We've completed the root. Commit it.
        completeRoot(root, finishedWork, expirationTime);
      }
    }
  } else {
    // Flush async work.
    var _finishedWork = root.finishedWork;
    if (_finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, _finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var _timeoutHandle = root.timeoutHandle;
      if (_timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(_timeoutHandle);
      }
      renderRoot(root, isYieldy);
      _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        // We've completed the root. Check the if we should yield one more time
        // before committing.
        if (!shouldYieldToRenderer()) {
          // Still time left. Commit the root.
          completeRoot(root, _finishedWork, expirationTime);
        } else {
          // There's no time left. Mark this root as complete. We'll come
          // back and commit it later.
          root.finishedWork = _finishedWork;
        }
      }
    }
  }

  isRendering = false;
}
```

