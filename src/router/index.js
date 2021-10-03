import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    { path:'/', redirect: '/Login' },
    { path: '/Login', component: Login },
    { path: '/Home', component: Home }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {

  if(to.path === '/Login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/Login')
  next()
})

export default router
