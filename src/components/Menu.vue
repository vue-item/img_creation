<template>
  <div class="menu">
    <div v-on:click="target('brush')" data-tips="画笔工具" class="box tips_hover" style="font-weight: 900;">
      <i class="iconfont icon-bijiben"></i>
      <b></b>
    </div>
    <div v-on:click="target('shape')" data-tips="添加图形" class="box tips_hover" style="font-weight: 900;">
      <i class="iconfont icon-graph-copy"></i>
      <b></b>
    </div>
    <div v-on:click="target('text')" data-tips="添加文字" class="box tips_hover">
      <i class="iconfont icon-tianjiawenben"></i>
      <b></b>
    </div>
    <div v-on:click="target('image')" data-tips="添加图片" class="box tips_hover">
      <i class="iconfont icon-tianjiatupian"></i>
      <b></b>
      <input ref="file" class="file" type="file" name="file" v-on:change="imgFile" />
    </div>
    <div v-on:click="target('expression')" data-tips="添加表情包" class="box tips_hover">
      <i class="iconfont icon-icon_face_off"></i>
      <b></b>
    </div>
    <div class="box">
      <button class="color color-input"></button>
      <div @click="openColor" data-tips="调整背景色" style="border: 0;" class="pm tips_hover"><b></b></div>
    </div>
    <div v-on:click="target('save')" data-tips="生成图片" class="box tips_hover">
      <i class="iconfont icon-Save"></i>
      <b></b>
    </div>
    <div v-on:click="target('clear')" data-tips="清除画布" class="box tips_hover">
      <i class="iconfont icon-lajitong1"></i>
      <b></b>
    </div>
    <div @click="test" class="test">测试</div>
  </div>
</template>

<script>
  const Huebee = require('huebee')
  let huebee = ''

  import { Confirm } from '@common/confirm'
  import { fileReader, loadingImg } from '@common/util'
  import loading from '@common/loading'
  import canvas from '@common/canvas'

  export default {
    props: {
      dialogOpen: Function
    },
    mounted () {
      // accept="image/gif"
      huebee = new Huebee('.color-input', {
        saturations: 2,
        setText: false,
        setBGColor: true,
        customColors: ['#19F', '#E5A628', 'darkgray', 'hsl(210, 90%, 55%)']
      })
      huebee.on('change', (val) => {
        canvas.setBgColor(val)
      })
    },
    methods: {
      openColor () {
        huebee.open()
      },
      target (name) {
        canvas.blur()
        if (name === 'clear') {
          const len = canvas.getAllObject()
          if (len <= 0) {
            Toast.top('画布没啥东西')
          } else {
            Confirm({
              title: '确定清除画布吗',
              callback: function (type) {
                if (type === 'ok') {
                  canvas.clear('all')
                }
              }
            })
          }
        } else if (name === 'save') {
          canvas.save()
        } else {
          this.dialogOpen(name)
        }
      },
      imgFile (e) {
        loading.show()
        canvas.blur()
        const self = this
        const tar = e.target.files[0]
        fileReader(tar, {
          readAsDataURL: true,
          onload (d) {
            loadingImg(d).then((res) => {
              self.$refs.file.value = ''
              canvas.fromURL(res)
              loading.hide()
            })
          }
        })
      },
      test (e) {
        canvas.preView()
      }
    }
  }
</script>

<style>
  .menu {
    position: fixed;
    left: 12px;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
    border: 1px solid #DCDCDC;
    background-color: #fff;
  }
  .menu .iconfont {
    line-height: 46px;
    font-size: 26px;
    background-color: #fff;
  }
  .menu .box {
    width: 46px;
    height: 46px;
    cursor: pointer;
    border-bottom: 1px solid #DCDCDC;
  }
  .menu .iconfont:last-child {
    border-bottom: 0;
  }
  .menu .file {
    position: absolute;
    left: -1000px;
    opacity: 0;
    cursor: pointer;
  }
  .menu .color {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    margin-left: 7px;
    margin-top: 7px;
    outline: 1px solid #ddd;
  }
  .menu .huebee.is-static-open {
    position: absolute;
  }
  .menu .huebee__container {
    position: absolute;
    left: 48px;
    top: -48px;
    z-index: 1;
  }
  .menu .pm {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
</style>
