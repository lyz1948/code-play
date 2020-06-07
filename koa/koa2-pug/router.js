const Router = require('koa-router')
const User = require('./src/controllers/user')
const router = new Router()

router.get('/', (ctx, next) => {
  return ctx.render('pages/index', {
    title: '首页'
  })
})

router.post('/user/signup', User.signUp)

module.exports = router
