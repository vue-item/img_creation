if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse('"production"')
}

const log = console.log
const resolve = (dir) => path.join(__dirname, '..', dir)
const port = process.env.PORT || 6003
const path = require('path')
const chalk = require('chalk')
const ip = require('ip').address()
const webpackTask = require('./build-common')
const conf = require('../webpack.prod')
const express = require('express')
const app = express()

app.set('views', resolve('views'))
app.engine('.html', require('ejs').renderFile)

const url = path.join(__dirname, '../../dist')
app.use('/dist', express.static(url))
app.use('', (req, res, next) => {
  const url = req.url
  const re = /\.js|css|ico|map$/
  if (!re.test(url)) {
    res.render('dev.html', {
      title: 'dev_build',
      vendor: '/dist/vendor',
      item: '/dist/app'
    })
  }
})

app.listen(port, () => {
  // process.stdout.clearLine()
  // process.stdout.cursorTo(0)
  conf.output.publicPath = `//${ip}:${port}/dist/`
  conf.watch = true
  webpackTask(conf, () => {
    console.log(chalk.yellow(`http://${ip}:${port}\n`))
  })
})
