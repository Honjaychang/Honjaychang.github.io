(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[263],{3905:function(t,e,n){"use strict";n.d(e,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var p=r.createContext({}),c=function(t){var e=r.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},u=function(t){var e=c(t.components);return r.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,a=t.originalType,p=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),m=c(n),f=i,g=m["".concat(p,".").concat(f)]||m[f]||s[f]||a;return n?r.createElement(g,l(l({ref:e},u),{},{components:n})):r.createElement(g,l({ref:e},u))}));function f(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var a=n.length,l=new Array(a);l[0]=m;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:i,l[1]=o;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6280:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return u},default:function(){return m}});var r=n(2122),i=n(9756),a=(n(7294),n(3905)),l=["components"],o={},p="\u6392\u5e8f",c={unversionedId:"algo/sort",id:"algo/sort",isDocsHomePage:!1,title:"\u6392\u5e8f",description:"Ref",source:"@site/docs/algo/sort.md",sourceDirName:"algo",slug:"/algo/sort",permalink:"/docs/algo/sort",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"\u6570\u636e\u7ed3\u6784",permalink:"/docs/algo/basic"},next:{title:"sword",permalink:"/docs/algo/sword"}},u=[{value:"\u5192\u6ce1",id:"\u5192\u6ce1",children:[]},{value:"\u5feb\u6392",id:"\u5feb\u6392",children:[]},{value:"\u63d2\u5165",id:"\u63d2\u5165",children:[]},{value:"\u9009\u62e9",id:"\u9009\u62e9",children:[]}],s={toc:u};function m(t){var e=t.components,n=(0,i.Z)(t,l);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u6392\u5e8f"},"\u6392\u5e8f"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Ref")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/hustcc/JS-Sorting-Algorithm"},"JS-Sorting-Algorithm")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://my729.github.io/blog/algorithm/#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F"},"\u56fe\u6e90")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://segmentfault.com/a/1190000010413296"},"\u524d\u7aef\u9762\u8bd5\u5fc5\u5907\u4e4b\u5341\u5927\u7ecf\u5178\u6392\u5e8f\u7b97\u6cd5"))),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/compare.png",alt:"\u6392\u5e8f\u7b97\u6cd5\u5bf9\u6bd4"})),(0,a.kt)("h2",{id:"\u5192\u6ce1"},"\u5192\u6ce1"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u65f6\u95f4\u590d\u6742\u5ea6\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"O(n^2)")),(0,a.kt)("li",{parentName:"ul"},"\u6bd4\u8f83\u76f8\u90bb\u4e24\u4e2a\u6570\u7684\u5927\u5c0f \u4ea4\u6362\u987a\u5e8f")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/bubbling.gif",alt:"\u5192\u6ce1\u6392\u5e8f"})),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]\n\nfunction bubbleSort(arr) {\n  let len = arr.length\n  for (let i = 0; i < len - 1; i++) {\n    for (let j = 0; j < len - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]\n      }\n    }\n  }\n  return arr\n}\n")),(0,a.kt)("h2",{id:"\u5feb\u6392"},"\u5feb\u6392"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u65f6\u95f4\u590d\u6742\u5ea6\u5e73\u5747\u662f ",(0,a.kt)("inlineCode",{parentName:"li"},"O(nlog(n))")," \u6700\u5dee\u662f ",(0,a.kt)("inlineCode",{parentName:"li"},"O(n^2)")),(0,a.kt)("li",{parentName:"ul"},"\u901a\u8fc7\u9009\u62e9\u4e00\u4e2a\u57fa\u51c6\uff08\u5982\u7b2c\u4e00\u4e2a\u6570  ",(0,a.kt)("inlineCode",{parentName:"li"},"i=0 j=length-1")," \u5c06\u6bd4\u57fa\u51c6\u5c0f\u7684\u653e\u5728\u5de6\u8fb9 \u6bd4\u57fa\u51c6\u5927\u7684\u653e\u5728\u53f3\u8fb9"),(0,a.kt)("li",{parentName:"ul"},"\u4ece\u9700\u8981\u6392\u5e8f\u7684\u6570\u91cc\u9762\u968f\u4fbf\u627e\u51fa\u4e00\u4e2a\uff0c\u7136\u540e\uff0c\u628a",(0,a.kt)("strong",{parentName:"li"},"\u6bd4\u8fd9\u4e2a\u6570\u5c0f\u7684\u653e\u5728\u8fd9\u4e2a\u6570\u5de6\u8fb9\uff0c\u6bd4\u8fd9\u4e2a\u6570\u5927\u7684\u653e\u5728\u8fd9\u4e2a\u6570\u53f3\u8fb9\uff0c\u4e00\u6837\u5927\u7684\u548c\u8fd9\u4e2a\u6570\u653e\u5728\u4e00\u8d77"),"\uff0c\u6700\u540e\uff0c",(0,a.kt)("strong",{parentName:"li"},"\u5de6\u53f3\u4e24\u8fb9\u5404\u81ea\u91cd\u590d\u4e0a\u8ff0\u8fc7\u7a0b"),"\uff0c\u76f4\u5230\u5de6\u8fb9\u6216\u53f3\u8fb9\u53ea\u5269\u4e0b\u4e00\u4e2a\u6570\uff08\u6216\u96f6\u4e2a\u6570\uff09\u65e0\u6cd5\u7ee7\u7eed\u4e3a\u6b62\u3002")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/quickSortDemo.jpg",alt:"\u5feb\u901f\u6392\u5e8f\u6848\u4f8b"})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/quickSort.gif",alt:"\u5feb\u901f\u6392\u5e8f"})),(0,a.kt)("h4",{id:"\u962e\u4e00\u5cf0es6"},"\u962e\u4e00\u5cf0ES6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"var quickSort = function (arr) {\n  if (arr.length <= 1) return arr\n\n  var pivotIndex = Math.floor(arr.length / 2)\n  var pivot = arr.splice(pivotIndex, 1)[0]\n\n  let left = arr.filter((item) => item < pivot)\n  let right = arr.filter((item) => item > pivot)\n\n  return quickSort(left).concat([pivot], quickSort(right))\n}\n")),(0,a.kt)("h4",{id:"\u539f\u5730\u6392\u5e8f"},"\u539f\u5730\u6392\u5e8f"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"var quickSort = function (arr, left, right) {\n  // \u5982\u679c\u5de6\u8fb9\u754c\u6bd4\u53f3\u8fb9\u754c\u5927\uff0c\u8fd4\u56de\u7ed3\u679c\uff0c\u6392\u5e8f\u7ed3\u675f\n  if (left > right) return\n\n  // \u9ed8\u8ba4\u503c\u5904\u7406\uff0c\u5982\u679c\u6709\u4f20\u5165left\u548cright\u53c2\u6570\uff0c\u5c31\u8d4b\u503c\u8fd9\u4e2a\u53c2\u6570\uff0c\u5426\u5219\u5c31\u8d4b\u503c\u540e\u9762\u7684\u9ed8\u8ba4\u503c\n  left = left || 0\n  right = right || arr.length - 1\n\n  // \u5b9a\u4e49\u79fb\u52a8\u7684\u5de6\u6e38\u6807\u548c\u53f3\u6e38\u6807\n  var leftPoint = left\n  var rightPoint = right\n\n  // \u5b9a\u4e49\u4e00\u4e2a\u57fa\u51c6\u6570\n  var temp = arr[left]\n\n  // \u5224\u65ad\u5de6\u53f3\u6e38\u6807\u662f\u5426\u91cd\u5408\uff0c\u5982\u679c\u91cd\u5408\uff0c\u5faa\u73af\u7ed3\u675f\n  while (leftPoint != rightPoint) {\n    while (arr[rightPoint] >= temp && leftPoint < rightPoint) rightPoint--\n\n    while (arr[leftPoint] <= temp && leftPoint < rightPoint) leftPoint++\n\n    // \u5982\u679c\u5de6\u6e38\u6807\u5c0f\u4e8e\u53f3\u6e38\u6807\uff0c\u5219\u4ea4\u6362\u4e24\u4e2a\u6570\u5b57\u7684\u4f4d\u7f6e\n    if (leftPoint < rightPoint) {\n      ;[arr[leftPoint], arr[rightPoint]] = [arr[rightPoint], arr[leftPoint]]\n    }\n    // \u8fdb\u884c\u4e0b\u4e00\u6b21\u5faa\u73af\uff0c\u76f4\u5230\u4e24\u4e2a\u6e38\u6807\u91cd\u5408\u4f4d\u7f6e\n  }\n\n  // \u91cd\u5408\u4e4b\u540e\uff0c\u4ea4\u6362\u57fa\u51c6\u6570\n  arr[left] = arr[leftPoint]\n  arr[leftPoint] = temp\n\n  // \u9012\u5f52\u64cd\u4f5c\u5de6\u53f3\u4e24\u4e2a\u6570\u7ec4\n  quickSort(arr, left, leftPoint - 1)\n  quickSort(arr, leftPoint + 1, right)\n\n  return arr\n}\nconsole.log(quickSort([46, 30, 82, 90, 56, 17, 95, 15]))\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Ref")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html"},"\u5feb\u901f\u6392\u5e8f\uff08Quicksort\uff09\u7684Javascript\u5b9e\u73b0")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.jianshu.com/p/2f542730ebe6"},"\u7528javascript\u5b9e\u73b0\u5feb\u901f\u6392\u5e8f\uff08\u539f\u5730\u6392\u5e8f\uff09"))),(0,a.kt)("h2",{id:"\u63d2\u5165"},"\u63d2\u5165"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u4f3c\u4e8e\u6251\u514b\u724c\u7684\u63d2\u5165\u64cd\u4f5c \u548c\u8fd9\u4e2a\u6570\u636e\u524d\u9762\u7684\u6570\u636e\u5bf9\u6bd4\u786e\u5b9a\u4f4d\u7f6e")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/blog/insert.gif",alt:"\u63d2\u5165\u6392\u5e8f"})),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"function insertSort(list = []) {\n    for(let i = 1 , len = list.length; i < len; i++){\n        let j = i - 1;\n        let temp = list[ i ];\n        while (j >= 0 && list[ j ] > temp){\n            list[j + 1] = list[ j ];\n            j = j - 1;\n        }\n        list[j + 1] = temp;\n    }\n    return list;\n}\n\nfunction insertSort(arr) {\n  let len = arr.length;\n  let preIndex, current;\n  for (let i = 1; i < len; i++) {\n    preIndex = i - 1;\n    current = arr[i];\n    while (preIndex >= 0 && arr[preIndex] > current) {\n      arr[preIndex + 1] = arr[preIndex];\n      preIndex--;\n    }\n    arr[preIndex + 1] = current;\n  }\n  return arr;\n}\n")),(0,a.kt)("h2",{id:"\u9009\u62e9"},"\u9009\u62e9"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u627e\u51fa \u6570\u7ec4\u4e2d\u6700\u5c0f\u7684\u6570 \u4ea4\u6362\u4f4d\u7f6e \u4f9d\u6b21\u627e\u51fa \u66ff\u6362\u4f4d\u7f6e")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/select.gif",alt:"\u9009\u62e9\u6392\u5e8f"})),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"function selectSort(arr) {\n  let minIndex\n  for (let i = 0, len = arr.length; i < len - 1; i++) {\n    minIndex = i\n    for (let j = i + 1; j < len; j++) {\n      if (arr[j] < arr[minIndex]) minIndex = j\n    }\n    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]\n  }\n  return arr\n}\n")))}m.isMDXComponent=!0}}]);