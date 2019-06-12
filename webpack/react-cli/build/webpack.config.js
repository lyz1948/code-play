const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, '../dist')
  },
  devServer: {
    port: 8000,
    hot: true,
    inline: true,
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.html$/,
        use: [ {
          loader: 'html-loader'
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/template/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}
