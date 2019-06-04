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

