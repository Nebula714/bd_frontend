<style lang="less" src="./cart1.less" scoped></style>
<template>
<div class="all">
  <div class="page-order">
    <div class="tour">
      <!--<a @click="goback" class="tour1"><img src="./back.png" style="height: 26px;width: 20px"></a>-->
      <p>待支付的订单</p>
      <!--<el-button type="text" class="tour2" @click="open"><i class="btn"></i></el-button>-->
      <a href="javascript:;" class="tour2"><i class="btn"></i></a>
    </div>
  </div>
  <div class="footing">
    <ul>
      <!--<li class="li5"><input type="checkbox" id="checkbox" value="1" @click="check" />全选</li>-->
      <li class="li6">合计：<span class="red">￥{{this.totalPrice}}</span></li>
      <li class="li7"><el-button type="text" @click="pay">结算</el-button></li>
    </ul>
  </div>
  <div class="t">
  <div class="spxz">
  <div class="table">
    <ul>
      <!--<h1 @click="demo(store)">点击</h1>-->
      <li v-for="store in Goods()">
        <!--<h1>点击</h1>-->
        <div class="check"><input type="checkbox" class="checkbox" @click="choose(store)"/></div>
        <h1 class="store">商家:{{store.store_id}}</h1>
        <ul class="inner">
          <li v-for="item in store.commodities" class="inner">
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
    <footer-nav></footer-nav>
</div>
</template>

<script>
import footerNav from '../common/footerNav/footer_nav'
import Axios from 'axios'
import qs from 'qs'
const baseURL = 'http://10.136.87.229:9090'
export default {
  name: 'cart',
  data () {
    return {
        selectedGoods: [],
        payGoods: [],
        totalPrice: 0,
        payorder: []
    }
  },
  created() {
    Axios.get(baseURL + '/order/queryUO?customer_id=' + sessionStorage.getItem('user')).then((res)=>{
      console.log('cart')
      console.log(res.data)
      this.selectedGoods=res.data
      console.log(this.selectedGoods[0].commodities)
    })
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    Goods(){
      console.log(this.selectedGoods)
      return this.selectedGoods;
    },
    choose(store){
      var paygood = {}
      console.log('check')
      store.commodities.forEach(item => {
        paygood.number=item.number
        paygood.price=item.commodity.price
        this.payGoods.push(paygood)
        this.totalPrice=this.totalPrice+paygood.price*paygood.number
      });
      //paygood.id=id
      //paygood.price=price
      //paygood.number=number
      //this.payGoods.push(paygood)
      //this.totalPrice=this.totalPrice+paygood.price*paygood.number
      //console.log(this.totalPrice)
      //console.log(this.payGoods)
      this.payorder.push(store.order_id)
      console.log(this.payorder)
    },
    pay(){
      this.$confirm('确认支付?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '支付成功!'
          });
          console.log('s')
          //console.log(qs.stringfy(payorder))
          /*var url=''
          url= url + 'user=' + sessionStorage.getItem('user')
          this.payorder.forEach(order => {
            console.log(order)
            url=url+'&order_id='+String(order)
          });*/
          let param = new FormData();
          let Obj= JSON.stringify(this.payorder)
          param.append('customer_id',sessionStorage.getItem('user'))
          param.append('string',Obj);
          let config={
            headers: {
              "Content-Type": "multipart/form-data"
            },
          }
          Axios.post(baseURL+'/order/settle',param,config).then((res)=>{
          //Axios.get(baseURL+'/order/settle?customer_id='+sessionStorage.getItem('user')+'&string='+Obj).then((res)=>{
            console.log(res)
          })
          // console.log(JSON.stringify(this.payorder))
          /*Axios.get(baseURL+'/order/settle?',{
            params:{
              daan: JSON.stringify(payorder)
            }
          }).then((res)=>{

          })*/
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消支付'
          });
          console.log('f')
        });
    },
    open () {
      this.$confirm('是否清空购物车?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
         
        //  this.$axios({
        //         url: '/api/api/v1/cart',
        //         method: 'post',
        //         }) .then(function (response) {
        //             console.log(response);
        //             this.selectedGoods=null;
        //             this.$message({
        //                 type:'info',
        //                 message:'删除成功！'
        //             })
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });     
                   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    demo(pa){
      console.log('demo')
      console.log(pa)
    }
  },
  components: {
    footerNav
  }
}
</script>
