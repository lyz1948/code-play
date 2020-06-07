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

// curl -X POST --data "name=Jack" 127.0.0.1:3752