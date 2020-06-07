# Webpack4

## 构建 React + React-router + Redux + Scss/Css

### 安装 Webpack

```js
$ yarn add webpack -D
```

add `webpack.config.js` file

```js
const { resolve, join } = require('path')
const paths = {
  src: resolve(__dirname, 'src'),
  dist: resolve(__dirname, 'dist'),
  public: resolve(__dirname, 'public'),
}
module.exports = {
  entry: [join(paths.public, 'index.html'), join(paths.src, 'index.jsx')],
  output: {
    path: paths.dist,
    filename: '[name].js',
  },
}
```

### 使用 babel

- @babel/core # babel 核心的东西
- @babel/preset-react # 转换 JSX 语法并去除类型注释
- @babel/preset-env # 转换 es6 语法 如 for of 箭头函数等等
- @babel/plugin-transform-runtime # 复用插件
- @babel/runtime
- @babel/polyfill # 转换 es6 的新函数或对象如 Promise,Set,Map,Array.from 等

```js
$ yarn add @babel/core @babel/preset-react @babel/preset-env @babel/plugin-transform-runtime @babel/polyfill @babel/runtime  -D
```

**Install `babel-loader`**

```js
$ yarn add babel-loader -D
```

**Install `html-loader` and `html-webpack-plugin`**

```js
$ yarn add html-webpack-plugin html-loader -D
```

### 配置 webpack

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...
  module: {
    rules: [
      {
        //处理jsx,js
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.html?/,
        exclude: /node_modules/,
        include: resolve(__dirname, "public"),
        use: {
          loader: "html-loader",
          options: {
            minimize: true
          }
        }
      }
     ]
    }
   ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(paths.public, "index.html"),
      filename: "index.html",
      title: "Caching"
    })
  ]
}
```

添加 `.babelrc` 文件

```js
{
  "presets": [
    "@babel/env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

**添加 React 及 react-dom**

```js
$ yarn add react react-dom -D
```

添加 `main.jsx` 文件

```js
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h1>Hello, Webpack!</h1>
  }
}

ReactDOM.reander(<App />, document.getElementById('root'))
```

添加 `webpack-cli` 命令行工具

```js
$ yarn add webpack-cli -D
```

添加 `node-sass`

```js
$ yarn add node-sass -D
```

添加处理样式的 loader

```js
$ yarn add css-loader sass-loader -D
```

添加 css 代码提取插件 `mini-css-extract-plugin`

```js
yarn add mini-css-extract-plugin -D
```

修改 `webpack.config.js` 配置文件

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test:/\.(css|scss|sass)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, "src"),
        loaders:[
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 20
            }
          },
          {
            loader: "sass-loader",
            options:{
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...
    new MiniCssExtractPlugin({
      filename:"[name].css",
      chunkFilename:"[id].css"
    })
  ]
  ...
}
```

添加 `webpack-dev-serve` 使用热更新

```js
$ yarn add webpack-dev-serve -D
```

```js
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  output: {
    chunkFilename: isProd ? '[name].[hash].js' : '[name].js',
    filename: isProd ? '[name].[hash].js' : '[name].js',
    publicPath: resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        //处理jsx,js
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: isDev,
            sourceMap: isDev,
          },
        },
      },
      {
        ///处理html
        test: /\.html?/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'public'),
        use: {
          loader: 'html-loader',
          options: {
            minimize: isDev, // 压缩html代码
            sourceMap: isDev, // 生产环境可以不用资源映射
          },
        },
      },
      {
        //处理css/scss/sass
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev, // 资源映射
              modules: true, // 是否允许模块
              importLoaders: 20,
              localIdentName: isDev
                ? '[path][name]__[local]--[hash:base64:5]'
                : ' ',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev, // 生产环境关闭sourceMap
            },
          },
        ],
      },
    ],
  },
}
```

提取 webapck 公用的内容，使用 `webpack-merge` 来合并代码

```js
$ yarn add webpack-merge -D
```

将 weibpack 的配置文件分成 3 份，一个的公用的，一个是开发环境的，另一个是线上环境的

```js
// webpack.dev.config.js
const common = require('./webpack.common.config')
const { resolve } = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common, {
  // 合并两个webpack文件
  devServer: {
    port: 3000,
    contentBase: [resolve(__dirname, 'public'), resolve(__dirname, 'dist')], // 找public下的index.html
    compress: true,
    hot: true, // 模块热加载
    inline: true,
    open: 'Chrome', // 构建完成时自动打开浏览器
    openPage: '',
  },
  devtool: 'inline-source-map', // 方便调试，将src目录下的资源映射到浏览器中
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 使用模块热加载插件
  ],
})
```

```js
// webpack.config.js
const common = require('./webpack.common.config')
const merge = require('webpack-merge')
module.exports = merge(common, {
  devtool: 'none',
  mode: 'production',
})
```

修改`package.json`中的`scripts`配置

```js
// package.json

{
  ...
  "scripts": {
    "build": "webpack -p --progress --mode production",
    "start": "webpack-dev-server --config ./webpack.dev.config.js --process --color --mode development"
  },
  ...
```

### Postcss

```js
$ yarn add postcss postcss-loader -D
```

安装 postcss 插件

```js
$ yarn add postcss-preset-env autoprefixer postcss-scss postcss-flexbugs-fixes precss postcss-nested astroturf postcss-syntax postcss-safe-parser postcss-sass postcss-scss
```

各个插件对应的功能说明

```js
postcss-preset-env # 使用css的新特性，可以使用css变量等新属性
autoprefixer # 自动添加各个浏览器的前缀
postcss-scss # 使用scss语法
postcss-flexbugs-fixes # 解决flex问题的插件
precss # 让编译后的css更好看
postcss-nested # 处理jsx里面的css
astroturf   # 处理jsx里面的css
postcss-syntax # 自动根据扩展名切换语法
postcss-safe-parser # 查找css中的错误，并修补
postcss-sass # sass语法
postcss-scss # scss语法
```

修改`webpack.common.config.js`文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: [
    '@babel/polyfill',
    join(paths.public, 'index.html'),
    join(paths.src, 'index.js'),
  ],
  output: {
    chunkFilename: isProd ? '[name].[hash].js' : '[name].js',
    filename: isProd ? '[name].[hash].js' : '[name].js',
    publicPath: resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        // 处理jsx,js
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: isDev,
            sourceMap: isDev,
          },
        },
      },
      {
        // 处理html
        test: /\.html?/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'public'),
        use: {
          loader: 'html-loader',
          options: {
            minimize: isDev, // 压缩html代码
            sourceMap: isDev, // 生产环境可以不用资源映射
          },
        },
      },
      {
        // 处理css/scss/sass
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev, // 资源映射
              modules: true, // 是否允许模块
              importLoaders: 20,
              localIdentName: isDev
                ? '[path][name]__[local]--[hash:base64:5]'
                : ' ',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev, // 生产环境关闭sourceMap
            },
          },
          {
            // 启用 postcss
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(paths.public, 'index.html'),
      filename: 'index.html',
      title: 'Webpack for React Redux React-router',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].[hash].css' : '[name].css',
      chunkFilename: isDev ? '[id].[hash].css' : '[id].css',
    }),
  ],
}
```

添加`postcss.config.js`配置文件

```js
// postcss.config.js
const flexbugsFixes = require('postcss-flexbugs-fixes')
const presetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const nested = require('postcss-nested')

// 根据文件扩展名来选择语法
const syntax = require('postcss-syntax')({
  sass: require('postcss-sass'),
  css: 'postcss-safe-parser',
  scss: 'postcss-scss',
})

module.exports = {
  syntax: syntax,
  //插件
  plugins: [
    flexbugsFixes,
    presetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    autoprefixer({ grid: true }),
    precss,
    nested,
  ],
}
```

添加处理文件的 loader `url-loader`

```js
$ yarn add url-loader -D
```

处理 `url-loader`处理不了的文件

```js
yarn add responsive-loader jimp -D
```


```js
module.exports = {
  module: {
    rules: [
      {
        // 处理图片文件
       test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        loader: require.resolve('url-loader'),
        options: {
          limit: 8192, //图片在这个范围内，会将图片变成base64减少http请求
          fallback: 'responsive-loader', //回退的loader
        },
      },
    ],
  },
}
```
