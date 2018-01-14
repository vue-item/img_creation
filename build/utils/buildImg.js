const resolve = (dir) => path.join(__dirname, '..', dir)
const fs = require('fs')
const path = require('path')
const resource = resolve('../resources/')
const output = resolve('../src/api/resource.js')
const rd = require('rd')
const files = fs.readdirSync(resource)
const log = console.log
const one = []
const two = {}
let text = ''

text += 'export const menu = '
text += '['
files.forEach((v, i) => {
  const folder = fs.statSync(resource + v).isDirectory()
  if (folder) {
    one.unshift(v)
    two[v] = ''
    if (i === files.length - 1) {
      text += "'" + v + "'"
    } else {
      text += "'" + v + "'," + ' '
    }
  }
})
text += ']'
text += '\n'


text += 'export const item = '
text += '{' + '\n'
one.forEach((val, key) => {
  const url = resource + val + '/'
  const f = fs.readdirSync(url)
  text += "  '" + val + "': {" + '\n'
  f.forEach((v, k) => {
    const _url = url + v
    text += "    '" + v + "': ["
    const _f = fs.readdirSync(_url)

    _f.forEach((_v, _k) => {
      if (_v === 'Thumbs.db') {
        _f.splice(_k, 1)
      }
    })

    _f.forEach((_v, _k) => {
      log(_f.length + '---' + _k)
      if (_k === _f.length - 1) {
        text += "'" + _v + "'"
      } else {
        text += "'" + _v + "', "
      }
    })

    if (k === f.length - 1) {
      text += ']' + '\n'
    } else {
      text += '],' + '\n'
    }
  })
  if (key === one.length - 1) {
    text += '  }' + '\n'
  } else {
    text += '  },' + '\n'
  }
})
text += '}'

fs.openSync(output, 'a')
fs.writeFileSync(output, text)
