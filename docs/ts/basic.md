:::note Ref

- [Typescript 中的 interface 和 type 到底有什么区别](https://juejin.cn/post/6844903749501059085)

:::

感叹号是非 null 和非 undefined 的类型断言

```ts
const fn = (arr: Array<number>): number[] => {};
const fn = (arr: number[]): number[] => {};
```
