<template>
    <div class="container">
        <!-- 上面是教师 -->
        <div class="teachers">
            <h2>责任教师：{{resTeacher}}</h2>
            <el-divider></el-divider>
            <el-container direction="horizonal" style="height: 100px">
                <!-- <div style="float: left"><h2>授课教师：</h2></div>
                <div style="float: right;"><el-button type="primary"  @click="inviteOtherTeachers">邀请</el-button></div> -->
                
                <div style="width: 50%">
                    <h2>授课教师<el-button type="primary" style="margin-left: 60%" @click="inviteOtherTeachers">邀请新教师</el-button></h2>
                    <el-container style="margin-top: 5px">

                        <el-card  v-for="o in allTeachers" :key="o.advisor_id" style="width: 130px; height: 60px; margin-left: 5px; border-radius: 30px">
                                <div style="float: left: width: 50%"></div>
                                <el-image
                                style="width: 55px; height: 55px; margin-top: -18px; margin-left: -15px; border-radius: 50%;" 
                                :lazy="true"
                                :src="o.avatar"
                                fit="fit">
                                </el-image>
                                <div style="float: right; width: 50%; margin-top: 0px">
                                    <h4>{{o.name}}</h4>
                                </div>
                        </el-card>
                        
                    </el-container>

                </div>


                <div style="width: 50%">
                    <h2>课程助教<el-button type="primary" style="margin-left: 60%" @click="inviteOtherTeachers">邀请新助教</el-button></h2>
                    <el-container style="margin-top: 5px">

                        <el-card  v-for="o in allAssistants" :key="o.advisor_id" style="width: 130px; height: 60px; margin-left: 5px; border-radius: 30px">
                                <div style="float: left: width: 50%"></div>
                                <el-image
                                style="width: 55px; height: 55px; margin-top: -18px; margin-left: -15px; border-radius: 50%;"
                                :lazy="true"
                                :src="o.avatar"
                                fit="fit">
                                </el-image>
                                <div style="float: right; width: 50%; margin-top: 0px">
                                    <h4>{{o.name}}</h4>
                                </div>
                        </el-card>
                        
                    </el-container>
                </div>


            </el-container>

          
            
            <el-dialog
            title="提示"
            :visible.sync="dialog_invite"
            width="50%"
            >
            <h3 class="tips">您可以邀请以下老师</h3>
            <span slot="footer" class="dialog-footer">
                <el-table
                    v-loading="loading"
                    element-loading-text="拼命邀请中"
                    :data="otherTeacherData"
                    height="250"
                    border
                    style="width: 100%; margin-bottom: 10px">
                    <el-table-column
                    prop="advisor_id"
                    label="教工号"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    width="200"
                    label="邮箱">
                    </el-table-column>
                    <el-table-column
                    label="邀请">
                    <template slot-scope="scope">
                        <el-button @click="inviteCertainTeacher(scope.row, 2)">邀请成为教师</el-button>
                        <el-button @click="inviteCertainTeacher(scope.row, 3)">邀请成为助教</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-button @click="dialog_invite = false">取 消</el-button>
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
                :file-list="fileList"
                center>

                <el-upload
                class="upload-stu"
                drag
                accept=".xlsx,.xls"
                action="#">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
                    </el-upload>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="stuDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="uploadStudentList">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            
            <div>
                <el-table
                    :data="studentData"
                    
                    border
                    style="width: 80%; position: relative; left: 10%">
                    <el-table-column
                    prop="student_id"
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
            loading:false,
            value: '',
            resTeacher: '田同轩',
            allTeachers: [],            // 所有教师
            allAssistants: [],          // 所有助教
            dialog_invite: false,
            stuDialogVisible: false,
            otherTeacherData: [],       // 课程外的所有历史
            studentData: [],            // 课程的所有学生
            fileList: []                // 上传学生名单
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
            let self = this        
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

                console.log(response.data.data.advisorList)
                self.allTeachers.splice(0)
                self.allTeachers = response.data.data.advisorList
            })
            .catch(function (error) {
                console.log(error);
            });    
        },
        /// 获取这门课的所有助教
        getAllAssistants() {
            let self = this        
            var course_id = this.$route.query.course_id
            console.log("course_id: "+ course_id)
            var data = new FormData()
            this.$http({
                method: 'get',
                url: '/course/findAllAssistantByCourseId/' + course_id,
                headers: { 'token': window.sessionStorage.getItem("token"), },
            }).then(function (response) {

                console.log(response.data.data.assistantList)
                self.allAssistants.splice(0)
                self.allAssistants = response.data.data.assistantList
            })
            .catch(function (error) {
                console.log(error);
            });    
        },
        /// 获取这门课的所有学生
        getAllStudents() {
            let self = this
            var course_id = parseInt(this.$route.query.course_id)
            console.log("course_id: "+ course_id)
            var data = new FormData()
            data.append('course_id', course_id)
            this.$http({
                method: 'post',
                url: '/course/findAllStudentByCourseId',
                data : data,
                headers: {
                    'token': window.sessionStorage.getItem("token"),
                }
            }).then(function (response) {
                console.log(response.data)
                self.studentData = response.data.data.studentList

            })
            .catch(function (error) {
                console.log(error);
            });    
        },
        /// 获取不在这门课的所有老师
        inviteOtherTeachers() {
            let self = this
            this.$http({
                method: 'get',
                url: '/course/findAllAdvisorNotInCourse/' + self.$route.query.course_id,
                headers: { 'token': window.sessionStorage.getItem("token") }
            }).then(response => {
                console.log(response.data.data.advisorList)
                if(response.data.success){
                    self.otherTeacherData = response.data.data.advisorList
                    self.dialog_invite = true

                }
            }).catch(error => {
                console.log(error)
            })
        },
        /// 邀请具体某位教师
        inviteCertainTeacher(row, type) {
            this.loading=true;
            let self = this
            // 2是 3是教师
            console.log(type)
            var data = new FormData()
            data.append('to_teacher_id', row.advisor_id)
            data.append('course_id', parseInt(this.$route.query.course_id))
            data.append('advise_type', type)
            this.$http({
                method: 'post',
                url: '/course/inviteTeacher',
                data: data,
                headers: { 'token': window.sessionStorage.getItem('token') }
            }).then(response => {
                console.log(response)
                if(response.data.success){
                   self.$message.success("邀请成功！")
                   self.dialog_invite = false;
                   self.getAllTeachers();
                   self.getAllAssistants();
                   self.loading=false;
                }
            })

        },
        /// 上传学生名单
        uploadStudentList() {
            let self = this
            var data=new FormData()
            data.append('file', this.fileList[0].raw)

            this.$http({
                method: 'post',
                data: data,
                headers: { 'token': window.sessionStorage.getItem('token') }
            }).then(response => {
                console.log(response)
            })
        }
    },
    mounted(){

        this.getAllTeachers()
        this.getAllStudents()
        this.getAllAssistants()
    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: rgb(255, 255, 255) !important;
}
.teachers {
    background-color: rgb(255, 255, 255);
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
</style>