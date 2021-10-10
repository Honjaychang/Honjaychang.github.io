# 链表



:::note Ref

- [「算法与数据结构」JavaScript中的链表 -- isboyjc](https://juejin.cn/post/6921515173614354445)
- [工作中可能会使用到的数据结构和算法](https://juejin.cn/post/6984990913118339085#heading-15)

:::

## 单向链表

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function LinkedList() {
  this.length = 0;
  this.head = null;
}
```

### 基本方法

```js
// 向链表中追加节点
LinkedList.prototype.append = function (val) {
  const node = new ListNode(val);
  if (!this.head) this.head = node;
  else {
    const lastNode = this.getElementAt(this.length - 1);
    lastNode.next = node;
  }
  this.length++;
};

// 在链表的指定位置插入节点
LinkedList.prototype.insert = function (index, val) {
  if (index < 0 || index >= this.length) return false;
  const node = new ListNode(val);
  if (index === 0) {
    node.next = this.head;
    this.head = node;
  } else {
    const preNode = this.getElementAt(index - 1);
    node.next = preNode.next;
    preNode.next = node;
  }
  this.length++;
};

// 删除链表中指定位置的元素，并返回这个元素的值
LinkedList.prototype.removeAt = function (index) {
  if (index < 0 || index >= this.length) return null;
  let cur = this.head;
  if (index === 0) {
    this.head = cur.next;
  } else {
    const preNode = this.getElementAt(index - 1);
    cur = preNode.next;
    preNode.next = cur.next;
  }
  this.length--;
  return cur.val;
};

// 删除链表中对应的元素
LinkedList.prototype.remove = function (val) {
  const index = this.indexOf(val);
  this.removeAt(index);
};

// 获取链表中给定元素的索引
LinkedList.prototype.indexOf = function (val) {
  let cur = this.head;
  for (let i = 0; i < this.length; i++) {
    if (cur.val === val) return i;
    cur = cur.next;
  }
  return -1;
};

// 获取链表中某个节点
LinkedList.prototype.find = function (val) {
  let cur = this.head;
  while (cur) {
    if (cur.val === val) return cur;
    cur = cur.next;
  }
  return null;
};

// 获取链表中索引所对应的元素
LinkedList.prototype.getElementAt = function (index) {
  if (index < 0 || index >= this.length) return null;
  let cur = this.head;
  while (index--) {
    cur = cur.next;
  }
  return cur;
};

// 判断链表是否为空
LinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

// 获取链表的长度
LinkedList.prototype.size = function () {
  return this.length;
};

// 获取链表的头元素
LinkedList.prototype.getHead = function () {
  return this.head;
};

// 清空链表
LinkedList.prototype.clear = function () {
  this.head = null;
  this.length = 0;
};

// 序列化链表
LinkedList.prototype.join = function (string) {
  let cur = this.head;
  let str = '';
  while (cur) {
    str += cur.val;
    if (cur.next) str += string;
    cur = cur.next;
  }
  return str;
};
```

### 测试

```js
let linkedList = new LinkedList();

linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
console.log(linkedList.join('-->'));

linkedList.insert(0, 5);
linkedList.insert(2, 15);
linkedList.insert(4, 25);
console.log(linkedList.join('-->'));

console.log(linkedList.removeAt(0));
console.log(linkedList.removeAt(1));
console.log(linkedList.removeAt(2));
console.log(linkedList.join('-->'));

console.log(linkedList.indexOf(20));

linkedList.remove(20);
console.log(linkedList.join('-->'));

console.log(linkedList.find(10));

linkedList.clear();
console.log(linkedList.size());

// 10-->20-->30
// 5-->10-->15-->20-->25-->30
// 5
// 15
// 25
// 10-->20-->30
// 1
// 10-->30
// ListNode { val: 10, next: ListNode { val: 30, next: null } }
// 0
```

## 双向链表

```js
class DoubleListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
```

### 基本方法

```js
class DoubleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  getElementAt(index) {
    if (index < 0 || index >= this.length) return null;

    let cur = null;
    if (index > Math.floor(this.length / 2)) {
      // 从后往前
      cur = this.tail;
      let i = this.length - 1;
      while (i > index) {
        cur = cur.prev;
        i--;
      }
    } else {
      // 从前往后
      cur = this.head;
      while (index--) {
        cur = cur.next;
      }
    }
    return cur;
  }
  find(val) {
    let curHead = this.head;
    let curTail = this.tail;
    while (curHead) {
      if (curHead.val == val) return curHead;
      curHead = curHead.next;

      if (curTail.val == val) return curTail;
      curTail = curTail.prev;
    }
    return null;
  }
  append(val) {
    const node = new DoubleListNode(val);
    if (this.head === null) {
      // 链表为空，head 和 tail 都指向当前添加的节点
      this.head = node;
      this.tail = node;
    } else {
      // 链表不为空，将当前节点添加到链表的尾部
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.length++;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) return false;

    // 插入到尾部
    if (index === this.length) {
      this.append(val);
    } else {
      const node = new DoubleListNode(val);

      if (index === 0) {
        // 插入到头部
        if (this.head === null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          this.head.prev = node;
          this.head = node;
        }
      } else {
        // 插入到中间位置
        const curNode = this.getElementAt(index);
        const prevNode = curNode.prev;
        node.next = curNode;
        node.prev = prevNode;
        prevNode.next = node;
        curNode.prev = node;
      }
      this.length++;
    }
    return true;
  }
  removeAt(index) {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;
    let prevNode;

    if (index === 0) {
      // 移除头部元素
      this.head = current.next;
      this.head.prev = null;
      if (this.length === 1) this.tail = null;
    } else if (index === this.length - 1) {
      // 移除尾部元素
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      // 移除中间元素
      current = this.getElementAt(index);
      prevNode = current.prev;
      prevNode.next = current.next;
      current.next.prev = prevNode;
    }

    this.length--;
    return current.val;
  }
  indexOf(val) {
    let curHead = this.head;
    let curTail = this.tail;
    let idx = 0;
    while (curHead !== curTail) {
      if (curHead.val == val) return idx;
      curHead = curHead.next;

      if (curTail.val == val) return this.length - 1 - idx;
      curTail = curTail.prev;

      idx++;
    }
    return -1;
  }
  remove(val) {
    const index = this.indexOf(val);
    return this.removeAt(index);
  }
  join(string) {
    let cur = this.head;
    let str = '';
    while (cur) {
      str += cur.val;

      if (cur.next) str += string;

      cur = cur.next;
    }
    return str;
  }
}
```

### 测试

```js
let doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.append(10);
doubleLinkedList.append(15);
doubleLinkedList.append(20);
doubleLinkedList.append(25);
console.log(doubleLinkedList.join('<->'));

console.log(doubleLinkedList.getElementAt(0).val);
console.log(doubleLinkedList.getElementAt(1).val);
console.log(doubleLinkedList.getElementAt(5));

console.log(doubleLinkedList.join('<->'));
console.log(doubleLinkedList.indexOf(10));
console.log(doubleLinkedList.indexOf(25));
console.log(doubleLinkedList.indexOf(50));

doubleLinkedList.insert(0, 5);
doubleLinkedList.insert(3, 18);
doubleLinkedList.insert(6, 30);
console.log(doubleLinkedList.join('<->'));

console.log(doubleLinkedList.find(10).val);
console.log(doubleLinkedList.removeAt(0));
console.log(doubleLinkedList.removeAt(1));
console.log(doubleLinkedList.removeAt(5));
console.log(doubleLinkedList.remove(10)); // 未实现
console.log(doubleLinkedList.remove(100));

console.log(doubleLinkedList.join('<->'));

// 10<->15<->20<->25
// 10
// 15
// null
// 10<->15<->20<->25
// 0
// 3
// -1
// 5<->10<->15<->18<->20<->25<->30
// 10
// 5
// 15
// null
// 10
// null
// 18<->20<->25<->30
```

## 常见题型

:::note Note

链表中常用操作

- 虚拟节点

```js
var head = new ListNode();
var cur = head;
return head.next;
```

- 快慢指针

:::

> 以下题型中节点结构如下所示

```js
const Node = function (data) {
  this.data = data;
  this.next = null;
};
```

### 判断链表是否有环

![链表是否有环](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20210720190644.png)

- 创建两个指针分别指向表头 (快慢指针 分别走1 2)
- 如果两个指针指向同一个节点 则证明存在环 否则继续 直到慢指针走完
- 假设从链表头节点到入环点的距离是 `D`，链表的环长是 `S`。那么循环会进行 `S` 次，可以简单理解为 `O(N)`。除了两个指针以外，没有使用任何额外存储空间，所以空间复杂度是 `O(1)`

```js
const nodeA = new Node('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const nodeD = new Node('D');
const nodeE = new Node('E');

nodeA.next = nodeB;
nodeB.next = nodeC;
nodeC.next = nodeD;
nodeD.next = nodeE;
nodeE.next = nodeC;
```

> 标志法

- 给每个已遍历过的节点加标志位，遍历链表，当出现下一个节点已被标志时，则证明单链表有环

```js
const hasCycle = (head) => {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
};
```

> 快慢指针

- 如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 `null` 时，快慢指针都不可能相遇

```js
const hasCycle = (head) => {
  if (!head || !head.next) return false;

  let slow = head,
    fast = head;
  while (slow && fast) {
    slow = slow.next;
    fast = fast.next && fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

console.log(hasCycle(nodeA)); // true
```

### [52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

![Link-First-SharedNode](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/Link-First-SharedNode.image)

- 如果两个链表相交 相交结点后面都是共有的 => 两个链表的尾结点的地址也是一样的
- 程序实现：分别遍历两个单链表，直到尾结点 => 判断尾结点地址是否相等即可

- 如何找到第一个相交结点？
  - 判断是否相交的时候，记录下两个链表的长度，算出长度差 len
  - 接着先让较长的链表遍历 len 个长度，然后两个链表同时遍历，判断是否相等，如果相等，就是第一个相交的结点。

```js
const nodeA = new Node('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const node1 = new Node('1');
const node2 = new Node('2');
const node3 = new Node('3');
const nodeD4 = new Node('D4');
const nodeE5 = new Node('E5');

nodeA.next = nodeB;
nodeB.next = nodeC;
nodeC.next = nodeD4;

node1.next = node2;
node2.next = node3;
node3.next = nodeD4;
nodeD4.next = nodeE5;
```

> 正常方法

```js
function intersectNode(head1, head2) {
  if (head1 && head2) {
    // 计算链表的长度
    let len1 = 0, p = head1;
    let len2 = 0, q = head2;
    while (p.next) {
      len1++;
      p = p.next;
    }
    while (q.next) {
      len2++;
      q = q.next;
    }

    if (p === q) {
      // p指向短链，q指向长链
      let len = 0;
      if (len1 > len2) {
        len = len1 - len2;
        p = head2;
        q = head1;
      } else {
        len = len2 - len1;
        p = head1;
        q = head2;
      }

      while (len > 0) {
        len--;
        q = q.next;
      }

      while (p && q && p !== q) {
        p = p.next;
        q = q.next;
      }
      return p;
    }
  }
  return null;
}
console.log(intersectNode(nodeA, node1)); 
// Node { data: 'D4', next: Node { data: 'E5', next: null } }
```

> 双指针法

```js
如果链表一样长且有交点，则第一次遍历就能找到交点，返回
如果不一样长且有交点，则第二次遍历就能找到交点，返回
如果没有交点，则第二次遍历结束都是null，遍历结束，返回null


var getIntersectionNode = function (headA, headB) {
  /* 
      双指针法，浪漫相遇 遍历完自己的节点后 交换位置继续遍历 最后二者的总步数是一样 相遇时即为所求第一个祖先节点
      《你的名字》
      你变成我，走过我走过的路。
      我变成你，走过你走过的路。
      然后我们便相遇了      
  */
  if (!headA || !headB) return null;
  let a = headA,
    b = headB;

  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }

  return a;
};
```

### 回文链表

![Link-Palindrome](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/Link-Palindrome.image)

- 从头遍历链表，同时正向和反向拼接每个链表的数据，最后比对正向和反向得到的字符串是否相等。如果相等则是回文链表；否则不是。

```js
const node1 = new Node('A');
const node2 = new Node('B');
const node3 = new Node('C');
const node4 = new Node('C');
const node5 = new Node('B');
const node6 = new Node('A');

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
```

```js
const isPalindrome = (head) => {
  let a = '', b = '';

  while (head !== null) {
    a = a + head.data;
    b = head.data + b;

    head = head.next;
  }
  return a === b;
};

console.log(isPalindrome(node1));
```

### 剑指Offer

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

### [06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

- 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）

```
输入：head = [1,3,2]
输出：[2,3,1]
```

- 遍历 头部插入
- 递归 栈思路（从最后一个开始保存到数组 实现倒序打印

```js
var reversePrint = function (head) {
  let res = [];
  // while(head){
  //     res.unshift(head.val)
  //     head = head.next
  // }
  const fn = (head) => {
    if (head) {
      fn(head.next);
      res.push(head.val);
    }
  };
  fn(head);
  return res;
};
```

### [25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

- 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

- `head` 创建新的链表节点， `cur` 保存新链表的头节点
- 若`l1`与`l2`都未遍历完毕，将较小的节点接在新链表上
- 若一方遍历完毕则将另一方接上
- 返回新链表头节点的`next`



> 循环依次对比  (虚拟节点+ 迭代

```js
var mergeTwoLists = function (l1, l2) {
    var head = new ListNode();
    var cur = head;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
  	// 处理l1或者l2还未遍历完的场景
    if (l1) cur.next = l1;
    if (l2) cur.next = l2;
    return head.next;
};
```

> 递归 分治剪枝：返回有效期望链表项

```js
var mergeTwoLists = function (l1, l2) {
  // 当其中有null 则返回有效值
  if (!l1 || !l2) return l1 || l2;
  // 进行大小对比
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

### [ 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

> 快慢指针

- 快指针先走k步
- 快慢指针再一起走
- 直到快指针到头
- 此时的慢指针指向的就是倒数第k个

```js
const getKthFromEnd = (head, k) => {
  let fast, slow;
  fast = slow = head;
  while (k--) {
    // 快指针先走k步
    fast = fast.next;
  }
  while (fast) {
    // 再一起走，知道快指针走到头
    fast = fast.next;
    slow = slow.next;
  }
  // 此时的慢指针指的就是倒数第k个
  return slow;
};
```

### [24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

> 迭代法 双指针

- 将单链表中的每个节点的后继指针指向它的前驱节点即可
- `cur.next -> prev`
- `prev -> cur`
- `cur -> cur.next`

```js
const reverseList = (head) => {
  let prev = null,
    cur = head;
  while (cur) {
    let temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  return prev;
};
```

> ES6

```js
var reverseList = function (head) {
  /* 
      类比思考 反转数组思路 双端指针实现
      while (l < r) swap(a, l++, r--)
      数组位置的交换是这样 [a[i], a[j]] = [a[j], a[i]]
      但是 单链表只能依次通过 next 访问 不能通过索引访问 
      链表的交换需要扩展一个指针 即next
      cur 当前项
      prev 上一项
      cur.next 当前指针指向
      [ cur.next, prev, cur ] = [prev, cur, cur.next]
      上面这段ES6语法表示
      当前cur 的指针next 指向prev上一项 并且 交换迭代prev 和 next
  */
  let [p, c] = [null, head];

  while (c) [c.next, p, c] = [p, c, c.next];

  return p;
};
```

### [18. 删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

- 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
- 返回删除后的链表的头节点。

```js
输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
```

> 哑节点

```js
var deleteNode = function (head, val) {
  // 定义虚拟节点
  let dummy = new ListNode(-1);
  // 虚拟节点连接到head
  dummy.next = head;
	// 定义 cur 指针，最开始指向虚拟节点天头部
  let cur = dummy
	// 遍历链表
  while (cur && cur.next) {
    // 如果下一个值等于val，则删除下一个值
    if(cur.next.val === val) cur.next = cur.next.next
    cur = cur.next
  }
  return dummy.next;
};
```

### [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

> 快慢指针

```js
const removeNthFromEnd = (head, n) => {
  // 哨兵节点
  let dump = new ListNode();
  dump.next = head;
  // 快慢指针
  let slow = dump, fast = dump;
  // 快指针先走n步
  while (n-- > 0) {
    fast = fast.next;
  }
  // 快指针走到最后，当前slow为倒数第n+1个节点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dump.next;
};
```




### [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

- 利用双指针，快指针走两步，慢指针走一步，快指针走完，慢指针则为中间值

```js
var middleNode = function (head) {
  if (!head) return []
  var fast = slow = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};
```

