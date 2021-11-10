import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// import Signup from '../components/Signup.vue'
import Activate from '../components/Activate.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users/Users.vue'
import Courses from '../components/Courses/Courses.vue'
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
          { path: '/Users-Info', component: Users},
          { path: '/Courses-Manage', component: Courses}
        ] 
    },
    { path: '/Activate', component: Activate }

  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {

  if(to.path === '/Login') return next()
  if(to.path === '/Activate') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/Login')
  next()
})

export default router
