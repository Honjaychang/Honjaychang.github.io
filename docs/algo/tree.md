# 树

## 深度优先搜索 DFS

![tree](https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/dfsTree.png)

[在线绘图](http://mshang.ca/syntree/) `[1 [2  [4] [5 [6 [8][x]] [7] ] ] [3 ]`    `x 不存在 只是代表8 是左节点`



- 前序 `1 2 4 5 6 8 7 3`
- 中序 `4 2 8 6 5 7 1 3`
- 后序 `4 8 6 7 5 2 3 1`



#### 前序遍历

#### 中序遍历

#### 后序遍历

从树的根节点，一直沿一条路走到底 然后回退到分岔节点继续走到底

栈

先将根入栈

while栈不空？

栈顶元素pop 同时放进res数组 并判断当前元素是否有左右节点 并且先放入右节点 再将左节点入栈



```js
let res = []
if(root === null) return res
let stack = []
stack.push(root)
while(stack.length>0){
  let current = stack.pop()
  res.push(current)
  if(current.right !== null) stack.push(current.right)
  if(current.left !== null) stack.push(current.left)
}
return res
```

## 广度优先搜索 BFS

#### 层次遍历

```js
let res = []
if(root === null) return res
let queue = []
queue.push(root)
while(queue.length>0){
  let current = queue.shift()
  res.push(current)
  if(current.left !== null) queue.push(current.left)
  if(current.right !== null) queue.push(current.right)
}
```





层序遍历 102

队列

判断当前元素有没有左右节点 有的话推出自己同时将左右节点加入新的队列



```js
const queue = []
queue.push(root)
while(queue.length > 0){
  let layerGroup = []
  let len = queue.length
  for(let i = 0;i<len;i++){
    let target = queue.shift()
    layerGroup.push(target)
    if(target.left) queue.push(target.left)
    if(target.right) queue.push(target.right)
  }
  res.push(layerGroup)
}
return res
```



层次遍历 107

```js
res.unshift(layerGroup)
```



二叉树的右视图 199

相当于层序遍历后 取每一个数组的最后一个元素





二叉树的最近公共祖先 | LCA DFS 236

```js
// 最近公共祖先 => LCA
var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) return root
  // 问题 缩小 递归遍历 左右
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  // 如果 left right 都有值 证明根节点就是它们的 LCA
  if (left && right) return root
  // 如果只有一边有值 就递归缩小 再次调用
  return left ? left : right
}

```





```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
144 qian
var preorderTraversal = function(root) {
    let res = []
    if(!root) return res
    const order = (node) => {
        res.push(node.val)
        if(node.left !== null) order(node.left)
        if(node.right !== null) order(node.right)
    }
    order(root)
    return res
};

    stack.push(root)
    while(stack.length>0){
        let current = stack.pop()
        res.push(current.val)
        if(current.right !== null) stack.push(current.right)
        if(current.left !== null) stack.push(current.left)
    }

94
		let stack = []
    let temp = root
    while(temp !== null){
        stack.push(temp)
        temp = temp.left
    }
    while(stack.length>0){
        let current = stack.pop()
        res.push(current.val)
        if(current.right !== null){
            let temp2 = current.right
            while(temp2 !== null){
                stack.push(temp2)
                temp2 = temp2.left
            }
        }
    }
//145
		let stack = []
    let temp = root
    while(temp !== null){
        stack.push(temp)
        temp = temp.left
    }
    let prev = null
    while(stack.length>0){
        const top = stack[stack.length -1]
        if(top.right === null){
            prev = stack.pop()
            res.push(top.val)
        }else{
            if(prev !== top.right){
                let temp2 = top.right
                while(temp2 !== null){
                    stack.push(temp2)
                    temp2 = temp2.left
                }
            }else{
                prev = stack.pop()
                res.push(top.val)
            }
        }
    }


function maxDeepth(root){
    if(!root) return 0
    let left = maxDeepth(root.left)
    let right = maxDeepth(root.right)
    return Math.max(left,right)+1
}
```



## 二叉树反转