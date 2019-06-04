const Koa = require('koa')
const Router= require('koa-router')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const router = new Router()

const main = (ctx, next) => {
  ctx.response.body = '<h1>Hello Koa!</h1>'
  next()
}

const contact = (ctx, next) => {
  ctx.response.type = 'html'
  ctx.response.body = '<p>联系我们</p>'
  next()
}

router.get('/', main)
router.get('/contact', contact)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
