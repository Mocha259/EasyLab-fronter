import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    { path:'/', redirect: '/Login' },
    { path: '/Login', component: Login },
    { 
        path: '/Home', 
        component: Home, 
        redirect: '/Welcome',
        children:[
          { path: '/Welcome', component: Welcome },
          { path: '/1-1', component: Users}
        ] 
    },
    { path: '/Signup', component: Signup }

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
