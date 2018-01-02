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
      // 'fabric',
      './src/common/iconfont/iconfont.css',
      './src/common/common.css'
    ]
  },
  output: {
    path: resolve('dist'), // 输出路径
    filename: '[name].js', // key
    chunkFilename: '[name].[chunkhash].js', // 针对异步文件 hash
    publicPath: `//${ip}:3000/dist/`
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      // 'fabric': 'fabric/dist/fabric.js',
      // 'log': resolve('./build/utils/log.js'),
      'vue': 'vue/dist/vue.runtime.min.js',
      'vue-router': 'vue-router/dist/vue-router.min.js',
      '@': resolve('src/components')
    }
  },
  // resolveLoader: {
  //   root: resolve('node_modules')
  // },
  module: {
    noParse: [/vue\.runtime\.min/, /vue-router\.min/], // 跳过对其的解析来进行优化
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
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
        // loader: ['babel-loader?cacheDirectory=true'],
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
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  cache: true
}

module.exports = conf
