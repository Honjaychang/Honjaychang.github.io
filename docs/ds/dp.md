# 动态规划

## [10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

## [10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

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

## [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

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

## [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

```js
var isValid = function(s) {
    if(s.length %2 !== 0) return false
    // 后进先出

//用字典映射大小括号，采用栈顶元素与当前元素比较，匹配则抵消，继续下一个，不匹配则return false；如果循环完毕，看栈中是为空；为空则完全匹配，否则为无效；

    let stack = []
    const map = new Map()
    map.set('(',')')
    map.set('[',']')
    map.set('{','}')
    for(let i = 0;i<s.length;i++){
        if(map.has(s[i])){
            // has属性主要针对的是键
            stack.push(s[i])
        }else{
            const stackTop = stack[stack.length - 1] 
            if(map.get(stackTop) === s[i]){
                stack.pop()
            }else{
                return false
            }
        }
    }
    // 判断标准为最后是不是为空
    return stack.length === 0;
};
```

