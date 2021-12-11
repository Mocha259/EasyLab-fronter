<template>
    <div>
      <div style="height: 50px; width: 900px">
        <div style="float: left; width: 20%"><h1>实验管理</h1></div>
        <div style="float: right; width: 80%;"><el-button style="position: absolute; right: 30px">添加实验</el-button></div>
        
      </div>
      <el-divider></el-divider>
      <div>
      <el-row v-for="exp in expList" :key="exp" style="margin-bottom: 20px">
        <el-col :span="5" v-for="o in exp" :key="o" :offset="2">
          <el-card style="height: 250px; width: 230px">
            <h3>{{o.name}}</h3>
            <el-divider></el-divider>
            <div style="">
              <div>发布日期：{{o.startTime}}</div>
              <div>截至日期：{{o.endTime}}</div>
              <div class="bottom clearfix" style="position: absolute; bottom: 10px; margin-left: 10px">
                <time class="time">{{ currentDate }}</time>
                <el-button type="primary" round>查看</el-button>
                <el-button type="danger" round>删除</el-button>
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
      expList: [
        [{name: '帧中继实验1',
           startTime: '',
           endTime: ''
          },{name: '帧中继实验2',
           startTime: '',
           endTime: ''
          },{name: '帧中继实验3',
           startTime: '',
           endTime: ''
          }
        ],[{name: 'NAT1',
           startTime: '',
           endTime: ''
          },{name: 'NAT2',
           startTime: '',
           endTime: ''
          },{name: 'NAT3',
           startTime: '',
           endTime: ''
          }
        ],[{name: 'UDP1',
           startTime: '',
           endTime: ''
          },{name: 'UDP2',
           startTime: '',
           endTime: ''
          }
        ],
      ]
    }
  }
})
</script>

<style lang="less" scoped>

</style>
