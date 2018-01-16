<template>
  <div class="shape" style="opacity: 0" :class="{'shape_active': show}" @click="target($event)">
    <div class="shape_flex">
      <div style="flex: 1;"></div>
      <div class="shape_box">
        <div class="shape_main">
          <div class="shape_item" v-for="v in list" @click="target($event, v)">
            <span class="shape_left">{{ v.text }}</span>
            <span class="shape_right"><i :style="{ 'font-size': v.iconsize }" :class="v.class"></i></span>
          </div>
        </div>
        <div v-show="cancel" class="shape_item shape_cancel" @click="target($event)">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: { // 列表
        default: [],
        required: true
      },
      cancel: { // 取消
        default: true,
        type: Boolean
      },
      show: false // 显示 隐藏
    },
    mounted () {
      setTimeout(() => {
        this.$el.style.opacity = ''
      }, 1000)
    },
    methods: {
      target (e, obj = {}) {
        this.$emit('toggle', obj)
        e.stopPropagation()
        e.preventDefault()
      }
    }
  }
</script>

<style>
  .shape {
    position: fixed;
    left: 0;
    top: 100vh;
    width: 100%;
    height: 100%;
    animation: .4s bg_hide forwards;
    pointer-events: none;
  }
  .shape .shape_flex {
    position: absolute;
    left: 0;
    top: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: top .4s;
  }
  .shape .shape_box {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
  }
  .shape .shape_main {
    overflow: hidden;
    margin-bottom: 12px;
    border-radius: 10px;
    background-color: #fff;
  }
  .shape .shape_item {
    height: 50px;
    line-height: 48px;
    padding: 0 4vw;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #DCDCDC;
  }
  .shape .shape_left {
    float: left;
  }
  .shape .shape_right {
    float: right;
  }
  .shape .shape_item:last-child {
    border-bottom: 0;
  }
  .shape .shape_cancel {
    border-radius: 10px;
    font-size: 18px;
    font-weight: 900;
    color: #3F7DED;
    background-color: #fff;
  }
  .shape.shape_active {
    z-index: 100;
    animation: .4s bg_show forwards;
    pointer-events: auto;
  }
  .shape.shape_active .shape_flex {
    top: 0;
  }
  @keyframes bg_hide {
    0% {
      top: 0;
      z-index: 100;
      background-color: rgba(000, 000, 000, .5);
    }
    99% {
      top: 0;
      z-index: 100;
      background-color: rgba(000, 000, 000, 0);
    }
    100% {
      top: 100vh;
    }
  }
  @keyframes bg_show {
    0% {
      top: 0;
      background-color: rgba(000, 000, 000, 0);
    }
    100% {
      top: 0;
      background-color: rgba(000, 000, 000, .5);
    }
  }
  .shape .shape_item:hover {

  }
  @media (min-width: 800px) {
    .shape .shape_flex {
      left: 50%;
      width: 800px;
      margin-left: -400px;
    }
  }
  @media (hover) {
    .shape .shape_item:hover {
      cursor: pointer;
    }
  }
</style>
