import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['../components/login/login.vue'], resolve) // 懒加载
    },
    {
      path: '/home',
      name: 'Home',
      component: (resolve) => require(['../components/home/home.vue'], resolve) // 懒加载
    },
    {
      path: '/review',
      name: 'review',
      component: (resolve) => require(['../components/review/review.vue'], resolve)
    },
    {
      path: '/order',
      name: 'Order',
      component: (resolve) => require(['../components/cart/cart1.vue'], resolve)
    },
    {
      path: '/profile',
      name: 'Profile',
      component: (resolve) => require(['../components/profile/profile.vue'], resolve)
    },
    {
      path: '/shop',
      name: 'Shop',
      component: (resolve) => require(['../components/shop/shop.vue'], resolve)
    }
  ]
})
