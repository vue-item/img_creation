require('./style.css')

const PreView = function (opt) {
  const html = '' +
  '<div id="preview" class="preview">' +
  ' <b class="close">&times;</b>' +
  ' <div class="preview_box">' +
  '   <div id="preview_img" class="preview_img">' +
  '     <img src="' + opt.src + '" />' +
  '   </div>' +
  '   <div class="preview_mb">' +
  '     <div class="preview_btn">保存图片</div>' +
  '   </div>' +
  ' </div>' +
  '</div>'

  document.body.insertAdjacentHTML('beforeend', html)
  const preview = document.querySelector('#preview')
  const btn = preview.querySelector('.preview_btn')
  const close = preview.querySelector('.close')

  btn.addEventListener('click', (e) => {
    opt.callback()
    preview.classList.remove('active')
    e.stopPropagation()
  })
  close.addEventListener('click', (e) => {
    preview.classList.remove('active')
  })
  setTimeout(() => {
    preview.classList.add('active')
  }, 200)
}

export default PreView
