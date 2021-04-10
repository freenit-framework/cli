/* eslint-disable no-console */
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

const webpackConfig = {
  entry: './src/index.js',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    clientLogLevel: 'silent',
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    noInfo: true,
    inline: true,
    watchContentBase: true,
    liveReload: false,
    historyApiFallback: true,
    onListening: function onListening(server) {
      const { port } = server.listeningApp.address()
      const host = process.env.HOST || 'localhost'
      const address = `http://${host}:${port}`
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
            isDevelopment && require.resolve('react-refresh/babel'),
          ],
        },
      },
    ],
  },
  plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
}

module.exports = webpackConfig
