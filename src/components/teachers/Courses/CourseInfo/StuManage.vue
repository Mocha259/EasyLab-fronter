<template>
    <div class="container">
        <!-- 上面是教师 -->
        <div class="teachers">
            <h2>责任教师：{{resTeacher}}</h2>
            <el-divider></el-divider>
            <div style="height: 50px">
                <div style="float: left"><h2>授课教师：</h2></div>
                <div style="float: right;"><el-button type="primary"  @click="dialog_invite = true">邀请</el-button></div>
            </div>

            <div style="padding-left: 100px">
                <el-row :gutter="10">
                    <!-- 此处v-for要改 -->
                    <el-col :span="3.5" v-for="o in 3" :key="o">
                        <el-card style="width: 130px; height: 60px;">
                            <div style="float: left: width: 50%"></div>
                            <el-image
                            style="width: 55px; height: 55px; margin-top: -20px; margin-left: -15px; border-radius: 50%;"
                            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            fit="fit">
                            </el-image>
                            <div style="float: right; width: 50%; margin-top: 0px">
                                <h4>田同轩</h4>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            
            <el-dialog
            title="提示"
            :visible.sync="dialog_invite"
            width="50%"
            >
            <h3 class="tips">您可以邀请以下老师</h3>
            <span slot="footer" class="dialog-footer">
                <el-table
                    :data="teacherData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                </el-table>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialog_invite = false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <el-divider></el-divider>
        <div class="students">
            <div style="margin-bottom: 50px;">
                <el-button type="primary" @click="stuDialogVisible = true">导入学生名单</el-button>
                <el-dialog
                title="上传学生名单"
                :visible.sync="stuDialogVisible"
                width="30%"
                center>

                <el-upload
                class="upload-stu"
                drag
                accept=".xlsx,.xls"
                action="https://jsonplaceholder.typicode.com/posts/">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
                    </el-upload>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="stuDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="stuDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            
            <div>
                <el-table
                    :data="studentData"
                    height=""
                    border
                    style="width: 80%; position: relative; left: 10%">
                    <el-table-column
                    prop="id"
                    label="学号"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    label="编辑名单">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            resTeacher: '田同轩',
            allTeachers: ['田同轩1','田同轩2','田同轩3'],
            dialog_invite: false,
            stuDialogVisible: false,
            teacherData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            studentData: [{
                id: '1950081',
                name: '田同轩0',
                }
            ]
        }
    },
    methods: {
        invite(){
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        /// 获取这门课的所有教师
        getAllTeachers() {     
            console.log("function: getAllTeachers()")             
            var course_id = this.$route.query.course_id
            console.log("course_id: "+ course_id)
            var data = new FormData()
            this.$http({
                method: 'get',
                url: '/course/findAllAdvisorByCourseId/' + course_id,
                headers: { 'token': window.sessionStorage.getItem("token"), },
                // params: {
                //     course_id: course_id
                // }
            }).then(function (response) {
                console.log('response: ')
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });    
        },
        /// 获取这门课的所有学生
        getAllStudents() {
            console.log("----function: getAllTeachers()----")
            var course_id = parseInt(this.$route.query.course_id)
            console.log("course_id: "+ course_id)
            var data = new FormData()
            data.append('course_id', course_id)
            this.$http({
                methods: 'post',
                url: '/course/findAllStudentByCourseId',
                data : data,
                headers: {
                    'token': window.sessionStorage.getItem("token"),
                }
            }).then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });    
        }
    },
    mounted(){

        this.getAllTeachers()
        this.getAllStudents()
    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: rgb(248, 248, 246) !important;
}
.teachers {
    background-color: rgb(248, 248, 246);
}

/deep/ .el-collapse{
    width:50%;
    background-color: rgb(248, 248, 246) !important;
}
/deep/ .el-collapse-item {
    width: 100%;
    background-color: rgb(248, 248, 246) !important;
}
.tips {
    margin-top: -10px;
}
.el-table {
    margin-top: -30px;
}
</style>W