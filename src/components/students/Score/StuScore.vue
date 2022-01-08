<template>
  <div class="StuScore">
    <el-empty v-if="count == 0" description="没有成绩数据"></el-empty>
    <div v-else class="container">
      <el-table
        :data="tableData"
        style="width: 50%; position: absolute; left: 25%;font-size:18px;">
        <el-table-column prop="course_name" label="课程名称" width="240">
        </el-table-column>
        <el-table-column prop="sign_num" label="签到次数" width="240">
        </el-table-column>
        <el-table-column prop="score" label="成绩"> </el-table-column>
      </el-table>
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
    getCourseScore() {
      var that = this;
      this.$http({
        method: "get",
        url: "/score/getAllCourseScore",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.success) {
            that.tableData = response.data.data.courseScoreList;
            that.count=response.data.data.courseScoreList.length;
            console.log(response.data.data);
          } else {
            that.$message.error("遭到不可抗力，无法获取成绩！");
          }
        })
        .catch((error) => {
          hat.$message.error("遭到不可抗力，无法获取成绩！");
        });
    },
  },
  mounted() {
      this.getCourseScore();
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