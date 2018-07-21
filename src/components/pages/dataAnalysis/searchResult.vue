<template>
    <div id="allSearch">
        <div id="head" class="clearfix">
          <div class="title-wrap clearfix">
            <div class="title-icon">
              <i class="fa fa-file-text"></i>
            </div>
            <div class="title">全文检索</div>
          </div>
            <div class="search-wrap clearfix">
              <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入检索内容" @keyup.13="">
              <span class="search-btn" @click.stop.prevent="search()">
                <i class="iconfont icon-sousuo"></i>
              </span>
            </div>
        </div>
        <div id="main-body" class="clearfix" v-loading="isLoading"  ref="mainBody">
          <div class="no-data" v-show="sideMenuList.length==0 && !isLoading">
            <div class="text">{{noDataTip}}</div>
          </div>
          <div id="sideMenu-wrap" v-show="sideMenuList.length>0" ref="sideMenuWrap">
            <ul class="side-menu">
              <li class="menu-item" :class="{'menu-item-on':item == currMenuOn}" v-for="(item,index) in sideMenuList" @click.stop.prevent="checkResult(item)">{{item}}</li>
            </ul>
          </div>
          <div id="result-wrap"  ref="resultWrap">
            <div class="cue-list" ref="cueList" >
              <el-table v-show="header.length>0"
                :data="oTable"
                :max-height="tableH"
                :height="tableH"
                style="width: 100%">
                <el-table-column  v-for="(item,key) in header" :key=key
                                  :label=item
                                  min-width="100">
                  <template slot-scope="scope" >
                    <div class="td-content">
                      {{oTable[scope.$index][key]}}
                    </div>
                  </template>
                </el-table-column>
                <!--<el-table-column-->
                  <!--fixed="right"-->
                  <!--label="操作"-->
                  <!--width="60">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-button type="text" size="medium"><i class="fa fa-location-arrow"></i></el-button>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>
            </div>
            <div class="page-wrap" v-show="header.length>0">
              <el-pagination
                @current-change=""
                :page-size="pageSize"
                :current-page="currPage"
                layout="total, prev, pager, next, jumper"
                :total="totalPages">
              </el-pagination>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'allSearch',
  data(){
    return {
      tableH:0, //表格高度
      keyword:'',
      sideMenuList:[
        // '表格1',
        // '表格2',
        // '表格3',
        // '表格4',
        // '表格5',
        // '表格6',
        // '表格7',
        // '表格8',
      ],
      currMenuOn:'表格1', //左边菜单当前选中
      header:[
        // '姓名',
        // '年龄',
        // '描述',
        // '时间',
      ],
      oTable:[
        // ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
        // ['李四',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
        // ['王麻子',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
        // ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
        // ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4']
      ],
      pageSize:20,//每页多少条
      currPage:1, //当前页
      totalPages:1000,//总页数
      isLoading:false,//是否在加载中
      noDataTip:'请输入关键字查询结果'
    }
  },
  mounted(){
    let _this = this;
    _this.tableResize();//表格高度自适应
  },
  methods:{
    //选择查询结果
    checkResult(currMenu){
      let _this = this;
      _this.currMenuOn = currMenu;
    },
    //全文检索
    search(){
      let _this = this;
      _this.isLoading = true;

        setTimeout(()=>{
          _this.isLoading = false;
          _this.sideMenuList = [
            '表格1',
            '表格2',
            '表格3',
            '表格4',
            '表格5',
            '表格6',
            '表格7',
            '表格8',
          ];
          _this.header=[
            '姓名',
            '年龄',
            '描述',
            '时间',
          ];
          _this.oTable=[
            ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
            ['李四',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
            ['王麻子',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
            ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4'],
            ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-4-4']
          ]
          _this.tableH = _this.$refs.cueList.clientHeight;
        },2000)



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
  #allSearch{
    height: 100%;
    #head{
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
          font-size: 22px;
          color: #666666;

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
   #main-body{
     width: 100%;
     height: calc(100% - 50px);
     overflow: hidden;
     #sideMenu-wrap{
        float: left;
        height: 100%;
        width: 250px;
        border-right: 1px solid #E5E5E5;
       .side-menu{
         padding: 0;
         height: 100%;
         overflow-y: auto;
         color: #333333;
         font-size: 14px;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
         .menu-item{
           height: 40px;
           line-height: 40px;
           padding:0 20px;
           width: 100%;
           overflow: hidden;
           -ms-text-overflow: ellipsis;
           text-overflow: ellipsis;
            white-space: nowrap;
           cursor: pointer;
           -webkit-transition: all 0.2s;
           -moz-transition: all 0.2s;
           -ms-transition: all 0.2s;
           -o-transition: all 0.2s;
           transition: all 0.2s;
         }
         .menu-item:hover{
           background: rgba(41, 255, 24, 0.16);
         }
         .menu-item-on{
           background: rgba(41, 255, 24, 0.16);
           color: #3bcb00;
         }
       }
     }
     #result-wrap{
       float: left;
       height: 100%;
       width: calc(100% - 250px);
       .cue-list{
         height: calc(100% - 64px);
       }
       .page-wrap{
         margin-top: 24px;
         height: 40px;
       }
     }
     .no-data{
       display: flex;
       height: 100%;
       width: 100%;
       align-items:center;
       justify-content:center;
       .text{
         font-size: 30px;
         font-weight: 800;
         color: #CCCCCC;
       }
     }
   }
  }

  @media (max-width: 1440px) {
    #allSearch{
      #head{
        height: 40px;
        line-height: 40px;
        /*标题*/
        .title-wrap{
          .title-icon{
            width: 40px;
            font-size: 18px;
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
      #main-body{
        height: calc( 100% - 40px);
        #sideMenu-wrap{
          .side-menu{
            .menu-item{
              height: 32px;
              line-height: 32px;
            }
            .menu-item:hover{
            }
            .menu-item-on{
            }
          }
        }
        #result-wrap{
          .cue-list{
            height: calc(100% - 56px);
          }
          .page-wrap{
            margin-top: 16px;
            height: 40px;
          }
        }
      }
    }
  }
</style>
