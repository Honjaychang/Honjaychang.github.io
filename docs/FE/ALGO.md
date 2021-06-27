# ALGO

::: warning

- 我好菜 但我好想进大厂

:::

## 4.10 网易笔试

#### 二叉树

- [小白都可以看懂的树与二叉树](https://github.com/sisterAn/JavaScript-Algorithms/issues/39)

<img src="https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/image-20210410200403336.png" alt="image-20210410200403336" style="zoom:50%;" />

```js
function maxMoney(root) {
  if (!root || (root.left === null && root.right === null)) {
    return 0
  }

  if (root.left === null) {
    if (root.right.left === null && root.right.right === null) {
      return 2
    }
    return maxMoney(root.right)
  }

  if (root.right === null) {
    if (root.left.left === null && root.left.right === null) {
      return 2
    }
    return maxMoney(root.left)
  }

  if (root.left.left === null && root.left.right === null) {
    if (root.right.left === null && root.right.right === null) {
      return 5
    }
    return 2 + maxMoney(root.right)
  } else {
    if (root.right.left === null && root.right.right === null) {
      return 2 + maxMoney(root.left)
    }
    return maxMoney(root.right) + maxMoney(root.left)
  }
}
```

## 接雨水

```js
var trap = function (height) {
  let sum = 0
  for (let i = 1; i < height.length - 1; i++) {
    let leftMax = 0 //找左边最大高度
    for (let j = i - 1; j >= 0; j--) {
      leftMax = height[j] >= leftMax ? height[j] : leftMax
    }
    let rightMax = 0 //找右边最大高度
    for (let j = i + 1; j < height.length; j++) {
      rightMax = height[j] >= rightMax ? height[j] : rightMax
    }
    let min = Math.min(leftMax, rightMax) //得到左右两边最大高度中较矮的那个高度
    if (min > height[i]) {
      sum = sum + min - height[i] //接水量 = 左右两边最大高度中较矮的那个高度 - 当前项的高度
    }
    //console.log(leftMax, rightMax, sum)
  }
  return sum
}
```



#### 二分法？

<img src="https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/image-20210410200310112.png" alt="image-20210410200310112" style="zoom:50%;" />



#### 寻找最长子串

给定一个字符集合`C = c1，c2，c3，，，Ci`，再给定一个字符串`S`，求`S`中最长的连续子字符串`s`，`C`中的字符元素在字符串`s`中出现的次数均为偶数（0也是偶数）

- 匹配变量正则  可以通过`new RegExp()`来实现

```js
function maxSubStrLength(charList, s) {
  let obj = {}
  let arr = []
  for (let v of charList) {
    obj[v] = 0
  }
  for (let i = 0; i < s.length; i++) {
    if (obj.hasOwnProperty(s[i])) {
      obj[s[i]]++
    }
  }
  for (let key in obj) {
    if (obj[key] % 2 !== 0 && obj[key] !== 0) {
      arr.push(key)
      delete obj[key]
    }
  }
  let remove = arr.join('')
  let reg = new RegExp('[' + remove + ']', 'g')
  s = s.replace(reg, '&').split('&')

  return Math.max(...s.map((item) => item.length))
}
console.log(maxSubStrLength(['a', 'b', 'C'], 'axabybbbC'))
```

#### BFF

- `Backends For Frontends`(服务于前端的后端)

- BFF就是服务器设计API时会考虑到不同设备的需求，也就是为不同的设备提供不同的API接口，虽然它们可能是实现相同的功能，但因为不同设备的特殊性，它们对服务端的API访问也各有其特点，需要区别处理。

BFF及其功能

2.目前部门存在多个平台，导致用户频繁在多个平台跳转，如何实现平台统一？并说出优缺点







## 4.11 美团笔试





















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

- 正常情况 如果是正方形 `n*n` 最后只需要判断数组的 `length` 是否为`0`就可以

```js
let arr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
// [ 1,  2,  3,  4, 8, 12, 16, 15, 14, 13, 9,  5, 6,  7, 11, 10 ]
var spiralOrder = function (matrix) {
  let res = [];
  //每次剃掉四个边
  //会出现两种情况
  //m>=n比较简单最后会剩下一行，验证m=1就直接返回
  //m<n的时候会出现一列的情况n=1，逐行遍历之后返回
  function square(arr) {
    let m = arr.length;
    if (m == 0) return;
    // if (m == 1) {
    //   res.push(...arr[0]);
    //   return;
    // }
    let n = arr[0] && arr[0].length;
    // if (n == 0) return;
    // if (n == 1) {
    //   for (let i = 0; i < m; i++) res.push(arr[i][0]);
    //   return;
    // }
    res.push(...arr[0]); //第一行
    for (let i = 1; i < m; i++) res.push(arr[i][n - 1]); //最右列
    for (let j = n - 2; j >= 0; j--) res.push(arr[m - 1][j]); //最后一行
    for (let i = m - 2; i >= 1; i--) res.push(arr[i][0]); //最左列
    let next = arr.slice(1, -1).map((a) => a.slice(1, -1)); //去掉外边
    square(next); //递归下去
  }
  square(matrix);
  return res;
};
```


