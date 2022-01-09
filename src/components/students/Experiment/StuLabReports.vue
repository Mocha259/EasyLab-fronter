<template>
  <div style="width: 1100px">
    <el-container direction="vertical" style="width: 100%; margin-top: 20px">
      <el-row>
       
          <el-button
            style="width: 15%; margin-bottom: 0px"
            type="primary"
            @click="downloadTemplate"
            >下载实验报告模板</el-button
          >
          <el-upload
            class="upload-demo"
            style="display:inline"
            ref="upload"
            action="#"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :file-list="fileList"
            :limit="1"
            accept=".doc,.txt,.docx,.pdf"
            multiple
          >
            <el-button slot="trigger" size="medium" type="primary"
              >上传实验报告</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="medium"
              type="success"
              @click="submitUpload"
              >确认上传</el-button
            >
            
          </el-upload>
      </el-row>

      <el-divider></el-divider>
      <h3 style="margin-left: 10%">在此编辑您的报告</h3>
      <el-container direction="horizonal">
        <div id="div1" style="width: 80%; margin-left: 10%"></div>
      </el-container>
      <span style="margin-left: 40%; margin-top: 5px">
        <el-row>
          <el-col :span="6"
            ><el-button @click="submitReport">提交报告</el-button></el-col
          >
          <el-col> </el-col>
        </el-row>
      </span>
    </el-container>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      fileList: [],
      experiment: {},
      reportEditor: null, //实验报告富文本编辑器
      reportEditorData: "", // 富文本编辑器中的数据
    };
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    submitUpload() {
      if(this.fileList==null||this.fileList.length==0){
        this.$message.error("请选择文件再上传！");
        return;
      }
      let self = this;
      var data = new FormData();
      data.append("file", this.fileList[0].raw);
      data.append("experiment_id",  this.experiment.experiment_id);
      var config = {
        method: "post",
        url: "/experiment/uploadReport",
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
            self.fileList=[];
          } else {
            self.fileList = [];
            self.$message.error(response.data.message);
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
    getExperiment() {
      var experiment_id = this.$route.query.experiment_id;
      let self = this;
      this.$http({
        method: "get",
        url: "/experiment/findByExperimentId/" + experiment_id,
        headers: { token: window.sessionStorage.getItem("token") },
      }).then((response) => {
        self.experiment = response.data.data.experiment;
      });
    },
    downloadTemplate() {
      var that = this;
      if (
        typeof this.experiment.template != "undefined" &&
        this.experiment.template != null
      ) {
        this.$http({
          url: that.experiment.template,
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
          link.download = that.experiment.template_name; //这里需要文件名，应该获取原本的文件名及后缀
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        });
      } else {
        this.$message.error("暂无模板，请联系授课老师提供");
      }
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.reportEditor.txt.html();
      alert(data);
    },
    beforeDestroy() {
      // 调用销毁 API 对当前编辑器实例进行销毁
      this.editor.destroy();
      this.editor = null;
    },
    createEditor() {
      let self = this;
      const editor = new E(document.getElementById("div1"));
      /// 配置editor基本信息

      editor.config.height = 400; // 设置编辑区域高度为 500px

      editor.config.onchange = function (html) {
        self.reportEditorData = html;
      };

      editor.create();
      this.getReport();

      this.reportEditor = editor;
    },
    submitReport() {
      var that = this;
      var content = this.reportEditor.txt.html();
      var experiment_id = this.experiment.experiment_id;
      var data = new FormData();
      data.append("experiment_id", experiment_id);
      data.append("content", content);
      this.$http({
        method: "post",
        url: "experiment/updateTemplate",
        data: data,
        headers: { token: window.sessionStorage.getItem("token") },
      })
        .then((response) => {
          if (response.data.success) {
            that.$message.success("提交成功！");
          } else {
            that.$message.error("提交失败！");
          }
        })
        .catch((error) => {
          that.$message.error("提交失败！");
        });
    },
    getReport() {
      var that = this;
      var data = new FormData();
      data.append("experiment_id",this.$route.query.experiment_id);
      this.$http({
        method: "post",
        url: "experiment/getTemplate",
        data: data,
        headers: { token: window.sessionStorage.getItem("token") },
      }).then((response) => {
        if (response.data.success) {
          var template = response.data.data.template.content;
          if (template != null) {
            that.reportEditor.txt.html(template);
          }
        }
      });
    },
  },
  mounted() {
    this.createEditor();
    this.getExperiment();
  },
};
</script>