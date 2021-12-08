<template>
    <div class="activate_container">
        <div class="activate_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 账号激活表单区 -->
            <el-form label-width="0px" class="activate_form" 
                :model="activateForm" :rules="activateFormRules"
                ref="activateFormRef">
                <!-- 邮箱 -->
                <el-form-item prop="email_address" style="margin-top: 30%">
                    <el-input prefix-icon="el-icon-s-promotion" style="width: 300px;"
                            placeholder="请输入邮箱"
                            v-model="activateForm.email_address"></el-input>
                </el-form-item>
                <!-- 新设置的密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-edit" 
                            style="width: 300px;"
                            placeholder="请输入新的密码" type="password"
                            v-model="activateForm.password"></el-input>
                </el-form-item>
                <el-button type="primary" style="margin-left: 80px; width: 110px"
                :disabled="disable"
                @click="getVerifyCode">{{verifyMessage}}
                </el-button>
                <!-- 验证码 -->
                <el-form-item style="margin-top: 20px;">
                    <el-input prefix-icon="iconfont icon-3702mima"
                            style="width: 300px;" v-model="verifyCode"
                            placeholder="请输入验证码"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" style="margin-left: 80px; width: 110px" @click="tryActivate">激活账户</el-button>
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
            activateForm: {
                email_address: '3378681490@qq.com',
                password: '123456'
            },
            activateFormRules: {
                email_address:[
                    { required: true, message: "请输入邮箱", trigger: "blur" } 
                ],
                password:[
                     { required: true, message: "请输入新的密码", trigger: "blur" } 
                ]
            },
            verifyCode: ''
        }
    },
    methods: {
        logout(){
            //清空token
            window.sessionStorage.clear();
            //重定向
            this.$router.push('/Login')
        },
        verify(){
            var myReg= /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
            if(myReg.test(this.activateForm.email_address)){
                return true
            }else{
                return false
            }
 
        },
        getVerifyCode(){
            this.$refs.activateFormRef.validate(async valid => {
                let self = this
                if(!valid)
                    return
                if(this.verify()){
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
                    var data=new FormData()
                    data.append('sendTo', this.activateForm.email_address)
                    // data.append('password', this.activateForm.password)
                    var config = {
                      method: 'post',
                    //   url: 'student/activate',
                      url: 'advisor/activate',
                      data : data,
                    }

                    this.$http(config)
                    .then(function (response) {
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    });    
                }else{
                    this.$message.error('请检查邮箱格式！')
                    return
                }         
            })
                
            
        },
        tryActivate() {
            console.log(this.$route.query.id)
            this.$refs.activateFormRef.validate(async valid => {
                
                let self = this
                if(!valid)
                    return
                if(this.verify()){
                    var data=new FormData()
                    data.append('verificationCode', self.verifyCode)
                    data.append('email', self.activateForm.email_address)
                    data.append('username', self.$route.query.id)
                    data.append('password', self.activateForm.password)
                    var config = {
                      method: 'post',
                    //   url: 'student/verifyCode',
                      url: 'advisor/verifyCode',
                      data : data,
                    }

                    this.$http(config)
                    .then(function (response) {
                        console.log(response.data)
                        if(response.data.success){
                            self.$message.success('请使用新密码登录')
                            self.$router.push('/Login')
                        }
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    });    
                }else{
                    this.$message.error('请检查邮箱格式！')
                    return
                }         
            })
        }
        
    },

}
</script>

<style lang="less" scoped>

.activate_container {
    width: 100%;
    height: 100%;
    // background: #009FCC;
    background-image: linear-gradient(to bottom ,  #805b7b,#e789bd);
}

    //盒子大小写死
.activate_box {
    width: 450px;
    height: 400px;
    background-image: linear-gradient(to bottom , #d881db, #d2c7d4);
    border-radius: 5px;
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
}

.activate_box::after {
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(20px);
}

.activate_form {
    padding: 0px 80px;
    box-sizing: border-box;
}
</style>
