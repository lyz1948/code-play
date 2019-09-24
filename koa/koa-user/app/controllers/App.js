'use strict'

var mongoose = require('mongoose')
var User = mongoose.model('User')

// signature
exports.signature = function*(next) {

  this.body = {
    success: true
  }
}

// hasBody
exports.hasBody = function*(next) {
  var body = this.request.body || {}

  if(!Object.keys(body)) {
    this.body = {
      success: false,
      err: '没有传参数啊'
    }
    return next
  }

  yield next
}

// hasToken
exports.hasToken = function*(next) {
  var accessToken = this.query.accessToken

  if(!accessToken) {
    accessToken = this.request.body.accessToken

  }
  if(!accessToken) {
    this.body = {
      success: false,
      err: '钥匙不见了，进不了后台'
    }
    return next
  }

  var user = yield User.findOne({
    accessToken: accessToken
  }).exec()

  if(!user) {
    this.body = {
      success: false,
      err: '用户没有登陆'
    }
    return next
  }

  this.session = this.session || {}
  this.session.user = user

  yield next
}
