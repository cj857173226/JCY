<template>
    <div id="heatmap_main" ref="heatmap" style="width: 100%;height: 700px;">

    </div>
</template>

<script>
  export default {
    data() {
      return {
        optionData: ""
      }
    },
    methods : {
      //图表初始化
      initChart() {
        let myChart = echarts.init(document.getElementById('heatmap_main'));
        let  option =  this.getOption();
        myChart.setOption(option);
        this.resizeWindow();
      },
      //获取option设置
      getOption(data) {
        let heatData = [];
        for (var i = 0; i < 200; ++i) {
          heatData.push([
            100 + Math.random() * 20,
            24 + Math.random() * 16,
            Math.random()
          ]);
        }
        for (var j = 0; j < 10; ++j) {
          var x = 100 + Math.random() * 16;
          var y = 24 + Math.random() * 12;
          var cnt = 30 * Math.random();
          for (var i = 0; i < cnt; ++i) {
            heatData.push([
              x + Math.random() * 2,
              y + Math.random() * 2,
              Math.random()
            ]);
          }
        }
        let option =  {
          backgroundColor: '#fff',
          title : {
            text: '全国检察机关公益诉讼新闻热力图',
            x:'center',
            textStyle: {
              color: 'black',
              fontSize: 18
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: '{b}'
          },
          series : [
            {
              name: '北京',
              type: 'map',
              mapType: 'china',
              roam: false,
              hoverable: true,
              data:[],
              heatmap: {
                minAlpha: 0.1,
                data: heatData
              },
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    textStyle:{
                      fontSize : '14',
                      fontFamily:'Microsoft YaHei',
                      color:'#fff'
                    }
                  },
                  borderColor:'#a4d2ec',
                  borderWidth:1,
                  areaStyle:{
                    color: '#3f7696'
                  }
                }
              }
            }
          ]
        };
        console.log(JSON.stringify(heatData));
        return option;
      },
      //窗口改变重绘图表
      resizeWindow() {
        let _this = this;
        window.addEventListener('resize',function(){
          let myChart = echarts.init(document.getElementById('heatmap_main'));
          let heatData = _this.optionData;
          let  option =  _this.getOption(heatData);
          myChart.setOption(option);
        })
      },
    },
    mounted() {
      this.initChart();//初始化图表
    }
  }
</script>

<style lang="scss" scoped>

</style>
