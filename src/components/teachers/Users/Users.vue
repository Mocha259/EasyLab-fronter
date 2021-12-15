<template>
    <div class="infoContainer">

      <!-- <div class="background"></div> -->

      <!-- <h3>个人信息</h3> -->
      <el-upload
        class="avatar-uploader"
        action="student/uploadAvatar"
        :show-file-list="false"
        :headers="headers"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i><br>
        <i>点击上传头像</i>
      </el-upload>
      
      <el-descriptions class="margin-top" style="margin-left: 3%" title="个人信息" :column="1" size="large" border>
        <template slot="extra">
          <el-button type="primary" size="small">编辑</el-button>
        </template>
        
        <!-- 用户名 -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{Info.Name}}
        </el-descriptions-item>
        <!--  手机号 -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{Info.Phone}}
        </el-descriptions-item>
        <!-- 学工账号 -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            学工账号
          </template>
          {{Info.Id}}
        </el-descriptions-item>
        <!-- 职称 -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            职称
          </template>
          {{Info.Pos}}
        </el-descriptions-item>
      </el-descriptions>
      
      <el-card class="box-card" style="position: relative; left: 3%; width: 800px; height: 300px; margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>个人介绍</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">进入课程</el-button> -->
                </div>
                <!-- 课程信息描述 -->
                <div class="description">

                </div>
      </el-card>
      

    </div>

</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        Info: {
          Name: '',   //姓名
          Id  : '',   //学工号
          Phone : '', //年龄
          Teach: [    //教授的所有课程
            ''
          ],        
          Pos :''     //职称
        },
        headers: {
          token: window.sessionStorage.getItem("token")
        }
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
      }
    },
    mounted() {
      // console.log( window.sessionStorage.getItem("token"))
      let self = this
      this.$http.post('/getInfo', window.sessionStorage.getItem('token')).then(function(res){
          // console.log(res.data)
          self.Info.Name = res.data.name
          self.Info.Phone = res.data.phone 
          self.Info.Id = res.data.id
          self.Info.Pos = res.data.pos
          self.Info.Teach = res.data.teach
      }).catch(
          function(res){
            console.log(res)
          }
      )
    }
  }
</script>

<style>

  .infoContainer {
    padding-top: -5px;
    height: 100%;
    background-color:#EAEDF1;
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