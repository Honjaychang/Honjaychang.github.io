"use strict";(self.webpackChunkmy_test=self.webpackChunkmy_test||[]).push([[8126],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var u=a.createContext({}),p=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(n),d=l,k=m["".concat(u,".").concat(d)]||m[d]||s[d]||r;return n?a.createElement(k,i(i({ref:t},c),{},{components:n})):a.createElement(k,i({ref:t},c))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1929:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return u},metadata:function(){return p},toc:function(){return c},default:function(){return m}});var a=n(7462),l=n(3366),r=(n(7294),n(3905)),i=["components"],o={},u="Hooks",p={unversionedId:"react/hooks",id:"react/hooks",isDocsHomePage:!1,title:"Hooks",description:"- React Hooks \u8be6\u89e3 \u3010\u8fd1 1W \u5b57\u3011+ \u9879\u76ee\u5b9e\u6218",source:"@site/docs/react/hooks.md",sourceDirName:"react",slug:"/react/hooks",permalink:"/docs/react/hooks",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"router",permalink:"/docs/react/router"},next:{title:"\u4e00\u4e9b\u6982\u5ff5",permalink:"/docs/reactCore/basic"}},c=[{value:"<code>useState()</code>",id:"usestate",children:[]},{value:"<code>useReducer</code>",id:"usereducer",children:[{value:"\u5f02\u6b65\u5904\u7406",id:"\u5f02\u6b65\u5904\u7406",children:[]}]},{value:"<code>useContext</code>",id:"usecontext",children:[]},{value:"<code>useEffect()</code>",id:"useeffect",children:[{value:"\u5bf9\u6bd4",id:"\u5bf9\u6bd4",children:[]}]},{value:"<code>useRef()</code>",id:"useref",children:[]},{value:"<code>useCallback</code>",id:"usecallback",children:[]},{value:"<code>useMemo</code>",id:"usememo",children:[]},{value:"<code>useLayoutEffect</code>",id:"uselayouteffect",children:[]},{value:"\u5982\u4f55\u51cf\u5c11\u6e32\u67d3\u6b21\u6570",id:"\u5982\u4f55\u51cf\u5c11\u6e32\u67d3\u6b21\u6570",children:[{value:"``",id:"",children:[]}]},{value:"<code>setState</code> \u66f4\u65b0\u95ee\u9898",id:"setstate-\u66f4\u65b0\u95ee\u9898",children:[]},{value:"<code>Immutable Data</code>",id:"immutable-data",children:[{value:"<code>Immer</code>",id:"immer",children:[]}]}],s={toc:c};function m(e){var t=e.components,n=(0,l.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"hooks"},"Hooks"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Ref")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://juejin.cn/post/6844903985338400782"},"React Hooks \u8be6\u89e3 \u3010\u8fd1 1W \u5b57\u3011+ \u9879\u76ee\u5b9e\u6218")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://jancat.github.io/post/2019/translation-usememo-and-usecallback/"},"\u3010\u8bd1\u3011\u4ec0\u4e48\u65f6\u5019\u4f7f\u7528 useMemo \u548c useCallback"))))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u51fd\u6570\u5f0f\u7ec4\u4ef6\u6355\u83b7\u4e86\u6e32\u67d3\u6240\u4f7f\u7528\u7684\u503c")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Hook")," \u662f ",(0,r.kt)("inlineCode",{parentName:"li"},"React 16.8.0")," \u7248\u672c\u589e\u52a0\u7684\u65b0\u7279\u6027/\u65b0\u8bed\u6cd5"),(0,r.kt)("li",{parentName:"ul"},"\u53ef\u4ee5\u8ba9\u4f60\u5728\u51fd\u6570\u7ec4\u4ef6\u4e2d\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"li"},"state")," \u4ee5\u53ca\u5176\u4ed6\u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"React")," \u7279\u6027")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"import React, { useState, useEffect } from 'react';\nconst [xxx, setXxx] = useState(initValue);\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u81ea\u53d8\u91cf"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useState")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useReducer")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useContext")),(0,r.kt)("li",{parentName:"ul"},"\u5e94\u53d8\u91cf"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useEffect")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useCallback")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useMemo")),(0,r.kt)("li",{parentName:"ul"}),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useRef"))),(0,r.kt)("h2",{id:"usestate"},(0,r.kt)("inlineCode",{parentName:"h2"},"useState()")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"State Hook")," \u8ba9\u51fd\u6570\u7ec4\u4ef6\u4e5f\u53ef\u4ee5\u6709 ",(0,r.kt)("inlineCode",{parentName:"p"},"state")," \u72b6\u6001, \u5e76\u8fdb\u884c\u72b6\u6001\u6570\u636e\u7684\u8bfb\u5199\u64cd\u4f5c")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"useState()")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u53c2\u6570: \u7b2c\u4e00\u6b21\u521d\u59cb\u5316\u6307\u5b9a\u7684\u503c\u5728\u5185\u90e8\u4f5c\u7f13\u5b58"),(0,r.kt)("li",{parentName:"ul"},"\u8fd4\u56de\u503c: \u5305\u542b 2 \u4e2a\u5143\u7d20\u7684\u6570\u7ec4, \u7b2c 1 \u4e2a\u4e3a\u5185\u90e8\u5f53\u524d\u72b6\u6001\u503c, \u7b2c 2 \u4e2a\u4e3a\u66f4\u65b0\u72b6\u6001\u503c\u7684\u51fd\u6570"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u4e24\u79cd\u5199\u6cd5:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"setXxx(newValue)")," \u53c2\u6570\u4e3a\u975e\u51fd\u6570\u503c, \u76f4\u63a5\u6307\u5b9a\u65b0\u7684\u72b6\u6001\u503c, \u5185\u90e8\u7528\u5176\u8986\u76d6\u539f\u6765\u7684\u72b6\u6001\u503c"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"setXxx(value => newValue)")," \u53c2\u6570\u4e3a\u51fd\u6570, \u63a5\u6536\u539f\u672c\u7684\u72b6\u6001\u503c, \u8fd4\u56de\u65b0\u7684\u72b6\u6001\u503c, \u5185\u90e8\u7528\u5176\u8986\u76d6\u539f\u6765\u7684\u72b6\u6001\u503c")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"setCount(count + 1);\n\nsetCount(count => count + 1);\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u6bcf\u6b21\u6e32\u67d3\u90fd\u662f\u72ec\u7acb\u7684\u95ed\u5305")),(0,r.kt)("h4",{id:"\u60f0\u6027\u521d\u59cb\u5316-state"},"\u60f0\u6027\u521d\u59cb\u5316 state"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"// \u8fd9\u4e2a\u51fd\u6570\u53ea\u5728\u521d\u59cb\u6e32\u67d3\u65f6\u6267\u884c\u4e00\u6b21\uff0c\u540e\u7eed\u66f4\u65b0\u72b6\u6001\u91cd\u65b0\u6e32\u67d3\u7ec4\u4ef6\u65f6\uff0c\u8be5\u51fd\u6570\u5c31\u4e0d\u4f1a\u518d\u88ab\u8c03\u7528\nfunction getInitState(){\n  return {number:props.number};\n}\nlet [counter,setCounter] = useState(getInitState);\n")),(0,r.kt)("h4",{id:"\u6027\u80fd"},"\u6027\u80fd"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Hook")," \u5185\u90e8\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"li"},"Object.is")," \u6765\u6bd4\u8f83\u65b0\u65e7 ",(0,r.kt)("inlineCode",{parentName:"li"},"state")," \u662f\u5426\u76f8\u7b49",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u5982\u679c\u76f8\u7b49\u5219\u4e0d\u4f1a\u50cf\u7c7b\u7ec4\u4ef6\u91cd\u65b0\u6e32\u67d3"))),(0,r.kt)("li",{parentName:"ul"},"\u4e0d\u540c\u4e8e ",(0,r.kt)("inlineCode",{parentName:"li"},"setState")," \u7684\u5408\u5e76\u64cd\u4f5c, ",(0,r.kt)("inlineCode",{parentName:"li"},"setCount")," \u662f\u76f4\u63a5\u66ff\u6362\u539f\u6765\u7684\u72b6\u6001\u503c")),(0,r.kt)("h2",{id:"usereducer"},(0,r.kt)("inlineCode",{parentName:"h2"},"useReducer")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"const [state, dispatch] = useReducer(reducer, initialState, init)\n\nconst countReducer = (state, action) => {\n  switch (action.type) {\n    case 'add':\n      return state + 1;\n    default:\n      return state;\n  }\n};\nconst initialState = 0;\n\nconst App = () => {\n  const [count, countDispatch] = useReducer(countReducer, initialState);\n\n  const add = () => {\n    countDispatch({ type: 'add' });\n  };\n\n  return (\n    <>\n      <span onClick={add}>{count}</span>\n    </>\n  );\n};\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function useReducer(reducer, initialState) {\n  const [state, setState] = useState(initialState);\n\n  function dispatch(action) {\n    const nextState = reducer(state, action);\n    setState(nextState);\n  }\n\n  return [state, dispatch];\n}\n\n\nfunction Todos() {\n  const [todos, dispatch] = useReducer(todosReducer, []);\n\n  function handleAddClick(text) {\n    dispatch({ type: 'add', text });\n  }\n\n  // ...\n}\n")),(0,r.kt)("h3",{id:"\u5f02\u6b65\u5904\u7406"},"\u5f02\u6b65\u5904\u7406"),(0,r.kt)("h2",{id:"usecontext"},(0,r.kt)("inlineCode",{parentName:"h2"},"useContext")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"createContext  useContext")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"// HelloContext\nconst HelloContext = React.createContext(null)\n\n\n//\nconst {Provider} = HelloContext\n\nconst Desendants = () => {\n  const value = useContext(HelloContext)\n  return <div>{value}</div>\n  // \u7b49\u4ef7\u4e8e \u4e0b\u9762\u7684\ud83d\udc47\n  // return <HelloContext.Consumer>\n  //    {value => {\n  //    return <div>{value}</div>\n  //  }}\n  // </HelloContext.Consumer>\n  \n  // static contextType = HelloContext\n  // const value = this.context\n  // <div>{value}</div>\n}\n\nconst Child = () => {\n  return <Desendants />\n}\n\nconst Parent = () => {\n  return <Provider value='hello world'><Child /></Provider>\n}\n")),(0,r.kt)("h2",{id:"useeffect"},(0,r.kt)("inlineCode",{parentName:"h2"},"useEffect()")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Effect Hook")," \u53ef\u4ee5\u8ba9\u4f60\u5728\u51fd\u6570\u7ec4\u4ef6\u4e2d\u6267\u884c\u526f\u4f5c\u7528\u64cd\u4f5c(\u7528\u4e8e\u6a21\u62df\u7c7b\u7ec4\u4ef6\u4e2d\u7684\u751f\u547d\u5468\u671f\u94a9\u5b50)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React"),"\u4e2d\u7684\u526f\u4f5c\u7528\u64cd\u4f5c:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u53d1 ",(0,r.kt)("inlineCode",{parentName:"li"},"ajax")," \u8bf7\u6c42\u6570\u636e\u83b7\u53d6"),(0,r.kt)("li",{parentName:"ul"},"\u8bbe\u7f6e\u8ba2\u9605 / \u542f\u52a8\u5b9a\u65f6\u5668"),(0,r.kt)("li",{parentName:"ul"},"\u624b\u52a8\u66f4\u6539\u771f\u5b9e ",(0,r.kt)("inlineCode",{parentName:"li"},"DOM")))),(0,r.kt)("li",{parentName:"ul"},"\u8bed\u6cd5\u548c\u8bf4\u660e:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"useEffect(() => {}, []);\n\nuseEffect(() => {\n  // \u5728\u6b64\u53ef\u4ee5\u6267\u884c\u4efb\u4f55\u5e26\u526f\u4f5c\u7528\u64cd\u4f5c\n  return () => {\n    // \u5728\u7ec4\u4ef6\u5378\u8f7d\u524d\u6267\u884c\n    // \u5728\u6b64\u505a\u4e00\u4e9b\u6536\u5c3e\u5de5\u4f5c, \u6bd4\u5982\u6e05\u9664\u5b9a\u65f6\u5668/\u53d6\u6d88\u8ba2\u9605\u7b49\n  };\n}, [stateValue]); // \u5982\u679c\u6307\u5b9a\u7684\u662f[], \u56de\u8c03\u51fd\u6570\u53ea\u4f1a\u5728\u7b2c\u4e00\u6b21render()\u540e\u6267\u884c\n\nuseEffect(() => {\n  let timer = setTimeout(() => {\n    setCount(count + 1);\n  }, 1000);\n  return () => {\n    clearTimeout(timer);\n  };\n}, [count]);\n\n\n\u5728\u6bcf\u6b21useEffect\u4e4b\u524d\u8c03\u7528\u6e05\u7406\u51fd\u6570  \u7ec4\u4ef6\u9500\u6bc1\u65f6\u4e5f\u4f1a\u6267\u884c\n\n\u6bcf\u6b21useEffect\u5305\u88f9\u7684\u51fd\u6570 \u90fd\u662f\u65b0\u7684\n\nrender -> useEffect\nrender -> clearEffect -> useEffect\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u53ef\u4ee5\u628a ",(0,r.kt)("inlineCode",{parentName:"li"},"useEffect Hook")," \u770b\u505a\u5982\u4e0b\u4e09\u4e2a\u51fd\u6570\u7684\u7ec4\u5408",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"componentDidMount()")," \u4f20\u5165\u7a7a\u6570\u7ec4"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"componentDidUpdate()")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"componentWillUnmount()")," ",(0,r.kt)("inlineCode",{parentName:"li"},"return () => {}")," \u8fd4\u56de\u7684\u51fd\u6570")))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("inlineCode",{parentName:"p"},"useEffect")," \u91cd\u65b0",(0,r.kt)("inlineCode",{parentName:"p"},"render"),"\u4e4b\u524d\u4f1a\u6267\u884c",(0,r.kt)("inlineCode",{parentName:"p"},"return"),"\u91cc\u9762 \u5373 ",(0,r.kt)("inlineCode",{parentName:"p"},"componentWillUnmount"))),(0,r.kt)("h3",{id:"\u5bf9\u6bd4"},"\u5bf9\u6bd4"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"componentDidMount useEffect"),"\u6267\u884c\u65f6\u673a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"useEffect"),"\u4f1a\u5728",(0,r.kt)("inlineCode",{parentName:"p"},"commit"),"\u9636\u6bb5\u6267\u884c\u5b8c\u4ee5\u540e\u5f02\u6b65\u7684\u8c03\u7528\u56de\u8c03\u51fd\u6570")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"componentDidMount")," \u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"layout")," \u9636\u6bb5\u540c\u6b65\u7684\u8c03\u7528")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"useLayoutEffect")," \u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"layout"),"\u9636\u6bb5\u540c\u6b65\u7684\u8c03\u7528"))),(0,r.kt)("p",null,"React \u4f1a\u7b49\u5f85\u6d4f\u89c8\u5668\u5b8c\u6210\u753b\u9762\u6e32\u67d3\u4e4b\u540e\u624d\u4f1a\u5ef6\u8fdf\u8c03\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect"),"\uff0c\u56e0\u6b64\u4f1a\u4f7f\u5f97\u989d\u5916\u64cd\u4f5c\u5f88\u65b9\u4fbf\u3002"),(0,r.kt)("p",null,"\u771f\u5b9eDOM\u6784\u5efa\u4ee5\u540e\u624d\u4f1a\u6267\u884c \u5f02\u6b65\u7684\u3002\u4e0d\u4f1a\u963b\u585e\u6d4f\u89c8\u5668\u66f4\u65b0\u5c4f\u5e55 \u7279\u6b8a\u60c5\u51b5layoutEffect"),(0,r.kt)("p",null,"\u800ccdp\u662f\u5728\u771f\u5b9eDOM\u4e4b\u524d"),(0,r.kt)("h2",{id:"useref"},(0,r.kt)("inlineCode",{parentName:"h2"},"useRef()")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Ref Hook")," \u53ef\u4ee5\u5728\u51fd\u6570\u7ec4\u4ef6\u4e2d\u5b58\u50a8/\u67e5\u627e\u7ec4\u4ef6\u5185\u7684\u6807\u7b7e\u6216\u4efb\u610f\u5176\u5b83\u6570\u636e"),(0,r.kt)("li",{parentName:"ul"},"\u8bed\u6cd5: ",(0,r.kt)("inlineCode",{parentName:"li"},"const refContainer = useRef()")),(0,r.kt)("li",{parentName:"ul"},"\u4f5c\u7528: \u4fdd\u5b58\u6807\u7b7e\u5bf9\u8c61,\u529f\u80fd\u4e0e",(0,r.kt)("inlineCode",{parentName:"li"},"React.createRef()"),"\u4e00\u6837",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"createRef")," \u6bcf\u6b21\u6e32\u67d3\u90fd\u4f1a\u8fd4\u56de\u4e00\u4e2a\u65b0\u7684\u5f15\u7528\uff0c\u800c ",(0,r.kt)("inlineCode",{parentName:"li"},"useRef")," \u6bcf\u6b21\u90fd\u4f1a\u8fd4\u56de\u76f8\u540c\u7684\u5f15\u7528"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useRef")," \u8fd4\u56de\u4e00\u4e2a\u53ef\u53d8\u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"ref")," \u5bf9\u8c61\uff0c\u5176 ",(0,r.kt)("inlineCode",{parentName:"li"},".current")," \u5c5e\u6027\u88ab\u521d\u59cb\u5316\u4e3a\u4f20\u5165\u7684\u53c2\u6570\u3002\u8fd4\u56de\u7684 ref \u5bf9\u8c61\u5728\u7ec4\u4ef6\u7684\u6574\u4e2a\u751f\u547d\u5468\u671f\u5185\u4fdd\u6301\u4e0d\u53d8\u3002")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"const myRef = React.createRef();\nthis.myRef.current.value;\n\nconst myRef = useRef();\nmyRef.current.value;\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"forwardRef")," \u5bf9\u51fd\u6570\u5f0f\u7ec4\u4ef6",(0,r.kt)("inlineCode",{parentName:"p"},"ref"),"\u7684\u8f6c\u53d1"),(0,r.kt)("h2",{id:"usecallback"},(0,r.kt)("inlineCode",{parentName:"h2"},"useCallback")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"useCallback(\n  () => {\n    callback\n  },\n  [input],\n)\n\u4fdd\u8bc1\u51fd\u6570\u662f\u540c\u4e00\u5f15\u7528\uff1f\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"memoized fun"),"?"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"useCallback"),"\uff1a\u63a5\u6536\u4e00\u4e2a\u5185\u8054\u56de\u8c03\u51fd\u6570\u53c2\u6570\u548c\u4e00\u4e2a\u4f9d\u8d56\u9879\u6570\u7ec4\uff08\u5b50\u7ec4\u4ef6\u4f9d\u8d56\u7236\u7ec4\u4ef6\u7684\u72b6\u6001\uff0c\u5373\u5b50\u7ec4\u4ef6\u4f1a\u4f7f\u7528\u5230\u7236\u7ec4\u4ef6\u7684\u503c\uff09 \uff0cuseCallback \u4f1a\u8fd4\u56de\u8be5\u56de\u8c03\u51fd\u6570\u7684 memoized \u7248\u672c\uff0c\u8be5\u56de\u8c03\u51fd\u6570\u4ec5\u5728\u67d0\u4e2a\u4f9d\u8d56\u9879\u6539\u53d8\u65f6\u624d\u4f1a\u66f4\u65b0")),(0,r.kt)("h2",{id:"usememo"},(0,r.kt)("inlineCode",{parentName:"h2"},"useMemo")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"memoized value"),"?"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"React.memo  \u56fa\u5b9a\u7ec4\u4ef6\nReact.pureComponent\n\n\nuseMemo(() => function, input)\n?\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"useCallback(fn, deps) === useMemo(() => fn, deps)\n")),(0,r.kt)("h2",{id:"uselayouteffect"},(0,r.kt)("inlineCode",{parentName:"h2"},"useLayoutEffect")),(0,r.kt)("h2",{id:"\u5982\u4f55\u51cf\u5c11\u6e32\u67d3\u6b21\u6570"},"\u5982\u4f55\u51cf\u5c11\u6e32\u67d3\u6b21\u6570"),(0,r.kt)("p",null,"React \u4f1a\u7b49\u5f85\u6d4f\u89c8\u5668\u5b8c\u6210\u753b\u9762\u6e32\u67d3\u4e4b\u540e\u624d\u4f1a\u5ef6\u8fdf\u8c03\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect"),"\uff0c\u56e0\u6b64\u4f1a\u4f7f\u5f97\u989d\u5916\u64cd\u4f5c\u5f88\u65b9\u4fbf\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"useRef<HTMLInputElement>(null)")),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u5728\u6e32\u67d3\u671f\u95f4\u6267\u884c\u4e86\u9ad8\u5f00\u9500\u7684\u8ba1\u7b97\uff0c\u5219\u53ef\u4ee5\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"useMemo")," \u6765\u8fdb\u884c\u4f18\u5316\u3002"),(0,r.kt)("p",null,"\u8d4b\u503c\u7ed9 ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect")," \u7684\u51fd\u6570\u4f1a\u5728\u7ec4\u4ef6\u6e32\u67d3\u5230\u5c4f\u5e55\u4e4b\u540e\u6267\u884c\u3002"),(0,r.kt)("p",null,"\u867d\u7136 ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect")," \u4f1a\u5728\u6d4f\u89c8\u5668\u7ed8\u5236\u540e\u5ef6\u8fdf\u6267\u884c\uff0c\u4f46\u4f1a\u4fdd\u8bc1\u5728\u4efb\u4f55\u65b0\u7684\u6e32\u67d3\u524d\u6267\u884c"),(0,r.kt)("p",null,"React \u4f1a\u7b49\u5f85\u6d4f\u89c8\u5668\u5b8c\u6210\u753b\u9762\u6e32\u67d3\u4e4b\u540e\u624d\u4f1a\u5ef6\u8fdf\u8c03\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect")),(0,r.kt)("h3",{id:""},"``"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/#tldr"},"useEffect \u5b8c\u6574\u6307\u5357")),(0,r.kt)("p",null,"\u5728\u5355\u6b21\u6e32\u67d3\u7684\u8303\u56f4\u5185\uff0cprops\u548cstate\u59cb\u7ec8\u4fdd\u6301\u4e0d\u53d8\u3002"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"\u7ec4\u4ef6\u5185\u7684\u6bcf\u4e00\u4e2a\u51fd\u6570\uff08\u5305\u62ec\u4e8b\u4ef6\u5904\u7406\u51fd\u6570\uff0ceffects\uff0c\u5b9a\u65f6\u5668\u6216\u8005API\u8c03\u7528\u7b49\u7b49\uff09\u4f1a\u6355\u83b7\u5b9a\u4e49\u5b83\u4eec\u7684\u90a3\u6b21\u6e32\u67d3\u4e2d\u7684props\u548cstate\u3002")),(0,r.kt)("p",null,"React\u53ea\u4f1a\u5728",(0,r.kt)("a",{parentName:"p",href:"https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f"},"\u6d4f\u89c8\u5668\u7ed8\u5236"),"\u540e\u8fd0\u884ceffects\u3002\u8fd9\u4f7f\u5f97\u4f60\u7684\u5e94\u7528\u66f4\u6d41\u7545\u56e0\u4e3a\u5927\u591a\u6570effects\u5e76\u4e0d\u4f1a\u963b\u585e\u5c4f\u5e55\u7684\u66f4\u65b0\u3002Effect\u7684\u6e05\u9664\u540c\u6837\u88ab\u5ef6\u8fdf\u4e86\u3002",(0,r.kt)("strong",{parentName:"p"},"\u4e0a\u4e00\u6b21\u7684effect\u4f1a\u5728\u91cd\u65b0\u6e32\u67d3\u540e\u88ab\u6e05\u9664\uff1a")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"React \u6e32\u67d3",(0,r.kt)("inlineCode",{parentName:"strong"},"{id: 20}"),"\u7684UI\u3002")),(0,r.kt)("li",{parentName:"ul"},"\u6d4f\u89c8\u5668\u7ed8\u5236\u3002\u6211\u4eec\u5728\u5c4f\u5e55\u4e0a\u770b\u5230",(0,r.kt)("inlineCode",{parentName:"li"},"{id: 20}"),"\u7684UI\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"React \u6e05\u9664",(0,r.kt)("inlineCode",{parentName:"strong"},"{id: 10}"),"\u7684effect\u3002")),(0,r.kt)("li",{parentName:"ul"},"React \u8fd0\u884c",(0,r.kt)("inlineCode",{parentName:"li"},"{id: 20}"),"\u7684effect\u3002")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u5f53\u4f60\u60f3\u66f4\u65b0\u4e00\u4e2a\u72b6\u6001\uff0c\u5e76\u4e14\u8fd9\u4e2a\u72b6\u6001\u66f4\u65b0\u4f9d\u8d56\u4e8e\u53e6\u4e00\u4e2a\u72b6\u6001\u7684\u503c\u65f6\uff0c\u4f60\u53ef\u80fd\u9700\u8981\u7528",(0,r.kt)("inlineCode",{parentName:"strong"},"useReducer"),"\u53bb\u66ff\u6362\u5b83\u4eec\u3002")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"useState => useReducer")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import React, { useState, useEffect } from "react";\nimport ReactDOM from "react-dom";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const [step, setStep] = useState(1);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(c => c + step);\n    }, 1000);\n    return () => clearInterval(id);\n  }, [step]);\n\n  return (\n    <>\n      <h1>{count}</h1>\n      <input value={step} onChange={e => setStep(Number(e.target.value))} />\n    </>\n  );\n}\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(<Counter />, rootElement);\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"{5,10}","{5,10}":!0},"import React, { useReducer, useEffect } from \"react\";\nimport ReactDOM from \"react-dom\";\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  const { count, step } = state;\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      dispatch({ type: 'tick' });\n    }, 1000);\n    return () => clearInterval(id);\n  }, [dispatch]);\n\n  return (\n    <>\n      <h1>{count}</h1>\n      <input value={step} onChange={e => {\n        dispatch({\n          type: 'step',\n          step: Number(e.target.value)\n        });\n      }} />\n    </>\n  );\n}\n\nconst initialState = {\n  count: 0,\n  step: 1,\n};\n\nfunction reducer(state, action) {\n  const { count, step } = state;\n  if (action.type === 'tick') {\n    return { count: count + step, step };\n  } else if (action.type === 'step') {\n    return { count, step: action.step };\n  } else {\n    throw new Error();\n  }\n}\n\nconst rootElement = document.getElementById(\"root\");\nReactDOM.render(<Counter />, rootElement);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"React\u4f1a\u4fdd\u8bc1",(0,r.kt)("inlineCode",{parentName:"strong"},"dispatch"),"\u5728\u7ec4\u4ef6\u7684\u58f0\u660e\u5468\u671f\u5185\u4fdd\u6301\u4e0d\u53d8\u3002\u6240\u4ee5\u4e0a\u9762\u4f8b\u5b50\u4e2d\u4e0d\u518d\u9700\u8981\u91cd\u65b0\u8ba2\u9605\u5b9a\u65f6\u5668")),(0,r.kt)("p",null,"\u5f53\u6211\u4eec\u9700\u8981\u5c06\u51fd\u6570\u4f20\u9012\u4e0b\u53bb\u5e76\u4e14\u51fd\u6570\u4f1a\u5728\u5b50\u7ec4\u4ef6\u7684effect\u4e2d\u88ab\u8c03\u7528\u7684\u65f6\u5019\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"useCallback")," \u662f\u5f88\u597d\u7684\u6280\u5de7\u4e14\u975e\u5e38\u6709\u7528\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"useCallback")," \u7684\u4f5c\u7528\u5728\u4e8e\u5229\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"memoize")," \u51cf\u5c11\u65e0\u6548\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"re-render"),"\uff0c\u6765\u8fbe\u5230\u6027\u80fd\u4f18\u5316\u7684\u4f5c\u7528"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"reducer` \u5176\u5b9e\u662f\u5728\u4e0b\u6b21 `render` \u65f6\u624d\u6267\u884c\u7684\uff0c\u6240\u4ee5\u5728 `reducer` \u91cc\uff0c\u8bbf\u95ee\u5230\u7684\u6c38\u8fdc\u662f\u65b0\u7684 `props` \u548c `state\n")),(0,r.kt)("p",null,"\u5728 React \u4e2d Props \u662f\u4e0d\u53ef\u53d8(immutable)\u7684\uff0c\u6240\u4ee5\u4ed6\u4eec\u6c38\u8fdc\u4e0d\u4f1a\u6539\u53d8\u3002",(0,r.kt)("strong",{parentName:"p"},"\u7136\u800c\uff0c",(0,r.kt)("inlineCode",{parentName:"strong"},"this"),"\u662f\uff0c\u800c\u4e14\u6c38\u8fdc\u662f\uff0c\u53ef\u53d8(mutable)\u7684\u3002")),(0,r.kt)("h2",{id:"setstate-\u66f4\u65b0\u95ee\u9898"},(0,r.kt)("inlineCode",{parentName:"h2"},"setState")," \u66f4\u65b0\u95ee\u9898"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const [n, setN] = useState(0);\nconst onClick = () => {\n  // setN(n + 1);\n  // setN(n + 1); // \u6b64\u65f6\u53d1\u73b0\uff0cn\u53ea\u80fd+1\uff0c\u800c\u4e0d\u4f1a+2\n  setN((i) => i + 1);\n  setN((i) => i + 1); // n+2\n};\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"useState")," \u6bcf\u6b21\u6267\u884c\u4f1a\u8fd4\u56de\u4e00\u4e2a\u65b0\u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"state"),"\uff08\u7b80\u5355\u7c7b\u578b\u7684\u7b49\u503c\u62f7\u8d1d\uff09"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"setState")," \u4f1a\u89e6\u53d1UI\u66f4\u65b0\uff08\u91cd\u65b0",(0,r.kt)("inlineCode",{parentName:"li"},"render"),"\uff0c\u6267\u884c\u51fd\u6570\u7ec4\u4ef6\uff09\u7531\u4e8eUI\u66f4\u65b0\u662f\u5f02\u6b65\u4efb\u52a1\uff0c\u6240\u4ee5",(0,r.kt)("inlineCode",{parentName:"li"},"setState")," \u4e5f\u662f\u4e00\u4e2a\u5f02\u6b65\u8fc7\u7a0b\u3002\u5f53\u6211\u4eec\u4e24\u6b21",(0,r.kt)("inlineCode",{parentName:"li"},"setN(n+1)"),"\u65f6\u5019\uff0c\u5b9e\u9645\u4e0a\u5f62\u6210\u4e86\u4e24\u4e2a\u95ed\u5305\uff0c\u90fd\u4fdd\u5b58\u4e86\u5bf9\u6b64\u65f6 ",(0,r.kt)("inlineCode",{parentName:"li"},"n"),"\u7684\u72b6\u6001 ",(0,r.kt)("inlineCode",{parentName:"li"},"(n=0)")," \u7684\u5f15\u7528"),(0,r.kt)("li",{parentName:"ul"},"\u5728",(0,r.kt)("inlineCode",{parentName:"li"},"setN"),"\u540e\uff0c\u5148\u5206\u522b\u751f\u6210\u4e86\u4e24\u4e2a\u65b0\u7684",(0,r.kt)("inlineCode",{parentName:"li"},"n"),"\uff0c\u6570\u503c\u4e0a\u90fd\u7b49\u4e8e",(0,r.kt)("inlineCode",{parentName:"li"},"n+1 \u53731"),"\uff0c\u4f46\u5f7c\u6b64\u65e0\u5173\u3002\u5206\u522b\u8fdb\u884c\u4e86",(0,r.kt)("inlineCode",{parentName:"li"},"render"),"\uff0c\u800c\u53ea\u6709\u6700\u65b0\u4e00\u6b21",(0,r.kt)("inlineCode",{parentName:"li"},"render"),"\u6709\u6548\uff0c\u6b64\u6b21",(0,r.kt)("inlineCode",{parentName:"li"},"render"),"\u5f15\u7528\u4e86\u6700\u540e\u4e00\u6b21",(0,r.kt)("inlineCode",{parentName:"li"},"setN"),"\u51fd\u6570\u91cc\u751f\u6210\u7684",(0,r.kt)("inlineCode",{parentName:"li"},"n")),(0,r.kt)("li",{parentName:"ul"},"\u63a5\u6536\u7684\u51fd\u6570 ",(0,r.kt)("inlineCode",{parentName:"li"},"x=>x+1")," \u5e76\u672a\u4fdd\u6301\u5bf9",(0,r.kt)("inlineCode",{parentName:"li"},"n"),"\u7684\u5f15\u7528\uff0c\u800c\u662f\u8868\u8fbe\u4e86\u4e00\u79cd \u52a01 \u64cd\u4f5c")),(0,r.kt)("h2",{id:"immutable-data"},(0,r.kt)("inlineCode",{parentName:"h2"},"Immutable Data")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Ref")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/ronffy/immer-tutorial"},"Immer \u4e2d\u6587\u6587\u6863"))))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"js")," \u4e2d\u7684\u5bf9\u8c61\u4e00\u822c\u662f\u53ef\u53d8\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"mutable"),"\uff0c\u56e0\u4e3a\u4f7f\u7528\u4e86\u5f15\u7528\u8d4b\u503c\uff0c\u65b0\u7684\u5bf9\u8c61\u7b80\u5355\u5730\u5f15\u7528\u4e86\u539f\u59cb\u5bf9\u8c61\uff0c\u6539\u53d8\u65b0\u7684\u5bf9\u8c61\u5c06\u5f71\u54cd\u5230\u539f\u59cb\u5bf9\u8c61"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Immutable Data")," \u5c31\u662f\u4e00\u65e6\u521b\u5efa\uff0c\u5c31\u4e0d\u80fd\u518d\u66f4\u6539\u7684\u6570\u636e"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Immutable")," \u5b9e\u73b0\u7684\u539f\u7406\u662f\u6301\u4e45\u5316\u7684\u6570\u636e\u7ed3\u6784 ",(0,r.kt)("inlineCode",{parentName:"p"},"persistent data structure"),"\uff0c\u4e5f\u5c31\u662f\u4f7f\u7528\u65e7\u6570\u636e\u521b\u5efa\u65b0\u6570\u636e\u65f6\uff0c\u8981\u4fdd\u8bc1\u65e7\u6570\u636e\u540c\u65f6\u53ef\u7528\u4e14\u4e0d\u53d8\u3002\u540c\u65f6\u4e3a\u4e86\u907f\u514d\u6df1\u62f7\u8d1d\u628a\u6240\u6709\u8282\u70b9\u90fd\u590d\u5236\u4e00\u904d\u5e26\u6765\u7684\u6027\u80fd\u635f\u8017\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"Immutable")," \u4f7f\u7528\u4e86\u7ed3\u6784\u5171\u4eab ",(0,r.kt)("inlineCode",{parentName:"p"},"structural sharing"),"\uff0c\u5373\u5982\u679c\u5bf9\u8c61\u6811\u4e2d\u4e00\u4e2a\u8282\u70b9\u53d1\u751f\u53d8\u5316\uff0c\u53ea\u4fee\u6539\u8fd9\u4e2a\u8282\u70b9\u548c\u53d7\u5b83\u5f71\u54cd\u7684\u7236\u8282\u70b9\uff0c\u5176\u4ed6\u8282\u70b9\u5219\u8fdb\u884c\u5171\u4eab\u3002"),(0,r.kt)("h3",{id:"immer"},(0,r.kt)("inlineCode",{parentName:"h3"},"Immer")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"produce(currentState, producer: (draftState) => void): nextState")))}m.isMDXComponent=!0}}]);