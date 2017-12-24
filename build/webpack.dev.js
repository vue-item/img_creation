const os = require('os')
const path = require('path')
const ip = require('ip').address()
const webpack = require('webpack')
const merge = require('webpack-merge')
const conf = require('./utils/config')
// const HappyPack = require('happypack')
// const happThreadPool = HappyPack.ThreadPool({size: os.cpus().length}) // 指定线程池中的线程数量为处理器的核心数
const base = require('./webpack.base')
const ManifestPlugin = require('./utils/manifest')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const utils = require('./utils')
const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = merge(base, {
  module: {
    rules: utils.styleLoaders({ sourceMap: true })
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.ProvidePlugin({ Vue: 'vue' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new WebpackNotifierPlugin({
      title: 'ok',
      alwaysNotify: true,
      contentImage: path.join(__dirname, 'utils/ok.jpg')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), // ?
    new webpack.NoEmitOnErrorsPlugin(),
    new ManifestPlugin({
      versionFiles: [
        'vendor.css',
        'vendor.js',
        'app.css',
        'app.js'
      ],
      hashNum: 7
    }),
    new HtmlwebpackPlugin(conf.tpl),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig
