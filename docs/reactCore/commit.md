# commit阶段

![image-20211002112429071](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002112429.png)

在 `completeWork`时，会自下而上收集`effectTag` 形成`effectList`，所以从`Render -> commit`  传递的是一条包含不同`fiber`节点的`effect`链表

`commit` 阶段的工作是将状态变化渲染在视图中，也就是将`effect`渲染在视图中

提交阶段的主要任务也就是把之前记录好的更新操作反映到真实的DOM上，并且这个过程是不能中断的。

主要分为三个阶段

- `before mutation` - 渲染视图前
- `mutation` - 渲染视图
- `layout` - 渲染视图后

## 何时进入`commit`阶段

工作循环执行结束，标志着应用程序渲染过程中 `render` 阶段工作的完成。此时 `fiberRoot` 对象上面的 `workInProgress` 树存储在 `root.current.alternate` 指向的内存单元。`React` 会将 `workInProgress` 树赋值到 `fiberRoot` 对象上的 `finishedWork` 属性中。然后，检查 `workInProgressRootExitStatus` 的状态，如果是正常结束，则应用程序渲染任务进入 `commit` 阶段。

## 如何将副作用更新到屏幕

在 `render` 阶段结束时 `fiberRoot` 对象上面将会得到一个副作用列表`Effect List`，这个副作用列表中携带的更新内容就是要更新到屏幕中的信息

![image-20211002112616662](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002112616.png)

应用程序执行在 `commit` 阶段时，`React` 将这个过程又分为三个步

- `before mutation` -  `commitBeforeMutationLifecycles` 
- `mutation` - `commitMutationEffects`
- `layout` -  `commitLayoutEffects` 

#### 三次链表操作

- 检查 `finishedWork` 是否也有 `effect` ，如有插入  `effect` 链表中
- 第一次遍历 `effect`链，更新`class`组件实例上的`state props`，执行`getSnapshotBeforeUpdate`生命周期
- 第二次遍历 `effect`链，不同的`effectTag`，执行不同的操作，比如重置文本节点，执行 插入、更新、删除等的  `effect` 操作，真正的对 `dom` 进行修改。
- 第三次遍历 `effect`链，这次遍历就是做一些收尾工作。执行`componentDidMount、componentDidUpdate`，更新的回调函数等。
- 做一些 还原变量 等的收尾工作。

整个`commit`阶段主要是针对`root`上收集的`effectList`进行处理。在真正的工作开始之前，有一个准备阶段，主要是变量的赋值，以及将`root`的`effect`加入到`effectList`中。 随后开始针对`effectList`分三个阶段进行工作：

- `before mutation`：读取组件变更前的状态
  - 针对类组件，调用`getSnapshotBeforeUpdate`，让我们可以在DOM变更前获取组件实例的信息
  - 针对函数组件，异步调度`useEffect`
- `mutation`：
  - 针对`HostComponent`，进行相应的DOM操作 (真正操作DOM节点)
  - 针对类组件，调用`componentWillUnmount`
  - 针对函数组件，执行`useLayoutEffect`的销毁函数
- `layout`：在DOM操作完成后，读取组件的状态
  - 针对类组件，调用生命周期`componentDidMount`和`componentDidUpdate`，调用`setState`的回调
  - 针对函数组件填充`useEffect` 的 `effect`执行数组， 并调度`useEffect`

`before mutation`和`layout`针对函数组件的`useEffect`调度是互斥的，只能发起一次调度

`workInProgress` 树切换到`current`树的时机是在`mutation`结束后，`layout`开始前。这样做的原因是在`mutation`阶段调用类组件的`componentWillUnmount`的时候， 还可以获取到卸载前的组件信息；在`layout`阶段调用`componentDidMount/Update`时，获取的组件信息更新后的。

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

- 遍历`effect`链，在这个循环中，组件的`state`已经更新，但是节点还没有更新。
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
- 此阶段正式 `commit` 副作用，将副作用更新到屏幕。
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
function commitRootImpl(root, renderPriorityLevel) {
    ...

    // finishedWork即为workInProgress树的根节点，
    // root.current指向它来完成树的切换
    root.current = finishedWork;

    ...
}
```



# 分割

`

## 首次渲染

```js
React 应用程序首次渲染时，在 prerender 阶段主要做一些 render 前的准备工作，在 render 阶段做最重要的更新计算，然后在 commit 阶段将上一阶段计算得到的更新内容映射到屏幕。



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









