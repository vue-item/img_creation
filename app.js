const log = console.log
const ip = require('ip')
const os = require('os')
const path = require('path')
const express = require('express')
const router = express.Router()
const app = express()

app.set("views", path.join(__dirname, "/build/views"))
app.engine('html', require('ejs').renderFile)
app.use('/dist', express.static('./dist'))
app.use('/', express.static('./dist'))
app.use('/resources', express.static('./resources'))
// app.use('/dist', express.static('./dist'))
app.get('*', function (req, res) {
  res.render('dev.html', {
    title: 'demo',
    vendor: 'vendor',
    item: 'app'
  })
})

const server = app.listen(8003, () => {
  var host = ip.address()
  var port = server.address().port
  log('http://%s:%s', host, port)
})