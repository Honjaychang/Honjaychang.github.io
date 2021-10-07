### Vue

渐进式框架

视图层渲染 => 组件机制 => 路由机制 => 状态管理 => 构建工具

## MVVM MVC

- `MVC => MVC Model View Controller`

  - `controller`负责将`Model`的数据用`View`显示出来
  - 在`Controller`里面把`Model`的数据赋值给`View`

- `MVVM => MVMM Model View ViewModel`
  - `ViewModel`负责把`Model`的数据同步到`View`显示出来，还负责把`View`的界面修改同步回`Model`更新数据

区别：

- `MVVM`实现了`view`与`model`的自动同步，也就是`model`属性改变的时候，我们不需要再自己手动操作`dom`元素去改变`view`的显示，而是改变属性后该属性对应的`view`层会自动改变。

:::note Ref

- [MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

:::

## Vue 生命周期

[图源](https://programmer.help/blogs/vue-personal-project-summary-knowledge-points-summary.html)

![Vue生命周期](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/vue.jpg)

Vue 生命周期：Vue 实例从创建到销毁的过程。也就是从开始创建、初始化数据、编译模板、挂载 DOM-渲染、更新-渲染、卸载等一系列的过程。

- `beforeCreate`：
  - 初始化 Vue 实例的所有生命周期函数
  - 此时`data computed watch methods`上的方法和数据均不能访问
- `created`：
  - 初始化当前 Vue 实例的`data`以及`methods` 但是 DOM 还没有初始化 可以通过`vm.$nextTick`来访问 DOM
  - 可以发起一些异步请求，但请求不宜过多，避免白屏时间太长
- `beforeMount`：
  - 判断`el`是否挂载 判断是否有`template`
  - 模板编译如果没有`template`则把`el`区域当做模板 存放在内存中 浏览器还是一片空白
- `mounted`：
  - 正在把页面中模板替换为内存中真实数据 模版挂载过程
  - 这个时候可以操作 DOM 了使用`$refs`属性对 Dom 进行操作
- `beforeUpdate`：
  - 页面显示的数据是旧的，此时 data 里面的数据是新的
- `updated`：
  - 数据更新后，完成虚拟 DOM 的重新渲染和打补丁
- `beforeDestory`：
  - 在实例销毁之前，此时实例仍然可以使用
- `destoryed`：
  - 实例销毁后

## 响应式原理

~~别搁这双向绑定 双向绑定面试回答都口糊了~~

- vue 的数据双向绑定：采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调
-

```html
<div id="app">
  <input type="text" id="txt" />
  <p id="show"></p>
</div>

<script type="text/javascript">
  var obj = {};
  let text;
  Object.defineProperty(obj, 'txt', {
    get: function () {
      return text;
    },
    set: function (newValue) {
      text = newValue;
      document.getElementById('show').innerHTML = newValue;
    },
  });
  document.addEventListener('keyup', function (e) {
    obj.txt = e.target.value;
    console.log(obj.txt, e.target.value);
  });
</script>
```

- `Object.defineProperty()`
- `proxy`

```js
// Object.defineProperty()
// Object -> defineProperty() 定义属性
// Object.defineProperties(obj, {
//   a: {},
//   b: {},
// });

// Proxy ES6 构造函数

// function Proxy() {}
// var proxy = new Proxy();

// defineProperty 数据劫持 -> 给对象进行拓展 -> 属性进行设置

// var obj = {};
// defineProperty(obj, "属性名"){}

var target = {
  a: 1,
  b: 2,
};

// target 目标对象 你要进行处理的对象
// handler 容器 无数可以处理对象属性的方法
// let obj = new Proxy(target, handler);
let proxy = new Proxy(target, {
  get(target, prop) {
    return 'property val: ' + target[prop];
  },
  set(target, prop, value) {
    target[prop] = value; // 只有设置了value才能更改 输出
    return target[prop];
  },
});

console.log(proxy.a); // property val: 1
console.log(target.a); // 1
proxy.a = 3;
console.log(proxy.a); // 3
// 同理 proxy 对数组 以及 构造函数都有效 而 Object.property()只对 对象生效
```

- 对数据进行劫持监听，需要设置一个监听器`Observer`，用来监听所有属性。如果属性发生变化了，就需要告诉订阅者`Watcher`看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器`Dep`来专门收集这些订阅者，然后在监听器`Observer`和订阅者`Watcher`之间进行统一管理的。接着，我们还需要有一个指令解析器`Compile`，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者`Watcher`，并替换模板数据或者绑定相应的函数，此时当订阅者`Watcher`接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。
- 监听器`Observer` 用来劫持并监听所有属性，如果有变动的，就通知订阅者。
- 订阅者`Watcher` 可以收到属性的变化通知并执行相应的函数，从而更新视图。
- 解析器`Compile` 对每个元素节点的指令进行扫描和解析，根据指令模板 替换数据，以及绑定相应的更新函数

> 深入浅出 `Vue.js`

变化侦测就是侦测数据的变化。当数据发生变化时,要能侦测到并发出通知。

`Observer`：

它的作用是把一个 `object` 中的所有数据（包括子数据）都转换成响应式的，也就是它会侦测 `object` 中所有数据的变化。

- `object` 可以通过 `object.defineProperty` 将属性转换成 `getter setter`的形式来追踪变化。读取数据时会触发 `getter` ，修改数据时会触发 `setter`。
- 触发`get`方法，去收集有哪些依赖使用了数据。通过`Dep`来收集依赖，也就是收集`Watcher`。
- 当 `setter` 被触发时,去通知 `getter` 中收集的依赖数据发生了变化。

`Dep`

- 创建`Dep`，用来存储依赖 实现收集依赖、删除依赖和向依赖发送消息等

`Watcher`：依赖

- 只有 `Watcher` 触发的 `getter` 才会收集依赖,哪个 `Watcher` 触发了`getter`，就把哪个 `watcher` 收集到 `Dep` 中。当数据发生变化时，会循环依赖列表，把所有的 `Watcher` 都通知一遍。

`Watcher` 原理：是先把自己设置到全局唯一的指定位置（例如`window.target`），然后读取数据。因为读取了数据，所以会触发这个数据的 `getter` 。接着，在 `getter` 中就会从全局唯一的那个位置读取当前正在读取数据的 `Watcher` ，并把这个 `Watcher` 收集到 `Dep` 中去。通过这样的方式，`Watcher` 可以主动去订阅任意一个数据的变化。

![observer](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/observer.png)

- `Data` 通过 `Observer` 转换成了 `getter/setter` 的形式来追踪变化。
- 当外界通过 `Watcher` 读取数据时，会触发 `getter` 从而将 `Watcher` 添加到依赖中。
- 当数据发生了变化时，会触发 `setter`，从而向 `Dep` 中的依赖`(Watcher)` 发送通知。
- `Watcher` 接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。

:::note Ref

- [vue 的双向绑定原理及实现](https://juejin.cn/post/6844903479044112391)
- [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
- [Vue 双向数据绑定原理解析及代码实现](https://blog.csdn.net/wuxy720/article/details/80151610)
- [剖析 Vue 原理&实现双向绑定 MVVM](https://segmentfault.com/a/1190000006599500)
- [Vue 响应式原理-理解 Observer、Dep、Watcher](https://juejin.cn/post/6844903858850758670)
- [Vue 源码解读（3）—— 响应式原理](https://juejin.cn/post/6950826293923414047)

:::

## 虚拟 DOM

- `Angular` 脏数据检测
- `React` 虚拟`DOM`
- `Vue` 细粒度的绑定
  - 中等粒度 => 组件级别的`watcher` + 虚拟`DOM`

Vue 中的虚拟 DOM

1. 使用模版来描述状态与 DOM 之间的映射关系。
2. 通过编译将模版转换成渲染函数`render`
3. 执行渲染函数可以得到一个虚拟节点树
4. 使用虚拟节点树可以渲染页面

> 模版 (编译)=> 渲染函数 (执行)=> `vnode` `(patch)`=> 视图

- 提供与真实 `DOM` 节点所对应的虚拟节点 `vnode`
- 将虚拟节点 `vnode` 和旧虚拟节点 `oldVnode` 进行对比，然后更新视图

AST 抽象语法树

- 通过` JS` 的 `Object` 对象模拟 `DOM` 中的节点，然后再通过特定的 `render` 方法将其渲染成真实的 `DOM` 节点
- `virtual dom` 是通过 `JS` 层面的计算，返回一个 `patch` 对象，即补丁对象，在通过特定的操作解析 `patch` 对象，完成页面的重新渲染。避免了直接去操作`DOM`渲染页面的过程

## DOM Diff

- 是否为同一节点
  - 否：删除该节点重新创建节点进行替换
  - 是：递归地进行同级`vnode`的`diff`
- 只对同层的子节点进行比较，不进行跨级节点比较

- `Tree diff` 两颗树只会对同一层级的节点进行比较，不同层级的就算说相同节点的移动也会销毁重新创建
- `component diff` 如果不是同一类型下的组件，则将该组件判断为 `dirty component`，从而替换整个组件下的所有子节点
- `element diff` 处于同一层级的节点，拥有以下三种操作插入、移动、删除，同时如果某些节点只是在同级发生移位。允许开发者对同一层级的同组子节点，添加唯一`key`进行区分，提高性能优化。

#### `patch`

- 创建新增的节点
- 删除已经废弃的节点
- 修改需要更新的节点

#### 模版编译

- 将模版解析为 `AST` 解析器
- 遍历 `AST` 标记静态节点 优化器
- 使用 `AST` 生成渲染函数 代码生成器

#### Vue 的 Key 的作用

- key 主要用在虚拟 Dom 算法中，每个虚拟节点 VNode 有一个唯一标识 Key，通过对比新旧节点的 key 来判断节点是否改变，用 key 就可以大大提高渲染效率，这个 key 类似于缓存中的 etag。

- key 的作用主要是为了高效的更新虚拟 DOM
- vue 中在使用相同标签名元素的过渡切换时，也会使用到 key 属性，其目的也是为了让 vue 可以区分它们

##### Vue-router

vue 是渐进式前端开发框架，为了实现 SPA ，需要引入前端路由系统`(vue-router)`。前端路由的核心是：改变视图的同时不会向后端发出请求。

- `hash`模式
  - `hash` 虽然出现在 `URL` 中，但不会被包含在 `http` 请求中，对后端完全没有影响，因此改变 `hash` 不会重新加载页面。
  - 利用`onhashchange`事件实现前端路由，可以在 `window` 对象上监听这个事件
- `history`模式
  - 利用了 `html5 history interface` 中新增的 `pushState()` 和 `replaceState() `方法。这两个方法应用于浏览器记录栈，在当前已有的 `back、forward、go` 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。
  - `history api (pushState、replaceState、go、back、forward)` 则给了前端完全的自由，通过在`window`对象上监听`popState()`事件
  - `history` 在刷新页面时，如果服务器中没有相应的响应或资源，就会出现 404。

##### `Vue.use(plugin)`

- 传入一个对象，对象包含`install`方法
  - `plugin.install.apply(plugin, args)`
- 传入的`plugin`是一个函数
  - `plugin.apply(null, args)`

##### `v-for` 和`v-if`为什么不能联用？

- `v-for` 会比 `v-if`优先执行( 可以自己编写代码测试 也可以从源码中发现)，容易造成性能浪费
- 但可以嵌套使用。外层`v-if` 判断 内部`v-for`来避免性能浪费

##### 路由懒加载

- 提高页面首次渲染时间
- 普通加载 会在首次加载所有资源
- 懒加载会在用户点击跳转的时候再去加载

```js
component:About

component: ()
  => import (/* webpackChunkName: 'about' */ '../views/About.vue')
```

vue 的 SPA 单页面应用程序的性能优化可以来一个整合，讲解路由懒加载组件懒加载图片懒加载，首屏优化预加载，组件缓存和数据缓存这些整合在一起。

##### Vue2 中数组变化的限制&解决方法

下面两个现象在 Vue2 中检测不到变化，但在 Vue3 得以解决

```js
data(){
	return {
		colors : ['red', 'blue', 'pink']
	}
}
```

- 根据索引修改数组的值

```js
vm.colors[0] = 'yellow'; // 不会生效

vm.$set(vm.colors, 0, 'yellow');
vm.colors.splice(0, 1, 'yellow'); // vue 会劫持splice方法 从而进行更新
```

- 修改数组的长度

```js
vm.colors.length--;

vm.$delete(vm.colors, 1);
vm.colors.splice(2);
```

##### 命名路由

```js
<router-link :to="{ name: 'Home' }">Home</router-link>
<router-link :to="{ name: 'About'}">About</router-link>
```

##### 导航守卫

- 全局守卫

```js
// 全局前置守卫 每次跳转都会执行
router.beforeEach((to, from, next) => {
  next(false);
});
// 全局解析守卫 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve();
// 全局后置守卫
router.afterEach((to, from) => {});
```

- 路由独享守卫

```js
// 该守卫只在其他路由跳转至配置有beforeEnter路由表信息时才生效
beforEnter: (to, from, next) => {
  next();
};
```

- 组件内守卫

```js
// 进入该路由时执行
beforeRouteEnter(to, from, next) {
  next(false)
},

// 该路由中参数改变时执行
beforeRouteUpdate(to, from, next) {
  // ...
},

// 离开该路由时执行
beforeRouteLeave(to, from, next) {
  // ...
},
```

页面跳转：`beforeRouteLeave -> beforeEach -> beforeEnter -> beforeRouteEnter -> beforeResolve -> afterEach`

##### Vue 组件中 data 为什么必须是一个函数

- 保证每个组件的数据都是独立的。因为组件可能被用来创建多个实例，如果 data 只是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。（对象是引用类型嘛，指向同一块内存地址，组件操作共享同一个值不就乱套了嘛，所以我们就可以通过`return data`保证每个组件的数据不会被共享

##### 组件通信

- 父子组件通信
  - 父组件 -> 子组件：`prop`
  - 子组件 -> 父组件：`$on/$emit`
  - 获取组件实例：使用`$parent/$children`，`$refs.xxx`，获取到实例后直接获取属性数据或调用组件方法
- 兄弟组件通信

  - Event Bus：每一个 Vue 实例都是一个 Event Bus，都支持`$on/$emit`，可以为兄弟组件的实例之间 new 一个 Vue 实例，作为 Event Bus 进行通信
  - Vuex：将状态和方法提取到 Vuex，完成共享

- 跨级组件通信
  - 使用`provide/inject`
  - Event Bus：同兄弟组件 Event Bus 通信
  - Vuex：将状态和方法提取到 Vuex，完成共享

##### Vue 事件绑定原理

`Vue`中通过`v-on`或其语法糖`@`指令来给元素绑定事件并且提供了事件修饰符，基本流程是进行模板编译生成`AST`，生成`render`函数后并执行得到`VNode`，`VNode`生成真实`DOM`节点或者组件时候使用`addEventListener`方法进行事件绑定。

`$event`

##### `watch computed` 区别

- `watch` 一个数据影响多个数据 (我自己变化影响别人) 不支持缓存 支持异步
- `computed` 一个数据受多个数据的影响 (别人变化影响我自己) 支持缓存 不支持异步
- 当依赖的值变化时
  - `watch` 可以做一些复杂的操作
  - `computed` 不会立即重新计算生成新的值，而是先标记为脏数据，当下次被获取时候，才会进行重新计算并返回

##### `Vue.nextTick()`

- 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
//改变数据
vm.message = 'changed';

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent); // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function () {
  console.log(vm.$el.textContent); //可以得到'changed'
});
```

-

#### 基础

- `message:'<p>a</p>'`

##### `Mustache {{}}`

- `<p>{{message}}</p> // <p>a</p>`

##### `v-band => : `

- 动态绑定(可以绑定所有的原生属性)

```vue
<p :class="{ active: isActive, 类名2: boolean }">{{message}}</p>
这么长一串也可以用计算属性或者函数来传递
<p :class="getClass()">{{message}}</p>
函数括号不能少 getClass(){return {active:this.isActive,line:this.isLine}}
```

##### `v-on => @ `

- `@click.stop="xxx" 调用了event.stopPropagation()`
- `@click.prevent="xxx"> 调用了event.preventDefault()`
- `@keyup.enter="keyUp"`

##### `v-show v-if`

- `v-show` 默认为`false` 会用`display:none`动态隐藏和显示
- `v-if` 会删除 不存在 dom 中 动态删除和创建

##### `v-for`

- 遍历数组 `(value, index)`

- 遍历对象 `(value, key, index)`

- 响应式的方法: `push()、pop() shift() unshift() splice() sort() reverse()`

  - 通过索引值来修改数组中的元素 不会响应式的渲染

  ```js
  this.letters[0] = 'bbb'; // 不行
  
  this.letters.splice(0, 1, 'bbb');
  Vue.set(this.letters, 0, 'bbb'); //要修改的对象 索引值 修改后的值
  ```

##### `v-model`

- 数据双向绑定

```javascript
p45v-model原理  v-model和表单的联用

<input type= 'text' v-model="message">
<input type= 'text' :value="message" @input="message = $event.target.value">
checkbox	单选框对应的是boolean	复选框对应的是arr

修饰符
<input type= 'text' v-model.lazy="message">	数据失去焦点或者回车时才会更新数据
<input type= 'number' v-model.number="message">	使得文本输入框的输入类型由字符串转化为num
<input type= 'text' v-model.trim="message">	去除首尾空格
```

##### `v-once`

- 绑定的数据将无法被改变
- `<p v-once>{{message}}</p>`

##### `v-html`

- 将 html 代码解析
- `<p v-html="message"></p> // a`

##### `v-text`

- 不推荐
- `<p v-text="message"></p> // <p>a</p>`

##### `v-pre`

- 不做解析
- `<p v-pre>{{message}}</p>`

##### `v-cloak`

- 斗篷 避免 js 文件加载异常 导致用户体验过差

- ```vue
  <div v-cloak>{{message}}</div>
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
  ```

##### `v-slot`

- `v-slot => #`
- `v-slot` 只能添加在 `<template>` 上
- 默认插槽
- 具名插槽
- 作用域插槽
- `Ref`：[一次性讲明白 vue 插槽 slot](https://juejin.cn/post/6844904178901319687)

##### `this.$refs`

##### `computed`

- 计算属性

```javascript
computed: {
    fullName() {
        return this.firstName + " " + this.lastName;
    },
}
```

- `setter getter`
  - 计算属性并不希望被更改 所以一般没有 `set` 方法，所以就是一个只读属性

```js
//完整实现
computed: {
    fullName: {
        set: function (newValue) {
            const names = newValue.split(" ");
            this.firstName = names[0];
            this.lastName = names[1];
        },
        get: function () {
             return this.firstName + " " + this.lastName;
        },
    },
}
```

##### `filters`

- 过滤器 把前面需要过滤的东西作为参数 传递到后面的函数里

```vue
<template>
  <p>{{ num | add | multiply | divide }}</p>
  // 3
</template>
<script>
  data () {
    return {
      num: 0
    }
  },
  filters: {
    add: function (value) {
      return (value + 1)
    },
    multiply: function (value) {
      return value * 6
    },
    divide: function (value) {
       return value / 2
    }
  }
</script>
```

```javascript
组件化

创建组件构造器 Vue.extend()
注册组件 Vue.component()  (全局)
使用组件

组件的语法糖注册
Vue.component('mycpn', {
  template: `<h1>1234</h1>`,
})

组件模版抽离
<script type = "text/x-template" id='cpn'></script>//通过id进行绑定
<template id='cpn'></template>
Vue.component('mycpn',{template:'#cpn'})

父子组件通信  数据传递
通过props向子组件传递数据
通过事件向父组件发送数据   $emit

props:{}	 用对象来做类型限制和提供默认值default和必传值required(boolean)
友情提示：其实不是Vue不支持驼峰。而是在HTML属性不支持大写，即cInfo会自动解析成cinfo。这些边边角角的不算知识点，只能说是坑？？？

如果props里面写的是驼峰。那么在组件使用时数据绑定应该使用-来连接


父子组件的访问方式 $children/$refs(引用)

子访问父$parent
```

```javascript
slot插槽


插槽基本使用
默认值
多个值也可以一起替换


具名插槽
<slot name="left"><button>Left</button></slot>


编译的作用域
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。？

作用域插槽	v-slot='scope'			语法糖
父组件替换插槽的标签，但是内容由子组件来提供。

```

```javascript

```

###### Vuex 状态管理模式

- 使得组件中的状态可以共享。 多个组件共享状态（简单理解就是变量变量
- 响应式 属性

###### 第 147 题：v-if、v-show、v-html 的原理是什么，它是如何封装的？ #307

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；
- v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值

组件名 不能用驼峰 得用`-`否则会找不到组件

vue.js 页面 DOM 元素加载完以后，执行方法

```js
在接口请求成功的回调里使用;

this.$nextTick(() => {
  //
});
```
