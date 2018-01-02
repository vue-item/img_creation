export const fileReader = (file, opt) => {
  const fr = new FileReader()

  if (opt.onabort) {
    fr.onabort = (e) => {
      opt.onabort(e)
    }
  }

  if (opt.onerror) {
    fr.onerror = (e) => {
      opt.onerror(e)
    }
  }

  if (opt.onload) {
    fr.onload = (e) => {
      opt.onload(e.target.result)
    }
  }

  if (opt.onloadend) {
    fr.onloadend = (e) => {
      opt.onloadend(e)
    }
  }

  if (opt.onloadstart) {
    fr.onloadstart = (e) => {
      opt.onloadstart(e)
    }
  }

  if (opt.onprogress) {
    fr.onprogress = (e) => {
      opt.onprogress(e)
    }
  }
  if (opt.readAsDataURL) {
    fr.readAsDataURL(file) // 二进制对象
  }
  if (opt.readAsArrayBuffer) {
    fr.readAsArrayBuffer(file) // buffer对象
  }

  return fr
}

export const loadGif = (buffer, opt) => {
  if (!Gif) return
  const gif = new Gif()

  if (opt.onprogress) {
    gif.onprogress = (e) => {
      opt.onprogress(e)
    }
  }

  if (opt.onparse) {
    gif.onparse = (e) => {
      opt.onparse(e)
    }
  }

  gif.parse(buffer)

  return gif
}

export const createElement = (name, opt) => {
  const el = document.createElement(name)

  if (opt.width) el.width = opt.width

  if (opt.height) el.height = opt.height

  if (opt.title) el.title = opt.title

  if (opt.src) el.src = opt.src

  if (opt.id) el.id = opt.id

  if (opt.father) opt.father.appendChild(el)

  if (opt.callback) opt.callback(el)

  return el
}

export const loadingImg = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = (e) => {
      resolve(img)
    }
    img.onerror = (e) => {
      reject(e)
    }
    img.src = src
  })
}

export const verifyAddress = (e) => {
  log(1) // 验证 url
}
