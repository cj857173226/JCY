<template>
  <div id="complete">
    <div id="header">
            <span class="header-icon">
                <i class="fa fa-check-square"></i>
            </span>
      <span class="header-title">已反馈线索</span>
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
              <el-button @click="detail(scope.row.XSSJBLY,scope.row.XSBH)"  type="text" size="small">查看</el-button>
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
    name:'complete',
    data(){
      return{
        isThisNav:1,//导航
        pageSize:10, //每页条数
        pageNum:1, //当前页
        totalPages: 0, //总条数
        type: "",//线索类型
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
        ], //待反馈线索

        tableH:0, //表格高度
        keyword:'', //关键字
        isLoad:false,//数据是否在加载
      }
    },
    mounted(){
      this.tableResize();
    },
    methods:{
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
      //搜索
      getClueList(){

      },
      //跳转分页
      pageTo(){

      },
      //审批
      detail(text,id){
        var type = 0;
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
          query:{type:11,type2:type,id:id,nav:4}
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
  #complete{
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
      .table-list{
        margin-top: 24px;
        height: calc( 100% - 210px);
        max-height: calc( 100% - 210px);
        overflow-y: hidden;
      }
      .page-wrap{
        margin-top: 20px;
        height: 40px;
      }
    }
  }
  @media (max-width: 1440px) {
    #complete{
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
        .table-list {
          margin-top: 16px;
          height: calc( 100% - 174px);
          max-height: calc( 100% - 174px);
          overflow-y: hidden;
        }
      }
    }
  }
</style>
