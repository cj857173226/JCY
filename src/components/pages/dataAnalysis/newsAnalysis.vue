<template>
  <div id="newsAnalysis">
    <div class="newsAnalysis_header">
      <div class="header_left">
        全国检察机关公益诉讼新闻热力图
      </div>
      <div class="header_right">
        <el-form :inline="true" class="header_form">
          <el-form-item >
            <i  class="fa fa-th"></i>
          </el-form-item>
          <el-form-item label="选择省份 :">
            <el-select class="provinces_select" v-model="provinces">
              <el-option label="全部" value="quanbu"></el-option>
              <el-option label="四川" value="sichuan"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item >
            <el-input  class="provinces_search" v-model="provincesSearch" placeholder="搜索省份">
              <i  slot="suffix" class="provinces_icon iconfont icon-sousuo" @click="search"></i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="newsAnalysis_body">
      <div id="newsAnalysis_main" ref="heatmap" v-loading="isLoading">
      </div>
      <div class="map_return"  v-show="isReturn" @click="returnChina">
        <i class="fa fa-reply"></i>
        返回上级地图
      </div>
      <ul id="region_list_header" ref="listHeader">
        <li>
          <p>省份</p>
          <p>总量/条</p>
        </li>
      </ul>
      <ul id="region_list" ref="listBody">
        <li>
          <p>四川</p>
          <p>121</p>
        </li>
        <li>
          <p>北京</p>
          <p>12</p>
        </li>
        <li>
          <p>重庆</p>
          <p>122</p>
        </li>
        <li>
          <p>湖南</p>
          <p>122</p>
        </li>
        <li>
          <p>新疆</p>
          <p>12</p>
        </li><li>
        <p>上海</p>
        <p>22</p>
      </li><li>
        <p>青海</p>
        <p>12</p>
      </li><li>
        <p>陕西</p>
        <p>13</p>
      </li><li>
        <p>辽宁</p>
        <p>2</p>
      </li><li>
        <p>吉林</p>
        <p>88</p>
      </li><li>
        <p>黑龙江</p>
        <p>33</p>
      </li><li>
        <p>云南</p>
        <p>99</p>
      </li><li>
        <p>广西</p>
        <p>5</p>
      </li>
        <li>
          <p>宁夏</p>
          <p>55</p>
        </li>
        <li>
          <p>山西</p>
          <p>45</p>
        </li>
        <li>
          <p>浙江</p>
          <p>5</p>
        </li>
        <li>
          <p>海南</p>
          <p>75</p>
        </li>
        <li>
          <p>江西</p>
          <p>75</p>
        </li>
        <li>
          <p>贵州</p>
          <p>75</p>
        </li>
        <li>
          <p>内蒙古</p>
          <p>75</p>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        optionData: "",
        isLoading: false,
        mapType: 'china',//地图类型
        isReturn: false,//返回按钮显示
        provinces: "",//省份
        provincesSearch: "",//搜索省份,
        clickMapStatus: true,//点击省份
        myChart: "",
        nowMoveData: [],
        moveData: [//移入提示
          {name: '北京'},
          {name: '天津'},
          {name: '上海'},
          {name: '重庆'},
          {name: '河北'},
          {name: '河南'},
          {name: '云南'},
          {name: '辽宁'},
          {name: '黑龙江'},
          {name: '湖南'},
          {name: '安徽'},
          {name: '山东'},
          {name: '新疆'},
          {name: '江苏'},
          {name: '浙江'},
          {name: '江西'},
          {name: '湖北'},
          {name: '广西'},
          {name: '甘肃'},
          {name: '山西'},
          {name: '内蒙古'},
          {name: '陕西'},
          {name: '吉林'},
          {name: '福建'},
          {name: '贵州'},
          {name: '广东'},
          {name: '青海'},
          {name: '西藏'},
          {name: '四川'},
          {name: '宁夏'},
          {name: '海南'},
          {name: '台湾'},
          {name: '香港'},
          {name: '澳门'}
        ]
      }
    },
    methods : {
      //图表初始化
      initChart() {
        if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
          this.myChart.dispose();
        }
        let myChart = echarts.init(document.getElementById('newsAnalysis_main'));
        let option =  this.getOption();
        let _this = this;
        myChart.setOption(option);
        this.myChart = myChart;
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
      //点击
      echartClick(myChart) {
        let _this = this;
        if(_this.clickMapStatus) {
          myChart.on('click', function (params) {
            _this.axios({
              url: '@/.././static/map/province/' + params.name + '.json'
            }).then(function(res){
              console.log(res.data)
            })
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
        var option = {
          title: {
            text: '全国',
            left: 'center',
            textStyle: {
              color: '#000'
            }
          },
          backgroundColor: '#fff',
          visualMap: {
            min: 0,
            max: 500,
            splitNumber: 5,
            inRange: {
              color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            },
            textStyle: {
              color: '#000'
            }
          },
          geo: {
            map: _this.mapType,
            label: {
              normal:{
                show:true,
                textStyle:{
                  color:'#fff',
                  fontSize:13
                }
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#3f7696',
                borderColor: '#a4d2ec'
              },
              emphasis: {
                areaColor: '#a4d2ec'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                console.log(params);
                return params.name ;
              }
            },
          },
          series: [
            {
            name: _this.mapType,
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: _this.optionData,
          },
            {
              type: 'map',
              geoIndex: 0,
              data: _this.nowMoveData
            }
          ],
        };
        // let option =  {
        //   backgroundColor: '#eee',
        //   tooltip : {
        //     trigger: 'item',
        //     formatter: '{b}'
        //   },
        //   series : [
        //     {
        //       name: '北京',
        //       type: 'map',
        //       mapType: _this.mapType,
        //       roam: false,
        //       hoverable: true,
        //       data:[],
        //       heatmap: {
        //         minAlpha: 0.1,
        //         data: _this.optionData
        //       },
        //       itemStyle:{
        //         normal:{
        //           label:{
        //             show:true,
        //             textStyle:{
        //               fontSize : '14',
        //               fontFamily:'Microsoft YaHei',
        //               color:'#fff'
        //             }
        //           },
        //           borderColor:'#a4d2ec',
        //           borderWidth:1,
        //           areaStyle:{
        //             color: '#3f7696'
        //           }
        //         }
        //       }
        //     }
        //   ]
        // };
        return option;
      },
      //窗口改变重绘图表
      resizeWindow() {
        let _this = this;
        window.addEventListener('resize',_this.initChart);
      },
      //判断是否有滚动条
      hasScroll() {
        let listHeader = this.$refs.listHeader;
        let listBody = this.$refs.listBody;
        let height = listBody.getElementsByTagName('li').length*40;
        let bodyHeight = parseInt(window.getComputedStyle(listBody,null).height);
        if(height > bodyHeight) {
          listHeader.style.paddingRight = '17px';
        }else {
          listHeader.style.paddingRight = '0px';
        }
      },
      search() {//搜索省份
        console.log(1)
      }
    },
    mounted() {
      this.getChinaData();
      this.hasScroll();
    },
    destroyed() {
      window.removeEventListener('resize',this.initChart);
    }
  }
</script>

<style lang="scss" scoped>
  #newsAnalysis {
    position: relative;
    height: 100%;
    font-size: 16px;
    /*头部*/
    .newsAnalysis_header {
      height: 60px;
      background-color: #c0ecaa;
      .header_left {
        float: left;
        height: 60px;
        width: 60%;
        line-height: 60px;
        text-align: center;
      }
      .header_right {
        float: right;
        width: calc(40% - 16px);
        height: 100%;
        .header_form {
          margin-top: 10px;
          .el-form-item {
            margin-bottom: 0;
          }
          .provinces_select {
            width: 108px;
          }
        }
      }
    }
    /*内容*/
    #newsAnalysis_body {
      position: relative;
      height: calc(100% - 60px);
      padding: 16px;
      #newsAnalysis_main {
        float: left;
        height: 100%;
        width: 60%;
      }
      .map_return {
        position: absolute;
        top: 25px;
        left: 25px;
        &:hover {
          cursor: pointer;
          color: #00a0e9;
          user-select: none;
        }
      }
      #region_list {/*地区列表*/
        float: right;
        font-size: 14px;
        width: calc(40% - 16px);
        height: calc(100% - 40px);
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        li {
          border-bottom: 1px solid #dcdcdc;
          border-left: 1px solid #dcdcdc;
          border-right: 1px solid #dcdcdc;
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          &:nth-child(even) {
            background-color: #eee;
          }
          /*&:first-child {*/
            /*background-color: #c0ecaa;*/
            /*border-top: 1px solid #dcdcdc;*/
          /*}*/
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
                background-color: #dcdcdc;
              }
            }
          }
        }
      }
      #region_list_header {
        @extend  #region_list;
        overflow: hidden;
        height: auto;
        background-color: #c0ecaa;
        li {
          background-color: #c0ecaa;
          border-top: 1px solid #dcdcdc;
        }
      }
    }
  }
@media (max-width: 1440px) {
  #newsAnalysis {
    /*头部*/
    .newsAnalysis_header {
      height: 50px;
      .header_left {
        height: 50px;
        width: 40%;
        line-height: 50px;
      }
      .header_right {
        width: calc(40% - 16px);
        .header_form {
          margin-top: 5px;
          .provinces_search {
            width: 130px;
            .provinces_icon {
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    /*内容*/
    #newsAnalysis_body {
      height: calc(100% - 50px);
    }
  }
}
</style>
