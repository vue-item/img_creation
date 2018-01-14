<template>
  <div @click="save" class="save_btn">
    <span class="iconfont icon-Save" style="font-size: 20px;"></span>
    <span style="padding-left: 12px;">保存图片</span>
  </div>
</template>

<script>
  import canvas from '@common/canvas'

  export default {
    methods: {
      save: canvas.save
    }
  }
</script>

<style>
  .save_btn {
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
    /*border-top: 1px solid #dcdcdc;*/
    cursor: pointer;
  }
</style>
