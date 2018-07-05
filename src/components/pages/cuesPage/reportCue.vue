<template>
  <div id="reportCue">
      <div class="report-cue-head clearfix">
          <div class="title-wrap clearfix">
            <div class="title-icon">
              <i class="iconfont icon-biaoqian"></i>
            </div>
            <div class="title">举报线索</div>
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
        <div class="cue-list" ref="cueList">
          <el-table
             ref="oTable"
            :data="reportCueList"
             :max-height="tableH"
             :height="tableH"
            style="width: 100%">
            <el-table-column
              prop=""
              label="举报内容"
              min-width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="举报时间"
              min-width="150"
              >
            </el-table-column>
            <el-table-column
              prop="province"
              label="举报门类"
              min-width="100"
              >
            </el-table-column>
            <el-table-column
              prop="city"
              label="事发地点"
              min-width="120"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="举报人姓名"
              min-width="100"
              >
            </el-table-column>
            <el-table-column
              prop="zip"
              label="联系方式"
              min-width="200"
              >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
    data() {
      return {
        tableH: 0,  //表格高度
        reportCueList:[       //举报列表

        ],
        keyword:'',//查询列表关键字
        type:'', //线索类型
        page:1, //页码
        pageSize: 20,//每页条数
      }
    },
    mounted(){
      let _this = this;
      _this.tableResize();
      _this.getReportCue();
    },
    methods:{

      //获取举报线索列表
      getReportCue:function(){
        let _this = this;
        let url = webApi.Clue.GetReportClues.format({keyword:_this.keyword,type:_this.type,p:_this.page,ps:_this.pageSize})
        _this.axios({
          methods:'get',
          url:url
        }).then(function(res){

        }).catch(function(err){

        })
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
  #reportCue{
    height: 100%;
    max-height:100%;
    min-width: 750px;
    overflow-y:hidden;
    .report-cue-head{
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
            font-size: 20px;
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
      .cue-list{
        margin-top: 24px;
        height: calc( 100% - 210px);
        max-height: calc( 100% - 210px);
        overflow-y: hidden;
      }
      .page-wrap{
        margin-top: 24px;
        height: 40px;
      }
    }
  }

  @media (max-width: 1440px) {

      #reportCue{
        .report-cue-head{
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
          .cue-list{
            margin-top: 16px;
            height: calc( 100% - 174px);
            max-height: calc( 100% - 174px);
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
