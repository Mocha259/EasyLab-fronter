<template>
  <div>
    成绩管理模块
    <div id="scoreChart" style="width: 800px; height: 600px"></div>
    <el-divider></el-divider>
    <div style="margin-top: 30px; margin-left: 40%">
      <span>
        <el-button type="primary">设置成绩占比</el-button>
        <el-button type="success">计算学生成绩</el-button>
      </span>
    </div>



  </div>
</template>

<script>
export default {
  data() {
    return {
      scoreData: [
        {name: '考勤',  value: 100},
        {name: '报告1', value: 150},
        {name: '报告2', value: 150},
        {name: '报告3', value: 300},
        {name: '报告4', value: 400},
      ]  
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
            // data: this.scoreData.map(item => {
            //   return itme.name
            // })
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
              center: ['75%', '50%'],
              roseType: 'area',
              data: this.scoreData
          }
        ]
      };// end option
      myChart.setOption(partRateOption)
    }
  },
  mounted() {
    this.drawScorePartRate()
  }
}
</script>