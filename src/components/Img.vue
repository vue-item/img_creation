<template>
  <div v-show="state==='img'" class="img_area">

    <div class="start flex bb">
      <div>灰度</div>
      <div class="flex1"></div>
      <div class="flex" id="gray_flex">
        <label class="fillet bg br">
          <input class="color_input" @click="gray($event, 0)" value="average" type="radio">
          <span>平均</span>
        </label>

        <label class="fillet bg br" style="margin: 0 6px;">
          <input class="color_input" @click="gray($event, 0)" value="lightness"  type="radio">
          <span>暗</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="gray($event, 0)" value="luminosity"  type="radio">
          <span>亮</span>
        </label>
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

    <div class="start bb">
      <div class="flex flex_start">
        <label class="fillet flex1">
          <input class="color_input" @click="invert($event, 1)" type="checkbox">反转
        </label>

        <label class="fillet flex1">
          <input class="color_input" @click="convolute($event, 18)" type="checkbox">锐化
        </label>

        <label class="fillet flex1">
          <input class="color_input" @click="emboss($event, 18)" type="checkbox">浮雕
        </label>
      </div>
    </div>

    <div class="start mr bb">
      <div class="title mb">色彩过滤器</div>
      <div class="flex flex_start mb">
        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 2)" type="checkbox">
          <span>棕褐色</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 3)" type="checkbox">
          <span>黑白</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 4)" type="checkbox">
          <span>巧克力色</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 5)" type="checkbox">
          <span>老照片</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 6)" type="checkbox">
          <span>彩色胶片</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 7)" type="checkbox">
          <span>色彩鲜明</span>
        </label>

        <label class="fillet bg br">
          <input class="color_input" @click="invert($event, 8)" type="checkbox">
          <span>宝丽来</span>
        </label>
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="removeColor($event, 9)" type="checkbox" name="remove">删除颜色</label>
        <div class="flex1"></div>
        <input @input="inputChange($event, 9, 'color')" class="input_color" type="color" ref="removeColor" style="margin-left: 6px;">
      </div>
      <div class="flex flex_start bg br">
        <input type="range" @input="inputChange($event, 9, 'distance')" class="range_input" ref="removeVal" value="0.02" min="0" max="1" step="0.01">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="brightness($event, 10)" type="checkbox">亮度</label>
      </div>
      <div class="flex flex_start bg br">
        <input type="range" @input="inputChange($event, 10, 'brightness')" class="range_input" value="0.1" min="-1" max="1" step="0.003921" ref="brightness">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="gamma($event, 11)" type="checkbox">伽玛</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        红<input type="range" @input="gammaChange($event, 11, 0, 'gamma')" class="range_input flex1" value="1" min="0.2" max="2.2" step="0.003921" ref="red">
      </div>
      <div class="flex flex_start bg br pd mb">
        绿<input type="range" @input="gammaChange($event, 11, 1, 'gamma')" class="range_input flex1" value="1" min="0.2" max="2.2" step="0.003921" ref="green">
      </div>
      <div class="flex flex_start bg br pd mb">
        蓝<input type="range" @input="gammaChange($event, 11, 2, 'gamma')" class="range_input flex1" value="1" min="0.2" max="2.2" step="0.003921" ref="blue">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="contrast($event, 12)" type="checkbox">对比</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="contrastChange($event, 12, 'contrast')" class="range_input" value="0" min="-1" max="1" step="0.003921" ref="contrast">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="saturation($event, 13)" type="checkbox">饱和</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="saturationChange($event, 13, 'saturation')" class="range_input" value="0" min="-1" max="1" step="0.003921" ref="saturation">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="hueRotation($event, 14)" type="checkbox">色调</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="hueRotationChange($event, 14, 'rotation')" class="range_input" value="0" min="-1" max="2" step="0.002" ref="rotation">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="noise($event, 15)" type="checkbox">噪声</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="noiseChange($event, 15, 'noise')" class="range_input" value="100" min="0" max="1000" ref="noise">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @click="pixelate($event, 16)" type="checkbox">像素化</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="pixelateChange($event, 16, 'blocksize')" class="range_input" value="4" min="2" max="20" ref="pixelate">
      </div>
    </div>

    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @input="blur($event, 17)" type="checkbox">模糊</label>
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="blurChange($event, 17, 'blur')" class="range_input" value="0.1" min="0" max="1" step="0.01" ref="blur">
      </div>
    </div>
    <!--
    <div class="start bb">
      <div class="flex flex_start mb">
        <label><input class="color_input" @input="blend($event, 19)" type="checkbox">混合颜色</label>
        <div class="flex1"></div>
        <select @change="blendChange($event, 19, 'mode')" ref="blend_mode">
          <option selected="" value="add"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">加</font></font></option>
          <option value="diff"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">DIFF</font></font></option>
          <option value="subtract"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">减去</font></font></option>
          <option value="multiply"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">乘</font></font></option>
          <option value="screen"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">屏幕</font></font></option>
          <option value="lighten"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">减轻</font></font></option>
          <option value="darken"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">变暗</font></font></option>
          <option value="overlay"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">覆盖</font></font></option>
          <option value="exclusion"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">排除</font></font></option>
          <option value="tint"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">着色</font></font></option>
        </select>
        <div class="flex1"></div>
        <input type="color" @click="blendChange($event, 19, 'color')" ref="blend_color">
      </div>
      <div class="flex flex_start bg br pd mb">
        <input type="range" @input="blendChange($event, 19, 'alpha')" class="range_input" ref="blend_alpha">
      </div>
    </div>
    -->
    <!--
    <div class="flex bg br">
      <button @click="changeEvent($event, 'top')" class="iconfont flex1 icon-duiqi-shang f12"></button>
      <div class="hr"></div>
      <button @click="changeEvent($event, 'vertical')" class="iconfont flex1 icon-duiqi-chuizhi f12"></button>
      <div class="hr"></div>
      <button @click="changeEvent($event, 'bottom')" class="iconfont flex1 icon-duiqi-xia f12"></button>
    </div> -->

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
      copy: canvas.clone.bind(canvas),
      clear: canvas.clear.bind(canvas),
      gray (e, n) {
        const name = e.target.value
        if (!canvas.filter) {
          canvas.filter = name
          e.target.checked = true
          canvas.applyFilter(n, true)
          // canvas.applyFilterValue(n, 'mode', name)
        } else if (canvas.filter === name) {
          canvas.filter = null
          e.target.checked = false
          canvas.applyFilter(n, false)
        } else {
          canvas.filter = null
          const el = document.querySelector('#gray_flex .color_input')
          console.log(el.length)
          for (let i = 0, len = el.length; i < len; i++) {
            el[i].checked = false // removeAttribute("checked")
          }
          e.target.checked = true
          // canvas.applyFilter(n, true)
          canvas.applyFilterValue(n, 'mode', name)
        }
      },

      invert (e, n) {
        const tar = e.target
        canvas.applyFilter(n, tar.checked)
      },

      removeColor (e, n) {
        const tar = e.target
        const params = {}
        params['color'] = this.$refs.removeColor.value
        params['distance'] = this.$refs.removeVal.value
        canvas.applyFilter(n, tar.checked, params)
      },

      brightness (e, n) {
        const params = {
          brightness: parseInt(this.$refs.brightness.value)
        }
        canvas.applyFilter(n, e.target.checked, params)
      },

      gamma (e, n) {
        const v1 = this.$refs.red.value.replace(/\s/g, '')
        const v2 = this.$refs.green.value.replace(/\s/g, '')
        const v3 = this.$refs.blue.value.replace(/\s/g, '')
        canvas.applyFilter(n, e.target.checked, { gamma: [v1, v2, v3] })
      },

      gammaChange (e, n, i, t) {
        const obj = canvas.getFilter(n).gamma
        const val = parseInt(e.target.value)
        obj[i] = val
        canvas.applyFilterValue(n, t, obj)
      },

      contrast (e, n) {
        canvas.applyFilter(n, e.target.checked, { contrast: parseFloat(this.$refs.contrast.value) })
      },

      contrastChange (e, n, t) {
        canvas.applyFilterValue(n, t, parseFloat(e.target.value))
      },

      saturation (e, n) {
        canvas.applyFilter(n, e.target.checked, { saturation: parseFloat(this.$refs.saturation.value) })
      },

      saturationChange (e, n, t) {
        canvas.applyFilterValue(n, t, parseFloat(e.target.value))
      },

      hueRotation (e, n) {
        canvas.applyFilter(n, e.target.checked, { rotation: this.$refs.rotation.value })
      },

      hueRotationChange (e, n, t) {
        canvas.applyFilterValue(n, t, e.target.value)
      },

      noise (e, n) {
        canvas.applyFilter(n, e.target.checked, { noise: parseInt(this.$refs.noise.value) })
      },

      noiseChange (e, n, t) {
        canvas.applyFilterValue(n, t, parseInt(e.target.value, 10))
      },

      pixelate (e, n) {
        canvas.applyFilter(n, e.target.checked, { blocksize: parseInt(this.$refs.pixelate.value, 10) })
      },

      pixelateChange (e, n, t) {
        canvas.applyFilterValue(n, t, parseInt(e.target.value, 10))
      },
      /* 不糊立刻生效 */
      blur (e, n) {
        canvas.applyFilter(n, e.target.checked, { value: parseFloat(this.$refs.blur.value) })
      },

      blurChange (e, n, t) {
        canvas.applyFilterValue(n, t, parseFloat(e.target.value, 10))
      },

      convolute (e, n) {
        canvas.applyFilter(n, e.target.checked, { matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0] })
      },

      emboss (e, n) {
        canvas.applyFilter(n, e.target.checked, { matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1] })
      },

      blend (e, n) {
        canvas.applyFilter(n, e.target.checked, {
          color: this.$refs.blend_color.value,
          mode: this.$refs.blend_mode.value,
          alpha: this.$refs.blend_alpha.value
        })
      },

      blendChange (e, n, t) {
        canvas.applyFilterValue(n, t, e.target.value)
      },

      inputChange (e, n, t) {
        canvas.applyFilterValue(n, t, e.target.value)
      }
    }
  }
</script>

<style>
  .img_area .mr .fillet {
    margin-right: 6px;
    margin-bottom: 6px;
  }
  .img_area .fillet {
    padding: 0 4px;
    border-radius: 3px;
    order: 0;
  }
  .img_area .input_color {
    width: 36px;
    height: 24px;
    overflow: hidden;
  }
  .img_area .range_input {
    width: 100%;
    margin: 2px 8px;
    padding: 4px 0;
    box-sizing: border-box;
  }
  .img_area .pd {
    padding: 0 6px;
  }
</style>
