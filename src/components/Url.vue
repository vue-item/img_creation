<template>
  <div class="url" style="top: 100vh" :class="{ 'url_active': show }">
    <div class="url_bg">
      <sup style="color: #666;">每次只能上传一张图片，上传的图片不超过10MB</sup>
      <div>
        <input id="url_input" class="url_input" type="text" name="text" placeholder="请帖入图片地址" />
      </div>
      <div class="url_box">
        <button class="url_btn url_gray_btn" @click="target">取消</button>
        <button class="url_btn" @click="target">确定</button>
      </div>
      <div class="iconfont icon-close2" @click="target"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: false,
      toggle: Function
    },
    mounted () {
      setTimeout(() => {
        this.$el.style.top = ''
      }, 400)
    },
    methods: {
      target () {
        const val = document.querySelector('#url_input').value.replace(/\s/g, '')
        this.toggle(val)
      }
    }
  }
</script>

<style>
  .url {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 100%;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(000, 000, 000, 0);
    transition: background-color .4s .2s;
    animation: .4s url_hide forwards;
  }
  /* 高度？ */
  .url .url_bg {
    position: relative;
    padding: 18px;
    transform: scale(.6);
    opacity: 0;
    background-color: #fff;
    border-radius: 5px;
    transition: all .3s;
    line-height: 36px;
  }
  .url .url_btn {
    flex: 1;
    height: 38px;
    font-size: 16px;
    color: #fff;
    border-radius: 3px;
    background-color: #3F7DED;
  }
  .url .url_gray_btn {
    margin-right: 12px;
    color: #666;
    background-color: #ddd;
  }
  .url .url_box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 12px;
  }
  .url .url_input {
    width: 70vw;
    max-width: 760px;
    padding: 6px 12px;
    height: 36px;
    font-size: 14px;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  .url.url_active {
    animation: .2s url_show forwards;
  }
  .url.url_active .url_bg {
    transform: scale(1);
    opacity: 1;
  }
  .url .iconfont {
    position: absolute;
    right: -15px;
    top: -15px;
    font-size: 30px;
    color: #333;
    cursor: pointer;
  }
  @keyframes url_hide {
    0% {
      left: 0;
      z-index: 100;
      background-color: rgba(000, 000, 000, .5);
    }
    99% {
      left: 0;
      z-index: 100;
      background-color: rgba(000, 000, 000, 0);
    }
    100% {
      left: 100vh;
    }
  }
  @keyframes url_show {
    0% {
      left: 0;
      z-index: 100;
      background-color: rgba(000, 000, 000, 0);
    }
    100% {
      left: 0;
      z-index: 100;
      background-color: rgba(000, 000, 000, .5);
    }
  }
</style>
