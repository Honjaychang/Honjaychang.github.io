# 更新

基于 `React v16.8.4` 源码在浏览器进行调试

调试方法借鉴: [我是如何阅读源码的](https://juejin.cn/post/6903335881227108366)



## 总体流程概述

![image-20211001223841032](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001223841.png)

### 首次渲染

- 检查容器是否合法，构建 `fiberRoot` 对象，`fiberRoot` 对象是整个`Fiber` 架构的根节点对象

- 创建更新对象（更新内容为应用程序的根组件）并将更新加入到更新队列
- `React` 向任务调度器申请立即执行，任务调度器安排该任务立即执行 (获取到执行权则进入`render`阶段
- 进入`render` 阶段，此时主要工作为构建 `workInProgress` 树
- 构建过程中会做一些重要的工作，如为结点标记 `effectTag`、对结点进行`diff`处理，收集`Effect List` 调用生命周期函数等
- 收集好 `Effect List` 后会进入 `commit` 阶段，此阶段主要是将`Effect List`更新到屏幕，然后渲染结束



### 更新渲染

- 不再重复构建 `fiberRoot`对象，在更新阶段已经存在于系统内存之中

- 此时的更新内容一般为组件内部发生变化的 `state props`

- 在进入`render`阶段前要进行任务调度 只有申请到更新执行权或者任务到期才能进行后续渲染工作

- 此时构建 `wIP` 树会尽量复用上一次创建的 `Fiber` 结点 同时对需要更新的结点标记对应的`effectTag`

- 在`commit` 阶段 得到的`Effect List` 是被标记了 `effect tag` 的 `Fiber`结点集合（一个链表） 一般是 `wIP` 树的子集



![Pasted Graphic](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20210923170958.png)

## 创建更新

- `ReactDOM.render()` `this.setState()`  `this.forceUpdate()`
- `hydrate` 是服务端渲染相关 `useState()`

![image-20211001224800453](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001224800.png)

### `RecatDOM.render`

- 检验 `container` 是否有效
- 初始化 `fiberRoot` 对象
- 为应用程序的首次渲染创建更新对象 `update`

```jsx {5}
ReactDOM.render(element, document.getElementById('root'));

const ReactDOM = {
  render: function (element, container, callback) {
    // 会先检验container是否有效，无效则停止执行且抛出错误
    return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
  }
}
```

![render](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20210923153945.png)

`legacyRenderSubtreeIntoContainer`

- 调用`legacyCreateRootFromDOMContainer` 创建 `ReactRoot` 对象
- 调用 `root.render()` 进行更新

```jsx {8}
// 未分析forceHydrate、callback
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {

  // 是否存在根节点   初次渲染是不存在根节点的
  var root = container._reactRootContainer;
  if (!root) {
    // Initial mount
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);

    // Initial mount should not be batched.
    unbatchedUpdates(function () {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
      } else {
        root.render(children, callback);
      }
    });
  } else {
    // Update
    if (parentComponent != null) {
      root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
    } else {
      root.render(children, callback);
    }
  }
  // 还是返回了创建的FiberRoot对象？
  return getPublicRootInstance(root._internalRoot);
}
```

`legacyCreateRootFromDOMContainer` `ReactRoot`

```jsx
function legacyCreateRootFromDOMContainer(container, forceHydrate) {

  // Legacy roots are not async by default.
  var isConcurrent = false;
  return new ReactRoot(container, isConcurrent, shouldHydrate);
}

// ReactRoot构造函数
function ReactRoot(container, isConcurrent, hydrate) {
  // 创建一个FiberRoot 并赋值给 实例的 _internalRoot
  var root = createContainer(container, isConcurrent, hydrate);
  this._internalRoot = root;
}
```

`createContainer` `createFiberRoot`

- `createContainer -> createFiberRoot -> createHostRootFiber -> createFiber -> new FiberNode()` 

```jsx
function createContainer(containerInfo, isConcurrent, hydrate) {
  return createFiberRoot(containerInfo, isConcurrent, hydrate);
}

function createFiberRoot(containerInfo, isConcurrent, hydrate) {
  // Cyclic construction. This cheats the type system right now because stateNode is any.
  // 创建一个RootFiber
  var uninitializedFiber = createHostRootFiber(isConcurrent);
  // 互相引用 形成闭环

  // FiberRoot.current -> RootFIber 
  // 指向了 Fiber 树的第一个 Fiber 结点
  // RootFiber.stateNode -> FiberRoot
  var root = void 0;
  root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    // ......
  }
  
  uninitializedFiber.stateNode = root;

  return root: FiberRoot;
}


function createHostRootFiber(isConcurrent) {
  var mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext;
  if (enableProfilerTimer && isDevToolsPresent) {
    mode |= ProfileMode;
  }
  return createFiber(HostRoot, null, null, mode);
}

var createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
};
```

开始调用`root.render()`

```jsx
function unbatchedUpdates(fn, a) {
  if (isBatchingUpdates && !isUnbatchingUpdates) {
    isUnbatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isUnbatchingUpdates = false;
    }
  }
  return fn(a);
}


// 原型链上添加 实例root直接调用
ReactRoot.prototype.render = function (children, callback) {
  var root = this._internalRoot;
  var work = new ReactWork();
  callback = callback === undefined ? null : callback;

  if (callback !== null) {
    work.then(callback);
  }
  updateContainer(children, root, null, work._onCommit);
  return work;
};

// 在这里计算了 expirationTime
function updateContainer(element, container, parentComponent, callback) {
  // 这个current就是FiberRoot对应的RootFiber？？绕口
  var current$$1 = container.current;
  var currentTime = requestCurrentTime();
  var expirationTime = computeExpirationForFiber(currentTime, current$$1);
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
}
  
// 将current（即Fiber实例）提取出来，并作为参数传入调用scheduleRootUpdate
function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
  // TODO: If this is a nested container, this won't be the root.
  var current$$1 = container.current;
  
	// ...
  return scheduleRootUpdate(current$$1, element, expirationTime, callback);
}
```

`scheduleRootUpdate`

```js
// key
function scheduleRootUpdate(current$$1, element, expirationTime, callback) {

  var update = createUpdate(expirationTime);
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = { element: element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  flushPassiveEffects();
  enqueueUpdate(current$$1, update);
  scheduleWork(current$$1, expirationTime);

  return expirationTime;
}
```



### `setState`

- `setState` 和 `forceUpdate` 的代码几乎一模一样，唯一的区别是`Update.tag`
- `setState -> enqueueSetState -> enqueueUpdate`

当我们使用`setState(...)`时，`React` 会创建一个更新`update`对象，然后通过调用`enqueueUpdate`函数将其加入到更新队列`updateQueue`

```jsx {2}
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

- `enqueueSetState enqueueForceUpdate`

```jsx {2,8,20,26}
var classComponentUpdater = {
  enqueueSetState: function (inst, payload, callback) {
    // inst 当前实例  获取到当前实例上的fiber
    var fiber = get(inst);
    var currentTime = requestCurrentTime();
    // 计算当前fiber的到期时间（优先级）
    var expirationTime = computeExpirationForFiber(currentTime, fiber);
		// 创建更新一个更新update
    var update = createUpdate(expirationTime);
    // payload是setState传进来的要更新的对象
    update.payload = payload;
    // callback就是setState({},()=>{})的回调函数
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    flushPassiveEffects();
    // 把更新放到队列UpdateQueue
    enqueueUpdate(fiber, update);
    // 开始进入React异步渲染的核心：React Scheduler
    scheduleWork(fiber, expirationTime);
  },
  
  enqueueForceUpdate: function (inst, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTime();
    var expirationTime = computeExpirationForFiber(currentTime, fiber);

    var update = createUpdate(expirationTime);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    flushPassiveEffects();
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  }
}
```

总结三种更新流程

- 获取节点对应的 `fiber` 对象
- 计算 `currentTime`
- 根据 `fiber  currentTime`  计算出 `fiber` 对象的 `expirationTime` 
- 根据`expirationTime` 创建`update` 对象
- 将 `setState` 中要更新的对象赋值到 `update.payload`
- 如果有 `callback` 将其赋值到 `update.callback = callback`
- 将 `update` 对象加入到 `updateQueue`
- 进行任务调度



## 加入队列

我们可以发现不管是`ReactDOM.render() -> scheduleRootUpdate` 还是 `this.setState() -> enqueueSetState` 创建更新后的流程都是

- 调用 `createUpdate` 创建一个更新对象 `update`
- 调用 `enqueueUpdate` 将 `update` 对象加入到 `updateQueue`
- 调用 `scheduleWork` 进入异步渲染到核心：`React Scheduler`

![image-20211001224734809](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001224734.png)

### `enqueueUpdate`

- 保证 `current`树 和 `wIP`树的`updateQueue` 是一致的

```jsx
function enqueueUpdate(fiber, update) {
  // Update queues are created lazily.
  var alternate = fiber.alternate;
  var queue1 = void 0; // current的队列
  var queue2 = void 0; // alternate的队列
  if (alternate === null) {
    // There's only one fiber.
    queue1 = fiber.updateQueue;
    queue2 = null;
    // alternate & current 都为空 则初始化更新队列
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  } else {
    // There are two owners.
    queue1 = fiber.updateQueue;
    queue2 = alternate.updateQueue;
    if (queue1 === null) {
      if (queue2 === null) {
        // Neither fiber has an update queue. Create new ones.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
      } else {
        // Only one fiber has an update queue. Clone to create a new one.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
      }
    } else {
      if (queue2 === null) {
        // Only one fiber has an update queue. Clone to create a new one.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
      } else {
        // Both owners have an update queue.
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // There's only a single queue.
    appendUpdateToQueue(queue1, update);
  } else {
    // There are two queues. We need to append the update to both queues,
    // while accounting for the persistent structure of the list — we don't
    // want the same update to be added multiple times.
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update);
      appendUpdateToQueue(queue2, update);
    } else {
      // Both queues are non-empty. The last update is the same in both lists, because of structural sharing. So, only append to one of the lists.
      appendUpdateToQueue(queue1, update);
      // But we still need to update the `lastUpdate` pointer of queue2.
      queue2.lastUpdate = update;
    }
  }
}
```

- `queue1` 是应用程序运行过程中 `current` 树上当前 `Fiber` 结点最新队列 `fiber.updateQueue`
- `queue2` 是应用程序上一次更新时 `workInProgress` 树`Fiber` 结点的更新队列 `fiber.alternate.updateQueue`
- 如果两者均为 `null`，则调用 `createUpdateQueue()` 获取初始队列
- 如果两者之一为 `null`，则调用 `cloneUpdateQueue()` 从对方中获取队列
- 如果两者均不为 `null`，则将 `update` 作为 `queue2` 的 `lastUpdate`

![image-20211001131543806](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001131544.png)

整个更新队列对象通过 `firstUpdate` 属性和更新对象的 `next` 属性层层引用形成了链表结构。同时更新队列对象中也可以通过 `lastUpdate` 属性直接连接到最后一个更新对象

### `processUpdateQueue`

`React` 在 `render`阶段会处理更新队列，会调用`processUpdateQueue`函数

`processUpdateQueue`函数用于处理更新队列，在该函数内部使用循环的方式来遍历队列，通过 `update.next` 依次取出更新对象进行合并，合并更新对象的方式是:

- 如果 `setState` 传入的参数类型是 `function` ，则通过 `payload2.call(instance, prevState, nextProps)` 获取更新对象;
- 如果 `setState` 传入的参数类型是 `object`，则可直接获取更新对象
- 最后通过使用 `Object.assign()` 合并两个更新对象并返回，如果属性相同的情况下则取最后一次值

在处理更新队列时，`React` 会根据更新对象中携带的 `state` 相同属性进行合并，保留队列中最后一次属性值，以此作为前后结点 `diff` 的数据









## 任务调度







