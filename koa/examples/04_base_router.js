const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = ctx => {
  if(ctx.request.path = '/') {
    ctx.request.type = 'html'
    ctx.response.body = '<h1>Home Page</h1>'
  } else {
    ctx.response.body = 'Hello Koa!'
  }
}

app.use(main)
app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
