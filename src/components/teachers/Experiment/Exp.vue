<template>
  <div>
    <div>
      <div style="float: left; width: 30%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }"             >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Courses-Manage' }"   >课程管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Courses-Info', query: {course_info: course_info}}">{{course_info.course_name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{experiment.exp_id}}</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      
      <div class="lab-header" style="float: right; width: 60%; margin-top: -20px">
                <el-menu class="el-menu-demo" mode="horizontal"  :router="true" style="width: 200px">
                    <el-menu-item index="Lab-Info" :route="{ path: 'Lab-Info', query: { course_id: course_info.course_id, experiment_id: experiment.experiment_id } }">实验简介</el-menu-item>
                    <el-menu-item index="Lab-Report" :route="{ path: 'Lab-Report', query: { course_id: course_info.course_id, experiment_id: experiment.experiment_id} }">实验报告</el-menu-item>
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
      course_info: {},          /// 该实验所属的课程的信息,         
      experiment: {}
    }
  },
  methods: {
    getCourseInfo() {
      this.course_info = this.$route.query.course_info
      console.log(this.course_info.course_name + '-' + this.course_info.course_id)
    },
    getExperimentInfo(){
          let self = this
            var config = {
                method: 'get',
                url: '/experiment/findByExperimentId/'+this.$route.query.experiment_id,
                headers: {
                    'token': window.sessionStorage.getItem("token"),
                }
            }
            this.$http(config)
            .then(function (response) {
                if(response.data.success){
                  self.experiment=response.data.data.experiment
                }else{
                    self.$message.error('实验信息获取失败！')   
                }
            })
            .catch(function (error) {
                console.log('实验信息获取失败');
            });    
    }
  },
  mounted() {
    this.getCourseInfo()
    this.getExperimentInfo()
  }
}
</script>

<style lang="less" scoped>

</style>
