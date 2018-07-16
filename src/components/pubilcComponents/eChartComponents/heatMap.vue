<template>
  <div id="heatmap_main" ref="heatmap" style="width: 100%;height: 700px;" v-loading="isLoading">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        optionData: "",
        isLoading: false,
        myChart: "",
      }
    },
    methods : {
      //图表初始化
      initChart() {
        if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
          this.myChart.dispose();
        }
        let myChart = echarts.init(document.getElementById('heatmap_main'));
        let option =  this.getOption();
        myChart.setOption(option);
        this.myChart = myChart;
      },
      getChinaData() {
        let _this = this;
        let data = [];
        _this.isLoading = true;
        _this.axios({
          url: webApi.Host + webApi.News.GetCityFreq,
          timeout: 15000,
        })
          .then(function(res){
            if(res.data.code==0) {
              res.data.data.forEach(function(item,index){
                if(item.JWD) {
                  let x = item.JWD.split(",")[0];
                  let y = item.JWD.split(",")[1];
                  let val = item.PC;
                  data.push([x, y, val]);
                }
              });
              _this.optionData = data;
              _this.initChart();//初始化图表
              _this.isLoading = false;
              _this.resizeWindow();
            }
          }).catch(function(err) {
          _this.isLoading = false;
          console.log(err)
        })
      },
      //获取option设置
      getOption() {
        let _this = this;
        var option = {
          title: {
            text: "全国检察机关公益诉讼新闻热力图",
            left: 'center',
            textStyle: {
              color: '#000',
              fontSize: 18
            }
          },
          backgroundColor: '#fff',
          visualMap: {
            show: false,
            min: 0,
            max: 300,
            splitNumber: 5,
            inRange: {
              color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            },
            textStyle: {
              color: '#000'
            }
          },
          geo: {
            map: 'china',
            label: {
              normal:{
                show:true,
                textStyle:{
                  color:'#fff',
                  fontSize:13
                }
              },
              emphasis: {
                color: 'green'
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#3f7696',
                borderColor: '#a4d2ec'
              },
              emphasis: {
                areaColor: '#a4d2ec'
              }
            }
          },
          series: [
            {
              name: 'china',
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: _this.optionData,
              center: [ '50%' , '50%'],
            },
          ],
        };
        return option;
      },
      //窗口改变重绘图表
      resizeWindow() {
        let _this = this;
        window.addEventListener('resize',_this.initChart);
      }
    },
    mounted() {
      this.getChinaData();
    },
    destroyed() {
      window.removeEventListener('resize',this.initChart);
    }
  }
</script>

<style lang="scss" scoped>

</style>
