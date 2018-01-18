<template>
  <div class="expression" v-show="state === 'expression'">
    <div class="flex">
      <div class="expression_menu" :class="{'expression_menu_active': menuActive === v}" @click="menuTab(v)" v-for="v in menu">{{ v }}</div>
    </div>
    <div class="flex flex_start">
      <div class="expression_item">
        <div class="expression_item_height" :class="{ 'expression_item_active': itemActive === v }" v-for="v in item" @click="itemTag(v)">{{ v }}</div>
      </div>
      <div class="expression_img flex1" id="expression_img">
        <div v-for="v in img" class="fleximg">
          <img @click="addImg(v)" :src="v">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //  http://jsfiddle.net/softvar/Rvxq5/
  import { menu, item } from '@api/resource'
  import canvas from '@common/canvas'

  export default {
    props: {
      state: String
    },
    data () {
      return {
        menu,
        menuActive: '',
        item: [],
        itemActive: '',
        img: []
      }
    },
    created () {
      const _menu = this.$route.query.menu
      this.menuTab(_menu || this.menu[0])
    },
    mounted () {
      canvas.dragEvent()
    },
    methods: {
      menuTab (v) {
        this.item = window.Object.keys(item[v])
        if (this.menuActive === v) {
          //
        } else {
          this.menuActive = v
          this.itemTag(this.item[0])
        }
        if (this.itemActive === '') {
          this.itemTag(this.item[0])
        }
      },
      itemTag (v) {
        this.itemActive = v
        this.mainTag()
      },
      mainTag () {
        const i1 = this.menuActive
        const i2 = this.itemActive
        const i3 = item[i1][i2]
        const img = []
        for (let i = 0, len = i3.length; i < len; i++) {
          img.unshift('/resources/' + i1 + '/' + i2 + '/' + i3[i])
        }
        this.img = img
      },
      addImg (v) {
        canvas.clickAddImg(v)
      }
    }
  }
</script>

<style>
  .expression .flex_start {
    align-items: flex-start;
  }
  .expression_menu {
    flex: 1;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }
  .expression_menu_active {
    font-weight: 900;
  }
  .expression_item, .expression_img {
    overflow-y: auto;
    width: 80px;
    height: calc(100vh - 90px);
  }
  .expression_item::-webkit-scrollbar { width: 0; }
  .expression_img::-webkit-scrollbar { width: 0; }
  .expression_item .expression_item_height {
    text-align: center;
    border-right: 1px solid #ddd;
    cursor: pointer;
    line-height: 40px;
  }
  .expression_item_active {
    background-color: #fff;
  }
  .expression_img {
    flex-wrap: wrap;
    background-color: #fff;
    box-sizing: border-box;
  }
  .expression_img .fleximg {
    display: inline-block;
    width: 50%;
    padding: 4%;
    box-sizing: border-box;
  }
  .expression_img img {
    cursor: pointer;
    width: 100%;
    transition: all .3s;
  }
  .expression_img img:hover {
    opacity: .6;
  }
  .cloneImg {
    opacity: .5;
    position: absolute;
    box-shadow: 1px 1px 5px #ddd;
  }
</style>