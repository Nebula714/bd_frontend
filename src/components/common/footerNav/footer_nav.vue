<style lang="less" src="./footer_nav.less" scoped></style>
<template>
  <div class="footer_nav">
    <router-link to="/home">
      <i class="icon i-home"></i>
      <span class="text">首页</span>
    </router-link>
    <router-link to="/review">
      <i class="icon i-discover"></i>
      <span class="text">评价</span>
    </router-link>
    <router-link to="/order">
      <i class="icon i-order"></i>
      <span class="text">订单</span>
    </router-link>
    <div>
      <i class="icon i-my" @click="gotoprofile"></i>
      <span class="text" @click="gotoprofile">我的</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {}
  },
  methods: {
    gotoprofile(){
      if(sessionStorage.getItem('identity')==='user'){
        this.$router.push({path: 'profile'})
      }
      else {
        this.$router.push({path: 'storeprofile'})
      }
    }
  }
}
</script>
