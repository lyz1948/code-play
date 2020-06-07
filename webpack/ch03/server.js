const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

const host = '127.0.0.1'
const port = process.env.PORT || 3752
app.listen(port, () => {
  console.log(`Express server is runing at http://${host}:${port}`)
})
