<template>
    <el-container class="home-container">

        <!-- 头部区域 -->
        <el-header>
            <!-- easyLab图标区 -->
            <img src="../assets/icon.png" style="height: 100px; width: 350px; margin-top: -20px">

            <el-dropdown @command="handleCommand" :hide-on-click="false">
                <span class="el-dropdown-link">
                    田同轩(1950081)<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                    <el-dropdown-item class="el-icon-s-custom">  个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout" class="el-icon-unlock" >  退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>

        <!-- 页面主体区域 -->
        <el-container class="main-container">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">

                <div class="toggle-button" @click="toggleCollapse">
                    |||
                </div>

                 <el-menu text-color="#fff" active-text-color="#ffd04b"
                    :unique-opened="true" :collapse="isCollapse"
                    :collapse-transition="false" :router="true">

                    <el-submenu index="Users">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span style="color:#778899;">个人信息</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="Users-Info" style="color:#778899;">我的信息</el-menu-item>
                            <el-menu-item index="Users-Manage" style="color:#778899;">账户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="Courses">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span style="color:#778899;">课程管理</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="Courses-Teach" style="color:#778899;">我开设的课程</el-menu-item>
                            <el-menu-item index="Courses-Manage" style="color:#778899;">我管理的课程</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span style="color:#778899;">实验管理</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="1-1" style="color:#778899;">我的信息</el-menu-item>
                            <el-menu-item index="1-2" style="color:#778899;">账户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>


                    <el-submenu index="4">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span style="color:#778899;">个人信息</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <el-menu-item index="1-1" style="color:#778899;">我的信息</el-menu-item>
                            <el-menu-item index="1-2" style="color:#778899;">账户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>


                </el-menu>
            </el-aside>


            <!-- 右侧内容主体区 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            nowDate: "", // 当前日期
            isCollapse: false
        };
    },
    methods: {
        // 退出返回登录页面
        logout(){
            //清空token
            window.sessionStorage.clear();
            //重定向
            this.$router.push('/Login')
        },
        handleCommand(command) {
            if(command == 'logout')
                {
                     window.sessionStorage.clear();
                     this.$message.success('退出成功！')
                    //重定向
                    this.$router.push('/Login')
                }
        },
        // 处理头像加载错误
         errorHandler() {
        return true
        },

        //获取当前系统时间
        currentTime() {
            setInterval(this.formatDate, 500);
        },

        formatDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let week = date.getDay(); // 星期
            let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
            let hour = date.getHours(); // 时
            hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
            let minute = date.getMinutes(); // 分
            minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
            let second = date.getSeconds(); // 秒
            second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
            this.nowDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        },
        // 折叠左侧菜单
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        }

    },

    mounted() {
        this.currentTime()
    }
}
</script>



<style lang="less" scoped>


    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

    .el-dropdown {
        margin-left: 1100px;
        vertical-align: top;
        margin-top: 20px;
        width: 150px;
        height: 20px;
        // padding-left: 1100px;

    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-dropdown-menu {
        // vertical-align: top;
        // top: 0px;
        margin-top: -20px;
        width: 130px

        // z-index: 999;
    }

    .div-icon img {
        padding-left: -100px;
        margin-top: -25px;
        height: 60px;
        width: 100px;
        z-index: -999;
    }


    .home-container {
        // width: 1707px;
        width: 100%;
        height: 100%
    }

    .el-header {
        // background-color: #77DDFF;
        border-bottom:double;
        border-bottom-color: #00BBFF;
        border-bottom-style: groove;
        border-bottom-width:2px;
    }



    .toggle-button {
        background: #00BBFF;
        font-size: 10px;
        line-height: 24px;
        color: #EAEDF1;
        text-align: center;
        letter-spacing: 0.2ems;
        cursor: pointer;
    }

    .el-menu-item {
        padding-top: 0px;
    }

    .el-main {
        height: 100%;
        background-color: #EAEDF1
    }
</style>
