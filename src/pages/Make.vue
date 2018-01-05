<template>
  <div class="make">
    <div class="flex">
      <div ref="area" class="draw_area">
        <div ref="draw" class="draw"></div>
      </div>

      <div class="operating_area">

        <div v-show="text" class="operating_area_text">

          <textarea @input="textChange" ref="textarea" class="text_area bb f16" placeholder="文本编辑区" maxlength="250" rows="1" tabindex="0"></textarea>

          <div class="start">
            <div class="color_box br">
              <input class="color_input" @input="textStyle($event, 'color')" type="color" name="color">
              <i class="iconfont icon-jiantou"></i>
            </div>
            <div class="color_box br">
              <input class="color_input" @input="textStyle($event, 'bg')" type="color" name="color">
              <i class="iconfont icon-jiantou"></i>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">字体</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textStyle($event, 'solid')" class="iconfont icon-jiacu f12"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">修饰符</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textStyle($event, 'solid')" class="iconfont icon-jiacu f12"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'italic')" class="iconfont icon-xieti"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'overline')" class="iconfont icon-overline"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'linethrough')" class="iconfont icon-line_through"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'underline')" class="iconfont icon-xiahuaxian"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">操作</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="clear" class="iconfont icon-lajitong f14"></button>
              <button @click="copy" class="iconfont icon-fuzhi f14"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">字体大小</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textAlign('small')" class="iconfont icon-A f10"></button>
              <div class="hr"></div>
              <button @click="textAlign('big')" class="iconfont icon-A f16"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">层级调整</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textStyle($event, 'bringForward')" class="iconfont icon-shangyiyiceng1 f14"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'sendBackwards')" class="iconfont icon-xiayiyiceng2 f14"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">透明度</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textStyle($event, 'opacity_add')" class="iconfont icon-jia f14"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'opacity_reduce')" class="iconfont icon-minus f14"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">翻转</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textStyle($event, 'flipX')" class="iconfont icon-chuizhifanzhuan f14"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'flipY')" class="iconfont icon-shuipingfanzhuan f14" ></button>
            </div>
          </div>

          <div class="start">
            <div class="title mb">对齐方式</div>
            <div class="flex mb bg br">
              <button @click="textAlign('right')" class="iconfont flex1 icon-youduiqi"></button>
              <div class="hr"></div>
              <button @click="textAlign('center')"  class="iconfont flex1 icon-duiqi-shuiping"></button>
              <div class="hr"></div>
              <button @click="textAlign('left')"  class="iconfont flex1 icon-zuoduiqi_icon"></button>
            </div>
            <div class="flex bg br">
              <button @click="textAlign('top')" class="iconfont flex1 icon-duiqi-shang"></button>
              <div class="hr"></div>
              <button @click="textAlign('vertical')" class="iconfont flex1 icon-duiqi-chuizhi"></button>
              <div class="hr"></div>
              <button @click="textAlign('bottom')" class="iconfont flex1 icon-duiqi-xia"></button>
            </div>
          </div>

          <div @click="textStyle($event, 'save')" class="fixed_bottom">
            <span class="iconfont icon-Save" style="font-size: 20px;"></span>
            <span style="padding-left: 12px;">保存图片</span>
          </div>

        </div>
      </div>
    </div>

    <div class="menu">
      <div @click="shapeShow=true" class="iconfont icon-graph-copy" style="font-weight: 900;"></div>
      <div @click="itextShow=true" class="iconfont icon-tianjiawenben"></div>
      <div @click="imageShow=true" class="iconfont icon-tianjiatupian" style="position: relative;overflow: hidden;"><input ref="file" class="file" type="file" name="file" v-on:change="imgFile" accept="image/gif" /></div>
      <div class="iconfont"><input class="color" type="color" name="color" value="#ffffff" v-on:change="changeColor" /></div>
      <div @click="clearObj('all')" class="iconfont icon-lajitong1"></div>
    </div>
    <list v-on:toggle="toggle" :list="shape" :show="shapeShow" />
    <list v-on:toggle="toggle" :list="itext" :show="itextShow" />
    <list v-on:toggle="toggle" :list="image" :show="imageShow" />
    <url :show="urlShow" :toggle="imgRead"></url>
  </div>
</template>

<script>
  import { shape, text, image } from '../api/data'
  import { createElement, fileReader, loadingImg } from '../common/util'
  import loading from '../common/loading'
  import List from '../components/List'
  import Url from '../components/Url'
  import cs from '../common/canvas'

  export default {
    name: 'make',
    data () {
      return {
        text: true,
        shape: shape,
        shapeShow: false,
        itext: text,
        itextShow: false,
        image: image,
        imageShow: false,
        urlShow: false
      }
    },
    components: {
      List,
      Url
    },
    mounted () {
      const f = this.$refs.area
      cs.set(createElement('canvas', {
        id: 'canvas',
        width: f.offsetWidth / 2,
        height: f.offsetHeight / 2,
        father: this.$refs.draw
      }), {
        preserveObjectStacking: true
      })
      cs.setBgColor('#ffffff')
      cs.canvas.on({
        'object:selected': (e) => {
          const tar = e.target
          if (tar && tar.type && tar.type === 'text') {
            this.$refs.textarea.value = e.target.text
            // this.text = true
          } else if (!tar) {
            // this.text = false
          }
        }
      })
    },
    methods: {
      changeColor (e) { cs.setBgColor(e.target.value) },
      copy () { cs.clone() },
      toggle (obj) {
        if (obj.type === 'Rect' || obj.type === 'Circle' || obj.type === 'Triangle' || obj.type === 'Line') {
          this.shapeShow = false
          if (obj.type) cs.create(obj.type, { active: true })
        } else if (obj.type === 'Text' || obj.type === 'IText' || obj.type === 'Textbox') {
          this.itextShow = false
          if (obj.type) cs.create(obj.type, '请输入你的文字', { active: true })
        } else if (obj.type === 'file') {
          setTimeout(() => {
            this.$refs.file.click()
            this.imageShow = false
          }, 200)
        } else if (obj.type === 'url') {
          this.imageShow = false
          this.urlShow = true
        } else {
          this.shapeShow = false
          this.itextShow = false
          this.imageShow = false
        }
      },
      textChange (e) {
        const obj = cs.getActiveObject()
        const val = e.target.value.replace(/\s/g, '')
        if (obj) cs.style({ text: val })
      },
      textAlign (position) {
        const conf = cs.textReset()
        conf.d.active = true
        switch (position) {
          case 'left':
            conf.d.left = cs.mr
            break
          case 'center':
            conf.d.left = cs.canvas.width / 2 - conf.w / 2
            break
          case 'right':
            conf.d.left = cs.canvas.width - conf.w - cs.mr
            break
          case 'top':
            conf.d.top = cs.mr
            break
          case 'vertical':
            conf.d.top = cs.canvas.height / 2 - conf.h / 2
            break
          case 'bottom':
            conf.d.top = cs.canvas.height - conf.h - cs.mr
            break
          case 'small':
            conf.d.fontSize = conf.f - 1
            break
          case 'big':
            conf.d.fontSize = conf.f + 1
            break
        }
        cs.create('Text', '', conf.d)
      },
      textStyle (e, type) {
        const obj = cs.getActiveObject()
        switch (type) {
          case 'solid':
            cs.style({ fontWeight: obj.fontWeight === 'normal' ? '900' : 'normal' })
            break
          case 'italic':
            cs.style({ fontStyle: obj.fontStyle === 'normal' ? 'italic' : 'normal' })
            break
          case 'overline':
            cs.style({ overline: !obj.overline })
            break
          case 'linethrough':
            cs.style({ linethrough: !obj.linethrough })
            break
          case 'underline':
            cs.style({ underline: !obj.underline })
            break
          case 'bg':
            cs.style({ textBackgroundColor: e.target.value })
            break
          case 'color':
            cs.style({ fill: e.target.value })
            break
          case 'opacity_reduce':
            cs.style({ opacity: obj.opacity - 0.1 })
            break
          case 'opacity_add':
            cs.style({ opacity: obj.opacity + 0.1 })
            break
          case 'flipX':
          case 'flipY':
            const flip = {}
            flip[type] = obj[type] ? 0 : 1
            cs.style(flip)
            break
          case 'bringForward':
          case 'sendBackwards':
            cs.position(type)
            break
          case 'save':
            cs.save('#canvas', 'node.png')
            break
        }
      },
      clearObj (type) { cs.clear(type) },
      imgRead (src) {
        // 验证url 是否为图片格式
        if (src) {
          loading.show()
          loadingImg(src)
          .then((res) => {
            cs.fromURL(res)
            loading.hide()
          })
        }
        this.urlShow = false
      },
      imgFile (e) {
        loading.show()
        cs.blur()
        const tar = e.target.files[0]
        fileReader(tar, {
          readAsDataURL: true,
          onload (d) {
            loadingImg(d).then((res) => {
              cs.fromURL(res)
              loading.hide()
            })
          }
        })
      }
    }
  }
</script>

<style>
  .make {
    margin-top: 50px;
  }
  .make button {
    cursor: pointer;
  }
  .make .flex {
    height: calc(100vh - 50px);
  }
  .make .draw_area {
    position: relative;
    flex: 1;
    border: 0;
    background-color: #F4F3F4;
  }
  .make .operating_area {
    position: relative;
    width: 240px;
    border-left: 1px solid #DCDCDC;
    background-color: #F5F5F5;
  }
  .operating_area .theme {
    position: relative;
  }
  .operating_area .group {
    height: 50px;
    line-height: 50px;
    text-indent: 12px;
  }
  .operating_area .color_box {
    display: inline-block;
    vertical-align: middle;
    background: #fff;
  }
  .operating_area .color_input {
    width: 32px;
    height: 32px;
    line-height: 28px;
  }
  .operating_area .theme .icon-jiantou {
    position: absolute;
    right: 12px;
    top: 18px;
    font-size: 16px;
  }
  .operating_area .text_area {
    width: 100%;
    min-height: 32px;
    max-height: 84px;
    line-height: 24px;
    padding: 8px;
    vertical-align: top;
    box-sizing: border-box;
    overflow-y: auto;
    outline: none;
    resize: vertical;
  }
  .operating_area .hr {
    width: 1px;
    background-color: #DCDCDC;
  }
  .operating_area .start {
    padding: 10px 12px;
  }
  .operating_area .start .icon-jiantou {

  }
  .operating_area .mb {
    margin-bottom: 6px;
  }
  .operating_area .bg {
    background-color: #fff;
  }
  .operating_area .flex {
    height: 22px;
    border-radius: 3px;
  }
  .operating_area .flex .iconfont:before {
    padding: 0 10px;
  }
  .operating_area .fixed_bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #dcdcdc;
  }
  .menu {
    position: fixed;
    left: 12px;
    top: 50%;
    align-items: flex-start;
    text-align: center;
    transform: translateY(-50%);
    border: 1px solid #DCDCDC;
  }
  .menu .iconfont {
    overflow: hidden;
    width: 46px;
    height: 46px;
    line-height: 46px;
    font-size: 26px;
    background-color: #fff;
    cursor: pointer;
    border-bottom: 1px solid #DCDCDC;
  }
  .menu .iconfont:last-child {
    border-bottom: 0;
  }
  .menu .file {
    position: absolute;
    left: 0;
    top: 100px;
    opacity: 0;
    cursor: pointer;
  }
  .menu .color {
    width: 32px;
    height: 32px;
  }
  .draw {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #DCDCDC;
  }
</style>

