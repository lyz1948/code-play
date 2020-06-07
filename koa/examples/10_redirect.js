const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const router = new Router()

const about = ctx => {
  ctx.body = '<a href="/">Go To Home Page</a>'
  ctx.response.redirect('/')
}

const main = ctx => {
  ctx.body = '<h1>Home Page</h1><a href="/about">Go To About Page</a>'
}

router.get('/', main)
router.get('/about', about)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
