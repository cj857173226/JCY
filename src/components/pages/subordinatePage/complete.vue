<template>
  <div id="complete">
    <div id="header">
      <span class="header-icon">
          <i class="fa fa-check-square"></i>
      </span>
      <span class="header-title">已反馈线索</span>
    </div>
    <div class="follow_filter">
      <el-form class="follow_form" :inline="true" >
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
        <el-form-item label="关键词 :" >
          <el-input  class="follow_input" v-model="keyword" placeholder="请输入关键词">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="border: 1px solid #dcdfe6;" class="follow_btn"  @click="getClueList">搜索 <i class="iconfont icon-sousuo"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="content">
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
        type: 2,//type=0:待确认接收；1：正在办理；2：已反馈结果;3：全部
        order: "cjsj",//排序
        timeSearch: ['2017-01-01',this.timeFormat(new Date())],//时间
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
  #complete {
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
    }
    /*筛选*/
    .follow_filter {
      background-color: #eeeeee;
      color: #333333;
      padding-left: 15px;
      padding-top: 5px;
      margin: 15px 20px 0;
      height: 50px;
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
    #content{
      height: calc(100% - 40px - 65px);
      margin: 0 20px 0;
      .table-list{
        padding-top: 10px;
        height: calc(100% - 70px);
      }
      .page-wrap{
        margin-top: 20px;
        height: 40px;
      }
    }
  }
  @media (max-width: 1440px) {
    #complete {
      #header{
        height: 40px;
        .header-icon{
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
</style>
