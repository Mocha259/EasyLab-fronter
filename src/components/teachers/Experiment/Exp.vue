<template>
  <div>
    <div>
      <div style="float: left; width: 30%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }"             >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Courses-Manage' }"   >课程管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Courses-Info', query: {course_id: this.course.course_id}}"   >{{course.course_id}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{experiment.exp_id}}</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      
      <div class="lab-header" style="float: right; width: 60%; margin-top: -20px">
                <el-menu class="el-menu-demo" mode="horizontal"  :router="true" style="width: 200px">
                    <el-menu-item index="Lab-Info" :route="{ path: 'Lab-Info', query: { course_id: course.course_id, exp_id: experiment.exp_id } }">实验简介</el-menu-item>
                    <el-menu-item index="Lab-Report" :route="{ path: 'Lab-Report', query: { course_id: course.course_id, exp_id: experiment.exp_id} }">实验报告</el-menu-item>
                </el-menu>
      </div>
    </div><br>
    <div style="">
      <el-contaier>
          <div>
              <el-main>
                  <router-view></router-view>
              </el-main>
          </div>
      </el-contaier>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {             /// 该实验所属的课程的信息
        course_id: '',      /// 课程id
        course_name: '11',  /// 课程名称
      },            
      experiment: {
        exp_id:   '',
        exp_name: '',
        start_time: '',
        end_time: ''
      }
    }
  },
  methods: {
    getCourseInfo() {
      this.course.course_id = this.$route.query.course_id
      console.log(this.course.course_id)
    }
  },
  mounted() {
    this.getCourseInfo()
  }
}
</script>

<style lang="less" scoped>

</style>
