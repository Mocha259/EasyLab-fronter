<template>
  <div class="StuScore">
    
    <div  class="container">
        <el-button @click="startPractice">点击开始匹配</el-button>
        <el-divider></el-divider>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      tableData: [],
    };
  },
  methods: {
    subscribe(){
        this.$socket.ws.subscribe('/user/' + window.sessionStorage.getItem('userId')+ '/practice', function (response){
                    //学生签到信息弹窗
                    var message=JSON.parse(response.body).message
                    that.$notify({
                      title:'您有新消息',
                      message:that.$createElement('i',{style:'color:teal'},"学生"+message+"已签到")
                    });
                });
    },

   startPractice() {
      var that = this;
      this.$http({
        method: "get",
        url: "/practice/startPractice",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.data);
          } else {
            that.$message.error("遭到不可抗力，无法获取成绩！");
          }
        })
        .catch((error) => {
          that.$message.error("遭到不可抗力，无法获取成绩！");
        });
    },
  },
  created() {
      this.subscribe();
  },
};
</script>

<style lang="less" scoped>
.StuScore {
  height: 80%;
  width: 80%;
}
.container {
  height: 270px;
  margin-top: 20px;
}
</style>