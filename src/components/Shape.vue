<template>
  <div class="_shape" v-show="state === 'shape'">
    <div class="start flex bb">
      <div>颜色</div>
      <div class="flex1"></div>
      <div id="shape_color" class="flex color_box br">
          <div ref="color" class="text_color"></div>
          <input @input="changeEvent($event, 'fill')" class="shape_color" type="text" name="color">
          <div @click="open($event, 'font')" class="text_event"></div>
          <i class="iconfont icon-jiantou f8"></i>
        </div>
    </div>

    <div class="start flex bb">
      <div>角度</div>
      <div class="flex1"></div>
      <input @input="change($event, 'angle')" ref="angle" type="range" value="0" min="0" max="360">
    </div>

    <div class="start flex bb">
      <div>左移动</div>
      <div class="flex1"></div>
      <input @input="change($event, 'left')" ref="left" type="range" value="150" min="0" :max="w">
    </div>

    <div class="start flex bb">
      <div>上移动</div>
      <div class="flex1"></div>
      <input @input="change($event, 'top')" ref="top"  type="range" value="0" min="0" :max="h">
    </div>

    <div class="start flex bb">
      <div>放大</div>
      <div class="flex1"></div>
      <input @input="change($event, 'scale')" ref="scale" type="range" value="1" min="0.1" max="3" step="0.1">
    </div>

    <div class="start flex bb">
      <div>倾斜X</div>
      <div class="flex1"></div>
      <input @input="change($event, 'skewX')" ref="skewX" type="range" value="0" min="0" max="80" step="1">
    </div>

    <div class="start flex bb">
      <div>倾斜Y</div>
      <div class="flex1"></div>
      <input @input="change($event, 'skewY')" ref="skewY" type="range" value="0" min="0" max="80" step="1">
    </div>

    <div class="start flex bb">
      <div>透明度</div>
      <div class="flex1"></div>
      <div class="flex br">
        <input @input="change($event, 'opacity')" ref="opacity"  type="range" min="0" max="1" step="0.1" />
      </div>
    </div>

    <div class="start flex bb">
      <div>层级</div>
      <div class="flex1"></div>
      <div class="flex br bg flex2">
        <button @click="change($event, 'bringForward')" class="iconfont icon-shangyiyiceng1 f16 flex1"></button>
        <div class="hr"></div>
        <button @click="change($event, 'sendBackwards')" class="iconfont icon-xiayiyiceng2 f16 flex1"></button>
      </div>
    </div>

    <div class="start">
      <div class="flex mb _flex">
        <div class="gray">操作</div>
        <div class="flex1"></div>
        <div @click="clear" class="btn bg bb">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { colorConfig } from '@api/data'
  import cs from '@common/canvas'
  const Huebee = require('huebee')
  let _huebee = ''
  // http://fabricjs.com/fabric-intro-part-2
  // 边框 阴影 没加
  // 切图 https://github.com/nyanim/fabricjs-crop/blob/master/index.html
  export default {
    props: {
      state: String,
      modify: Function
    },
    data () {
      return {
        w: '',
        h: ''
      }
    },
    mounted () {
      const o = document.querySelector('#_area')
      this.w = o.offsetWidth
      this.h = o.offsetHeight

      window.addEventListener('resize', (e) => {
        this.w = o.offsetWidth
        this.h = o.offsetHeight
      })

      _huebee = new Huebee('.shape_color', colorConfig)
      _huebee.on('change', (val) => {
        this.$refs.color.style.background = val
        // canvas.style({ fill: val })
      })
    },
    methods: {
      init () {
        const obj = cs.getActiveObject()
        if (!obj) return
        this.$refs.angle.value = obj.angle
        this.$refs.left.value = obj.left
        this.$refs.top.value = obj.top
        this.$refs.scale.value = obj.scaleX
        this.$refs.skewX.value = obj.skewX
        this.$refs.skewY.value = obj.skewY
        this.$refs.opacity.value = obj.opacity
        this.$refs.color.style.backgroundColor = obj.fill
      },
      open (e) {
        const tar = e.target.parentNode
        tar.classList.toggle('')
        _huebee.open()
      },
      clear () {
        cs.clear('only')
        this.modify()
      },
      change (e, t) {
        const v = e.target.value
        const obj = cs.getActiveObject()

        switch (t) {
          case 'angle':
            obj.set('angle', parseInt(v, 10)).setCoords()
            break
          case 'left':
            obj.set('left', parseInt(v, 10)).setCoords()
            break
          case 'top':
            obj.set('top', parseInt(v, 10)).setCoords()
            break
          case 'scale':
            obj.scale(parseFloat(v)).setCoords()
            break
          case 'skewX':
            obj.set('skewX', parseInt(v, 10)).setCoords()
            break
          case 'skewY':
            obj.set('skewY', parseInt(v, 10)).setCoords()
            break
          case 'opacity':
            obj.set('opacity', v).setCoords()
            break
          case '':
            obj.set('backgroundColor', v).setCoords()
            break
          case 'bringForward':
          case 'sendBackwards':
            cs.position(t)
            break
        }
        cs.canvas.requestRenderAll()
      }
    }
  }
</script>

<style>
  ._shape .color_box {
    position: relative;
    padding: 0 4px 0 6px;
    border-radius: 3px;
    overflow: hidden;
  }
  ._shape .shape_color {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  ._shape .text_color {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 4px 4px;
  }
  ._shape .overbox {
    overflow: inherit;
  }
  ._shape .text_event {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  ._shape .icon-jiantou {
    pointer-events: none;
  }
</style>
