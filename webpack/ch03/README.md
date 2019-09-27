# Development

安装自动生成html文件和清除上次构建文件目录的插件

```js
yarn add html-webpack-plugin clean-webpack-plugin -D
```

在`webpack.config.js`中引入并使用它们

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    ...
  },
  ...
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'development'
    })
  ]
}

```

引入`html-webpack-plugin` 和 `clean-webpack-plugin`，同时修改了`filename`的内，用[name]来自动生成对应的文件名

使用`devtool: 'inline-source-map'` 来开启 source map

```js
module.exports = {
  mode: 'development',
  ...
  devtool: 'inline-source-map',
  plugins: [
    ...
  ]
}
```

在src/print.js 里面，故意将console单词打错，导致错误。这样控制台就会打印出错误信息，方便开发调试。

**开启watch模式**
可以告诉webpack要监听的文件或目录，当监听的文件或该目录下的文件有变动的时候，会重新编译打包。我们在package.json里面添加命令

```json
{
  "name": "ch03",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^2.0.2",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.32.0",
    "webpack-cli": "^3.3.2"
  }
}
```

现在运行`npm run watch` 或 `yarn watch` 命令，则会监听修改的文件，时时更新

## 热更新

安装热更新模块 `webpack-dev-server`

```js
npm install webpack-dev-server -D
```

在`webpack.config.js`中加入

```js
module.exports = {
  ...
  devServer: {
    contentBase: './dist'
  },
  ...
}
```

修改`package.json`文件的`scripts`, 添加 `serve`字段内容

```js
// package.json
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open"
  }
  ...
}
```

现在命令行执行`npm run start`命令，这时候浏览器会自动打开，如果修改了文件你更新了内容，浏览器会自动刷新

### 中间件

```js
npm install express webpack-dev-middleware -D
```

在`webpack.config.js`中，加入`publicPath`配置路径

```js
module.exports = {
  ...
  output: {
    publicPath: '/'
  }
  ...
}
```

然后我们在根目录添加`server.js`文件

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

const host = '127.0.0.1'
const port = process.env.PORT || 3752
app.listen(port, () => {
  console.log(`Express server is runing at http://${host}:${port}`)
})
```

命令行运行 `npm run serve`
