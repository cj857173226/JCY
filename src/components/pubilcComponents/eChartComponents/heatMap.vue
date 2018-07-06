<template>
  <div id="heatmap_box">
    <div id="heatmap_main" ref="heatmap" style="width: 100%;height: 700px;" v-loading="isLoading">
    </div>
    <div class="map_return"  v-show="isReturn" @click="returnChina">
      <i class="fa fa-reply"></i>
      返回上级地图
    </div>
    <ul id="heatmap_list" v-if="clickMap">
      <li>
        <p>地区</p>
        <p>新闻</p>
      </li>
      <li>
        <p>四川</p>
        <p>12</p>
      </li>
      <li>
        <p>四川</p>
        <p>12</p>
      </li>
      <li>
        <p>四川</p>
        <p>12</p>
      </li>
      <li>
        <p>四川</p>
        <p>12</p>
      </li>
    </ul>

  </div>

</template>

<script>
  export default {
    props: {'clickMap':false},
    data() {
      return {
        optionData: "",
        isLoading: false,
        mapType: 'china',//地图类型
        isReturn: false,//返回按钮显示
        clickMapStatus: this.clickMap
      }
    },
    methods : {
      //图表初始化
      initChart() {
        let myChart = echarts.init(document.getElementById('heatmap_main'));
        let option =  this.getOption();
        let _this = this;
        myChart.setOption(option);
        if(this.clickMapStatus) {
          _this.echartClick(myChart);//添加点击省份
        }
      },
      getChinaData() {
        let _this = this;
        let data = [];
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
              _this.initChart();//初始化图表
              _this.isLoading = false;
            }
          }).catch(function(err) {
          _this.isLoading = false;
          console.log(err)
        })
      },
      //点击
      echartClick(myChart) {
        let _this = this;
        if(_this.clickMapStatus) {
          myChart.on('click', function (params) {
            _this.mapType = params.name;
            _this.clickMapStatus = false;
            _this.initChart();
            _this.isReturn = true;

          });
        }
      },
      returnChina() {//返回中国地图
        this.mapType = 'china';
        this.clickMapStatus = true;
        this.initChart();
        this.isReturn = false;
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
      this.getChinaData();
      this.resizeWindow();
    },
    destroyed() {
      window.removeEventListener('resize',this.initChart);
    }
  }
</script>

<style lang="scss" scoped>
  #heatmap_box {
    position: relative;
    .map_return {
      position: absolute;
      top: 0;
      left: 0;
      &:hover {
        cursor: pointer;
        color: #00a0e9;
        user-select: none;
      }
    }
    #heatmap_list {/*地区列表*/
      font-size: 14px;
      li {
        border: 1px solid black;
        height: 40px;
        line-height: 40px;
        p {
          position: relative;
          display: inline-block;
          width: 50%;
          text-align: center;
          margin-right: -3px;
          &:first-child {
            &:after {
              position: absolute;
              right: 0;
              top: 0;
              content: "";
              height: 100%;
              width: 1px;
              background-color: black;
            }
          }
        }
      }
    }
  }
</style>
