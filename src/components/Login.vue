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
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <!-- <el-button type="info" @click="Signup">注册</el-button> -->
                </el-form-item>
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
                username: '1950081',
                password: '123456'
            },
            loginFormRules: {
                username:[
                    { required: true, message: "请输入邮箱或学工号", trigger: "blur" } 
                ],
                password:[
                     { required: true, message: "请输入密码", trigger: "blur" } 
                ]
            },
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
                if(!valid)return;
                const {data: res} = await this.$http.post('login',this.loginForm);
                console.log(res);
                // 400: 登录失败，不跳转
                // 401: 未激活，路由跳转激活页面
                // 402: 登录成功，路由跳转主页面
                if(res.status == 400) return this.$message.error('登录失败！')
                if(res.status == 401) {
                    this.$message.warning('请先激活账号')
                    this.$router.push('/Activate')
                }
                else{
                    this.$message.success('登录成功！')
                    window.sessionStorage.setItem("token",res.token)
                    this.$router.push('/Home')
                }
            })
        },
        Activate() {
                this.$refs.loginFormRef.validate(async valid => {
                if(!valid)return;
                const {data: res} = await this.$http.post('login',this.loginForm);
                console.log(res);
                if(res.status != 400) return this.$message.error('登录失败！')
                window.sessionStorage.setItem("token",res.token)
                this.$router.push('/Activate')
            })
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
    justify-content: flex-end;
}
</style>
