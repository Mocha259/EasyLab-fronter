<template>
    <div class="login_container" id="app">
        <!-- 轮播图背景 -->
        <el-carousel arrow="never" indicator-position="none" :height="bannerHeight + 'px'">
           <el-carousel-item v-for="item in pics" :key="item.url">
                <img :src="item.url" >
            </el-carousel-item>
        </el-carousel>
        <!-- 登录盒子 -->
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区 -->
            <el-form label-width="0px" class="login_form" 
            :model="loginForm" :rules="loginFormRules"
            ref="loginFormRef">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="text" @click="activate">首次登录？</el-button>
                    <!-- <el-button type="info" @click="Signup">注册</el-button> -->
                </el-form-item>
                <!-- 激活按钮 -->

            </el-form>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            pics: [
                { url: require("../assets/carousel01.jpg") },
                { url: require("../assets/carousel02.jpg") },
                { url: require("../assets/carousel03.jpg") },
                { url: require("../assets/carousel04.jpg") }
            ],
            //登录表单的数据绑定对象
            loginForm:{
                username: '1234',
                password: '1234',
            },
            loginFormRules: {
                username:[
                    { required: true, message: "请输入邮箱或学工号", trigger: "blur" } 
                ],
                password:[
                     { required: true, message: "请输入密码", trigger: "blur" } 
                ]
            },
            // demoForm: {}
            //图片父容器高度
            bannerHeight: 1000,
            //浏览器宽度
            screenWidth: 0
        }
    },
    methods: {
        login() {

            //先拿到表单的引用
            this.$refs.loginFormRef.validate(async valid => {
                let self = this
                // this.$router.push('/Home')
                if(!valid)return

                var data=new FormData()
                data.append('username', this.loginForm.username)
                data.append('password', this.loginForm.password)
                // data = this.loginForm
                var config = {
                  method: 'post',
                  url: 'student/login',
                  data : data,
                }

                this.$http(config)
                .then(function (response) {
                    console.log(response.data)
                    console.log(response.data.data.token)
                    if(response.data.success){
                        self.$message.success('登录成功！')
                        window.sessionStorage.setItem("token",response.data.data.token)
                        self.$router.push('/Home')
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                });               
            })
        },
        activate() {
                
            this.$router.push('/Activate')
        
        },
        setSize: function() {
            this.bannerHeight = this.screenHeight;
        }
     },
    mounted() {
        this.screenWidth = window.innerWidth
        this.setSize()
        //窗口大小发生改变时，调用一次
        window.onresize = () => {
            this.screenWidth = window.innerWidth
            this.setSize()
        }
    }
};
</script>

<style lang="less" scoped>

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

img{
    width: 100%;
    height: inherit;
}

.login_container {
    background: #2b4b6b;
    height: 100%;
    width: 1920px;
    
}

//盒子大小写死
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 60%;
    top: 30%;
    z-index: 999;
    .avatar_box {
        height: 120px;
        width: 120px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 5px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-start;
    margin-left: 100px;
    // position: absolute;
    // left: 20px;
}
</style>
