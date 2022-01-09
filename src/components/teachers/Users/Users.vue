<template>
    <div class="infoContainer">

      <!-- <div class="background"></div> -->

      <!-- <h3>个人信息</h3> -->
      <!-- <el-upload
        class="avatar-uploader"
        action="student/uploadAvatar"
        :show-file-list="false"
        :headers="headers"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i><br>
        <i>点击上传头像</i>
      </el-upload> -->

      <el-container direction="vertical" style="; height: 100%; margin-top: 50px; margin-left: 50px">

        <el-container direction="horizonal" >
          <el-avatar :src="Info.avatar_url" :size="150"></el-avatar>
          <el-container style="margin-left: -300px">
            <el-descriptions title="用户信息">
                <el-descriptions-item label="学工号">{{Info.id}}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{Info.name}}</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="职位"><el-tag style="margin-top: -5px">{{Info.Pos}}</el-tag></el-descriptions-item>
                <el-descriptions-item label="邮箱" >{{Info.email}}</el-descriptions-item>
            </el-descriptions>
          </el-container>
        </el-container>
        <span><el-button style="width: 10%; margin-top: 10px; margin-left: 20px" @click="avatarDialog = true">更换头像</el-button><el-button style="margin-left: 100px" type="primary">更换密码</el-button></span>
        <el-divider></el-divider>
        <el-card style="height: 500px">
          <h2>个人简介</h2>
          <el-empty v-if="Info.introduction == null" :image-size="200"></el-empty>
          <div v-else>{{Info.introduction}} </div>
        </el-card>
      </el-container>
      

      <el-dialog
        title="更改头像"
        :visible.sync="avatarDialog"
        width="30%"
        >

        <el-upload
          class="upload-demo"
          drag
          action="#"
          :on-change="handleChange"
         :auto-upload="false"
         :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button @click="avatarDialog = false">取 消</el-button>
          <el-button type="primary" @click="uploadAvatar">确 定</el-button>
        </span>
      </el-dialog>

    
      

    </div>

</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        Info: {
          avatar_url: '',
          name: '',
          id: '',
          email: '',  // 邮箱地址
          Pos :'',     //职称
          introduction: '',
        },
        headers: {
          token: window.sessionStorage.getItem("token")
        },
        fileList: [],
        avatarDialog: false,
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        // this.imageUrl = ''
        if(res.success){
          this.imageUrl = res.data.data.route
        }else{
          this.imageUrl = ''
          this.$message.error('头像上传失败，请重试')
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getUserInfo() {
      let self = this
      
      this.$http({
        methods: 'get',
        url: 'advisor/getCurrentAdvisor',
        headers: { 'token': window.sessionStorage.getItem('token') }
      }).then(res => {
        console.log(res.data)
        if(res.data.success){
          // console.log(res.data.data.student.student_id)
          var Info = res.data.data.advisor
          self.Info.avatar_url = Info.avatar
          self.Info.id = Info.advisor_id
          self.Info.Pos = Info.professional_title
          self.Info.email = Info.email
          self.Info.phone = Info.phone
          self.Info.name = Info.name
          self.Info.introduction = Info.introduction
        }
      }).catch(error=>{})
      },
      uploadAvatar() {
        let self = this
        var data = new FormData()
        data.append('file', this.fileList[0].raw);
        this.$http({
          method: 'post',
          url: '/advisor/uploadAvatar',
          data: data,
          headers: { 'token': window.sessionStorage.getItem('token') }
        }).then(res => {
          // console.log(res.data)
          if(res.data.success){
            self.Info.avatar_url = res.data.data.route
            self.$message.success('头像上传成功')
          }else{
            self.$message.error('头像上传失败')
          }
          self.avatarDialog = false;
        }).catch(error => {
          self.avatarDialog = false;
        })
      },
       handleChange(file, fileList) {
        this.fileList = fileList;
      },
    },
    mounted() {
      // // console.log( window.sessionStorage.getItem("token"))
      // let self = this
      // this.$http.post('/getInfo', window.sessionStorage.getItem('token')).then(function(res){
      //     // console.log(res.data)
      //     self.Info.Name = res.data.name
      //     self.Info.Phone = res.data.phone 
      //     self.Info.Id = res.data.id
      //     self.Info.Pos = res.data.pos
      //     self.Info.Teach = res.data.teach
      // }).catch(
      //     function(res){
      //       console.log(res)
      //     }
      // )
      this.getUserInfo()
    }
  }
</script>

<style>

  .infoContainer {


    background-color:#ffffff;
    z-index: -10;
    /* background: url('../../assets/carousel01.jpg');
    background-repeat: no-repeat;
    background-size: cover; */
    /* -webkit-filter: blur(10px); */
    /* -moz-filter: blur(10px); */
    /* -o-filter: blur(10px); */
    /* -ms-filter: blur(10px); */
    /* filter: blur(10px); */
  }

  .background{ 
   
    width: 100%;
    height: 100%; 
    position: absolute;
    z-index: 1000;
    left: 0px;
    top:0px;
    /* background: url('../../../assets/carousel01.jpg'); */
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }


  .el-upload {
    margin-top: 20px;
    margin-left: 15%;
    z-index: 999;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    /* border-color: black; */
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-descriptions {
    z-index: 999;
    width: 500px;
    margin-left: 30%;
  }
</style>