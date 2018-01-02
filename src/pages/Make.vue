<template>
  <div class="make">
    <div class="flex">
      <div class="draw_area">
        <div ref="draw" class="draw"></div>
      </div>

      <div class="operating_area">

        <div v-show="text" class="operating_area_text">

          <textarea @input="textChange" ref="textarea" class="text_area bb f16" placeholder="文本编辑区" maxlength="250" rows="1" tabindex="0"></textarea>
          <div class="theme bg bb mb">
            <div class="group">正文</div>
            <i class="iconfont icon-jiantou" @click="styleOpen"></i>
          </div>

          <div class="start">
            <div class="color_box br">
              <input class="color_input" @input="colorChange($event, 'color')" type="color" name="color">
              <i class="iconfont icon-jiantou"></i>
            </div>
            <div class="color_box br">
              <input class="color_input" @input="colorChange($event, 'bg')" type="color" name="color">
              <i class="iconfont icon-jiantou"></i>
            </div>
          </div>

          <div class="start flex">
            <div class="title">操作</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="clearObj('only')" class="iconfont icon-lajitong f10"></button>
            </div>
          </div>

          <div class="start flex">
            <div class="title">大小</div>
            <div class="flex1"></div>
            <div class="flex br bg">
              <button @click="textAlign('small')" class="iconfont icon-A f10"></button>
              <div class="hr"></div>
              <button @click="textAlign('big')" class="iconfont icon-A f16"></button>
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

        </div>
      </div>
    </div>

    <div class="menu">
      <div @click="textAdd" class="iconfont icon-tianjiawenben"></div>
      <div style="position: relative;" class="iconfont icon-tianjiatupian">
        <input class="file" type="file" name="file" v-on:change="imgAdd" accept="image/gif" />
      </div>
      <div @click="openIcon" class="iconfont icon-pintu"></div>
      <div @click="save" class="iconfont icon-Save"></div>
      <div @click="clearObj('all')" class="iconfont icon-lajitong"></div>
    </div>
  </div>
</template>

<script>
  import { createElement, fileReader, loadingImg } from '../common/util'
  import cs from '../common/canvas'

  export default {
    data () {
      return {
        list: [{
          size: 12
        }],
        text: false
      }
    },
    mounted () {
      cs.set(createElement('canvas', {
        id: 'canvas',
        width: 500,
        height: 300,
        father: this.$refs.draw
      }))
      cs.canvas.on({
        'object:selected': (e) => {
          log(e.target)
        },
        'mouse:down': (e) => {
          const tar = e.target
          if (tar && tar.type && tar.type === 'text') {
            this.$refs.textarea.value = e.target.text
            this.text = true
          } else if (!tar) {
            this.text = false
          }
        },
        'object:removed': (e) => {
          log('remove')
          log(e.target)
        }
      })
      this.textAdd()
    },
    methods: {
      styleOpen () {
        //
      },
      textAdd () {
        cs.create('Text', '请输入你的文字', {
          fontSize: 20
        })
      },
      textChange (e) {
        const obj = cs.getActiveObject()
        const val = e.target.value.replace(/\s/g, '')
        if (obj) {
          cs.style({ text: val })
        }
      },
      textAlign (position) {
        const n = 12
        const obj = cs.getActiveObject()
        switch (position) {
          case 'left':
            cs.style({ left: n })
            break
          case 'center':
            const cl = cs.canvas.width / 2 - obj.width / 2
            cs.style({ left: cl })
            break
          case 'right':
            const rl = cs.canvas.width - obj.width - n
            cs.style({ left: rl })
            break
          case 'top':
            cs.style({ top: n })
            break
          case 'vertical':
            const v = cs.canvas.height / 2 - obj.height / 2
            cs.style({ top: v })
            break
          case 'bottom':
            const b = cs.canvas.height - obj.height - n
            cs.style({ top: b })
            break
          case 'small':
            const min = obj.scaleX - 0.1
            cs.style({ scaleX: min, scaleY: min })
            break
          case 'big':
            const max = obj.scaleX
            cs.style({ scaleX: max, scaleY: max })
            break
        }
      },
      colorChange (e, type) {
        const obj = cs.getActiveObject()
        if (!obj) return
        switch (type) {
          case 'bg':
            cs.style({ textBackgroundColor: e.target.value })
            break
          case 'color':
            cs.style({ fill: e.target.value })
            break
        }
      },
      clearObj (type) {
        cs.clear(type)
      },
      openIcon () {
        //
      },
      imgAdd (e) {
        const tar = e.target.files[0]
        const fr = fileReader(tar, {
          readAsDataURL: true,
          onload (event) {
            loadingImg(fr.result).then((res) => {
              createElement('img', {
                src: fr.result,
                callback (el) {
                  cs.create('Image', el, {
                    top: 20,
                    left: 20,
                    width: res.width,
                    height: res.height
                  })
                }
              })
            })
          }
        })
      },
      save () {
        cs.save('#canvas', 'node.png')
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
    padding: 8px 12px;
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
  .operating_area .icon-lajitong {
    font-size: 16px;
  }
  .menu {
    position: fixed;
    left: 12px;
    top: 50%;
    align-items: flex-start;
    transform: translateY(-50%);
    border: 1px solid #DCDCDC;
  }
  .menu .iconfont {
    padding: 6px 8px;
    font-size: 24px;
    background-color: #F4F3F4;
    cursor: pointer;
    border-bottom: 1px solid #DCDCDC;
  }
  .menu .iconfont:last-child {
    border-bottom: 0;
  }
  .menu .file {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .draw {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #DCDCDC;
    background: url(../common/tb.png);
  }
</style>

