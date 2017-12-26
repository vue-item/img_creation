<template>
  <div class="container">
    <div v-for="v in list">
      {{ v }}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [1, 2, 3, 4]
      }
    },
    mounted () {
      this.list = [5, 6, 7, 8]
    }
  }
</script>

