<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StuCourses' }">我的课程</el-breadcrumb-item>
            <el-breadcrumb-item>{{course_info.course_name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-container>
            <div class="course-header">
                <el-menu class="el-menu-demo" mode="horizontal"  :router="true">
                    <el-menu-item index="StuCourseInfo" :route="{ path: 'StuCourseInfo', query: { course_info: this.$route.query.course_info } }">课程信息</el-menu-item>
                    <el-menu-item index="StuCourseFile" :route="{ path: 'StuCourseFile', query: { course_info: this.$route.query.course_info } }">课程文件</el-menu-item>
                    <el-menu-item index="StuCourseLabs" :route="{ path: 'StuCourseLabs', query: { course_info: this.$route.query.course_info } }">课程实验</el-menu-item>
                </el-menu>
            </div>

            <div>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </div>
        </el-container>
    </div>
</template>

<script>

export default({
    data(){
        return{
           course_info: {
            course_id: "",
            course_name: "",
            course_state: true,
            course_cover:"",
            course_intro:"",
      },
        }
    },
    methods: {
        toFile() {
            this.$router.push('/FileManagement')
        }
    },
    mounted() {
         this.course_info = JSON.parse(this.$route.query.course_info)
        console.log('stuCertainCourse',this.$route.query.course_info)
    },
})
</script>

<style lang="less" scoped>
.el-menu {
    position: absolute;
    top: 13.5%;
    left: 11%;
    margin-left: 20px;
    background-color: rgb(248, 248, 246);
    border-radius: 5%;
}

.course-header {
    margin-bottom: 20px;
    position: absolute;
    top: 90px;
    left: 500px;
    width: 600px
}

.el-dropdown-menu {
    width: 500px;
}

.el-main {
    position: absolute;
    top: 165px;
    left: 235px;
    height: 740px;
    width: 70%;
    background-color: rgb(248, 248, 246);
    border-radius: 2%;
}

</style>

