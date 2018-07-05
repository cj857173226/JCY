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
      }
    },
    methods : {
      //图表初始化
      initChart() {
        let myChart = echarts.init(document.getElementById('heatmap_main'));
        let _this = this;
        let option;
        let data = [];
        if(!_this.optionData) {
          _this.isLoading = true;
          _this.axios({
            url: webApi.Host + webApi.News.GetCityFreq,
            timeout: 2000,
          })
            .then(function(res){
              if(res.data.code==0) {
                res.data.data.forEach(function(item,index){
                  let x = item.JWD.split(",")[0];
                  let y = item.JWD.split(",")[1];
                  let val = item.PC;
                  if(index%5==0) {
                    data.push([x, y, val]);
                  }
                });
                option =  _this.getOption(data);
                myChart.setOption(option);
                _this.optionData = data;
                _this.isLoading = false;
              }
            }).catch(function(err) {
            _this.isLoading = false;
            console.log(err)
          })
        }else {
          data = _this.optionData;
          option =  _this.getOption(data);
          myChart.setOption(option);
        }
      },
      //获取option设置
      getOption(data) {
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
                data: data
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
        return option;
      },
      //窗口改变重绘图表
      resizeWindow() {
        let _this = this;
        window.addEventListener('resize',_this.initChart);
      }
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

<style lang="scss" scoped>

</style>
