<template>
  <div v-show="state==='img'" class="img_area">

    <div class="start flex bb">
      <div>灰度</div>
      <div class="flex1"></div>
      <div class="flex">
        <label class="fillet bg br">
          <span>平均</span>
          <input class="color_input" @click="filter($event, 0)" value="average" type="radio" name="gray" />
        </label>

        <label class="fillet bg br" style="margin: 0 6px;">
          <span>暗</span>
          <input class="color_input" @click="filter($event, 0)" value="luminosity"  type="radio" name="gray">
        </label>

        <label class="fillet bg br">
          <span>亮</span>
          <input class="color_input" @click="filter($event, 0)" value="lightness"  type="radio" name="gray">
        </label>
      </div>
    </div>

  </div>
</template>

<script>
  import canvas from '@common/canvas'

  export default {
    props: {
      state: {
        type: String,
        required: true
      }
    },
    methods: {
      filter (e, n) {
        const name = e.target.value
        if (!canvas.filter) {
          canvas.filter = name
          e.target.checked = true
          canvas.applyFilter(n, true)
        } else if (canvas.filter === name) {
          canvas.filter = ''
          e.target.checked = false
          // canvas.applyFilter(n, false)
        } else {
          canvas.filter = ''
          const el = this.$el.querySelectorAll('.color_input')
          for (let i = 0, len = el.length; i < len; i++) {
            el[i].checked = false // removeAttribute("checked")
          }
          e.target.checked = true
          // canvas.applyFilter(n, true)
        }
      }
    }
  }
</script>

<style>
  .img_area {

  }
  .img_area .fillet {
    padding: 0 4px;
    border-radius: 3px;
  }
</style>
