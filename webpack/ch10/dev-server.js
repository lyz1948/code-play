const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config')
const options = {
  contentBase: './dist',
  hot: true,
  host: '127.0.0.1'
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)
const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`dev server is listening port at ${port}`)
})