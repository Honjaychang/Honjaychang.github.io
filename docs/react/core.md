# Core

:::note Ref

- 大量参考：[React技术揭秘](https://react.iamkasong.com/)

好文力荐

- [React 架构的演变 - 从同步到异步](https://blog.shenfq.com/2020/react-架构的演变-从同步到异步/)
- [React 架构的演变 - 从递归到循环](https://blog.shenfq.com/2020/react-架构的演变-从递归到循环/)
- [React 架构的演变 - 更新机制](https://blog.shenfq.com/2020/react-架构的演变-更新机制/)
- [React 架构的演变 - Hooks 的实现](https://blog.shenfq.com/posts/2020/React%20%E6%9E%B6%E6%9E%84%E7%9A%84%E6%BC%94%E5%8F%98%20-%20Hooks%20%E7%9A%84%E5%AE%9E%E7%8E%B0.html)

:::

React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式



> 快速响应

- CPU的瓶颈：当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行**样式布局**和**样式绘制**了。

在浏览器每一帧的时间中，预留一些时间给JS线程，`React`利用这部分时间更新组件。

当预留的时间不够用时，`React`将线程控制权交还给浏览器使其有时间渲染UI，`React`则等待下一帧时间到来继续被中断的工作。（一直吃不到 则有timeout）

这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）

解决`CPU瓶颈`的关键是实现`时间切片`，而`时间切片`的关键是：将**同步的更新**变为**可中断的异步更新**。



- IO的瓶颈：发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

`网络延迟`是前端开发者无法解决的。如何在`网络延迟`客观存在的情况下，减少用户对`网络延迟`的感知？

`React`给出的答案是[将人机交互研究的结果整合到真实的 UI 中](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production)

`React`实现了[Suspense](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)功能及配套的`hook`——[useDeferredValue](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)





`React`为了践行“构建**快速响应**的大型 Web 应用程序”理念做出的努力。

其中的关键是解决CPU的瓶颈与IO的瓶颈。而落实到实现上，则需要将**同步的更新**变为**可中断的异步更新**。





#### React15架构

可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上



Reconciler

我们知道，在`React`中可以通过`this.setState`、`this.forceUpdate`、`ReactDOM.render`等API触发更新。

每当有更新发生时，**Reconciler**会做如下工作：

- 调用函数组件、或class组件的`render`方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知**Renderer**将变化的虚拟DOM渲染到页面上

Renderer

由于`React`支持跨平台，所以不同平台有不同的**Renderer**。我们前端最熟悉的是负责在浏览器环境渲染的**Renderer** —— [ReactDOM](https://www.npmjs.com/package/react-dom)

在每次更新发生时，**Renderer**接到**Reconciler**通知，将变化的组件渲染在当前宿主环境。



缺点 

在**Reconciler**中，`mount`的组件会调用[mountComponent](https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L498)，`update`的组件会调用[updateComponent](https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L877)。这两个方法都会递归更新子组件。

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。



**Reconciler**和**Renderer**是交替工作的，当第一个`li`在页面上已经变化后，第二个`li`再进入**Reconciler**





#### React16架构

可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上





Scheduler。Reconciler随时可能由于以下原因被中断

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间





相较于15

- 新增Scheduler
- 采用新的`Reconciler`  且`Reconciler`内部采用了`Fiber`的架构
- **Scheduler**和**Reconciler**都是平台无关的





Scheduler（调度器）

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

`React`实现了功能更完备的`requestIdleCallback`polyfill，这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。

放弃原因

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的`requestIdleCallback`触发的频率会变得很低



Reconciler

更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

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



协调器（`Reconciler`）重构的一大目的是：将老的`同步更新`的架构变为`异步可中断更新`。



 Renderer（渲染器）

**Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。





Fiber架构

generate被弃用的原因

- `Generator`是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变。这样心智负担比较重。
- `Generator`执行的`中间状态`是上下文关联的。
- 当考虑高优先级任务插队时 需要全局变量保存之前执行的中间状态 会引入新的复杂度





用`Fiber`来取代**React16虚拟DOM**这一称呼



`Fiber`包含三层含义：

- 作为架构来说
  - `React15`的`Reconciler`采用递归的方式执行，被称为`stack Reconciler`。
  - `React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。

- 作为静态的数据结构来说
  - 每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

- 作为动态的工作单元来说
  - 每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。



架构

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```



作为一种静态的数据结构，保存了组件相关的信息：

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

##### 双缓存

这种**在内存中构建并直接替换**的技术叫做[双缓存](https://baike.baidu.com/item/双缓冲)。

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新





- `Reconciler`工作的阶段被称为`render`阶段。因为在该阶段会调用组件的`render`方法。
- `Renderer`工作的阶段被称为`commit`阶段。就像你完成一个需求的编码后执行`git commit`提交代码。`commit`阶段会把`render`阶段提交的信息渲染在页面上。
- `render`与`commit`阶段统称为`work`，即`React`在工作中。相对应的，如果任务正在`Scheduler`内调度，就不属于`work`。

### `JSX`

`JSX` 是一个 `JavaScript` 的语法扩展，可以很好地描述 `UI` 应该呈现出它应有交互的本质形式

`JSX` 在编译时会被 `Babel` 转译为 `React.createElement()` 函数调用

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

#### `React.createElement`

- `React.createElement()`最终会调用`ReactElement()`方法返回一个包含组件数据的对象
  - 该对象有个参数`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个`React Element`
  - 所以调用`React.createElement`返回的对象就是`React Element`

这些对象被称为 `React 元素`。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

```js
export function createElement(type, config, children) {
  // ......
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // 标记这是个 React Element
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };

  return element;
};
```

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 `ReactDOM.render()`

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```



#### `react Component`

`ClassComponent`对应的`Element`的`type`字段为`AppClass`自身。

`FunctionComponent`对应的`Element`的`type`字段为`AppFunc`自身

无法通过引用类型区分`ClassComponent`和`FunctionComponent`

```js
AppClass instanceof Function === true;
AppFunc instanceof Function === true;
```

可以`React`通过`ClassComponent`实例原型上的`isReactComponent`变量判断是否是`ClassComponent`

```js
ClassComponent.prototype.isReactComponent = {};
```





JSX与Fiber

在组件`mount`时，`Reconciler`根据`JSX`描述的组件内容生成组件对应的`Fiber节点`。

在`update`时，`Reconciler`将`JSX`与`Fiber节点`保存的数据对比，生成组件对应的`Fiber节点`，并根据对比结果为`Fiber节点`打上`标记`



#### render阶段

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

- `shouldYield` 
- `workInProgress` 
- `performUnitOfWork` 

`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分：“递”和“归”。

##### 递

首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个 `Fiber节点` 调用 `beginWork方法` 

该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个 `Fiber节点` 连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

##### 归

在“归”阶段会调用 `completeWork` 处理`Fiber节点`。

当某个`Fiber节点`执行完`completeWork`，如果其存在`兄弟Fiber节点`（即`fiber.sibling !== null`），会进入其`兄弟Fiber`的“递”阶段。

如果不存在`兄弟Fiber`，会进入`父级Fiber`的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render阶段`的工作就结束了。



`performUnitOfWork`递归版本

```js
function performUnitOfWork(fiber) {
  // 执行beginWork

  if (fiber.child) {
    performUnitOfWork(fiber.child);
  }

  // 执行completeWork

  if (fiber.sibling) {
    performUnitOfWork(fiber.sibling);
  }
}
```

> `performUnitOfWork`

```js
let workInProgress = FiberRoot

// 遍历 Fiber 节点，如果时间片时间用完就停止遍历
function workLoopConcurrent() {
  while (
    workInProgress !== null &&
    !shouldYield() // 用于判断当前时间片是否到期
  ) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork() {
  const next = beginWork(workInProgress) // 返回当前 Fiber 的 child
  if (next) { // child 存在
    // 重置 workInProgress 为 child
    workInProgress = next
  } else { // child 不存在
    // 向上回溯节点
    let completedWork = workInProgress
    while (completedWork !== null) {
      // 收集副作用，主要是用于标记节点是否需要操作 DOM
      completeWork(completedWork)

      // 获取 Fiber.sibling
      let siblingFiber = workInProgress.sibling
      if (siblingFiber) {
        // sibling 存在，则跳出 complete 流程，继续 beginWork
        workInProgress = siblingFiber
        return;
      }

      completedWork = completedWork.return
      workInProgress = completedWork
    }
  }
}

function beginWork(workInProgress) {
  // 调用 render 方法，创建子 Fiber，进行 diff
  // 操作完毕后，返回当前 Fiber 的 child
  return workInProgress.child
}
function completeWork(workInProgress) {
  // 收集节点副作用
}
```

> `beginWork`


```js
function beginWork(
	// 当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
  current: Fiber | null, 
  workInProgress: Fiber, // 当前组件对应的Fiber节点
  renderLanes: Lanes, // 优先级相关
): Fiber | null {
    
  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes,
    );
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: 
      // ...省略
    case LazyComponent: 
      // ...省略
    case FunctionComponent: 
      // ...省略
    case ClassComponent: 
      // ...省略
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
      // ...省略
    // ...省略其他类型
  }
}
```

得益于双缓存树的机制，在组件`mount`时，由于是首次渲染，是不存在当前组件对应的`Fiber节点`在上一次更新时的`Fiber节点`，即`mount`时`current === null`。所以可以通过`current === null ?`来区分组件是处于`mount`还是`update`

- `mount`时：除`fiberRootNode`以外，`current === null`。会根据`fiber.tag`不同，创建不同类型的`子Fiber节点`
- `update`时：如果`current`存在，在满足一定条件时可以复用`current`节点，这样就能克隆`current.child`作为`workInProgress.child`，而不需要新建`workInProgress.child`。

```js
font-size: 0.875em;
font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
git add

--bg-color: #363B40;
```

`update` 时 `workInProgress` 会复用 `current` 节点



#### commit阶段

`commit`阶段的主要工作（即`Renderer`的工作流程）分为三部分：

- before mutation阶段（执行`DOM`操作前）
- mutation阶段（执行`DOM`操作）
- layout阶段（执行`DOM`操作后）











`concurrent模式`相较我们当前使用的`legacy模式`最主要的区别是**将同步的更新机制重构为异步可中断的更新**。





`React`的`diff`会预设三个限制：

1. 只对同级元素进行`Diff`。如果一个`DOM节点`在前后两次更新中跨越了层级，那么`React`不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过 `key prop`来暗示哪些子元素在不同的渲染下能保持稳定。



















### setState 同步异步问题

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

#### React 15 源码

- 源码有删减作简化处理 且 未核验 orz

```js
setState -> enqueueSetState -> enqueueUpdate -> isBatchingUpdates

组件入队dirtyComponents 
循环更新dirtyComponents里的所有组件
```

> setState 方法挂载在原型链上

```js
ReactComponent.prototype.setState = function (partialState, callback) {
  // 调用 setState 后，会调用内部的 updater.enqueueSetState
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};
```

> enqueueSetState

```js
enqueueSetState(component, partialState) {
  // 在组件的 _pendingStateQueue 上暂存新的 state
  if (!component._pendingStateQueue) {
    component._pendingStateQueue = [];
  }
  var queue = component._pendingStateQueue;
  queue.push(partialState);
  enqueueUpdate(component);
}
```

- 将新的 `state` 放进组件的状态队列里
- 用 `enqueueUpdate` 来处理将要更新的实例对象

> enqueueUpdate

```js
function enqueueUpdate(component) {
  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
  if (!batchingStrategy.isBatchingUpdates) {
    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
  dirtyComponents.push(component);
}
```

> batchingStrategy

```js
var batchingStrategy = {
  // 全局唯一的锁标识 判断是否在更新流程中
  isBatchingUpdates: false,
 
  // 发起更新动作的方法
  batchedUpdates: function(callback, a, b, c, d, e) {
    // 缓存锁变量
    var alreadyBatchingStrategy = ReactDefaultBatchingStrategy.isBatchingUpdates
    // 把锁“锁上”
    ReactDefaultBatchingStrategy.isBatchingUpdates = true

    if (alreadyBatchingStrategy) {
      // 如果已经在更新状态中，重新调用 enqueueUpdate，将 component 放入 dirtyComponents
      // callback -> enqueueUpdate
      callback(a, b, c, d, e)
    } else {
      // 启动事务，将 callback 放进事务里执行
      transaction.perform(callback, null, a, b, c, d, e)
    }
  }
}
```

> Transaction

```js
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};
var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};
var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
```

`Transaction` 是创建一个黑盒，该黑盒能够封装任何的方法

```js
/*
*                       wrappers (injected at creation time)
*                                      +        +
*                                      |        |
*                    +-----------------|--------|--------------+
*                    |                 v        |              |
*                    |      +---------------+   |              |
*                    |   +--|    wrapper1   |---|----+         |
*                    |   |  +---------------+   v    |         |
*                    |   |          +-------------+  |         |
*                    |   |     +----|   wrapper2  |--------+   |
*                    |   |     |    +-------------+  |     |   |
*                    |   |     |                     |     |   |
*                    |   v     v                     v     v   | wrapper
*                    | +---+ +---+   +---------+   +---+ +---+ | invariants
* perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
* +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
*                    | |   | |   |   |         |   |   | |   | |
*                    | |   | |   |   |         |   |   | |   | |
*                    | |   | |   |   |         |   |   | |   | |
*                    | +---+ +---+   +---------+   +---+ +---+ |
*                    |  initialize                    close    |
*                    +-----------------------------------------+
*/
```

说白了，`Transaction` 就像是一个“壳子”，它首先会将目标函数用 `wrapper`（一组 `initialize` 及 `close` 方法称为一个 `wrapper`） 封装起来，同时需要使用 `Transaction` 类暴露的 `perform` 方法去执行它。

如上面的注释所示，在 `anyMethod` 执行之前，`perform` 会先执行所有 `wrapper` 的 `initialize` 方法，执行完后，再执行所有 `wrapper` 的 `close` 方法。这就是 `React` 中的事务机制。



在 `callback` 执行之后，`RESET_BATCHED_UPDATES` 将 `isBatchingUpdates` 置为`false`，`FLUSH_BATCHED_UPDATES` 执行 `flushBatchedUpdates` ，然后里面会循环所有 `dirtyComponent`，调用`updateComponent`来执行所有的生命周期方法
`(componentWillReceiveProps → shouldComponentUpdate → componentWillUpdate → render → componentDidUpdate)`，最后实现组件的更新。



> ReactMount.js

```js
_renderNewRootComponent: function( nextElement, container, shouldReuseMarkup, context ) {
  // 实例化组件
  var componentInstance = instantiateReactComponent(nextElement);
  // 初始渲染直接调用 batchedUpdates 进行同步渲染
  ReactUpdates.batchedUpdates(
    batchedMountComponentIntoNode,
    componentInstance,
    container,
    shouldReuseMarkup,
    context
  );
  ...
}
```

这段代码是在首次渲染组件时会执行的一个方法，我们看到它内部调用了一次 `batchedUpdates`，这是因为在组件的渲染过程中，会按照顺序调用各个生命周期函数。开发者很有可能在声明周期函数中调用 `setState`。因此，我们需要通过开启 `batch` 来确保所有的更新都能够进入 `dirtyComponents` 里去，进而确保初始渲染流程中所有的 `setState` 都是生效的。

下面代码是 `React` 事件系统的一部分。当我们在组件上绑定了事件之后，事件中也有可能会触发 `setState`。为了确保每一次 `setState` 都有效，`React` 同样会在此处手动开启批量更新。

> ReactEventListener.js

```js
dispatchEvent: function (topLevelType, nativeEvent) {
  ...
  try {
    // 处理事件
    ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
  } finally {
    TopLevelCallbackBookKeeping.release(bookKeeping);
  }
}
```

所以，`isBatchingUpdates` 这个变量，在 `React` 的生命周期函数以及合成事件执行前，已经被 `React` 悄悄修改为了 `true`，这个时候已经开始了事务，所以只要不脱离 `React`，不管多少次 `setState` 都会把其组件放入脏组件队列等待更新。当函数执行完毕后，事务的 `close` 方法会再把 `isBatchingUpdates` 改为 `false`。

#### React 16 源码











因为 React 16 中已经没有了事务一说。



componentDidMount useEffect执行时机





```js
React.createElement(MyComponent, null)

const fiberRoot = document.querySelector('#app')._reactRootContainer._internalRoot


const hostRootFiberNode = fiberRoot.current

fiberRoot.current.stateNode === fiberRoot; // true

```



![life of a frame](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/1*ad-k5hYKQnRQJF8tv8BIqg.png)

## 调度的流程

上文说了这么多，这一小节我们将来梳理一遍调度的整个流程。

- 首先每个任务都会有各自的优先级，通过当前时间加上优先级所对应的常量我们可以计算出 `expriationTime`，**高优先级的任务会打断低优先级任务**
- 在调度之前，判断当前任务**是否过期**，过期的话无须调度，直接调用 `port.postMessage(undefined)`，这样就能在渲染后马上执行过期任务了
- 如果任务没有过期，就通过 `requestAnimationFrame` 启动定时器，在重绘前调用回调方法
- 在回调方法中我们首先需要**计算每一帧的时间以及下一帧的时间**，然后执行 `port.postMessage(undefined)`
- `channel.port1.onmessage` 会在渲染后被调用，在这个过程中我们首先需要去判断**当前时间是否小于下一帧时间**。如果小于的话就代表我们尚有空余时间去执行任务；如果大于的话就代表当前帧已经没有空闲时间了，这时候我们需要去判断是否有任务过期，**过期的话不管三七二十一还是得去执行这个任务**。如果没有过期的话，那就只能把这个任务丢到下一帧看能不能执行了





 JS 和渲染引擎是一个互斥关系

```text
Fiber 和 fiber 不是同一个概念。前者代表新的调和器，后者代表 fiber node，也可以认为是改进后的虚拟 DOM。
```

###  



Hooks的规则

- **不要在循环，条件判断，嵌套函数里面调用 Hooks**
- **只在 React 的函数里面调用 Hooks**



- [译 React hooks: 不是魔法，只是数组](https://zhuanlan.zhihu.com/p/48293710)
