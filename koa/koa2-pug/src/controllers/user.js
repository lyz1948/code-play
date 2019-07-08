const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.signUp = function(ctx, next) {
  console.log(ctx.request)
  ctx.render('pages/index', {
    title: '注册'
  })
}