# Loader

安装`style-loader` 和 `css-loader`

```js
npm install style-loader css-loader -D
```

`webpack.confog.js`配置文件的`module`对象里加入刚才安装的loader

```js
module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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

`webpack.config.js`中加入处理图标字体的loader

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