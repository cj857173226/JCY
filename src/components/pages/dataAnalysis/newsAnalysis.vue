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
          <p>{{listName}}</p>
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
        moveData: [],//移入data
        optionData: "",
        isLoading: false,
        mapType: 'china',//地图类型
        mapTitle: '全国',//地名名称
        listName: "省份",//
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
        maxVal: 0,//最大值
        splitNumber:  1,//分割
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
        // let moveData = [];
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
              _this.maxVal = 0;
              _this.freqData = res.data.data;
              if(!_this.provinces) {
                _this.provinces = res.data.data;
              }
              res.data.data.forEach(function(item,index){
                if(item.JWD) {
                  let x = item.JWD.split(",")[0];
                  let y = item.JWD.split(",")[1];
                  let val = item.PC;
                  if(val > _this.maxVal) {
                    _this.maxVal = val;
                  }
                  data.push([x, y, val]);
                  // moveData.push({name: item.DM})
                  // moveData.push({name: item.DM,value: val,itemStyle:{
                  //     areaColor: '#a4d2ec'
                  //   }})
                }
              });
              // console.log(_this.maxVal);
              // console.log(JSON.stringify(data))
              _this.optionData = data;
              // _this.moveData = moveData;
              _this.initChart();//初始化图表
              _this.isLoading = false;
              _this.resizeWindow();
              _this.$nextTick(()=>{
                _this.hasScroll();
              })
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
            if(params.name!="台湾"&&params.name!="南海诸岛"){
              _this.mapType = params.name;
              _this.mapTitle = params.name;
              _this.listName = '市区';
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
        this.listName = '省份';
        this.clickMapStatus = true;
        this.getChinaData();
        this.isReturn = false;
      },
      //获取option设置
      getOption() {
        let _this = this;
        let maxVal = _this.maxVal;
        let splitNum;
        if(_this.maxVal>=500) {
          maxVal = 300;
          splitNum = 50;
        }else if(_this.maxVal>=100) {
          maxVal = 50;
          splitNum = 1;
        }else {
          splitNum = 1;
        }
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b}"
          },
          title: {
            text: _this.mapTitle,
            left: 'center',
            textStyle: {
              color: '#000',
            }
          },
          backgroundColor: '#fff',
          visualMap: {
            show: false,
            min: 0,
            max: maxVal,
            splitNumber: splitNum,
            // splitList: [
            //   {start: _this.maxVal},
            //   {start: 1, end:  _this.maxVal, label: '10 到 200（自定义label）'},
            //   {start: .9, end: 0}
            // ],
            inRange: {
              // color: ['#d94e5d','#eac736','#50a3ba'].reverse()
              color: ['blue', 'green', 'yellow', 'red']
            },
            textStyle: {
              color: '#000'
            },
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
                color: '#fff'
              }
            },
            roam: true,
            scaleLimit: {
              max: 2,
              min: .7
            },
            itemStyle: {
              normal: {
                // areaColor: '#3f7696',
                areaColor: '#a4d2ec',
                borderColor: '#3f7696'
              },
              emphasis: {
                areaColor: '#3f7696'
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
            {
              name: _this.mapTitle,
              geoIndex: 0,
              type: 'map',
              data: _this.moveData,
            },
          ],
        };
        return option;
      },
      //设置省市区
      setRegion() {
        let array = [
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
        ];
        var cityMap = {"北京市": "110100", "天津市": "120100", "上海市": "310100", "重庆市": "500100", "崇明县": "310200", "湖北省直辖县市": "429000", "铜仁市": "522200", "毕节市": "522400", "石家庄市": "130100", "唐山市": "130200", "秦皇岛市": "130300", "邯郸市": "130400", "邢台市": "130500", "保定市": "130600", "张家口市": "130700", "承德市": "130800", "沧州市": "130900", "廊坊市": "131000", "衡水市": "131100", "太原市": "140100", "大同市": "140200", "阳泉市": "140300", "长治市": "140400", "晋城市": "140500", "朔州市": "140600", "晋中市": "140700", "运城市": "140800", "忻州市": "140900", "临汾市": "141000", "吕梁市": "141100", "呼和浩特市": "150100", "包头市": "150200", "乌海市": "150300", "赤峰市": "150400", "通辽市": "150500", "鄂尔多斯市": "150600", "呼伦贝尔市": "150700", "巴彦淖尔市": "150800", "乌兰察布市": "150900", "兴安盟": "152200", "锡林郭勒盟": "152500", "阿拉善盟": "152900", "沈阳市": "210100", "大连市": "210200", "鞍山市": "210300", "抚顺市": "210400", "本溪市": "210500", "丹东市": "210600", "锦州市": "210700", "营口市": "210800", "阜新市": "210900", "辽阳市": "211000", "盘锦市": "211100", "铁岭市": "211200", "朝阳市": "211300", "葫芦岛市": "211400", "长春市": "220100", "吉林市": "220200", "四平市": "220300", "辽源市": "220400", "通化市": "220500", "白山市": "220600", "松原市": "220700", "白城市": "220800", "延边朝鲜族自治州": "222400", "哈尔滨市": "230100", "齐齐哈尔市": "230200", "鸡西市": "230300", "鹤岗市": "230400", "双鸭山市": "230500", "大庆市": "230600", "伊春市": "230700", "佳木斯市": "230800", "七台河市": "230900", "牡丹江市": "231000", "黑河市": "231100", "绥化市": "231200", "大兴安岭地区": "232700", "南京市": "320100", "无锡市": "320200", "徐州市": "320300", "常州市": "320400", "苏州市": "320500", "南通市": "320600", "连云港市": "320700", "淮安市": "320800", "盐城市": "320900", "扬州市": "321000", "镇江市": "321100", "泰州市": "321200", "宿迁市": "321300", "杭州市": "330100", "宁波市": "330200", "温州市": "330300", "嘉兴市": "330400", "湖州市": "330500", "绍兴市": "330600", "金华市": "330700", "衢州市": "330800", "舟山市": "330900", "台州市": "331000", "丽水市": "331100", "合肥市": "340100", "芜湖市": "340200", "蚌埠市": "340300", "淮南市": "340400", "马鞍山市": "340500", "淮北市": "340600", "铜陵市": "340700", "安庆市": "340800", "黄山市": "341000", "滁州市": "341100", "阜阳市": "341200", "宿州市": "341300", "六安市": "341500", "亳州市": "341600", "池州市": "341700", "宣城市": "341800", "福州市": "350100", "厦门市": "350200", "莆田市": "350300", "三明市": "350400", "泉州市": "350500", "漳州市": "350600", "南平市": "350700", "龙岩市": "350800", "宁德市": "350900", "南昌市": "360100", "景德镇市": "360200", "萍乡市": "360300", "九江市": "360400", "新余市": "360500", "鹰潭市": "360600", "赣州市": "360700", "吉安市": "360800", "宜春市": "360900", "抚州市": "361000", "上饶市": "361100", "济南市": "370100", "青岛市": "370200", "淄博市": "370300", "枣庄市": "370400", "东营市": "370500", "烟台市": "370600", "潍坊市": "370700", "济宁市": "370800", "泰安市": "370900", "威海市": "371000", "日照市": "371100", "莱芜市": "371200", "临沂市": "371300", "德州市": "371400", "聊城市": "371500", "滨州市": "371600", "菏泽市": "371700", "郑州市": "410100", "开封市": "410200", "洛阳市": "410300", "平顶山市": "410400", "安阳市": "410500", "鹤壁市": "410600", "新乡市": "410700", "焦作市": "410800", "濮阳市": "410900", "许昌市": "411000", "漯河市": "411100", "三门峡市": "411200", "南阳市": "411300", "商丘市": "411400", "信阳市": "411500", "周口市": "411600", "驻马店市": "411700", "省直辖县级行政区划": "469000", "武汉市": "420100", "黄石市": "420200", "十堰市": "420300", "宜昌市": "420500", "襄阳市": "420600", "鄂州市": "420700", "荆门市": "420800", "孝感市": "420900", "荆州市": "421000", "黄冈市": "421100", "咸宁市": "421200", "随州市": "421300", "恩施土家族苗族自治州": "422800", "长沙市": "430100", "株洲市": "430200", "湘潭市": "430300", "衡阳市": "430400", "邵阳市": "430500", "岳阳市": "430600", "常德市": "430700", "张家界市": "430800", "益阳市": "430900", "郴州市": "431000", "永州市": "431100", "怀化市": "431200", "娄底市": "431300", "湘西土家族苗族自治州": "433100", "广州市": "440100", "韶关市": "440200", "深圳市": "440300", "珠海市": "440400", "汕头市": "440500", "佛山市": "440600", "江门市": "440700", "湛江市": "440800", "茂名市": "440900", "肇庆市": "441200", "惠州市": "441300", "梅州市": "441400", "汕尾市": "441500", "河源市": "441600", "阳江市": "441700", "清远市": "441800", "东莞市": "441900", "中山市": "442000", "潮州市": "445100", "揭阳市": "445200", "云浮市": "445300", "南宁市": "450100", "柳州市": "450200", "桂林市": "450300", "梧州市": "450400", "北海市": "450500", "防城港市": "450600", "钦州市": "450700", "贵港市": "450800", "玉林市": "450900", "百色市": "451000", "贺州市": "451100", "河池市": "451200", "来宾市": "451300", "崇左市": "451400", "海口市": "460100", "三亚市": "460200", "三沙市": "460300", "成都市": "510100", "自贡市": "510300", "攀枝花市": "510400", "泸州市": "510500", "德阳市": "510600", "绵阳市": "510700", "广元市": "510800", "遂宁市": "510900", "内江市": "511000", "乐山市": "511100", "南充市": "511300", "眉山市": "511400", "宜宾市": "511500", "广安市": "511600", "达州市": "511700", "雅安市": "511800", "巴中市": "511900", "资阳市": "512000", "阿坝藏族羌族自治州": "513200", "甘孜藏族自治州": "513300", "凉山彝族自治州": "513400", "贵阳市": "520100", "六盘水市": "520200", "遵义市": "520300", "安顺市": "520400", "黔西南布依族苗族自治州": "522300", "黔东南苗族侗族自治州": "522600", "黔南布依族苗族自治州": "522700", "昆明市": "530100", "曲靖市": "530300", "玉溪市": "530400", "保山市": "530500", "昭通市": "530600", "丽江市": "530700", "普洱市": "530800", "临沧市": "530900", "楚雄彝族自治州": "532300", "红河哈尼族彝族自治州": "532500", "文山壮族苗族自治州": "532600", "西双版纳傣族自治州": "532800", "大理白族自治州": "532900", "德宏傣族景颇族自治州": "533100", "怒江傈僳族自治州": "533300", "迪庆藏族自治州": "533400", "拉萨市": "540100", "昌都地区": "542100", "山南地区": "542200", "日喀则地区": "542300", "那曲地区": "542400", "阿里地区": "542500", "林芝地区": "542600", "西安市": "610100", "铜川市": "610200", "宝鸡市": "610300", "咸阳市": "610400", "渭南市": "610500", "延安市": "610600", "汉中市": "610700", "榆林市": "610800", "安康市": "610900", "商洛市": "611000", "兰州市": "620100", "嘉峪关市": "620200", "金昌市": "620300", "白银市": "620400", "天水市": "620500", "武威市": "620600", "张掖市": "620700", "平凉市": "620800", "酒泉市": "620900", "庆阳市": "621000", "定西市": "621100", "陇南市": "621200", "临夏回族自治州": "622900", "甘南藏族自治州": "623000", "西宁市": "630100", "海东地区": "632100", "海北藏族自治州": "632200", "黄南藏族自治州": "632300", "海南藏族自治州": "632500", "果洛藏族自治州": "632600", "玉树藏族自治州": "632700", "海西蒙古族藏族自治州": "632800", "银川市": "640100", "石嘴山市": "640200", "吴忠市": "640300", "固原市": "640400", "中卫市": "640500", "乌鲁木齐市": "650100", "克拉玛依市": "650200", "吐鲁番地区": "652100", "哈密地区": "652200", "昌吉回族自治州": "652300", "博尔塔拉蒙古自治州": "652700", "巴音郭楞蒙古自治州": "652800", "阿克苏地区": "652900", "克孜勒苏柯尔克孜自治州": "653000", "喀什地区": "653100", "和田地区": "653200", "伊犁哈萨克自治州": "654000", "塔城地区": "654200", "阿勒泰地区": "654300", "自治区直辖县级行政区划": "659000", "台湾省": "710000", "香港特别行政区": "810100", "澳门特别行政区": "820000"
        };
        for(let i in cityMap){
          array.push({name: i});
        }
        this.moveData = array;
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
      this.setRegion();
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
