<template>
  <div id="internetCue">
    <div class="internet-cue-head clearfix">
      <div class="title-wrap clearfix">
        <div class="title-icon">
          <i class="iconfont icon-changyonglogo46"></i>
        </div>
        <div class="title">互联网线索</div>
      </div>
      <div class="search-wrap clearfix">
        <input class="search-ipt" type="text" placeholder="请输入内容">
        <span class="search-btn">
            <i class="iconfont icon-sousuo"></i>
          </span>
      </div>
    </div>
    <div class="main-body">
      <div class="cue-types-wrap">
        <div class="title-wrap">
          <i class="iconfont icon-leibieguanli"></i>
          <span>举报门类</span>
        </div>
        <div class="types-wrap clearfix">
          <div class="type-item">
            <div class="type-icon">
              <i class="iconfont icon-shipinshengchanqiye"></i>
            </div>
            <div class="type-name">
              食药安全
            </div>
          </div>
          <div class="type-item">
            <div class="type-icon">
              <i class="iconfont icon-44"></i>
            </div>
            <div class="type-name">
              英雄保护
            </div>
          </div>
          <div class="type-item">
            <div class="type-icon">
              <i class="iconfont icon-jinqian"></i>
            </div>
            <div class="type-name">
              国有财产
            </div>
          </div>
          <div class="type-item">
            <div class="type-icon">
              <i class="iconfont icon-shouyeshipin"></i>
            </div>
            <div class="type-name">
              食品安全
            </div>
          </div>
          <div class="type-item">
            <div class="type-icon">
              <i class="iconfont icon-diqiuyi"></i>
            </div>
            <div class="type-name">
              国土资源
            </div>
          </div>
          <div class="type-item">
            <div class="type-icon">
              <i class="iconfont icon-huanjingbaohu"></i>
            </div>
            <div class="type-name">
              环境保护
            </div>
          </div>

        </div>
      </div>
      <div class="cue-filter-wrap">
          <div class="cue-source clearfix">
            <div class="left-title">
                <i class="iconfont icon-caiji"></i>
                采集网站:
            </div>
            <div class="right">
                <div class="site-item" v-for="(item,index) in siteList">{{item}}</div>
            </div>
          </div>
          <div class="cue-sort clearfix">
            <div class="left-title">
              <i class="iconfont icon-paixu01"></i>
              排序字段:
            </div>
            <div class="right">
                <div class="sort-item">发布时间</div>
                <div class="sort-item">采集时间</div>
                <div class="sort-item">(倒序排列)</div>
            </div>
          </div>
      </div>
      <div class="cue-list" ref="cueList">
        <el-table
          ref="oTable"
          :data=" internetCueList"
          :max-height="tableH"
          :height="tableH"
          style="width: 100%">
          <el-table-column
            prop="SFYD"
            label=""
            width="40">
          </el-table-column>
          <el-table-column
            prop="ZY"
            label="内容"
            min-width="300">
          </el-table-column>
          <el-table-column
            prop="FBSJ"
            label="发布时间"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="CJSJ"
            label="采集时间"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="XSLB"
            label="线索类别"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="XSLY"
            label="线索来源"
            width="150">
          </el-table-column>
          <el-table-column
            prop="GJC"
            label="关键词"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="details(scope.$index, scope.row.XSBH)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">关注</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
        return{
          //来源地址
          siteList:[
            "某某某网站",
            "某某某网站",
            "某某某网站",
            "某某某网站",
            "某某某网站",
            "某某某网站",
            "某某某网站",
          ],
          tableH:0, //表格高度
          internetCueList: [  //互联网线索列表

          ],
          keyword:'',//查询列表关键字
          type:'', //线索类型
          page:1, //页码
          pageSize: 20,//每页条数
          order:'',//排序方式
          site:'',//来源站点
        }
      },
    mounted(){
      let _this = this;
     _this.tableResize();
     _this.getInternetCueList();
    },
    methods:{
        //获取互联网线索列表
      getInternetCueList(){
        let _this = this;
        let url = webApi.Clue.GetWebClues.format({keyword:_this.keyword,type:_this.type,site:_this.site,order:_this.order,p:_this.page,ps:_this.pageSize})
        _this.axios({
          methods:'get',
          url:url
        }).then(function(res){
          if(res.data.code == 0){
            let data = res.data.data.data;
            let ZYstr = '';
            for(let i = 0;i < data.length; i++){
             let str = data[i].ZY.split("<br/>");
             for(let j= 0;j<str.length;j++){
               ZYstr += str[j];
             }
              data[i].ZY = ZYstr;
            }
            _this.internetCueList = data;
          }
        }).catch(function(err){

        })
      },

      // 查看详情
      details(index,id){
        this.$router.push({
          path:'/home/cueDetail',
          query:{id:id}
        });
      },
       //表格高度自适应
      tableResize(){
        let _this = this;
        this.$nextTick(function () {
          _this.tableH = _this.$refs.cueList.clientHeight;
          window.onresize = _this.resize;
        })
      },
      resize(){
        let _this = this;
        _this.tableH = _this.$refs.cueList.clientHeight;
      }
    },

    //实例销毁钩子
    destroyed(){
      let _this = this;
      window.removeEventListener('onresize',_this.resize)
    }

  }
</script>

<style lang="scss" scoped>
  #internetCue{
    height: 100%;
    max-height:100%;
    min-width: 750px;
    overflow-y:hidden;
    .internet-cue-head{
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #EEEEEE;
      border-bottom: 1px solid #dcdcdc;
      /*标题*/
      .title-wrap{
        float: left;
        height: 100%;
        .title-icon{
          float: left;
          height: 100%;
          text-align: center;
          width: 50px;
          border-right: 1px solid #dcdcdc;
          .iconfont{
            font-size: 28px;
            color: #666666;
          }
        }
        .title{
          float: left;
          padding-left: 10px;
          font-size: 16px;
          color: #666666;
        }
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
    .main-body{
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
          .type-item{
            position: relative;
            float: left;
            width: 90px;
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
          height: 40px;
          line-height: 40px;
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
            .site-item{
              height: 100%;
              float: left;
              margin-right: 20px;
              cursor: pointer;
            }
            .site-item:last-child{
              margin-right: 0;
            }
            .sort-item{
              height: 100%;
              float: left;
              margin-right: 40px;
              cursor: pointer;
            }
            .sort-item:last-child{
              margin-right: 0;
            }
          }
        }
        .cue-sort{
          border-top:none;
        }
      }
      .cue-list{
        margin-top: 24px;
        height: calc( 100% - 314px);
        max-height: calc( 100% - 314px);
        overflow-y: hidden;
      }
      .page-wrap{
        margin-top: 24px;
        height: 40px;
      }
    }
  }


  @media (max-width: 1440px) {

    #internetCue{
      .internet-cue-head{
        height: 40px;
        line-height: 40px;
        /*标题*/
        .title-wrap{
          .title-icon{
            width: 40px;
            .iconfont{
              font-size: 18px;
            }
          }
          .title{
            font-size: 16px;
          }
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
      .main-body{
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
              width: 86px;
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
          }
          .cue-sort{
            border-top:none;

          }
        }
        .cue-list{
          margin-top: 16px;
          height: calc( 100% - 254px);
          max-height: calc( 100% - 254px);
          overflow-y: hidden;
        }
        .page-wrap{
          margin-top: 16px;
          height: 40px;
        }
      }
    }

  }
</style>
