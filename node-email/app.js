var express = require('express')
var path = require('path')
var app = express()
var port = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

require('./config/routes.js')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)
console.log('server is runnint at port ' + port)

module.exports = app