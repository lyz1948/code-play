# Webpack

## Install

**Local Installation**
项目里安装 webpack, 推荐使用项目安装，这样可以控制 webpack 的版本，不同项目可以使用不同的版本

```js
npm install webpack -D
// or
yarn add webpack -D
```

指定安装版本

```js
npm install webpack@<version> -D
```

如果您使用的是 webpack v4 或更高版本，则还需要安装 CLI

```js
npm install webpack-cli -D
```

我们建议大多数项目使用本地安装。这样可以在引入更改更改时更轻松地单独升级项目。通常，webpack 通过一个或多个 npm 脚本运行，这些脚本将在本地 node_modules 目录中查找 webpack 安装：

```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

## Guide

创建目录，进入目录`npm init -y` 生成`package.json`文件，并在目录下安装`webpack` 和 `webpack-cli`

```js
npm init -y
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

```js
touch index.html
mkdir src
touch src/index.js
```

`src/index.js`

```js
function component() {
  const div = document.createElement('div')

  div.innerHTML = 'Hello Webpack'

  return div
}

document.body.appendChild(component())
```

修改`package.json`文件

```js
{
  ...
  "private": true,
  ...
}
```

**打包编辑**
编辑后，生成 dist 目录，目录下有个 main.js 文件，`index.html`引入这个`main.js`文件即可

```js
npx webpack
```

## Loader

安装`style-loader` 和 `css-loader`

```js
npm install style-loader css-loader -D
```

`webpack.confog.js`配置文件的`module`对象里加入刚才安装的 loader

```js
module: {
  rules: [
    {
      test: /.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

然后我们再创建一个样式文件，并在`src/index.js`里面引入样式文件

```js
import './style.css'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = 'Hello Webpack Use Css Loader'
  return div
}

document.body.appendChild(component())
```

## file loader

安装 `file-loader`

```js
npm install file-loader -D
```

`webpack.config.js`配置文件加入 `file-loader`

```js
module.exports = {
 ...
  module: {
    rules: [
      ...
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
```

引入目录下的图片文件

```js
// src/index.js
import Icon from './scan.png'

function component() {
  ...
  const myIcon = new Image()
  myIcon.src = Icon

  div.appendChild(myIcon)
  ...
}
```

**loading fonts**

`webpack.config.js`中加入处理图标字体的 loader

```js
module.exports = {
 ...
  module: {
    rules: [
      ...
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
```

## Development

安装自动生成 html 文件和清除上次构建文件目录的插件

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

在 src/print.js 里面，故意将 console 单词打错，导致错误。这样控制台就会打印出错误信息，方便开发调试。

**开启 watch 模式**
可以告诉 webpack 要监听的文件或目录，当监听的文件或该目录下的文件有变动的时候，会重新编译打包。我们在 package.json 里面添加命令

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

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
)

const host = '127.0.0.1'
const port = process.env.PORT || 3752
app.listen(port, () => {
  console.log(`Express server is runing at http://${host}:${port}`)
})
```

命令行运行 `npm run serve`

## 模块切割

`index.js` 文件内容

```js
import _ from 'lodash'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = _.join(['hello', 'webpack'])

  return div
}

document.body.appendChild(component())
```

`another-module.js` 文件内容

```js
import _ from 'lodash'

console.log(_.join(['another', 'module', 'lodash']))
```

webpack.config.js 文件, entry 入口处引入 2 个文件

```js
module.exports = {
  ...
  entry: {
    app: './src/index.js',
    another: './src/another-module.js'
  },
  ...
}
```

2 个文件中都同时都引入了`lodash` 在打包后，发现`another-bundle.js` 和 `app.bundle.js` 都是 `1.37M`多，我们不希望每个文件都把 lodash 引入进来

```js
Time: 1114ms
Built at: 2019-05-23 06:12:41
            Asset       Size   Chunks             Chunk Names
another.bundle.js   1.37 MiB  another  [emitted]  another
    app.bundle.js   1.37 MiB      app  [emitted]  app
       index.html  252 bytes           [emitted]
Entrypoint app = app.bundle.js
Entrypoint another = another.bundle.js
```

### splitChunks

```js
module.exports = {
  ...
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

在`webpack.config.js` 中加入`splitChunks`的配置后，重新打包，发现有一个`vendors~app.bundle.js`的文件，这个就是多个文件中包含的共同模块

```js
Hash: bd1857effc3d1720545b
Version: webpack 4.32.1
Time: 790ms
Built at: 2019-05-23 06:21:07
                Asset       Size       Chunks             Chunk Names
        app.bundle.js   15.7 KiB          app  [emitted]  app
           index.html  256 bytes               [emitted]
vendors~app.bundle.js   1.36 MiB  vendors~app  [emitted]  vendors~app
Entrypoint app = vendors~app.bundle.js app.bundle.js
```

### 动态导入

```js
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    ...
    chunkFilename: '[name].bundle.js',
    ...
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
}
```

src/index.js 文件做下修改

```js
function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = _.join(['hello', 'webpack'])

  return div
}

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash')
    .then(({ default: _ }) => {
      component()
    })
    .catch(error => 'An error occurred while loading the component')
}

getComponent().then(comp => {
  document.body.appendChild(comp)
})
```

```js
Hash: f066dd8551bd796a3563
Version: webpack 4.32.1
Time: 834ms
Built at: 2019-05-23 06:35:22
                   Asset       Size          Chunks             Chunk Names
           app.bundle.js   20.4 KiB             app  [emitted]  app
              index.html  187 bytes                  [emitted]
vendors~lodash.bundle.js   1.36 MiB  vendors~lodash  [emitted]  vendors~lodash
Entrypoint app = app.bundle.js
```

执行打包后，动态导入的方式和使用`splitChunks`方式的效果是一样的，不过注意在注释中使用 webpackChunkName。
这将导致我们的单独包名为 lodash.bundle.js，而不仅仅是[id] .bundle.js

使用异步函数修改 index.js

src/index.js

```js
function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = _.join(['hello', 'webpack'])

  return div
}

async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName: "ladash" */ 'lodash')

  component()
}

getComponent().then(comp => {
  document.body.appendChild(comp)
})
```

安装 `plugin-syntax-dynamic-import` 插件

```js
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

根目录下创建`.babelrc`文件，写入配置

```js
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

### 预取/预加载模块

`LoginButton.js` 文件

```js
import(/* webpackPrefetch: true */ 'LoginModal')
```

上面的代码类似在 html 文件页面的头部中加入
`<link rel =“prefetch” href =“login-modal-chunk.js”>` 标签，这将指示浏览器在空闲时间预取 login-modal-chunk.js 文件

`ChartComponent.js` 文件

```js
...
import(/* webpackPreload: true */ 'ChartingLibrary')
```

当请求使用`ChartComponent`的页面时，还通过`<link rel =“preload”>`请求图表库块。
假设页面块较小并且完成得更快，则将使用 LoadingIndicator 显示页面，直到已经请求的图表库块完成为止。
这将提供一点加载时间，因为它只需要一次往返而不是两次。

## 缓存

**使用 `optimization.runtimeChunk`**
webpack 提供了一种优化功能，可使用 optimization.runtimeChunk 选项将运行时代码拆分为单独的块

`webpack.config.js`

```js
module.exports = {
  ...
  optimization: {
    runtimeChunk: 'single'
    ...
  }
}
```

将第三方库（例如 lodash 或 react）提取到单独的供应商块也是一种很好的做法，因为它们比我们的本地源代码更不可能更改。此步骤将允许客户端从服务器请求更少，以保持最新。
这可以通过使用`SplitChunksPlugin`的`cacheGroups`选项来完成。
让我们使用带有下一个 params 和 build 的 cacheGroups 添加 optimization.splitChunks

```js
module.exports = {
  ...
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendar: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendars',
          chunks: 'all',
        }
      }
    }
  }
  ...
}
```

模块标识符

`webpack.config.js`

```js
const webpack = require('webpack')

module.exports = {
  ...
  plugins: [
    ...
    new webpack.HashedModuleIdsPlugin()
  ],
  ...
}
```

## 打包项目

假设您正在编写一个小型库，即 webpack-numbers，它允许用户将数字 1 到 5 从数字表示转换为文本数字，反之亦然，例如 2 到'2'。
那么我们可以使用 webpack 来帮助我们打包项目，该项目需要支持一下几种使用方式

1. ES2015 方式引入

```js
import webpackNumbers from 'webpack-numbers'
webpackNumbers.wordToNum('Two')
```

2. CommonJS 方式引入

```js
const webpackNumbers = require('webpack-numbers')
webpackNumbers.wordToNum('Two')
```

3. AMD 方式引入

```js
require(['webpackNumbers'], function(webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two')
})
```

4. 通过脚本标记包含的全局变量

```html
<!DOCTYPE html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // Global variable
    webpackNumbers.wordToNum('Five')
    // Property in the window object
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
```

```js
npm init -y
mkdir src
touch src/index.js
touch src/ref.json
touch webpack.config.js
npm install webpack webpack-cli lodash -D
```

`src/index.js` 文件

```js
import _ from 'lodash'
import numRef from './ref.json'

export function numToWord(num) {
  return _.reduce(
    numRef,
    (acc, ref) => {
      return ref.num === num ? ref.work : acc
    },
    ''
  )
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (acc, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : acc
    },
    -1
  )
}
```

`src/ref.json` 文件

```js
;[
  {
    num: 1,
    word: 'One'
  },
  {
    num: 2,
    word: 'Two'
  },
  {
    num: 3,
    word: 'Three'
  },
  {
    num: 4,
    word: 'Four'
  },
  {
    num: 5,
    word: 'Five'
  },
  {
    num: 0,
    word: 'Zero'
  }
]
```

`webpack.config.js` 文件

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'webpack-numbers.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

`package.json` 文件

```json
{
  "name": "webpack-numbers",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "lodash": "^4.17.11",
    "webpack": "^4.32.0",
    "webpack-cli": "^3.3.2"
  }
}
```

代码已经写好，现在我们来打包，运行`npm run build`命令

```js
Hash: 5972b7ee5535e498cd85
Version: webpack 4.32.2
Time: 344ms
Built at: 2019-05-24 06:10:45
             Asset     Size  Chunks             Chunk Names
webpack-numbers.js  552 KiB    main  [emitted]  main
Entrypoint main = webpack-numbers.js
```

`webpack-numbers.js`已经构建好了，不过当你查看该 js 文件的时候，发现`lodash`也被打包进去了，这样会导致项目很大，我们不想将`lodash`打包进去。在这种情况下，我们更愿意将 lodash 视为 peerDependency，让用户单独安装`lodash`

**externals**
使用`externals`字段修改 webpack.config.js 配置

```js
module.exports = {
  ...
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
}
```

上面的配置是，需要用户按照使用该库的时候，`lodash`是依赖项，需要单独安装，运行`build`命令后，发现文件小了很多

```js
Hash: f5dadd6acdb1d081b51a
Version: webpack 4.32.2
Time: 85ms
Built at: 2019-05-24 06:12:12
             Asset      Size  Chunks             Chunk Names
webpack-numbers.js  6.02 KiB    main  [emitted]  main
Entrypoint main = webpack-numbers.js
[./src/index.js] 340 bytes {main} [built]
[./src/ref.json] 254 bytes {main} [built]
[lodash] external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} 42 bytes {main} [built]
✨  Done in 0.70s.
```

打包完成，大功告成！！一脸的激动啊。不过别急，为了做的更好，我们应该考虑另外一些问题，比如下面这样

```js
import A from 'library/one'
import B from 'library/two'
```

我们需要再修改一下 webpack.config.js 文件的配置

```js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // Everything that starts with "library/"
    /^library\/.+$/
  ]
}
```

对于库的广泛使用，我们希望它在不同的环境中兼容，即 CommonJS，AMD，Node.js 和全局变量。要使您的库可供使用，我们在 output 里添加`library`来指定名字

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers'
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
}
```

项目包的公开为名为 `webpackNumbers` 的全局变量。
要使我们的库其他环境兼容，还需要将 `libraryTarget` 属性添加到配置中。

```js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers',
    libraryTarget: 'umd'
  },
  ...
}
```

最后一步，在`package.json`中`main`字段指向库文件地址

```json
{
  "name": "ch06",
  "version": "1.0.0",
  "main": "dist/webpack-numbers.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "lodash": "^4.17.11",
    "webpack": "^4.32.0",
    "webpack-cli": "^3.3.2"
  }
}
```

重新打包，收工！！

## 环境变量

```js
webpack --env.NODE_ENV=local --env.production --progress
```

`webpack.config.js`

```js
const path = require('path')

module.exports = env => {
  console.log('NODE_ENV', env.NODE_ENV) // local
  console.log('production', env.production) // true
  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
```

## Output Manage

到目前为止，我们手动将所有资产都包含在index.html文件中，但随着应用程序的增长，一旦开始在文件名中使用哈希并输出多个包，就很难手动管理index.html文件。但是，存在一些插件可以使这个过程更容易管理。

**HtmlWebpackPlugin**
安装`html-webpack-plugin`插件

```js
npm install html-webpack-plugin -D
```

`webpack.config.js`

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const r = path => resolve(__dirname, path)

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './src/printLog.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: r('./dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Use HtmlWebpackPlugin manage output'
    })
  ]
}
```

**删除dist目录**
每次编译的文件，如果hash值不一样会导致dist目录的文件越来越多，所以我们需要在编译之前删除dist目录

首先，安装`clean-webpack-plugin`插件

```js
npm install clean-webpack-plugin -D
```

`webpack.config.js`

```js
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new CleanWebpackPlugin(),
    ...
  ]
}
```

## 热更新模块

```js
const webpack = require('webpack')

module.exports = {
  ...
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    ...
  ]
}
```

**Via Node js Api**
将Webpack Dev Server与Node.js API一起使用时，请不要将dev服务器选项放在webpack配置对象上。相反，在创建时将它们作为第二个参数传递。例如

```js
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config')
const options = {
  contentBase: './dist',
  hot: true,
  host: '127.0.0.1'
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)
const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`dev server is listening port at ${port}`)
})
```

**HMR with Stylesheets**

```js
npm install style-loader css-loader -D
```

`webpack.config.js`

```js
module.exports = {
  ...
  module: {
    rules: [
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    ]
  }
}
```

## Production

开发和生产构建的目标差别很大。在开发中，我们需要强大的源映射和本地主机服务器，具有实时重新加载或热模块替换。在生产中，我们的目标转向关注缩小的束，更轻的源图和优化的资产，以改善加载时间。通过这种逻辑分离，我们通常建议为每个环境编写单独的webpack配置

**生产环境配置**
使用`webpack-merge` 来合并开发与生产配置

```js
npm install webpack-merge -D
```

在项目下建立3个配置文件，分别为共用的配置、开发配置、线上配置文件

```js
touch webpack.common.js
touch webpack.dev.js
touch webpack.prod.js
```

`webpack.common.js`

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ]
}
```

`webpack.dev.js`

```js
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtools: 'inline-srouce-map',
  devServer: {
    contentBase: './dist'
  }
})

```

`webpack.prod.js`

```js
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production'
})
```

在package.json的scripts字段里配置对应环境的设置
`--open` 参数是自动打开浏览器
`--config` 参数是webpack编译指向的文件

```json
{
  "scripts": {
    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

## 懒加载

`src/index.js`

```js
function component() {
  const div = document.createElement('div')
  const btn = document.createElement('button')

  div.innerHTML = ['hello', 'webpack'].join('\n\n')
  btn.innerHTML = 'click me to print log'
  div.appendChild(btn)
  btn.onclick = e => import(/* webpackChunkName "print" */ './print').then(module => {
    const print = module.default

    print()
  })
  return div
}

document.body.appendChild(component())
```

`print.js`文件

```js
console.log('The print.js module has loaded! See the network tab in dev tools')

export default () => {
  console.log('Button Clicked: Here\'s "some text"!')
}
```

编译后，我们浏览器打开`dist/index.html`文件，并没有看到`print.js`的`log`输出，需要按钮点击才去加载`print.js`，如果用户不点击，则不会加载`print.js`文件

## Typescript

```js
npm install typescript ts-loader -D
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

webpack.config.js

```js
const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
```