const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = 3752

const one = (ctx, next) => {
  console.log('-> one')
  next()
  console.log('<- one')
}

const two = (ctx, next) => {
  console.log('-> two')
  next()
  console.log('<- two')
}

const three = (ctx, next) => {
  console.log('-> three')
  next()
  console.log('<- three')
}

app
  .use(one)
  .use(two)
  .use(three)

app.listen(port, () => {
  console.log(`service is running at http://${host}:${port}`)
})
// -> one -> two -> three <- three <- two <- one
