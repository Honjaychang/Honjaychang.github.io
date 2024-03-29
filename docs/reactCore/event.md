# React事件机制

:::note Ref

- [一篇文章搞懂React的任务调度机制](https://github.com/neroneroffy/react-source-code-debug/blob/master/docs/调度机制/Scheduler.md)

:::

由于`fiber`机制的特点，生成一个`fiber`节点时，它对应的`dom`节点有可能还未挂载，`onClick`这样的事件处理函数作为`fiber`节点的`prop`，也就不能直接被绑定到真实的DOM节点上。

> React提供了一种“顶层注册，事件收集，统一触发”的事件机制

所谓“顶层注册”，其实是在root元素上绑定一个统一的事件处理函数。“事件收集”指的是事件触发时（实际上是root上的事件处理函数被执行），构造合成事件对象，按照冒泡或捕获的路径去组件中收集真正的事件处理函数。“统一触发”发生在收集过程之后，对所收集的事件逐一执行，并共享同一个合成事件对象。这里有一个重点是绑定到root上的事件监听并非我们写在组件中的事件处理函数，注意这个区别，下文会提到。

React 合成事件 `SyntheticEvent` 是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

`React` 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等

在`React17`之前，`React`是把事件委托在`document`上的，`React17`及以后版本不再把事件委托在`document`上，而是委托在挂载的容器上了。

以`v16.8.4`版本的`React`为例来探寻`React`的合成事件。当真实的`dom`触发事件时，此时构造`React`合成事件对象，按照冒泡或者捕获的路径去收集真正的事件处理函数，在此过程中会先处理原生事件，然后当冒泡到`document`对象后，再处理`React`事件。

- React 所有事件都挂载在 `document` 对象上；
- 当真实 DOM 元素触发事件，会冒泡到 `document` 对象后，再处理 React 事件；
- 所以会先执行原生事件，然后处理 React 事件；
- 最后真正执行 `document` 上挂载的事件。

### 同时绑定合成与原生事件

- 原生事件阻止冒泡 肯定会阻止合成事件的触发
- 合成事件阻止冒泡 不会影响原生事件的执行

因为合成事件的触发是基于浏览器的事件机制来实现的，通过冒泡机制冒泡到最顶层元素，然后再由 `dispatchEvent`统一去处理。

浏览器事件的执行需要经过三个阶段，捕获阶段-目标元素阶段-冒泡阶段。

- 节点上的原生事件的执行是在目标阶段，然而合成事件的执行是在冒泡阶段，所以原生事件会先合成事件执行，然后再往父节点冒泡。
- 在原生事件中，可以通过返回 `false` 方式来阻止默认行为，但是在 React 中，需要显式使用 `preventDefault()` 方法来阻止

### 合成表现

#### 对原生事件的封装

- `e` 其实不是原生事件对象而是`react`包装过的对象
- 可以通过 `e.nativeEvent` 来访问原生事件对象

```js
handleClick = (e) => console.log(e)
```

#### 对某些原生事件的升级和改造

- 如：`react`在注册了`onchange`事件时，还注册了很多其他事件

#### 不同浏览器事件兼容的处理

```js
addEventListener
addchEvent
```

### 合成事件优点

#### 更好的兼容性 跨平台

`React` 采用的是顶层事件代理机制，能够保证冒泡一致性，可以跨浏览器执行。`React `提供的合成事件用来抹平不同浏览器事件对象之间的差异，将不同平台事件模拟合成事件。

#### 避免垃圾回收

事件对象可能会被频繁创建和回收，因此 React 引入**事件池**，在事件池中获取或释放事件对象。**即 React 事件对象不会被释放掉，而是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)**

#### 方便事件统一管理和事务机制

:::note Ref

- [探索 React 合成事件](https://juejin.cn/post/6897911576053940231)
- [「react进阶」一文吃透react事件系统原理](https://juejin.cn/post/6955636911214067720#comment)

:::

它并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

在 React 中使用 DOM 原生事件时，一定要在组件卸载时手动移除，否则很可能出现内存泄漏的问题。而使用合成事件系统时则不需要，因为 React 内部已经帮你妥善地处理了。

图片引自：[Event flow](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2FTR%2FDOM-Level-3-Events%2F%23event-flow)

![Graphical representation of an event dispatched in a DOM tree using the DOM event flow](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211011110137.svg)

## 