<template>
  <div class="make">
    <div class="flex">
      <div ref="area" class="draw_area">
        <div ref="draw" class="draw"></div>
      </div>

      <div class="operating_area">

        <div class="operating_area_text">
          <textarea @input="textChange" ref="textarea" class="text_area bb f16" placeholder="文本编辑区" maxlength="250" rows="1" tabindex="0"></textarea>

          <div class="start flex bb">
            <div class="title">颜色</div>
            <div class="flex1"></div>
            <div class="flex">
              <div class="color_box br" style="margin-right: 12px;">
                <span>字体</span>
                <input class="color_input" @input="textStyle($event, 'color')" type="color" name="color">
                <i class="iconfont icon-jiantou"></i>
              </div>

              <div class="color_box br">
                <span>背景</span>
                <input class="color_input" @input="textStyle($event, 'bg')" type="color" name="color">
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">字体</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <view-font></view-font>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">修饰</div>
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
            <div class="flex br bg flex2">
              <button @click="clear('only')" class="iconfont icon-lajitong f16 flex1"></button>
              <div class="hr"></div>
              <button @click="copy" class="iconfont icon-fuzhi f16 flex1"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">大小</div>
            <div class="flex1"></div>
            <div class="flex br bg flex2">
              <button @click="textAlign('small')" class="iconfont icon-A f10 flex1"></button>
              <div class="hr"></div>
              <button @click="textAlign('big')" class="iconfont icon-A f16 flex1"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">层级</div>
            <div class="flex1"></div>
            <div class="flex br bg flex2">
              <button @click="textStyle($event, 'bringForward')" class="iconfont icon-shangyiyiceng1 f16 flex1"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'sendBackwards')" class="iconfont icon-xiayiyiceng2 f16 flex1"></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">翻转</div>
            <div class="flex1"></div>
            <div class="flex br bg flex2">
              <button @click="textStyle($event, 'flipX')" class="iconfont icon-chuizhifanzhuan f16 flex1"></button>
              <div class="hr"></div>
              <button @click="textStyle($event, 'flipY')" class="iconfont icon-shuipingfanzhuan f16 flex1" ></button>
            </div>
          </div>

          <div class="start flex bb">
            <div class="title">透明度</div>
            <div class="flex1"></div>
            <div class="flex br bg" style="padding: 0 6px;">
              <input type="range" name="opacity" min="0" max="10" value="10" @input="textStyle($event, 'opacity')">
            </div>
          </div>

          <div class="start">
            <div class="title mb">对齐方式</div>
            <div class="flex mb bg br">
              <button @click="textAlign('right')" class="iconfont flex1 icon-youduiqi f12"></button>
              <div class="hr"></div>
              <button @click="textAlign('center')"  class="iconfont flex1 icon-duiqi-shuiping f12"></button>
              <div class="hr"></div>
              <button @click="textAlign('left')"  class="iconfont flex1 icon-zuoduiqi_icon f12"></button>
            </div>
            <div class="flex bg br">
              <button @click="textAlign('top')" class="iconfont flex1 icon-duiqi-shang f12"></button>
              <div class="hr"></div>
              <button @click="textAlign('vertical')" class="iconfont flex1 icon-duiqi-chuizhi f12"></button>
              <div class="hr"></div>
              <button @click="textAlign('bottom')" class="iconfont flex1 icon-duiqi-xia f12"></button>
            </div>
          </div>

          <div @click="textStyle($event, 'save')" class="fixed_bottom">
            <span class="iconfont icon-Save" style="font-size: 20px;"></span>
            <span style="padding-left: 12px;">保存图片</span>
          </div>

        </div>
      </div>
    </div>
    <view-menu :open="menuOpen" ref="menu"  />
    <list v-on:toggle="toggle" :list="list.shape" :show="config.shape" />
    <list v-on:toggle="toggle" :list="list.text" :show="config.text" />
    <list v-on:toggle="toggle" :list="list.image" :show="config.image" />
    <url :toggle="menuOpen" :show="config.url"  />
  </div>
</template>

<script>
  import { image, text, shape } from '@api/data'
  import { createElement } from '@common/util'
  import canvas from '@common/canvas'
  import List from '@components/List'
  import ViewMenu from '@components/Menu'
  import Url from '@components/Url'
  import ViewFont from '@components/Font'
  // http://fabricjs.com/controls // 图片形状移动

  export default {
    name: 'make',
    data () {
      return {
        config: {
          shape: false,
          text: false,
          image: false,
          url: false
        },
        list: {
          shape,
          text,
          image
        }
      }
    },
    components: {
      List,
      Url,
      ViewMenu,
      ViewFont
    },
    mounted () {
      const f = this.$refs.area
      canvas.set(createElement('canvas', {
        id: 'canvas',
        width: f.offsetWidth / 2,
        height: f.offsetHeight / 2,
        father: this.$refs.draw
      }), {
        preserveObjectStacking: true
      })
      canvas.setBgColor('#ffffff')
      canvas.canvas.on({
        'object:selected': (e) => {
          const tar = e.target
          if (tar && tar.type && tar.type === 'text') {
            this.$refs.textarea.value = e.target.text
          } else if (!tar) {
            //
          }
        }
      })
    },
    methods: {
      menuOpen (type, state = true) {
        this.config[type] = state
      },
      copy: canvas.clone.bind(canvas),
      clear: canvas.clear.bind(canvas),
      toggle (obj) {
        if (obj.type === 'Rect' || obj.type === 'Circle' || obj.type === 'Triangle' || obj.type === 'Line') {
          this.config.shape = false
          if (obj.type) canvas.create(obj.type, { active: true })
        } else if (obj.type === 'Text' || obj.type === 'IText' || obj.type === 'Textbox') {
          this.config.text = false
          if (obj.type) canvas.create(obj.type, '请输入你的文字', { active: true })
        } else if (obj.type === 'file') {
          setTimeout(() => {
            this.$refs.menu.$refs.file.click()
            this.config.image = false
          }, 200)
        } else if (obj.type === 'url') {
          this.config.image = false
          this.config.url = true
        } else {
          this.config.shape = false
          this.config.text = false
          this.config.image = false
        }
      },
      textChange (e) {
        const obj = canvas.getActiveObject()
        const text = e.target.value.replace(/\s/g, '')
        if (obj && text) canvas.style({ text })
      },
      textAlign (position) {
        const conf = canvas.textReset()
        conf.d.active = true
        switch (position) {
          case 'left':
            conf.d.left = canvas.mr
            break
          case 'center':
            conf.d.left = canvas.canvas.width / 2 - conf.w / 2
            break
          case 'right':
            conf.d.left = canvas.canvas.width - conf.w - canvas.mr
            break
          case 'top':
            conf.d.top = canvas.mr
            break
          case 'vertical':
            conf.d.top = canvas.canvas.height / 2 - conf.h / 2
            break
          case 'bottom':
            conf.d.top = canvas.canvas.height - conf.h - canvas.mr
            break
          case 'small':
            conf.d.fontSize = conf.f - 1
            break
          case 'big':
            conf.d.fontSize = conf.f + 1
            break
        }
        canvas.create('Text', '', conf.d)
      },
      textStyle (e, type) {
        const obj = canvas.getActiveObject()
        switch (type) {
          case 'solid':
            canvas.style({ fontWeight: obj.fontWeight === 'normal' ? '900' : 'normal' })
            break
          case 'italic':
            canvas.style({ fontStyle: obj.fontStyle === 'normal' ? 'italic' : 'normal' })
            break
          case 'overline':
            canvas.style({ overline: !obj.overline })
            break
          case 'linethrough':
            canvas.style({ linethrough: !obj.linethrough })
            break
          case 'underline':
            canvas.style({ underline: !obj.underline })
            break
          case 'bg':
            canvas.style({ textBackgroundColor: e.target.value })
            break
          case 'color':
            canvas.style({ fill: e.target.value })
            break
          case 'opacity':
            canvas.style({ opacity: e.target.value / 10 })
            break
          case 'flipX':
          case 'flipY':
            const flip = {}
            flip[type] = obj[type] ? 0 : 1
            canvas.style(flip)
            break
          case 'bringForward':
          case 'sendBackwards':
            canvas.position(type)
            break
          case 'save':
            canvas.save('#canvas', 'node.png')
            break
        }
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
    background-color: #fff;
  }
  .make .operating_area {
    position: relative;
    width: 260px;
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
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding: 0 26px 0 2px;
    border-radius: 3px;
    background: #fff;
    font-size: 12px;
  }
  .operating_area .color_input {
    overflow: hidden;
    width: 26px;
    height: 26px;
    border-radius: 3px;
  }
  .operating_area .color_box .icon-jiantou {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -6px;
    font-size: 12px;
    color: #999;
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
    height: 10px;
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
    height: 28px;
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
    background-color: #fff;
    border-top: 1px solid #F4F3F4;
  }
  .operating_area .operating_area_text {
    padding-bottom: 53px;
  }
  .operating_area_text .flex {
    align-items: center;
  }
  .draw_area .draw {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #DCDCDC;
  }
</style>

