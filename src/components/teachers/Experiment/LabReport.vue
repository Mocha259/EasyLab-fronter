<template>
  <div style="width: 1100px">
    <el-container direction="vertical" style="width: 100%; margin-top: 20px">
    <el-button style="width: 15%; margin-bottom: 0px" type="primary">上传实验报告模板</el-button>
    <el-divider></el-divider>
    <h3>报告提交情况</h3>
    <el-table
      :data="stuReportData"
      style="width: 80%; margin-left: 10%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="id"
        label="学号"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="提交时间"
        sortable
        >
      </el-table-column>

      <el-table-column
        prop="state"
        sortable=""
        label="提交状态"
        >
         <template slot-scope="scope">
            <div v-if="scope.row.state">
                <el-tag type="success">已提交</el-tag>
            </div>
            <div v-else>
                <el-tag type="danger">未提交</el-tag>
            </div>
        </template>
        
      </el-table-column>

      <el-table-column
      width="180"
      label="">
          <template slot-scope="scope">
            <div v-if="scope.row.state">
               <span>
                 <el-button type="text">下载</el-button>
                 <el-button type="text">预览</el-button>
                 <el-button type="text" @click="scoreReport(scope.row)">评分</el-button>
                </span>
            </div>
            <div v-else >
                <el-button  type="text" :disabled="!scope.row.state">下载</el-button>
                 <el-button type="text" :disabled="!scope.row.state">预览</el-button>
                 <el-button type="text" @click="scoreReport(scope.row)">评分</el-button>
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
        { id: '1950081', name: '田同轩', date: '2021-11-22', state: false },
        { id: '1950082', name: '小红', date: '2021-11-21', state: true } ,
        { id: '1950083', name: '张三', date: '2021-11-23', state: false },
        { id: '1950083', name: '张建国', date: '2021-11-23', state: true }
      ],
    }
  },
  methods: {
    /// 获取所有学生的实验报告以及实验报告提交情况
    getAllStudentReports() {

    },

    /// 为实验报告打分
    scoreReport(row) {
      console.log(row)
    }
  },
  mounted() {
    
  }
}
</script>