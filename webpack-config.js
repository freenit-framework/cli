/* eslint-disable no-console */
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

const webpackConfig = {
  entry: './src/index.js',
  mode: isDevelopment ? 'development' : 'production',
  infrastructureLogging: {
    appendOnly: false,
    level: 'warn',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    compress: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    watchFiles: ['src/**/.js'],
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    onListening: function onListening(server) {
      const host = process.env.HOST || 'localhost'
      const address = `http://${host}:${server.port}`
      console.clear()
      console.log()
      console.log()
      console.log('   Listening on:', address)
      console.log()
    },
  },
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
}

module.exports = webpackConfig
