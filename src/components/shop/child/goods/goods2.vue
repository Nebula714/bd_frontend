<style lang="less" src="./goods2.less" scoped></style>
<template>
  <div class="goods-wrapper">
    <!-- 右侧食品列表 -->
    <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="food in tableData" class="food-item">
              <div class="pic">
                <img :src="food.photo">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <!--<div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>-->
                <div class="price">
                  <span class="now">{{food.price}}</span>
                  <!--<span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>-->
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- 父组件可以在使用子组件的地方直接用 v-on (或@) 来监听子组件触发的事件。 -->
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
    </div>
    <shopcart ref="shopcart" :store="this.seller" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script>
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
// import { findmenu } from '../../api/menu'
  import Axios from 'axios'
  const baseURL = 'http://10.136.207.156:9090'
  export default {
    props: ['seller'],
    data () {
      return {
        tableData: []
      }
    },
    created () {
      console.log('!!!!!')
      console.log(this.seller)
      Axios.get(baseURL + '/menu/get_food?store_id=' + this.seller).then((res) => {
        this.tableData = res.data
        console.log(res.data)
      })
    },
    computed: {
      selectFoods () {
        let foods = []
        this.tableData.forEach((good) => {
          if (good.count) {
            foods.push(good)
          }
        })
        return foods
      }
    },
    methods: {
      gettableData () {
        Axios.get(baseURL + '/menu/get_food?store_id=' + this.seller).then((res) => {
          this.tableData = []
          this.tableData = res.data
          console.log(res.data)
          console.log('success')
        })
      },
      /* getgoods(){
        const goods_data= findmenu()
        console.log(goods_data)
      }, */
      _drop (target) {
        // 异步执行下落动画 优化两个动画同时执行的卡顿
        this.$nextTick(() => {
          // 调用子组件shopcart的drop方法
          this.$refs.shopcart.drop(target)
        })
      },
      addFood (target) {
        // 执行小球下落动画
        this._drop(target)
      }
    },
    components: {
      shopcart, cartcontrol
    }
  }
</script>
