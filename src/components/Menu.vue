<template>
  <div class="menu">
    <div v-on:click="target('shape')" class="iconfont icon-graph-copy" style="font-weight: 900;"></div>
    <div v-on:click="target('text')" class="iconfont icon-tianjiawenben"></div>
    <div v-on:click="target('image')" class="iconfont icon-tianjiatupian" style="position: relative;overflow: hidden;">
      <input ref="file" class="file" type="file" name="file" v-on:change="imgFile" accept="image/gif" />
    </div>
    <div class="iconfont">
      <input class="color" ref="color" type="color" name="color" value="#ffffff" v-on:change="target('color')" />
    </div>
    <div v-on:click="target('clear')" class="iconfont icon-lajitong1"></div>
  </div>
</template>

<script>
  import { fileReader, loadingImg } from '@common/util'
  import loading from '@common/loading'
  import canvas from '@common/canvas'

  export default {
    props: {
      open: Function
    },
    methods: {
      target (name) {
        if (name === 'color') {
          canvas.setBgColor(this.$refs.color.value)
        } else if (name === 'clear') {
          canvas.clear('all')
        } else {
          this.open(name)
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
</style>
