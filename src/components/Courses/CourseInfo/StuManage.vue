<template>
    <div class="container">
        <!-- 上面是教师 -->
        <div class="teachers">
            <h2>责任教师：{{resTeacher}}</h2>
            <el-divider></el-divider>
            <div>
                <h2>授课教师：</h2><el-button type="primary" style="float:right;" @click="dialogVisible = true">邀请</el-button>
                <h3 v-for="teacher in allTeachers" :key="teacher" style="position: relative; left: 9%; ">        {{teacher}}</h3>
            </div>
            
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <h3 class="tips">您可以邀请以下老师</h3>
            <span slot="footer" class="dialog-footer">
                <el-table
                    :data="tableData"
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
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <el-divider></el-divider>
        <div class="students">
            <h2>学生名单：</h2>
        </div>
        <!-- 下面是学生 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            resTeacher: '田同轩',
            allTeachers: ['田同轩1','田同轩2','田同轩3'],
            dialogVisible: false,
             tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      
        }
    },
    methods: {
        invite(){

        }

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