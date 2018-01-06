const preview = (opt) => {
  this.render()
}

preview.prototype.render = () => {
  const html = '' +
  '<div class="preview">' +
  ' <div class="preview_box">' +
  '   <div id="preview_img" class="preview_img">' +
  '     <img src="http://img1.imgtn.bdimg.com/it/u=2862439063,3834071056&fm=27&gp=0.jpg" />' +
  '   </div>' +
  '   <div class="preview_mb">' +
  '     <div class="preview_btn">保存图片</div>' +
  '     <div>点击图片保存</div>' +
  '   </div>' +
  ' </div>' +
  '</div>'
  document.body.insertAdjacentHTML('beforeend', html)
}

default export preview
