<template>
    <div>
        <h1>注册</h1>
        <el-form>
            <!-- 用户名 -->
            <el-form-item>
                <el-input prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item>
                <el-input prefix-icon="iconfont icon-3702mima" type="password"></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item>
                <el-input prefix-icon="iconfont icon-3702mima" type="password"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item>
                <el-input prefix-icon="iconfont icon-3702mima"  ></el-input>
            </el-form-item>
            <!-- 邮箱验证码 -->
            <el-form-item>
                <el-input prefix-icon="iconfont icon-3702mima"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="info" @click="logout">返回</el-button>
    </div>
</template>

<script>
export default {
      methods: {
        logout(){
            //清空token
            window.sessionStorage.clear();
            //重定向
            this.$router.push('/Login')
        }
    }
}
</script>

<style lang="less" scoped>

</style>
