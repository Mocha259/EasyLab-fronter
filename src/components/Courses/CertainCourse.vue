<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }"             >首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Courses-Manage' }"   >课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-container>
        <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :router="true"
        >
            <el-submenu index="Course">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>课程导航</span>
                </template>
                <el-menu-item index="Course-Infomations">课程信息</el-menu-item>
                <el-menu-item index="Course-Documents"  >课程文件</el-menu-item>
                <el-menu-item index="Course-Students"   >课程人员</el-menu-item>
                <el-menu-item index="Course-Assignment" >课程作业</el-menu-item>
                <el-menu-item index="Course-Labs"       >课程实验</el-menu-item>
            </el-submenu>
        </el-menu> -->
        <div class="course-header">
            <el-menu class="el-menu-demo" mode="horizontal"  :router="true">
                <el-menu-item index="Course-Info"           >课程信息</el-menu-item>
                <el-menu-item index="Course-Documents"      >课程文件</el-menu-item>
                <el-menu-item index="Course-Labs"           >课程实验</el-menu-item>
                <el-menu-item index="Course-Students"       >课程人员</el-menu-item>
                <el-menu-item index="Course-Assignments"    >课程作业</el-menu-item>
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
            courseName: '',
        }
    },
    methods: {
        toFile() {
            this.$router.push('/FileManagement')
        }
    },
    mounted() {
        
    },
})
</script>

<style lang="less" scoped>
.el-menu {
    position: absolute;
    top: 13.5%;
    left: 11%;
    margin-left: 20px;;
    // width: 8%;
    // width: 170px;
    background-color: rgb(248, 248, 246);
    border-radius: 5%;
}


.course-header {
    margin-bottom: 20px;
    position: absolute;
    top: 90px;
    left: 600px;
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
    width: 1440px;
    background-color: rgb(248, 248, 246);
    border-radius: 2%;
}

</style>

