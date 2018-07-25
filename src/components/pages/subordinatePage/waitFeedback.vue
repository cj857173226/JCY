<template>
  <div id="wait-feedback">
    <div id="header">
      <span class="header-icon">
          <i class="fa fa-pencil-square-o"></i>
      </span>
      <span class="header-title">待反馈线索</span>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getClueList">
        <span class="search-btn" @click="getClueList()">
              <i class="iconfont icon-sousuo"></i>
          </span>
      </div>

    </div>
    <div id="content">
      <div class="cue-types-wrap">
        <div class="title-wrap">
          <i class="iconfont icon-leibieguanli"></i>
          <span>线索门类</span>
        </div>
        <div class="types-wrap clearfix">
          <div v-for="(item ,index) in typeList" class="type-item" :class="{'type-item-on':type == item}" @click = "clueTypeOder(item)">
            <div class="type-icon">
              <i v-if="item == '食药安全'" class="iconfont icon-shipinshengchanqiye"></i>
              <i v-else-if="item == '英烈保护'" class="iconfont icon-44"></i>
              <i v-else-if="item == '国有财产'" class="iconfont icon-jinqian"></i>
              <i v-else-if="item ==  '食品安全'" class="iconfont icon-shouyeshipin"></i>
              <i v-else-if="item ==  '国土资源'" class="iconfont icon-diqiuyi"></i>
              <i v-else-if="item ==  '环境保护'" class="iconfont icon-huanjingbaohu"></i>
            </div>
            <div class="type-name">
              {{item}}
            </div>
          </div>
        </div>
      </div>
      <div class="cue-filter-wrap">
        <div class="cue-source clearfix">
          <div class="left-title">
            <i class="fa fa-vine"></i>
            排序字段:
          </div>
          <div class="right">
            <template>
              <el-radio-group @change="getClueList"  v-model="order">
                <el-radio  label="cjsj">采集时间</el-radio>
                <el-radio  label="fbsj">发布时间</el-radio>
              </el-radio-group>
            </template>
          </div>
        </div>
        <div class="cue-sort clearfix">
          <div class="left-title">
            <i class="fa fa-calendar"></i>
            时间段:
          </div>
          <div class="right">
            <el-date-picker @change="getClueList" style="height: 100%;border:none;padding:0"
                            v-model="timeSearch"
                            type="daterange"
                            align="right"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            range-separator="-"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">

            </el-date-picker>
          </div>
        </div>

      </div>
      <div class="table-list" ref="cueList" v-loading="isLoad">
        <el-table
          ref="oTable"
          :data="clueList"
          :max-height="tableH"
          :height="tableH"
          style="width: 100%">
          <el-table-column
            prop="JBNR"
            label="内容"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" max-width="200">
                <p style="text-indent: 2em;">{{ scope.row.JBNR }}</p>
                <div slot="reference" class="td-content">
                  {{ scope.row.JBNR}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="GJC"
            label="关键词"
            min-width="300">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" max-width="400">
                <p style="text-indent: 2em;">{{ scope.row.GJC }}</p>
                <div slot="reference" class="td-content">
                  {{ scope.row.GJC}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="XSLB"
            label="线索类别"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="XSSJBLY"
            label="线索来源"
            min-width="110"
          >
          </el-table-column>
          <el-table-column
            prop="XSFBSJ"
            label="线索发布时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="XSCJSJ"
            label="采集时间"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row.XSSJBLY,scope.row.XSBH)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          @current-change="pageTo"
          :page-size="pageSize"
          :current-page="pageNum"
          layout="total, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'wait-receive',
    data(){
      return{
        isThisNav:1,//导航
        pageSize:10, //每页条数
        pageNum:1, //当前页
        totalPages: 0, //总条数
        type: 1,//type=0:待确认接收；1：正在办理；2：已反馈结果;3：全部
        order: "cjsj",//排序
        timeSearch: [this.timeFormat(new Date((new Date()).getTime() - 3600 * 1000 * 24 * 30)),this.timeFormat(new Date())],//时间
        typeList: ["食药安全","英烈保护",
          "国有财产","食品安全","国土资源","环境保护"],//线索门类
        clueList: [
          {
            JBNR:'回去玩传奇我请问你我v区区我',
            GJC:'扰民,经营,情况,局,烧烤,噪音,中,反映',
            XSLB:'环境污染',
            XSSJBLY:'互联网线索',
            XSFBSJ:'2014-04-28 00:00:00',
            XSCJSJ:'2018-06-21 07:17:14',
            XSBH:'QW121FF1HF2F1H0BF1381231'
          },
        ], //待接收线索

        tableH:0, //表格高度
        keyword:'', //关键字
        isLoad:false,//数据是否在加载
      }
    },
    mounted(){
      localStorage.removeItem('cueList');
      localStorage.removeItem('beginDate');
      localStorage.removeItem('endDate');
      localStorage.removeItem('cueIndex');
      localStorage.removeItem('pageNum');
      localStorage.removeItem('order');
      this.getClueList();//获取数据列表
      this.tableResize();
    },
    methods:{
      timeFormat(date) {
        if(date) {
          let time = date;
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          if(month < 10) {
            month =  '0' + month;
          }
          if(day < 10 ) {
            day =  '0' + day;
          }
          time = year + '-' + month + '-' + day;
          return time;
        }else {
          return date;
        }

      },
      //按举报类型筛选
      clueTypeOder(type){
        let _this = this;
        if(_this.isLoad == false){
          if(_this.type!= type){
            _this.pageNum = 1;
            _this.type = type;
            if(_this.clueList.length<=0){
              return
            }else {
              _this.getClueList();
            }
          }else{
            _this.type = '';
            _this.pageNum = 1;
            if(_this.clueList.length<=0){
              return
            }else {
              _this.getClueList();
            }
          }
        }
      },
      //获取线索列表
      getClueList(){
        let _this = this;
        let url = (webApi.ClueManager.GetSubClues).format({
          type: _this.type,//type=0:待确认接收；1：正在办理；2：已反馈结果;3：全部
          beginDate: _this.timeSearch[0],//开始时间
          endDate: _this.timeSearch[1],//结束时间
          pageNum: _this.pageNum,//页码
          pageSize: _this.pageSize,//页大小
          order: _this.order,//排序
        })
        _this.axios({
          method: "get",
          timeout: 10000,
          url: url
        }).then(function(res){
          console.log(res);
        }).catch(function(err){

        })
      },
      //跳转分页
      pageTo(){

      },
      //审批
      detail(text,id){
        var type = 0;
        localStorage.setItem('cueList',JSON.stringify(this.clueList));
        localStorage.setItem('beginDate',this.timeSearch[0]);
        localStorage.setItem('endDate',this.timeSearch[1]);
        localStorage.setItem('cueIndex',index);
        localStorage.setItem('pageNum',this.pageNum);
        localStorage.setItem('order',this.order);
        if(text == '举报线索'){
          type = 1
        }else if(text == '互联网线索'){
          type = 2
        }else if(text == '公益诉讼线索'){
          type = 3
        }else if(text == '热点线索'){
          type = 4
        }
        this.$router.push({
          path:'/home/cueDetail',
          query:{type:9,type2:type,id:id,nav:1}
        });
      },
      //表格高度自适应
      tableResize(){
        let _this = this;
        this.$nextTick(function () {
          _this.tableH = _this.$refs.cueList.clientHeight;
          window.addEventListener('resize',_this.resize);
        })
      },
      resize(){
        let _this = this;
        _this.tableH = _this.$refs.cueList.clientHeight;
      }
    },
    //实例销毁钩子
    destroyed(){
      window.removeEventListener('resize',this.resize)
    }
  }
</script>

<style lang="scss" scoped>
  #wait-feedback{
    height: 100%;
    overflow: hidden;
    #header{
      height: 50px;
      line-height: 50px;
      color: #666;
      font-size: 16px;
      border-bottom: solid 1px #dcdcdc;
      background: #eee;
      .header-icon{
        display: inline-block;
        height: 100%;
        width: 40px;
        text-align: center;
        border-right:solid 1px #ddd;
      }
      .header-title{
        padding-left: 15px;
      }
      /*搜索框*/
      .search-wrap{
        float: right;
        background: #FFFFFF;
        height: 42px;
        width: 320px;
        margin-right: 50px;
        margin-top: 4px;
        border: 1px solid #dcdcdc;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        .search-ipt{
          width: 270px;
          float: left;
          font-size: 16px;
          height: 100%;
          border: none;
          padding-left: 10px;
          color: #999999;
          background: transparent;
        }
        .search-btn{
          float: left;
          position: relative;
          height: 100%;
          line-height: 40px;
          width: 48px;
          color: #999999;
          text-align: center;
          cursor: pointer;
        }
        .search-btn:after{
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 2px;
          height: 20px;
          background: #dcdcdc;
        }
      }
    }
    #content{
      margin-top: 24px;
      height: calc(100% - 74px);
      max-height: calc(100% - 74px);
      padding: 0 50px;
      .cue-types-wrap{
        border: 1px solid #dcdcdc;
        .title-wrap{
          background: #EEEEEE;
          padding-left: 20px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #333333;
          border-bottom: 1px solid #dcdcdc;
          .iconfont{
            font-weight: 800;
            color: #333;
          }
        }
        .types-wrap{
          height: 80px;
          overflow-y: auto;
          .type-item{
            position: relative;
            float: left;
            width: 90px;
            height: 100%;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            .type-icon{
              padding-top: 14px;
              .iconfont{
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                -ms-transition: all 0.3s;
                -o-transition: all 0.3s;
                transition: all 0.3s;
                color: #333333;
                font-size: 30px;
              }
            }
            .type-name{
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
              padding-top: 4px;
              color: #333333;
            }
          }
          .type-item:after{
            position: absolute;
            content: '';
            width: 1px;
            height: 50px;
            background: #dcdcdc;
            top: 16px;
            right: 0;
          }

          .type-item:last-child:after{
            display: none;
          }
          .type-item-on{
            .type-icon{
              .iconfont{
                color: #0B8E45;
              }
            }
            .type-name{
              color: #0B8E45!important;
            }
          }
          .type-item:hover {
            .type-icon{
              .iconfont{
                color: #0B8E45;
              }
            }
            .type-name{
              color: #0B8E45;
            }
          }
        }

      }
      .cue-filter-wrap{
        margin-top: 24px;
        .cue-source,
        .cue-sort{
          height: 45px;
          line-height: 45px;
          border:1px solid #dcdcdc;
          .left-title{
            float: left;
            padding-left: 20px;
            height: 100%;
            width: 144px;
            background:#EEEEEE;
            font-size: 16px;
            color: #333;
            border-right: 1px solid #dcdcdc;
            .iconfont{
              font-size: 16px;
              font-weight: 800;
              margin-right: 10px;
            }
          }
          .right{
            float: left;
            font-size: 16px;
            height: 100%;
            width: calc(100% - 144px);
            padding: 0 20px;
            color: #333;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            .distpicker-address-wrapper{
              select{
                height: 30px!important;
              }
            }
            .float-box{
              position: absolute;
              z-index: 99999999;
              background: #fff;
              left: 0;
              padding: 0 10px;
              border-bottom: solid 1px #ddd;
              box-shadow: 0px 2px 10px #c4c4c4;
              .close-float{
                position: absolute;
                top: -16px;
                right: -8px;
                font-size: 18px;
                cursor: pointer;
              }
            }
            .clear-city{
              // position: absolute;
              // top: 0;
              // left: 550px;
              margin-left: 10px;
              color: #65afea;
              cursor: pointer;
            }
            .comfirm-btn{
              cursor: pointer;
              color: #65c7ea;
            }
            .site-item{
              height: 100%;
              float: left;
              margin-right: 20px;
              cursor: pointer;
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
            }
            .site-item-on{
              color: #FF6600;
            }
            .site-item:hover{
              color: #FF6600;
            }
            .sort-item-tip{
              height: 100%;
              float: left;
              cursor: default;
            }
            .sort-item{
              height: 100%;
              float: left;
              margin-right: 40px;
              cursor: pointer;
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
            }
            .sort-item:hover,
            .sort-item-on{
              color: #FF6600;
            }
            .sort-item:last-child{
              margin-right: 0;
            }
          }
          .city-right{
            padding-top: 5px;
          }
        }
        .cue-sort{
          border-top:none;
        }
      }
      .table-list{
        margin-top: 24px;
        height: calc( 100% - 335px);
        max-height: calc( 100% - 335px);
        overflow-y: hidden;
      }
      .page-wrap{
        margin-top: 20px;
        height: 40px;
      }
    }
  }
  @media (max-width: 1440px) {
    #wait-feedback{
      #header{
        height: 40px;
        .header-icon{
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
        /*搜索框*/
        .search-wrap{
          height: 32px;
          width: 300px;
          .search-ipt{
            width: 260px;
            font-size: 14px;
          }
          .search-btn{
            line-height: 32px;
            width: 38px;
          }
          .search-btn:after{
            content: '';
            left: 0;
            top: 8px;
            width: 2px;
            height: 14px;
          }
        }
      }
      #content {
        margin-top: 16px;
        height: calc(100% - 56px);
        max-height: calc(100% - 56px);
        .cue-types-wrap{
          .title-wrap{
            height: 32px;
            line-height: 32px;
          }
          .types-wrap{
            height: 68px;
            .type-item{
              position: relative;
              float: left;
              width: 86px;
              text-align: center;
              font-size: 14px;
              cursor: pointer;
              .type-icon{
                padding-top: 8px;
                .iconfont{
                  font-size: 24px;
                }
              }
              .type-name{
                color: #333333;
              }
            }
            .type-item:after{
              position: absolute;
              content: '';
              width: 1px;
              height: 44px;
              background: #dcdcdc;
              top: 16px;
              right: 0;
            }
          }
        }
        .cue-filter-wrap{
          margin-top: 16px;
          .cue-source,
          .cue-sort{
            height: 32px;
            line-height: 32px;
            border:1px solid #dcdcdc;
            .right{
              font-size: 14px;
            }
            .city-right{
              padding-top: 0;
            }
          }
          .cue-sort{
            border-top:none;

          }
        }
        .table-list {
          margin-top: 16px;
          height: calc( 100% - 260px);
          max-height: calc( 100% - 260px);
          overflow-y: hidden;
        }
      }
    }
  }
</style>
