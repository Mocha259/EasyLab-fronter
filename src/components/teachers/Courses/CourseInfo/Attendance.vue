<template>
  <div>
    <div><el-button @click="postSignIn">点击发布考勤</el-button></div>
    <el-divider></el-divider>
    <el-container direction="horizonal">
      <el-container>
       <el-table
        :data="attendList"

        style="">
        <el-table-column
          prop="id"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
        width="100"
          label="状态">
          <el-tag type="success">已考勤</el-tag>
        </el-table-column>
      </el-table>
      </el-container>
      <el-container>
        <el-table
        :data="unattendList"

        style="">
        <el-table-column
          prop="id"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
        width="100"
          label="状态">
          <el-tag type="danger">未考勤</el-tag>
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
          attendList: [
            {id: '1950081', name: '张三'},
            {id: '1950082', name: '张四'},
            {id: '1950083', name: '张五'},
            {id: '1950084', name: '张六'},
          ],
          unattendList: [
            {id: '1950081', name: '李四'},
            {id: '1950082', name: '张四'},
            {id: '1950083', name: '张五'},
            {id: '1950084', name: '张六'},
          ]
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
               that.receiveSignIn();
        })
      }
    },
    mounted(){
      this.course_id = JSON.parse(this.$route.query.course_info).course_id;
    }
}
</script>

