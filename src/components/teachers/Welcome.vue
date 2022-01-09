<template>
  <div>
    <el-divider content-position="center"
      ><h1 style="background-color: #eaedf1">信息公告栏</h1></el-divider
    >

    <notice-bar
      v-for="(item, index) in msgTitleList"
      :key="index"
      :text="item"
      :bg-color="'#fff'"
      :color="'#03a9f4'"
      :scrollable="false"
      @click="showMsg"
    />
    <el-dialog
      title="公告"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>公告内容</span>
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

export default {
  name: "MyEditor",
  data() {
    return {
      msgTitleList: [
        "本科生选课通知",
        "2021年上海高校本科毕业论文(设计)抽检报送材料要求",
        "2021年秋季学期研究生中期（综合）考核工作安排的通知",
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
    addNewMsg() {
      this.dialogNewMsg = true;
    },
    showMsg() {
      this.centerDialogVisible = true;
    },
  },
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

