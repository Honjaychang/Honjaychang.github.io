# 排序

`Ref`

- [JS-Sorting-Algorithm](https://github.com/hustcc/JS-Sorting-Algorithm)
- [图源](https://my729.github.io/blog/algorithm/#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
- [前端面试必备之十大经典排序算法](https://segmentfault.com/a/1190000010413296)

![排序算法对比](https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/compare.png)

## 冒泡

- 时间复杂度：`O(n^2)`
- 比较相邻两个数的大小 交换顺序

![冒泡排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/bubbling.gif)

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

![快速排序案例](https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/quickSortDemo.jpg)

![快速排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/quickSort.gif)

#### 阮一峰ES6

```js
var quickSort = function (arr) {
  if (arr.length <= 1) return arr

  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]

  let left = arr.filter((item) => item < pivot)
  let right = arr.filter((item) => item > pivot)

  return quickSort(left).concat([pivot], quickSort(right))
}
```

#### 原地排序

```js
var quickSort = function (arr, left, right) {
  // 如果左边界比右边界大，返回结果，排序结束
  if (left > right) return

  // 默认值处理，如果有传入left和right参数，就赋值这个参数，否则就赋值后面的默认值
  left = left || 0
  right = right || arr.length - 1

  // 定义移动的左游标和右游标
  var leftPoint = left
  var rightPoint = right

  // 定义一个基准数
  var temp = arr[left]

  // 判断左右游标是否重合，如果重合，循环结束
  while (leftPoint != rightPoint) {
    while (arr[rightPoint] >= temp && leftPoint < rightPoint) rightPoint--

    while (arr[leftPoint] <= temp && leftPoint < rightPoint) leftPoint++

    // 如果左游标小于右游标，则交换两个数字的位置
    if (leftPoint < rightPoint) {
      ;[arr[leftPoint], arr[rightPoint]] = [arr[rightPoint], arr[leftPoint]]
    }
    // 进行下一次循环，直到两个游标重合位置
  }

  // 重合之后，交换基准数
  arr[left] = arr[leftPoint]
  arr[leftPoint] = temp

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

![插入排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/blog/insert.gif)

```js
function insertSort(list = []) {
    for(let i = 1 , len = list.length; i < len; i++){
        let j = i - 1;
        let temp = list[ i ];
        while (j >= 0 && list[ j ] > temp){
            list[j + 1] = list[ j ];
            j = j - 1;
        }
        list[j + 1] = temp;
    }
    return list;
}

function insertSort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
```

## 选择

- 找出 数组中最小的数 交换位置 依次找出 替换位置

![选择排序](https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/select.gif)

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

