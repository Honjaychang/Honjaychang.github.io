:::note Ref

- [Typescript 中的 interface 和 type 到底有什么区别](https://juejin.cn/post/6844903749501059085)
- [TypeScript 速成教程](https://github.com/joye61/typescript-tutorial)

:::

感叹号是非 null 和非 undefined 的类型断言

```ts
const fn = (arr: Array<number>): number[] => {};
const fn = (arr: number[]): number[] => {};

范型数组
```

**可选参数必须位于必选参数之后**



对象字面量在**直接赋值**的时候，编译器会检查字面量类型是否**完全匹配**，多一个或少一个属性都会报错



在ES6中，实例属性和静态属性不能直接定义在类内部

```ts
class Greeter {
  constructor(){
    // 正确，ES6中实例属性只能定义在构造器内部
    this.greeting = 'world';
  }
}
// 正确，ES6中静态属性只能定义在类外部
Greeter.greeting = 'world';



TS

class Greeter {
  // 定义实例属性并初始化
  greeting: string = 'world';

  // 定义静态属性并初始化
  static greeting: string = 'world';
}
```



类成员包括：

- 实例属性
- 静态属性
- 实例方法
- 静态方法
- 构造函数
- getter/setter



可以使用 `readonly` 关键字将属性设置为只读的。 只读属性**必须**在**声明时**或**构造函数里**被初始化



as 断言





```
type 别名 = 类型 ;
```

别名不会创建一个新的类型，它只是原类型的一个引用，和原类型**完全等价**，

类型断言用来明确告诉编译器一个值的类型，**相当于类型转换**，断言有两种语法格式：

```
// 1、尖括号语法
<类型表达式>值    在左边

// 2、as语法
值 as 类型表达式


(<Circle>circle).showColor()

尖括号 <> 的运算符优先级低于点号 . ，因而必须用括号将断言表达式扩起来
```
