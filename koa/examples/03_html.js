const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  ctx.require.type = 'html'
  ctx.response.body = fs.createReadStream('../index.html')
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
