<template>
    <div>
        <el-button @click="openDialog">上传文件</el-button>
        <el-divider></el-divider>
        <el-dialog title="上传" :visible.sync="dialogOfUpload" width="25%" style="text-align: center;">
            <el-upload class="upload-demo" action="#" drag multiple :headers="headers" :auto-upload="false"
                :file-list="fileList" :on-change="handleChange">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!-- <div class="el-upload__tip" slot="tip">上传Excel格式文件</div> -->
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogOfUpload = false">取 消</el-button>
                <el-button type="primary" @click="confirmUpload">上 传</el-button>
            </div>
        </el-dialog>

        <div class="left" style="float: left; width: 20%">
            
            <div class="file-tree" style="margin-left: -50px; margin-top: -50px">
                <h2 style="margin-bottom: 10px">文件目录</h2>
                <el-tree
                :data="data"
                node-key="id"
                @node-click="showFiles"
                :expand-on-click-node="false"
                style="width: 300px">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span style="text-align: center; font-size: 20px; height; 50px"><i class="el-icon-folder-opened"></i>{{ node.label }}</span>
                    <span style="position: absolute; right: 5px; height: 25px; border-color: black; border-type: solid !important">
                        <el-button
                            class="add-folder"
                            size="mini"
                            type="text"
                            @click="() => append(data)"
                            style="border-color: transparent !important;">
                            <i style="color: black; font-family: Microsoft Yahei; font-size: 14px">添加</i>
                        </el-button>
                        <el-button
                            class="add-folder"
                            size="mini"
                            type="text"
                            @click="() => remove(node, data)"
                             style="border-color: transparent !important">
                            <i style="color: black; font-family: Microsoft Yahei;  font-size: 14px">删除</i>
                        </el-button>
                    </span>
                </span>
                </el-tree>
            </div>
        </div>
        <div class="right" style="float: right; width: 70%"> 
            <el-table :data="existedFileList">

                <el-table-column
                fixed
                prop="name"
                label="文件名称"
                >
                </el-table-column>

                <el-table-column
                prop="size"
                label="文件大小"
                >
                </el-table-column>
            
                <el-table-column
                prop="date"
                label="修改日期"
                >
                </el-table-column>

                <el-table-column
                
                label="操作"
                >
                <template >
                    <el-button  type="text" size="small" @click="handleExport">下载</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
        title="创建新文件夹"
        :visible.sync="create_dir"
        width="30%"
        >
        <span>文件夹名称</span>
        <el-input v-model="tmp_new_dir.dir_name" placeholder="请输入新建文件夹的名称"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="create_dir = false">取 消</el-button>
            <el-button type="primary" @click="create_dir = false">确 定</el-button>
        </span>
        </el-dialog>
        
    </div>
</template>

<script>
 let id = 1000;
export default {
    data() {
        return {

            dialogOfUpload: false,
            headers: {},
            fileList: [],		
            existedFileList: [{
            name: '软件设计模式.mp4',
            size: '31M',
            date: '2021-11-16',
            }, {
            name: '第一次课件.ppt',
            size: '1M',
            date: '2021-11-15',
            }, {
            name: '课程项目说明.docx',
            size: '1.6M',
            date: '2021-11-14',
            }, {
            name: '选课名单.xlsx',
            size: '600k',
            date: '2021-11-13',
            }],
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                id: 5,
                label: '二级 2-1'
                }, {
                id: 6,
                label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                id: 7,
                label: '二级 3-1'
                }, {
                id: 8,
                label: '二级 3-2'
                }]
            }],
            totalFiles: [],
            
            create_dir: false,
            tmp_new_dir: {              // 创建的新文件夹时用来存临时变量
                dir_name: ''
            },
        }
    },
    methods: {
        openDialog(){
            this.dialogOfUpload = true
        },
        handleChange(file, fileList) { //文件数量改变
			this.fileList = fileList;
		},
        confirmUpload() { //确认上传
            var param = new FormData();
            this.fileList.forEach(
                (val, index) => {
                    param.append("file", val.raw);
                }
            );

            this.$http.post("/export/upload", param).then(responce => {});

            this.$message({
                message: "上传成功！",
                duration: 1000
            });
        },

        goto() {
            let link = document.getElementById("linkUrl");
            let fileName = "测试下载默认Excel"
            link.href = baseurl+'/jfzd/download?fileName=' + fileName;
            link.click();
        },
        handleExport(row){
            const url="../../../assets/logo.png"
            const options = {snapshotTime:formatDate(new Date(row.snapshotTime), 'yyyy-MM-dd hh:mm')}
            this.exportExcel(url,options)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },

        arrayPath(){
            return this.filePath.split("/").slice(1)
        },

        append(data) {
            var tmp_labe = ''
            this.create_dir = true
            console.log(1)
            console.log(this.tmp_new_dir.dir_name)
            console.log()
            tmp_labe = this.tmp_new_dir.dir_name
            console.log(tmp_labe)
            const newChild = { id: id++, label: tmp_labe, children: [] };
            if (!data.children) {
            this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },


        showFiles(data, node) {
            let route = [];
            while (node.parent !== null){
                route.push(node.label)
                node = node.parent
            }
            this.filePath = ""
            for (let i = route.length - 1; i >= 0 ; i--) {
                this.filePath = this.filePath + "/" + route[i]
            }
            console.log(this.filePath)
            // this.$axios({
            //     url:'/file/getFileList',
            //     method:'get',
            //     params:{
            //     course_ID:this.$route.params.course_id,
            //     path:this.filePath,
            //     }
            // }).then((response)=>{
            //     this.fileList = response.data
            // })
        },

        childrenFiles(data) {
            let result = [];
            for (let i = 0; i < data.length; i++) {
                result.push({
                label: data[i],
                });
            }
            return result;
        },
    }
}
</script>

<style lang="less" scoped>
.left {
    margin-top: 70px;
    float: left;
    margin-left: 5%;
    width: 30%;
}
.right {
    margin-top: 70px;
    float: right;
    width: 100%;
}
.el-table {
    // position: absolute;
    // left: 5%;
    // margin-top: 70px;
    width: 100%;
    float: right;
}
.el-table-column {
    width: 25%;
}
.upload-demo {

    // width: 300px;;
    width: 20% !important;
}

.upload-button {
    position: absolute;
    left: 5% !important;
    // margin-left: 0px !important;
}

.el-upload__tip{

    position: absolute;
    left: 5%;
    margin-top: 50px;;
}
.el-upload-list {
    background-color: black !important;
}
.demo-tree-render .ivu-tree-title{
        width: 100%;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    height: 50px !important;
}
.add-folder:hover {
    background: transparent;
    i {
        color: rgb(19, 150, 190) !important;
        font-weight: 1000;
    }
}
.add-folder:focus {
    background: transparent;
}
</style>