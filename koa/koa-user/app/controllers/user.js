'use strict'

var xss = require('xss')
var uuid = require('uuid')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var sms = require('../../service/sms')

// signup
exports.signup = function *(next) {
  var phoneNumber = xss(this.request.body.phoneNumber.trim())
  // var phoneNumber = this.query.phoneNumber

  if(!phoneNumber) {
    return new Error('手机号不能为空')
  }
  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  var verifyCode = sms.getCode()
  if(!user) {
    var accessToken = uuid.v4()
    user = new User({
      nickname: phoneNumber,
      avatar: '',
      phoneNumber: xss(phoneNumber),
      verifyCode: verifyCode,
      accessToken: accessToken
    })
  }
  else {
    user.verifyCode = verifyCode
  }

  try {
    user = yield user.save()
  }
  catch(e) {
    this.body = {
      success: false
    }
    return next
  }
  this.body = {
    success: true
  }
}

// verify
exports.verify = function *(next) {
  var phoneNumber = this.request.body.phoneNumber
  var verifyCode = this.request.body.verifyCode

  if(!phoneNumber || !verifyCode) {
    this.body = {
      success: false,
      err: '验证未通过'
    }
    return next
  }

  var user = yield User.findOne({
    phoneNumber: phoneNumber,
    verifyCode: verifyCode
  }).exec()

  if(user) {
    user.verifyed = true
    user = yield user.save()
    this.body = {
      success: true,
      data: {
        nickname: user.nickname,
        accessToken: user.accessToken,
        avatar: user.avatar,
        id: user._id
      }
    }
  }
  else {
    this.body = {
      success: false,
      err: '验证未通过'
    }
  }
}

// update
exports.update = function *(next) {
  var body = this.request.body
  var user = this.session.user

  var fields = 'avatar,gender,age,breed,nickname'.split(',')
  fields.forEach(function(field) {
    if(body[field]) {
      user[field] = xss(body[field].trim())
    }
  })

  user = yield user.save()
  this.body = {
    success: true,
    data: {
      nickname: user.nickname,
      avatar: user.avatar,
      age: user.age,
      gender: user.gender,
      breed: user.breed,
      id: user._id
    }
  }
}
