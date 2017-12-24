const webpackConfig = require('../webpack.dev')
const webpackTask = require('./build-common')
const ip = require('ip').address()
const log = console.log
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
fse.emptyDirSync(path.resolve(__dirname, '../dist'))
const port = process.env.port || 3001

webpackConfig.watch = true
webpackConfig.output.publicPath = `//${ip}:${port}/dist/`
webpackTask(webpackConfig)
