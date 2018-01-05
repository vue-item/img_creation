<template>
  <div id="app">
    <router-view></router-view>
    <div class="header"></div>
<!--
    <div class="footer_record">
      <a class="footer_record_href" target="_blank" href="http://www.miitbeian.gov.cn">
        <img class="footer_record_logo" src="http://www.doutula.com/build/img/gab.png" />
        沪ICP备 15034960 号-5
      </a>
    </div> -->
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<style>
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0 2px 4px #ddd;
  }
  .footer_record {
    width: 100%;
    padding: 6px 0;
    text-align: center;
  }
  .footer_record_logo {
    vertical-align: top;
  }
  .footer_record_href {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    font-size: 13px;
    color: #999;
  }
  .footer_record_href:hover {
    color: #666;
    text-decoration: underline;
  }
</style>