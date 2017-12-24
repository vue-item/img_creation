if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse('"development"')
}

const log = console.log
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const ip = require('ip').address()
const port = process.env.PORT || 6002
const webpack = require('webpack')
const app = require('express')()
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const dev = require('../webpack.dev')
dev.entry.app.unshift('webpack-hot-middleware/client')
dev.output.publicPath = `//${ip}:${port}/`
dev.plugins.push(new webpack.HotModuleReplacementPlugin())

const compiler = webpack(dev)
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {},
  path: '/__webpack_hmr'
})
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: compiler.options.output.publicPath,
  noInfo: true,
  quiet: true
})

app.set('views', path.resolve(__dirname, '../views'))
app.engine('html', require('ejs').renderFile)
app.use(devMiddleware)
app.use(hotMiddleware)
app.use((req, res) => {
  res.render('dev.html', {
    title: 'dev',
    vendor: dev.output.publicPath + 'vendor',
    item: dev.output.publicPath + 'app'
  })
})
app.listen(port)

devMiddleware.waitUntilValid(() => {
  opn(`http://${ip}:${port}`)
  log(chalk.yellow(`http://${ip}:${port}\n`))
})




