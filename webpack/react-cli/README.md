# React开发环境搭建

## 如何使用webpack搭建react项目

首先创建一个项目目录

```js
mkdir webpack-react-tpl && cd webpack-react-tpl
```

项目下创建 `package.json` 文件，使用 `npm` 或者 `yarn` 自动生成

```js
npm init -y
# or
yarn init -y
```

在创建一个 `src` 目录，存放入口文件 `main.js`，以及 `build` 目录，存放打包构建的 `webpack` 配置文件

```js
mkdir -p src
mkdir -p build
touch src/main.js
touch build/webpack.config.js
```

src/main.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, React!</h1>,
  document.getElementById('root')
)
```

build/webpack.config.js

```js
const { resolve } = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```

项目最基本的目录结构和最基本的文件已经Ok，现在来安装 `webpack` 和 `react`

```js
yarn add webpack webpack-cli -D
```

安装 react

```js
yarn add react react-dom
```

`package.json` 文件中写入执行 `webpack` 打包的快捷命令

package.json

```js
"scripts": {
  "build": "webpack --mode production --config build/webpack.config.js"
}
```

现在命令行执行打包命令， 这时候，你会发现项目里多了个 `dist` 目录

```js
yarn build
```

## Babel 安装

React组件大部分是用JavaScriptES6编写的。ES6是对语言的一个很好的改进，但是旧的浏览器无法理解新的语法。以class关键字为例。有状态的react组件被声明为类。因此，要让ES6在旧的浏览器中工作，我们需要进行某种转换。

```js
yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react -D
```

创建 `.babelrc` babel 配置文件

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

webpack.config.js

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modeles/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```

对于每个扩展名为JS或JSX的文件，webpack都通过babel加载程序传输代码，以便将ES6转换为ES5。

## html的插件

```js
yarn add html-webpack-plugin html-loader -D
```

webpack.config.js

```js
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve(__dirname, '../template/index.html'),
      filename: './index.html'
    })
  ]
}
```

template/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Cli</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

现在执行打包命令：

```js
yarn build
```

浏览器里打开 `dist/index.html` 你就能看到 `hello react!`

### webpack dev server

使用 `webpack-dev-server` 热更新插件

```js
yarn add webpack-dev-server -D
```

package.json

```js
"scripts": {
  "serve": "webpack-dev-server --open --mode development --config build/webpack.config.js",
  "build": "webpack --mode production --config build/webpack.config.js"
}
```

现在执行启动命令：

```js
yarn serve
```

修改 `src/main.js` 文件，浏览器里马上呈现修改后的内容，是不是很嗨？
