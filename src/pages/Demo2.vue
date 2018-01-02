<template>
  <div class="container">
    <div class="wrap">
      <div class="wrap_pd">
        <input ref="remote" type="text" placeholder="请粘入url" name="text" class="input" />
        <div class="update_btn blue" @click="loadImg">加载图片</div>
      </div>
      <div class="hidden">
        <input id="file" type="file" name="file" v-on:change="addImg" accept="image/gif" />
      </div>
    </div>
    <div class="canvas_wrap">
      <canvas id="canvas" :width='params.width' :height='params.height'></canvas>
    </div>
    <div id="view"></div>
    <div class="start">
      <input class="btn green f14" type="button" value="添加段落" @click="addTextBox">
      <input class="btn green f14" type="button" value="添加文本" @click="addIText">
      <input class="btn green f14" type="button" value="添加文字" @click="addText">
      <input class="btn red f14" type="button" value="插入图片" @click="targetFile">
      <input class="btn red f14" type="button" value="删除选中" @click="clearObj">
      <input class="btn red f14" type="button" value="清除画布" @click="clearObj">
      <input class="btn blue f14" type="button" value="失去焦点" @click="targerBlur">
      <input class="btn orange f14" type="button" value="保存图片" @click="saveImg">
    </div>
    <div class="start">
      滤镜
      <input class="btn yellow f14" type="button" value="模糊" @click="blur">
      <input class="btn yellow f14" type="button" value="高亮" @click="brightness">
      <input class="btn yellow f14" type="button" value="饱和" @click="saturation">
      <input class="btn yellow f14" type="button" value="灰度" @click="grayscale">
      <input class="btn yellow f14" type="button" value="像素" @click="pixelate">
      <input class="btn yellow f14" type="button" value="反差" @click="contrast">
      <input id="opacity" class="min_input" type="number" name="opacity">
      <input class="btn yellow f14" type="button" value="透明度" @click="opacity">
    </div>
    <div class="start">
      层叠
      <input class="btn blue f14" type="button" value="向上" @click="up">
      <input class="btn blue f14" type="button" value="组向上" @click="upGroup">
      <input class="btn blue f14" type="button" value="向下" @click="down">
      <input class="btn blue f14" type="button" value="组向下" @click="downGroup">
    </div>
    <div class="start">
      移动 和 翻转
      <input class="btn blue f14" type="button" value="向左移动" @click="move('left', '-=10')">
      <input class="btn blue f14" type="button" value="向右移动" @click="move('left', '+=10')">
      <input class="btn blue f14" type="button" value="向上移动" @click="move('top', '-=10')">
      <input class="btn blue f14" type="button" value="向下移动" @click="move('top', '+=10')">
      <input class="btn blue f14" data-direction="false" type="button" value="左右翻转" @click="flip($event, 'flipX')">
      <input class="btn blue f14" data-direction="false" type="button" value="上下翻转" @click="flip($event, 'flipY')">
    </div>
    <div class="start">
      <input id="cs_width" class="min_input" minlength="1" type="number">
      <input id="cs_height" class="min_input" maxlength="800" type="number">
      <input class="btn orange f14" type="button" value="调整画布" @click="modifyCanvas">
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import loading from '../common/loading'
import { saveAs } from 'file-saver'
import { Canvas } from '../common/fabric'
import { fileReader, loadGif, createElement, loadingImg } from '../common/util'
import canvas from '../common/canvas'

// 添加路径别名
// 上传图片后canvas居中，大小设定问题
// 输出定制大小问题
// 操作前确定选中的是一组元素 还是一个元素

export default {
  data () {
    return {
      params: {
        width: 800,
        height: 400
      },
      canvas: Object
    }
  },
  created () {
    loading.show()
  },
  mounted () {
    setTimeout(() => {
      loading.hide()
    }, 500)
    this.canvas = Canvas('canvas', {
      preserveObjectStacking: true
    })
    this.canvas.backgroundColor = 'rgba(0,0,255,0.3)'
    this.canvas.renderAll()
    this.canvas.on('object:selected', (e) => {
      // log(e.target)
    })
    this.canvas.on({
      'object:moving': (e) => {
        e.target.opacity = 0.5
      },
      'object:modified': (e) => {
        e.target.opacity = 1
      },
      'object:removed': (e) => {
        log(e.target)
        log('remove')
      }
    })
  },
  methods: {
    move (direction, num) {
      const obj = this.canvas.getActiveObject()
      obj.animate(direction, num, {
        duration: 0,
        easing: '', // fabric.util.ease.easeOutBounce
        onChange: this.canvas.renderAll.bind(this.canvas)
      })
    },

    flip (e, key) {
      const parmas = {}
      const dir = e.target.dataset.direction === 'true' ? 1 : 0
      e.target.dataset.direction = !dir
      parmas[key] = !dir
      canvas.style.call(this, parmas)
    },

    targerBlur () { canvas.blur.call(this) },

    loadImg () {
      const self = this
      const url = this.$refs.remote.value
      createElement('img', {
        src: url,
        callback (el) {
          log(el)
          const img = new fabric.Image(el, {
            left: 100,
            top: 100,
            width: el.width,
            height: el.height
          })
          self.canvas.add(img)
          self.$refs.remote.value = ''
        }
      })
    },

    up () { canvas.position.call(this, 'bringForward') },

    upGroup () { canvas.position.call(this, 'bringToFront') },

    down () { canvas.position.call(this, 'sendBackwards') },

    downGroup () { canvas.position.call(this, 'sendToBack') },

    blur () {
      const object = this.canvas.getActiveObject()
      if (!object && !object.filters) {
        alert('不是图片 或 没有选中图形')
        return
      }
      const filter = new fabric.Image.filters.Blur({
        blur: 0.5
      })
      object.filters = []
      object.filters.push(filter)
      object.applyFilters()
      this.canvas.renderAll()
    },

    brightness () {
      const object = this.canvas.getActiveObject()
      if (!object && !object.filters) {
        alert('不是图片 或 没有选中图形')
        return
      }
      const filter = new fabric.Image.filters.Brightness({
        brightness: 0.5
      })
      object.filters = []
      object.filters.push(filter)
      object.applyFilters()
      this.canvas.renderAll()
    },

    saturation () {
      const object = this.canvas.getActiveObject()
      if (!object && !object.filters) {
        alert('不是图片 或 没有选中图形')
        return
      }
      const filter = new fabric.Image.filters.Saturation({
        saturation: 0.8
      })
      object.filters = []
      object.filters.push(filter)
      object.applyFilters()
      this.canvas.renderAll()
    },

    grayscale () {
      const object = this.canvas.getActiveObject()
      if (!object && !object.filters) {
        alert('不是图片 或 没有选中图形')
        return
      }
      const filter = new fabric.Image.filters.Grayscale()
      object.filters = []
      object.filters.push(filter)
      object.applyFilters()
      this.canvas.renderAll()
    },

    pixelate () {
      const object = this.canvas.getActiveObject()
      if (!object || !object.filters) {
        alert('不是图片 或 没有选中图形')
        return
      }
      const filter = new fabric.Image.filters.Pixelate({
        blocksize: 6
      })
      object.filters = []
      object.filters.push(filter)
      object.applyFilters()
      this.canvas.renderAll()
    },

    contrast () {
      const object = this.canvas.getActiveObject()
      if (!object || !object.filters) {
        alert('不是图片 或 没有选中图形')
        return
      }
      const filter = new fabric.Image.filters.Contrast({
        contrast: 4
      })
      object.filters = []
      object.filters.push(filter)
      object.applyFilters()
      this.canvas.renderAll()
    },

    modifyCanvas () {
      const width = document.querySelector('#cs_width').value
      const height = document.querySelector('#cs_height').value
      if (width && height) {
        this.canvas.setHeight(height)
        this.canvas.setWidth(width)
      }
    },

    clearObj () { canvas.clear.call(this) },

    targetFile () {
      const file = document.querySelector('#file')
      file.click()
    },

    addIText () { canvas.create.call(this, 'IText', '呵呵') },

    opacity () { canvas.style.call(this, { opacity: document.querySelector('#opacity').value }) },

    addTextBox () {
      canvas.create.call(this, 'Textbox', '呵呵呵', {
        width: 300,
        backgroundColor: '#FFFFA5'
      })
    },

    addText () { canvas.create.call(this, 'Text', '😡😝😊😤🦑apple苹果 \ 😝😑哈哈哈') },

    addImg (e) {
      let obj = ''
      const self = this
      const tar = e.target.files[0]
      const fr = fileReader(tar, {
        readAsDataURL: true,
        onload (event) {
          loadingImg(fr.result)
          .then((res) => {
            obj = res
            // self.params.height = res.height
          })
          .then((params) => {
            createElement('img', {
              src: fr.result,
              callback (el) {
                const img = new fabric.Image(el, {
                  left: 100,
                  top: 100,
                  width: obj.width,
                  height: obj.height
                })
                self.canvas.add(img)
              }
            })
          })
        }
      })
    },

    splitGif (e) {
      const self = this
      const tar = e.target.files[0]
      if (/gif$/.test(tar.type)) { // 限制10mb大小
        const file = fileReader(tar, {
          readAsArrayBuffer: true,
          onprogress: (e) => {
            log('进度' + (100 * e.loaded / e.total | 0) + '%')
          },
          onload () {
            const img = loadGif(file.result, {
              onprogress (e) {
                log('解析' + (100 * e.loaded / e.total | 0) + '%')
              },
              onparse () {
                log('解析完成')
                setTimeout(() => {
                  self.buildView(img, file.name, true)
                }, 100)
              }
            })
          }
        })
      } else { alert('not gif') }
    },

    buildView (img, fname, preRender) {
      const merge = new fabric.Canvas('merge')

      const canvas = create('canvas', {
        width: img.header.width,
        height: img.header.height,
        title: 'w=' + img.header.width + ' h=' + img.header.height
      })

      const frames = img.createFrameImages(canvas.getContext('2d'), preRender, !preRender)

      for (let i = 0, len = frames.length; i < len; i++) {
        const cs = createElement('canvas', {
          width: frames[i].image.width,
          height: frames[i].image.height,
          title: 'w=' + frames[i].image.width + ' h=' + frames[i].image.height + ' delay=' + frames[i].delay + ' disposal=' + frames[i].disposalMethod
        })

        cs.getContext('2d').putImageData(frames[i].image, 0, 0)

        if (frames.length > 1) {
          new fabric.Image.fromURL(cs.toDataURL(), (img) => {
            img.set('selectable', false)
            img.left = img.width * i
            merge.setHeight(img.height)
            merge.setWidth(img.width * (i + 1))
            merge.add(img)
            merge.renderAll()
            if (i === frames.length - 1) {
              document.querySelector('#view').insertAdjacentHTML('beforeend', '<img src="' + merge.toDataURL('png') + '" />')
            }
          })
        } else {
          log('无效的gif')
        }
      }
    },

    saveImg () {
      const _ = document.querySelector('#canvas')
      this.targerBlur()
      _.toBlob((blob) => {
        saveAs(blob, 'img.png')
      })
    }
  }
}
</script>

<style>
  .container {
    margin: 0 auto;
    font-size: 14px;
  }
  .container .hidden {
    position: fixed;
    top: -10px;
    left: 0;
    visibility: hidden;
  }
  .wrap {
    width: 100%;
    padding: 30px 60px;
    background-image: linear-gradient(-135deg, #1774BD 0%, #5841C2 100%);
    box-sizing: border-box;
  }
  .wrap_pd {
    position: relative;
  }
  .wrap_pd .input {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    padding-right: 123px;
    border-radius: 3px;
    border: 0 none;
    background-color: #fff;
    box-sizing: border-box;
  }
  .wrap_pd input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .wrap_pd .update_btn {
    position: absolute;
    right: 1px;
    top: 50%;
    height: 38px;
    line-height: 38px;
    margin-top: -19px;
    padding: 0 12px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
  }
  .container .canvas_wrap {
    text-align: center;
    background: #ddd;
  }
  .container .btn {
    display: inline-block;
    height: 40px;
    margin: 0 6px;
    padding: 0 12px;
    line-height: 40px;
    text-align: center;
    border: 0 none;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
  }
  .container .start {
    padding: 20px 10px;
  }
  .min_input {
    width: 60px;
    height: 38px;
    padding: 0 6px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  canvas {
    border: solid black 1px;
  }
</style>
