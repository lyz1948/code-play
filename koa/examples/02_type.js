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

