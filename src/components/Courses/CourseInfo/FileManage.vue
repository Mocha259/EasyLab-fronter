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

        <!-- <el-upload
        ref="upload"
        class="upload-demo"
        :headers="headers"
        action="#"
        :show-file-list="false"
        multiple 
        :auto-upload="false"
        :on-change="handleChange">
            <el-button size="big" type="primary" class="upload-button">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">文件大小不能超过50M</div>
        </el-upload>
        <br>-->
        <div class="left" style="float: left; width: 20%">
            <!-- <el-tree
                :data="data"
                node-key="id"
                default-expand-all
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                draggable
                :allow-drop="allowDrop"
                :allow-drag="allowDrag">
            </el-tree> -->
            <Tree :data="data5" :render="renderContent" class="demo-tree-render"></Tree>

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
                <!-- <template slot-scope="scope">
                    <span v-if="scope.row.attachSize / 1024 / 1024 < 1">{{(scope.row.attachSize / 1024).toFixed(2) + 'KB'}}</span>
                    <span v-else>{{(scope.row.attachSize / 1024 / 1024).toFixed(2) + 'MB'}}</span>
                </template> -->



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
       
        
    </div>
</template>

<script>
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
                    label: '二级 3-2',
                    children: [{
                    id: 11,
                    label: '三级 3-2-1'
                    }, {
                    id: 12,
                    label: '三级 3-2-2'
                    }, {
                    id: 13,
                    label: '三级 3-2-3'
                    }]
                }]
            }],
            data5: [
                {
                    title: 'parent 1',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-add',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '64px'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    children: [
                        {
                            title: 'child 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    expand: true
                                },
                                {
                                    title: 'leaf 1-1-2',
                                    expand: true
                                }
                            ]
                        },
                        {
                            title: 'child 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                    expand: true
                                },
                                {
                                    title: 'leaf 1-2-1',
                                    expand: true
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonProps: {
                type: 'default',
                size: 'small',
            }
        }
    },
    methods: {
         handleDragStart(node, ev) {
            console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner';
            } else {
            return true;
            }
        },
        allowDrag(draggingNode) {
            return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
        },
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
        }
        ,
                    renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
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
    // position: absolute;
    // left: 0%;
    // width: 200px;
    // margin-bottom: 10px;
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
</style>