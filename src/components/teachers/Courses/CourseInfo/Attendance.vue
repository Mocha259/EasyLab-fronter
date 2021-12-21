<template>
  <div>
    <div><el-button @click="postSignIn">点击发布考勤</el-button></div>
    <el-divider></el-divider>
    <div></div>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
          course_id:''
        }
    },
    methods:{
      postSignIn(){
        var para=new FormData()
        para.append('course_id',this.course_id)
        this.$http({
            method:'post',
            url: 'course/postSignIn',
            headers: { 'token': window.sessionStorage.getItem("token")},
            data:para
            }).then((response) => {
                alert(response.data.data.message)
        })
      }
    },
    mounted(){
      this.course_id = this.$route.query.course_id
    }
}
</script>

