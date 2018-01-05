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

// fabric.util.getRandomInt(0, 600)
// const obj = ['Text', 'IText', 'Textbox', 'Image']
import './lib/gif'
import './lib/Blob'
import './lib/canvas-toBlob'
import { saveAs } from 'file-saver'
import { fabric } from 'fabric'
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

const canvas = {
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
      this.canvas.requestRenderAll()
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
    if (!obj) {
      return
    }
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

  save (id, name) {
    const _ = document.querySelector(id)
    _.toBlob((blob) => {
      saveAs(blob, name)
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
    this.canvas.renderAll()
  },

  clone () {
    this.canvas.getActiveObject().clone((el) => {
      el.set({
        left: el.left + 10,
        top: el.top + 10,
        evented: true,
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
  }
}


export default canvas

