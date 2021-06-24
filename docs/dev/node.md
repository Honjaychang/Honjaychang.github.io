# Node

`events`

- `events.EventEmitter` 的核心就是事件触发与事件监听器功能的封装
- 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递

方法

- `addListener(event, listener)`
  - 为指定事件添加一个监听器到监听器数组的尾部
- `on(event, listener)`
  - 为指定事件注册一个监听器
- `once(event, listener)`
  - 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器
- `removeListener(event, listener)`
  - 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器

- `removeAllListeners([event])`
  - 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器
- `setMaxListeners(n)`
  - `setMaxListeners` 函数用于改变监听器的默认限制的数量 (默认10个输出警告)
- `listeners(event)`
  - 返回指定事件的监听器数组
- `emit(event, [arg1],[arg2],[...])`
  - 按监听器的顺序执行每个监听器，如果事件有注册监听返回 `true`，否则返回 `false`
- 类方法 `listenerCount(emitter, event)`
  - `events.emitter.listenerCount(eventName)` 返回指定事件的监听器数量

```js
// on 绑定 emit 触发
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
 
// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}
 
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});
 
// 触发 connection 事件 
eventEmitter.emit('connection');
 
console.log("程序执行完毕。");
```



## `Buffer`

- 缓冲区
- 使用 `Buffer.from()`接口去创建 `Buffer` 对象

#### 创建 `Buffer` 类 

- `Buffer.alloc(size[, fill[, encoding]])` 
  - 返回一个指定大小的 `Buffer` 实例，如果没有设置 `fill`，则默认填满 `0`
  - `Buffer.alloc(10, 1)` `0x1`  16进制填充
- `Buffer.allocUnsafe(size)` 
  - 返回一个指定大小的 `Buffer` 实例，可能包含旧数据。需要使用`fil()/write()`重写
- `Buffer.allocUnsafeSlow(size)`
- `Buffer.from(array)` 
  - 返回一个被 `array` 的值初始化的新的 `Buffer` 实例（传入的 `array` 的元素只能是数字，不然就会自动被 `0` 覆盖）
  - `Buffer.from([1, 2, 3]) => [0x1, 0x2, 0x3]`
- `Buffer.from(arrayBuffer[, byteOffset[, length]])` 
  - 返回一个新建的与给定的 `ArrayBuffer` 共享同一内存的 `Buffer`
- `Buffer.from(buffer)` 
  - 复制传入的 `Buffer` 实例的数据，并返回一个新的 `Buffer` 实例
- `Buffer.from(string[, encoding])` 
  - 返回一个被 `string` 的值初始化的新的 `Buffer` 实例
  - `Buffer.from("runoob", "ascii"); // <Buffer 72 75 6e 6f 6f 62>*`

##### 写入缓冲区

`buf.write(string[, offset[, length]][, encoding])`

```js
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com"); // 14
```



##### 缓冲区读取数据

`buf.toString([encoding[, start[, end]]])`

- 默认使用`utf8`

##### 将 `Buffer` 转换为 `JSON` 对象

- `buf.toJSON()`

- 当字符串化一个 `Buffer` 实例时，`JSON.stringify()` 会隐式地调用该 `toJSON()`



缓冲区合并

`Buffer.concat(list[, totalLength])`

缓冲区比较

- `buf.compare(otherBuffer)` 按位比较 ASCII？
  - `< 0 buffer1 在 buffer2之前`
  - `= 0 buffer1 与 buffer2相同`
  - `> 0 buffer1 在 buffer2之后`

拷贝缓冲区

`buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])`

缓冲区裁剪

- `buf.slice(start[, end])`
- 操作的是与原始 buffer 同一块内存区域

缓冲区长度

- `buf.length`



`Stream`

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- `data` - 当有数据可读时触发。
- `end` - 没有更多的数据可读时触发。
- `error` - 在接收和写入过程中发生错误时触发。
- `finish` - 所有数据已被写入到底层系统时触发。

