<template>


    <div class="CoursesInfoContainer">


        <el-empty v-if="count == 0" description="没有您参与的课程"></el-empty>
        
        <div v-else-if="count>0" v-for="(item, idx) in curCoursePage" :key="idx" class="container">
            
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{item.course_name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" index="Course-Info" @click="getIntoCourse(idx)">进入课程>></el-button>
                </div>
                <!-- 课程信息描述 -->
                <div class="description">
                    <!-- 图片展示 -->
                    <div class="leftCard" style="float: left; width: 40%; border-right-color: blue; top: 0px">
                        <el-image
                        style="width: 250px; height: 140px"
                        :src="item.coverage"
                        fit="fit">
                        </el-image>
                    </div>
                    <!-- 课程信息 -->
                    <div class="rightCard" style="float: right; width: 60%;">
                        <div style="margin-bottom: 10px">课程简介：{{item.course_introduction}}</div>
                        <div style="margin-bottom: 10px">开课时间：{{item.create_time}}</div>
                        <div style="margin-bottom: 10px">选修人数：{{item.student_count}}</div>
                        <div v-if="item.is_open">开课状态：<el-tag type="success">开课中</el-tag></div>
                        <div v-else>开课状态：<el-tag type="danger">已结课</el-tag></div>
                    </div>
                </div>
            </el-card>
        </div>
        
        <el-pagination v-if="count > 0"
        @current-change="handleCurrentChange"
        small
        layout="prev, pager, next"
        :page-count="pageNum"
        class="page">
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
        courseName: '',
        courseIntro: '',
        headers: {
          token: window.sessionStorage.getItem("token")
        },
        fileList: [], //开设课程时要上传的文件

      }
    },
    methods: {
        getIntoCourse(idx) {
            var cur_idx = (this.curPage - 1) * 3 + idx
            console.log(this.courseList[cur_idx])
            this.IntoCertainCourse = true
            this.$router.push({
                path: '/StuCertainCourse',
                query: {
                    course_id: this.courseList[cur_idx].course_id
                }
            })
        },

        //处理页面切换
        handleCurrentChange(newPage) {
            this.curPage = newPage
            var courseToShow = 3
            if((this.curPage * 3) > this.count){
                courseToShow = (this.curPage * 3) - this.count + 1
            }
            
            this.curCoursePage = this.courseList.slice((this.curPage-1)*3, (this.curPage-1)*3+courseToShow)
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
        },

    },
    mounted() {
        //自动请求数据，初始化页面相关的数据
        let self = this
         var config = {
            method: 'get',
            url: '/course/getAllCourse',
            headers: {
                'token': window.sessionStorage.getItem("token")
            }
        }
        this.$http(config)
        .then(function (response) {
            console.log(response.data)
            if(response.data.success && response.data.data.courseList.length > 0){
                self.courseList = response.data.data.courseList             //所有课程保存至courseList
                console.log(response.data.data.courseList)
                self.count = self.courseList.length            //保存课程数量
                console.log('sdsdf',self.courseList)
                if(self.count % 3 == 0){
                    self.pageNum = Math.floor(self.count / 3)
                }else{
                    self.pageNum = Math.floor(self.count / 3) + 1
                }
                console.log('sdsdf----1',self.pageNum)
                var courseToShow = 3
                if((self.curPage * 3) > self.count){
                    courseToShow = (self.curPage * 3 ) - self.count + 1
                }
                console.log('sdsdf----2',courseToShow)
                self.curCoursePage = self.courseList.slice((self.curPage-1)*3, (self.curPage-1)*3+courseToShow)
                 console.log('sdsdf----5',self.curCoursePage)
                // console.log(1)
            }else{
                console.log('获取课程失败')
            }
        })
        .catch(function (error) {
        //     console.log(error.response);
        });    
    }
  }
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
        clear: both
    }
    
    .page {
        position: absolute;
        left: 50%;
    }
</style>