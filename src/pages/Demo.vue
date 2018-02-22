<template>
  <div class="demo">
    111
  </div>
</template>

<script>
  import { fabric } from 'fabric'
  const log = console.log

  export default {
    data () {
      return {
        list: []
      }
    },
    created () {
      log(fabric)
    },
    methods: {

    }
  }
</script>

<style>
  .demo {
    margin-top: 100px;
  }
</style>
