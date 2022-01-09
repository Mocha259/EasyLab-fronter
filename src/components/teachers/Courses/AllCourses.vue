<template>
  <div class="CoursesInfoContainer">
    <div v-if="IntoCertainCourse">
      <router-view></router-view>
    </div>
    <el-button
      style="position: relative; top: 20px; left: 20px"
      @click="dialogVisible = true"
      >开设课程</el-button
    >

    <el-dialog
      title="开设课程信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      课程名称：<el-input
        v-model="courseName"
        style="margin-bottom: 10px"
      ></el-input>
      课程简介：<el-input
        v-model="courseIntro"
        style="margin-bottom: 10px"
      ></el-input>

      <el-upload
        class="upload-demo"
        ref="upload"
        action="#"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="handleChange"
        style="height: 150px"
      >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
        <el-button type="primary" style="margin-bottom: 20px"
          >选取课程封面</el-button
        >
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="setUpCourse">提 交</el-button>
    </el-dialog>

    <el-empty v-if="count == 0" description="没有您管理的课程"></el-empty>

    <div
      v-else-if="count > 0"
      v-for="(item, idx) in curCoursePage"
      :key="idx"
      class="container"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>
            {{ item.course_name
            }}<el-button
              style="float: right; padding: 3px 0"
              type="text"
              index="Course-Info"
              @click="getIntoCourse(idx)"
              >进入课程>></el-button
            >
          </h3>
        </div>
        <!-- 课程信息描述 -->
        <div class="description;">
          <!-- 图片展示 -->
          <div
            class="leftCard"
            style="float: left; width: 40%; border-right-color: blue; top: 0px"
          >
            <el-image
              rel="prefetch"
              style="width: 250px; height: 140px"
              :src="item.coverage"
              fit="fit"
            >
            </el-image>
          </div>
          <!-- 课程信息 -->
          <div class="rightCard" style="float: right; width: 60%">
            <div
              style="
                margin-bottom: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 450px;
                overflow: hidden;
              "
            >
              课程简介：{{ item.course_introduction }}
            </div>
            <div style="margin-bottom: 10px">
              开课时间：{{ item.create_time }}
            </div>
            <div style="margin-bottom: 10px">
              选修人数：{{ item.student_count }}
            </div>
            <div v-if="item.is_open">
              开课状态：<el-tag type="success">开课中</el-tag>
            </div>
            <div v-else>开课状态：<el-tag type="danger">已结课</el-tag></div>
          </div>
        </div>
      </el-card>
    </div>

    <el-pagination
      v-if="count > 0"
      @current-change="handleCurrentChange"
      small
      layout="prev, pager, next"
      :page-count="pageNum"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      courseList: [],
      curCoursePage: [],
      curPage: 1,
      pageNum: 1,
      IntoCertainCourse: false,
      dialogVisible: false,
      courseName: "",
      courseIntro: "",
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      fileList: [], //开设课程时要上传的文件
    };
  },
  methods: {
    getIntoCourse(idx) {
      var cur_idx = (this.curPage - 1) * 3 + idx;
      console.log(this.courseList[cur_idx]);
      this.IntoCertainCourse = true;
      var course_info= {
            course_id: this.courseList[cur_idx].course_id,
            course_name: this.courseList[cur_idx].course_name,
            course_coverage: this.courseList[cur_idx].coverage,
            course_introduction: this.courseList[cur_idx].course_introduction,
            course_state: this.courseList[cur_idx].is_open,
          }
      this.$router.push({
        path: "/Courses-Info",
        query: {
          course_info:JSON.stringify(course_info)
        },
      });
    },

    //处理页面切换
    handleCurrentChange(newPage) {
      this.curPage = newPage;
      var courseToShow = 3;
      if (this.curPage * 3 > this.count) {
        courseToShow = this.curPage * 3 - this.count + 1;
      }

      this.curCoursePage = this.courseList.slice(
        (this.curPage - 1) * 3,
        (this.curPage - 1) * 3 + courseToShow
      );
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    setUpCourse() {
      let self = this;
      var data = new FormData();
      data.append("course_name", self.courseName);
      data.append("course_introduction", self.courseIntro);
      data.append("file", this.fileList[0].raw);
      var config = {
        method: "post",
        url: "/course/addCourse",
        data: data,
        headers: {
          token: window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      this.$http(config)
        .then(function (response) {
          console.log(response.data);
          if (response.data.success) {
            self.dialogVisible = false;
            self.$message.success('开课成功')
            // this.courseList.push({course_name})
            self.getAllAdviseCourse()
          } else {
            // alert('课程创建失败，请重试！')
            self.$message.error('开课失败')
          }
        })
        .catch(function (error) {
          console.log(error.response);
          self.$message.error('开课失败')
        });
    },
    getAllAdviseCourse() {
      //自动请求数据，初始化页面相关的数据
      let self = this;
      var data = new FormData();
      var config = {
        method: "get",
        url: "/course/findCourse/1",
        data: data,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      };
      this.$http(config)
        .then(function (response) {
          console.log(response.data);
          if (response.data.success && response.data.data.courses.length > 0) {
            self.courseList = response.data.data.courses; //所有课程保存至courseList中
            console.log(response.data.data.courses);
            self.count = self.courseList.length; //保存课程数量
            if (self.count % 3 == 0) {
              self.pageNum = Math.floor(self.count / 3);
            } else {
              self.pageNum = Math.floor(self.count / 3) + 1;
            }

            var courseToShow = 3;
            if (self.curPage * 3 > self.count) {
              courseToShow = self.curPage * 3 - self.count + 1;
            }
            self.curCoursePage = self.courseList.slice(
              (self.curPage - 1) * 3,
              (self.curPage - 1) * 3 + courseToShow
            );
            // console.log(1)
          } else {
            console.log("获取课程失败");
          }
        })
        .catch(function (error) {
          //     console.log(error.response);
        });
    },
  },
  mounted() {
    this.getAllAdviseCourse();
  },
};
</script>

<style  lang="less" scoped>
.CoursesInfoContainer {
  height: 80%;
}

.leftCard {
  margin-bottom: 10px;
}

.rightCard {
  margin-top: 7px;
}

.container {
  height: 270px;
  margin-top: 10px;
}

.el-card {
  width: 800px;
  position: absolute;
  left: 30%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.page {
  position: absolute;
  left: 50%;
}
</style>