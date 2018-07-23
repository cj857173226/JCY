<template>
    <div id="search-result">
        <div id="head" class="clearfix">
          <div class="title-wrap clearfix">
            <div class="title-icon">
              <i class="fa fa-file-text"></i>
            </div>
            <div class="title">大数据检索</div>
          </div>
            <div class="search-wrap clearfix">
              <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入检索内容" @keyup.13="searchTo()">
              <span class="search-btn" @click.stop.prevent="searchTo()">
                <i class="iconfont icon-sousuo"></i>
              </span>
            </div>
        </div>
        <div id="main-body" class="clearfix"   ref="mainBody" v-loading="tableLoad">
          <div id="sideMenu-wrap"  ref="sideMenuWrap" v-loading="isLoading">
            <ul class="side-menu">
              <li class="menu-item" :class="{'menu-item-on':item.name == currMenuOn}" v-for="(item,index) in sideMenuList" @click.stop.prevent="checkResult(item.name,item.numId,item.hit)">
                <div class="text" :title="item.name">{{item.name}}</div>
                <div class="hit">
                  <i class="el-icon-loading" v-show="item.isLoad"></i>
                  <span v-show="!item.isLoad">({{item.hit>9999? '9999+':item.hit}})</span>
                </div>
              </li>
            </ul>
          </div>
          <div id="result-wrap"  ref="resultWrap">
            <div class="no-data" v-show="header.length==0">
              <div class="text">{{noDataTip}}</div>
            </div>
            <div class="cue-list" ref="cueList" >
              <el-table v-show="header.length>0"
                :data="oTable"
                :max-height="tableH"
                :height="tableH"
                style="width: 100%">
                <el-table-column  v-for="(item,key) in header" :key=key
                                  :label=item
                                  min-width="200">
                  <template slot-scope="scope" >
                    <!-- <div class="td-content" :title="oTable[scope.$index][key]">
                      {{oTable[scope.$index][key]}}
                    </div> -->
                    <el-popover trigger="click" placement="top" >
                      <p>{{oTable[scope.$index][key]}}</p>
                      <div slot="reference" class="td-content">
                        {{oTable[scope.$index][key]}}
                      </div>
                    </el-popover>
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
                @current-change="pageTo"
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
  name:'searchResult',
  data(){
    return {
      tableH:0, //表格高度
      keyword:this.$route.query.keyword,
      sideMenuList:[

      ],
      currMenuOn:'', //左边菜单当前选中
      header:[

      ],
      oTable:[

      ],
      pageSize:20,//每页多少条
      currPage:1, //当前页
      totalPages:0,//总页数
      isLoading:false,//是否在加载中
      noDataTip:'查询中,请稍后',
      tableLoad:false, //表格是否加载
      loadCount:0,// 加载计数器
      currId :'', //当前表格查询ID；
      allDataReady:false,//索引表是否全部加载完毕
    }
  },
  mounted(){
    let _this = this;
    _this.tableResize();//表格高度自适应
    _this.search()
  },
  methods:{
    //选择查询结果
    checkResult(currMenu,id,totalPage){
      let _this = this;
      if(!_this.allDataReady){
        _this.$message({
          message: '别着急,正在为你加载中',
          type: 'warning'
        });
      }else {
        _this.currPage = 1;
        _this.currId = id;
        _this.currMenuOn = currMenu;
        _this.totalPages = totalPage;
        if( _this.totalPages>0){
          _this.getTableData();
        }else {
          _this.noDataTip='暂无相关数据';
          _this.header = [];
          _this.oTable = [];
        }
      }

    },
    //当前页搜索
    searchTo(){
      let _this = this;
      let _currKeyword = _this.$route.query.keyword;
      if(!_this.keyword ==''){
        // _this.noDataTip='查询中,请稍后';
        // _this.currMenuOn='';
        // _this.loadCount=0;
        // _this.sideMenuList=[];
        // _this.header = [];
        // _this.oTable = [];
        this.$router.push({
          path:'/home/searchBlank',
          query:{keyword:_this.keyword.trim()}
        });
      }else{
        _this.$message({
          message: '查询条件不能为空！',
          type: 'warning'
        });
        _this.keyword = _currKeyword;
      }
    },

    //全文检索
    search(){
      let _this = this;
      if(!_this.isLoading){
        _this.loadCount = 0;
        _this.isLoading = true;
        _this.axios({
          method:'GET',
          url:webApi.Host + webApi.WebData.GetAllTables,
        }).then((res)=>{
          _this.isLoading = false;
          if(res.data.code==0){
              let data = res.data.data;
              let arr = [];
              for( let key in data){
                let obj =  {};
                obj['name']=data[key];
                obj['numId'] = key;
                obj['isLoad'] =true;
                arr.push(obj)
              }
              _this.sideMenuList = arr;
              for (let i in _this.sideMenuList){
                _this.keywordHit(_this.sideMenuList[i].numId)
              }
          }
        }).catch((err)=>{
          _this.isLoading = false;
          alert(err)
        })
      }
    },
    //分页查询
    pageTo(page){
      let _this = this;
      _this.currPage = page;
      _this.getTableData()
    },

    //关键字命中
    keywordHit(id){
      let _this = this;
      let sjsybh = id;
      _this.axios({
        methods:'get',
        url:webApi.WebData.SearchIndex.format({sjsybh:sjsybh,keywords:_this.keyword}),
      }).then((res)=>{
        if(res.data.code == 0){
          let data = res.data.data
          _this.loadCount +=1;
          for(let j in _this.sideMenuList){
            if(_this.sideMenuList[j].numId == data.sjsybh){
              _this.sideMenuList[j]['hit'] = data.result;
              _this.sideMenuList[j]['isLoad'] =false;
            }
          }
          console.log(_this.loadCount)
          if(_this.loadCount == _this.sideMenuList.length){

            _this.allDataReady = true;
            _this.checkResult(_this.sideMenuList[0].name,_this.sideMenuList[0].numId,_this.sideMenuList[0].hit)
          }
        }
      }).catch(()=>{
        _this.$message({
          message: '发生错误',
          type: 'error'
        });
      })
    },

    //获取表格数据
    getTableData(){
      let _this = this;
      _this.tableLoad = true;
      _this.axios({
        method:'get',
        url:webApi.WebData.SearchDetail.format({sjsybh:_this.currId,keywords:_this.keyword,p:_this.currPage,ps:_this.pageSize})
      }).then((res)=>{
        _this.tableLoad = false;
        if(res.data.code==0){
          let header = [];
          let tbody = [];
          let data = res.data.data;
          if(data.length>0){
            for ( let key in data[0]){
              header.push(key)
            }
            for(let i=0;i<data.length ;i++){
              let arr = [];
              for(let val in data[i]){
                arr.push(data[i][val]);
              }
              tbody.push(arr)
            }
            _this.header =  header;
            _this.oTable = tbody;
          }else {
            _this.noDataTip='暂无相关数据';
            _this.header =  header;
            _this.oTable = tbody;
          }

        }else {
          _this.$message({
            message: res.errorMessage,
            type: 'error'
          });
        }
      }).catch((err)=>{
        _this.tableLoad = false;
        _this.$message({
          message: '发生错误',
          type: 'error'
        });
      })
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
  cancel() {
    this.source.cancel('')
  },
  //实例销毁钩子
  destroyed(){
    window.removeEventListener('resize',this.resize)
  },
  // watch:{
  //   '$route.fullPath':function(){
  //     let _this = this;
  //     _this.tableResize();//表格高度自适应
  //     _this.search()
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  #search-result{
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
        width: 300px;
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
           position: relative;
           height: 40px;
           line-height: 40px;
           padding:0 20px;
           width: 100%;
           cursor: pointer;
           -webkit-transition: all 0.2s;
           -moz-transition: all 0.2s;
           -ms-transition: all 0.2s;
           -o-transition: all 0.2s;
           transition: all 0.2s;
           .text{
             height: 100%;
             width: 200px;
             overflow: hidden;
             -ms-text-overflow: ellipsis;
             text-overflow: ellipsis;
             white-space: nowrap;
           }
           .hit{
            position: absolute;
             right: 0;
             top: 0;
             height: 40px;
             line-height: 40px;
             width: 60px;
             text-align: center;
             color: red;
           }
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
       width: calc(100% - 300px);
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
       .cue-list{
         height: calc(100% - 64px);
       }
       .page-wrap{
         margin-top: 24px;
         height: 40px;
       }
     }

   }
  }

  @media (max-width: 1440px) {
    #search-result{
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
              .text{
              }
              .hit{
                height: 30px;
                line-height: 30px;
              }
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
