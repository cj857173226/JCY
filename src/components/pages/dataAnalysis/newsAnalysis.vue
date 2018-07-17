<template>
  <div id="newsAnalysis">
    <div class="newsAnalysis_header">
      <div class="header_left">
        检察机关公益诉讼新闻热力图
      </div>
      <!--<div class="header_right">-->
        <!--<el-form :inline="true" class="header_form">-->
          <!--<el-form-item >-->
            <!--<i  class="fa fa-th"></i>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="选择省份 :">-->
            <!--<area-select style="line-height: 100%;margin-top: 4px;" class="provinces_select" :level="0" type="text" :data = "pcaa" v-model="citySelected"></area-select>-->
            <!--&lt;!&ndash;<el-select class="provinces_select" v-model="provinces_select">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item,index) in provinces" :key="index" :label="item.DM" :value="item.DM"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--</el-form-item>-->

          <!--<el-form-item >-->
            <!--<el-input  class="provinces_search" v-model="provincesSearch" placeholder="搜索省份">-->
              <!--<i  slot="suffix" class="provinces_icon iconfont icon-sousuo" @click="search"></i>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
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
        <li v-for="(item,index) in freqData" :key="index">
          <p v-text="item.DM"></p>
          <p v-text="item.PC"></p>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import { pca, pcaa } from 'area-data';
  export default {
    data() {
      return {
        optionData: "",
        isLoading: false,
        mapType: 'china',//地图类型
        mapTitle: '全国',//地名名称
        max: '',//
        isReturn: false,//返回按钮显示
        provinces_select: '',//选择省份
        provinces: "",//省份
        provincesSearch: "",//搜索省份,
        freqData: "",//地区频次数据
        clickMapStatus: true,//点击省份
        myChart: "",
        pca: pca,
        pcaa: pcaa,
        citySelected:[],
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
        let province = _this.mapType;
        if(_this.mapType=="china") {
          province = "";
        }
        _this.isLoading = true;
        _this.axios({
          url: (webApi.News.GetCityFreq).format({
            province: province
          }),
          timeout: 15000,
        })
          .then(function(res){
            if(res.data.code==0) {
              _this.freqData = res.data.data;
              if(!_this.provinces) {
                _this.provinces = res.data.data;
              }
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
            if(params.name!="台湾"){
              _this.mapType = params.name;
              _this.mapTitle = params.name;
              _this.clickMapStatus = false;//设置点击状态(为true则添加点击事件)
              _this.getChinaData();//获取数据
              _this.isReturn = true;//返回全国地图
            }
          });
        }
      },
      returnChina() {//返回中国地图
        this.mapType = 'china';
        this.mapTitle = "全国";
        this.clickMapStatus = true;
        this.getChinaData();
        this.isReturn = false;
      },
      //获取option设置
      getOption() {
        let _this = this;
        let max;
        if(_this.mapType=="china") {
          max = 300;
        }else {
          max = 10;
        }
        var option = {
          title: {
            text: _this.mapTitle,
            left: 'center',
            textStyle: {
              color: '#000',
            }
          },
          backgroundColor: '#fff',
          visualMap: {
            min: 0,
            max: max,
            splitNumber: 5,
            inRange: {
              // color: ['#d94e5d','#eac736','#50a3ba'].reverse()
              color: ['blue', 'blue', 'green', 'yellow', 'red']
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
            name: _this.mapType,
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
    watch: {
      provinces_select() {
        console.log(this.provinces_select)
      }
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
        font-size: 18px;
        text-align: center;
        font-weight: bold;
      }
      .header_right {
        float: right;
        width: calc(40% - 16px);
        height: 100%;
        .header_form {
          margin-top: 10px;
          .el-form-item {
            margin-bottom: 0;
            .provinces_search {
              width: 110px;
              .provinces_icon {
                &:hover {
                  cursor: pointer;
                }
              }
            }
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        width: 60%;
        line-height: 50px;
      }
      .header_right {
        width: calc(40% - 16px);
        .header_form {
          margin-top: 5px;
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
