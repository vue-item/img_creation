<template>
  <div v-show="state==='text'" class="text_area">
    <textarea v-model="text" @input="changeEvent($event, 'text')" ref="textarea" class="text bb f16" placeholder="文本编辑区" maxlength="250" rows="1" tabindex="0"></textarea>

    <div class="start flex bb">
      <div class="flex1"></div>

      <div class="flex flex_pd" ref="colorPar">
        <div id="fontColor" class="flex color_box br" style="margin-right: 12px;">
          <span class="c9 f10">字体</span>
          <div ref="font" class="text_color"></div>
          <input @input="changeEvent($event, 'fill')" class="color_input input-font" type="text" name="color">
          <div @click="open($event, 'font')" class="text_event"></div>
          <i class="iconfont icon-jiantou f8"></i>
        </div>

        <div id="bgColor" class="flex color_box br">
          <span class="c9 f10">背景</span>
          <div ref="bg"  class="text_color"></div>
          <input @input="changeEvent($event, 'textBackgroundColor')" class="color_input input-bg" type="color" name="color">
          <div @click="open($event, 'bg')" class="text_event"></div>
          <i class="iconfont icon-jiantou f8"></i>
        </div>
      </div>
    </div>

    <div class="start flex bb">
      <div>字体</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <div class="flist">
          <div>
            <select class="select" @change="changeFont">
              <option v-for="v in list" :value="v.family">{{ v.name }}</option>
            </select>
            <i class="iconfont icon-jiantou flist_icon f10"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="start flex bb">
      <div>修饰</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <button @click="changeEvent($event, 'solid')" class="iconfont icon-jiacu f12"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'italic')" class="iconfont icon-xieti"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'overline')" class="iconfont icon-overline"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'linethrough')" class="iconfont icon-line_through"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'underline')" class="iconfont icon-xiahuaxian"></button>
      </div>
    </div>

    <div class="start flex bb">
      <div>操作</div>
      <div class="flex1"></div>
      <div class="flex br bg flex2">
        <button @click="clear('only')" class="iconfont icon-lajitong f16 flex1"></button>
        <div class="hr"></div>
        <button @click="copy" class="iconfont icon-fuzhi f16 flex1"></button>
      </div>
    </div>

    <div class="start flex bb">
      <div>大小</div>
      <div class="flex1"></div>
      <div class="flex br bg flex2">
        <button @click="changeEvent($event, 'small')" class="iconfont icon-A f10 flex1"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'big')" class="iconfont icon-A f16 flex1"></button>
      </div>
    </div>

    <div class="start flex bb">
      <div>层级</div>
      <div class="flex1"></div>
      <div class="flex br bg flex2">
        <button @click="changeEvent($event, 'bringForward')" class="iconfont icon-shangyiyiceng1 f16 flex1"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'sendBackwards')" class="iconfont icon-xiayiyiceng2 f16 flex1"></button>
      </div>
    </div>

    <div class="start flex bb">
      <div>翻转</div>
      <div class="flex1"></div>
      <div class="flex br bg flex2">
        <button @click="changeEvent($event, 'flipX')" class="iconfont icon-chuizhifanzhuan f16 flex1"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'flipY')" class="iconfont icon-shuipingfanzhuan f16 flex1" ></button>
      </div>
    </div>

    <div class="start flex bb">
      <div>透明度</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <input type="range" name="opacity" min="0" max="10" value="10" @input="changeEvent($event, 'opacity')" />
      </div>
    </div>

    <div class="start flex bb">
      <div>倾斜x</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <input type="range" name="skewX" min="0" max="80" value="0" @input="changeEvent($event, 'skewX')" />
      </div>
    </div>

    <div class="start flex bb">
      <div>倾斜y</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <input type="range" name="skewY" min="0" max="40" value="0" @input="changeEvent($event, 'skewY')" />
      </div>
    </div>

    <div class="start flex bb">
      <div>缩放</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <input type="range" name="scale" value="1" min="0.1" max="3" step="0.1" @input="changeEvent($event, 'scale')" />
      </div>
    </div>

    <div class="start flex bb">
      <div>角度</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <input type="range" name="angle" value="0" min="0" max="360" @input="changeEvent($event, 'angle')" />
      </div>
    </div>

    <div class="start">
      <div class="title mb">对齐方式</div>
      <div class="flex mb bg br">
        <button @click="changeEvent($event, 'right')" class="iconfont flex1 icon-youduiqi f12"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'center')"  class="iconfont flex1 icon-duiqi-shuiping f12"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'left')"  class="iconfont flex1 icon-zuoduiqi_icon f12"></button>
      </div>
      <div class="flex bg br">
        <button @click="changeEvent($event, 'top')" class="iconfont flex1 icon-duiqi-shang f12"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'vertical')" class="iconfont flex1 icon-duiqi-chuizhi f12"></button>
        <div class="hr"></div>
        <button @click="changeEvent($event, 'bottom')" class="iconfont flex1 icon-duiqi-xia f12"></button>
      </div>
    </div>
  </div>
</template>

<script>
  import { colorConfig } from '@api/data'
  import canvas from '@common/canvas'
  import { checkPlatform } from '@common/util'
  import { font } from '@api/data'
  const Huebee = require('huebee')
  let _huebee = ''
  let _huebeeBg = ''

  export default {
    props: {
      changeEvent: Function,
      text: String,
      state: String
    },
    data () {
      return {
        list: []
      }
    },
    created () {
      const os = checkPlatform()
      this.list = font[os]
    },
    mounted () {
      _huebeeBg = new Huebee('.input-bg', colorConfig)
      _huebee = new Huebee('.input-font', colorConfig)
      _huebee.on('change', (val) => {
        this.$refs.font.style.background = val
        canvas.style({ fill: val })
      })
      _huebeeBg.on('change', (val) => {
        this.$refs.bg.style.background = val
        canvas.style({ backgroundColor: val })
      })
    },
    methods: {
      copy: canvas.clone.bind(canvas),
      clear: canvas.clear.bind(canvas),
      changeFont (e) {
        canvas.style({ fontFamily: e.target.value })
      },
      open (e, t) {
        const o = e.target.parentNode
        const c = this.$refs.colorPar.querySelectorAll('.flex')
        for (let i = 0, len = c.length; i < len; i++) {
          c[i].classList.remove('overbox')
        }
        o.classList.add('overbox')
        if (t === 'font') {
          _huebee.open()
        } else if (t === 'bg') {
          _huebeeBg.open()
        }
      }
    }
  }
</script>

<style>
  .text_area .text {
    width: 100%;
    min-height: 32px;
    max-height: 84px;
    line-height: 24px;
    padding: 8px;
    vertical-align: top;
    box-sizing: border-box;
    overflow-y: auto;
    outline: none;
    resize: vertical;
  }
  .text_area .flex .iconfont:before {
    padding: 0 8px;
  }
  .text_area .icon-jiantou {
    color: #999;
  }

  /* 颜色插件 */
  .text_area .flex_pd .iconfont:before {
    padding: 0;
  }
  .text_area .color_box {
    position: relative;
    padding: 0 4px 0 6px;
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
  }
  .text_area .color_input {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    opacity: 0;
  }
  .text_area .text_color {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 4px 4px;
    background-color: #666;
  }
  .text_area .text_event {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .text_area .bg {
    padding: 6px;
  }
  .text_area .overbox {
    overflow: inherit;
  }
  #fontColor .huebee__container {
    left: -68px;
  }
  #bgColor .huebee__container {
    left: -156px;
  }
</style>
