<template>
  <div class="expression">
    <div class="flex">
      <div class="expression_menu" :class="{'expression_menu_active': menuActive === v}" @click="menuTab(v)" v-for="v in menu">{{ v }}</div>
    </div>
    <div class="flex flex_start">
      <div class="expression_item">
        <div :class="{ 'expression_item_active': itemActive === v }" v-for="v in item" @click="itemTag(v)">{{ v }}</div>
      </div>
      <div class="expression_img flex1">
        <div class="fleximg">1
        </div>
        <div class="fleximg">2
        </div>
        <div class="fleximg">3
        </div>
        <div class="fleximg">4
        </div>
        <div class="fleximg">5
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { menu, item } from '@api/resource'

  export default {
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
    methods: {
      menuTab (v) {
        this.menuActive = v
        this.item = window.Object.keys(item[v])
        if (this.itemActive === '') {
          this.itemActive = this.item[0]
          this.img = item[v][this.itemActive]
        }
      },
      itemTag (v) {
        this.itemActive = v
      },
      mainTag () {
        const i1 = this.menuActive
        const i2 = this.itemActive
        this.img = item[i1][i2]
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
    line-height: 38px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }
  .expression_menu_active {
    font-weight: 900;
  }
  .expression_item {
    width: 80px;
    line-height: 30px;
  }
  .expression_item div {
    text-align: center;
    border-right: 1px solid #ddd;
    cursor: pointer;
  }
  .expression_item_active {
    background-color: #fff;
  }
  .expression_img {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: flex-start;*/
    /*align-items: flex-start;*/
  }
  .expression_img .fleximg {
    flex: 0 0 50%;
    background-color: #ddd;
  }
</style>