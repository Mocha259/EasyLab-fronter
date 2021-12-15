import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

import Activate from '../components/Activate.vue'

/// 以下是老师界面相关路由 ///
import Home from '../components/teachers/TeacherHome.vue'                           /// 老师登录后主页
import Welcome from '../components/teachers/Welcome.vue'                            /// 老师登陆后，信息公告页
import Users from '../components/teachers/Users/Users.vue'                          /// 老师登录后，个人信息页
import AllCourses from '../components/teachers/Courses/AllCourses.vue'              /// 老师登陆后，查看所有课程页
import CertainCourse from '../components/teachers/Courses/CertainCourse.vue'        /// 老师登录后，进入具体课程页
import InfoManage from '../components/teachers/Courses/CourseInfo/InfoManage.vue'   /// 进入课程后，查看课程信息页
import FileManage from '../components/teachers/Courses/CourseInfo/FileManage.vue'   /// 进入课程后，查看课程文件页
import StuManage from '../components/teachers/Courses/CourseInfo/StuManage.vue'     /// 进入课程后，查看课程人员页
import LabManage from '../components/teachers/Courses/CourseInfo/LabManage.vue'     /// 进入课程后，查看课程实验页
import Exp from '../components/teachers/Experiment/Exp.vue'
import LabInfo from '../components/teachers/Experiment/LabInfo.vue'
import LabReport from '../components/teachers/Experiment/LabReport.vue'
/// 以下是学生界面相关的路由
import StuHome from '../components/students/StudentHome.vue'
import StuWelcome from '../components/students/StuWelcome.vue'

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
          ],
          redirect: '/Course-Info'
        },
        { path: '/Experiment', name: 'Experiment', component: Exp,
          children: [
            { path: '/Lab-Info', name: 'Lab-Info', component:LabInfo },
            { path: '/Lab-Report', name: 'Lab-Report', component:LabReport },
          ]}
      ] 
    },
    { path: '/Activate', name: 'Activate', component: Activate },
    { path: '/StuHome', 
      name: 'StuHome', 
      component: StuHome,
      redirect: '/StuWelcome',
      children: [
        { path: '/StuWelcome', component: StuWelcome }
      ]
    }
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
