const os = require('os')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('./utils/manifest')
const ZipWebpackPlugin = require('zip-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')
const CompressionPlugin = require("compression-webpack-plugin")
const webpackConfig = require('./webpack.base')
const pkg = require('../package.json')
const utils = require('./utils')
const conf = require('./utils/config')

const wb= merge(webpackConfig, {
  module: {
    rules: utils.styleLoaders({ extract: true })
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.ProvidePlugin(conf.provide),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),

    // new UglifyJsParallelPlugin({
    //   workers: os.cpus().length
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    // CompressionPlugin
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // new HtmlwebpackPlugin({
    //   dev: '"production"',
    //   title: 'vx',
    //   template: './build/views/HtmlwebpackPlugin.ejs',
    //   inject: 'body',
    //   chunks: ['vendor', 'app']
    // }),
    new CleanWebpackPlugin(['dist', 'zip'], { root: `${process.cwd()}` }),
    new ManifestPlugin({
      versionFiles: [
        'vendor.css',
        'vendor.js',
        'app.css',
        'app.js'
      ],
      hashNum: 7
    }),
    new OptimizeJsPlugin({ sourceMap: false }),
    new webpack.optimize.ModuleConcatenationPlugin(), // https://github.com/lishengzxc/bblog/issues/34
    new ZipWebpackPlugin({
      path: '../zip',
      filename: `${pkg.name}.zip`,
      exclude: [/\.html$/]
    })
  ],
  devtool: false
})

module.exports = wb
