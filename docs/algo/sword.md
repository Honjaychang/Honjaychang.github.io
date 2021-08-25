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













## 接雨水

![](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/dp-trap-rain.png)

```js
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]; // 6
```

#### 暴力破解

```js
const bfTrap = (height) => {
  let sum = 0;
  for (let i = 1; i < height.length - 1; i++) {
    // 分别寻找左右 最大高度
    let leftMax = 0;
    for (let j = i - 1; j >= 0; j--) {
      leftMax = Math.max(leftMax, height[j]);
      // leftMax = height[j] >= leftMax ? height[j] : leftMax
    }
    let rightMax = 0;
    for (let j = i + 1; j < height.length; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }
    const min = Math.min(leftMax, rightMax); // 得到左右两边最大高度中较矮的那个高度
    if (min > height[i]) {
      sum += min - height[i]; // 接水量 = 左右两边最大高度中较矮的那个高度 - 当前项的高度
    }
  }
  return sum;
};
```

#### 动态规划

```js
const dpTrap = (height) => {
  let sum = 0;
  const len = height.length;
  const leftMaxLevels = new Array(len).fill(0);
  const rightMaxLevels = new Array(len).fill(0);
  [leftMaxLevels[0]] = height;
  for (let i = 1; i < len; i++) {
    leftMaxLevels[i] = Math.max(height[i], leftMaxLevels[i - 1]);
  }
  rightMaxLevels[len - 1] = height[len - 1];
  for (let i = len - 2; i > 0; i--) {
    rightMaxLevels[i] = Math.max(height[i], rightMaxLevels[i + 1]);
  }
  for (let i = 0; i < len; i++) {
    const min = Math.min(leftMaxLevels[i], rightMaxLevels[i]);
    if (min > height[i]) sum += min - height[i];
  }
  return sum;
};
```

## 最大子序列和

```js
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; // [4, -1, 2, 1] => 6
```

#### 暴力

```js
function fn(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      res.push(arr.slice(i, j + 1).reduce((a, b) => a + b));
    }
  }
  return Math.max(...res);
}
```

#### 动态规划

- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

```js
/**
 * 如果 sum > 0, sum对结果有增益效果 sum保留并加上当前值
 * sum < 0, sum对结果无增益效果， 舍弃 => sum = 当前值
 * 比较sum 和 res 将大的作为 res 返回
 */
function fn(nums) {
  let sum = 0,
      res = nums[0];
  for (let i = 0; i < nums.length; i++) {
    // if (sum > 0) sum += nums[i];
    // else sum = nums[i];
    sum = sum > 0 ? sum + nums[i] : nums[i]
    res = Math.max(res, sum);
  }
  return res;
}
```

#### 分治

- 时间复杂度：`O(nlog(n))`
- 空间复杂度：

```js
function fn(nums) {
  return divide(nums, 0, nums.length - 1);
}
function divide(nums, left, right) {
  if (left === right) return nums[left];

  let mid = Math.floor(left + (right - left) / 2);

  let leftMax = divide(nums, left, mid);
  let rightMax = divide(nums, mid + 1, right);

  let leftCrossMax = nums[mid];
  let leftCrossSum = 0;
  let rightCrossMax = nums[mid + 1];
  let rightCrossSum = 0;
  // 计算左边
  for (let i = mid; i >= left; i--) {
    leftCrossSum += nums[i];
    leftCrossMax = Math.max(leftCrossMax, leftCrossSum);
  }
  // 计算右边
  for (let i = mid + 1; i <= right; i++) {
    rightCrossSum += nums[i];
    rightCrossMax = Math.max(rightCrossMax, rightCrossSum);
  }

  let crossMax = leftCrossMax + rightCrossMax;
  return Math.max(leftMax, rightMax, crossMax);
}
```

## 打印螺旋矩阵

出现次数大于一半





### [45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/solution/jian-zhi-offer-45-ba-shu-zu-pai-cheng-zu-580q/)











## 数组中出现次数大于 1/2

```js
let arr = [1, 2, 3, 2, 2, 2, 5, 4, 2]; // 2
```

- `sort`

```js
return arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
```

- Map 存储遍历

```js
function fn(arr) {
  let length = arr.length;
  let map = new Map();
  let count;
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      count = map.get(arr[i]);
      map.set(arr[i], ++count);
    } else {
      map.set(arr[i], 1);
    }
  }

  for (let [key, value] of map) {
    if (value > Math.floor(length / 2)) return key;
  }
}
```

- 摩尔投票

```js
function moer(arr) {
  let candiater = arr[0];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (count === 0) {
      // 如果此时没有候选人 就让当前这人为候选人
      candiater = arr[i];
    }
    if (arr[i] === candiater) {
      // 如果此时有候选人 且与候选人相等 ++
      count++;
    } else count--; // 不一样 count--
  }
  return candiater;
}
```

## 



```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
```







#### [24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

```js
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

const reverseList = (head) => {
  // 定义cur指向头部 pre指向头部前面的null
  let [cur, pre] = [head, null];
  // 遍历链表
  while (cur) {
    // 定义next为cur下一个
    const next = cur.next;
    // cur的指向改为pre
    cur.next = pre;
    // pre改为当前cur的指向
    pre = cur;
    // cur的指向改为next的指向
    cur = next;
  }
  // 遍历结束，cur指向null，返回pre
  return pre;
};

const reverseList = (head) => {
  let [cur, pre] = [head, null];
  while (cur) [pre, cur, cur.next] = [cur, cur.next, pre];
  return pre;
};
```



核心思路就是留一个前置指针，在游标移动K次之后前置指针开始移动，当游标到达最后一个元素时，前置指针刚好是要返回链表的头

```js
// 给定一个链表: 1->2->3->4->5, 和 k = 2.
// 返回链表 4->5.

const getKthFromEnd = (head, k) => {
  let fast = head;
  let slow = head;
  let flag = 0;
  while (fast) {
    if (flag >= k) slow = slow.next;
    fast = fast.next;
    flag++;
  }
  return slow;
};
```



```js
// 递归
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

var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  else if (!l2) return l1;

  let preHead = new ListNode(-1);
  let node = preHead;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      node.next = l1;
      l1 = l1.next;
    } else {
      node.next = l2;
      l2 = l2.next;
    }
    node = node.next;
  }

  if (l1) node.next = l1;
  else if (l2) node.next = l2;

  return preHead.next;
};
```



```js
var reversePrint = function (head) {
    let nums = []
    const visitor = function (head) {
        if (head !== null) {
            visitor(head.next)
            nums.push(head.val)
        }
    };
    visitor(head)
    return nums
}

var reversePrint = function (head) {
  let cur = head;
  let res = [];
  while (cur) {
    res.unshift(cur.val);
    cur = cur.next;
  }
  return res;
};
```

