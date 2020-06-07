const Koa = require('koa')
const views = require('koa-views')
const fs = require('fs')
const { join } = require('path')

const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost/study'
mongoose.connect(dbUrl)

// models loading
var models_path = __dirname + '/src/schemas'

fs.readdirSync(models_path)
.filter(file => ~file.search(/^[^\.].*\.js$/))
.forEach(file => require(join(models_path, file)))

const app = new Koa()
const router = require('./router')

app.use(views(__dirname + '/src/views/', {
  extension: 'pug'
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('service is running at port 3000')
})