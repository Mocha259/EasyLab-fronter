<template>
  <div style="width: 1100px">
    <el-container direction="vertical" style="width: 100%; margin-top: 20px">
      <el-row>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :file-list="fileList"
            :limit="1"
            accept=".doc,.txt,.docx,.pdf"
            multiple
          >
            <el-button slot="trigger" size="medium" type="primary" 
              >上传实验报告模板</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="medium"
              type="success"
              @click="submitUpload"
              >确认上传</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: 80px">
              只能上传doc,docx,txt,pdf文件，且不超过500kb
            </div>
          </el-upload>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <h3>报告提交情况</h3>
      <el-table
        :data="stuReportData"
        style="width: 80%; margin-left: 10%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="student_id" label="学号"  width="340">
        </el-table-column>

        <el-table-column prop="submit_time" label="提交时间" >
        </el-table-column>

        <el-table-column width="180" label="">
          <template slot-scope="scope">
            <div>
              <span>
                <el-button type="text" @click="downloadReport(scope.row)"
                  >下载</el-button
                >
                <el-button type="text" @click="preview(scope.row)"
                  >预览</el-button
                >
                <el-button type="text" @click="postScore(scope.row)"
                  >评分</el-button
                >
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="请打分"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-input v-model="score" placeholder="请输入分数"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="scoreReport"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score:'',
      scoreExperiment_id:'',
      scoreStudent_id:'',
      dialogVisible:false,
      stuReportData: [],
      fileList: [],
      experiment_id: "",
    };
  },
  methods: {
    /// 获取所有学生的实验报告以及实验报告提交情况
    getAllStudentReports() {
      var that = this;
      this.$http({
        method: "get",
        url: "/experiment/findReportByExperimentId/" + that.experiment_id,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.success) {
            that.stuReportData = response.data.data.reports;
            console.log(response.data.data);
          } else {
            that.$message.error("遭到不可抗力，暂无可用报告！");
          }
        })
        .catch((error) => {
          hat.$message.error("遭到不可抗力，暂无可用报告！");
        });
    },
    //下载实验报告
    downloadReport(row) {
      console.log(row.file_url);
      this.$http({
        url: row.file_url,
        method: "get",
        headers: {
          Authorization: "Auth String",
          "content-type": "application/octet-stream",
        },
        responseType: "blob",
      }).then((response) => {
        let blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = row.file_name; //这里需要文件名，应该获取原本的文件名及后缀
        link.click();
        //释放内存
        window.URL.revokeObjectURL(link.href);
      });
    },
    //预览实验报告
    preview(row) {
      window.open(row.file_url);
    },
    postScore(row){
      this.scoreExperiment_id=row.experiment_id;
      this.scoreStudent_id=row.student_id;
      this.score='';
      this.dialogVisible=true;
    },
    /// 为实验报告打分
    scoreReport() {
      var that = this;
      var data = new FormData();
      data.append("score",this.score);
      data.append("experiment_id", this.scoreExperiment_id);
      data.append("student_id", this.scoreStudent_id);
      this.$http({
        method: "post",
        url: "/score/postExperimentScore",
        data: data,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.success) {
            that.$message.success("评分成功！");
            that.dialogVisible=false;
          } else {
            that.$message.error(response.data.data.message);
          }
        })
        .catch((error) => {
          that.$message.error("设置有误，请改正后尝试！");
        });
    },

    submitUpload() {
      let self = this;
      var data = new FormData();
      data.append("file", this.fileList[0].raw);
      data.append("experiment_id", this.experiment_id);

      var config = {
        method: "post",
        url: "/experiment/uploadTemplate",
        data: data,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      };
      this.$http(config)
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            var newFileList = [];
            newFileList.push({
              name: self.fileList[0].name,
              url: response.data.data.fileUploadResult.fileUrl,
            });
            self.fileList = newFileList;
            self.$message.success("文件上传成功！");
          } else {
            self.fileList = [];
            self.$message.error("文件上传失败，请重试！");
          }
        })
        .catch(function (error) {
          self.fileList = [];
          self.$message.error("请求失败");
        });
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      let self = this;
      var exp_id = this.experiment_id;
      var config = {
        method: "get",
        url: "/experiment/deleteTemplate/" + exp_id,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      };
      this.$http(config)
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            self.$message.success("已移除实验模板");
          } else {
            self.$message.error("移除失败");
          }
        })
        .catch(function (error) {
          self.$message.error("移除失败");
        });
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择一个文件,若更改，请先移除原文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除模板 ${file.name}？`);
    },
    getTemplate() {
      //获取已有模板
      let self = this;
      var exp_id = this.$route.query.experiment_id;
      var config = {
        method: "get",
        url: "/experiment/findByExperimentId/" + exp_id,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      };
      this.$http(config)
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            if (response.data.data.experiment.templdate_name != null) {
              self.fileList.push({
                name: response.data.data.experiment.template_name,
                url: response.data.data.experiment.template,
              });
            } else {
              self.fileList = [];
            }
          }
        })
        .catch(function (error) {
          self.fileList = [];
        });
    },
  },
  mounted() {
    this.experiment_id = this.$route.query.experiment_id;
    this.getTemplate();
    this.getAllStudentReports();
  },
};
</script>