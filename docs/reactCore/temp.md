



#### `renderRoot`

- `nextUnitOfWork = createWorkInProgress()` 拷贝一份 `fiber` 节点，在 `nextUnitOfWork` 中修改，防止改变当前 `fiberTree`。`nextUnitOfWork` 是下一个要更新的节点   函数主要是用来创建wIP树？
- 进入`workLoop` 循环解析工作单元 标记effectTag

```js
function renderRoot(root, isYieldy) {

  flushPassiveEffects();

  isWorking = true;
  var previousDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  var expirationTime = root.nextExpirationTimeToWorkOn;

  // Check if we're starting from a fresh stack, or if we're resuming from previously yielded work.
  if (expirationTime !== nextRenderExpirationTime || root !== nextRoot || nextUnitOfWork === null) {
    // Reset the stack and start working from the root.
    resetStack();
    nextRoot = root;
    nextRenderExpirationTime = expirationTime;
    // 创建workInProgress树
    nextUnitOfWork = createWorkInProgress(nextRoot.current, null, nextRenderExpirationTime);
    root.pendingCommitExpirationTime = NoWork;
    }
  }
  startWorkLoopTimer(nextUnitOfWork);
  do {
    try {
      // 循环更新节点
      workLoop(isYieldy);
    } catch (thrownValue) {}
    break;
  } while (true);
  // 省略一长串代码

  // Ready to commit.
  onComplete(root, rootWorkInProgress, expirationTime);
}


function workLoop(isYieldy) {
  if (!isYieldy) {
    // Flush work without yielding
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {
    // Flush asynchronous work until there's a higher priority event
    while (nextUnitOfWork !== null && !shouldYieldToRenderer()) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  }
}

function onComplete(root, finishedWork, expirationTime) {
  root.pendingCommitExpirationTime = expirationTime;
  root.finishedWork = finishedWork;
}
```





```jsx
// 与hooks有关
function flushPassiveEffects() {
  if (passiveEffectCallbackHandle !== null) {
    cancelPassiveEffects(passiveEffectCallbackHandle);
  }
  if (passiveEffectCallback !== null) {
    // We call the scheduled callback instead of commitPassiveEffects directly
    // to ensure tracing works correctly.
    passiveEffectCallback();
  }
}
  
// 首次渲染 初始化并完善wIP树
// 更新渲染 复用并完善
// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current, pendingProps, expirationTime) {
  var workInProgress = current.alternate;
  if (workInProgress === null) {
    // 双缓存树
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;


    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;

    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.effectTag = NoEffect;

    // The effect list is no longer valid.
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;

  }

  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.contextDependencies = current.contextDependencies;

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;


  return workInProgress;
}

// 循环单元更新，对整颗 fiberTree 都遍历一遍  
// 在React 17的时候 变成了 workLoopSync() || workLoopConcurrent()
// nextUnitOfWork -> workInProgress
// shouldYieldToRenderer -> shouldYield
function workLoop(isYieldy) {
  if (!isYieldy) {
    // Flush work without yielding
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {
    // Flush asynchronous work until there's a higher priority event 遇到高优先级可中断
    while (nextUnitOfWork !== null && !shouldYieldToRenderer()) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  }
}

var didYield = false;
function shouldYieldToRenderer() {
  if (didYield) {
    return true;
  }
  if (unstable_shouldYield()) {
    didYield = true;
    return true;
  }
  return false;
}
  
function performUnitOfWork(workInProgress) {
  // The current, flushed, state of this fiber is the alternate.
  // Ideally nothing should rely on this, but relying on it here
  // means that we don't need an additional field on the work in progress.
  var current$$1 = workInProgress.alternate;

  var next = void 0;

  next = beginWork(current$$1, workInProgress, nextRenderExpirationTime);
  workInProgress.memoizedProps = workInProgress.pendingProps;


  if (next === null) {
    // 如果next值为null，说明当前的Fiber结点已经是叶子结点，接下来要执行完成工作单元解析工作
    next = completeUnitOfWork(workInProgress);
  }

  ReactCurrentOwner$2.current = null;

  return next;
}
```



#### `beginWork`

```jsx
// renderExpirationTime -> renderLanes
function beginWork(current$$1, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current$$1 !== null) {
    var oldProps = current$$1.memoizedProps;
    var newProps = workInProgress.pendingProps;

    if (oldProps !== newProps || hasContextChanged()) 
      // 判断 props 和 context 是否改变
      // If props or context changed, mark the fiber as having performed work.
      // This may be unset if the props are determined to be equal later (memo).
      didReceiveUpdate = true;
    } else if (updateExpirationTime < renderExpirationTime) {
      // 判断当前 fiber 的优先级是否小于本次渲染的优先级，小于的话可以跳过
      didReceiveUpdate = false;
      // This fiber does not have any pending work. Bailout without entering
      // the begin phase. There's still some bookkeeping we that needs to be done
      // in this optimized path, mostly pushing stuff onto the stack.
      
      // 会判断这个 fiber 的子树是否需要更新，如果有需要更新会 clone 一份到 workInProgress.child 返回到 workLoop 的 nextUnitOfWork, 否则为 null
      return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    }
  } else {
    didReceiveUpdate = false;
  }

  // Before entering the begin phase, clear the expiration time.
  // 进行更新先把当前 fiber 的 expirationTime 设置为 NoWork
  workInProgress.expirationTime = NoWork;
	// 根据 fiber 的 tag 类型进行更新
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case FunctionComponent:
    case ClassComponent:
    case HostRoot:
    case HostComponent:
    case HostText:
    case SuspenseComponent:
    case HostPortal:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextProvider:
    case ContextConsumer:
    case MemoComponent:
    case SimpleMemoComponent:
    case DehydratedSuspenseComponent:
    default:
  }
}

- 调用 `renderWithHooks` 得到 `ReactElement` -> `nextChildren`
- 调用 `reconcileChildren`
	- `current`: 当前 `fiber` 节点
  - `workInProgress` 需要更新的节点
	- `nextChildren` 函数的返回值
	- 改变了 `workInProgress.child` 并返回

// 在beginWork中，通过workInProgress.tag判断当前是什么类型的节点而调用不同的更新函数。

```





## commit阶段

`completeWork`

```jsx
function completeUnitOfWork(workInProgress) {
  // Attempt to complete the current unit of work, then move to the
  // next sibling. If there are no more siblings, return to the
  // parent fiber.
  while (true) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current$$1 = workInProgress.alternate;
    {
      setCurrentFiber(workInProgress);
    }

    var returnFiber = workInProgress.return;
    var siblingFiber = workInProgress.sibling;

    if ((workInProgress.effectTag & Incomplete) === NoEffect) {
      if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        // Don't replay if it fails during completion phase.
        mayReplayFailedUnitOfWork = false;
      }
      // This fiber completed.
      // Remember we're completing this unit so we can find a boundary if it fails.
      nextUnitOfWork = workInProgress;
      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          startProfilerTimer(workInProgress);
        }
        nextUnitOfWork = completeWork(current$$1, workInProgress, nextRenderExpirationTime);
        if (workInProgress.mode & ProfileMode) {
          // Update render duration assuming we didn't error.
          stopProfilerTimerIfRunningAndRecordDelta(workInProgress, false);
        }
      } else {
        nextUnitOfWork = completeWork(current$$1, workInProgress, nextRenderExpirationTime);
      }
      if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        // We're out of completion phase so replaying is fine now.
        mayReplayFailedUnitOfWork = true;
      }
      stopWorkTimer(workInProgress);
      resetChildExpirationTime(workInProgress, nextRenderExpirationTime);
      {
        resetCurrentFiber();
      }

      if (nextUnitOfWork !== null) {
        // Completing this fiber spawned new work. Work on that next.
        return nextUnitOfWork;
      }

      if (returnFiber !== null &&
      // Do not append effects to parents if a sibling failed to complete
      (returnFiber.effectTag & Incomplete) === NoEffect) {
        // Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        // If this fiber had side-effects, we append it AFTER the children's
        // side-effects. We can perform certain side-effects earlier if
        // needed, by doing multiple passes over the effect list. We don't want
        // to schedule our own side-effect on our own list because if end up
        // reusing children we'll schedule this effect onto itself since we're
        // at the end.
        var effectTag = workInProgress.effectTag;
        // Skip both NoWork and PerformedWork tags when creating the effect list.
        // PerformedWork effect is read by React DevTools but shouldn't be committed.
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }

      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        // We've reached the root.
        return null;
      }
    } else {
      if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
        // Record the render duration for the fiber that errored.
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, false);

        // Include the time spent working on failed children before continuing.
        var actualDuration = workInProgress.actualDuration;
        var child = workInProgress.child;
        while (child !== null) {
          actualDuration += child.actualDuration;
          child = child.sibling;
        }
        workInProgress.actualDuration = actualDuration;
      }

      // This fiber did not complete because something threw. Pop values off
      // the stack without entering the complete phase. If this is a boundary,
      // capture values if possible.
      var next = unwindWork(workInProgress, nextRenderExpirationTime);
      // Because this fiber did not complete, don't reset its expiration time.
      if (workInProgress.effectTag & DidCapture) {
        // Restarting an error boundary
        stopFailedWorkTimer(workInProgress);
      } else {
        stopWorkTimer(workInProgress);
      }

      {
        resetCurrentFiber();
      }

      if (next !== null) {
        stopWorkTimer(workInProgress);
        if (true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
        }

        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        // Since we're restarting, remove anything that is not a host effect
        // from the effect tag.
        next.effectTag &= HostEffectMask;
        return next;
      }

      if (returnFiber !== null) {
        // Mark the parent fiber as incomplete and clear its effect list.
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= Incomplete;
      }

      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        return null;
      }
    }
  }

  // Without this explicit null return Flow complains of invalid return type
  // TODO Remove the above while(true) loop
  // eslint-disable-next-line no-unreachable
  return null;
}




function completeWork(current, workInProgress, renderExpirationTime) {
  var newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ClassComponent:
      {
        var Component = workInProgress.type;
        if (isContextProvider(Component)) {
          popContext(workInProgress);
        }
        break;
      }
    case HostRoot:
      {
        popHostContainer(workInProgress);
        popTopLevelContextObject(workInProgress);
        var fiberRoot = workInProgress.stateNode;
        if (fiberRoot.pendingContext) {
          fiberRoot.context = fiberRoot.pendingContext;
          fiberRoot.pendingContext = null;
        }
        if (current === null || current.child === null) {
          // If we hydrated, pop so that we can delete any remaining children
          // that weren't hydrated.
          popHydrationState(workInProgress);
          // This resets the hacky state to fix isMounted before committing.
          // TODO: Delete this when we delete isMounted and findDOMNode.
          workInProgress.effectTag &= ~Placement;
        }
        updateHostContainer(workInProgress);
        break;
      }
    case HostComponent:

    case HostText:
    case ForwardRef:
    case SuspenseComponent:
    case Fragment:
    case Mode:
    case Profiler:
    case HostPortal:
    case ContextProvider:
    case ContextConsumer:
    case MemoComponent:
    case IncompleteClassComponent:
    case DehydratedSuspenseComponent:
    default:

  return null;
}



```

`HostComponent`

- 页面渲染所必须的`HostComponent`（即原生`DOM组件`对应的`Fiber节点`

```jsx
case HostComponent: {
  popHostContext(workInProgress);
  var rootContainerInstance = getRootHostContainer();
  var type = workInProgress.type;
  
  // update
  if (current !== null && workInProgress.stateNode != null) {
    updateHostComponent$1(current, workInProgress, type, newProps, rootContainerInstance);

    if (current.ref !== workInProgress.ref) {
      markRef$1(workInProgress);
    }
  } else {
    if (!newProps) {
      !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      // This can happen when we abort work.
      break;
    }

    var currentHostContext = getHostContext();
    // TODO: Move createInstance to beginWork and keep it on a context
    // "stack" as the parent. Then append children as we go in beginWork
    // or completeWork depending on we want to add then top->down or
    // bottom->up. Top->down is faster in IE11.
    var wasHydrated = popHydrationState(workInProgress);
    if (wasHydrated) {
      // TODO: Move this and createInstance step into the beginPhase
      // to consolidate.
      if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, currentHostContext)) {
        // If changes to the hydrated node needs to be applied at the
        // commit-phase we mark this as such.
        markUpdate(workInProgress);
      }
    } else {
      // mount
      var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress);

      appendAllChildren(instance, workInProgress, false, false);

      // Certain renderers require commit-time effects for initial mount.
      // (eg DOM renderer supports auto-focus for certain elements).
      // Make sure such renderers get scheduled for later work.
      if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance, currentHostContext)) {
        markUpdate(workInProgress);
      }
      workInProgress.stateNode = instance;
    }

    if (workInProgress.ref !== null) {
      // If there is a ref on a host node we need to schedule a callback
      markRef$1(workInProgress);
    }
  }
  break;
}
```









- 

```js
function commitPassiveEffects(root, firstEffect) {
  rootWithPendingPassiveEffects = null;
  passiveEffectCallbackHandle = null;
  passiveEffectCallback = null;

  // Set this to true to prevent re-entrancy
  var previousIsRendering = isRendering;
  isRendering = true;

  var effect = firstEffect;
  do {
    {
      setCurrentFiber(effect);
    }

    if (effect.effectTag & Passive) {
      var didError = false;
      var error = void 0;
      {
        invokeGuardedCallback(null, commitPassiveHookEffects, null, effect);
        if (hasCaughtError()) {
          didError = true;
          error = clearCaughtError();
        }
      }
      if (didError) {
        captureCommitPhaseError(effect, error);
      }
    }
    effect = effect.nextEffect;
  } while (effect !== null);
  {
    resetCurrentFiber();
  }

  isRendering = previousIsRendering;

  // Check if work was scheduled by one of the effects
  var rootExpirationTime = root.expirationTime;
  if (rootExpirationTime !== NoWork) {
    requestWork(root, rootExpirationTime);
  }
  // Flush any sync work that was scheduled by effects
  if (!isBatchingUpdates && !isRendering) {
    performSyncWork();
  }
}
```





提交阶段相比于渲染阶段要简单很多，因为大部分更新的前期操作都在渲染阶段做好了。提交阶段的主要任务也就是把之前记录好的更新操作反映到真实的dom上，并且这个过程是不能中断的。

- `before mutation` 之前
- `before mutation`
- `mutation`
- `layout`
- `layout` 之后





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



`componentDidMount useEffect`执行时机

- `useEffect`会在`commit`阶段执行完以后异步的调用回调函数

- `componentDidMount` 在 `layout` 阶段同步的调用

- `useLayoutEffect` 在 `layout`阶段同步的调用



```js
React.createElement(MyComponent, null)

const fiberRoot = document.querySelector('#app')._reactRootContainer._internalRoot


const hostRootFiberNode = fiberRoot.current

fiberRoot.current.stateNode === fiberRoot; // true

```



Fiber是React16中的协调引擎，主要目的是使Virtual DOM可以进行增量式渲染：能够将渲染工作分割成块，并将其分散到过个帧中







Hooks的规则

- **不要在循环，条件判断，嵌套函数里面调用 Hooks**
- **只在 React 的函数里面调用 Hooks**



- [译 React hooks: 不是魔法，只是数组](https://zhuanlan.zhihu.com/p/48293710)













