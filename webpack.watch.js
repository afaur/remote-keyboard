const webpack = require('./webpack.config')
const WebpackNotifierPlugin = require('webpack-notifier')

webpack.devtool = ''
webpack.plugins = [
  new WebpackNotifierPlugin({alwaysNotify: true}),
]

module.exports = webpack
