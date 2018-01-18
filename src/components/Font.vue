<template>
  <div class="flist">
    <div>
      <select class="select" @change="changeFont">
        <option v-for="v in list" :value="v.family">{{ v.name }}</option>
      </select>
      <i class="iconfont icon-jiantou flist_icon f10"></i>
    </div>
  </div>
</template>

<script>
  import canvas from '@common/canvas'
  import { checkPlatform } from '@common/util'
  import { font } from '@api/data'

  export default {
    data () {
      return {
        list: []
      }
    },
    beforeCreate () {

    },
    created () {
      const os = checkPlatform()
      this.list = font[os]
    },
    methods: {
      changeFont (e) {
        canvas.style({ fontFamily: e.target.value })
      }
    }
  }
</script>

<style>
  .flist {
    position: relative;
  }
  .flist_icon {
    position: absolute;
    right: -3px;
    top: 50%;
    margin-top: -5px;
    color: #999;
  }
  .select {
    outline: none;
    padding: 0 25px;
    -webkit-appearance: none;
    border: none;
  }
</style>
