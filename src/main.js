// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import './assets/theme/C_489D89/index.css'
import App from './App'
import router from './router'
import '@/utils/request'
import UTIL from '@/const'
import 'default-passive-events'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.UTIL = UTIL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
