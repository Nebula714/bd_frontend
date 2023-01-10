<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import loading from './components/common/loading/loading'
  export default {
    name: 'app',
    provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true,
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      }
    },
    computed: {
      isLoading () {
        return this.$store.getters.getLoading
      }
    },
    components: {
      loading
    }
  }
</script>

<style lang="less">
  @import "style/index.less";
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
