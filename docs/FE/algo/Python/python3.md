# 基础知识

```python
# 定义函数
def function(a,b):
	print(a+b)

function(2,2)

# 默认参数	需要将默认参数的值放在后面否则会报错
def function(a,b=1):
	print(a+b)

function(2,2)>>>4
function(2,)>>>3
```

```python
# 局部和全局变量
def fun():
  global a
  a = 20
  return a

print(fun())
print(a)# 直接运行print(a)会报错 必须要先运行函数？
```

```python
# 文件读写

```

```python
# 类		类名大写
class Calculator:
  name='Good calculator'
  price=18
  def __init__(self,name,price):
    self.name = name
    self.price = price
  def add(self,x,y):
    print(self.name)
    res = x+y
    print(res)
  def minus(self,x,y):
    print(x-y)
calcul = Calculator()# 应该就是创建实例吧
calcul.name #调用属性

#init
calcul = Calculator('bad calculator',10)#上面定义的相当于默认参数  也可以写在__init__里面

```

```python
a = input('input: ')#返回值是str  做判断的时候 要么转换成字符串。要么转换成整数
input:

a = int(input('input: '))
```

```python
# tuple list set

```

```python
# zip lambda map

a = [1,2,3]
b = [4,5,6]
list(zip(a,b))#[(1, 4), (2, 5), (3, 6)]
for i,j in zip(a,b):
	print(i,j)
1 4
2 5
3 6

fun = lambda x,y:x+y
fun(2,3)#5

#map 不能直接用整数去相加嘛  （只能用数组去叠加）
list(map(fun,[1],[2]))#[3]
list(map(fun,[1,2],[2,4]))#[3,6]
```

```python
# 浅复制 深复制
copy deepcopy

b=a. 相当于引用？ 内存地址相等
浅拷贝，拷贝父对象不会拷贝子对象，深拷贝的话完全拷贝父及子对象？
因为：copy只会复制父对象，而子对象是共用的；（共用就代表他们的地址是一样的）
deepcopy完全复制所有的父对象和子对象（两者地址毫无关系了，改变其一对另外一个没有任何影响）
```

```python

```

#### 常用特性

```python
# 数组初始化

# 初始化一个长度为 N 的一维数组
Array = [0] * N

# 初始化一个形状为 MxN 的二维数组(矩阵)
Matrix = [[0] * N for _ in range(M)] # 思考：可以写成 [[0] * N] * M 吗？



# 交换元素值
a, b = b, a


# 连续不等式或等式
# 判断 a，b，c 是否相等，Python里可以直接写连等
if a == b == c:
    return True

# 不等式也可以
if a <= b < c:
    return True
```

```python

```

```python
TypeError: ‘int’ object is not iterable，
#原因是循环中使用的应该是一组数

for i in len(A)
改成
for i in range(len(A))
```
