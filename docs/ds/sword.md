# 剑指 Offer

## 数组

### [ 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

在一个长度为 `n` 的数组 `nums` 里的所有数字都在 `0～n-1` 的范围内。请找出数组中任意一个重复的数字。

> 原地排序

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

### [21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

```js
/**
 *  头指针 奇数 尾指针 偶数 => 头指针向后移动 尾指针向前移动
 *            尾指针 奇数 => 头指针向后移动 尾指针不动
 *  头指针 偶数 尾指针 偶数 => 头指针不动 尾指针向前移动
 *            尾指针 奇数 => 交换头指针、尾指针对应的数值 并且头指针向后移动 尾指针向前移动
 */

const isOdd = (num: number): boolean => num % 2 === 1;
```

> 双指针移动

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

> 快慢指针

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

### [04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

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

### 数组中出现次数大于 1/2

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

### 两数之和

```js
nums = [2,7,11,5]; target = 9; return index
```

> 普通遍历

```js
function returnIndex(nums, target) {
  const length = nums.length
  for (let i = 0; i < length; i++) {
    let res = target - nums[i]
    for (let j = length; j > i; j--) {
      if (res === nums[j]) {
        return [i, j]
      }
    }
  }
  return []
}
```

> 哈希表

- `new Map()` 遍历数组 计算每一个数 组成`target`的差值
- 如果`map`里面存在 差值 则直接返回 差值的val 以及当前的 `i`
- 如果 `map`里面没有 则将当前的`val, index` 存入`map`
- 遍历完还没有得到解的话则返回 `[]`

```js
function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let res = target - nums[i]
    if (map.has(res)) {
      return [map.get(res), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}

twoSum([2, 7, 11, 5], 9) // 0, 1
twoSum([3, 4, 3, 4], 6) // 0, 2
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

#### [11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)





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
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; 
// [4, -1, 2, 1] => 6
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

> 动态规划为了找到不同子序列之间的递推关系，**是以子序列的结束点为基准的**

- 时间复杂度：`O(n)`    空间复杂度：`O(n)`

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
    // sum = Math.max(sum+nums[i], nums[i])
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

#### [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

> 滑动窗口，循环去掉左边第一个元素，直到窗口中元素无重复，此时再扩大窗口
>
> 首先 右指针 扩张到滑动窗口不满足条件的时候暂停
> 左指针 开始收缩窗口，让窗口满足条件后再进行扩张（右指针）

```js
function lengthOfLongestSubstring(s) {
  let len = s.length;
  let result = 0;

  let set = new Set();
  // 左指针用来收缩窗口
  let left = 0;
  // 右指针用来扩张窗口
  let right = 0;

  while (left < len) {
    // 如果不重复，就不断扩张窗口，元素添加到set中
    while (right < len && !set.has(s[right])) {
      set.add(s[right]);
      right++;
    }
    // 到这里说明有元素重复了，先记录子串长度，然后收缩窗口
    result = Math.max(result, right - left);
    // 收缩窗口
    set.delete(s[left]);
    left++;
  }
  return result;
}
```





## 打印螺旋矩阵





### [45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/solution/jian-zhi-offer-45-ba-shu-zu-pai-cheng-zu-580q/)



#### [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

> Top K

- 排序，取第 `k` 个
- 构造前 `k` 个最大元素小顶堆，取堆顶



- 时间复杂度：`O(nlogn)`	空间复杂度：`O(logn)`

```js
let findKthLargest = function(nums, k) {
    return nums.sort((a, b) => b - a)[k-1];
};
```



- 从数组中取前 k 个数（ 0 到 k-1 位），构造一个小顶堆
- 从 k 位开始遍历数组，每一个数据都和小顶堆的堆顶元素进行比较，如果小于堆顶元素，则不做任何处理，继续遍历下一元素；如果大于堆顶元素，则将这个元素替换掉堆顶元素，然后再堆化成一个小顶堆。
- 遍历完成后，堆顶的数据就是第 K 大的数据



[写给前端同学的题解，一文讲懂堆排序，解决topK问题](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/xie-gei-qian-duan-tong-xue-de-ti-jie-yi-kt5p2/)

#### [146. LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/)

- 用`map`保存`key`
- `get` 有`key` 缓存`value` 删掉 `key` 再 `set`一遍
- `put` 有`key` 删掉 重新`set` 超出内存 删掉第一个`key`

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.map.has(key)){
        let temp=this.map.get(key)
         this.map.delete(key);
         this.map.set(key, temp);
         return temp
    }else{
        return -1
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.map.has(key)){
        this.map.delete(key);
    }
    this.map.set(key,value);
    if(this.map.size > this.capacity){
     
        this.map.delete(this.map.keys().next().value);
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

