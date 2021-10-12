# 数据结构定义



## React元素

![image-20211002133506599](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211002133506.png)

### `JSX`

`JSX` 是一个 `JavaScript` 的语法扩展，可以很好地描述 `UI` 应该呈现出它应有交互的本质形式

`JSX` 在编译时会被 `Babel` 转译为 `React.createElement()` 函数调用来生成 `React element`

```js
const element = (<h1 className="greeting">Hello, world!</h1>);

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

### `React.createElement`

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

const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    // 标记这是个 React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type, // 原生DOM p div 属于 HostComponent 指向了组件的构造函数
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  return element;
};
```



```jsx
但有一个特例：ReactDOM.createPortal的时候是REACT_PORTAL_TYPE，不过他不是通过createElement创建的，所以他应该也不属于ReactElement
```

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 `ReactDOM.render()`

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### `React element`

- React组件元素
- 宿主组件元素-HostComponent（div、span

> `type`

```js
转换为fiber对应的type
HostRoot 根结点
HostText 文本元素
HostComponent 宿主元素 div、span
ClassComponent 组件元素
```

### `react Component`

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



### 组件与元素关系

`React` 组件 是由 `UI部分` + `逻辑部分`组成			`UI部分` 就是`React`元素

元素 在 `render`阶段 被转换成 `React Fiber 对象`

`Fiber对象` 的层层嵌套形成了应用程序的`Fiber树` 		所有更新的处理都是在这颗树中计算

`React` 中组件和元素的根本区别: 元素普通对象，而组件是类和函数，元素是组件的一部分。



## 数据结构

### `FiberRoot`

- 调用`createFiberRoot` 函数返回 `FiberRoot` 对象

```js
FiberRoot.current = RootFiber
RootFiber.stateNode = FiberRoot
```

- `fiberRoot` 对象是整个`Fiber` 架构的根节点对象

```jsx
type BaseFiberRootProperties = {|
  // root节点，render方法接收的第二个参数
  containerInfo: any,
  // 只有在持久更新中会用到，也就是不支持增量更新的平台，react-dom不会用到
  pendingChildren: any,
  // 当前应用对应的Fiber对象，是Root Fiber
  current: Fiber,

  // 一下的优先级是用来区分
  // 1) 没有提交(committed)的任务
  // 2) 没有提交的挂起任务
  // 3) 没有提交的可能被挂起的任务
  // 我们选择不追踪每个单独的阻塞登记，为了兼顾性能
  // The earliest and latest priority levels that are suspended from committing.
  // 最老和新的在提交的时候被挂起的任务
  earliestSuspendedTime: ExpirationTime,
  latestSuspendedTime: ExpirationTime,
  // The earliest and latest priority levels that are not known to be suspended.
  // 最老和最新的不确定是否会挂起的优先级（所有任务进来一开始都是这个状态）
  earliestPendingTime: ExpirationTime,
  latestPendingTime: ExpirationTime,
  // The latest priority level that was pinged by a resolved promise and can
  // be retried.
  // 最新的通过一个promise被reslove并且可以重新尝试的优先级
  latestPingedTime: ExpirationTime,

  // 如果有错误被抛出并且没有更多的更新存在，我们尝试在处理错误前同步重新从头渲染
  // 在`renderRoot`出现无法处理的错误时会被设置为`true`
  didError: boolean,

  // 正在等待提交的任务的`expirationTime`
  pendingCommitExpirationTime: ExpirationTime,
  // 已经完成的任务的FiberRoot对象，如果你只有一个Root，那他永远只可能是这个Root对应的Fiber，或者是null
  // 在commit阶段只会处理这个值对应的任务
  finishedWork: Fiber | null,
  // 在任务被挂起的时候通过setTimeout设置的返回内容，用来下一次如果有新的任务挂起时清理还没触发的timeout
  timeoutHandle: TimeoutHandle | NoTimeout,
  // 顶层context对象，只有主动调用`renderSubtreeIntoContainer`时才会有用
  context: Object | null,
  pendingContext: Object | null,
  // 用来确定第一次渲染的时候是否需要融合
  +hydrate: boolean,
  // 当前root上剩余的过期时间
  // TODO: 提到renderer里面区处理
  nextExpirationTimeToWorkOn: ExpirationTime,
  // 当前更新对应的过期时间
  expirationTime: ExpirationTime,
  // List of top-level batches. This list indicates whether a commit should be
  // deferred. Also contains completion callbacks.
  // TODO: Lift this into the renderer
  // 顶层批次（批处理任务？）这个变量指明一个commit是否应该被推迟
  // 同时包括完成之后的回调
  // 貌似用在测试的时候？
  firstBatch: Batch | null,
  // root之间关联的链表结构
  nextScheduledRoot: FiberRoot | null,
|};
```





### `Fiber`

这里就是createHostRootFiber函数返回的fiber对象。注意这里其实每一个节点都对应一个fiber对象，不是Root专有的哦。

`FiberNode`

```jsx
function FiberNode(tag, pendingProps, key, mode) {
  // Instance 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber 作为架构 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.contextDependencies = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;

  this.alternate = null;
}
```

`tag`

```js
export const FunctionComponent = 0; // 函数组件元素对应的 Fiber 结点
export const ClassComponent = 1; // Class组件元素对应的 Fiber 结点
export const IndeterminateComponent = 2; // 在不确定是 Class 组件元素还是函数组件元素时的取值 
export const HostRoot = 3; // 对应 Fiber 树的根结点
export const HostPortal = 4; // 对应一颗子树，可以另一个渲染器的入口
export const HostComponent = 5; // 宿主组件元素(如div，button等)对应的 Fiber 结点
export const HostText = 6; // 文本元素(如div，button等)对应的 Fiber 结点
export const Fragment = 7;
```



```js
Fiber 对象中 stateNode 属性用于存储 Fiber 结点在更新完成后的状态，比如 HostComponent 类型的 Fiber 结点的stateNode 属性值是其 DOM 元素实例， ClassComponent 类型的 Fiber 结点的 stateNode 属性值是其组件实例。

HostComponent.stateNode --> #div, #span
ClassComponent.stateNode --> new Component(...)
```

### `update`

```jsx
export function createUpdate(expirationTime: ExpirationTime): Update<*> {
  return {
    // 过期时间
    expirationTime: expirationTime,

    // export const UpdateState = 0; // 更新
    // export const ForceUpdate = 2; // 强制更新
    tag: UpdateState,

    // 更新内容，比如`setState`接收的第一个参数
    // 第一次渲染ReactDOM.render接收的是payload = {element};
    payload: null,

    // 更新完成后对应的回调，`setState`，`render`都有
    callback: null,

    // 指向下一个更新
    next: null,

    // 指向下一个`side effect`，这块内容后续讲解
    nextEffect: null,
  };
}
```

### `queue`

![image-20211001131543806](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001131544.png)

UpdateQueue是一个单向链表结构，用来存放update。每个update用next连接。它的结构如下：

```jsx
//创建更新队列
export function createUpdateQueue<State>(baseState: State): UpdateQueue<State> {
  const queue: UpdateQueue<State> = {
    // 应用更新后的state
    // 每次的更新都是在这个baseState基础上进行更新
    baseState,
    // 队列中的第一个update
    firstUpdate: null,
    // 队列中的最后一个update
    lastUpdate: null,
    // 队列中第一个捕获类型的update
    firstCapturedUpdate: null,
    // 队列中最后一个捕获类型的update
    lastCapturedUpdate: null,
    // 第一个side effect
    firstEffect: null,
    // 最后一个side effect
    lastEffect: null,
    // 第一个和最后一个捕获产生的`side effect`
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  };
  return queue;
}
```

### `effectTag`

```js
// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;
```



```js
effectTag 属性的取值以及其位运算

effectTag 是构造函数 FiberNode 的一个属性，它用于标识当前 Fiber 结点的「更新」类型

 
NoEffect 一般作为 EffectTag 的初始值，或者用于 EffectTag 的比较判断，其值为 0 表示没有副作用，也就是不涉 及更新。

JS | & 按位或 按位与 

& 操作可以用来判断某个变量中是否含有某个属性
```

### `task`

```js
var task = {
  // 任务的回调函数，主要用于和其他框架的链接，比如React fiber 
  callback,
  // 任务优先级，数值越小优先级别越高
  priorityLevel,
   // 任务开始执行时间
  startTime,
  // 任务过期时间，具体取值见代码示例4-2-3 
  expirationTime,
  // 下一个任务
  next: null,
  // 上一个任务
  previous: null,
};
```

- 「任务」是一个抽象的概念，React 给「任务」定义了数据结构，使其具有过期时间、下一个任务和上一个任务等 属性，多个任务对象链接成一个双向循环链表。

### `taskQueue`

![image-20211001095608588](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001095608.png)

任务调度器中维护的任务队列在内存中的结构是一个双向循环链表，每个 `task` 对象可以通过 `previous` 和 `next`找到 其上一个任务和下一个任务。

```js

任务调度器(scheduler)为任务维护了一个队列，这个队列的结构是 双向循环链表，任务加入任务队列 (taskQueue)的过程也是将所有任务根据过期时间进行排序的过程

insertScheduledTask(newTask, expirationTime)


将任务插入到任务队列其实就是一个处理双向链表的过程，在这个过程中使用   走向下一个结点，当 找到正确的结点位置时使用 next 和 previous 指针将新结点和链表中已有的结点串联起来。任务加入到任务队列后， 任务队列(taskQueue)会形成一个双向循环链表
```



## 优先级

- 事件优先级：按照用户事件的交互紧急程度，划分的优先级
- 更新优先级：事件导致React产生的更新对象`update `的优先级`update.lane`
- 任务优先级：产生更新对象之后，React去执行一个更新任务，这个任务所持有的优先级
- 调度优先级：`Scheduler`依据React更新任务生成一个调度任务，这个调度任务所持有的优先级

### 事件优先级

- 离散事件 `DiscreteEvent`：`click、keydown、focusin`等，这些事件的触发不是连续的，优先级为0。
- 用户阻塞事件 `UserBlockingEvent`：`drag、scroll、mouseover`等，特点是连续触发，阻塞渲染，优先级为1。
- 连续事件 `ContinuousEvent`：`canplay、error、audio`标签的`timeupdate`和`canplay`，优先级最高，为2。

### 更新优先级

### `expirationTime`

- 在 `React` 中，为防止某个 `update` 因为优先级的原因一直被打断而未能执行，`React`  会设置一个 `expirationTime` ，当时间到了 `expirationTime` 的时候，如果某个 `update` 还未执行的话，`React`  将会强制执行该 `update` ，这就是 `expirationTime` 的作用。



#### `ExpirationTime` 取值

```js
// 定义了过期时间的最大值Math.pow(2, 30) - 1 
// 0b111111111111111111111111111111
var MAX_SIGNED_31_BIT_INT = 1073741823; 
// NoWork表示不需要更新
var NoWork = 0;
// Never表示更新的过期时间很小，可以无限被延期
var Never = 1;
// Sync表示拥有最大过期时间的更新需要立即执行，也就是同步执行 
var Sync = MAX_SIGNED_31_BIT_INT;
// Batched表示批量更新的过期时间
var Batched = Sync - 1;

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = Batched - 1;


// 优先级-立即执行
// 32位系统在V8中的最大整数大小 Math.pow(2, 30) - 1 = 0b111111111111111111111111111111 
var maxSigned31BitInt = 1073741823;
// 立即过期/饥饿的任务
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// 用户阻塞任务的过期时间250ms
var USER_BLOCKING_PRIORITY = 250;
// 正常任务的过期时间5000ms
var NORMAL_PRIORITY_TIMEOUT = 5000;
// 低优先级任务的过期时间10000ms
var LOW_PRIORITY_TIMEOUT = 10000;
// 最低优先级任务的过期时间maxSigned31BitInt(大约12天后过期)
var IDLE_PRIORITY = maxSigned31BitInt;
```

### 任务优先级

```js
// 立即执行(可由饥饿任务转换)，最高优先级 
var ImmediatePriority = 1;
// 用户阻塞级别(如外部事件)，次高优先级
var UserBlockingPriority = 2; 
// 普通优先级
var NormalPriority = 3;
// 低优先级
var LowPriority = 4;
// 最低优先级，空闲时去执行 
var IdlePriority = 5;
```

- `React` 在计算当前 `Fiber` 结点更新对象的过期时间时，会向其任务调度器查询该更新对象应该什么样的优先级。任务调度器会根据当前计算机资源`(如 CPU)`的使用情况返回合适的优先级
- 任务调度器会通过 `performance.now() + timeout` 来计算出任务的过期时间，随着时间的推移，当前时间会越来越接近这个过期时间，所以过期时间越小的代表优先级越高。如果过期时间已经比当前时间小了，说明这个任务已经过期了还没执行，需要立马去执行。
- `window.performance.now` 是浏览器内置的时钟，从页面加载开始计时，返回到当前的总时间，单位 ms



#### `computeExpirationForFiber`

`var expirationTime = computeExpirationForFiber(currentTime, fiber)`

- `computeExpirationForFiber` 函数的作用是为 `Fiber` 结点计算过期时间

调用关系如下图所示

- 先获取当前更新任务的优先级
- 根据优先级得出 `expirationTime`  在这过程中 会调用 `computeInteractiveExpiration | computeAsyncExpiration`
- 这两个方法最终都会调用 `computeExpirationBucket`

![image-20211001093656551](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211001093657.png)

```js
function computeExpirationForFiber(currentTime, fiber) {
  // 获取当前更新任务的优先级
  var priorityLevel = unstable_getCurrentPriorityLevel();

  var expirationTime = void 0;
  if ((fiber.mode & ConcurrentMode) === NoContext) {
    // Outside of concurrent mode, updates are always synchronous.
    expirationTime = Sync;
  } else if (isWorking && !isCommitting$1) {
    // During render phase, updates expire during as the current render.
    expirationTime = nextRenderExpirationTime;
  } else {
    switch (priorityLevel) {
      case unstable_ImmediatePriority:
        expirationTime = Sync;
        break;
      case unstable_UserBlockingPriority:
        // 交互引起的更新 
        expirationTime = computeInteractiveExpiration(currentTime);
        break;
      case unstable_NormalPriority:
        // This is a normal, concurrent update 普通异步更新
        expirationTime = computeAsyncExpiration(currentTime);
        break;
      case unstable_LowPriority:
      case unstable_IdlePriority:
        expirationTime = Never;
        break;
      default:
    }


  return expirationTime;
}
  
// 高优先级
export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,//150
    HIGH_PRIORITY_BATCH_SIZE,//100
  );
}

// 低优先级
export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;

export function computeAsyncExpiration(
  currentTime: ExpirationTime,
): ExpirationTime {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,//5000
    LOW_PRIORITY_BATCH_SIZE,//250
  );
}


const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = 2;

function ceiling(num: number, precision: number): number {
  // | 0 为取整操作
  return (((num / precision) | 0) + 1) * precision;
}

function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs,
): ExpirationTime {
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  );
}
```

- 低优先级更新的 `expirationTime` 间隔是25ms，抹平了25ms内计算过期时间的误差，`React`让两个相近 `update` （25ms内）的得到相同的 `expirationTime`，目的就是让这两个`update`自动合并成一个`update`，从而达到批量更新。
- 这里如果用高优先级更新去尝试多组数据，你会发现 `expirationTime` 间隔是10ms



## `current wIP`

### `Fiber` 树

首先得先了解`Fiber` 树

`Fiber` 树其实是一个对象，这个对象通过层层 `Fiber` 结点的嵌套形成了一个「树」形结构，在数据结构层面它是一个「链表」。`Fiber` 树的根结点是 `HostRoot` 类型的 `FiberNode` 实例。`Fiber` 结点中的 `return、 child 和 sibling` 三个属性分别用于指向父结点，第一个孩子结点和兄弟结点。

### `current` 树

`current` 树是 `fiberRoot` 对象上面 `current` 属性指向的内存空间，实际上就是一个对象，该对象由众多 `Fiber` 结点连接而成。 `current` 树描述的是应用程序渲染完成后最终的 `Fiber` 结构，它反映了用于渲染 UI 的状态。

### `wIP` 树

`workInProgress` 树是 `fiberRoot` 对象上面 `current` 属性指向的对象上面 `alternate` 属性指向的内存空间，也是一个对象，在渲染结束后该对象被赋值给 `current` 。也就是说 `workInProgress`  树是 `current` 树的中间形态。 

// key 一致性. 其他原则呢



### 两者关系

> `React` 的核心原则之一: 一致性。 `React` 总是一次性更新 `DOM` (不会显示部分中间结果)。因此，`wIP`  树就充当用户不可见的「草稿」，这样 `React` 可以先处理所有组件，然后将更新统一刷新到屏幕。

所有更新计算相关的工作都在 `workInProgress`  树的 `Fiber`  结点上执行。处理完更新并完成所有相关工作后，会得到一个带有更新标识的 `Fiber`  结点链表，也就是副作用链表，它是 `workInProgress`  树的子集。`React` 将副作用链表映射到屏幕上后，`workInProgress` 就会变成 `current` 树

这种**在内存中构建并直接替换**的技术叫做双缓存

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新

```js
// fiberRoot.current.alternate为workInProgress树

// 将workInProgress树的引入存入到finishedWork变量中 
var finishedWork = fiberRoot.current.alternate;
// 将fiberRoot.current.alternate指向的内存制为null
fiberRoot.current.alternate = null;
// 将workInProgress树赋值给current树
fiberRoot.current = finishedWork;
```

## `shallowEqual`

```js
function is(x, y) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);
}

function isObj(obj){
  return typeof obj !== 'object' || obj === null
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) { // is可以 理解成  objA === objB 那么返回相等
    return true;
  }
  if ( isObj(objA) || isObj(objB) ) {
    return false;
  } // 如果新老props有一个不为对象，或者不存在，那么直接返回false
  
  var keysA = Object.keys(objA); // 老props / 老state key组成的数组
  var keysB = Object.keys(objB); // 新props / 新state key组成的数组
  if (keysA.length !== keysB.length) { // 说明props增加或者减少，那么直接返回不相等
    return false;
  }
  // Test for A's keys different from B.
  // 遍历老的props ,发现新的props没有，或者新老props不同等,那么返回不更新组件。
  for (var i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }
  return true;
}
```

## `schedule`暴露出的属性方法

```js
export {
  // 任务优先级标识
  ImmediatePriority as unstable_ImmediatePriority,
  UserBlockingPriority as unstable_UserBlockingPriority, 
  NormalPriority as unstable_NormalPriority,
  IdlePriority as unstable_IdlePriority,
  LowPriority as unstable_LowPriority,
  // 常用的任务处理方法
  unstable_runWithPriority
  unstable_next,
  unstable_scheduleCallback,
  unstable_cancelCallback,
  unstable_wrapCallback, unstable_getCurrentPriorityLevel, 
  unstable_shouldYield,
  unstable_requestPaint,
  unstable_continueExecution, unstable_pauseExecution, 
  unstable_getFirstCallbackNode,
  getCurrentTime as unstable_now,
  forceFrameRate as unstable_forceFrameRate,
}
```

#### ··

```js
var deadlineObject = {
  timeRemaining, // 当前帧还有多少空闲时间
  didTimeout: false, // 任务是否过期
};
```

