/* eslint-disable no-console */
const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

const webpackConfig = {
  entry: './src/index.js',
  mode: isDevelopment ? 'development' : 'production',
  infrastructureLogging: {
    appendOnly: true,
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
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
}

module.exports = webpackConfig
