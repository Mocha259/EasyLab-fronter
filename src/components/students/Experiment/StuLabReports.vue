<template>
  <div style="width: 1100px">
    <el-container direction="vertical" style="width: 100%; margin-top: 20px">
      <el-button
        style="width: 15%; margin-bottom: 0px"
        type="primary"
        @click="downloadTemplate"
        >下载实验报告模板</el-button
      >
      <el-divider></el-divider>
      <h3 style="margin-left: 10%">在此编辑您的报告</h3>
      <el-container direction="horizonal">
        <div id="div1" style="width: 80%; margin-left: 10%"></div>
      </el-container>
      <span style="margin-left: 40%; margin-top: 5px"
        ><el-button>提交报告</el-button><el-button>手动上传</el-button></span
      >
    </el-container>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      experiment: {},
      reportEditor: null, //实验报告富文本编辑器
      reportEditorData: "", // 富文本编辑器中的数据
    };
  },
  methods: {
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
      var that=this;
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
          link.download =  that.experiment.template_name; //这里需要文件名，应该获取原本的文件名及后缀
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        });
      } else {
        this.$message.error("暂无模板，请练习授课老师提供");
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

      editor.config.height = 500; // 设置编辑区域高度为 500px

      editor.config.onchange = function (html) {
        self.reportEditorData = html;
      };

      editor.create();

      this.reportEditor = editor;
    },
  },
  mounted() {
    this.createEditor();
    this.getExperiment();
  },
};
</script>