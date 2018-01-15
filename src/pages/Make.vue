<template>
  <div class="make">
    <div class="make_container flex">
      <div ref="area" class="draw_area">
        <div ref="draw" class="draw"></div>
      </div>
      <div class="operating_area">
        <div class="operating_position">
          <view-text ref="text" :state="state" :text="list.textarea" :change-event="changeText" />
          <view-image ref="img" :state="state"/>
          <view-expression :state="state"/>
          <save/>
        </div>
      </div>
    </div>
    <view-menu :dialog-open="dialog" :text="textarea" ref="menu"/>
    <list v-on:toggle="toggle" :list="list.shape" :show="config.shape"/>
    <list v-on:toggle="toggle" :list="list.text" :show="config.text"/>
    <list v-on:toggle="toggle" :list="list.image" :show="config.image"/>
    <url :toggle="dialog" :show="config.url"/>
  </div>
</template>

<script>
  import { image, text, shape } from '@api/data'
  import { createElement } from '@common/util'
  import canvas from '@common/canvas'
  import ViewText from '@components/Text'
  import ViewImage from '@components/Img'
  import ViewExpression from '@components/Expression'
  import List from '@components/List'
  import ViewMenu from '@components/Menu'
  import Save from '@components/Save'
  import Url from '@components/Url'
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
          image,
          textarea: ''
        },
        state: ''
      }
    },
    components: {
      List,
      Url,
      ViewMenu,
      ViewText,
      ViewImage,
      ViewExpression,
      Save
    },
    mounted () {
      console.log(Toast.top({ text: '哈哈哈' }))
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
          this.changeState(e.target)
        },
        'mouse:down': (e) => {
          this.changeState(e.target)
        }
      })
    },
    methods: {
      changeState (tar) {
        console.log(tar)
        if (!tar || !tar.type) {
          this.state = ''
          return
        }
        if (tar.type === 'text' || tar.type === 'textbox') {
          this.list.textarea = tar.text
          this.state = 'text'
        } else if (tar.type === 'image') {
          this.state = 'img'
        } else {
          this.state = ''
        }
      },
      changeText (e, type) {
        const obj = canvas.getActiveObject()
        const params = {}
        switch (type) {
          case 'text':
            const val = e.target.value.replace(/\s/g, '')
            this.list.textarea = val
            canvas.style({ text: val })
            break
          case 'fill':
          case 'textBackgroundColor':
            params[type] = e.target.value
            canvas.style(params)
            break
          case 'solid':
            canvas.style({ fontWeight: obj.fontWeight === 'normal' ? '900' : 'normal' })
            break
          case 'italic':
            canvas.style({ fontStyle: obj.fontStyle === 'normal' ? 'italic' : 'normal' })
            break
          case 'overline':
          case 'linethrough':
          case 'underline':
            params[type] = !obj[type]
            canvas.style(params)
            break
          case 'bringForward':
          case 'sendBackwards':
            canvas.position(type)
            break
          case 'flipX':
          case 'flipY':
            const flip = {}
            flip[type] = obj[type] ? 0 : 1
            canvas.style(flip)
            break
          case 'opacity':
            canvas.style({ opacity: e.target.value / 10 })
            break
          case 'skewX':
          case 'skewY':
          case 'angle':
            params[type] = parseInt(e.target.value, 10)
            canvas.style(params)
            break
          case 'scale':
            obj.scale(parseFloat(e.target.value)).setCoords()
            canvas.canvas.requestRenderAll()
            break
          default:
            this.changeRender(type)
        }
      },
      changeRender (type) {
        const conf = canvas.textReset()
        conf.d.active = true
        switch (type) {
          case 'small':
            conf.d.fontSize = conf.f - 1
            break
          case 'big':
            conf.d.fontSize = conf.f + 1
            break
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
        }
        canvas.create('Text', '', conf.d)
      },
      dialog (type, state = true) {
        if (type === 'expression') {
          this.state = 'expression'
        } else {
          this.config[type] = state
        }
      },
      toggle (obj) {
        const f = this.config
        if (obj.type === 'Rect' || obj.type === 'Circle' || obj.type === 'Triangle' || obj.type === 'Line') {
          f.shape = false
          if (obj.type) canvas.create(obj.type, { active: true })
        } else if (obj.type === 'Text' || obj.type === 'IText' || obj.type === 'Textbox') {
          f.text = false
          canvas.create(obj.type, '请输入你的文字', { active: true })
        } else if (obj.type === 'file') {
          setTimeout(() => {
            this.$refs.menu.$refs.file.click()
            f.image = false
          }, 200)
        } else if (obj.type === 'url') {
          f.image = f.url = false
          f.url = true
        } else {
          f.shape = f.text = f.image = false
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
  .make .make_container {
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
    width: calc(100vw / 5);
    min-width: 260px;
    border-left: 1px solid #DCDCDC;
    background-color: #F5F5F5;
  }
  .operating_area .group {
    height: 50px;
    line-height: 50px;
    text-indent: 12px;
  }

  .operating_area .hr {
    width: 1px;
    height: 10px;
    background-color: #DCDCDC;
  }

  /* common */
  .operating_area .start {
    padding: 10px 12px;
  }
  .operating_area .flex {
    border-radius: 3px;
    align-items: center;
  }
  .operating_area .mb {
    margin-bottom: 6px;
  }
  .operating_area .bg {
    background-color: #fff;
  }
  .operating_area .operating_position {
    height: calc(100vh - 90px);
    margin-bottom: 40px;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .operating_area .operating_position::-webkit-scrollbar { width: 0; }
  .draw_area .draw {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #DCDCDC;
  }
</style>

