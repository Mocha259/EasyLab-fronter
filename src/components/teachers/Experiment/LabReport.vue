<template>
  <div style="width: 1100px">
    <el-container direction="vertical" style="width: 100%; margin-top: 20px">
      <el-row>
        <el-col :span="12">
            <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :auto-upload="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :file-list="fileList"
          :limit="1"
          accept=".doc,.txt,.docx,.pdf"
          multiple
        >
          <el-button slot="trigger" size="medium" type="primary">上传实验报告模板</el-button>
          <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">确认上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传doc,docx,txt,pdf文件，且不超过500kb
          </div>
        </el-upload>
        </el-col>
      </el-row>
      

      <el-divider></el-divider>

      <h3>报告提交情况</h3>
      <el-table
        :data="stuReportData"
        style="width: 80%; margin-left: 10%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="id" label="学号" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="date" label="提交时间" sortable>
        </el-table-column>

        <el-table-column prop="state" sortable="" label="提交状态">
          <template slot-scope="scope">
            <div v-if="scope.row.state">
              <el-tag type="success">已提交</el-tag>
            </div>
            <div v-else>
              <el-tag type="danger">未提交</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column width="180" label="">
          <template slot-scope="scope">
            <div v-if="scope.row.state">
              <span>
                <el-button type="text">下载</el-button>
                <el-button type="text">预览</el-button>
                <el-button type="text" @click="scoreReport(scope.row)"
                  >评分</el-button
                >
              </span>
            </div>
            <div v-else>
              <el-button type="text" :disabled="!scope.row.state"
                >下载</el-button
              >
              <el-button type="text" :disabled="!scope.row.state"
                >预览</el-button
              >
              <el-button type="text" @click="scoreReport(scope.row)"
                >评分</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stuReportData: [
        { id: "1950081", name: "田同轩", date: "2021-11-22", state: false },
        { id: "1950082", name: "小红", date: "2021-11-21", state: true },
        { id: "1950083", name: "张三", date: "2021-11-23", state: false },
        { id: "1950083", name: "张建国", date: "2021-11-23", state: true },
      ],
       fileList: [],
       experiment_id:'',
    };
  },
  methods: {
    /// 获取所有学生的实验报告以及实验报告提交情况
    getAllStudentReports() {},

    /// 为实验报告打分
    scoreReport(row) {
      console.log(row);
    },

     submitUpload() {
            let self = this
            var data=new FormData()
            data.append('file', this.fileList[0].raw)
            data.append('experiment_id',this.experiment_id )
            
            var config = {
                method: 'post',
                url: '/experiment/uploadTemplate',
                data : data,
                headers: {
                    'token': window.sessionStorage.getItem("token")
                }
            }
            this.$http(config)
            .then(function (response) {
              console.log(response)
                if(response.data.success){
                  var newFileList=[];
                  newFileList.push({
                    name:self.fileList[0].name,
                    url:response.data.data.fileUploadResult.fileUrl
                  })
                   self.fileList=newFileList;
                    self.$message.success('文件上传成功！')
                }else{
                    self.fileList=[];
                    self.$message.error('文件上传失败，请重试！')   
                }
            })
            .catch(function (error) {
              self.fileList=[];
               self.$message.error('请求失败')   
            });    
      },
      handleChange(file,fileList){
        this.fileList = fileList;
      },
      handleRemove(file, fileList) {
            let self = this
            var exp_id=this.experiment_id
            var config = {
                method: 'get',
                url: '/experiment/deleteTemplate/'+exp_id,
                headers: {
                    'token': window.sessionStorage.getItem("token")
                }
            }
            this.$http(config)
            .then(function (response) {
              console.log(response)
                if(response.data.success){
                self.$message.success("已移除实验模板")
                }else{
                   self.$message.error("移除失败")
                }
            })
            .catch(function (error) {
              self.$message.error("移除失败")
            });    
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`只能选择一个文件,若更改，请先移除原文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除模板 ${ file.name }？`);
      },
      getTemplate(){//获取已有模板
        let self = this
            var exp_id=this.$route.query.experiment_id
            var config = {
                method: 'get',
                url: '/experiment/findByExperimentId/'+exp_id,
                headers: {
                    'token': window.sessionStorage.getItem("token")
                }
            }
            this.$http(config)
            .then(function (response) {
              console.log(response)
                if(response.data.success){
                  if(response.data.data.experiment.templdate_name!=null){
                 self.fileList.push({name:response.data.data.experiment.template_name,
                 url:response.data.data.experiment.template})
                 }else{
                   self.fileList=[];
                 }
                }
            })
            .catch(function (error) {
              self.fileList=[];
            });    
      }
  },
  mounted() {
   this.experiment_id=this.$route.query.experiment_id
   this.getTemplate();
   }
};
</script>