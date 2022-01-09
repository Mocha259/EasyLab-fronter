<template>
  <div>
    <div style="height: 430px">
      <div id="scoreChart" style="width: 600px; height: 400px; float:left"></div>
      <div style="float: right; width: 200px; margin-right: 200px">
        <div>
          <el-button type="primary" @click="setScore">设置成绩占比</el-button>
        </div>
        <div style="margin-top: 50px">
          <el-button type="success" @click="postStudentScore">计算学生成绩</el-button>
        </div>
        
      </div>
    </div>
    
    <el-divider></el-divider>
    <div style="margin-top: 30px; margin-left: 40%">
      <span>
        
      </span>
    </div>
    <div>

        <el-table
          :data="stuScoreList"
          style="width: 70%; margin-left: 15%"
          :default-sort = "{prop: 'student_id', order: 'descending'}"
          >
          <el-table-column
            prop="student_id"
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
            prop="score"
            sortable
            label="成绩"
            >
          </el-table-column>

          <el-table-column
            prop=""
            label="等第"
            >
             <template slot-scope="scope">
              <div v-if="scope.row.score >= 90">
                 <el-tag  type="success">优秀</el-tag>
              </div>
              <div v-if="scope.row.score >= 80 && scope.row.score < 90">
                 <el-tag >良好</el-tag>
              </div>
              <div v-if="scope.row.score >= 70 && scope.row.score < 80">
                 <el-tag type="info">中等</el-tag>
              </div>
              <div v-if="scope.row.score >= 60 && scope.row.score < 70">
                 <el-tag type="warning">及格</el-tag>
              </div>
              <div v-if="scope.row.score < 60">
                 <el-tag type="danger">不及格</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>

    </div>

    <el-dialog
      title="成绩设置"
      :visible.sync="setScoreDialog"
      width="30%"
      center>
      <div v-for="item in scoreList" :key="item.name" style="height: 40px; margin-bottom: 20px">
        <span style="">
          <div style="float: left; width: 20%; margin-top: 10px">{{item.name}}占比</div>
          <div style="float: right; width: 80%">
            <el-input placeholder="" v-model="item.rate" style="width: 50%;">
              <template slot="append">%</template>
            </el-input>
          </div>
         
        </span>
          
      </div>
        
      <span slot="footer" class="dialog-footer">
        <el-button @click="setScoreDialog = false">取 消</el-button>
        <el-button type="primary" @click="checkScoreRate">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      setScoreDialog: false,
      scoreList: [],          //参与评分项
      scoreCount: 0,          // 参与评分项的数量
      stuScoreList: [],          // 
    }
  },
  methods: {
    drawScorePartRate() {
      let myChart = this.$echarts.init(document.getElementById('scoreChart'))
      let partRateOption = {
        title: {
            text: '成绩各部分占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}占比: {d}%'
        },
        legend: {
            left: 'center',
            top: 'bottom',
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
          {
              name: '面积模式',
              type: 'pie',
              radius: [30, 110],
              center: ['40%', '50%'],
              roseType: 'area',
              data: this.scoreList.map(item => {
                return {name: item.name, value: item.rate * 10}
              })
          }
        ]
      };// end option
      myChart.setOption(partRateOption)
    },
    /// 设置成绩占比
    setScore() {
      this.setScoreDialog = true
    },

    /// 检查成绩占比是否是100%
    checkScoreRate() {
      var num = 0
      console.log(this.scoreList)
      for(var i = 0; i < this.scoreList.length; i++){
        num += parseInt(this.scoreList[i].rate)
      }
      console.log(num)
      if(num == 100){
        /// 向后端发请求
        this.$message.success('成绩占比设置成功')
        this.setScoreDialog = false
        this.drawScorePartRate()
      }else{
        this.$message.error('请检查成绩占比，总占比应为100%')
      }
    },

    /// 生成所有学生的成绩
    postStudentScore() {
      let self = this
      console.log(this.scoreList[0]['rate']);
      var signRatio=this.scoreList[0]['rate']/100;
      var signList=[];
      for(var i=1;i<this.scoreList.length;i++){
        signList.push(this.scoreList[i]['rate']/100)
      }
      var course_id=parseInt(JSON.parse(this.$route.query.course_info).course_id);
      console.log(signRatio,signList,course_id)
      this.$http({
        method: 'post',
        url: '/score/computeScore',
        data: JSON.stringify({
          signRatio:signRatio,
          ratioList:signList,
          course_id:course_id
        }),
        headers: { 
        'token': window.sessionStorage.getItem('token'),
        'Content-Type': 'application/json' }
      }).then(response => {
        console.log(response.data)
        if(response.data.success){
          self.$message.success("成绩计算成功！");
        }else{
          self.$message.error("设置有误，请重新设置！");
        }
      }).catch(error=>{
          self.$message.error("设置有误，请重新设置！");
      })
    },

    /// 获取所有课程评分项并默认均分比例
    getAllTobeSocred() {
      let self = this
      this.$http({
        method: 'get',
        url: '/experiment/findByCourseId/' + JSON.parse(self.$route.query.course_info).course_id,
        headers: { 'token': window.sessionStorage.getItem('token') }
      }).then((response) => {
        console.log(response.data)
        self.scoreCount = response.data.data.experimentList.length + 1 /// +1是要加上考勤
        var avgRate = parseFloat(100 / self.scoreCount)
        console.log(avgRate)
        self.scoreList.splice(0)
        self.scoreList.push({name: '考勤', rate: avgRate})
        for(var i = 0; i < response.data.data.experimentList.length; i++){
          self.scoreList.push({name: response.data.data.experimentList[i].title, rate: avgRate})
        }
        self.drawScorePartRate()                                      /// 重新绘制饼图
      })
    },
    
    /// 获得所有学生成绩
    getAllStudentScore() {
      let self = this
      var data = new FormData()
      data.append('course_id', JSON.parse(self.$route.query.course_info).course_id)
      this.$http({
        method: 'post',
        data: data,
        url: '/score/getAllStuScore',
        headers: { 'token': window.sessionStorage.getItem('token') }
      }).then(res => {
        console.log(res.data.data.stuScoreList)
        self.stuScoreList = res.data.data.stuScoreList
      }).catch(err => {console.log(err)})
    }
  },
  mounted() {
    this.drawScorePartRate()
    this.getAllTobeSocred()
    this.getAllStudentScore()
    // console.log(JSON.parse(this.$route.query.course_info).course_id)
  }
}
</script>