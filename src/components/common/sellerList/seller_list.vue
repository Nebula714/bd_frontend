<style lang="less" src="./seller_list.less" scoped></style>
<template>
  <ul>
    <li class="shop-item" v-for="item in sellers" @click="toDetail(item)">
      <div class="logo">
        <img :src="item.photo" style="width: 100px;height: 100px"/>
      </div>
      <div class="main">
        <section class="line-wrapper">
          <h3 class="shopname" :class="{'brand-sign': item.brand}">
            <span>{{item.name}}</span>
          </h3>
          <div class="address">
            <span>地址:{{item.address}}</span>
          </div>
          <div class="phone">
            <span>电话:{{item.phone}}</span>
          </div>
          <div class="supportWrap">
            <div class="supper" v-if="item.bao">
              <i>保</i>
            </div>
            <div class="supper" v-if="item.piao">
              <i>票</i>
            </div>
            <div class="supper" v-if="item.zhun">
              <i>准</i>
            </div>
          </div>
        </section>
        <section class="line-wrapper">
          <div class="rateWrap">
            <span>评分</span>
            <star :size="24" :score="item.score"></star>
            <span class="rate-score">{{item.score}}</span>
            <!--<span>月售{{item.sellCount}}单</span>-->
          </div>
          <div class="deliveryWrap">
            <span class="delivery">营业时间{{item.business_on}}-{{item.business_off}}</span>
            <!--<span class="delivery type"></span>-->
          </div>
        </section>
        <!--<section class="line-wrapper">
          <div class="moneylimit">
            <span class="split">￥{{item.minPrice}}起送</span>
            <span class="split">配送费￥{{item.deliveryPrice}}</span>
            <span>￥{{item.avgPrice}}/人</span>
          </div>
          <div class="timedistanceWrap">
            <span class="split">1.32km</span>
            <span class="timed">{{item.deliveryTime}}分钟</span>
          </div>
        </section>-->
      </div>
    </li>
  </ul>
</template>

<script>
import star from '../star/star'
export default {
  name: 'sellerList',
  props: ['sellers'],
  data () {
    return {
      showThePage: false // 是否展示当前页面
    }
  },
  methods: {
    toDetail (item) {
      // 跳转路由传递对象参数
      console.log('item')
      console.log(item)
      // var arr = JSON.stringify(item)
      // this.$router.push('/shop/' + encodeURIComponent(arr))
      this.$router.push({path: 'shop', query: {para: item}})
      // console.log('点击seller list item')
      // this.$router.push({path: 'shop', query: { id: item.id }, components: item, props: true})
    }
  },
  components: {
    star
  }
}
</script>

