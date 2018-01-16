const base = {
  scaleX: 1,
  scaleY: 1,
  fontSize: 22,
  fontStyle: 'normal', // italic
  fontWeight: 'normal', // bold
  fontFamily: 'Comic Sans', // Delicious | Hoefler Text | Impact | Arial

  padding: 8,
  cornerSize: 18,
  cornerStyle: 'circle', // rect
  borderColor: '#00FDFF',
  cornerColor: '#00FDFF',
  cornerStrokeColor: '#00FDFF',
  // transparentCorners: true,

  overline: false,
  linethrough: false,
  underline: false,
  shadow: 'none', // new fabric.Shadow( { color: 'rgba(0,0,0,0.3)', offsetX: 0.05, offsetY: 0.05 })
  stroke: '#000', // false
  strokeWidth: 0,
  lineHeight: 2,
  // textUnderline: '',
  textAlign: 'left',
  textBackgroundColor: 'transparent',
  backgroundColor: 'transparent'
  // left: 100,
  // top: 100
}
let image_drag_offset_x = 0
let image_drag_offset_y = 0
let canvas_pan_x = 0
let canvas_pan_y = 0

// fabric.util.getRandomInt(0, 600)
// const obj = ['Text', 'IText', 'Textbox', 'Image']
import './lib/gif'
import './lib/Blob'
import './lib/canvas-toBlob'
import { saveAs } from 'file-saver'
import { fabric } from 'fabric'
import { filter } from '@api/data'

// require('./lib/fabric')
// console.log(fabricjs)
const log = console.log
const f = fabric.Image.filters
const pad = (str, length) => {
  while (str.length < length) {
    str = '0' + str
  }
  return str
}

const getRandomInt = fabric.util.getRandomInt
const getRandomColor = () => {
  return (
    pad(getRandomInt(0, 255).toString(16), 2) +
    pad(getRandomInt(0, 255).toString(16), 2) +
    pad(getRandomInt(0, 255).toString(16), 2)
  );
}

const conf = {
  filter: '',
  mr: 6,
  tmp: [],
  set (name, opt = {}) {
    if (this.canvas) {
      //
    } else {
      this.canvas = new fabric.Canvas(name, Object.assign({}, opt))
    }
    return this.canvas
  },

  create (name, text = '请输入', opt = {}) {
    this.blur()
    let obj = ''
    let params = {}
    if (name === 'Text' || name === 'Image' || name === 'IText' || name === 'Textbox') {
      obj = new fabric[name](text, Object.assign({}, opt))
    } else {
      const offset = 50
      params.left = getRandomInt(0 + offset , this.canvas.width - offset)
      params.top = getRandomInt(0 + offset, this.canvas.height - offset)
      params.fill = '#' + getRandomColor(),
      params.opacity = 0.8

      if (name === 'Circle') {
        params['radius'] = offset
      } else if (name === 'Rect') {
        params['width'] = offset
        params['height'] = offset
      } else if (name === 'Line') {
        params['stroke'] = params.fill
        delete params.fill
      } else if (name === 'Triangle') {
        params['width'] = offset
        params['height'] = offset
      }

      const conf = Object.assign(params, opt)
      if (name === 'Line') {
        obj = new fabric[name]([50, 100, 200, 200], conf)
      } else {
        obj = new fabric[name](conf)
      }
    }
    if (!opt.canvas) {
      this.canvas.add(obj)
    }
    if (name === 'Text' || name === 'IText' || name === 'Textbox') {
      if (!opt.left && !opt.height) {
        obj.center()
      }
    }
    if (opt.active) {
      this.canvas.setActiveObject(obj)
    }
    this.canvas.renderAll()
    return obj
  },
  position (name) {
    const obj = this.getActiveObject()
    if (obj) {
      obj[name]()
      this.canvas.requestRenderAll()
    } else {
      throw 'getActiveObject is null'
    }
    return obj
  },

  getActiveObject () {
    return this.canvas.getActiveObject()
  },

  style (opt) {
    const obj = this.canvas.getActiveObject()
    if (obj) {
      obj.set(opt)
      this.canvas.renderAll()
    } else {
      throw 'getActiveObject is null'
    }
    return obj
  },

  setActive (obj) {
    this.canvas.setActiveObject(obj)
  },

  setBgColor (color) {
    this.canvas.set('backgroundColor', color)
    this.canvas.renderAll()
  },

  filters (type, opt = {}) {
    const d = new fabric.Image.filters[type](opt)
  },

  blur () {
    this.canvas.discardActiveObject()
    if (this.canvas.requestRenderAll) {
      this.canvas.requestRenderAll()
    } else if (this.canvas.requestAll) {
      this.canvas.requestAll()
    }
  },

  clear (type) {
    const obj = this.canvas.getActiveObjects()
    if (!obj) return
    switch (type) {
      case 'only':
        this.canvas.remove.apply(this.canvas, this.canvas.getActiveObjects())
        break
      case 'all':
        this.canvas.remove.apply(this.canvas, this.canvas.getObjects())
        break
    }
    this.canvas.discardActiveObject()
  },

  textReset () {
    const obj = this.getActiveObject()
    this.clear('only')
    return {
      d: obj.toJSON(),
      w: obj.width,
      h: obj.height,
      f: obj.fontSize
    }
  },

  save () {
    this.blur()
    const _ = document.querySelector('#canvas')
    _.toBlob((blob) => {
      const fr = new FileReader()
      fr.addEventListener('loadend', () => {
        saveAs(blob, 'node.png')
      })
      fr.readAsDataURL(blob)
    })
  },

  setZoom (n) {
    this.canvas.setZoom(n)
  },

  fromURL (data) {
    const i = this.canvas
    ,s = i.width
    ,o = i.height
    const t = new fabric.Image(data)
    t.scale(200 / data.width).set({
      angle: 0,
      padding: 10,
      cornersize: 10,
      left:  (s - 200) / 2,
      top: (o - data.height * (200 / data.width)) / 2
    }),
    this.canvas.add(t)
    this.setActive(t)
    this.canvas.renderAll()
  },

  clone () {
    this.getActiveObject().clone((el) => {
      el.set({
        left: el.left + 10,
        top: el.top + 10,
        evented: true
      })
    if (el.type === 'activeSelection') {
        el.canvas = this.canvas
        el.forEachObject(function(obj) {
          this.canvas.add(obj)
        })
        el.setCoords()
      } else {
        this.canvas.add(el)
      }
      this.canvas.setActiveObject(el)
      this.canvas.requestRenderAll()
    })
  },

  applyFilterValue (i, prop, value) {
    const obj = this.getActiveObject()
    if (obj.filters[i]) {
      obj.filters[i][prop] = value
      obj.applyFilters()
      this.canvas.renderAll()
    }
  },

  applyFilter (i, state, opt={}) {
    const obj = this.getActiveObject()
    if (state) {
      const ff = f[filter[i]]
      obj.filters[i] = new ff(opt)
    } else {
      obj.filters[i] = undefined
    }
    obj.applyFilters()
    this.canvas.renderAll()
  },

  getFilter (i) {
    const obj = this.canvas.getActiveObject()
    return obj.filters[i]
  },

  isCanvasSupported () {
    const t = document.createElement("canvas")
    return !(!t.getContext || !t.getContext("2d"))
  },

  clickAddImg (url) {
    fabric.Image.fromURL(url, (oImg) => {
      this.canvas.add(oImg)
    })
  },
  // 测试方法
  preView () {
    this.canvas.clone((o) => {
      const s = 9
      const obj = o.getObjects()

      if (obj.length) {
        obj.forEach((v) => {

        })
      } else {
      }
    })
  },

  dragEvent () {
    // canvas.bringToFront(triangle)
    const self = this
    const el = document.querySelector('#expression_img')
    const make = document.querySelector('#_draw')
    let img = ''
    el.addEventListener('dragstart', (e) => {
      const tar = e.target
      log(tar.src)
      if (tar.tagName.toLowerCase() === 'img') {
        const _img = el.querySelector('.activeImg')
        if (_img) _img.classList.remove('activeImg')
        tar.classList.add('activeImg')
      }
    })
    el.addEventListener('dragend', (e) => {})
    make.addEventListener('dragenter', (e) => {})
    make.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    make.addEventListener('drop', (e) => {
      e.preventDefault()
      const src = document.querySelector('#expression_img .activeImg').src
      const img = new Image
      img.src = src
      img.onload = () => {
        const _img = new fabric.Image(img)
        _img.scale(200 / img.width).set({
            angle: 0
        })
        this.canvas.add(_img)
        _img.setCoords()
      }
    })
  }
}

document.addEventListener('keydown', (e) => {
  const code = e.keyCode
  if (code === 8) {
    conf.canvas.clear('only')
  } else if (code === 27) {
    conf.canvas.blur()
  }
})

window.addEventListener('resize', (e) => {
  const area = document.querySelector('#_area')
  const w = area.offsetWidth
  const h = area.offsetHeight
  conf.canvas.setWidth(w)
  conf.canvas.setHeight(h)
})

export default conf

// const t = new fabric.Image(a)
// t.scale(200 / a.width).set({
//     angle: 0,
//     padding: 10,
//     cornersize: 10,
//     left: n + (s - 200) / 2,
//     top: r + (o - a.height * (200 / a.width)) / 2
// })
// canvas.add(t)
// canvas.renderAll()
