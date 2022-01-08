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
              <el-button type="danger" round @click="changeCourseStatus(false)">关闭课程</el-button>
            </div>
            <div v-else style="font-size: 24px; margin-bottom: 10px">
              <el-tag type="danger" style="margin-right: 480px;">已结课</el-tag>
              <el-button type="success" round @click="changeCourseStatus(true)">开放课程</el-button>
            </div>
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
    /// 修改课程状态
    changeCourseStatus(status) {
      var that=this;
      var data=new FormData();
      data.append('course_id',this.course_info.course_id);
      data.append('state',status);
      this.$http({
        method:'post',
        url:'/course/changeCourseState',
        data:data,
        headers:{
          'token':window.sessionStorage.getItem('token')
        }
      }).then((response)=>{
          if(response.data.success){
            that.$message.success("修改成功");
            that.getCourse(that.course_info.course_id);
          }else{
            this.$message.error("遭遇了不可抗力,请稍后重试！")
          }
      }).catch(error=>{
       this.$message.error("遭遇了不可抗力,请稍后重试！")
      })
    },
    getCourse(course_id){
       var that=this;
      this.$http({
        method:'get',
        url:'/course/getCourse/'+that.course_info.course_id,
        headers:{
          'token':window.sessionStorage.getItem('token')
        }
      }).then((response)=>{
          if(response.data.success){
            that.course_info.course_state=response.data.data.course.is_open;
          }else{
            console.log("刷新失败")
          }
      }).catch(error=>{
       console.log("刷新失败")
      })
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