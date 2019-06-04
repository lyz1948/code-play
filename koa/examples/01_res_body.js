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
