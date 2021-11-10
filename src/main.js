import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
// import VScroll from './components/vscroll'

import axios from 'axios'
import qs from 'qs'
//配置请求的根路径
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/291656'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false
// Vue.use(VScroll)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
