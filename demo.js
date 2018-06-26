 
var option = {
  title: {
      text: '动态数据',
      subtext: '纯属虚构'
  },
  legend: {
      data:['最新成交价']
  },
  tooltip: { //图标悬停的提示内容
    trigger: 'axis'
  },
  dataZoom: {
      show: false,
      start: 0,
      end: 100
  },
  xAxis: [
      {
          type: 'category',
          boundaryGap: false,
          data: (function (){
            var res = []
            var len = 10
            while (len--) {
                var now = moment().format('hh:mm:ss')
                res.unshift(now)
                now = new Date(now - 2000)
            }
            return res
        })()
      }
  ],
  yAxis: [
      {
          type: 'value',
          scale: true,
          name: '价格',
          max: 20,
          min: 0,
          boundaryGap: [0, '100%']
      }
  ],
  series: [
      {
          name:'最新成交价',
          type:'line',
          areaStyle: {},
          data:(function (){
            var res = []
            var len = 0
            while (len < 10) {
                res.push((Math.random()*10 + 5).toFixed(1) - 0)
                len++
            }
            return res
        })()
      }
  ]
}
var myChart = {}

new Vue({
  el: '#app',
  data: {
      timeId: '',
      timer: 2000,
      queueLenth: 5
  },
  mounted: function () {
    this.initEchart()
    this.setEchartsInterval()
    this.enterLeaveChange()
  },
  methods: {
    initEchart: function () {
      myChart = echarts.init(document.getElementById('main'))
    },
    setEchartsInterval: function () {
      this.timeId = setInterval(this.reloadData, this.timer)
    },
    reloadData:function () {
      var now = moment().format('hh:mm:ss')
      var data0 = option.series[0].data

      data0.shift()
      data0.push(Math.random() * 10 )

      option.xAxis[0].data.shift()
      option.xAxis[0].data.push(now)

      myChart.setOption(option)
    },
     enterLeaveChange:function () {
       var app = document.getElementById('main')
       var that = this
       app.onmouseenter = function () {
        clearInterval(that.timeId)
       }
       app.onmouseleave = function () {
        that.setEchartsInterval()
       }
     }
  }
})