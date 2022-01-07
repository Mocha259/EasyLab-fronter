<template>
  <div>
    <h1>课程信息</h1>
    <div style="padding-left: 100px; margin-bottom: 10px; height: 280px">
      <div style="float: left; width: 30%; padding-top: 10px">
        <!-- 课程封面 -->
        <el-image
          :src="course_info.course_cover"
          :lazy="true"
          style="height: 270px"
        ></el-image>
      </div>
      <div style="float: right; width: 66%">
        <h1>{{ course_info.course_name }}</h1>
        <el-card shadow="always" style="width: 100%">
          <div style="font-size: 24px; margin-bottom: 10px">
            <span>课号：</span>{{ course_info.course_id }}
          </div>
          <div style="margin-bottom: 10px">{{ course_info.course_intro }}</div>
          <el-row>
            <!-- 课程状态 -->
            <el-col :span="4">
              <div v-if="course_info.course_state" style="font-size: 24px">
                <el-tag type="success" style="margin-right: 480px">开课中</el-tag>
              </div>
              <div v-else style="font-size: 24px; margin-bottom: 10px">
                <el-tag type="danger">已结课</el-tag>
              </div>
            </el-col>
            <!-- 签到次数 -->
            <el-col :span="4">
              <div style="font-size: 24px; margin-bottom: 10px; margin-top: 4px">
                <el-tooltip class="item" effect="light" content="签到次数" placement="bottom-start">
                  <span><i class="el-icon-date" style="margin-right:4px;"></i>{{ studentInfoInCourse.sign_num }}</span>
                </el-tooltip>
              </div>
            </el-col>
            <!-- 成绩 -->
            <el-col :span="4">
              <div style="font-size: 24px; margin-bottom: 10px; margin-top: 4px">
                <el-tooltip class="item" effect="light" content="成绩" placement="bottom-start">
                  <span><i class="el-icon-trophy" style="margin-right:4px;"></i>{{ studentInfoInCourse.score }}</span>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-show="studentInfoInCourse.is_sign" style="font-size: 24px">
                <el-button type="success" round @click="sign_up">点击签到</el-button>
              </div>
            </el-col>
              
          </el-row>
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
export default {
  data() {
    return {
      /// 该课程的所有信息
      course_info: {
        course_id: "",
        course_name: "",
        course_state: true,
        course_cover:"",//加个默认图片
        course_intro:"",
      },
      studentInfoInCourse: {
        sign_num: "",
        score: "",
        is_sign: ""
      },
    };
  },
  activated(){
    this.getCourseInfo()
  },
  methods: {
    /// 获取课程的所有信息，用于展示在课程信息页面
    getCourseInfo() {
      this.course_info = JSON.parse(this.$route.query.course_info);
      var that = this;
      var config = {
        method: "get",
        url: "/course/getStudentInfoInCourse/" + this.course_info.course_id,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      };
      this.$http(config)
        .then(function (response) {
          if (response.data.success) {
            that.studentInfoInCourse = response.data.data.studentInfoInCourse;
            console.log("here", response.data.data.studentInfoInCourse);
          } else {
            console.log("获取学生与课程的关联信息失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sign_up(){

    }
  },
  mounted() {
    this.getCourseInfo();
  },
};
</script>

<style lang="less" scoped>
</style>