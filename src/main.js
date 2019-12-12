import Vue from 'vue' //CDN 引入
import App from './App.vue'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import { Toast } from 'vant';
Vue.use(Toast)
Vue.use(VueClipboard)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
