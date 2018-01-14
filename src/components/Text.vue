<template>
  <div v-show="state==='text'" class="text_area">
    <textarea v-model="text" @input="changeEvent($event, 'text')" ref="textarea" class="text bb f16" placeholder="文本编辑区" maxlength="250" rows="1" tabindex="0"></textarea>

    <div class="start flex bb">
      <div>颜色</div>
      <div class="flex1"></div>

      <div class="flex flex_pd">
        <div class="flex color_box br" style="margin-right: 6px;">
          <span class="c9 f10">字体</span>
          <input class="color_input" @input="changeEvent($event, 'fill')" type="color" name="color">
          <i class="iconfont icon-jiantou f8"></i>
        </div>

        <div class="flex color_box br">
          <span class="c9 f10">背景</span>
          <input class="color_input" @input="changeEvent($event, 'textBackgroundColor')" type="color" name="color">
          <i class="iconfont icon-jiantou f8"></i>
        </div>
      </div>
    </div>

    <div class="start flex bb">
      <div>字体</div>
      <div class="flex1"></div>
      <div class="flex br bg">
        <view-font></view-font>
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
  import ViewFont from '@components/Font'
  import canvas from '@common/canvas'

  export default {
    props: {
      changeEvent: Function,
      text: String,
      state: String
    },
    components: {
      ViewFont
    },
    methods: {
      copy: canvas.clone.bind(canvas),
      clear: canvas.clear.bind(canvas)
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
  .text_area .flex_pd .iconfont:before {
    padding: 0;
  }
  .text_area .color_box {
    position: relative;
    padding: 0 4px 0 6px;
    border-radius: 3px;
    background: #fff;
  }
  .text_area .icon-jiantou {
    color: #999;
  }
  .text_area .color_input {
    overflow: hidden;
    width: 26px;
    height: 26px;
    border-radius: 3px;
  }
  .text_area .bg {
    padding: 6px;
  }
</style>
