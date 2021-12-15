<template>
    <el-container class="home-container">

        <!-- 头部区域 -->
        <el-header>
            <!-- easyLab图标区 -->
            <div style="float: left; width: 40%">
                <img src="../../assets/icon.png" style="height: 120px; width: 380px; margin-top: -20px; z-index: 999">
            </div>
            
            <div style="float: right; width: 60%">
                <div style="float: left; ">
                    <!-- 消息通知 -->
                    <el-badge :value="12" class="item" style="margin-top: 20px; margin-left: 780px; ;">
                        <!-- <el-button size="small" type="info" icon="el-icon-message" circle>通知</el-button> -->
                        <el-button circle type="info" style="radius: 10px" icon="el-icon-message"></el-button>
                    </el-badge>
                </div>
               
               <div style="float: right; ; z-index: 999">
                   <el-dropdown @command="handleCommand" :hide-on-click="false" style="margin-top: 25px;">
                        <span class="el-dropdown-link">
                            {{userInfo.name}}({{userInfo.advisor_id}})<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                            <el-dropdown-item class="el-icon-s-custom" to="/Users-Info">  个人信息</el-dropdown-item>
                            <el-dropdown-item command="logout" class="el-icon-unlock" >  退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
               </div>
                
            </div>
           
        </el-header>

        <!-- 页面主体区域 -->
        <el-container class="main-container">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '75px' : '220px'" style="border-radius: 3px;">

                <div class="toggle-button" @click="toggleCollapse" :width="'200px'" 
                style="margin-top: 20px;margin-left: 20px ;border-radius: 5px !important; background: linear-gradient(rgb(88, 88, 88),rgb(43, 42, 42), rgb(20, 20, 20)); height: 30px; font-size: 20px">
                    |||
                </div>
                <div >
                 <el-menu text-color="#fff" active-text-color="#ffd04b"
                    :unique-opened="true" :collapse="isCollapse"
                    :collapse-transition="false" :router="true" 
                    style="margin-top: 10px; margin-left: 20px; border-radius: 5px !important"> 

                    <el-menu-item index="Welcome" style="color: #778899; font-size: 18px; width: 100%; border-top-right-radius: 5px; border-top-left-radius: 5px">
                        <i class="el-icon-bell" style="border-top-right-radius: 5px"></i>
                        <span slot="title">主页公告</span>
                    </el-menu-item>

                    <el-menu-item index="Users-Info" style="color: #778899; font-size: 18px; width: 100%;"> 
                        <i class="el-icon-user"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>

                    <el-menu-item index="Courses-Manage" style="color: #778899; font-size: 18px; width: 100%;">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">课程管理</span>
                    </el-menu-item>

                    <el-menu-item index="Lab-Manage" style="color: #778899; font-size: 18px; width: 100%;">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">实验管理</span>
                    </el-menu-item>

                    <el-menu-item index="Score-Manage" style="color: #778899; font-size: 18px; width: 100%;">
                        <i class="el-icon-postcard"></i>
                        <span slot="title">成绩管理</span>
                    </el-menu-item>


                    <el-menu-item index="fight" style="color: #778899; font-size: 18px; width: 100%; border-bottom-right-radius: 5px;border-bottom-left-radius: 5px">
                        <i class="el-icon-postcard"></i>
                        <span slot="title">对抗练习</span>
                    </el-menu-item>
                </el-menu>
                </div>

                <el-card style="width: 200px; height: 380px; margin-top: 45px; margin-left: 20px" shadow="always">
                    <clock style="margin-left: 5px"></clock>
                    <el-divider></el-divider>
                </el-card>
            </el-aside>

            <!-- 右侧内容主体区 -->
            <el-main>
                <router-view></router-view>
            </el-main>

            <el-aside style="background-color: transparent; width: 260px">
                <div style="background: linear-gradient(rgb(0, 0, 0), rgb(20, 20, 20), rgb(88, 88, 88)); height: 60%; width:100%; margin-top: 100px; border-radius: 5px; color: white">
                    <h1>Todo List</h1>
                </div>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
import Clock from 'vue-clock2';
export default {
    components: { Clock },
    data() {
        return {
            nowDate: "", // 当前日期
            isCollapse: false,
            space: '      ',
            userInfo: {},       /// 当前登录的老师的信息
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

        // 折叠左侧菜单
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        getUserInfo() {
            console.log('----function: getUserInfo----')
            this.$http({
            methods:'get',
            url: 'advisor/getCurrentAdvisor',
            headers: { 'token': window.sessionStorage.getItem("token"), },
            }).then((response) => {
                // console.log(response.data.data.advisor)
                this.userInfo = response.data.data.advisor
                
                // advisor_id: "1950081"
                // avatar: "http://192.168.243.1:8080/easyLab/static/advisor/avatar/7654321.jpg"
                // email: "3378681490@qq.com"
                // enable: true
                // gender: 1
                // introduction: null
                // name: "田同轩"
                // password: "123456"
                // phone: null
                // professional_title: null
                // console.log('----end func: getUserInfo----')
            }).catch((error) => {
                console.log(error)
                // console.log('----end func: getUserInfo----')
            })
            
        }
    },

    mounted() {
        this.currentTime()
        this.getUserInfo()
    }
}
</script>



<style lang="less" scoped>

.home-container {
    width: 1707px;
    height: 100%
}

.el-header {
    background: linear-gradient(rgb(0, 0, 0), rgb(20, 20, 20), rgb(88, 88, 88));
    border-bottom-color: rgb(241, 229, 229);
    border-bottom-width: 2px;
    height: 80px !important;
    .el-dropdown-link {
        cursor: pointer;
        color: rgb(247, 242, 242);
        font-size: 16px;
    }
}

.el-aside {
    width: 100px;
    border-width: 50px;
    border-top-color: #EAEDF1;
    height: 100%;
    // background: linear-gradient(rgb(0, 0, 0), rgb(39, 37, 37), rgb(61, 61, 61));
    overflow-x: hidden;
    overflow-y: hidden;
}


.el-main {
    height: 100%;
    background-color: rgb(255, 255, 255);
    
}

.el-menu-item {
    background: rgb(56, 56, 59);
    // background: linear-gradient(90deg, rgb(88, 88, 88), rgb(20, 20, 20),rgb(20, 21, 20),rgb(0, 0, 0),rgb(20, 20, 20), rgb(20, 21, 20),rgb(88, 88, 88));
    // background: black;
    span {
        color: rgb(255, 255, 255)
    };
}

.el-menu-item:hover {
    span {
        color: #050708;
    }
}

.el-menu-item:focus 
 {
    span {
        color: #050708;
    }
}

.el-dropdown {
    margin-top: 20px;
    width: 150px;
    height: 20px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.el-dropdown-menu {
    margin-top: -20px;
    width: 130px
}

.div-icon img {
    padding-left: -100px;
    margin-top: -25px;
    height: 60px;
    width: 100px;
    z-index: -999;
}

.toggle-button {
    background: #161718;
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

</style>
