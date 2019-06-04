# 模块切割

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

webpack.config.js 文件, entry入口处引入2个文件

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

2个文件中都同时都引入了`lodash` 在打包后，发现`another-bundle.js` 和 `app.bundle.js` 都是 `1.37M`多，我们不希望每个文件都把lodash引入进来

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
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    component()
  }).catch(error => 'An error occurred while loading the component')
}

getComponent().then( comp => {
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

执行打包后，动态导入的方式和使用`splitChunks`方式的效果是一样的，不过注意在注释中使用webpackChunkName。
这将导致我们的单独包名为lodash.bundle.js，而不仅仅是[id] .bundle.js

使用异步函数修改index.js

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

getComponent().then( comp => {
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

上面的代码类似在html文件页面的头部中加入
`<link rel =“prefetch” href =“login-modal-chunk.js”>` 标签，这将指示浏览器在空闲时间预取login-modal-chunk.js文件

`ChartComponent.js` 文件

```js
...
import(/* webpackPreload: true */ 'ChartingLibrary')
```

当请求使用`ChartComponent`的页面时，还通过`<link rel =“preload”>`请求图表库块。
假设页面块较小并且完成得更快，则将使用LoadingIndicator显示页面，直到已经请求的图表库块完成为止。
这将提供一点加载时间，因为它只需要一次往返而不是两次。