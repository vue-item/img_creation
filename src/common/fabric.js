export const Canvas = (name, opt) => {
  return new fabric.Canvas(name, Object.assign({}, {
    // width: '',
    // height: '',
    // renderOnAddRemove: true // 焦点后显示
  }, opt))
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
