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
