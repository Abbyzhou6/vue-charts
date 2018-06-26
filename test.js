var option = {
  title: { //标题
    text: '动态数据',
    suntext: '纯属虚构',
    x: 'left'
  },
  legend: { //图例
    data: ['成交价', '预购队列']
  },
  tooltip: { //图标悬停的提示内容
    trigger: 'axis'
  },
  dataZoom: { //数据区域缩放,数据展现范围选择
    show: false, //	是否显示，当show为true时则接管使用指定类目轴的全部系列数据，如不指定则接管全部直角坐标系数据。
    start: 0, //	数据缩放，选择起始比例，默认为0（%），从首个数据起选择。
    end: 100 //数据缩放，选择结束比例，默认为100（%），到最后一个数据选择结束。
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: []
    }
  ],
  yAxis: [{ //  y轴
    type: 'value',
    name: '销售金额',
    scale: true,
    min:0,
    max:30,
    boundaryGap: [0.2, 0.2]
  }],
  series: [{
    name: '最新成交价',
    animation:false,
    type: 'line',
    data: []
  }]
}

new Vue({
  el: '#app',
  data: {
    timeId: '',
    timer: 2000,
    queueLenth: 10,
    queuerRes: [],
    count: 0
  },
  mounted: function () {
    this.initEchart()
    this.setEchartsInterval()
  },
  methods: {
    initEchart: function () {
      myChart = echarts.init(document.getElementById('main'))
    },
    setEchartsInterval: function () {
      this.timeId = setInterval(this.reloadData, this.timer)
    },
    setOption: function (xAxis, series) {
      // option = {
      //   title: { //标题
      //     text: '动态数据',
      //     suntext: '纯属虚构',
      //     x: 'left'
      //   },
      //   legend: { //图例
      //     data: ['成交价', '预购队列']
      //   },
      //   tooltip: { //图标悬停的提示内容
      //     trigger: 'axis'
      //   },
      //   dataZoom: { //数据区域缩放,数据展现范围选择
      //     show: false, //	是否显示，当show为true时则接管使用指定类目轴的全部系列数据，如不指定则接管全部直角坐标系数据。
      //     start: 0, //	数据缩放，选择起始比例，默认为0（%），从首个数据起选择。
      //     end: 100 //数据缩放，选择结束比例，默认为100（%），到最后一个数据选择结束。
      //   },
      //   xAxis: xAxis,
      //   yAxis: [{ //  y轴
      //     type: 'value',
      //     name: '销售金额',
      //     scale: true,
      //     min:0,
      //     max:30,
      //     boundaryGap: [0.2, 0.2]
      //   }],
      //   series: series
      // }

      myChart.setOption(option)
    },
    pushData: function () {
      var now = moment().format('hh:mm:ss')
      var value = parseInt(Math.random()*10)
        this.queuerRes.push({
          'x': now,
          'y': value,
          count: this.count
        })

        if(this.queuerRes.length > this.queueLenth){
          this.queuerRes.shift()
        }
        
        this.count++

        console.log(this.queuerRes.map((item) => {
          return item.count
        }))
    },
    reloadData: function () {
      var d1 = option.xAxis[0].data
      var d2 = option.series[0].data

      var now = moment().format('hh:mm:ss')
      var value = parseInt(Math.random()*10)

      d1.push(now)
      d2.push(value)

      if(d1.length > this.queueLenth){
        d1.shift()
        d2.shift()
      }

      // this.pushData()

      // var x = this.queuerRes.map(function (item) {
      //   return item.x
      // })
      // var y = this.queuerRes.map(function (item) {
      //   return item.y
      // })

      // var xAxis = [{
      //   type: 'category',
      //   boundaryGap: true,
      //   data:  x
      // }]
      // var series = [{
      //   name: '最新成交价',
      //   animation:false,
      //   type: 'bar',
      //   data: y
      // }]
  
      // if(this.queuerRes.length > this.queueLenth){
      //   // console.log(this.queueLenth)
      //     // this.queuerRes.shift()
         
       
        
        // xAxis[0].data.shift()
        // xAxis[0].data.push(1)

        // series[0].data.push( Math.random() * 10 )
        // series[0].data.shift() 
      //   this.queuerRes.shift()
      //   // this.queuerRes.slice(this.queueLenth-5,5)
        
      // }
      // this.setOption(xAxis, series)
      myChart.setOption(option)
    },
    stopSetInterval: function () {
      console.log('start')
      clearInterval(this.timeId)
    }
  }
})