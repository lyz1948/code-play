const path = require('path')

module.exports = env => {
  console.log('NODE_ENV', env.NODE_ENV)
  console.log('production', env.production)
  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}