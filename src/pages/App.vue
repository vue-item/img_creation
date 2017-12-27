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
      <input class="btn blue f14" type="button" value="添加段落" @click="addTextBox">
      <input class="btn green f14" type="button" value="添加文本" @click="addIText">
      <input class="btn yellow f14" type="button" value="添加文字" @click="addText">
      <input class="btn red f14" type="button" value="插入图片" @click="targetFile">
      <input class="btn red f14" type="button" value="删除选中" @click="clearObject">
      <input class="btn red f14" type="button" value="清除画布" @click="clearAllObj">
      <input class="btn orange f14" type="button" value="保存图片" @click="saveImg">
    </div>
    <div class="start">
      <input class="btn blue f14" type="button" value="失去焦点" @click="targerBlur">
      <input class="btn blue f14" type="button" value="向上" @click="up">
      <input class="btn blue f14" type="button" value="组向上" @click="upGroup">
      <input class="btn blue f14" type="button" value="向下" @click="down">
      <input class="btn blue f14" type="button" value="组向下" @click="downGroup">
      <input id="cs_width" minlength="1" class="min_input" type="number">
      <input id="cs_height" maxlength="800" class="min_input" type="number">
      <input class="btn orange f14" type="button" value="调整画布" @click="modifyCanvas">
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import loading from '../common/loading'
import { saveAs } from 'file-saver'
import { Canvas, Text, TextBox, IText } from '../common/fabric'
import { fileReader, loadGif, createElement, preloadingImg } from '../common/util'

// 添加路径别名
// 上传图片后canvas居中，大小设定问题
// 输出定制大小问题

export default {
  data () {
    return {
      params: {
        width: 400,
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
    this.canvas = Canvas('canvas')
    this.canvas.backgroundColor = 'rgba(0,0,255,0.3)'
    this.canvas.renderAll()
  },
  methods: {
    targerBlur () {
      const text = Text('')
      this.canvas.add(text)
      this.canvas.setActiveObject(text)
      this.clearObject()
      // this.canvas.discardActiveObject()
      // this.canvas.deactivateAllWithDispatch()
      // this.canvas.discardActiveGroup()
    },

    loadImg () {
      const url = this.$refs.remote.value
      alert(url)
    },

    up () {
      this.canvas.getActiveObject().bringForward()
      this.canvas.requestRenderAll()
    },

    upGroup () {
      this.canvas.getActiveObject().bringToFront()
      this.canvas.requestRenderAll()
    },

    down () {
      this.canvas.getActiveObject().sendBackwards()
      this.canvas.requestRenderAll()
    },

    downGroup () {
      this.canvas.getActiveObject().sendToBack()
      this.canvas.requestRenderAll()
    },

    filter () {

    },

    modifyCanvas () {
      const width = document.querySelector('#cs_width').value
      const height = document.querySelector('#cs_height').value
      if (width && height) {
        this.canvas.setHeight(height)
        this.canvas.setWidth(width)
      }
    },

    clearObject () {
      this.canvas.remove.apply(this.canvas, this.canvas.getActiveObjects()) // 删除的元素还原回来
      this.canvas.discardActiveObject()
    },

    clearAllObj () {
      this.canvas.remove.apply(this.canvas, this.canvas.getObjects())
      this.canvas.discardActiveObject()
    },

    targetFile () {
      const file = document.querySelector('#file')
      file.click()
    },

    addIText () {
      const itext = IText('哈哈')
      this.canvas.add(itext)
      // this.canvas.setActiveObject(itext)
    },

    addTextBox () {
      const text = TextBox('呵呵呵', {
        width: 300,
        backgroundColor: '#FFFFA5'
      })
      this.canvas.add(text)
      // this.canvas.setActiveObject(text)
      // text.selectAll()
      // text.enterEditing()
      // text.hiddenTextarea.focus() // 无法失去焦点
    },

    addText () {
      const text = Text('😡😝😊😤🦑apple苹果 \ 😝😑哈哈哈')
      this.canvas.add(text)
      // this.canvas.setActiveObject(text)
    },

    addImg (e) {
      let obj = ''
      const self = this
      const tar = e.target.files[0]
      const fr = fileReader(tar, {
        readAsDataURL: true,
        onload (event) {
          preloadingImg(fr.result)
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
                // this.canvas.setActiveObject(img)
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

      const canvas = createElement('canvas', {
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
      const canvas = document.querySelector('#canvas')
      // this.canvas.discardActiveObject()
      this.targerBlur()
      setTimeout(() => {
        canvas.toBlob((blob) => {
          saveAs(blob, '51gif.png')
        })
      }, 1000)
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
    text-align: center;
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
