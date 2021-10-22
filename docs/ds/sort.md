# 排序

:::note Ref`

- [JS-Sorting-Algorithm](https://github.com/hustcc/JS-Sorting-Algorithm)
- [图源](https://my729.github.io/blog/algorithm/#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
- [前端面试必备之十大经典排序算法](https://segmentfault.com/a/1190000010413296)

:::

![排序算法对比](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211019221602.png)

## 冒泡

- 时间复杂度：`O(n^2)` 	空间复杂度为`O(1)`
- 比较相邻两个元素的大小，如果第一个比第二个大，就交换它们
- 从头遍历到尾部，当一轮遍历完后，数组最后一个元素是最大的
- 除去最后一个元素，对剩下的元素重复执行上面的流程，每次找出剩余元素中最大的
- 遍历完后，数组是升序的

![冒泡排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211019221648.gif)

```js
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
```

## 快排

- 时间复杂度平均是 `O(nlog(n))` 最差是 `O(n^2)`
- 通过选择一个基准（如第一个数  `i=0 j=length-1` 将比基准小的放在左边 比基准大的放在右边
- 从需要排序的数里面随便找出一个，然后，把**比这个数小的放在这个数左边，比这个数大的放在这个数右边，一样大的和这个数放在一起**，最后，**左右两边各自重复上述过程**，直到左边或右边只剩下一个数（或零个数）无法继续为止。

![快速排序案例](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211019221727.jpg)

![快速排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211019221737.gif)

### 阮一峰ES6

```js
var quickSort = function (arr) {
  if (arr.length <= 1) return arr

  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]

  let left = arr.filter((item) => item <= pivot)
  let right = arr.filter((item) => item > pivot)

  return quickSort(left).concat([pivot], quickSort(right))
}
```

### 原地排序

```js
var quickSort = function (arr, left, right) {
  // 如果左边界比右边界大，返回结果，排序结束
  if (left > right) return

  // 默认值处理，如果有传入left和right参数，就赋值这个参数，否则就赋值后面的默认值
  left = left || 0
  right = right || arr.length - 1

  // 定义移动的左游标和右游标
  var i = left
  var j = right

  // 定义一个基准数
  var temp = arr[left]

  // 判断左右游标是否重合，如果重合，循环结束
  while (i < j) {
    while (arr[j] >= temp && i < j) j--

    while (arr[i] <= temp && i < j) i++

    // 如果左游标小于右游标，则交换两个数字的位置
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    // 进行下一次循环，直到两个游标重合位置
  }

  // 重合之后，交换基准数
  arr[left] = arr[i]
  arr[i] = temp

  // 递归操作左右两个数组
  quickSort(arr, left, leftPoint - 1)
  quickSort(arr, leftPoint + 1, right)

  return arr
}
console.log(quickSort([46, 30, 82, 90, 56, 17, 95, 15]))
```

`Ref`

- [快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)
- [用javascript实现快速排序（原地排序）](https://www.jianshu.com/p/2f542730ebe6)

## 插入

- 类似于扑克牌的插入操作 和这个数据前面的数据对比确定位置
- 将数组前面部分看做有序数组
- 每次将后面部分的第一个与已排序数组作比较，插入到合适的位置
- 有序数组初始状态有1个数字

![插入排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211019221837.gif)

```js
const insertSort = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1;
    let cur = nums[i];
    while (j >= 0 && nums[j] > cur) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = cur;
  }
  return nums;
};
```

## 选择

- 找出 数组中最小的数 交换位置 依次找出 替换位置

![选择排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/20211019221900.gif)

```js
function selectSort(arr) {
  let minIndex
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
```

> tmp

```js
设有n个待排序的记录关键字，则在堆排序中需要（1）个辅助记录单元

只需要一个辅助空间，可命名为temp，记录当前操作的二叉树上的根结点的数值


稳定算法：冒泡排序、插入排序、归并排序、基数排序
不稳定算法：选择排序、希尔排序、堆排序、快速排序





浏览器是多进程的，每打开一个Tab页，就相当于创建了一个独立的浏览器进程。
```

