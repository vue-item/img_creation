const log = console.log
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const resolve = (dir) => path.join(__dirname, '..', dir)
const utils = require('./utils')
const ip = require('ip').address()

const conf = {
  entry: {
    app: [resolve('src/main.js')],
    vendor: [
      'vue',
      'vue-router',
      'toast',
      './src/common/iconfont/iconfont.css',
      './src/common/common.css'
    ]
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: `//${ip}:3000/dist/`
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    modules: [ // 去哪写目录下寻找第三方模块
      resolve('node_modules')
    ],
    alias: {
      'toast': resolve('src/common/toast'),
      'vue': 'vue/dist/vue.runtime.min.js',
      'vue-router': 'vue-router/dist/vue-router.min.js',
      '@common': resolve('src/common'),
      '@components': resolve('src/components'),
      '@api': resolve('src/api')
    }
  },
  // resolveLoader: {
  //   root: resolve('node_modules')
  // },
  module: {
    noParse: [/vue\.runtime\.min/, /vue-router\.min/],
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [
          resolve('src')
        ],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: isProduction ? false : true,
            extract: isProduction
          })
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          resolve('src'),
          resolve('node_modules/jsdom/lib/jsdom/living/generated/utils.js') // es6
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  cache: true
}

module.exports = conf
