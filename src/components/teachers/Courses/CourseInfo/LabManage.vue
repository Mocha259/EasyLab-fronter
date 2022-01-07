<template>
    <div>
      <div style="height: 50px; width: 900px">
        <div style="float: left; width: 20%"><h1>实验管理</h1></div>
        <div style="float: right; width: 80%;"><el-button style="position: absolute; right: 30px" @click="addLabDialog = true">添加实验</el-button></div>
        
      </div>
      <el-divider></el-divider>
      <div>
      <el-row v-for="(exp, index) in expList" :key="index" style="margin-bottom: 20px">
        <el-col :span="5" v-for="o in exp" :key="o.experiment_id" :offset="2">
          <el-card style="height: 250px; width: 230px">
            <h3>{{o.title}}</h3>
            <el-divider></el-divider>
            <div style="">
              <div style="margin-bottom: 10px">发布日期：{{o.start_time}}</div>
              <div style="margin-bottom: 10px">截至日期：{{o.end_time}}</div>
              <div style="margin-bottom: 10px; overflow-y: hidden; height: 25px; width: 100%">实验简介：{{o.content}}</div>
              <div class="bottom clearfix" style="position: absolute; bottom: 10px; margin-left: 10px">
                <el-button type="primary" round @click="intoCertainLab(o.experiment_id)">查看</el-button>
                <el-button type="danger" round>关闭</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      </div>

      <el-dialog
        title="提示"
        :visible.sync="addLabDialog"
        width="30%"
        center>
        <el-form ref="form" :model="addLabForm" label-width="80px">
          <el-form-item label="实验名称">
            <el-input v-model="addLabForm.title"></el-input>
          </el-form-item>
  

          <el-form-item label="实验时间">
            <el-col :span="11">
              <el-date-picker
                v-model="addLabForm.dateRange"
                value-format="yyyy-MM-dd"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
          </el-form-item>


          <el-form-item label="实验说明">
            <el-input v-model="addLabForm.content"></el-input>
          </el-form-item>


          <el-form-item label="实验状态">
            <el-switch v-model="addLabForm.enable"></el-switch>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addLabDialog = false">取 消</el-button>
          <el-button type="primary" @click="addLab">确 定</el-button>
        </span>
      </el-dialog>



    </div>
</template>

<script>

export default ({
  data() {
    return {
      course_id: '',
      course_name: '',
      course_info: {},
      expList: [[]],            // 这门课的实验列表
      addLabDialog: false,
      addLabForm: {           // 添加实现的表单信息
        title: '',            // 实验名称
        start_time: '',       // 开始时间
        end_time:'',          // 结束时间
        content:'',           // 实验评论
        enable:true,          // 实验状态，默认为true
        dateRange: []         // 用来接收开始时间和结束时间
      },
    }
  },
  methods: {
    intoCertainLab(id) {
      console.log(id)
      this.$router.push({
        path: '/Experiment', 
        query: {course_info: this.course_info,experiment_id:id}
      })
    },
    getCourseInfo() {
      this.course_info = JSON.parse(this.$route.query.course_info)
      console.log('lab',this.$route.query.course_info)
    },
    /// 添加实验
    addLab() {                
      
      let self = this
      Date.prototype.format = function(fmt) { 
        var o = { 
          "M+" : this.getMonth()+1,                 //月份 
          "d+" : this.getDate(),                    //日 
          "h+" : this.getHours(),                   //小时 
          "m+" : this.getMinutes(),                 //分 
          "s+" : this.getSeconds(),                 //秒 
          "q+" : Math.floor((this.getMonth()+3)/3), //季度 
          "S" : this.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
        }
        return fmt; 
      }

      this.addLabForm.start_time = new Date(this.addLabForm.dateRange[0]).format('yyyy-MM-dd')
      this.addLabForm.end_time   = new Date(this.addLabForm.dateRange[1]).format('yyyy-MM-dd')
      console.log(this.addLabForm.start_time)
      this.$http({
        method: 'post',
        url: '/experiment/addExperiment',
        data: JSON.stringify({
          title: self.addLabForm.title,
          start_time: self.addLabForm.start_time,
          end_time: self.addLabForm.end_time,
          course_id: parseInt(self.course_info.course_id),
          content: self.addLabForm.content,
          enable: self.addLabForm.enable
        }),
        headers: { 
          'token': window.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        if(response.data.success){
          self.addLabDialog = false
          self.$message.success('实验发布成功')
          self.getAllLabs()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    getAllLabs() {
      // console.log(this.expList)
      this.expList.splice(0)
      let self = this
      // this.expList.splice(0)
      this.$http({
        method: 'get',
        url: '/experiment/findByCourseId/' + self.course_info.course_id,
        headers: { 'token': window.sessionStorage.getItem('token') }
      }).then((response) => {
        console.log(response.data)

        var tmp = 0
        self.expList[tmp] = new Array()
        var last = parseInt(response.data.data.experimentList.length / 3)
        for(var i = 0; i < last; i++){
          var tmp_list = []
          for(var j = 0; j < 3; j++){
            tmp_list.push(response.data.data.experimentList[i*3 + j])
          }
          self.expList.push(tmp_list)
        }
        var last_list = []
        for(var i = (last * 3); i < response.data.data.experimentList.length; i++){
          last_list.push(response.data.data.experimentList[i])
        }
        self.expList.push(last_list)

        for(var i = 0; i < self.expList.length; i++){
          for(var j = 0; j < self.expList[i].length; j++){
            self.expList[i][j].start_time = self.expList[i][j].start_time.slice(0, 10)
            self.expList[i][j].end_time = self.expList[i][j].end_time.slice(0, 10)
          }
        }
      })

    }
  },
  mounted() {
    this.getCourseInfo()
    this.getAllLabs()
  }
})
</script>

<style lang="less" scoped>

</style>
