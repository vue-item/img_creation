<template>
  <div class="container">
    <input type="file" @change="changeFile" name="file">
    <div id="view"></div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import loading from '../common/loading'

export default {
  data () {
    return {
      len: 0
    }
  },
  created () {
    loading.show()
  },
  mounted () {
    setTimeout(() => {
      loading.hide()
    }, 1000)
  },
  methods: {
    changeFile (e) {
      const tar = e.target.files[0]
      if (/gif$/.test(tar.type)) {
        const file = new FileReader()

        file.onprogress = (e) => {
          const progress = '进度' + (100 * e.loaded / e.total | 0) + '%'
          log(progress)
        }

        file.onload = (e) => {
          log('加载完成')
          const gif = new Gif()
          gif.onprogress = (e) => {
            log('解析' + (100 * e.loaded / e.total | 0) + '%')
          }
          gif.onparse = () => {
            log('解析完成')
            setTimeout(() => {
              this.buildView(gif, file.name, true)
            }, 100)
          }
          gif.onerror = (e) => {
            log(e)
          }
          gif.parse(file.result)
        }

        file.onerror = (e) => {
          log(e)
        }

        file.readAsArrayBuffer(tar)
        // fr.readAsDataURL(file)
      } else {
        log('not gif')
      }
    },
    buildView (gif, fname, preRender) {
      const merge = new fabric.Canvas('merge')

      const canvas = document.createElement('canvas')
      canvas.width = gif.header.width
      canvas.height = gif.header.height
      canvas.title = 'w=' + canvas.width + ' h=' + canvas.height

      const frames = gif.createFrameImages(canvas.getContext('2d'), preRender, !preRender)

      for (let i = 0, len = frames.length; i < len; i++) {
        const cs = document.createElement('canvas')
        cs.width = frames[i].image.width
        cs.height = frames[i].image.height
        cs.getContext('2d').putImageData(frames[i].image, 0, 0)
        cs.title = 'w=' + frames[i].image.width + ' h=' + frames[i].image.height + ' delay=' + frames[i].delay + ' disposal=' + frames[i].disposalMethod

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
    }
  }
}
</script>

<style>
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  canvas {
    border: 1px dashed black;
  }
</style>
