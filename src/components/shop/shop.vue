<style lang="less" src="./shop.less" scoped></style>
<template>
<div>
  <div class="shop-wrapper">
    <s-header :seller="shopinfo"></s-header>
    <div class="tab">
      <div class="tab-item" @click="showContent='goods'">
        <span :class="{'active': showContent === 'goods'}">商品</span>
      </div>
      <div class="tab-item" @click="showContent='ratings'">
        <span :class="{'active': showContent === 'ratings'}">评论</span>
      </div>
      <div class="tab-item" @click="showContent='seller'">
        <span :class="{'active': showContent === 'seller'}">商家</span>
      </div>
    </div>
    <s-goods :seller="shop" v-show="showContent === 'goods'"></s-goods>
    <s-ratings :seller="shop" v-show="showContent === 'ratings'"></s-ratings>
    <s-seller :seller="shop" v-show="showContent === 'seller'"></s-seller>
  </div>
  <footer-nav></footer-nav>
</div>
</template>
<script>
  import Header from './child/shopHeader/shop_header.vue'
  import Goods from './child/goods/goods2.vue'
  import Ratings from './child/ratings/ratings.vue'
  import Seller from './child/seller/seller.vue'
  import footerNav from '../common/footerNav/footer_nav'
  export default {
    name: 'shop',
    data () {
      return {
        songList: null,
        shopid: null,
        shopinfo: null,
        showThePath: true,
        showContent: 'goods' // 默认显示商品列表
      }
    },
    created () {
      console.log('create')
      this.shopinfo = this.$route.query.para
      this.shopid = this.shopinfo.id
    },
    computed: {
      shop () {
        // 通过id找到store中对应店铺信息
        console.log('shop')
        // this.shopinfo = this.$route.query.para
        // console.log(this.shopinfo)
        // this.shopid = this.$route.query.id
        // this.shopid = this.shopinfo.id
        console.log('shopid:' + this.shopid)
        // return this.shopid
        // this.shopinfo = this.$store.getters.getShopInfo[this.$route.query.id]
        // console.log('shopinfo')
        return this.shopid
        // return this.$store.getters.getShopInfo[this.$route.query.id]
      },
      shopinfo () {
        // this.shopinfo = this.$route.query.para
        console.log('return shopinfo')
        console.log(this.shopinfo)
        return this.shopinfo
      }
    },
    mounted () {
      console.log(this.showContent)
    },
    components: {
      's-header': Header,
      's-goods': Goods,
      's-ratings': Ratings,
      's-seller': Seller,
      footerNav
    }
  }
</script>
