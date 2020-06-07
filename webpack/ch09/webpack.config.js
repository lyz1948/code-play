const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const r = path => resolve(__dirname, path)

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './src/printLog.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: r('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: r('src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader!css-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Use HtmlWebpackPlugin manage output'
    })
  ]
}