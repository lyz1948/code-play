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
