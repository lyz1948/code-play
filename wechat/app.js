const Koa = require('koa')
const Router = require('koa-router')
const sha1 = require('sha1')
const hostname = '127.0.0.1'
const port = 5000
const app = new Koa()
var router = new Router();
const config = {
  wechat: {
    appID: 'wxcbb5fa5deba2bf2e',
    appsecret: 'fce4ea72ada3e62ce0fa2e5a02a7972f',
    token: 'eb04cc4939284400b8801c006967dfba'
  }
}
const main = ctx => {
  console.log(ctx.query)
  const token = config.wechat.token 
  const {
    signature,
    timestamp,
    nonce,
    echostr
  } = ctx.query 

  let str = [token, timestamp, nonce].sort().join('')
  let sha = sha1(str) 

  if(ctx.method === 'GET') {
    if(sha === signature) {
      ctx.body = echostr
      console.log(echostr)
    }
    else {
      ctx.body = 'wrong'
    }
  }
}



router.get('/', main)
app
  .use(router.routes())
  .use(router.allowedMethods());
// app.use(main)

app.listen(port, () => {
	console.log(`http://${hostname}:${port}`)
})