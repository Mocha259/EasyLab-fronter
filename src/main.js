import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
import { NoticeBar } from 'vue-easy-notice-bar'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import echarts from 'echarts'
// import store from './router/index.js'

import axios from 'axios'
import qs from 'qs'
Vue.use(NoticeBar);
Vue.use(ViewUI)
// Vue.use(E)
//配置请求的根路径
// axios.defaults.baseURL = 'http://192.168.43.215:8080/easyLab'
// axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/291656'
axios.defaults.baseURL  = 'http://49.235.232.7:8888/easyLab'
// axios.defaults.baseURL  = 'http://localhost:89/easyLab'
Vue.prototype.$http     = axios
Vue.prototype.$qs       = qs
Vue.prototype.$echarts  = echarts
Vue.config.productionTip = false
// Vue.use(VScroll)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
