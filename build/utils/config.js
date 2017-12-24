const ip = require('ip').address()

const conf = {
  tpl: {
    title: 'vx-dev',
    staticUrl: `静态地址`,
    siteUrl: `请求地址`,
    inject: true,
    template: './build/views/HtmlwebpackPlugin.ejs',
    chunks: ['vendor', 'app']
  },
  output: {
    local: {
        publicPath: `//${ip}:3000/dist/`
    },
    test: {
        publicPath: `//${ip}:3000/dist/`
    },
    beta: {
        publicPath: `//${ip}:3000/dist/`
    },
    prod: {
        publicPath: `//${ip}:3000/dist/`
    }
  }
}

module.exports = conf
