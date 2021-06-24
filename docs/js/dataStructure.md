# JS 数据结构

:::note Link/Todo

- [JavaScript(ES6)数据结构和算法](https://www.bilibili.com/video/BV1a5411t7vZ)
- [从 0 到 1 学习 JavaScript 数据结构与算法](https://github.com/XPoet/js-data-structures-and-algorithms)
- 哈希表和树待更新
- [A](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)
- [youtube](https://www.youtube.com/playlist?list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
- 《学习 JavaScript 数据结构与算法第 3 版》

:::

## 栈

- `LIFO`

#### 基于数组的栈

```js
function Stcack() {
  this.list = [];
}
Stcack.prototype.push = function (key) {
  this.list[this.list.length] = key;
};
const stack = new Stcack();
stack.push(1);
console.log(stack.list);
```

- `push() pop() peek() isEmpty() size()`

```js
class Stack {
  constructor() {
    this.items = [];
  }
  // push(): 添加一个元素到栈顶位置
  push(element) {
    this.items.push(element);
  }
  // pop(): 移除栈顶到元素，同时返回被移除的元素
  pop() {
    return this.items.pop();
  }
  // peek(): 返回栈顶的元素，不对栈做任何修改(不会移除栈顶的元素，仅仅返回它)
  peek() {
    return this.items[this.items.length - 1];
  }
  // isEmpty(): 如果栈里没有任何元素就返回true，否则返回false。
  isEmpty() {
    return this.items.length === 0;
  }
  // size(): 返回栈里的元素个数。这个方法和数组的Length属性很类似。
  size() {
    return this.items.length;
  }
  // clear(): 清空栈
  clear() {
    this.items = [];
  }
}
```

##### 测试

```js
const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);

console.log(stack.items); //[ 10, 20, 30, 40 ]
console.log(stack.pop()); //40
console.log(stack.items); //[ 10, 20, 30 ]
console.log(stack.peek()); //30
console.log(stack.isEmpty()); //false
console.log(stack.size()); //3
```

#### 基于对象的栈

```js
class Stack {
  constructor() {
    this.items = {};
    this.count = 0;
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  pop() {
    if (this.count === 0) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    return this.items[this.count - 1];
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    this.count = 0;
    this.items = {};
  }
  toString() {
    if (this.count === 0) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

##### 测试

```js
const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.items); //{ '0': 10, '1': 20, '2': 30 }
console.log(stack.pop()); //30
console.log(stack.items); //{ '0': 10, '1': 20 }
console.log(stack.peek()); //20
console.log(stack.isEmpty()); //false
console.log(stack.size()); //1
console.log(stack.toString()); //10,20
```

#### 保护数据结构内部元素

##### 下划线命名约定

```js
// 使用下划线命名约定来标记一个属性为私有属性（只是约定
class Stack {
  constructor() {
    this._count = 0;
    this._items = {};
  }
}
```

#### 十进制转换为二进制

```js
function deToBin(num) {
  // 创建栈
  const stack = new Stack();
  // 循环取余数
  while (num >= 1) {
    stack.push(num % 2);
    // num = num / 2会得到double类型 可以用Math.floor(num/2)向下取整
    num = Math.floor(num / 2);
  }
  console.log(stack.items); //[0, 0, 1, 0, 0, 1, 1]
  // 拼接字符串
  let res = '';
  while (!stack.isEmpty()) {
    res += stack.pop();
  }
  return res;
}
deToBin(100); //"1100100"
```

## 队列

#### 基本方法

- `enqueue() dequeue() front() isEmpty() size()`

```js
class Queue {
  constructor() {
    this.items = [];
  }
  // enqueue(element: 向队列尾部添加一个(或多个)新的项。
  enqueue(element) {
    this.items.push(element);
  }
  // dequeue(): 移除队列的第一项，并返回被移除的元素。
  dequeue() {
    return this.items.shift();
  }
  // front(): 返回队列中第一个元素最先被添加，也将是最先被移除的元素。
  // 队列不做任何变动(不移除元素，只返回元素信息一与Stack类的peek方法非常类似)。
  front() {
    if (this.items.length === 0) return null;
    return this.items[0];
  }
  // isEmpty(): 如果队列中不包含任何元素，返回true，否则返回false。
  isEmpty() {
    return this.items.length === 0;
  }
  // size(): 返回队列包含的元素个数，与数组的length属性类似。
  size() {
    return this.items.length;
  }
  // toString(): 将队列中的内容，转成字符串形式
  toString() {
    let result = '';
    for (let item of this.items) {
      result += item + ' ';
    }
    return result;
  }
}
```

##### 测试

```js
const queue = new Queue();
queue.enqueue('AA');
queue.enqueue('BB');
queue.enqueue('CC');
queue.enqueue('DD');
console.log(queue.items); //[ 'AA', 'BB', 'CC', 'DD' ]

console.log(queue.dequeue()); //AA
console.log(queue.items); //[ 'BB', 'CC', 'DD' ]
console.log(queue.front()); //BB
console.log(queue.isEmpty()); //false
console.log(queue.size()); //3
console.log(queue.toString()); //BB CC DD
```

#### 击鼓传花

```js
// 击鼓传花 案例
function passGame(nameList, num) {
  // 1、创建队列
  const queue = new Queue();
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue()); //直接将没被选中的放到队列尾部 队列不断更新
    }
    queue.dequeue();
  }
  return queue.front();
}

console.log(passGame([1, 2, 3, 4, 5], 3)); //4
```

#### 优先级队列

```js
class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}
class QueuePriority extends Queue {
  enqueue(element, priority) {
    // 创建QueueElement对象
    const queueElement = new QueueElement(element, priority);
    if (this.isEmpty()) {
      this.items.push(queueElement);
    } else {
      let bol = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > queueElement.priority) {
          this.items.splice(i, 0, queueElement);
          bol = true;
          break;
        }
      }
      if (!bol) {
        this.items.push(queueElement);
      }
    }
  }
}
```

##### 测试

```js
const queuePriority = new QueuePriority();
queuePriority.enqueue(100, 100);
queuePriority.enqueue(150, 150);
queuePriority.enqueue(120, 120);
queuePriority.enqueue(90, 90);
// console.log(queuePriority.items)
queuePriority.items.forEach(item => {
  console.log(item.element, item.priority);
});
console.log(queuePriority.items);
// 90 90 	100 100 	120 120 	150 150
```

## 链表

#### 基本方法

- `append() insert() get() indexOf() update() removeAt() remove() isEmpty() size()`

```js
class Node {
  constructor(data) {
    this.data = data; // 保存元素
    this.next = null; // 指向下一个节点
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // append(data): 向列表尾部添加一个新的项
  append(data) {
    // 1、根据data创建Node对象
    const newNode = new Node(data);
    // 2、追加到最后
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++; //为什么加在这里呢
  }
  //insert(position, data): 向列表的特定位置插入一个新的项。
  insert(position, data) {
    // 1、判断越界问题
    if (position < 0 || position > this.length) return false;
    // 2、创建新的节点
    const newNode = new Node(data);
    // 3、插入元素
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let index = 0;
      let current = this.head;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = newNode;
      newNode.next = current;
    }
    this.length++;
  }
  //get(position): 获取对应位置的元素
  get(position) {
    if (position < 0 || position >= this.length) return false;
    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  }
  //indexOf(data): 返回元素在列表中的索引。如果列表中没有该元素则返回一1。
  indexOf(data) {
    let current = this.head;
    let index = 0;
    while (current.next) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }
  //update(position, data): 修改某个位置的元素
  update(position, data) {
    if (position < 0 || position > this.length) return false;
    let current = this.head;
    let index = 0;

    while (index++ < position) {
      current = current.next;
    }

    current.data = data;
  }
  //removeAt(position):从列表的特定位置移除项。
  removeAt(position) {
    if (position < 0 || position > this.length) return false;
    let current = this.head;
    if (position === 0) {
      this.head = this.head.next;
    } else {
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.length--;
  }
  //remove(data):从列表中移除一项。
  remove(data) {
    return this.removeAt(this.indexOf(data));
  }
  //isEmpty():如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false.
  isEmpty() {
    return this.length === 0;
  }
  //size():返回链表包含的元素个数。与数组的length属性类似。
  size() {
    console.log(this.length);
  }
  //toString():由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。
}
```

##### 测试

```js
const linkedList = new LinkedList();

linkedList.append('AAA');
linkedList.append('BBB');
linkedList.append('CCC');
console.log(linkedList); //AAA-->BBB-->CCC
linkedList.insert(1, 'abc');
console.log(linkedList); //AAA-->abc-->BBB-->CCC
console.log(linkedList.get(1)); //abc
console.log(linkedList.indexOf('BBB')); //2
linkedList.update(1, 'ABC');
console.log(linkedList.get(1)); //ABC
inkedList.removeAt(1); //AAA-->BBB-->CCC
console.log(linkedList);
linkedList.remove('AAA'); //BBB-->CCC
console.log(linkedList);
console.log(linkedList.size()); //2
```

#### 双向链表

```js
class DoublyNode extends Node {
  constructor(data) {
    super(data);
    this.prev = null;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.tail = null;
  }

  // append(element):向列表尾部添加个新的项
  append(data) {
    // 1、创建双向链表节点
    const newNode = new DoublyNode(data);
    // 2、追加元素
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // ！！跟单向链表不同，不用通过循环找到最后一个节点
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++; // 别忘了
  }
  // insert(position， element):向列表的特定位置插入一个新的项。
  insert(position, data) {
    // 判断是否越界
    if (position < 0 || position > this.length) return false;
    // 创建双向链表节点
    const newNode = new DoublyNode(data);
    // 多种情况进行判断
    if (position === 0) {
      // 头节点为空
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        // 头节点不为空
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    } else if (position === this.length) {
      // 在尾节点插入
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      // 正常插入
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      // 交换节点信息
      previous.next = newNode;
      newNode.prev = previous;
      newNode.next = current;
      current.prev = newNode;
    }
    this.length++;
    return true;
  }
  // 方法一样extends 直接继承 无需重写
  //get(position) :获取对应位置的元素
  // indexOf(element):返回元素在列表中的索引。如果列表中没有该元素则返回一1。

  //removeAt(position):从列表的特定位置移除项。
  removeAt(position) {
    if (position < 0 || position > this.length - 1) {
      return null;
    }
    // 根据不同情况考虑删除元素
    let current = this.head;
    if (position === 0) {
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else if (position === this.length - 1) {
      current = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let index = 0;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
      previous.next.prev = previous;
    }
    this.length--;
    // 返回删除的元素
    return current.data;
  }

  //update(position， element) :修改某个位置的元素
  update(position, data) {
    // 1、删除 position 位置的节点
    const result = this.removeAt(position);

    // 2、在 position 位置插入元素
    this.insert(position, data);
    return result;
  }
  //remove(element):从列表中移除项。
  //isEmpty0:如果链表中不包含任何元素，返回true，如果链表长度大于O则返回false。
  //size0):返回链表包含的元素个数。与数组的length属性类似。
  //toString0:由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，forwardString0 :返回正向遍历的节点字符串形式
  //backwordString0 :返回反向遍历的节点字符串形式
}
```

##### 测试

```js
const linkedList = new DoublyLinkedList();

linkedList.append('AAA');
linkedList.append('BBB');
linkedList.append('CCC');
console.log(linkedList); //-->AAA<-->BBB<-->CCC<-->
linkedList.insert(1, 'abc');
linkedList.insert(4, 'abc');
console.log(linkedList); //-->AAA<-->abc<-->BBB<-->CCC<-->abc<-->
console.log(linkedList.get(1)); //abc
console.log(linkedList.indexOf('BBB')); //2

linkedList.update(1, 'ABC'); //-->AAA<-->ABC<-->BBB<-->CCC<-->abc<-->
console.log(linkedList.get(1)); //ABC
console.log(linkedList.removeAt(1)); //ABC
console.log(linkedList.remove('AAA')); //AAA
// console.log(linkedList)
console.log(linkedList.size()); //3	-->BBB<-->CCC<-->abc<-->
```

## 哈希表

#### 基本方法

- `put() get() remove() isEmpty() size() resize()`

```js
// set map??

// 链地址法
const MAX_LOAD_FACTOR = 0.75;
const MIN_LOAD_FACTOR = 0.25;

class HashTable {
  constructor() {
    this.storage = []; // 数组存储元素
    this.count = 0; // 当前存放了多少个元素
    this.limit = 7; // 总个数
  }
  hashFun(str, max) {
    // 1、定义hashcode
    let hashcode = 0;

    // 霍纳算法
    for (let i = 0; i < str.length; i++) {
      hashcode = 31 * hashcode + str.charCodeAt(i);
    }

    hashcode = hashcode % max;

    return hashcode;
  }
  isPrime(num) {
    let temp = Math.ceil(Math.sqrt(num));
    for (let i = 2; i < temp; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }
  // 放入/修改 元素 HashMap->{key,value}
  put(key, value) {
    // 根据key映射到index
    const index = this.hashFun(key, this.limit);
    // 取出数组
    let bucket = this.storage[index];
    if (bucket === undefined) {
      bucket = [];
      this.storage[index] = bucket;
    }
    // 判断是插入还是修改操作
    let override = false;
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        override = true;
      }
    }
    // 如果没有覆盖 那么就是新增
    if (!override) {
      bucket.push([key, value]);
      this.count++;
      // 扩容
      if (this.count > this.limit * MAX_LOAD_FACTOR) {
        // 还得考虑质数问题
        // this.resize(this.limit * 2)
        let newLimit = this.getPrime(this.limit * 2);
        this.resize(newLimit);
      }
    }
  }
  // 获取元素
  get(key) {
    // 获取下标值
    const index = this.hashFun(key, this.limit);
    // 获取bucket
    const bucket = this.storage[index];
    if (bucket === undefined) return null;
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) return tuple[1];
    }
    return null;
  }
  // 删除元素
  remove(key) {
    // 获取下标值
    const index = this.hashFun(key, this.limit);
    // 获取bucket
    const bucket = this.storage[index];
    if (bucket === undefined) return null;
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;
        // 缩小
        if (this.limit > 8 && this.count < this.limit * MIN_LOAD_FACTOR) {
          // this.resize(Math.floor(this.limit / 2))
          const newLimit = this.getPrime(Math.floor(this.limit / 2));
          this.resize(newLimit);
        }

        return tuple[1];
      }
    }
  }
  // isEmpty
  isEmpty() {
    return this.count === 0;
  }
  // size
  size() {
    return this.count;
  }
  // 哈希表到扩容以及 质数寻找  扩容之后还要重新hash  也有可能之后缩小
  resize(newLimit) {
    //  保存旧的数组中到内容
    let oldStorage = this.storage;
    // 重置属性
    this.limit = newLimit;
    this.storage = [];
    this.count = 0;
    // 取出oldStorage里面到内容重新放到storage中
    oldStorage.forEach(bucket => {
      if (bucket === null) {
        return;
      }
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }
}
```

##### 测试

```js
const hashtable = new HashTable();
hashtable.put('name', 'honjay');
hashtable.put('age', '18');
hashtable.put('height', '175');
hashtable.put('len', '17');
hashtable.put('tall', '25');
hashtable.put('ght', '75');
// hashtable.put('all', '125')
// hashtable.put('ht', '750')
// hashtable.remove('name')
// hashtable.remove('age')
hashtable.remove('height');
hashtable.remove('len');
hashtable.remove('tall');
console.log(hashtable);
// console.log(hashtable.get('name'))
// console.log(hashtable.remove('age'))
// console.log(hashtable.storage)
// console.log(hashtable.isEmpty())
// console.log(hashtable.size())
```

## 树

#### 基本方法

- `insert() insertNode() preOrderTraverse() inOrderTraverse() postOrderTraverse() min() max() search() remove() getSuccessor()`

```js
// 儿子兄弟表示法  只需两个引用

//
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
// 封装二叉搜索树（特点：左子树节点值 < 根节点，右子树节点值 > 根节点）
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // insert（key）: 向树中插入一个新的键。
  insert(key) {
    //  1、根据key创建node节点
    const newNode = new Node(key);
    //
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  // 递归调用
  insertNode(node, newNode) {
    // debugger
    if (newNode.key > node.key) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    }
  }
  // preOrderTraverse: 通过先序遍历方式遍历所有节点。
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }
  preOrderTraverseNode(node) {
    if (node === null) return;

    console.log(node.key); //直接访问
    this.preOrderTraverseNode(node.left);
    this.preOrderTraverseNode(node.right);
  }
  // inOrderTraverse:通过中序遍历方式遍历所有节点。
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }
  inOrderTraverseNode(node) {
    if (node === null) return;

    this.inOrderTraverseNode(node.left);
    console.log(node.key); //直接访问
    this.inOrderTraverseNode(node.right);
  }
  // postOrderTraverse: 通过后序遍历方式遍历所有节点。
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }
  postOrderTraverseNode(node) {
    if (node === null) return;

    this.inOrderTraverseNode(node.left);
    this.inOrderTraverseNode(node.right);
    console.log(node.key); //直接访问
  }
  // min: 返回树中最小的值/键。
  min() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }
  // max: 返回树中最大的值/键。
  max() {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }
  // search（key）: 在树中查找一 个键，如果节点存在，则返回true；如果不存在，则返回false。
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    // 1、判断node有没有值
    if (node === null) return false;
    // 2、判断搜索的key与节点值的关系
    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }
  // 不利用递归来实现search
  search2(key) {
    let node = this.root;
    while (node !== null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  }
  // remove（key）: 从树中移除某个键。
  remove(key) {
    // 1、定义一些变量记录状态
    let current = this.root;
    let parent = null;
    let isLeftChild = true; //isLeft  貌似指的是current是parent的左还是右
    //   先找到要删除的节点，如果没有找到，不需要删除找到要删除节点
    while (current.key !== key) {
      parent = current;
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
      if (current === null) {
        return false;
      }
    }
    // 找到节点：current

    // 1）删除叶子节点（没有子节点）
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // 2）删除只有一个子节点的节点  我晕了
    else if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left; //不懂啊  4:52  P35  难道不会和别的混起来吗
      }
    } else if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (!isLeftChild) {
        parent.right = current.right;
      } else {
        parent.left = current.right;
      }
    }
    // 3）删除有两个子节点的节点
    else {
      // 获取后继节点
      let successor = this.getSuccessor(current); //current即要删除的节点

      // 判断是否是跟节点
      if (current === this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
    // 左边找相对最大的 右边找相对最小的？  比current小一点点的节点称为current节点的前驱.  比current大一点点的节点， 称为current节点的后继.
    return true;
  }
  getSuccessor(delNode) {
    // 比如找后继
    // 定义变量存储临时节点
    let successorParnet = delNode;
    let successor = delNode;
    let current = delNode.right;
    // 寻找节点
    while (current !== null) {
      successorParnet = successor;
      successor = current;
      current = current.left;
    }
    // 如果后继节点不是删除节点的右节点
    if (successor !== delNode.right) {
      successor.right = delNode.right;
      successorParnet.left = successor.right;
    }
    return successor;
  }
}
```

##### 测试

```js
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(15);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(19);
// console.log(tree)
// tree.preOrderTraverse()
// tree.inOrderTraverse() // 只要从小到大就可以证明没有问题
console.log(tree.remove(24));
tree.inOrderTraverse();
// tree.postOrderTraverse()
// console.log(tree.max())
// console.log(tree.min())
// console.log(tree.search(8))
// console.log(tree.search2(24))
```
