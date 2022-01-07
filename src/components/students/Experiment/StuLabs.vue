<template>
  <div>
    <div>
      <div style="float: left; width: 30%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/StuHome' }"             >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/StuAllCourses' }"   >我的课程</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/StuCourseLabs', query: {course_info: JSON.stringify(course_info)}}"   >课程实验</el-breadcrumb-item>
        <el-breadcrumb-item>{{experiment.exp_id}}</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      
      <div class="lab-header" style="float: right; width: 60%; margin-top: -20px">
                <el-menu class="el-menu-demo" mode="horizontal"  :router="true" style="width: 200px">
                    <el-menu-item index="StuLabInfo" :route="{ path: 'StuLabInfo', query: { course_id: course_info.course_id, exp_id: experiment.exp_id } }">实验简介</el-menu-item>
                    <el-menu-item index="StuLabReports" :route="{ path: 'StuLabReports', query: { course_id: course_info.course_id, exp_id: experiment.exp_id} }">实验报告</el-menu-item>
                </el-menu>
      </div>
    </div><br>
    <div style="">
      <el-container>
          <div>
              <el-main>
                  <router-view></router-view>
              </el-main>
          </div>
      </el-container>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      course_info: {
        course_id: "",
        course_name: "",
        course_state: true,
        course_cover:"",//加个默认图片
        course_intro:"",
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
      this.course_info = JSON.parse(this.$route.query.course_info)
    }
  },
  mounted() {
    this.getCourseInfo()
  }
}
</script>

<style lang="less" scoped>

</style>
