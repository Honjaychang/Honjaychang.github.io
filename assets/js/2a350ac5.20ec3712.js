"use strict";(self.webpackChunkmy_test=self.webpackChunkmy_test||[]).push([[6190],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),s=u(n),d=r,k=s["".concat(l,".").concat(d)]||s[d]||c[d]||o;return n?a.createElement(k,p(p({ref:t},m),{},{components:n})):a.createElement(k,p({ref:t},m))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,p=new Array(o);p[0]=s;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var u=2;u<o;u++)p[u]=n[u];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},7361:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return m},default:function(){return s}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),p=["components"],i={},l=void 0,u={unversionedId:"react/router",id:"react/router",isDocsHomePage:!1,title:"router",description:"\u8def\u7531",source:"@site/docs/react/router.md",sourceDirName:"react",slug:"/react/router",permalink:"/docs/react/router",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Redux",permalink:"/docs/react/redux"},next:{title:"Hooks",permalink:"/docs/react/hooks"}},m=[{value:"<code>BrowserRouter</code>",id:"browserrouter",children:[]},{value:"<code>HashRouter</code>",id:"hashrouter",children:[]}],c={toc:m};function s(e){var t=e.components,n=(0,r.Z)(e,p);return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h5",{id:"\u8def\u7531"},"\u8def\u7531"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Ref")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://juejin.cn/post/6948226424427773983#heading-0"},"React Router \u5165\u95e8\u5b8c\u5168\u6307\u5357(\u5305\u542b Router Hooks)\ud83d\udef5"))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"history\n\n// \u8fd4\u56de\u5f53\u524d\u4f1a\u8bdd\u6d4f\u89c8\u8fc7\u7684\u9875\u9762\u6570\u91cf\nwindow.history.length\n\n// \u63a5\u6536\u4e00\u4e2a\u6574\u6570\u4f5c\u4e3a\u53c2\u6570\uff0c\u6309\u7167\u5f53\u524d\u9875\u9762\u5728\u4f1a\u8bdd\u6d4f\u89c8\u5386\u53f2\u8bb0\u5f55\u4e2d\u7684\u4f4d\u7f6e\u8fdb\u884c\u79fb\u52a8\u3002\n// \u5982\u679c\u53c2\u6570\u4e3a0\u3001undefined\u3001null\u3001false \u5c06\u5237\u65b0\u9875\u9762\uff0c\u76f8\u5f53\u4e8e\u6267\u884cwindow.location.reload()\u65b9\u6cd5\u3002\u5982\u679c\u53c2\u6570\u5927\u4e8e\u6d4f\u89c8\u5668\u6d4f\u89c8\u7684\u6570\u91cf\uff0c\u6216\u5c0f\u4e8e\u6d4f\u89c8\u5668\u7684\u6570\u91cf\u7684\u8bdd\uff0c\u4ec0\u4e48\u90fd\u4e0d\u4f1a\u505a\u3002\nwindow.history.go(?delta): \n\n// \u79fb\u52a8\u5230\u4e0a\u4e00\u9875\u3002\u76f8\u5f53\u4e8e\u70b9\u51fb\u6d4f\u89c8\u5668\u7684\u540e\u9000\u6309\u94ae\uff0c\u7b49\u4ef7\u4e8ewindow.history.go(-1)\nwindow.history.back()\n\n// \u79fb\u52a8\u5230\u4e0b\u4e00\u9875\uff0c\u76f8\u5f53\u4e8e\u70b9\u51fb\u6d4f\u89c8\u5668\u7684\u524d\u8fdb\u6309\u94ae\uff0c\u7b49\u4ef7\u4e8ewindow.history.go(1)\nwindow.history.forward()\n\n// h5\n// \u8be5\u53c2\u6570\u662f\u53ea\u8bfb\u7684\uff0c\u8868\u793a\u4e0e\u4f1a\u8bdd\u6d4f\u89c8\u5386\u53f2\u7684\u5f53\u524d\u8bb0\u5f55\u76f8\u5173\u8054\u7684\u72b6\u6001\u5bf9\u8c61\nwindow.history.state\n\n// \u5411\u5386\u53f2\u8bb0\u5f55\u4e2d\u8ffd\u52a0\u4e00\u6761\u8bb0\u5f55\nwindow.history.pushState(data, title, ?url)\n\n// \u66ff\u6362\u5f53\u524d\u9875\u5728\u5386\u53f2\u8bb0\u5f55\u4e2d\u7684\u4fe1\u606f\nwindow.history.replaceState(data, title, ?url)\n\n\u6267\u884c\u4e0a\u9762\u4e24\u79cd\u65b9\u6cd5\u540e\uff0curl\u5730\u5740\u4f1a\u53d1\u751f\u6539\u53d8\u3002\u4f46\u662f\u4e0d\u4f1a\u5237\u65b0\u9875\u9762\u3002\n")),(0,o.kt)("h3",{id:"browserrouter"},(0,o.kt)("inlineCode",{parentName:"h3"},"BrowserRouter")),(0,o.kt)("p",null,"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"pushState")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"popState")," \u4e8b\u4ef6\u6784\u5efa\u8def\u7531"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"browserHistory")," \u9700\u8981 server \u7aef\u652f\u6301"),(0,o.kt)("li",{parentName:"ul"},"\u6d4f\u89c8\u5668\u4ece ",(0,o.kt)("inlineCode",{parentName:"li"},"/ "),"\u5230 ",(0,o.kt)("inlineCode",{parentName:"li"},"/repos")," \u662f\u4f1a\u5411 ",(0,o.kt)("inlineCode",{parentName:"li"},"server")," \u53d1\u9001 ",(0,o.kt)("inlineCode",{parentName:"li"},"request")," \u7684\u3002\u6240\u4ee5 ",(0,o.kt)("inlineCode",{parentName:"li"},"server")," \u7aef\u662f\u8981\u505a\u7279\u6b8a\u914d\u7f6e\u7684")),(0,o.kt)("p",null,"\u63d0\u4f9b",(0,o.kt)("inlineCode",{parentName:"p"},"onpopstate"),"\u4e8b\u4ef6\u6765\u76d1\u542c\u5386\u53f2\u6808\u7684\u6539\u53d8"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const historyUpdatePage = () => {}\n\nwindow.addEventListener('onpopstate', historyUpdatePage)\n")),(0,o.kt)("h3",{id:"hashrouter"},(0,o.kt)("inlineCode",{parentName:"h3"},"HashRouter")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"window.location.hash")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"hashchange")," \u4e8b\u4ef6\u6784\u5efa\u8def\u7531")),(0,o.kt)("p",null,"\u4e3b\u8981\u5b9e\u73b0\u539f\u7406\u662f\uff1a",(0,o.kt)("inlineCode",{parentName:"p"},"hash")," \u6539\u53d8\u65f6\uff0c\u4e0d\u4f1a\u5411\u670d\u52a1\u5668\u53d1\u51fa\u8bf7\u6c42\uff0c\u6240\u4ee5\u4e0d\u4f1a\u5237\u65b0\u9875\u9762\u3002\u5e76\u4e14\u6bcf\u6b21",(0,o.kt)("inlineCode",{parentName:"p"},"hash"),"\u503c\u53d1\u751f\u6539\u53d8\u7684\u65f6\u5019\uff0c\u90fd\u4f1a\u89e6\u53d1",(0,o.kt)("inlineCode",{parentName:"p"},"hashchange"),"\u4e8b\u4ef6\u3002\u56e0\u6b64\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u76d1\u542c\u8be5\u4e8b\u4ef6\uff0c\u6765\u77e5\u9053",(0,o.kt)("inlineCode",{parentName:"p"},"hash"),"\u503c\u53d1\u751f\u4e86\u54ea\u4e9b\u53d8\u5316\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const hashUpdatePage = () => {}\n\nwindow.addEventListener('hashchange', hashUpdatePage)\n")),(0,o.kt)("p",null,"\u5bf9\u6bd4",(0,o.kt)("inlineCode",{parentName:"p"},"hash")," ",(0,o.kt)("inlineCode",{parentName:"p"},"pushState")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hash"),"\u53ea\u80fd\u4fee\u6539",(0,o.kt)("inlineCode",{parentName:"li"},"url"),"\u7684\u7247\u6bb5\u6807\u8bc6\u7b26\u7684\u90e8\u5206\uff0c\u5e76\u4e14\u5fc5\u987b\u4ece",(0,o.kt)("inlineCode",{parentName:"li"},"#"),"\u53f7\u5f00\u59cb\u3002\u800c",(0,o.kt)("inlineCode",{parentName:"li"},"pushState"),"\u80fd\u4fee\u6539\u8def\u5f84\u3001\u67e5\u8be2\u53c2\u6570\u548c\u7247\u6bb5\u6807\u8bc6\u7b26\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"pushState"),"\u6bd4",(0,o.kt)("inlineCode",{parentName:"li"},"hash"),"\u66f4\u7b26\u5408\u524d\u7aef\u8def\u7531\u7684\u8bbf\u95ee\u65b9\u5f0f\uff0c\u56e0\u4e3a\u4e0d\u5e26#\u53f7"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hash")," \u5fc5\u987b\u548c\u539f\u5148\u7684\u503c\u4e0d\u540c\uff0c\u624d\u80fd\u65b0\u589e\u4f1a\u8bdd\u6d4f\u89c8\u5386\u53f2\u7684\u8bb0\u5f55\uff0c\u4f46\u662f",(0,o.kt)("inlineCode",{parentName:"li"},"pushState"),"\u65b0\u589e\u76f8\u540c\u7684\u503c\u4e5f\u4f1a\u589e\u52a0\u4f1a\u8bdd\u6d4f\u89c8\u5386\u53f2\u7684\u8bb0\u5f55")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import React from 'react'\nimport { render } from 'react-dom'\nimport { Router, Route, hashHistory } from 'react-router'\nimport App from './modules/App'\nimport About from './modules/About'\nimport Repos from './modules/Repos'\n\nrender((\n  <Router history={hashHistory}>\n    <Route path=\"/\" component={App}/>\n    <Route path=\"/repos\" component={Repos}/>\n    <Route path=\"/about\" component={About}/>\n  </Router>\n), document.getElementById('app'))\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"http://localhost:8080/#/?_k=pigdrh")),(0,o.kt)("li",{parentName:"ul"},"\u4ece ",(0,o.kt)("inlineCode",{parentName:"li"},"/#/")," \u5230 ",(0,o.kt)("inlineCode",{parentName:"li"},"/#/repos")," \u6d4f\u89c8\u5668\u5e76\u4e0d\u4f1a\u53bb\u53d1\u9001\u4e00\u6b21 ",(0,o.kt)("inlineCode",{parentName:"li"},"request"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"li"},"react-router")," \u81ea\u5df1\u6839\u636e ",(0,o.kt)("inlineCode",{parentName:"li"},"url")," \u53bb ",(0,o.kt)("inlineCode",{parentName:"li"},"render")," \u76f8\u5e94\u7684\u6a21\u5757")),(0,o.kt)("p",null,"\u57fa\u672c\u7528\u6cd5"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Router, Route, hashHistory } from 'react-router';\n\nrender((\n  <Router history={hashHistory}>\n    <Route path=\"/\" component={App}/>\n  </Router>\n), document.getElementById('app'));\n")),(0,o.kt)("p",null,"\u8def\u7531\u5668",(0,o.kt)("inlineCode",{parentName:"p"},"Router"),"\u5c31\u662fReact\u7684\u4e00\u4e2a\u7ec4\u4ef6"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Router"),"\u7ec4\u4ef6\u672c\u8eab\u53ea\u662f\u4e00\u4e2a\u5bb9\u5668\uff0c\u771f\u6b63\u7684\u8def\u7531\u8981\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"Route"),"\u7ec4\u4ef6\u5b9a\u4e49\u3002"),(0,o.kt)("p",null,"\u5d4c\u5957\u8def\u7531"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'<Router history={hashHistory}>\n  <Route path="/" component={App}>\n    <Route path="/repos" component={Repos}/>\n    <Route path="/about" component={About}/>\n  </Route>\n</Router>\n')),(0,o.kt)("p",null,"\u7528\u6237\u8bbf\u95ee",(0,o.kt)("inlineCode",{parentName:"p"},"/repos"),"\u65f6\uff0c\u4f1a\u5148\u52a0\u8f7d",(0,o.kt)("inlineCode",{parentName:"p"},"App"),"\u7ec4\u4ef6\uff0c\u7136\u540e\u5728\u5b83\u7684\u5185\u90e8\u518d\u52a0\u8f7d",(0,o.kt)("inlineCode",{parentName:"p"},"Repos"),"\u7ec4\u4ef6\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { BrowserRouter as Router } from "react-router-dom";\n\n')),(0,o.kt)("p",null,"\u4e3a\u4e86\u6e32\u67d3\u51fa\u8def\u7531\uff0c\u6211\u4eec\u9700\u8981\u5bfc\u5165 ",(0,o.kt)("inlineCode",{parentName:"p"},"Route")," \u7ec4\u4ef6"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { BrowserRouter as Router, Route } from "react-router-dom";\n\n<Route path="/" render={() => <h1>Welcome!</h1>} />\n<Route path="/" component={Home} />\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Route"),"\u7ec4\u4ef6\u6709\u5f88\u591a\u5c5e\u6027\uff0c\u5728\u4ee3\u7801\u4e2d\uff0c\u6211\u4eec\u4f7f\u7528\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"path"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"render"),"\u5c5e\u6027"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"path"),": \u9875\u9762\u7684\u8def\u5f84"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"render"),": \u5bf9\u5e94\u7684\u9875\u9762\u6e32\u67d3\u7684\u662f\u4ec0\u4e48"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"component"),": \u7528\u6765\u6e32\u67d3 React \u7ec4\u4ef6")),(0,o.kt)("p",null,"\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"Link"),"\u7ec4\u4ef6\u5b9e\u73b0\u9875\u9762\u4e4b\u95f4\u7684\u8df3\u8f6c  ",(0,o.kt)("inlineCode",{parentName:"p"},"Link to")),(0,o.kt)("p",null,"\u7ed9Home\u7ec4\u4ef6\u6dfb\u52a0 exact \u53ea\u6709",(0,o.kt)("inlineCode",{parentName:"p"},"path"),"\u7684\u503c\u88ab\u5b8c\u5168\u5339\u914d\u65f6\u624d\u4f1a\u6e32\u67d3\u5bf9\u5e94\u7684\u7ec4\u4ef6"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'<Router>\n  <ul>\n    <li><Link to="/">Home</Link></li>\n        <li><Link to="/about">About</Link></li>\n    <li><Link to="/contact">Contact</Link></li>\n    </ul>\n\n    <Route path="/" exact component={Home} />\n  <Route path="/about" component={About} />\n  <Route path="/contact" component={Contact} />\n</Router>\n\n')),(0,o.kt)("p",null,"\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"Switch"),"\u5305\u88f9\u8def\u7531\u6765\u544a\u8bc9 React Router \u4e00\u6b21\u4ec5\u52a0\u8f7d\u4e00\u6761\u8def\u7531"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";\n\n<Switch>\n  <Route path="/" exact component={Home} />\n  <Route path="/about" component={About} />\n  <Route path="/contact" component={Contact} />\n</Switch>;\n\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const name = 'react'\n\n<li><Link to={`/about/${name}`}>About</Link></li>\n\n<Switch>\n    <Route path=\"/about/:name\" component={About} />\n</Switch>\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"About"),"\u7ec4\u4ef6\u5c31\u53ef\u4ee5\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"props.match.params.name"),"\u63a5\u53d7\u5230\u8def\u7531\u4f20\u9012\u8fc7\u6765\u7684\u53c2\u6570"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const About = ({\n  match: {\n    params: { name },\n  },\n}) => (\n  // props.match.params.name\n  <Fragment>\n    <h1>About {name}</h1>\n    <FakeText />\n  </Fragment>\n);\n")),(0,o.kt)("p",null,"JS\u5b9e\u73b0\u9875\u9762\u8df3\u8f6c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { Router, Route, hashHistory } from \'react-router\'\n\n\nrender((\n  <Router history={hashHistory}>\n    <Route path="/" component={App}/>\n    <Route path="/repos" component={Repos}/>\n    <Route path="/about" component={About}/>\n  </Router>\n), document.getElementById(\'app\'))\n\nlocalhost/#/repos\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import React from \'react\'\nimport { Link } from \'react-router\'\n\nexport default React.createClass({\n  render() {\n    return (\n      <div>\n        <h1>React Router Tutorial</h1>\n        <ul role="nav">\n          <li><Link to="/about">About</Link></li>\n          <li><Link to="/repos">Repos</Link></li>\n        </ul>\n      </div>\n    )\n  }\n})\n')),(0,o.kt)("p",null,"\u5355\u9875\u9762",(0,o.kt)("inlineCode",{parentName:"p"},"WEB"),"\u5e94\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"SPA")),(0,o.kt)("p",null,"\u6574\u4e2a\u5e94\u7528\u53ea\u6709\u4e00\u4e2a\u5b8c\u6574\u7684\u9875\u9762"),(0,o.kt)("p",null,"\u70b9\u51fb\u9875\u9762\u4e2d\u7684\u94fe\u63a5\u4e0d\u4f1a\u5237\u65b0\u9875\u9762\u3002\u53ea\u4f1a\u505a\u9875\u9762\u7684\u5c40\u90e8\u66f4\u65b0"),(0,o.kt)("p",null,"\u6570\u636e\u90fd\u9700\u8981\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"AJAX"),"\u8bf7\u6c42\u83b7\u53d6 \u5e76\u5728\u524d\u7aef\u5f02\u6b65\u5c55\u73b0"),(0,o.kt)("p",null,"\u4e00\u4e2a\u8def\u7531\u5c31\u662f\u4e00\u4e2a\u6620\u5c04\u5173\u7cfb ",(0,o.kt)("inlineCode",{parentName:"p"},"key:value")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"key"),"\u4e3a\u8def\u5f84\u3002",(0,o.kt)("inlineCode",{parentName:"p"},"value"),"\u53ef\u80fd\u662f",(0,o.kt)("inlineCode",{parentName:"p"},"functon")," \u6216\u8005 ",(0,o.kt)("inlineCode",{parentName:"p"},"component")),(0,o.kt)("p",null,"\u524d\u7aef\u8def\u7531. ",(0,o.kt)("inlineCode",{parentName:"p"},"history")))}s.isMDXComponent=!0}}]);