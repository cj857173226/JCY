<template>
  <div id="pieChart_main" style="width: 100%;height:400px;"></div>
</template>

<script>
  export default {
    name: "pie-chart",
    data() {
      return {
        optionData: ""
      }
    },
    methods : {
      //图表初始化
      initChart() {
        let myChart = echarts.init(document.getElementById('pieChart_main'));
        let  option =  this.getOption();
        myChart.setOption(option);
      },
      //获取option设置
      getOption(data) {
        let option = {
          backgroundColor: '#fff',
          title: {
            text: '线索领域占比图',
            x: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },

          series: [
            {
              name: '',
              type: 'pie',
              radius: [30,"75%"],
              center: [ '50%' , '50%'],
              roseType: 'area',
              data:[
                {value:10, name:'国土资源'},
                {value:20, name:'食药安全'},
                {value:15, name:'环境保护'},
                {value:25, name:'国有财产'},
                {value:10, name:'英烈保护'},
                {value:20, name:'其他'},
              ]
            }
          ],
          color: ['#ed9203','#87cefa','#566770','#078840','#6395ec','#db4734']
        };
        return option;
      },
      //窗口改变重绘图表
      resizeWindow() {
        let _this = this;
        window.addEventListener('resize',_this.initChart)
      },
    },
    mounted() {
      this.initChart();//初始化图表
      this.resizeWindow();
    },
    destroyed() {
      window.removeEventListener('resize',this.initChart);
    }
  }
</script>

<style>
</style>
