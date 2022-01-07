<template>
    <div> 
      <h1>课程信息</h1>
      <div style="padding-left: 100px; margin-bottom: 10px; height: 280px">
        <div style="float: left; width: 30%; padding-top: 10px;">
          <!-- 这里放课程封面 -->
          <el-image rel="prefetch" :lazy="true" :src="course_info.course_coverage" style="height: 240px; width: 426px; margin-left: -100px" fit></el-image>
        </div>
        <div style="float: right; width: 66%; margin-top: -35px">
          <h1>{{course_info.course_name}}</h1>
          <el-card shadow="always" style="width: 700px; ">
            <div style="font-size: 24px; margin-bottom: 10px"><span>课号：</span>{{course_info.course_id}}</div>
            <div style="margin-bottom: 10px">{{course_info.course_introduction}}</div>
            <div v-if="course_info.course_state" style="font-size: 24px;">
              <el-tag type="success" style="margin-right: 480px;">开课中</el-tag>
              <el-button type="danger" round @click="endCourse">关闭课程</el-button>
            </div>
            <div v-else style="font-size: 24px; margin-bottom: 10px"><el-tag type="danger">已结课</el-tag></div>
          </el-card>
        </div>
      </div>
      <div style="margin-top: 50px"><el-divider></el-divider></div>
      <div>
        <h1>课程评论</h1>

      </div>
      
      <!-- <h2>课程评论</h2> -->
      
    </div>

</template>

<script>

export default ({
  data() {
    return{
      /// 该课程的所有信息
      course_info: {
      },
      
    }
  },
  methods: {
    /// 结束课程
    endCourse() {
      console.log('----function: endCourse()----')
  
      var data = new FormData()
      // data.append()
      console.log('----end func: endCourse()----')
    },
    /// 获取课程的所有信息，用于展示在课程信息页面
    getCourseInfo() {
      this.course_info = JSON.parse(this.$route.query.course_info)
      console.log('getCourseInfo',this.$route.query.course_info)
    }
  },
  mounted() {
    this.getCourseInfo()
  },
  
})
</script>

<style lang="less" scoped>

</style>