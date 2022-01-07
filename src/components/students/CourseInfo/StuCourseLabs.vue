<template>
    <div>
      <div style="height: 50px; width: 900px">
        <div style="float: left; width: 20%"><h1>课程实验</h1></div>
        
      </div>
      <el-divider></el-divider>
      <div>
      <el-row v-for="(exp, index) in expList" :key="index" style="margin-bottom: 20px">
        <el-col :span="5" v-for="o in exp" :key="o.title" :offset="2">
          <el-card style="height: 250px; width: 230px">
            <h3>{{o.title}}</h3>
            <el-divider></el-divider>
            <div style="">
              <div style="margin-bottom: 10px">发布日期：{{o.start_time}}</div>
              <div style="margin-bottom: 10px">截至日期：{{o.end_time}}</div>
              <div style="margin-bottom: 10px; overflow-y: hidden; height: 25px; width: 100%">实验简介：{{o.content}}</div>
              <div class="bottom clearfix" style="position: absolute; bottom: 10px; margin-left: 10px">
                <el-button type="primary" round @click="intoCertainLab">查看</el-button>
                <!-- <el-button type="danger" round>关闭</el-button> -->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      </div>

    </div>
</template>

<script>

export default ({
  data() {
    return {
       course_info: {
        course_id: "",
        course_name: "",
        course_state: true,
        course_cover:"",//加个默认图片
        course_intro:"",
      },
      expList: [[{title: '11', start_time: '1', end_time: '2', content: '1'}]],            // 这门课的实验列表
    }
  },
  methods: {
    intoCertainLab() {
      this.$router.push({
        path: '/StuLabs', 
        query: {course_info: JSON.stringify(this.course_info)}
      })
    },
    getCourseInfo() {
      this.course_info =JSON.parse(this.$route.query.course_info)
      console.log('course_id',this.course_id)
    },
    getAllLabs() {
      let self = this
      this.$http({
        method: 'get',
        url: '/experiment/findByCourseId/' + JSON.parse(this.$route.query.course_info).course_id,
        headers: { 'token': window.sessionStorage.getItem('token') }
      }).then((response) => {
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
