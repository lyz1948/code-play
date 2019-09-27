# 打包项目

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
    '',
  )
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (acc, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : acc
    },
    -1,
  )
}
```

`src/ref.json` 文件

```js
;[
  {
    num: 1,
    word: 'One',
  },
  {
    num: 2,
    word: 'Two',
  },
  {
    num: 3,
    word: 'Three',
  },
  {
    num: 4,
    word: 'Four',
  },
  {
    num: 5,
    word: 'Five',
  },
  {
    num: 0,
    word: 'Zero',
  },
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
    path: path.resolve(__dirname, 'dist'),
  },
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
    /^library\/.+$/,
  ],
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
    library: 'webpackNumbers',
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
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
