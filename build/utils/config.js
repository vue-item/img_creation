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
    local: `//${ip}:3000/dist/`,
    test: `//${ip}:3000/dist/`,
    beta: `//${ip}:3000/dist/`,
    prod: `//${ip}:3000/dist/`,
  }
}

module.exports = conf
