const webpack = require('webpack')
const merge = require('webpack-merge')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base')
const cfgPaths = require('../config/paths')
const cfg = require('../config/default')
const os = require('os')

const { port, proxy } = cfg
const interfaces = os.networkInterfaces()
let IPAddress = ''
// eslint-disable-next-line guard-for-in
for (const devName in interfaces) {
  const iface = interfaces[devName]
  for (let i = 0; i < iface.length; i++) {
    const alias = iface[i]
    if (
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
    ) {
      IPAddress = alias.address
    }
  }
}

const webpackConfigDev = {
  mode: 'development',
  stats: 'errors-only',
  plugins: [
    // 定义环境变量为开发环境
    new webpack.HotModuleReplacementPlugin(),
    // 将打包后的资源注入到html文件内
    new HtmlWebpackPlugin({
      title: 'Dev',
      template: cfgPaths.appHtml
      // TODO 关闭
      // dlls: ['./vendor.dll.js']
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${port}/`
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You can now view  in the browser.\r\n`,
          ` Local:            http://localhost:${port}`,
          ` On Your Network:  http://${IPAddress}:${port}`
        ]
      },
      clearConsole: true
    })
    // new Copy([{ from: './scripts/dll', to: './' }])
  ],

  // 打包js.map文件
  devtool: 'source-map',
  devServer: {
    stats: 'errors-only',
    // quiet: true,
    // 关闭打包时 控制台上面的输出
    clientLogLevel: 'none',
    contentBase: cfgPaths.appDist,
    hot: true,
    host: '0.0.0.0',
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy
  }
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
