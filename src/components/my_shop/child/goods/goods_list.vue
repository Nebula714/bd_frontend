<style lang="less" src="./goods_list.less" scoped></style>
<template>
    <ul>
        <li v-for="item in goods ">
            <div class="line-wrapper">
                <div class="logo">
                    <img src="/static/images/slider-pic/slider-pic4.jpeg">
                </div>
                <div class="name">
                    <h3>{{item.name}}</h3>
                </div>
                <div class="price">
                    <span>{{item.price}}</span>
                </div>
            </div>
            <div class="content">
            <div class="description">
                <span>菜品描述 {{item.description}}</span>
            </div>
            <div class="cartcontrol-wrapper">
                <!-- 父组件可以在使用子组件的地方直接用 v-on (或@) 来监听子组件触发的事件。 -->
                <cartcontrol @add="addFood" :food="food"></cartcontrol>
            </div>
            </div>
        </li>
    </ul>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
  name: 'goodsList',
  props: ['goods'],
  components: {
    cartcontrol
  },
  data () {
    return {
      showThePage: false
    }
  },
  computed: {
    selectFoods () {
      let foods = []
      /* this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      }) */
      this.goods.forEach((good) => {
        if (good.count) {
          foods.push(good)
        }
      })
      return foods
    }
  },
  methods: {
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
  }
}
</script>
<style scoped>
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom: 0.32rem;
        }
</style>
