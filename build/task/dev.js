if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse('"development"')
}

const port = process.env.PORT || 6001
const log = console.log
const resolve = (dir) => path.join(__dirname, '..', dir)
const express = require('express')
const app = express()
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const ip = require('ip').address()
const webpackDevMiddleware = require('webpack-dev-middleware')
const dev = require('../webpack.dev')
dev.output.publicPath = `//${ip}:${port}/`
const compiler = webpack(dev)
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: compiler.options.output.publicPath,
  noInfo: true,
  quiet: true
})

app.set('views', path.resolve(__dirname, '../views'))
app.engine('html', require('ejs').renderFile)
app.use('/resources', express.static(resolve('../resources')))
app.use(devMiddleware)
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
