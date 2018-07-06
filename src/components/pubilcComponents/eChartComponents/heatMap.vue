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
        mapType: 'china',//地图类型
        isAxios: false ,//是否请求过
      }
    },
    methods : {
      //图表初始化
      initChart() {
        let myChart = echarts.init(document.getElementById('heatmap_main'));
        let _this = this;
        let option;
        let data = [];
        if(!_this.isAxios) {
          _this.isLoading = true;
          _this.axios({
            url: webApi.Host + webApi.News.GetCityFreq,
            timeout: 5000,
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
                _this.optionData = data;
                option =  _this.getOption();
                myChart.setOption(option);
                _this.echartClick(myChart);
                _this.isLoading = false;
                _this.isAxios = true;
              }
            }).catch(function(err) {
            _this.isLoading = false;
            console.log(err)
          })
        }else {
          option =  _this.getOption();
          myChart.setOption(option);
          _this.echartClick(myChart);
        }
      },
      //点击
      echartClick(myChart) {
        let _this = this;
        let option;
        myChart.on('click', function (params) {
          let chart = echarts.init(document.getElementById('heatmap_main'));
          _this.mapType = params.name;
          option =  _this.getOption();
          chart.setOption(option);
          // 控制台打印数据的名称
        });
      },
      //获取option设置
      getOption() {
        let _this = this;
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
          toolbox: {
            show : true,
            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                       // 'horizontal' ¦ 'vertical'
            x: 'left',                // 水平安放位置，默认为全图右对齐，可选为：
                                       // 'center' ¦ 'left' ¦ 'right'
                                       // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                       // 'top' ¦ 'bottom' ¦ 'center'
                                       // ¦ {number}（y坐标，单位px）
            color : ['#1e90ff'],
            backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
            borderColor: '#ccc',       // 工具箱边框颜色
            borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
            showTitle: true,
            feature : {
              myTool : {
                show : true,
                title : '返回上级地图',
                icon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                onclick : function (){
                  alert('myToolHandler')
                }
              }
            }
          },
          series : [
            {
              name: '北京',
              type: 'map',
              mapType: _this.mapType,
              roam: false,
              hoverable: true,
              data:[],
              heatmap: {
                minAlpha: 0.1,
                data: _this.optionData
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
