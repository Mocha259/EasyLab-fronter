<template>
  <div style="width: 1100px">
    <el-container direction="vertical" style="width: 100%; margin-top: 20px">
    <el-button style="width: 20%; margin-bottom: 0px" type="primary">下载实验报告模板</el-button>
    <el-divider></el-divider>
    <h3 style="margin-left: 10%">在此编辑您的报告</h3>
    <el-container direction="horizonal">

      <div id="div1" style="width: 80%; margin-left: 10%">

      </div>
    
    </el-container>

    </el-container>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  data() {
    return {
      reportEditor: null,       //实验报告富文本编辑器
      reportEditorData: '',     // 富文本编辑器中的数据

    }
  },
  methods: {
  
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.reportEditor.txt.html()
      alert(data)
      
    },
    beforeDestroy() {
      // 调用销毁 API 对当前编辑器实例进行销毁
      this.editor.destroy()
      this.editor = null
    },
    createEditor() {
      let self = this
      const editor = new E( document.getElementById('div1') );
      /// 配置editor基本信息
      
      editor.config.height  = 500  // 设置编辑区域高度为 500px
      
      editor.config.onchange = function (html) {

          self.reportEditorData = html
      }

      editor.create()

      this.reportEditor = editor

    }
  },
  mounted() {
    this.createEditor()
  }
}
</script>