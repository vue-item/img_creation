<template>
  <div class="brush" v-show="state === 'brush'">

    <div class="start flex bb">
      <div>模式</div>
      <div class="flex1"></div>
      <div class="flex br bg" style="padding: 6px;">
        <div class="flist">
          <div>
            <select class="select" @change="modeChange">
              <option v-for="v in list" :value="v">{{ v }}</option>
            </select>
            <i class="iconfont icon-jiantou flist_icon f10"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="start bb">
      <div class="title mb">画笔</div>
      <div class="flex flex_start">
        <div class="gray">颜色</div>
        <div class="flex1"></div>
        <input ref="lineColor" class="input-line" type="text" value="#666">
        <input ref="penColor" type="text" class="box">
        <div class="brush_position" @click="open('brush')"></div>
      </div>
      <div class="flex mb _flex">
        <div class="gray">宽度</div>
        <div class="flex1"></div>
        <input @input="lineWidthChange" ref="lineWidth" type="range" value="30" min="0" max="150">
      </div>
    </div>

    <div class="start bb">
      <div class="title mb">阴影</div>
      <div class="flex flex_start">
        <div class="gray">颜色</div>
        <div class="flex1"></div>
        <input ref="shadow" class="input-shadow" type="text" value="#666">
        <input ref="shadowColor" type="text" class="box">
        <div class="brush_position" @click="open('shadow')"></div>
        <!---->
      </div>
      <div class="flex mb _flex">
        <div class="gray">宽度</div>
        <div class="flex1"></div>
        <input @input="shadowWidthChange" ref="shadowWidth" type="range" value="0" min="0" max="50">
      </div>
      <div class="flex mb _flex">
        <div class="gray">偏移</div>
        <div class="flex1"></div>
        <input @input="shadowOffsetChange" ref="shadowOffset" type="range" value="0" min="0" max="50">
      </div>
    </div>

    <div class="start">
      <div class="flex mb _flex">
        <div class="gray">操作</div>
        <div class="flex1"></div>
        <div>取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { brushList, colorConfig } from '@api/data'
  import canvas from '@common/canvas'
  const Huebee = require('huebee')
  let huebee = ''
  let _huebee = ''

  export default {
    props: {
      state: String
    },
    data () {
      return {
        list: [],
        config: {}
      }
    },
    created () {
      this.list = brushList
    },
    mounted () {
      huebee = new Huebee('.input-line', colorConfig)
      huebee.on('change', (val) => {
        this.$refs.penColor.style.background = val
        canvas.brushColor(val, 'brush')
      })
      _huebee = new Huebee('.input-shadow', colorConfig)
      _huebee.on('change', (val) => {
        this.$refs.shadowColor.style.background = val
        canvas.brushColor(val, 'shadow')
      })
    },
    methods: {
      modeChange (e) {
        canvas.brush({
          mode: e.target.value,
          lineColor: this.$refs.lineColor.value,
          lineWidth: this.$refs.lineWidth.value,
          shadowColor: this.$refs.shadowColor.value,
          shadowWidth: this.$refs.shadowWidth.value,
          shadowOffset: this.$refs.shadowOffset
        })
      },
      lineWidthChange (e) {
        canvas.brushLineWidth(e.target.value)
      },
      shadowWidthChange (e) {
        canvas.brushShadowWidth(e.target.value)
      },
      shadowOffsetChange (e) {
        canvas.brushshadowOffset(e.target.value)
      },
      open (t) {
        if (t === 'brush') {
          huebee.open()
        } else if (t === 'shadow') {
          _huebee.open()
        }
      }
    }
  }
</script>

<style>
  .brush .box, .brush .brush_position {
    width: 36px;
    height: 30px;
    border-radius: 5px;
  }
  .brush .huebee__container {
    left: -1;
  }
  .brush ._flex {
    min-height: 30px
  }
  .brush .gray {
    color: #666;
  }
  .brush .title {
    margin-bottom: 12px;
  }
  .brush .brush_position {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #000;
    opacity: 0;
    cursor: pointer;
  }
  .brush .input-line, .brush .input-shadow {
    position: absolute;
    left: 0;
    bottom: -10px;
    pointer-events: none;
    opacity: 0;
  }
</style>