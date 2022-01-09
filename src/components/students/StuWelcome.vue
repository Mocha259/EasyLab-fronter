<template>
  <div>
    <el-divider content-position="center"
      ><h1 style="background-color: #eaedf1">信息公告栏</h1></el-divider
    >
    <notice-bar
      v-for="(item, index) in noticeList"
      :key="index"
      :text="item.content"
      :bg-color="'#fff'"
      :color="'#03a9f4'"
      :scrollable="false"
      @click="showMsg(item)"
    />
    <el-dialog
      title="公告"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>{{content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
// import cloneDeep from 'lodash.clonedeep'

export default {
  name: "MyEditor",
  // components: { Editor, Toolbar },

  data() {
    return {
      content:'',
      noticeList: [
      ],
      dialogNewMsg: false,
      centerDialogVisible: false,
      editorId: "wangEditor-1", // 定义一个编辑器 id ，要求：全局唯一且不变。重要！！！
      defaultContent: [], // 编辑器的默认内容，只在初始化时使用
      latestContent: [], // 用于存储编辑器最新的内容，onChange 时修改
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
      },
    };
  },
  methods: {
    getAllNotice(){
      var self=this
      this.$http({
      method:'get',
      url: 'system/getAllNotice',
      headers: { 'token': window.sessionStorage.getItem("token") }
      }).then((response) => {
        if(response.data.success){
          self.noticeList=response.data.data.noticeList;
          console.log(response.data);
        }else{
          this.$message.error("未获取到公告！")
        }
      }).catch(error=>{
        this.$message.error("未获取到公告！")
      })
    },
    showMsg(item) {
      this.content=item.content;
      this.centerDialogVisible = true;
    },
  },
  mounted(){
    this.getAllNotice();
  }
};
</script>

<style lang="less" scoped>
.el-divider__text {
  background-color: #eaedf1 !important;
}
.notice-bar {
  background-color: transparent;
  margin-top: 5px;
  background-color: #eaedf1 !important;
}
.notice-bar:hover {
  cursor: pointer;
  background-color: rgb(155, 183, 235) !important;
}
.editMessage {
  height: 60% !important;
}
</style>

