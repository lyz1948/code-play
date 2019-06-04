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
