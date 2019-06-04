const Koa = require('koa')
const koaBody = require('koa-body')
const path = require('path')
const os = require('os')
const fs = require('fs')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const main = async (ctx) => {
  const tmpdir = os.tmpdir()
  const filePaths = []
  const files = ctx.request.body.files || {}

  for(let key in files) {
    const file = files[key]
    const filePath = path.join(tmpdir, file.name)
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer)
    filePaths.push(filePath)
  }
  ctx.body = filePaths
}

app.use(koaBody({ multipart: true }))
app.use(main)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})

// curl --form upload=@/path/to/file http://127.0.0.1:3752