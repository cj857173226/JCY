<template>
    <div id="info">
        <div id="tool-bar">
          <div class="head">
            <div class="search-wrap">
              <input class="search-ipt" type="text"  placeholder="请输入内容">
              <span class="search-btn" >
                <i class="iconfont icon-sousuo"></i>
              </span>
            </div>
          </div>
          <div class="check-wrap">
            <template>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group class="check-group" v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="check-item" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </template>
            <el-button type="primary" size="mini">确定</el-button>
          </div>
          <div class="list-wrap">
            <div class="list-check-wrap clearfix">
              <div class="title-label">
                表名:
              </div>
              <div class="title" @click.stop.prevent="checkTableModal">
                {{currTableName}}
              </div>
              <div class="check-btn" :class="{ 'check-on':listCheckShow}" @click.stop.prevent="checkTableModal">
                <i class="el-icon-d-caret"></i>
              </div>
              <check-box class="list-check-box" :table-names = 'tableNames' :curr-table="currTableName" @currTable="tableChecked" v-show="listCheckShow"  @click.stop.prevent></check-box>
            </div>
            <div class="curr-list-wrap">
                <div class="cue-list" ref="cueList" >
                    <el-table
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

                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="60">
                        <template slot-scope="scope">
                          <el-button type="text" size="medium"><i class="fa fa-location-arrow"></i></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
            </div>
          </div>
        </div>
        <div id="map-bar">
            <light-map></light-map>
        </div>
    </div>
</template>

<script>
import lightMap from '../../pubilcComponents/toolComponets/lightMap'
import checkBox from '../../pubilcComponents/toolComponets/tableCheckBox'
const cityOptions = ['啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊!!!!!!!!!!!!!!!!!!aaaaaaaaaaaaaaaa!', '北京', '广州', '深圳'];
export default {
    components:{lightMap,checkBox},
    data(){
        return{
          header:[
            '姓名',
            '年龄',
            '描述',
          ],
          oTable:[
            ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'],
            ['李四',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'],
            ['王麻子',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'],
            ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'],
            ['张三',19,'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊']
          ],
          checkAll: false,
          checkedCities: ['上海', '北京'],
          cities: cityOptions,
          isIndeterminate: true,
          tableH:0, //表格高度,
          internetCueList:[

          ],
          keyword:'',//查询列表关键字
          type:'', //线索类型
          page:1, //页码
          pageSize: 20,//每页条数
          totalPages:0,//总条数
          order:'cjsj',//排序方式
          site:'',//来源站点
          isLoad:false,//数据是否在加载
          currTableName:'默认初始表格名称',  //当前展示的表格名称
          tableNames:[
            '这个这个表',
            '那个那个表',
            '这又是什么表'
          ],
          listCheckShow:false
        }
    },
  mounted(){
    let _this = this;
    _this.tableResize();//表格高度自适应
    window.onclick=function(){
      _this.listCheckShow = false;
    }
  },
  methods:{
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    //表格选择弹出
    checkTableModal(){
      let _this = this;
      _this.listCheckShow = !_this.listCheckShow
    },
    //表格选择
    tableChecked(curr){
      let _this = this;
      _this.currTableName = curr;
      _this.listCheckShow = false;
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
#info{
    width: 100%;
    height: 100%;
    #tool-bar{
        width: 400px;
        height: 100%;
        float: left;
      .head{
        height: 50px;
        width: 100%;
        background: #EEEEEE;
        border-bottom: 1px solid #dcdcdc;
        .search-wrap{
          float: right;
          background: #FFFFFF;
          height: 42px;
          width: 300px;
          margin-right: 30px;
          margin-top: 4px;
          border: 1px solid #dcdcdc;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          .search-ipt{
            width: 260px;
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
            width: 38px;
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
      .check-wrap{
        height: 200px;
        max-height: 200px;
        padding: 10px 0 10px 20px;
        .check-group{
          width: 100%;
          height: 120px;
          max-height: 120px;
          overflow-y: auto;
          overflow-x: hidden;
          .check-item{
            box-sizing: content-box;
            margin:0;
            padding-right: 30px;
            padding-bottom: 15px;
            height: 20px;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .list-wrap{
        height:calc(100% - 240px);
        .list-check-wrap{
          position: relative;
          height: 40px;
          border-top: 1px solid #e4e7ed;
          font-size: 16px;
          text-align: center;
          line-height: 38px;
          .title-label{
            float: left;
            width: 80px;
            background: #E5E5E5;
            height: 100%;
          }
          .title{
            float: left;
            width: calc( 100% - 120px);
            max-width: calc( 100% - 120px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 20px;
            color: #f60;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .check-btn{
            height: 100%;
            float:right;
            width: 40px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
            transition: all 0.3s;
            background: #E5E5E5;
            cursor: pointer;
          }
          .check-on,
          .check-btn:hover{
            color: #f60;
          }
          .list-check-box{
            top: 39px;
          }
        }.curr-list-wrap
        .curr-list-wrap{
          height: calc(100% - 40px);
          .cue-list{
            height: 100%;
          }
        }
      }
    }
    #map-bar{
        width: calc(100% - 400px);
        height: 100%;
        margin-left: 400px;
    }
}

  @media (max-width: 1440px) {
    #info{

      #tool-bar{

        .head{
          height: 40px;
          .search-wrap{
            height: 32px;
            .search-ipt{
              font-size: 14px;
            }
            .search-btn{
              line-height: 32px;
            }
            .search-btn:after{
              left: 0;
              top: 8px;
              width: 2px;
              height: 14px;
            }
          }
        }
        .check-wrap{
          .check-group{

            .check-item{

            }
          }
        }
        .list-wrap{
          .list-check-wrap{
            height: 30px;
            font-size: 14px;
            line-height: 29px;
            .title-label{

            }
            .title{

            }
            .check-btn{
            }
            .check-btn:hover{
            }
            .list-check-box{
              top: 29px;
            }
          }
          .curr-list-wrap{
            height: calc(100% - 30px);
            .cue-list{
            }
          }
        }
      }
      #map-bar{

      }
    }
  }
</style>
