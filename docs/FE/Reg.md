## 正则

#### 元字符

- `/Code/ig`
- `i ==> 忽略大小写`
- `g ==> 全局搜索`
- `m ==> 多行`
- `y ===> 粘滞匹配`

#### 修饰语

- `/A|B/ ==> 多个匹配 匹配|前后任意字符`
- `.`  通配符 在前面后面都可以好像

```js
let hugStr = 'Bear hug'
let huRegex = /hu./
hugStr.match(huRegex) 
// ["hug", index: 5, input: "Bear hug", groups: undefined]
hugStr.match(hug).length // 1
```

- 将单个字符与多种可能性匹配
  - `[] ==> 匹配方括号内的任意字符。比如 [0-9] 就可以用来匹配任意数字`

```js
let bgRegex = /b[aiu]g/ //匹配bag、big、bug

let bgRegex = /[a-e]at/ //匹配aat、bat、……、eat

let myRegex = /[a-z0-9]/gi
```

- 匹配字符串的开头  结尾
  - `^ ==> ^9，这样使用代表匹配以 9 开头`
  - `$`

```js
let firstString = 'Ricky is first and can be found'
let firstRegex = /^Ricky/
//let lastRegex = /found$/;
firstRegex.test(firstString) // true
```

- 否定字符集
  - `[^] ==> [^9]，这样使用代表不匹配方括号内除了 9 的字符`

```js
;/[^aeiou]/gi元匹字所有符配非音
```

- `+ ==> 只匹配出现 1 次及以上 + 前的字符`

```js
/*匹配出现1次或多次的字符*/
/a+/g会在"abc"中匹配到一个匹配项，并且返回["a"]。
```

- `* ==> 只匹配出现 0 次及以上 * 前的字符`

```js
/*匹配出现0次或多次的字符*/
let chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
let chewieRegex = /Aa*/;
let result = chewieQuote.match(chewieRegex);
console.log(result)；//Aaaaaaaaaaaaaaaa
```

- 

```js
/*用惰性匹配来查找字符*/
//贪婪   匹配到适合该匹配模式的最大子字符串。
/t[a-z]*i/   "titanic"   ====> ["titani"]
//懒惰
/t[a-z]*?i/  "titanic"   ====> ["ti"]
```

- `{1, 2} ==> 匹配 1 到 2 位字符`

```js
/*利用数量说明符匹配上下限*/
let A4 = 'haaaah'
let A2 = 'haah'
let A100 = 'h' + 'a'.repeat(100) + 'h'
let multipleA = /ha{3,}h/
//let multipleA = /ha{3,5}h/;
//let multipleA = /ha{3}h/;
multipleA.test(A4) // Returns true
multipleA.test(A2) // Returns false
multipleA.test(A100) // Returns true
```

- `? ==> ? 之前字符可选`

```js
/*利用？来表面字母的不确定部分*/
let american = 'color'
let british = 'colour'
let rainbowRegex = /colou?r/
rainbowRegex.test(american) // Returns true
rainbowRegex.test(british) // Returns true
```

- 先行断言

```js
let quit = 'qu'
let noquit = 'qt'
let quRegex = /q(?=u)/ //正向
let qRegex = /q(?!u)/ //负向
quit.match(quRegex) // Returns ["q"]
noquit.match(qRegex) // Returns ["q"]
```

- 

```js
/*捕获组重用模式*/
//匹配任意两个被空格分割的单词
let repeatStr = 'regex regex'
let repeatRegex = /(\w+)\s\1/
repeatRegex.test(repeatStr) // Returns true
repeatStr.match(repeatRegex) // Returns ["regex regex", "regex"]
```

- 

```js
/*捕获组搜索和替换*/
let wrongText = 'The sky is silver.'
let silverRegex = /silver/
wrongText.replace(silverRegex, 'blue')
// Returns "The sky is blue."

'Code Camp'.replace(/(\w+)\s(\w+)/, '$2 $1')
// Returns "Camp Code"

// Replace low-upper case to low-space-uppercase
str = str.replace(/([a-z])([A-Z])/g, '$1 $2')
```

- 

```js
/*删除开头和结尾的空白*/
let hello = '   Hello, World!  '
let wsRegex = /^\s+|\s+$/g // 修改这一行
let result = hello.replace(wsRegex, '') // 修改这一行
console.log(result)
```

- 

```js
/*一个案列来理解有+和无*/
let quoteSample = 'The five boxing wizards jump quickly.'
let alphabetRegexV2 = /[A-Za-z0-9]+/g // 修改这一行
let result = quoteSample.match(alphabetRegexV2)
console.log(result)
//有+    The,five,boxing,wizards,jump,quickly
//无+    T,h,e,f,i,v,e,b,o,x,i,n,g,w,i,z,a,r,d,s,j,u,m,p,q,u,i,c,k,l,y
```

- `(yck) ==> 只匹配和 yck 相同字符串`

#### 字符简写

- `\d ==> 匹配数字`
  -  `/\d/ === /[0-9]/`
- `\D ==> 除数字外的任意字符` 
  - `/\D/ === /[^0-9]/`
- `\w ==> 匹配字母数字或下划线` 
  - `/[A-Za-z0-9_]/`
- `\W ==> 非单词字符`
  -  `/[^A-Za-z0-9_]/`
- `\s ==> 匹配任意的空白符`
  -  `/\s/ === /[\r\t\f\n\v]/`
  -  `\r ==> 匹配一个回车符 \t ==>匹配一个制表符 \f ==>匹配一个换页符 \n ==>匹配一个换行符/`
- `\S ==> 非空白符`
  -  `/\S/ === /[^\r\t\f\n\v]/`
- `. ==> 匹配任意字符除了换行符、回车符、行分隔符和段分隔符`
- `\b ==> 匹配单词的开始或结束`
- `\B ==> 和上面相反`

#### 量词

- `{m,}` 至少出现 `m` 次
- `{m}` 等价于 `{m,m}` 出现 `m` 次
- `?` 等价于 `{0,1}` 出现 or 不出现
- `+` 等价于 `{1,}` 出现至少一次
- `*` 等价于 `{0,}` 出现任意次 有可能不出现

#### `match() test()`

```js
//match() & test() 刚好反过来
let testStr = 'freeCodeCamp'
let testRegex = /Code/
testRegex.test(testStr) //true

let ourStr = 'Regular expressions'
let ourRegex = /expressions/
ourStr.match(ourRegex) //["expressions"]
```



