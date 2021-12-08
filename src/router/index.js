import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// import Signup from '../components/Signup.vue'
import Activate from '../components/Activate.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users/Users.vue'
import AllCourses from '../components/Courses/AllCourses.vue'
import CertainCourse from '../components/Courses/CertainCourse.vue'
import FileManage from '../components/Courses/CourseInfo/FileManage.vue'
import StuManage from '../components/Courses/CourseInfo/StuManage.vue'
import LabManage from '../components/Courses/CourseInfo/LabManage.vue'
import InfoManage from '../components/Courses/CourseInfo/InfoManage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
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
          { path: '/Courses-Manage',
            component: AllCourses,
            children: []
          },
          { path: '/Courses-Info', 
            component: CertainCourse,
            children: [
              { path: '/Course-Documents',  component: FileManage },
              { path: '/Course-Students',   component: StuManage  },
              { path: '/Course-Labs',       component: LabManage  },
              { path: '/Course-Info',       component: InfoManage },
            ] 
          },

        ] 
    },
    { path: '/Activate', name: 'Activate', component: Activate }

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
