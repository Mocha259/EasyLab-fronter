<template>


    <div class="CoursesInfoContainer">

        <div v-if="IntoCertainCourse">
            <router-view></router-view>
        </div>

        <el-empty v-if="count == 0" description="没有您管理的课程"></el-empty>
        
        <div v-else-if="count>0" v-for="(item, idx) in curCoursePage" :key="idx" class="container">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" index="Course-Info" @click="getIntoCourse">进入课程</el-button>
                </div>
                <!-- 课程信息描述 -->
                <div class="description">
                    <!-- 图片展示 -->
                    <div class="leftCard" style="float: left; width: 40%; border-right-color: blue; top: 0px">
                        <el-image
                        style="width: 250px; height: 140px"
                        :src="url"
                        fit="fit">
                        </el-image>
                    </div>
                    <!-- 课程信息 -->
                    <div class="rightCard" style="float: right; width: 60%;">
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        
        <el-pagination
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
          url: '../../assets/carousel03.jpg',
          IntoCertainCourse: false,
      }
    },
    methods: {
        getIntoCourse() {
            // this.$router.pop('/Course-Manage')
            this.IntoCertainCourse = true
            this.$router.push('/Courses-Info')
        },

        //处理页面切换
        handleCurrentChange(newPage) {
            this.curPage = newPage
            var courseToShow = 3
            if((this.curPage * 3) > this.count){
                courseToShow = (this.curPage * 3) - this.count + 1
            }
            
            this.curCoursePage = this.courseList.slice((this.curPage-1)*3, (this.curPage-1)*3+courseToShow)
        }
    },
    mounted() {
        //自动请求数据，初始化页面相关的数据
        let self = this
        this.$http.post('/getCourse', window.sessionStorage.getItem('token')).then(function(res){
        // console.log(res.data)
        self.courseList = res.data.Courses             //所有课程保存至courseList中
        self.count = self.courseList.length            //保存课程数量
        if(self.count % 3 == 0){
            self.pageNum = Math.floor(self.count / 3)
        }else{
            self.pageNum = Math.floor(self.count / 3) + 1
        }

        var courseToShow = 3
        if((self.curPage * 3) > self.count){
            courseToShow = (self.curPage * 3 ) - count + 1
        }
        self.curCoursePage = self.courseList.slice((self.curPage-1)*3, (self.curPage-1)*3+courseToShow)
      }).catch(
          function(res){
            console.log(res)
          }
      )
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