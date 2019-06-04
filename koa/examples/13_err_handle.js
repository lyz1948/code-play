const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const handleError = async(ctx, next) => {
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
