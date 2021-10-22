# 调度器

:::note Ref

- [一篇文章搞懂React的任务调度机制](https://github.com/neroneroffy/react-source-code-debug/blob/master/docs/调度机制/Scheduler.md)

:::

Scheduler中两个重要的行为：**多个任务的管理**、**单个任务的执行控制**

**任务优先级** 、 **时间片**

基于任务优先级和时间片的概念，Scheduler围绕着它的核心目标 - 任务调度，衍生出了两大核心功能：任务队列管理 和 时间片下任务的中断和恢复。



任务队列管理

单个任务的中断以及恢复



`render`阶段采取的调度优先级是依据本次更新的优先级来决定的，以便高优先级任务的介入可以打断低优先级任务的工作

`commit`阶段的调度优先级采用的是最高优先级，以保证`commit`阶段同步执行不可被打断



`Scheduler`用来调度执行上面提到的React任务

何为调度？

依据任务优先级来决定哪个任务先被执行。调度的目标是保证高优先级任务最先被执行。

何为执行？

`Scheduler`执行任务具备一个特点：即根据时间片去终止任务，并判断任务是否完成，若未完成则继续调用任务函数。它只是去做任务的中断和恢复，而任务是否已经完成则要依赖React告诉它。`Scheduler`和React相互配合的模式可以让React的任务执行具备异步可中断的特点。



调度器在 `React` 应用程序运行中的主要工作就是负责更新任务的管理，如任务的时间分片，高优先级任务要先于低优先级任务执行等

![image-20211002112241751](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002112241.png)

## 关于更新与任务

- 「更新」作用于 `React Fiber` 结点，它是 `Fiber` 架构的一部分。
- 「任务」作用于任务调度器，是任务体系里面的一部分。

`React` 中的「任务」是由任务调度器 `scheduler `统一管理。任务调度器 `scheduler `是独立于 `react` 和 `react-dom` 的模块。`React` 会使用调度器 `scheduler `模块暴露出的一些方法安排任务执行。

> React 将「更新」内容映射到屏幕的过程就是执行更新任务的过程

任务调度器的基本结构

```js
// firstTask是任务队列(taskQueue)的入口
var firstTask = null;
// 第一个被延期执行的任务
var firstDelayedTask = null;
// debug时可以暂停调度器的工作
var isSchedulerPaused = false;
// 当前任务
var currentTask = null;
// 当前任务的优先级
var currentPriorityLevel = NormalPriority;
// 将任务加入到任务队列
function insertScheduledTask(newTask, expirationTime) { ... } // 从任务队列中取出任务
function flushTask(task, currentTime) { ... }
```



## 任务调度器内部的通信原理

### 与浏览器通信

- `window.requestAnimationFrame(callback)` 告诉浏览器——我们希望执行一个动画(帧)，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。

### 调度器内部通信

- `window.MessageChannel()`

一般情况下，`onmessage` 的回调函数的调用时机是在浏览器的一帧绘制完成之后

```js
var channel = new MessageChannel(); 
var port1 = channel.port1;
var port2 = channel.port2; 
port1.onmessage = (event) => console.log(event.data)
port2.postMessage('动画帧执行完成，浏览器有空隙了')
```

## 调度任务流程

![image-20211001102009187](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001102009.png)

- 任务调度器接收任务，并根据任务的特性分别将其加入到延期队列或者正常任务队列。如果当前没有正在执行的任务，则调用 `requestHostCallback` 函数准备执行任务。
- 在准备执行任务时，会检测浏览器动画帧是否正在执行。如果正处于动画帧之间的时间空隙中，则使用 `window.rAF` 请求执行 `callback`。如果浏览器时机成熟，则通过`MessageChannel`发送消息`port.postMessage(null)` 
-  `MessageChannel` 的另一个端口以`port1.onmessage`的方式监听消息，当收到消息后正式执行 `callback` (即执行任务)。
- 执行`callback`，实际上是调用`flushTask`函数从任务队列中取出优先级最高的任务执行。

### 执行一个更新任务的流程

![image-20211001102622629](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001102622.png)

- `Fiber` 结点的更新对象 `update` 中的过期时间`expirationTime`的计算是根据任务调度器返回的当前任务优先级来确定。确定好过期时间后就可以对该 `Fiber` 结点的更新任务进行调度



- 任务调度器调用 `getCurrentPriorityLevel`返回 `Fiber` 结点更新任务的优先级
- 当`Fiber`结点从任务调度器获取到最新的执行权就开始了更新渲染阶段 即`render commit` 阶段

```js
function unstable_getCurrentPriorityLevel() { 
  return currentPriorityLevel; 
  // 默认为 NormalPriority = 3 会在调度过程中动态修改
}
```

- 执行同步任务 -> 修改为 `ImmediatePriority`
- 处理交互事件队列时 -> 修改为 `UserBlockingPriority`

在处理交互事件队列时 `React` 会通过 `runWithPriority()` 将`currentPriorityLevel`的值修改为 `UserBlockingPriority` 

#### `unstable_runWithPriority`

```js
function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }
  var previousPriorityLevel = currentPriorityLevel; 
  // 修改任务调度器中当前任务的优先级 
  currentPriorityLevel = priorityLevel;
  try {
    // 执行回调(任务) 
    return eventHandler();
  } finally {
    // 还原任务队列中当前任务的优先级 
    currentPriorityLevel = previousPriorityLevel;
  }
}
函数会立即执行传入的回调函数(任务) eventHandler()
```



- 更新任务以 `callback` 的形式向任务调度器申请执行

- 执行一个带有更新处理逻辑的 `callback`  就是执行更新任务

`requestWork` 是 `React` 更新任务调度的入口函数，在该函数内部会检查当前的更新任务属于 同步 任务 (需要立即执行)还是 非同步任务





## 总结

- 首先每个任务都会有各自的优先级，通过当前时间加上优先级所对应的常量我们可以计算出 `expriationTime`，**高优先级的任务会打断低优先级任务**
- 在调度之前，判断当前任务**是否过期**，过期的话无须调度，直接调用 `port.postMessage(undefined)`，这样就能在渲染后马上执行过期任务了
- 如果任务没有过期，就通过 `requestAnimationFrame` 启动定时器，在重绘前调用回调方法
- 在回调方法中我们首先需要**计算每一帧的时间以及下一帧的时间**，然后执行 `port.postMessage(undefined)`
- `channel.port1.onmessage` 会在渲染后被调用，在这个过程中我们首先需要去判断**当前时间是否小于下一帧时间**。如果小于的话就代表我们尚有空余时间去执行任务；如果大于的话就代表当前帧已经没有空闲时间了，这时候我们需要去判断是否有任务过期，**过期的话不管三七二十一还是得去执行这个任务**。如果没有过期的话，那就只能把这个任务丢到下一帧看能不能执行了



#### `scheduleWork`

`scheduleWork` 主要的事情就是找到我们要处理的 `root`设置刚才获取到的执行优先级，然后调用 `requestWork`

- 调用 `scheduleWorkToRoot`找到更新对应的 `FiberRoot`节点。按照树的结构通过`fiber.return`一层层的返回，直到找到根节点。在向上找的过程中不断的更新每个节点对应的`fiber`对象的`childExpirationTime`。并且`alternate`同步更新。 PS：`childExpirationTime`子树中最高优先级的`expirationTime`
- 存在上一个任务，并且上一个执行没有执行完，执行权交给了浏览器，发现当前更新的优先级高于上一个任务，则调用`resetStack`重置`stack`
- 如果现在不处于`render`阶段，或者`nextRoot !== root`，则作为享受vip待遇的任务可以请求调度了：`requestWork`  PS: 如果正在处于`render`阶段，我们就不需要请求调度了，因为`render`阶段会处理掉这个`update`

```js
function scheduleWork(fiber, expirationTime) {
  // 获取fiberRoot结点
  var root = scheduleWorkToRoot(fiber, expirationTime);

	// 存在高优先级任务打断低优先级任务
  if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime > nextRenderExpirationTime) {
    // This is an interruption. (Used for performance tracking.)
    interruptedBy = fiber;
    resetStack();
  }
  markPendingPriorityLevel(root, expirationTime);
  if (
  // If we're in the render phase, we don't need to schedule this root
  // for an update, because we'll do it before we exit...
  !isWorking || isCommitting$1 ||
  // ...unless this is a different root than the one we're rendering.
  nextRoot !== root) {
    var rootExpirationTime = root.expirationTime;
    requestWork(root, rootExpirationTime);
  }
  
}
```

#### `requestWork`

- 调用`addRootToSchedule` 将 `Root`加入到 `Schedule()`
  - 如果此 `root`已经调度过（已经在`scheduledRoot`的单向链表中），则判断是否要更新`root.expirationTime`
  - 如果没有调度过则需要将它添加到维护的一条 `scheduledRoot` 单向链表中

- 判断是否是同步任务？
  - 同步调用 `performSyncWork` 
  - 异步调用`scheduleCallbackWithExpirationTime`



#### `scheduleCallbackWithExpirationTime`

- `requestIdleCallback` 的 `polyfill` 版本。可以让浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这样延迟敏感的事件产生影响

  

- 如果有一个`callback`已经在调度`callbackExpirationTime !== NoWork `的情况下

  - 如果 `expirationTime < callbackExpirationTime`，函数直接返回
  - 如果当前`callback`时间不够，就调用`unstable_cancelCallback`取消重新调用

- 计算出 `timeout` 然后调用 `unstable_scheduleCallback(performAsyncWork, {timeout})`

#### `unstable_scheduleCallback`

- 创建一个任务节点`newNode`，按照优先级插入`callback`链表
- 我们把任务按照过期时间排好顺序了，何时去执行任务呢？两种情况
  - 当添加第一个任务节点的时候开始启动任务执行 -> 意味着任务从无到有，应该立刻启动
  - 当新添加的任务取代之前的节点成为新的第一个节点的时候 -> 意味着来了新的优先级最高的任务，应该停止掉之前要执行的任务，重新从新的任务开始执行
- 上面两种情况就对应 `ensureHostCallbackIsScheduled`方法执行的两种情况

####  `ensureHostCallbackIsScheduled`

- 判断是否已经存在有`host callback`，如果已经存在则调用`cancelHostCallback()`，然后开始`requestHostCallback(flushWork, expirationTime)`，传入的`flushWork`就是冲刷任务的函数和队首的任务节点的过期时间。这里我们没有立马执行`flushWork`，而是交给了`requestHostCallback`。PS：可以暂时把`flushWork`简单的想成执行链表中的任务

浏览器是一帧一帧渲染的，每一帧渲染结束之后会有一些空闲时间可以执行别的任务，为了保证应用的流畅性，我们就利用这点空闲时间来执行我们的任务。`react`团队利用`requestAnimationFrame`和`MessageChannel` 实现了原生`api` `requestIdleCallback` 的`pollyfill`版本

#### `requestHostCallback`

- 这里有两个全局变量`scheduledHostCallback、timeoutTime`分别代表第一个任务的`callback`和过期时间
- 进入这个函数就会立马判断一下当前的任务是否过期，如果过期了，不管浏览器是否空闲都得立即执行
- 如果任务没有过期，等浏览器有空了再调用`requestAnimationFrameWithTimeout(animationTick)`来执行

#### `requestAnimationFrameWithTimeout`

- 这个函数其实可以理解为优化后的`requestAnimationFrame`



- 当我们调用`requestAnimationFrameWithTimeout`并传入一个`callback`的时候，会启动一个`requestAnimationFrame`和一个`setTimeout`，两者都会去执行`callback`。但由于`requestAnimationFrame`执行优先级相对较高，它内部会调用`clearTimeout`取消下面定时器的操作。所以在页面`active`情况下的表现跟`requestAnimationFrame`是一致的。
- `requestAnimationFrame`在页面切换到未激活的时候是不工作的，这时`requestAnimationFrameWithTimeout`就相当于启动了一个100ms的定时器，接管任务的执行工作。这个执行频率不高也不低，既能不影响cpu能耗，又能保证任务能有一定效率的执行。

#### `animationTick`

- 有任务再进行递归请求下一帧，没任务的话可以结束了，退出递归。
- 在每一帧的回调函数最后，都会调用`port.postMessage(undefined)`



- 在 `animationTick` 中监听动画帧执行完成，然后发送消息通知
- 在 `channel.port1.onmessage` 执行任务
- 动画帧执行完成后，浏览器会有短暂的时间空隙，这时会执行回调函数 `animationTick` ，在该回调函数内部通过 `MessageChannel` 的一个接口发送通道消息，在另一个接口处可通过 `onmessage` 事件监听到消息，然后执行下一个任务。

#### `MessageChannel`

- `onmessage`的回调函数的调用时机是在一帧的`paint`完成之后，`react scheduler`内部正是利用了这一点来在一帧渲染结束后的剩余时间来执行任务的

#### `flushWork`

- `flushWork`根据`didTimeout`参数来决定处理逻辑
  - 如果为`true` 就会把任务链表里的过期任务全都给执行一遍
  - 如果为`false` 则在当前帧到期之前尽可能多的去执行任务
- 最后，如果还有任务的话，再启动一轮新的任务执行调度，`ensureHostCallbackIsScheduled()`，来重置`callback`链表。重置所有的调度常量，老 `callback` 就不会被执行
- 这里的执行任务是调用`flushFirstCallback`，执行`callback`中优先级最高的任务

#### `flushFirstCallback`

- 这里就是链表操作，执行完`firstCallback`后把这个`callback`从链表中删除



- 这里调用的是当前任务节点`flushedNode.callback`，那我们这个`callback`是啥呢？时间开始倒流，回到`scheduleCallbackWithExpirationTime`函数`unstable_scheduleCallback(performAsyncWork, {timeout})`相信大家对这个还有印象，它其实就是我们进入`Scheduler.js`的入口函数。如果它传入`performAsyncWork`作为回调函数，也就是在此函数中调用的回调函数就是这个

#### `performAsyncWork`

#### `performWork`

- 如果是同步`deadline == null`,压根不考虑帧渲染是否有空余时间，同步任务也没有过期时间之说，遍历所有的root，并且把所有root中同步的任务全部执行掉。PS: 有可能存在多个root，即有可能多次调用了ReactDOM.render。
- 如果是异步`deadline !== null`,遍历所有的`root`，执行完所有`root`中的过期任务，因为过期任务是必须要执行的。如果这一帧还有空闲时间，尽可能的执行更多任务。

#### `performWorkOnRoot`
