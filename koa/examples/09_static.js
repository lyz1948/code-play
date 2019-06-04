const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const path = require('path')
const host = '127.0.0.1'
const port = 3752
const rootPath = '../'

const main = serve(path.join(__dirname, rootPath))

app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
