const base = {
  scaleX: 1,
  scaleY: 1,
  fontSize: 28,
  fontStyle: 'normal', // italic
  fontWeight: 'normal', // bold
  fontFamily: 'Comic Sans', // Delicious | Hoefler Text | Impact | Arial
  overline: false,
  linethrough: false,
  underline: false,
  shadow: 'none', // new fabric.Shadow( { color: 'rgba(0,0,0,0.3)', offsetX: 0.05, offsetY: 0.05 })
  stroke: '#000', // false
  strokeWidth: 0,
  lineHeight: 1,
  // textUnderline: '',
  textAlign: 'left',
  textBackgroundColor: 'transparent',
  backgroundColor: 'transparent',
  left: 100,
  top: 100
}

// const obj = ['Text', 'IText', 'Textbox', 'Image']
import './lib/gif'
import './lib/Blob'
import './lib/canvas-toBlob'
import { saveAs } from 'file-saver'
import { fabric } from 'fabric'
const f = fabric.Image.filters

const canvas = {
  firstText: false,
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
    if (name === 'Text') {
      if (!opt.left) {
        opt.left = this.canvas.width / 2
      }
      if (!opt.top) {
        opt.top = this.canvas.height / 2
      }
    }
    const obj = new fabric[name](text, Object.assign({}, base, opt))
    if (!this.firstText) {
      this.firstText = false
      obj.set({ left: opt.left - obj.width / 2, top: opt.top - obj.height / 2 })
    }
    if (!opt.canvas) {
      this.canvas.add(obj)
    }
    if (opt.active) {
      this.canvas.setActiveObject(obj)
    }
    this.canvas.renderAll()
    return obj
    // this.canvas.setActiveObject(text)
    // text.selectAll()
    // text.enterEditing()
    // text.hiddenTextarea.focus() // 无法失去焦点
  },

  position (name) {
    const obj = this.canvas.getActiveObject()
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

  save (id, name) {
    const _ = document.querySelector(id)
    _.toBlob((blob) => {
      saveAs(blob, name)
    })
  }
}


export default canvas

