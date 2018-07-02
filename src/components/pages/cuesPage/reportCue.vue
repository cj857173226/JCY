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
            :data="tableData"
             :max-height="tableH"
            style="width: 100%">
            <el-table-column
              fixed
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
        tableH:0,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },]
      }
    },
    mounted(){
        // console.log(this.$refs.cueList.clientHeight)
        console.log(this)
      var _this = this;
        _this.tableH = _this.$refs.cueList.clientHeight;
      window.onresize=function () {
        _this.tableH = _this.$refs.cueList.clientHeight;
      }
    },
    methods:{

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
</style>
