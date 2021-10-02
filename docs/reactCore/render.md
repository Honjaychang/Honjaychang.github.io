# render阶段

应用程序渲染时在 render 阶段的一个重要工作就是构建 workInProgress 树，构建 workInProgress 树的过程中 React 也会完成更新 计算、调用生命周期函数以及收集副作用列表等工作

在这个过程中 React 也会完成结点 diff 的逻辑，最终会得到用于更新到屏幕的副作用列表。



React 应用程序首次渲染时构建 workInProgress 树的过程也是将 React 元素树转化为 Fiber 树的过程， workInProgress 树构建完成后会在该「树」上面完成更新计算、调用生命周期函数以及收集副作用列表等工作。收集好的副作用列表会在 commit 阶段统一映射到屏幕上。

![image-20211002152401431](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002152401.png)



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



#### 何时进入`commit`阶段

工作循环执行结束，标志着应用程序渲染过程中 `render` 阶段工作的完成。此时 `fiberRoot` 对象上面的 `workInProgress` 树存储在 `root.current.alternate` 指向的内存单元。`React` 会将 `workInProgress` 树赋值到 `fiberRoot` 对象上的 `finishedWork` 属性中。然后，检查 `workInProgressRootExitStatus` 的状态，如果是正常结束，则应用程序渲染任务进入 `commit` 阶段。

#### 如何将副作用更新到屏幕

在 render 阶段结束时 fiberRoot 对象上面将会得到一个副作用列表(Effect List)，这个副作用列表中携带的 更新内容就是要更新到屏幕中的信息





![image-20211002112616662](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002112616.png)



应用程序执行在 `commit` 阶段时，`React` 将这个过程又分为三个步，分别是 `before commit、commit 和 after commit`。

在这三个步分别调用 `commitBeforeMutationLifecycles` `commitMutationEffects`???? 和 `commitLayoutEffects` 三个函数来执行具体的工作。`commitRoot` 函数内部调用commitRootImpl函数实现 commit 阶段的具体逻辑



提交阶段的主要任务也就是把之前记录好的更新操作反映到真实的dom上，并且这个过程是不能中断的。

`commitRoot`

- 检查 `finishedWork` 是否也有 `effect` ，如有插入  `effect` 链表中
- 第一次遍历 `effect`链，更新`class`组件实例上的`state props`，执行`getSnapshotBeforeUpdate`生命周期
- 第二次遍历 `effect`链，不同的`effectTag`，执行不同的操作，比如重置文本节点，执行 插入、更新、删除等的  `effect` 操作，真正的对 `dom` 进行修改。
- 第三次遍历 `effect`链，这次遍历就是做一些收尾工作。执行`componentDidMount、componentDidUpdate`，更新的回调函数等。
- 做一些 还原变量 等的收尾工作。



![image-20211002112429071](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002112429.png)

#### 三次链表操作

```js
function commitRoot(root, finishedWork) {
  isWorking = true;
  isCommitting$1 = true;
  
  
  // 检查 finishedWork 是否也有 effect ，如有插入 effect 链表中
  var firstEffect = void 0;
  if (finishedWork.effectTag > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if
    // it had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    firstEffect = finishedWork.firstEffect;
  }

  prepareForCommit(root.containerInfo);

  // Invoke instances of getSnapshotBeforeUpdate before mutation.
  nextEffect = firstEffect;
  startCommitSnapshotEffectsTimer();
  // 第一次遍历
  while (nextEffect !== null) {

    invokeGuardedCallback(null, commitBeforeMutationLifecycles, null);

  }
  stopCommitSnapshotEffectsTimer();


  // Commit all the side-effects within a tree. We'll do this in two passes.
  // The first pass performs all the host insertions, updates, deletions and
  // ref unmounts.
  nextEffect = firstEffect;
  startCommitHostEffectsTimer();
  // 第二次遍历
  while (nextEffect !== null) {

    invokeGuardedCallback(null, commitAllHostEffects, null);
  }

  stopCommitHostEffectsTimer();

  resetAfterCommit(root.containerInfo);

  // The work-in-progress tree is now the current tree. This must come after
  // the first pass of the commit phase, so that the previous tree is still
  // current during componentWillUnmount, but before the second pass, so that
  // the finished work is current during componentDidMount/Update.
  root.current = finishedWork;

  // In the second pass we'll perform all life-cycles and ref callbacks.
  // Life-cycles happen as a separate pass so that all placements, updates,
  // and deletions in the entire tree have already been invoked.
  // This pass also triggers any renderer-specific initial effects.
  nextEffect = firstEffect;
  startCommitLifeCyclesTimer();
  // 第三次遍历
  while (nextEffect !== null) {
    
    invokeGuardedCallback(null, commitAllLifeCycles, null, root, committedExpirationTime);
    
  }


	// 下面做一些 还原变量 等的收尾工作
  isCommitting$1 = false;
  isWorking = false;
  stopCommitLifeCyclesTimer();
  stopCommitTimer();
  onCommitRoot(finishedWork.stateNode);
  if (true && ReactFiberInstrumentation_1.debugTool) {
    ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
  }

  var updateExpirationTimeAfterCommit = finishedWork.expirationTime;
  var childExpirationTimeAfterCommit = finishedWork.childExpirationTime;
  var earliestRemainingTimeAfterCommit = childExpirationTimeAfterCommit > updateExpirationTimeAfterCommit ? childExpirationTimeAfterCommit : updateExpirationTimeAfterCommit;
  if (earliestRemainingTimeAfterCommit === NoWork) {
    // If there's no remaining work, we can clear the set of already failed
    // error boundaries.
    legacyErrorBoundariesThatAlreadyFailed = null;
  }
  onCommit(root, earliestRemainingTimeAfterCommit);
	
  // ...
  }
}
```

#### `commitBeforeMutationLifecycles` 

- 遍历effect链，在这个循环中，组件的state已经更新，但是节点还没有更新。
- 通过 `getSnapshotBeforeUpdate` 获取`prevProps, prevState`状态快照，用于 `componentDidUpdate` 生命周期参数传递

```js
function commitBeforeMutationLifecycles() {
  while (nextEffect !== null) {

    var effectTag = nextEffect.effectTag;
    if (effectTag & Snapshot) {
      recordEffect();
      var current$$1 = nextEffect.alternate;
      // 调用 getSnapshotBeforeUpdate
      commitBeforeMutationLifeCycles(current$$1, nextEffect);
    }
		
    // Don't cleanup effects yet;
    // This will be done by commitAllLifeCycles()
    nextEffect = nextEffect.nextEffect;
  }
}
```

#### `commitAllHostEffects`

- 遍历 `effect` 链
- 会根据不同的 `effectTag`，执行不同的操作，比如重置文本节点，执行 插入、更新、删除等的 `effect` 操作，真正的对 dom 进行修改。
- 此阶段正式 commit 副作用，将副作用更新到屏幕。
- 应用首次渲染时副作用类型会匹配到 `PlacementAndUpdate`，具体处理逻辑在 `commitPlacement` 函数中，该函数主要负责插入 DOM 元素到屏幕



`HostComponent` 类型的 `Fiber` 结点在完成工作单元时会创建当前结点对应的 `DOM` 元素实例，并将其赋值到该结点的 `stateNode` 属性上。 `commitPlacement` 函数中的 `node.stateNode` 指向的就是当前结点对应的 DOM 元素实例。执行完 `appendChildToContainer(parent, stateNode) `后应用程序中的副作用就会渲染到屏幕上。


应用程序中的副作用就会渲染到屏幕上后 `React` 还需要做一些收尾工作，如将当前的 `workInProgress` 树赋值给 `current` 树，调用更新完成后的生命周期函数等。

`commitMutationEffects`函数执行完成后，需要更新的内容已经绘制到了屏幕上，此时的 `workInProgress` 树也就成了应用程序最新的状态树。因此 `React` 将 `fiberRoot.current` 指向最新的 `workInProgress` 树

```js
// 这里的finishedWork引用的是workInProgress树
root.current = finishedWork;
```



```jsx
function commitAllHostEffects() {
  while (nextEffect !== null) {

    var effectTag = nextEffect.effectTag;

    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    if (effectTag & Ref) {
      var current$$1 = nextEffect.alternate;
      if (current$$1 !== null) {
        commitDetachRef(current$$1);
      }
    }

    // The following switch statement is only concerned about placement,
    // updates, and deletions. To avoid needing to add a case for every
    // possible bitmap value, we remove the secondary effects from the
    // effect tag and switch on that value.
    var primaryEffectTag = effectTag & (Placement | Update | Deletion);
    switch (primaryEffectTag) {
      case Placement: {
          commitPlacement(nextEffect);
          // Clear the "placement" from effect tag so that we know that this is inserted, before
          // any life-cycles like componentDidMount gets called.
          // TODO: findDOMNode doesn't rely on this any more but isMounted
          // does and isMounted is deprecated anyway so we should be able
          // to kill this.
          // 删除effectTag
          nextEffect.effectTag &= ~Placement;
          break;
        }
      case PlacementAndUpdate: {
          // Placement
          commitPlacement(nextEffect);
          // Clear the "placement" from effect tag so that we know that this is inserted, before
          // any life-cycles like componentDidMount gets called.
          nextEffect.effectTag &= ~Placement;

          // Update
          var _current = nextEffect.alternate;
          commitWork(_current, nextEffect);
          break;
        }
      case Update: {
          var _current2 = nextEffect.alternate;
          commitWork(_current2, nextEffect);
          break;
        }
      case Deletion: {
          commitDeletion(nextEffect);
          break;
        }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

#### `commitAllLifeCycles`

函数在更新内容 `commit` 到屏幕之后执行，这次遍历主要负责 `commit` 阶段的一些收尾工作

应用程序的副作用更新到屏幕后，对于 `ClassComponent` 类型的结点，`React` 会调用该结点的生命周期函数，如 `componentDidMount` 和 `componentDidUpdate` 



- 首次渲染执行 `componentDidMount`
- 更新渲染执行 `componentDidUpdate`
- 执行 `setState` 的 `callback` 回调函数
- 清空 `commitUpdateQueue`

```js
function commitAllLifeCycles(finishedRoot, committedExpirationTime) {
  while (nextEffect !== null) {

    var effectTag = nextEffect.effectTag;

    if (effectTag & (Update | Callback)) {
      recordEffect();
      var current$$1 = nextEffect.alternate;
      commitLifeCycles(finishedRoot, current$$1, nextEffect, committedExpirationTime);
    }

    if (effectTag & Ref) {
      recordEffect();
      commitAttachRef(nextEffect);
    }

    if (effectTag & Passive) {
      rootWithPendingPassiveEffects = finishedRoot;
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```







```js
renderRoot -> 
  
performWorkOnRoot - completeRoot -  commitRoot


```





## 首次渲染

```js
React 应用程序首次渲染时，在 prerender 阶段主要做一些 render 前的准备工作，在 render 阶段做最重要的更新 计算，然后在 commit 阶段将上一阶段计算得到的更新内容映射到屏幕。



React 为什么要这样设计闭环呢?个人认为主要是方便找到 Fiber 树根结点的 stateNode 属性中的值。

Fiber 结点的stateNode属性存储的当前结点的最终产物，如果是 ClassComponent 类型的结点则该属性指向 的是当前 class 组件的实例，如果是 HostComponent 类型的结点则该属性指向的是当前结点的 DOM 实例， 如果是 HostRoot 类型的结点则该属性指向的是 fiberRoot 对象。
```

## 更新渲染

- 在更新渲染时 `React` 更加关心的是结点前后 `state props` 的变化

在更新渲染时 如何构建`wIP`树

- 首次渲染完成后 `fiberRoot` 对象上面的 `current` 属性会指向 `workInProgress` 树，而原有的 `workInProgress` 树将会被置为 `null` ，新的 `workInProgress` 树只有一个 `HostRoot` 类型的根结点。
- 即此时 `fiberRoot` 对象中的`current`属性指向的是上一次(首次)渲染结束后的 `workInProgress` 树



- 从 `current` 树上面获取 `workInProgress` 对象
- 有了 `workInProgress` 对象后，下一步就是通过工作循环完善该对象，这个过程依然是要进行解析工作单元以及完成工作单元

#### 解析工作单元

在应用程序更新渲染时，`React` 解析工作单元 `(Fiber结点)` 的主要关注点是 `ClassComponent`类型的`Fiber`结点

##### 处理结点的更新队列

- 应用程序执行到 `render` 阶段，在解析工作单元时 `React` 会处理该结点的更新队列，目的就是获取更新对象中最新的 `payload` 信息
- 在 `processUpdateQueue` 函数中会处理当前 `Fiber` 结点的更新队列并将最终的 `state` 赋值到当前 `Fiber` 结点的 `memoizedState` 属性中

##### 检查结点是否需要更新

- 处理完该结点的 `updateQueue` 后就可以得到最新的 `state` ，然后 `React` 需要对比前后 `state` 以决定当前结点是否需要更新
- 检查工作单元是否需要更新首先根据该结点是否有`shouldComponentUpdate`生命周期函数，有则调用该函数并取其执行结果 没有则进行结点的`props`和`state`前后对比
- `React`定义了`shallowEqual`方法来进行对象是否相等的比较

##### 协调`reconcile`与结点`diff`的过程

```js
// 执行「协调算法」，获取下一个Fiber结点
reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)
```

当检测到 `class` 组件对应的 `Fiber` 结点需要更新后，`React` 会通过 `instance.render()` 获取组件元素，将该组件元素传入到「协调算法」中，然后获得下一个 `Fiber` 结点。获得下一个 `Fiber` 结点的过程也是 `React` 进行(新的)元素与现有 `Fiber` 结点进行 `diff` 处理的过程。

##### 为结点标记 effectTag

> 标记插入 `Placement`

- 在「协调」获取下一个 `Fiber` 结点的过程中调用 `placeChild` 函数为下一个结点标记 `Placement`

> 标记更新 `Update`

- 在完成工作单元时，使用 `updateHostComponent` 函数完成 `HostComponent` 类型的工作单元(Fiber 结点
- 这时 `React` 使用 `prepareUpdate` 方法对比结点对应 `DOM` 实例的属性及内容是否发生变化，如果有变化则为该结点标记 `Update` 

> 标记插入并更新 `PlacementAndUpdate`

- 如果一个结点既被标记了`Placement`也被标记了`Update`，那么该结点的 `effectTag` 的二进制对应的就是 `PlacementAndUpdate` 

> 标记删除 `Deletion`

- 在「协调」数组元素时，如果新的数组元素比此处 `Fiber` 树的结点数量少时，那么丢下的那个结点将会被调用 `deleteChild` 函数标记为 `Deletion` 。还有一种情况就是程序中控制元素显示的条件值变为 `false` 也会导致当前结点被标记为 `Deletion` 。

#### 完成工作单元

> 计算现有 DOM 实例与新的结点之间的属性变化

- 应用程序更新渲染时，在完成工作单元阶段相对于首次渲染 `React` 需要重点计算现有的 DOM 实例与新的结点之间的属性变化，此处逻辑主要在 `diffProperties` 函数中执行
- `diffProperties`函数主要用于计算`(HostComponet类型的)`结点更新前后所有的 `style` 属性是否发生变化，并将所有发生变化的属性以及对应的值收集起来。这些属性变化的数据在 `commit` 结点被统一更新到 DOM。





应用程序更新渲染构建 `workInProgress` 树的整体流程与首次渲染时基本相同。不同的地方就是对于 `ClassComponent` 类型的结点，`React` 会先处理该结点的更新队列并获取最新的 `state`，然后判断该结点是否需要执行后续的更新逻辑。如果类型的结点需要执行更新，则通过执行「协调」逻辑获取下一个 `Fiber` 结点，这个过程中也会进行新元素与当前 `Fiber` 结点 `diff` 操作。结点 `diff `处理的过程中 `React` 会为结点标记对应的 `effectTag`，最常用的几种 `effectTag` 包括 `Placement Update PlacementAndUpdate Deletion`







```js
React 元素类型(type)主要包括宿主元素(div，span)和组件元素(UpdateCounter)，这两种类型元素转换 为 Fiber 结点后对应的类型分别是HostComponent和ClassComponent。当然，Fiber 结点还有更多的类型

HostRoot 根结点
HostText 文本元素
HostComponent 宿主元素



```






