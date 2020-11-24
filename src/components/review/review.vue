<style lang="less" src="./review.less" scoped></style>
<template>
  <div class="page-discover">
    <div class="page-order">
      <div class="tour">
        <!--<a @click="goback" class="tour1"><img src="./back.png" style="height: 26px;width: 20px"></a>-->
        <h1 class="title">已完成订单</h1>
        <!--<el-button type="text" class="tour2" @click="open"><i class="btn"></i></el-button>-->
        <!--<a href="javascript:;" class="tour2"><i class="btn"></i></a>-->
      </div>
    </div>
    <div class="t">
      <div class="spxz">
        <div class="table">
          <ul>
      <!--<h1 @click="demo(store)">点击</h1>-->
            <li v-for="store in Goods()">
        <!--<h1>点击</h1>-->
              <!--<div class="check"><input type="checkbox" class="checkbox" @click="choose(store)"/></div>-->
              <h1 class="store">商家:{{store.store_id}}</h1>
              <ul class="inner">
                <li v-for="(item,index) in store.commodities" :key="index" class="inner">
                  <div class="content">
            <!--<h1 @click="demo(item)">点击!!!</h1>-->
            <!--<div class="li1"><input type="checkbox" :checked="item.is_selected" @click="choose(item.commodity.id,item.commodity.price,item.number)"  name="box"/></div>-->
                  <div class="li2"><img src="F:\study大三\db\my-project\static\images\slider-pic\slider-pic11.jpeg"  style="width: 60px;height: 60px"/></div>
                  <div class="li3">
                    <div class="title">
                      <span>{{item.commodity.name}}</span>
                    </div>
                    <div class="one">
                      <span>￥{{item.commodity.price}}</span>
                    </div>
                    <div class="number">
                      <span>数量：{{item.number}}件</span>
                    </div>
                    <div class="comment">
                      <el-button type="primary" plain size="medium" @click.native="show1(store.order_id)">评价商品</el-button>
                      <div>
                      <addcomment :food1="store.order_id" :addOrUpdateVisible="addOrUpdateVisible1" @changeShow="showAddOrUpdate1" ref="addOrUpdateRef"></addcomment>
                      </div>
                      <br>
                      <br>
                      <el-button type="success" plain size="medium" @click="show2">投诉商品</el-button>
                      <complaint :food2="store" :addOrUpdateVisible="addOrUpdateVisible2" @changeShow="showAddOrUpdate2" ref="addOrUpdateRef"></complaint>
                    </div>
                  </div>
                </div>
            <!--<li class="li4">数量：{{item.number}}件</li>-->
            <!-- v-model="num" -->
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 底部的固定导航栏 -->
    <Footer-nav></Footer-nav>
  </div>
</template>

<script>
import FooterNav from '../common/footerNav/footer_nav'
import Axios from 'axios'
import addcomment from './addcomment'
import complaint from './complaint'
const baseURL = 'http://10.136.87.229:9090'
export default {
  name: 'review',
  data () {
    return {
      selectedGoods: [],
      addOrUpdateVisible1: false,
      addOrUpdateVisible2: false,
    }
  },
  created() {
    Axios.get(baseURL + '/order/querySO?customer_id=' + sessionStorage.getItem('user')).then((res)=>{
      console.log('review')
      console.log(res.data)
      this.selectedGoods=res.data
      //console.log(this.selectedGoods[0].commodities)
    })
 },
  mounted () {
  },
  computed: {
  },
  methods: {
    Goods(){
      // console.log(this.selectedGoods)
      return this.selectedGoods;
    },
    show1(pa){
      console.log('show1')
      console.log(pa)
      this.addOrUpdateVisible1=true
    },
    show2(){
      this.addOrUpdateVisible2=true
    },
    showAddOrUpdate1 (data) {
      if (data === 'false') {
        this.addOrUpdateVisible1 = false
      } else {
        this.addOrUpdateVisible1 = true
      }
    },
    showAddOrUpdate2 (data) {
      if (data === 'false') {
        this.addOrUpdateVisible2 = false
      } else {
        this.addOrUpdateVisible2 = true
      }
    }
  },
  components: {
    FooterNav, addcomment,complaint
  }
}
</script>
