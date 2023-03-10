// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import API from './router/API'
import VueCookies from 'vue-cookies'
import qs from 'qs'
import moment from 'moment'

Vue.prototype.API = API.server
// Axios.defaults.baseURL = API.baseURL

Vue.config.productionTip = false

Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(ElementUI)
Vue.use(ViewUI)
Vue.use(VueCookies)
