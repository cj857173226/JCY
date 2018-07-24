<template>
  <div id="followCue">
    <!--关注线索头部-->
    <div class="follow_header">
      <i class="fa fa-heart"></i>
      关注线索
    </div>
    <!--关注线索内容-->
    <div class="follow_body">
      <!--关注线索筛选-->
      <div class="follow_filter">
        <el-form class="follow_form" :inline="true" >
          <el-form-item label="所属领域 :">
            <el-select class="follow_select" v-model="xslb">
              <el-option label="全部" value="" ></el-option>
              <el-option v-for="(item,index) in typeList"  :key="index" :value="item">{{item}}</el-option>
              <!--<el-option label="全部" value="shanghai" selected></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="线索来源 :">
            <el-select class="follow_select" v-model="xssjbly">
              <el-option label="全部" value=""></el-option>
              <el-option label="举报线索" value="1"></el-option>
              <el-option label="互联网线索" value="2"></el-option>
              <el-option label="公益组织线索" value="3"></el-option>
              <el-option label="热点线索" value="4"></el-option>
              <el-option label="自行发现线索" value="5"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="线索发布时间 :">
          <el-date-picker
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
         </el-form-item>
          <!--<el-form-item label="线索发布开始时间 :">-->
            <!--<el-date-picker class="follow_date" :default-time="beginDate" type="date" placeholder="选择日期" v-model="beginDate"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="线索发布结束时间 :">-->
            <!--<el-date-picker class="follow_date" type="date" placeholder="选择日期" v-model="endDate"></el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="关键词 :" >
            <el-input  class="follow_input" v-model="keyword" placeholder="请输入关键词">
              <!--<i @click="clickIcon" slot="suffix" class="keyword_icon iconfont icon-sousuo"></i>-->
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="border: 1px solid #dcdfe6;" class="follow_btn"  @click="getFollowList">搜索 <i class="iconfont icon-sousuo"></i></el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--数据列表-->
      <div id="follow_list" class="follow_list" ref="cueList" v-loading="isLoading">
        <el-table
          ref="oTable"
          :data=" followList"
          :max-height="tableH"
          :height="tableH"
          style="width: 100%">
          <el-table-column
            prop="SFYD"
            label=""
            width="40">
            <template slot-scope="scope" >
              <i v-show="scope.row.SFYD == 1" class="fa fa-circle isRead"></i>
            </template>
          </el-table-column>
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
            label="所属领域"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="XSSJBLY"
            label="线索来源"
            width="110">
          </el-table-column>
          <el-table-column
            prop="XSFBSJ"
            label="发布时间"
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
              <el-button title="详情" @click="details(scope.$index,scope.row.XSSJBLY,scope.row.XSBH,scope.row.GZBH)" type="text" size="small"><i class="fa fa-file-text"></i></el-button>
              <el-button title="取消关注" @click="cancelFollowClue(scope.row.XSBH,scope.row.XSSJBLY)" type="text" size="small" style="color: #F66"><i class="fa fa-trash-o"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        typeList: [],
        followList: [],//关键线索列表
        tableH:0, //表格高度
        keyword:'',//查询列表关键字
        xslb:'', //线索类型
        pageNum:1, //页码
        pageSize: 20,//每页条数
        total: 0,//总条数
        timeSearch:[],
        xssjbly: "",//线索数据来源
      }
    },
    mounted() {
      localStorage.removeItem('cueList');
      localStorage.removeItem('cueIndex');
      localStorage.removeItem('pageNum');
      localStorage.removeItem('cueType');
      localStorage.removeItem('keyword');
      localStorage.removeItem('cueFrom');
      localStorage.removeItem('beginDate');
      localStorage.removeItem('endDate');
      this.tableResize();
      this.getDefaultDate();
      this.getFollowList();//获取关注线索列表
      this.getClueType();//获取线索类别
    },
    methods: {
      //获取门类
      getClueType(){
        let _this = this;
        _this.axios({
          method:'get',
          url:webApi.Host + webApi.Clue.GetClueTypes
        }).then(function(res){
          if(res.data.code == 0){
            let data = res.data.data;
            _this.typeList = data;
          }
        }).catch(function(err){
          console.log(err);
        })
      },
      getDefaultDate() {//设置默认日期
        let _this = this;
        let endDate = new Date();
        let beginDate = new Date(endDate.getTime() - 3600 * 1000 * 24 * 30);
        _this.timeSearch = [_this.timeFormat(beginDate),_this.timeFormat(endDate)];
      },
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
      remove(id) {//移除关注
        let url = (webApi.ClueManager.UnFollowClue).format({id: id});
        console.log(url);
        this.axios({
          method: 'post',
          url: url,
          timeout: 5000,
        }).then(function(res){
          if(res.data.code==0){
             this.getFollowList();
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      sizeChange(val) {
        console.log(val)
      },
      currentChange(val) {//页码改变
        this.pageNum = val;
        this.getFollowList();
      },
      details(index,text,id,gzid) {
        var _this = this;
        var type2 = 0;
        if(text == '举报线索'){
         type2 = 1
        }else if(text == '互联网线索'){
         type2 = 2
        }else if(text == '公益诉讼线索'){
         type2 = 3
        }else if(text == '热点线索'){
         type2 = 4
        }
        localStorage.setItem('cueList',JSON.stringify(_this.followList));
        localStorage.setItem('cueIndex',index);
        localStorage.setItem('pageNum',_this.pageNum);
        localStorage.setItem('cueType',_this.xslb);
        localStorage.setItem('keyword',_this.keyword);
        localStorage.setItem('cueFrom',_this.xssjbly);
        localStorage.setItem('beginDate',_this.timeSearch[0]);
        localStorage.setItem('endDate',_this.timeSearch[1]);
        this.$router.push({
          path:'/home/cueDetail',
          query:{type:5,type2:type2,id:id,gzid:gzid}
        });
      },
      getFollowList() {//获取关注线索列表
        let _this = this;
        if(!_this.timeSearch) {
          _this.$message({
            message: "请选择时间!",
            type: 'error'
          });
          return
        }
        let data = {
          'keyword': _this.keyword,
          'pageNum': _this.pageNum,
          'pageSize': _this.pageSize,
          'beginDate': _this.timeSearch[0],
          'endDate': _this.timeSearch[1],
          "xslb": _this.xslb,
          "order": "fbsj",
          "xssjbly": _this.xssjbly
        };
        _this.isLoading = true;
        _this.axios({
          url: (webApi.ClueManager.GetFollowClues).format(data),
          timeout: 4000
        }).then(function(res){
          if(res.data.code==0){
            let data = res.data.data.data;
            if(data.length > 0 ){
              for(let i=0 ; i<data.length;i++) {
                let ZYstr = '';
                let str = data[i].JBNR.split("<br/>");
                for (let j = 0; j < str.length; j++) {
                  ZYstr += str[j];
                }
                data[i].JBNR =  ZYstr;
                data[i].JBNR = data[i].JBNR.replace(/<\/br>/gm,"");
                if(data[i].XSSJBLY=="1") {
                  data[i].XSSJBLY="举报线索"
                }else if(data[i].XSSJBLY=="2") {
                  data[i].XSSJBLY="互联网线索"
                }
              }
            }
            _this.followList = data;
            _this.total = res.data.data.total;
            _this.pageSize = res.data.data.pageSize;
            _this.isLoading = false;
          }else {
            _this.isLoading = false;
            _this.$message({
              showClose: true,
              message: res.data.errorMessage,
              duration:2000,
            })
          }
        }).catch(function(err){
          _this.isLoading = false;
          _this.$message({
            showClose: true,
            message: err.data.errorMessage,
            duration:2000
          })
        })
      },
      //取消关注线索
      cancelFollowClue(clueId,clueType){
        let _this = this;
        let clueTypeNum;
        if(clueType){
          switch (clueType){
            case '举报线索':
              clueTypeNum = 1;
              break;
            case  '互联网线索':
              clueTypeNum = 2;
              break;
            case '公益组织线索':
              clueTypeNum = 3;
              break;
            case '热点线索':
              clueTypeNum = 4;
              break;
            case '自行发现线索':
              clueTypeNum = 4;
              break
          }
        }
        _this.$confirm('是否取消关注此线索?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(_this.isLoading == false){
            _this.axios({
              method:'post',
              url:webApi.ClueManager.UnFollowClue.format({xsid:clueId,xssjbly:clueTypeNum})
            }).then(function(res){
              console.log(res)
              if(res.data.code == 0){
                _this.getFollowList()
              }else {
                _this.$message({
                  showClose: true,
                  message: '发生错误,取消关注失败',
                  type: 'error',
                  duration:1000,
                });
              }
            }).catch(function(err){
              _this.$message({
                showClose: true,
                message: '发生错误,取消关注失败',
                type: 'error',
                duration:1000,
              });
            })
          }
        }).catch(() => {

        });

      },
      //表格高度自适应
      tableResize(){
        let _this = this;
        this.$nextTick(function () {
          _this.resize();
          window.addEventListener('resize',_this.resize);
        })
      },
      resize(){
        let _this = this;
        let width = document.body.offsetWidth;
        if(width < 1610 && width > 1440) {
          _this.$refs.cueList.style.height = 'calc(100% - 204px)';
        }else if(width >= 1610) {
          _this.$refs.cueList.style.height = 'calc(100% - 148px)';
        }else if(width <= 1440) {
          _this.$refs.cueList.style.height = 'calc(100% - 190px)';
        }
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
  #followCue {
    height: 100%;
    font-size: 16px;
    /*头部*/
    .follow_header {
      height: 50px;
      background-color: #eeeeee;
      color: #666666;
      border-bottom: 1px solid #dcdcdc;
      i {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-right: 1px solid #dcdcdc;
        margin-right: 15px;
      }
    }
    /*内容*/
    .follow_body {
      height: calc(100% - 50px);
      padding: 30px 50px 0 50px;
      overflow: hidden;
      /*筛选*/
      .follow_filter {
        background-color: #eeeeee;
        color: #333333;
        padding-left: 15px;
        padding-top: 10px;
        .follow_form {
          .el-form-item {
            margin-bottom: 10px;
          }
          .follow_select {
            width: 130px;
          }
          .follow_date {
            width: 130px;
            min-width: 135px;
          }
          .follow_input {
            width: 180px;
          }
        }
      }
      .follow_list {
        height: calc( 100% - 153px);
        font-size: 14px;
        margin-top: 24px;
      }
      .page-wrap{
        margin-top: 24px;
        height: 40px;
      }
    }
  }
  @media (max-width: 1440px) {
    #followCue {
      font-size: 14px;
      /*头部*/
      .follow_header {
        height: 40px;
        i {
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
      }
      /*内容*/
      .follow_body {
        height: calc(100% - 50px);
        padding: 15px 20px 0 20px;
        overflow: hidden;
        /*筛选*/
        .follow_filter {
          .follow_form {
            .follow_select {
              width: 130px;
            }
            .follow_date {
              width: 130px;
            }
            .follow_input {
              width: 180px;
            }
            .follow_btn {
              height: 32px;
              line-height: 6px;
              margin-top: 4px;
            }
          }
        }
        .follow_list {
          height: calc( 100% - 190px);
        }
      }
    }
  }
</style>
