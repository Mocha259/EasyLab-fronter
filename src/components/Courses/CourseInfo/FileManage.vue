<template>
    <div>
         <el-upload
         ref="upload"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
       :on-success="handleAvatarSuccess"
        :show-file-list="false">
            <el-button size="big" type="primary" class="upload-button">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">文件大小不能超过50M</div>
        </el-upload>
        <br>
        <div>
       <el-table :data="fileList">

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
        </el-table></div>
       
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: [{
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
            // fileList: [],
            dataForm: {
                id: 0,
                noticeId: '',
                attachName: '',
                attachUrl: '',
                attachSize: '',
                },
            dataList: [],

        }
    },
    methods: {
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

    }
}
</script>

<style lang="less" scoped>
.el-table {
    position: absolute;
    left: 5%;
    margin-top: 70px;
    width: 88%;
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
</style>