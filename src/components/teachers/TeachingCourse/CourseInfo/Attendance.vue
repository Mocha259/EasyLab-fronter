<template>
  <div>
    <div>
      <el-button type="success" @click="postSignIn">点击发布考勤</el-button>
      <el-button type="danger" @click="stopSignIn">点击终止考勤</el-button>
    </div>
    <el-divider></el-divider>
    <el-container direction="horizonal">
      <el-container>
       <el-table :data="attendList" style="">
        <el-table-column
          prop="id"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
        width="100"
          label="状态">
          <el-tag type="success">已考勤</el-tag>
        </el-table-column>
      </el-table>
      </el-container>
    </el-container>
    <div></div>
    
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import  Stomp from 'stompjs';
export default {
    data() {
        return {
          course_id:'',
          attendList: [],
        }
    },
    methods:{
      receiveSignIn(){
        var that=this
         this.$socket.ws.subscribe('/user/' + window.sessionStorage.getItem('userId')+ '/studentSignInMsg', function (response){
                    //学生签到信息弹窗
                    var message=JSON.parse(response.body).message
                    that.$notify({
                      title:'您有新消息',
                      message:that.$createElement('i',{style:'color:teal'},"学生"+message+"已签到")
                    });
                    that.attendList.push({id:message});
                });
      },
      postSignIn(){
        var that=this;
        var para=new FormData()
        para.append('course_id',this.course_id)
        this.$http({
            method:'post',
            url: 'course/postSignIn',
            headers: { 'token': window.sessionStorage.getItem("token")},
            data:para
            }).then((response) => {
               that.$message.success(response.data.message)
        })
      },
      stopSignIn(){
        var that=this;
        var para=new FormData()
        para.append('course_id',this.course_id)
        this.$http({
            method:'post',
            url: 'course/stopSignIn',
            headers: { 'token': window.sessionStorage.getItem("token")},
            data:para
            }).then((response) => {
              if(response.data.success)
              that.$message.success('已终止签到！');
              else{
                that.$message.error("遭遇不可抗力，没能成功停止签到！");
              }
        }).catch(error=>{
           that.$message.error("遭遇不可抗力，没能成功停止签到！");
        })
      }
    },
    mounted(){
      this.course_id = JSON.parse(this.$route.query.course_info).course_id;
      this.receiveSignIn();
    }
}
</script>

