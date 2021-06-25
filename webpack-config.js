const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const ClearTerminalPlugin = require('clean-terminal-webpack-plugin')

let env
try {
  env = process.env
} catch (error) {
  env = {}
}

const addr = {
  host: env.HOST || 'localhost',
  port: 3000,
}

function generateConfig(dirname, address = addr) {
  const mode = env.NODE_ENV || 'none'
  const isDevelopment = mode !== 'production'
  const webpackConfig = {
    mode,
    stats: 'errors-warnings',
    entry: './index.js',
    context: path.resolve(dirname, 'src'),
    output: {
      path: path.resolve(dirname, 'dist'),
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
        directory: path.join(dirname, 'dist'),
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

  if (isDevelopment && mode !== 'none') {
    webpackConfig.devtool = 'cheap-module-source-map'
  }
  return webpackConfig
}

module.exports = generateConfig
