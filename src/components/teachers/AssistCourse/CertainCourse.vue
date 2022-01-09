<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }"             >首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Courses-Manage' }"   >课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{course_info.course_name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-container>
            <div class="course-header" style="margin-left: 10%">
                <el-menu class="el-menu-demo" mode="horizontal"  :router="true">
                    <el-menu-item index="Course-Info" :route="{ path: 'AssistCourse-Info', query: { course_info: this.$route.query.course_info} }">课程信息</el-menu-item>
                    <el-menu-item index="Course-Documents" :route="{ path: 'AssistCourse-Documents', query: { course_info: this.$route.query.course_info } }">课程文件</el-menu-item>
                    <el-menu-item index="Course-Labs" :route="{ path: 'AssistCourse-Labs', query: { course_info:this.$route.query.course_info } }">课程实验</el-menu-item>
                    <!-- <el-menu-item index="Course-Students" :route="{ path: 'AssistCourse-Students', query: { course_info:this.$route.query.course_info } }">课程人员</el-menu-item> -->
                    <!-- <el-menu-item index="Course-Assignments" :route="{ path: 'AssistAttendance', query: { course_info: this.$route.query.course_info} }">课程考勤</el-menu-item> -->
                    <!-- <el-menu-item index="Course-Score" :route="{ path: 'AssistCourse-Score', query: { course_info: this.$route.query.course_info } }">课程成绩</el-menu-item> -->
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
    data() {
        return{
            course_info:{},
        }
    },
    methods: {
        toFile() {
            this.$router.push('/FileManagement')
        }
    },
    mounted() {
        this.course_info = JSON.parse(this.$route.query.course_info)
    },
})
</script>

<style lang="less" scoped>
.el-menu {
    position: absolute;
    top: 13.5%;
    left: 0%;
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
    background-color: rgb(255, 255, 255);
    border-radius: 2%;
}

</style>

