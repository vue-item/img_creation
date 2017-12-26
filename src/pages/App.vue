<template>
  <div class="container">
    <div class="wrap">
      <div class="wrap_pd">
        <input type="text" placeholder="请粘入url" name="text" class="input" />
        <div class="update_btn">
          本地上传 gif 动画
          <input type="file" name="file" v-on:change="postImg" accept="image/gif" />
        </div>
      </div>
    </div>
    <div class="canvas_wrap">
      <canvas id="canvas" :width='params.width' :height='params.height'></canvas>
    </div>
    <div id="view"></div>
    <div class="start">
      <input id="save" class="save_btn" type="button" value="保存图片" @click="saveImg">
    </div>
  </div>
</template>

<script>

import { fabric } from 'fabric'
import loading from '../common/loading'
import { saveAs } from 'file-saver'
import { fileReader, loadGif, createElement, preloadingImg } from '../common/util'
// 上传图片后canvas居中，大小设定问题
// 输出定制大小问题

export default {
  data () {
    return {
      params: {
        width: 800,
        height: 400
      }
    }
  },
  created () {
    loading.show()
  },
  mounted () {
    setTimeout(() => {
      loading.hide()
    }, 500)
  },
  methods: {
    postImg (e) {
      let obj = ''
      // const self = this
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
                const canvas = new fabric.Canvas('canvas')
                const img = new fabric.Image(el, {
                  left: 100,
                  top: 100,
                  width: obj.width,
                  height: obj.height
                })
                canvas.add(img)
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
      this.n += 1
      const cs = document.querySelector('#canvas')
      cs.toBlob((blob) => {
        saveAs(blob, '51gif.gif')
      })
    }
  }
}
</script>

<style>
  .container {
    width: 800px;
    margin: 0 auto;
    font-size: 14px;
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
    background-image: linear-gradient(-135deg, #86CD6D 0%, #60C4AF 100%);
    color: #fff;
  }
  .container .canvas_wrap {
    background: #ddd;
  }
  .container .save_btn {
    display: inline-block;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 0 none;
    border-radius: 3px;
    background-image: linear-gradient(-135deg, #E86874 0%, #E58A4D 100%);
    color: #fff;
  }
  .container .start {
    padding: 20px;
    text-align: center;
  }
</style>
