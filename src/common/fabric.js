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

export const Text = (text = '请输入', opt = {}) => {
  return new fabric.Text(text, Object.assign({}, base, opt))
  /*
  text.setSelectionStart(0)
  text.setSelectionEnd(3)
  */
}

export const TextBox = (text = "", opt = {}) => {
  const conf = Object.assign({}, base, {
    // width: 300,
    // height: 60,
    // backgroundColor: '#FFFFA5'
  }, opt)
  return new fabric.Textbox(text, conf)
}

export const IText = (text = "", opt = {}) => {
  const conf = Object.assign({}, base, {
    // width: 300,
    // height: 60,
    // backgroundColor: '#FFFFA5'
  }, opt)
  return new fabric.IText(text, conf)
}

export const Canvas = (name) => {
  return new fabric.Canvas(name, Object.assign({}, {
    // width: '',
    // height: '',
    renderOnAddRemove: true // 焦点后显示
  }))
}

export const Image = (img) => {
  const conf = Object.assign({}, {
    selectable: false,
    borderColor: 'black',
    width: 200,
    height: 200
  })
  return new fabric.Image(img, conf)
}

export const Filter = (img) => {
  img.filters.push(new fabric.Image.filters.Grayscale())
  img.applyFilters()
  return img
}
