## 剑指 Offer

#### [ 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

> 在一个长度为 `n` 的数组 `nums` 里的所有数字都在 `0～n-1` 的范围内。请找出数组中任意一个重复的数字。

##### 原地排序

```js
// 一个萝卜 一个坑
var findRepeatNumber = function (nums) {
  var temp;
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] != i) {
      if (nums[i] === nums[nums[i]]) return nums[i];
      temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
    }
  }
};
```

## 数组

#### [21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

```js
/**
 *  头指针 奇数 尾指针 偶数 => 头指针向后移动 尾指针向前移动
 *            尾指针 奇数 => 头指针向后移动 尾指针不动
 *  头指针 偶数 尾指针 偶数 => 头指针不动 尾指针向前移动
 *            尾指针 奇数 => 交换头指针、尾指针对应的数值 并且头指针向后移动 尾指针向前移动
 */

const isOdd = (num: number): boolean => num % 2 === 1;
```

##### 双指针移动

```tsx
const fn = (arr: number[]): number[] => {
  let i = 0, j = arr.length - 1;
  while (i < j) {
    if (isOdd(arr[i])) {
      if (isOdd(arr[j])) i++;
      else {
        i++;
        j--;
      }
    } else {
      if (isOdd(arr[j])) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j++;
      } else j--;
    }
  }
  return arr;
};
```

##### 快慢指针

```tsx
const fn = (arr: number[]): number[] => {
  let i = 0, j = 0;
  while (j <= arr.length) {
    if (isOdd(arr[j])) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j++;
    } else j++;
  }
  return arr;
};
```



#### [04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

```js
// 从右上角开始判断，如果右上角的数字比targrt大，删去所在列；反之，删去所在行,逐步逼近左下
var findNumberIn2DArray = function (matrix, target) {
  let n = matrix.length,
    m = matrix[0].length;
  if (n === 0 || target < matrix[0][0] || target > matrix[n - 1][m - 1])
    return false;
  // return matrix.flat(2).includes(target)
  let row = 0,
    col = m - 1;
  while (row <= n - 1 && col >= 0) {
    if (matrix[row][col] === target) return true;
    else if (matrix[row][col] > target) col -= 1;
    else row += 1;
  }
  return false;
};
```

#### [05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

- 直接正则 `/\s/g`
- 字符串拼接
- `split` 分割

```js
var replaceSpace = function (s) {
  return s.replace(/\s/g, '%20');

  let res = '';
  for (let v of s) {
    v === ' ' ? (res += '%20') : (res += v);
  }
  return res;

  return s.split(' ').join('%20');
};
```

#### [09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

```js
//两个数组模拟栈的行为
var stack1 = [], //存储栈
  stack2 = []; //辅助栈

//栈是后入先出（LIFO,last in first out），队列是先入先出（FIFO,first in first out）

//队列插入元素函数
function push(ele) {
  //模拟队列的push操作，直接往存储栈stack1中推入即可
  //但是要考虑辅助栈stack2中还存在值的情况，需要先将辅助栈中的值推回存储栈中
  while (stack2.length !== 0) {
    stack1.push(stack2.pop());
  }
  stack1.push(ele);
}

//队列删除元素函数
function pop() {
  //模拟队列的pop操作则要考虑栈的后入先出特性，需要先将存储栈stack1中的数组，推入辅助栈stack2，然后辅助栈弹出元素
  while (stack1.length !== 0) {
    stack2.push(stack1.pop());
  }
  return stack2.pop();
}
```

#### [11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

## 链表

#### [06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

- 遍历 头部插入
- 递归 栈思路（从最后一个开始保存到数组 实现倒序打印

```js
/**
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

var reversePrint = function (head) {
  let res = [];
  // while(head){
  //     res.unshift(head.val)
  //     head = head.next
  // }
  const fn = function (head) {
    if (head) {
      fn(head.next);
      res.push(head.val);
    }
  };
  fn(head);
  return res;
};
```

## 二叉树

#### [07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

> 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  let rootVal = preorder[0];
  let rootIndex = inorder.indexOf(rootVal);
  const node = new TreeNode(rootVal);

  node.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  node.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return node;
};
```

#### [27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

递归

```js
/**
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

var mirrorTree = function (root) {
  if (!root) return null;
  // 交换当前左右节点
  let temp = root.left;
  root.left = root.right;
  root.right = temp;
  // 递归操作左右子树
  mirrorTree(root.left);
  mirrorTree(root.right);
  return root;
};
```

辅助栈

- 特例化：针对 `root`为`null`的情况，直接返回`root`
- 初始化：定义一个辅助栈，将根节点入栈
- 递归：判断栈不为空，则逐步出栈，将节点的左右节点互换，实现镜像

```js
var mirrorTree = function (root) {
  if (root) {
    let stack = [];
    stack.push(root);
    while (stack.length > 0) {
      let node = stack.pop();
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
  return root;
};
```

## 动态规划

#### [10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

##### [10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

> 斐波拉契数列改版

```
F(0) = 0
F(1) = 1
F(2) = 2

F(n) = F(n-1) + F(n-2) + F(n-3)
```

- 常规 === 超时

```
return solution(n - 1) + solution(n - 2) + solution(n - 3)
```

- 动态规划
  - 时间：`O(n)` 空间：`O(n)`

```js
function solution(n) {
  let dp = new Array(n);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[n];
}
```

- 动态规划再优化
  - 时间：`O(n)` 空间：`O(1)`

```js
function solution(n) {
  if (n < 3) return n;
  let a = 0,
    b = 1,
    c = 2,
    res;
  for (let i = 3; i <= n; i++) {
    d = a + b + c;
    a = b;
    b = c;
    c = res;
  }
  return res;
}
```

#### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

```js
// const coins = [1, 2, 5], target = 120
// dp[120] = Math.min(dp[119] + 1, dp[118] + 1, dp[115] + 1)
// dp[i] = Math.min(dp[i - coins[0]] + 1, dp[i - coins[2]] + 1, ...)
// dp[i]  表示总金额为 i 的时候最优解法的硬币数

function coinChange(coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```
