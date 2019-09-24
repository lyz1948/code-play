'use strict'

var Router = require('koa-router')
var User = require('../app/controllers/user')
var App = require('../app/controllers/app')

module.exports = function() {
  var router = new Router({
    prefix: '/api'
  })
  router.post('/signup', App.hasBody, User.signup)
  router.post('/verify', App.hasBody, User.verify)
  router.post('/update', App.hasBody, App.hasToken, User.update)

  router.post('/signature', App.hasBody, App.hasToken, App.signature)

  return router
}
