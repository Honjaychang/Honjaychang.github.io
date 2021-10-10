# render阶段

![image-20211002152401431](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002152401.png)

## 概述

`render` 阶段

> React 应用程序首次渲染时构建 `workInProgress` 树的过程也是将 `React` 元素树转化为 `Fiber` 树的过程， `workInProgress` 树构建完成后会在该「树」上面完成更新计算、调用生命周期函数以及收集副作用列表等工作。
>
> 应用程序渲染时在 `render` 阶段的一个重要工作就是构建 `workInProgress` 树，构建 `workInProgress` 树的过程中 `React` 也会完成更新计算、调用生命周期函数以及收集副作用列表等工作
>
> React的更新任务主要是调用`workLoop`的工作循环去构建`workInProgress`树， 构建过程分为两个阶段：向下遍历和向上回溯，向下和向上的过程中会对途径的每个节点进行`beginWork` 和`completeWork`

`beginWork`

- 是处理节点更新的入口，它会依据`fiber` 节点的类型去调用不同的处理函数
- React对`current`树的每个节点进行`beginWork` 操作，进入`beginWork` 后，首先判断节点及其子树是否有更新，若有更新，则会在计算新状态和`diff`之后生成新的`fiber`， 然后在新的`fiber`上标记`effectTag`，最后`return`它的子节点，以便继续针对子节点进行`beginWork`。若它没有子节点，则返回`null`，这样说明这个节点是末端节点， 可以进行向上回溯，进入`completeWork`阶段。
- 计算新状态 `update` `updateQueue` `processUpdateQueue`
  - 准备阶段 - 整理`updateQueue` 上次遗留的 本次新增的
  - 处理阶段 - 循环处理上一步整理好的更新队列 优先级
  - 完成阶段 - 主要是做一些赋值和优先级标记的工作
- `Diff`算法
  - 经过状态计算后 已经获取到了新的 `fiber` 在`render`之前 需要`diff` 操作 打上 `effectTag`  (可以标识这个`fiber`发生了怎样的变化，例如：新增`Placement` ，这些被打上`flag` 的`fiber`会在`complete`阶段被收集起来，形成一个`effectList`链表，只包含这些需要操作的`fiber`，最后在`commit`阶段被更新掉)
  - `diff` 的主体是 `oldFiber (current.child)` 和 `new React Element (nextChildren)`
  - `diff` 的原则  直接销毁重建  以及 依据`key tag`复用
  - 在 `diff` 过后，`workInProgress`节点的`beginWork`节点就完成了。接下来会进入`completeWork`阶段

`completeWork`

- 进入`completeWork` 后的`workInProgress` 节点都是经过`diff`算法调和过的，节点的`fiber`的形态已经基本确定了，但对于原生DOM组件和文本节点的 `fiber` 来说，对应的DOM节点并未变化
- 这个阶段主要就是两个工作
  - 构建或更新DOM节点
  - 自下而上收集`effectList`，最终收集到`root`上
- 依据`fiber`的`tag`做不同处理。DOM节点的更新实则是属性的更新

收集好的副作用列表会在 `commit` 阶段统一映射到屏幕上



- 创建`wIP` 树
- 计算新状态
- 进行`diff` 标记`effectTag`
- 构建或更新DOM节点
- 收集形成 `effect List`



## render阶段

### 构建 `wIP` 树

> 此阶段 `React` 将元素逐个转换为对应类型的 `Fiber` 结点，最终形成 `workInProgress` 树

应用程序首次渲染过程刚进入 `render` 阶段时 `fiberRoot` 对象上面只有 `current` 树，此时的 `current` 树只有一个类型为 `HostRoot` 的 `Fiber` 结点，该 `Fiber` 结点的更新队列中只有一个更新对象，内容是应用程序的根组件元素。紧接着 `React` 要做的就是初始化 `workInProgress` 对象。

![image-20211001131338587](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001131338.png)

#### 初始化 `wIP` 对象

- `renderRoot` 调用 `createWorkInProgress` 为 `workInProgress` 对象赋初始值
- 函数调用后 `wIP` 对象上有了第一个`Fiber`结点，结点的`tag`为`HostRoot` 是整个`wIP`树的根节点

![image-20211001132001247](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001132001.png)

#### 完善 `wIP` 对象

- 要想把组件元素描述的页面结构映射到屏幕上必须先将元素转换为 `Fiber` 结点
- 完善`wIP` 对象的过程就是 将 `React` 元素树转化为 `Fiber` 树的过程

### 工作循环

#### 循环解析工作单元

- 工作循环主要是执行 `workLoop` 函数来循环解析工作单元。每次循环解析的工作单元就是上一次 `Fiber` 结点的 `child`。
- 第一次循环解析的是 `HostRoot` 类型的结点，该结点也就是所有结点的祖先
- 工作单元具体的解析逻辑在 `performUnitOfWork` 中调用

#### 解析工作单元

在 `beginWork` 函数内部通过匹配 `Fiber` 结点的 `tag` 值调用 `updateHostRoot、updateClassComponent、updateHostComponent、updateHostText` 等函数，分别解析 `HostRoot、ClassComponent、HostComponent、HostText`等类型的Fiber 结点。

#### 完成工作单元

工作单元解析执行到 `workInProgress` 树的叶子结点时，会完成当前工作单元。完成工作单元的主要工作是收集副作用，同时处理 `HostComponent` 类型的结点，创建对应的 `DOM` 元素并将他们 `append` 到父结点上







```js
构建 workInProgress 树的过程也是执行「协调算法」过程，通过循环解析工作单元获取下一个 Fiber 结点，同时 父子结点和兄弟结点也会被串联起来。这个过程从整体上可以分为两步，分别是 初始化 workInProgress 对象和 完善 workInProgress 对象。首先，我们先看一下应用程序执行过程刚进入 render 阶段时的 fiberRoot 对象。




从初始化 workInProgress 对象到形成 workInProgress 树，应用程序会执行多次循环，每一次循环都是在解析 Fiber 结点并返回下一个要解析的结点。这 个过程中会使用重要的「协调」算法，同时也会进行结点的 diff 操作。



通过工作循环来构建workInProgress 两个关键环节 解析工作单元 完成工作单元
```

### 解析不同类型`Fiber`结点

应用程序首次渲染时，将根组件元素转换为多个层级的 `Fiber` 结点过程中，第一步要做的就是解析 `wIP` 树的根结点 `HostRoot`

![image-20211001140433792](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001140433.png)

#### `HostRoot` 类型

- `updateHostRoot -> processUpdateQueue`
- 解析 `HostRoot`类型结点的关键是处理更新队列 `processUpdateQueue` 获取根组件元素 `element`，`element `就是要传入到协调算法中进行解析的`nextChildren`

```js
function updateHostRoot(current$$1, workInProgress, renderExpirationTime) {
  pushHostRootContext(workInProgress);
  var updateQueue = workInProgress.updateQueue;

  var nextProps = workInProgress.pendingProps;
  var prevState = workInProgress.memoizedState;
  var prevChildren = prevState !== null ? prevState.element : null;
  processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
  var nextState = workInProgress.memoizedState;
  // Caution: React DevTools currently depends on this property
  // being called "element".
  var nextChildren = nextState.element;
  if (nextChildren === prevChildren) {
    // If the state is the same as before, that's a bailout because we had
    // no work that expires at this time.
    resetHydrationState();
    return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
  }
  var root = workInProgress.stateNode;
  if ((current$$1 === null || current$$1.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
    // If we don't have any current children this might be the first pass.
    // We always try to hydrate. If this isn't a hydration pass there won't
    // be any children to hydrate which is effectively the same thing as
    // not hydrating.

    // This is a bit of a hack. We track the host root as a placement to
    // know that we're currently in a mounting state. That way isMounted
    // works as expected. We must reset this before committing.
    // TODO: Delete this when we delete isMounted and findDOMNode.
    workInProgress.effectTag |= Placement;

    // Ensure that children mount into this root without tracking
    // side-effects. This ensures that we don't store Placement effects on
    // nodes that will be hydrated.
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
  } else {
    // Otherwise reset hydration state in case we aborted and resumed another
    // root.
    reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
    resetHydrationState();
  }
  return workInProgress.child;
}
```



#### `ClassComponent` 类型

- 应用程序首次渲染时解析 `HostRoot` 类型结点完成后返回的一般是 `ClassComponent` 类型的结点，这种类型的 `Fiber` 结点解析过程中是要进行组件实例化的
- 解析`ClassComponent`类型的结点时，先从当前 `Fiber` 结点的 `stateNode` 属性上面取组件实例`instance`，如果 `instance` 的值为 `null` 则说明是首次渲染，组件还没有被实例化。React 使用 `constructClassInstance` 函数完成组件实例化，同时为组件实例添加更新器（然后就可以调用 `setState` 
- 组件实例生成后，它的核心作用之一就是在  `finishClassComponent`  函数内部执行 `instance.render() `获取要传入到协调算法中进行解析的 `nextChildren`

```js
function updateClassComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
	// ...

  var instance = workInProgress.stateNode;
  var shouldUpdate = void 0;
  if (instance === null) {
    if (current$$1 !== null) {
      // An class component without an instance only mounts if it suspended
      // inside a non- concurrent tree, in an inconsistent state. We want to
      // tree it like a new mount, even though an empty version of it already
      // committed. Disconnect the alternate pointers.
      current$$1.alternate = null;
      workInProgress.alternate = null;
      // Since this is conceptually a new fiber, schedule a Placement effect
      workInProgress.effectTag |= Placement;
    }
    // In the initial pass we might need to construct the instance.
    constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    shouldUpdate = true;
  } else if (current$$1 === null) {
    // In a resume, we'll already have an instance we can reuse.
    shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
  } else {
    shouldUpdate = updateClassInstance(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
  }
  var nextUnitOfWork = finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime);

  return nextUnitOfWork;
}

function finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
  // ...
  return workInProgress.child;
}
```

#### `HostComponent` 类型

- 解析 `ClassComponent` 类型结点完成后返回的一般是 `HostComponent` 类型`tag`的结点，这种结点的具体类型 `elementType`对应的是真实的 `DOM` 标签 (如 `div  span ...` 
- 解析 `HostComponent` 类型结点，可从当前结点对应的元素 `props` 中获取要传入到协调算法中进行解析的 `nextChildren`
- 这里要强调一下，无论是解析 HostRoot 类型的结点，还是解析 `HostComponent` 类型的结点，这个过程中获取的 `nextChildren` 均为 `React 元素`。在执行协调算法的过程中，`React` 将该元素转换成对应的 `Fiber `结点并返回。

#### `HostText` 类型

- 当解析到元素的叶子元素时，此时对应的 `Fiber` 结点类型为 `HostText` 。`React` 认为文本类型的 `Fiber `结点已经是终点，不会再有孩子结点，直接返回 `null`

![image-20211001145029076](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001145029.png)

在工作循环的过程中，`React` 总是先从外部根节点开始解析，当解析到叶子结点时就要开始完成工作单元。完成工作单元时如果有兄弟结点时则需要继续解析兄弟结点，然后完成兄弟结点后会逐层向上完成工作单元。







在 `Diff` 之后，`workInProgress`节点就会进入`complete`阶段

这个时候拿到的`workInProgress`节点都是经过`diff`算法调和过的，也就意味着对于某个节点来说它`fiber`的形态已经基本确定了，但除此之外还有两点：

- 目前只有`fiber`形态变了，对于原生DOM组件 `HostComponent` 和文本节点 `HostText` 的`fiber`来说，对应的DOM节点 `fiber.stateNode` 并未变化
- 经过`Diff`生成的新的`workInProgress`节点持有了`flag` 即`effectTag`

基于这两个特点，`completeWork`的工作主要有：

- 构建或更新DOM节点
  - 构建过程中，会自下而上将子节点的第一层第一层插入到当前节点。
  - 更新过程中，会计算DOM节点的属性，一旦属性需要更新，会为DOM节点对应的`workInProgress` 节点标记`Update` 的 `effectTag`
- 自下而上收集 `effectList`，最终收集到 `root`上
- 错误处理



### 完成工作单元的时机

- 检查当前结点是否有兄弟结点，如果没有兄弟结点就检查父结点有没有兄弟结点
- 为 `HostComponent` 类型的结点创建 `DOM` 元素实例
- 收集副作用 `Effect List`



入口函数`completeUnitOfWork -> completeWork`

在 `completeUnitOfWork` 函数中执行了一个遍历，这个遍历的方向是由子结点向父结点层层返回

#### 创建或更新 DOM 元素

`completeWork` 函数负责对不同类型的工作单元 `Fiber 结点`分别处理

##### `HostComponent`

##### `HostText`

`HostComponent` 和`HostText`类型的 `Fiber `结点是有对应的真实 `DOM` 元素，因此在完成工作单元阶段 `React`要为它们创建自己的 `DOM` 实例

在完成工作单元的过程中分为了两种情况，分别是首次渲染和更新渲染。

- 应用程序首次渲染时：`React` 为 `HostComponent` 和 `HostText` 类型的 `Fiber` 结点创建对应的 `DOM` 实例并将其赋值到结点上的 `stateNode` 属性上
- 应用程序更新渲染时： `React` 不需要为它们重新创建 `DOM` 实例，而是把新的值更新到 `DOM` 元素中

`updateHostComponent` 函数和 `updateHostText` 函数分别用于更新 DOM 元素

#### 收集副作用

在收集副作用的过程中主要有两种情况

- 第一种情况就是将子树上面的副作用列表连到父结点上面
- 第二种情况就是如果当前结点也有副作用标识，则将当前结点也连接到父结点的副作用列表中

事实上，应用程序首次渲染时的副作用列表就是整个 `workInProgress` 树，因为整个 `workInProgress` 树的结点中携带的内容都需要更新到屏幕，而在应用程序更新渲染时副作用列表将会是 `workInProgress` 树的子集

下图便为应用程序首次渲染完成工作循环后的 `wIP`树  `firstEffect lastEffect` 便为副作用链表



在收集好的副作用列表中每个 `HostComponent` 类型 `Fiber` 结点的 `stateNode` 属性中存储了当前结点对应的 `DOM` 实例。那么，`React` 下一步要做的就是将副作用列表中的所有 `DOM` 实例更新到屏幕中





