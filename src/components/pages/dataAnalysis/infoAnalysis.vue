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
              <div class="title"></div>
              <div class="check-btn">
                <i class="el-icon-d-caret"></i>
              </div>
            </div>
            <div class="curr-list-wrap">
                <div class="cue-list" ref="cueList" >
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
                        <template slot-scope="scope" >
                          <i v-show="scope.row.SFYD == 0" class="fa fa-circle isRead"></i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="ZY"
                        label="内容"
                        min-width="300"
                      >
                        <template slot-scope="scope">
                          <el-popover trigger="click" placement="top" >
                            <p style="text-indent: 2em;">{{ scope.row.ZY }}</p>
                            <div slot="reference" class="td-content">
                              {{ scope.row.ZY}}
                            </div>
                          </el-popover>
                        </template>
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
                        label="所属领域"
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
                        <template slot-scope="scope">
                          <el-popover trigger="click" placement="top" >
                            <p>{{ scope.row.GJC }}</p>
                            <div slot="reference" class="td-content">
                              {{ scope.row.GJC}}
                            </div>
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                          <el-button @click="details(scope.row.XSBH ,scope.row.SFYD,'2')" title="详情" type="text" size="small"><i class="fa fa-file-text"></i></el-button>
                          <el-button v-show="scope.row.SFGZ =='0'" title="未关注(关注)" @click="followClue(scope.row.XSBH ,'2')" style="color: #F66" type="text" size="small"><i class="fa fa-heart-o"></i></el-button>
                          <el-button v-show="scope.row.SFGZ =='1'" title="已关注(取消关注)" @click="cancelFollowClue(scope.row.XSBH ,'2')" style="color: #F66" type="text" size="small"><i class="fa fa-heart"></i></el-button>
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
const cityOptions = ['啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊!!!!!!!!!!!!!!!!!!aaaaaaaaaaaaaaaa!', '北京', '广州', '深圳'];
export default {
    components:{lightMap},
    data(){
        return{
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
        }
    },
  mounted(){
    let _this = this;
    _this.getInternetCueList(); //获取互联网线索列表
    _this.tableResize();//表格高度自适应
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
    //获取互联网线索列表
    getInternetCueList(){
      let _this = this;
      if(_this.isLoad ==false){
        _this.isLoad = true;
        let url = webApi.Clue.GetWebClues.format({keyword:_this.keyword,type:_this.type,site:_this.site,order:_this.order,p:_this.page,ps:_this.pageSize})
        _this.axios({
          method:'get',
          url:url
        }).then(function(res){
          console.log(res.data)
          _this.isLoad = false;
          if(res.data.code == 0){
            let data = res.data.data.data;
            _this.totalPages = res.data.data.total
            _this.internetCueList = data;
          }else {
            _this.$message.error(res.data.errorMessage);
          }
        }).catch(function(err){
          _this.isLoad = false;
        })
      }
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
        height: 40px;
        width: 100%;
        background: #EEEEEE;
        border-bottom: 1px solid #dcdcdc;
        .search-wrap{
          float: right;
          background: #FFFFFF;
          height: 32px;
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
            font-size: 14px;
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
            line-height: 32px;
            width: 38px;
            color: #999999;
            text-align: center;
            cursor: pointer;
          }
          .search-btn:after{
            content: '';
            position: absolute;
            left: 0;
            top: 8px;
            width: 2px;
            height: 14px;
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

          }
          .check-btn{
            height: 100%;
            float:right;
            width: 40px;
            background: #E5E5E5;
          }
        }
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
</style>
