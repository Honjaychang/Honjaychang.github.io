# WebPack

## `webapck`

打包原理

- 识别入口文件
- 通过逐层识别模块依赖(Commonjs、amd或者es6的import，webpack都会对其进行分析，来获取代码的依赖)
- webpack做的就是分析代码，转换代码，编译代码，输出代码
- 最终形成打包后的代码

#### `loader` 

- `loader`是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
- 处理一个文件可以使用多个`loader`，`loader`的执行顺序和配置中的顺序是相反的。
- 第一个执行的`loader`接收源文件内容作为参数，其它`loader`接收前一个执行的`loader`的返回值作为参数，最后执行的`loader`会返回此模块的`JavaScript`源码
- 以 `.scss` 文件为例子：
  - 先将 `.scss` 文件内容交给 `sass-loader` 翻译为 `css`
  - 在将翻译后的 `css` 交给 `css-loader` ，找出 `css` 中依赖的资源，压缩 `css`
  - 再将 `css-loader` 输出的内容交给 `style-loader` ，转化为通过脚本加载的 `Js` 代码

#### `plugin`

- 在 `Webpack` 运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果
- 插件可以用来修改输出文件、增加输出文件、甚至可以提升 `Webpack` 性能、等等
- `plugin` 是插件扩展器，它丰富了`wepack`本身，针对是`loader`结束后，`webpack` 打包的整个过程它不直接操作文件，而是基于事件机制工作，会监听`webpack`打包过程中的某些事件钩子（`run make emit`，执行任务。
- `plugin` 比 `loader` 强大，通过`plugin` 可以访问 `compliler`和`compilation`过程，通过钩子拦截 `webpack` 的执行。

```js
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// console.log(path.resolve('webpack.config.js'))
module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // loaders: ["style","css","less"]
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  // plugins配置
  plugins: [
    // 重新创建html文件
    new HtmlWebpackPlugin({
      title: "首页",
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
};
```

#### `Webpack` 能处理 `CSS` 吗？

- `Webpack` 本身是一个面向 `JavaScript` 且只能处理 `JavaScript` 代码的模块化打包工具

- `Webpack` 在 `loader` 的辅助下，是可以处理 `CSS` 的
- 两个关键的 `loader`: 
  - `css-loader` 导入 `CSS` 模块，对 `CSS` 代码进行编译处理
  -  `style-loader` 创建 `style` 标签，把 `CSS` 内容写入标签
  - `css 比 style loader 优先执行 但是书写顺序 style写在前面`
- 

## 手动搭建项目

- 

```js
│  .babelrc
│  .gitignore
│  index.html
│  LICENSE
│  package-lock.json
│  package.json
│  postcss.config.js
│  README.md
│  webpack.config.js
│  
├─dist
│      bundle-40277308b55fa87c0dd3.js
│      index.html
│  
├─node_modules
│
└─src
    │  App.vue
    │  main.js
    │  
    ├─assets
    │  └─images
    │          pic.png
    │          
    ├─components
    ├─router
    │      index.js
    │      
    ├─utils
    └─views
            About.vue
            Home.vue
```

`Ref`：[不使用cli脚手架搭建vue项目工程(webpack简单配置)](https://blog.csdn.net/u013368397/article/details/86467581?utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-12.control&dist_request_id=1332036.9764.16191606387455007&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-12.control)





`path.join(path1, path2, path3...)`

- 拼接
- 将路径片段使用特定的分隔符`(window：\)`连接起来形成路径，并规范化生成的路径。
- 若任意一个路径片段类型错误，会报错。

`path.resolve([from...], to)`

- 把一个路径或路径片段的序列解析为一个绝对路径  相当于执行cd操作

`__dirname`

- 当前文件所在的绝对路径

多个入口文件

```js
  entry: {
    bundle1: "./main1.js",
    bundle2: "./main2.js",
  },
  output: {
    filename: "[name].js",
  },
```

`loader`

- `react`

```js
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
```

- `Webpack`允许在`JS`文件中包含`CSS`，需要`CSS-loader`对这些`CSS`进行处理 
  - `CSS-loader`用来读取`CSS`文件来转换，另一个`Style-loader`用来往`HTML`中插入`<style>`标签

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
```

- `url-loader`将`image`文件转为`<img>`标签，如果图片大小小于`8192 Bytes`，它将转换为`Data url`（翻译：图片变为Base64编码，减少请求次数），否则，他将转为普通文件URL。

```js
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        ]
      }
    ]
  }
```

`plugin`

- `uglifyjs-webpack-plugin`

```js
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

	new UglifyJsPlugin(), // 压缩JS代码 使JS文件体积变小
```

- `html-webpack-plugin`

```js
var HtmlwebpackPlugin = require('html-webpack-plugin')

    new HtmlwebpackPlugin({ // 创建index文件 指定
      title: 'WebPack_demo',
      filename: 'index.html'
    })
```

- `open-browser-webpack-plugin`

```js
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

    new OpenBrowserPlugin({ // 能够在Webpack加载时打开一个新的浏览器tab
      url: 'http://127.0.0.1:8080'
    })
```

`Ref`:

- [[翻译]阮一峰webpack教程（Demo集合）](https://juejin.cn/post/6844903635474710541)
- [webpack-demos](https://github.com/ruanyf/webpack-demos)

