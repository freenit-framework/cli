const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const ClearTerminalPlugin = require('clean-terminal-webpack-plugin')

const addr = {
  host: process.env.HOST || 'localhost',
  port: 3000,
}

function generateConfig(address = addr) {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const webpackConfig = {
    stats: 'errors-warnings',
    entry: './index.js',
    context: path.resolve(__dirname, 'src'),
    mode: isDevelopment ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      compress: true,
      firewall: false,
      port: address.port,
      host: '0.0.0.0',
      hot: true,
      historyApiFallback: true,
      watchFiles: ['src/**/.js'],
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
    plugins: [
      new ESLintPlugin(),
      new ClearTerminalPlugin({
        message: `\n\n    Location: http://${address.host}:${address.port}`,
      }),
    ],
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
    resolve: {
      preferRelative: true,
    },
  }

  if (isDevelopment) {
    webpackConfig.devtool = 'cheap-module-source-map'
  }
  return webpackConfig
}

module.exports = generateConfig
