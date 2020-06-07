const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtools: 'inline-srouce-map',
  devServer: {
    contentBase: './dist'
  }
})
