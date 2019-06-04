const { resolve } = require('path')
const r  = path => resolve(__dirname, path)

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: r('./dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: r('src'),
        loader: 'babel-loader'
      }
    ]
  }
}