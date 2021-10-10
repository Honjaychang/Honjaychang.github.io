# 栈

## 逆波兰表达式

1. 循环扫描语法单元的项目。
2. 如果扫描的项目是操作数，则将其压入操作数堆栈，并扫描下一个项目。
3. 如果扫描的项目是一个二元运算符，则对栈的顶上两个操作数执行该运算。
4. 如果扫描的项目是一个一元运算符，则对栈的最顶上操作数执行该运算。
5. 将运算结果重新压入堆栈。
6. 重复步骤 2-5，堆栈中即为结果值。

从左向右遍历一组数字，如果遇到`+-*/` 那么就逆序拿出运算符左边的2个数字进行运算，运算完之后继续放里面，继续遍历循环，直到结束，前提是要遵守最基本的四则运算。

```js
var evalRPN = function (tokens) {
  // 定义一个数组栈
  let stack = [];
  for (let item of tokens) {
    switch (item) {
      case '+':
        stack.push(stack.pop() + stack.pop());
        break;
      case '-':
        stack.push(-stack.pop() + stack.pop());
        break;
      case '*':
        stack.push(stack.pop() * stack.pop());
        break;
      case '/':
        let right = stack.pop();
        stack.push(parseInt(stack.pop() / right));
        break;
      default:
        stack.push(parseInt(item));
    }
  }
  return parseInt(stack.pop());
};
var data = ["2", "1", "+", "3", "*"];
console.log(evalRPN(data)); // 9
```

## [09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

> 入队栈 和 出队栈

一个为入队栈，一个为出队栈，各自负责入队和出队。入队操作，直接压入入队栈即可，出队操作需要优先检查出队栈是否有数据，若无，需要从入队栈倒入后再操作。

```js
var CQueue = function() {
    this.stackA = [];
    this.stackB = [];
};

CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value);
};

CQueue.prototype.deleteHead = function() {
    if(this.stackB.length){
        return this.stackB.pop();
    }else{
        while(this.stackA.length){
            this.stackB.push(this.stackA.pop());
        }
        if(!this.stackB.length){
            return -1;
        }else{
            return this.stackB.pop();
        }
    }
};
```

> 没通过

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
