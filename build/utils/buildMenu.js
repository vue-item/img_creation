const fs = require('fs')
const path = require('path')
const log = str => console.log(str)
const src = path.resolve(__dirname, '../..//src/components')
const exist = fs.existsSync(src)
const url = path.resolve(__dirname, '../../src/assets/data.json')

if (exist) {
  const arr = []
  fs.openSync(url, 'a')
  const files = fs.readdirSync(src)
  const d = {
    'height': '', // 模板会报错
    'show': 0,
    'name': 'component',
    'item': []
  }
  for (let i = 0, len = files.length; i < len; i++) {
    d.item.push(files[i])
  }
  arr.push(d)
  fs.writeFileSync(url, JSON.stringify(arr))
} else {
  log('src does not exist')
}