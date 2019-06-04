# Koa

## koa启动一个基本服务

初始化`package.json`文件

```js
npm init -y
```

安装`Koa`

```js
npm install koa -S
```

创建一个启动的js文件

```js
touch app.js
```

app.js内写入的内容

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

启动`Koa`服务

```js
node app.js
```

## 呈现内容

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  ctx.response.body = 'Hello Koa!'
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## 返回的类型

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  const receiveType = ctx.request.accepts
  if(receiveType('xml')){
    ctx.response.type = 'xml'
    ctx.response.body = '<data>Hello Koa!</data>'
  } else if(receiveType('json')) {
    ctx.response.type = 'json'
    ctx.response.body = {data: 'Hello Koa!'}
  } else if(receiveType('html')) {
    ctx.response.type = 'html'
    ctx.response.body = '<h1>Hello Koa!</h1>'
  } else {
    ctx.response.type = 'text'
    ctx.response.body = 'Hello Koa!!'
  }
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## 读取外部的`Html`文件

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  ctx.require.type = 'html'
  ctx.response.body = fs.createReadStream('./html/index.html')
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## `Koa`简单路由

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  if(ctx.reqest.path = '/') {
    ctx.require.type = 'html'
    ctx.response.body = '<h1>Home Page</h1>'
  } else {
    ctx.response.body = 'Hello Koa!'
  }
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## `koa-router`路由

```js
 const Koa = require('koa')
 const Router = require('koa-router')
 const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const router = new Router()

const main = ctx => {
  ctx.response.body = '<h1>Hello Koa!</h1>'
}

const contact = ctx => {
  ctx.response.type = 'html'
  ctx.response.body = '<p>联系我们</p>'
}

router.get('/', main)
router.get('/contact', contact)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
 ```

## 日志

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  ctx.response.body = 'Hello Koa!'
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## 中间件

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next()
}

const main = ctx => {
  ctx.response.body = 'Hello Koa!'
}

app
  .use(logger)
  .use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## 多个中间件的调用与执行顺序

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const one = (ctx, next) => {
  console.log('-> one')
  next()
  console.log('<- one')
}

const two = (ctx, next) => {
  console.log('-> two')
  next()
  console.log('<- two')
}

const three = (ctx, next) => {
  console.log('-> three')
  next()
  console.log('<- three')
}

app
  .use(one)
  .use(two)
  .use(three)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
// -> one -> two -> three <- three <- two <- one
```

## 异步中间件

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const asyncIo = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const one = () => async (ctx, next) => {
  ctx.body = 'Hello Koa '
  await next()
  ctx.body += ' middleware1'
}

const two = async (ctx, next) => {
  await asyncIo(3000)
  ctx.body += 'done '
  await next()
}

app
  .use(one())
  .use(two())

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
// 3秒后输出 Hello Koa done  middleware1
```

## `koa-compose`合并中间件

```js
const compose = require('koa-compose')
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next()
}

const main = ctx => {
  ctx.body = 'Hello Koa!'
}

const middleware = compose([logger, main])

app.use(middleware)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## `koa-static`静态资源

```js
const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const path = require('path')
const host = '127.0.0.1'
const port = 3752

const main = serve(path.join(__dirname))
app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## 重定向

```js
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const router = new Router()

const about = ctx => {
  ctx.response.redirect('/')
  ctx.body = '<a href="/">Go To Home Page</a>'
}

const main = ctx => {
  ctx.body = '<h1>Home Page</h1><a href="/about">Go To About Page</a>'
}

app
  .use(route.get('/', main))
  .use(route.get('/about', about))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

## `error`错误

### 500错误

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  ctx.throw(500)
}

app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

### 404错误

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  ctx.throw(404)
  ctx.body = 'Page Not Found'
}

app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

### 错误处理

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const handleError = async (ctx, next) => {
  try{
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message
    }
  }
}

const main = ctx => {
  ctx.throw(500)
}

app
  .use(handleError)
  .use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

### 错误监听

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  ctx.throw(500)
}

app.on('error', (err, ctx) => {
  console.error('Server error', err)
})

app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

### 错误触发

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const handleError = async (ctx, next) => {
  try{
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.type = 'html'
    ctx.body = '<p>Something wrong</p>'
    ctx.app.emit('error', err, ctx)
  }
}

const main = ctx => {
  ctx.throw(500)
}

app.on('error', (err, ctx) => {
  console.log('logging error', err.message)
  console.log(err)
})

app
  .use(handleError)
  .use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

### Cookies

```js
const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752


const main = ctx => {
  const n = Number(ctx.cookies.get('view') || 0) + 1
  ctx.cookies.set('view', n)
  ctx.body = n + ' views'
}

app
  .use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

### form 请求

```js
const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = async (ctx) => {
  const body = ctx.request.body
  if(!body.name) ctx.throw(400, '.name require')
  ctx.body = { name: body.name }
}

app.use(koaBody())
app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

```js
curl -X POST --data "name=Jack" 127.0.0.1:3752
```

### 上传文件

```js
const Koa = require('koa')
const koaBody = require('koa-body')
const path = require('path')
const os = require('os')
const fs = require('fs')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = async (ctx) => {
  const tmpdir = os.tmpdir()
  const filePaths = []
  const files = ctx.request.body.files || {}

  for(let key in files) {
    const file = files[key]
    const filePath = path.join(tmpdir, file.name)
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer)
    filePaths.push(filePath)
  }
  ctx.body = filePaths
}

app.use(koaBody({ multipart: true }))
app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
```

```js
curl --form upload=@/path/to/file http://127.0.0.1:3752
```

