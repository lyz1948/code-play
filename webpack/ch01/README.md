# Webpack

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
编辑后，生成dist目录，目录下有个main.js文件，`index.html`引入这个`main.js`文件即可

```js
npx webpack
```
