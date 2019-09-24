var express = require('express')
var routes = express.Router()
var Index = require('../router/index.js')
var Mail = require('../router/send.js')

module.exports = function(app) {
	app.get('/', Index.index)

	app.get('/send', Mail.send)
}