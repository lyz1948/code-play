# 缓存

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
