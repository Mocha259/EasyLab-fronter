<template>
    <div>
        <el-divider content-position="center" ><h1 style="background-color:#EAEDF1;">信息公告栏</h1></el-divider>
        <el-button @click="addNewMsg">添加公告</el-button>
        <el-dialog
        title="在此编辑您的公告"
        :visible.sync="dialogNewMsg"
        width="80%"
        height="60%"
        custom-class="editMessage"
        center>
            <div>
            <h2>通知标题</h2>
            <quill-editor class="editor"
                ref="myTextEditor"
                v-model="title"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">
            </quill-editor></div>
            <div>
            <h2>通知内容</h2>
            <quill-editor class="editor"
                ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">
            </quill-editor></div>
            <el-button style="z-index: 999; margin-top: 10px">提交</el-button>
        </el-dialog>

        <notice-bar v-for="(item, index) in msgTitleList" :key="index"
        :text="item"
        :bg-color="'#fff'"
        :color="'#03a9f4'"
        :scrollable="false"
        left-icon="http://o9kkuebr4.bkt.clouddn.com/notice-color.png"
        @click="showMsg"
        />
        <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
            <span>这里写公告</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
            
        </el-dialog>

    </div>
</template>

<script>
export default {
  mounted() {
    setInterval(this.startPlay, 2000)
  },
  data() {
    return {
        msgTitleList: [
            "本科生选课通知",
            "2021年上海高校本科毕业论文(设计)抽检报送材料要求",
            "2021年秋季学期研究生中期（综合）考核工作安排的通知"
        ],
        dialogNewMsg: false,
        centerDialogVisible: false,
        content: null,
        title: null,
        editorOption: {
        modules: {
        toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
        ], //工具菜单栏配置
        },
        placeholder: '请在这里添加产品描述', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
        }
    }
  },
  methods: {
        addNewMsg(){
            this.dialogNewMsg = true
        },
        showMsg() {
            this.centerDialogVisible = true
        },
        // 失去焦点
        onEditorBlur(editor) {},
        // 获得焦点
        onEditorFocus(editor) {},
        // 开始
        onEditorReady(editor) {},
        // 值发生变化
        onEditorChange(editor) {
        this.content = editor.html;
        console.log(editor);
        },
    },
    mounted() {
    },
    computed: {
        editor() {
        return this.$refs.myTextEditor.quillEditor;
        }
    },
}
</script>

<style lang="less" scoped>

.el-divider__text{
    background-color: #EAEDF1 !important;
}
.notice-bar {
    background-color: transparent;
    margin-top:5px;
    background-color: #EAEDF1 !important;
}
.notice-bar:hover {
    cursor: pointer;
    background-color: rgb(155, 183, 235) !important;
}
.editMessage {

    height: 60% !important;
}
.editor {
    line-height: normal !important;
    // height: 400px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
content: '等宽字体';
}
</style>

