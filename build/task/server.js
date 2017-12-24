const log = console.log
const fs = require('fs')
const opn = require('opn')
const ejs = require('ejs')
const path = require('path')
const http = require('http')
const ip = require('ip').address()
const resolve = (url) => path.resolve(__dirname, url)
const port = process.env.PORT || 6005
const dev = require('../webpack.dev')
const webpackTask = require('./build-common')
const fse = require('fs-extra')
fse.emptyDirSync(path.resolve(__dirname, '../../dist'))

dev.watch = true
dev.output.publicPath = `//${ip}:${port}/dist/`

const server = http.createServer((req, res) => {
  const name = req.url.replace(/\/dist\//, '')
  if (name === '/') {
    fs.readFile(resolve('../views/server.html'), 'utf-8', (err, content) => {
      content = content.replace(/vx_style/g, `//${ip}:${port}/dist/vendor`)
      content = content.replace(/vx_javascript/g, `//${ip}:${port}/dist/app`)
      if (err) { log(err) }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      res.end(content)
    })
  } else if (name === '/favicon.ico') {
    res.end('')
  } else {
    fs.readFile(resolve('../../dist/' + name), 'utf-8', (err, content) => {
      if (err) { log(err) }
      res.writeHead(200, {
        'Content-Type': 'application/javascript'
      })
      res.end(content)
    })
  }
})

webpackTask(dev, () => {
  server.listen(port, () => {
    log(ip + ':' + port)
  })
})


