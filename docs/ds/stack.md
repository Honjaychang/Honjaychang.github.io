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

