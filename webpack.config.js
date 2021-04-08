const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  target: 'web',
  entry: './src/index.js',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
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
      const port = server.listeningApp.address().port
      const host = process.env.HOST || 'localhost'
      const address = `http://${host}:${port}`
      console.log('Listening on:', address)
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-react-jsx',
              isDevelopment && require.resolve('react-refresh/babel'),
            ]
          }
        }
      }
    ]
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
}
