<template>
  <div class="menu">
    <div v-on:click="target('shape')" data-tips="添加图形" class="iconfont icon-graph-copy tips_hover" style="font-weight: 900;"><b></b></div>
    <div v-on:click="target('text')" data-tips="添加文字" class="iconfont icon-tianjiawenben tips_hover"><b></b></div>
    <div v-on:click="target('image')" data-tips="添加图片" class="iconfont icon-tianjiatupian tips_hover">
      <b></b>
      <input ref="file" class="file" type="file" name="file" v-on:change="imgFile" /> <!--accept="image/gif"-->
    </div>

    <div v-on:click="target('expression')" data-tips="添加表情包" class="iconfont icon-icon_face_off tips_hover"><b></b></div>
    <div data-tips="调整背景色" class="iconfont tips_hover">
      <input class="color" ref="color" type="color" name="color" value="#ffffff" v-on:change="target('color')" />
      <b></b>
    </div>
    <div v-on:click="target('clear')" data-tips="清除画布" class="iconfont icon-lajitong1 tips_hover"><b></b></div>
    <div @click="test" class="test">测试</div>
  </div>
</template>

<script>
  import { fileReader, loadingImg } from '@common/util'
  import loading from '@common/loading'
  import canvas from '@common/canvas'

  export default {
    props: {
      dialogOpen: Function
    },
    methods: {
      target (name) {
        if (name === 'color') {
          canvas.setBgColor(this.$refs.color.value)
        } else if (name === 'clear') {
          canvas.clear('all')
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
    align-items: flex-start;
    text-align: center;
    transform: translateY(-50%);
    border: 1px solid #DCDCDC;
  }
  .menu .iconfont {
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
    left: -100px;
    top: -100px;
    opacity: 0;
    cursor: pointer;
  }
  .menu .color {
    width: 32px;
    height: 32px;
  }
</style>
