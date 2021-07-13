(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2104],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return h}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,o=e.originalType,i=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),f=p(n),h=l,m=f["".concat(i,".").concat(h)]||f[h]||c[h]||o;return n?r.createElement(m,u(u({ref:t},s),{},{components:n})):r.createElement(m,u({ref:t},s))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=n.length,u=new Array(o);u[0]=f;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:l,u[1]=a;for(var p=2;p<o;p++)u[p]=n[p];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4104:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return s},default:function(){return f}});var r=n(2122),l=n(9756),o=(n(7294),n(3905)),u=["components"],a={},i="\u6811",p={unversionedId:"algo/tree",id:"algo/tree",isDocsHomePage:!1,title:"\u6811",description:"\u6df1\u5ea6\u4f18\u5148\u641c\u7d22 DFS",source:"@site/docs/algo/tree.md",sourceDirName:"algo",slug:"/algo/tree",permalink:"/docs/algo/tree",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"sword",permalink:"/docs/algo/sword"},next:{title:"\u5404\u79cd\u624b\u5199",permalink:"/docs/interview/hand"}},s=[{value:"\u6df1\u5ea6\u4f18\u5148\u641c\u7d22 DFS",id:"\u6df1\u5ea6\u4f18\u5148\u641c\u7d22-dfs",children:[]},{value:"\u5e7f\u5ea6\u4f18\u5148\u641c\u7d22 BFS",id:"\u5e7f\u5ea6\u4f18\u5148\u641c\u7d22-bfs",children:[]},{value:"\u4e8c\u53c9\u6811\u53cd\u8f6c",id:"\u4e8c\u53c9\u6811\u53cd\u8f6c",children:[]}],c={toc:s};function f(e){var t=e.components,n=(0,l.Z)(e,u);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u6811"},"\u6811"),(0,o.kt)("h2",{id:"\u6df1\u5ea6\u4f18\u5148\u641c\u7d22-dfs"},"\u6df1\u5ea6\u4f18\u5148\u641c\u7d22 DFS"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/honjaychang/bp/algo/dfsTree.png",alt:"tree"})),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"http://mshang.ca/syntree/"},"\u5728\u7ebf\u7ed8\u56fe")," ",(0,o.kt)("inlineCode",{parentName:"p"},"[1 [2  [4] [5 [6 [8][x]] [7] ] ] [3 ]"),"    ",(0,o.kt)("inlineCode",{parentName:"p"},"x \u4e0d\u5b58\u5728 \u53ea\u662f\u4ee3\u88688 \u662f\u5de6\u8282\u70b9")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u524d\u5e8f ",(0,o.kt)("inlineCode",{parentName:"li"},"1 2 4 5 6 8 7 3")),(0,o.kt)("li",{parentName:"ul"},"\u4e2d\u5e8f ",(0,o.kt)("inlineCode",{parentName:"li"},"4 2 8 6 5 7 1 3")),(0,o.kt)("li",{parentName:"ul"},"\u540e\u5e8f ",(0,o.kt)("inlineCode",{parentName:"li"},"4 8 6 7 5 2 3 1"))),(0,o.kt)("h4",{id:"\u524d\u5e8f\u904d\u5386"},"\u524d\u5e8f\u904d\u5386"),(0,o.kt)("h4",{id:"\u4e2d\u5e8f\u904d\u5386"},"\u4e2d\u5e8f\u904d\u5386"),(0,o.kt)("h4",{id:"\u540e\u5e8f\u904d\u5386"},"\u540e\u5e8f\u904d\u5386"),(0,o.kt)("p",null,"\u4ece\u6811\u7684\u6839\u8282\u70b9\uff0c\u4e00\u76f4\u6cbf\u4e00\u6761\u8def\u8d70\u5230\u5e95 \u7136\u540e\u56de\u9000\u5230\u5206\u5c94\u8282\u70b9\u7ee7\u7eed\u8d70\u5230\u5e95"),(0,o.kt)("p",null,"\u6808"),(0,o.kt)("p",null,"\u5148\u5c06\u6839\u5165\u6808"),(0,o.kt)("p",null,"while\u6808\u4e0d\u7a7a\uff1f"),(0,o.kt)("p",null,"\u6808\u9876\u5143\u7d20pop \u540c\u65f6\u653e\u8fdbres\u6570\u7ec4 \u5e76\u5224\u65ad\u5f53\u524d\u5143\u7d20\u662f\u5426\u6709\u5de6\u53f3\u8282\u70b9 \u5e76\u4e14\u5148\u653e\u5165\u53f3\u8282\u70b9 \u518d\u5c06\u5de6\u8282\u70b9\u5165\u6808"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let res = []\nif(root === null) return res\nlet stack = []\nstack.push(root)\nwhile(stack.length>0){\n  let current = stack.pop()\n  res.push(current)\n  if(current.right !== null) stack.push(current.right)\n  if(current.left !== null) stack.push(current.left)\n}\nreturn res\n")),(0,o.kt)("h2",{id:"\u5e7f\u5ea6\u4f18\u5148\u641c\u7d22-bfs"},"\u5e7f\u5ea6\u4f18\u5148\u641c\u7d22 BFS"),(0,o.kt)("h4",{id:"\u5c42\u6b21\u904d\u5386"},"\u5c42\u6b21\u904d\u5386"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let res = []\nif(root === null) return res\nlet queue = []\nqueue.push(root)\nwhile(queue.length>0){\n  let current = queue.shift()\n  res.push(current)\n  if(current.left !== null) queue.push(current.left)\n  if(current.right !== null) queue.push(current.right)\n}\n")),(0,o.kt)("p",null,"\u5c42\u5e8f\u904d\u5386 102"),(0,o.kt)("p",null,"\u961f\u5217"),(0,o.kt)("p",null,"\u5224\u65ad\u5f53\u524d\u5143\u7d20\u6709\u6ca1\u6709\u5de6\u53f3\u8282\u70b9 \u6709\u7684\u8bdd\u63a8\u51fa\u81ea\u5df1\u540c\u65f6\u5c06\u5de6\u53f3\u8282\u70b9\u52a0\u5165\u65b0\u7684\u961f\u5217"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const queue = []\nqueue.push(root)\nwhile(queue.length > 0){\n  let layerGroup = []\n  let len = queue.length\n  for(let i = 0;i<len;i++){\n    let target = queue.shift()\n    layerGroup.push(target)\n    if(target.left) queue.push(target.left)\n    if(target.right) queue.push(target.right)\n  }\n  res.push(layerGroup)\n}\nreturn res\n")),(0,o.kt)("p",null,"\u5c42\u6b21\u904d\u5386 107"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"res.unshift(layerGroup)\n")),(0,o.kt)("p",null,"\u4e8c\u53c9\u6811\u7684\u53f3\u89c6\u56fe 199"),(0,o.kt)("p",null,"\u76f8\u5f53\u4e8e\u5c42\u5e8f\u904d\u5386\u540e \u53d6\u6bcf\u4e00\u4e2a\u6570\u7ec4\u7684\u6700\u540e\u4e00\u4e2a\u5143\u7d20"),(0,o.kt)("p",null,"\u4e8c\u53c9\u6811\u7684\u6700\u8fd1\u516c\u5171\u7956\u5148 | LCA DFS 236"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// \u6700\u8fd1\u516c\u5171\u7956\u5148 => LCA\nvar lowestCommonAncestor = function (root, p, q) {\n  if (root === null || root === p || root === q) return root\n  // \u95ee\u9898 \u7f29\u5c0f \u9012\u5f52\u904d\u5386 \u5de6\u53f3\n  let left = lowestCommonAncestor(root.left, p, q)\n  let right = lowestCommonAncestor(root.right, p, q)\n  // \u5982\u679c left right \u90fd\u6709\u503c \u8bc1\u660e\u6839\u8282\u70b9\u5c31\u662f\u5b83\u4eec\u7684 LCA\n  if (left && right) return root\n  // \u5982\u679c\u53ea\u6709\u4e00\u8fb9\u6709\u503c \u5c31\u9012\u5f52\u7f29\u5c0f \u518d\u6b21\u8c03\u7528\n  return left ? left : right\n}\n\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n144 qian\nvar preorderTraversal = function(root) {\n    let res = []\n    if(!root) return res\n    const order = (node) => {\n        res.push(node.val)\n        if(node.left !== null) order(node.left)\n        if(node.right !== null) order(node.right)\n    }\n    order(root)\n    return res\n};\n\n    stack.push(root)\n    while(stack.length>0){\n        let current = stack.pop()\n        res.push(current.val)\n        if(current.right !== null) stack.push(current.right)\n        if(current.left !== null) stack.push(current.left)\n    }\n\n94\n        let stack = []\n    let temp = root\n    while(temp !== null){\n        stack.push(temp)\n        temp = temp.left\n    }\n    while(stack.length>0){\n        let current = stack.pop()\n        res.push(current.val)\n        if(current.right !== null){\n            let temp2 = current.right\n            while(temp2 !== null){\n                stack.push(temp2)\n                temp2 = temp2.left\n            }\n        }\n    }\n//145\n        let stack = []\n    let temp = root\n    while(temp !== null){\n        stack.push(temp)\n        temp = temp.left\n    }\n    let prev = null\n    while(stack.length>0){\n        const top = stack[stack.length -1]\n        if(top.right === null){\n            prev = stack.pop()\n            res.push(top.val)\n        }else{\n            if(prev !== top.right){\n                let temp2 = top.right\n                while(temp2 !== null){\n                    stack.push(temp2)\n                    temp2 = temp2.left\n                }\n            }else{\n                prev = stack.pop()\n                res.push(top.val)\n            }\n        }\n    }\n\n\nfunction maxDeepth(root){\n    if(!root) return 0\n    let left = maxDeepth(root.left)\n    let right = maxDeepth(root.right)\n    return Math.max(left,right)+1\n}\n")),(0,o.kt)("h2",{id:"\u4e8c\u53c9\u6811\u53cd\u8f6c"},"\u4e8c\u53c9\u6811\u53cd\u8f6c"))}f.isMDXComponent=!0}}]);