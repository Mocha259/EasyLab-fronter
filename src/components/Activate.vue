<template>
    <div class="activate_container">
        <div class="activate_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 账号激活表单区 -->
            <el-form label-width="0px" class="activate_form" >
                <!-- 邮箱 -->
                <el-form-item prop="email">
                    <el-input prefix-icon="iconfont icon-user" 
                            style="width: 300px; padding-left: 25px"
                            placeholder="请输入邮箱"
                            v-model="email"></el-input>
                    <el-button type="primary" style="margin-left: 5px;" 
                                :disabled="disable"
                                @click="getVerifyCode">{{verifyMessage}}</el-button>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item>
                    <el-input prefix-icon="iconfont icon-3702mima"
                            style="width: 300px; padding-left: 25px"
                            placeholder="请输入验证码"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary"
                            style="position: absolute; left: 40%"
                            @click="tryActivate">激活账户</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            email: '',
            disable: false,
            verifyMessage: '获取验证码',
            count: 6,
            activateForm:{
                verifyCode: '1234',
            },
            emailFrom: {
                email: ''
            }
        }
    },
    methods: {
        logout(){
            //清空token
            window.sessionStorage.clear();
            //重定向
            this.$router.push('/Login')
        },
        getVerifyCode(){
            var countDown = setInterval(()=>{
                if(this.count < 1){
                    this.isGeting = false;
                    this.disable = false;
                    this.verifyMessage = '获取验证码';
                    this.count = 6;
                    clearInterval(countDown);
                    }else{
                    this.isGeting = true;
                    this.disable = true;
                    this.verifyMessage = this.count-- + 's后重发';
                    }
                },1000);

            },
            tryActivate() {
                let self = this
                // console.log(this.activateForm.verifyCode)
                // const {data: res} = this.$http.post('activate', this.activateForm);
                this.$http.post('activate', this.activateForm).then(function(res){
                    
                    console.log(res.data)
                    if(res.data.status == 1){
                        self.$message.success('激活成功！请登录')
                        // console.log('111')
                        self.$router.push('/Login')
                    }
                    else{
                        // this.$$message.error('激活失败！')
                    }
                }).catch(
                    function(res){
                        
                        console.log(res)
                    }
                )
            }
        },

}
</script>

<style lang="less" scoped>

.activate_container {
    width: 100%;
    height: 100%;
    background: #009FCC;
}

    //盒子大小写死
.activate_box {
    width: 450px;
    height: 300px;
    background-color:white;
    border-radius: 3px;
    position: absolute;
    left: 38%;
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
    .activate_form {
        margin-top: 100px;
        box-sizing: border-box;
    }
}
</style>
