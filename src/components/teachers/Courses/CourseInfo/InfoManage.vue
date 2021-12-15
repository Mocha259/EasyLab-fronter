<template>
    <div> 
      <h1>课程信息</h1>
      <div style="padding-left: 100px; margin-bottom: 10px; height: 280px">
        <div style="float: left; width: 30%; padding-top: 10px;">
          <!-- 这里放课程封面 -->
          <el-image :src="course_info.course_cover" style="height: 270px;"></el-image>
        </div>
        <div style="float: right; width: 66%; ">
          <h1>{{course_info.course_name}}</h1>
          <el-card shadow="always" style="width: 700px; ">
            <div style="font-size: 24px; margin-bottom: 10px"><span>课号：</span>{{course_info.course_id}}</div>
            <div style="margin-bottom: 10px">{{course_info.course_intro}}</div>
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
        course_id: '4012012',
        course_name: '编译原理',
        course_state: true,
        course_cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        course_intro: '编译原理是计算机专业的一门重要专业课，旨在介绍编译程序构造的一般原理和基本方法。内容包括语言和文法、词法分析、语法分析、语法制导翻译、中间代码生成、存储管理、代码优化和目标代码生成。 编译原理是计算机专业设置的一门重要的专业课程。编译原理课程是计算机相关专业学生的必修课程和高等学校培养计算机专业人才的基础及核心课程，同时也是计算机专业课程中最难及最挑战学习能力的课程之一。编译原理课程内容主要是原理性质，高度抽象。'
      },
      
    }
  },
  methods: {
    /// 结束课程
    endCourse() {
      console.log(this.$route.query.course_id)
      this.course_info.course_id = this.$route.query.course_id
      console.log('----function: endCourse()----')
      console.log('course_id: ' + this.course_info.course_id)
      var data = new FormData()
      // data.append()
      console.log('----end func: endCourse()----')
    },
    /// 获取课程的所有信息，用于展示在课程信息页面
    getCourseInfo() {
      console.log('function: getCourseInfo()')

      console.log('end func: getCourseInfo()')
    }
  },
  mounted() {
    this.getCourseInfo()
  },
  
})
</script>

<style lang="less" scoped>

</style>