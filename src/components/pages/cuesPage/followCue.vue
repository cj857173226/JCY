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
          <el-form-item label="线索类型 :">
            <el-select class="follow_select" v-model="formInline.region">
              <el-option label="全部" value="shanghai" selected></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线索来源 :">
            <el-select class="follow_select" v-model="formInline.region">
              <el-option label="全部来源" value="1"></el-option>
              <el-option label="互联网线索" value="2"></el-option>
              <el-option label="举报线索" value="3"></el-option>
              <el-option label="公益组织线索" value="4"></el-option>
              <el-option label="热点线索" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线索发布开始时间 :">
            <el-date-picker class="follow_date" type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
          </el-form-item>
          <el-form-item label="线索发布结束时间 :">
            <el-date-picker class="follow_date" type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
          </el-form-item>
          <el-form-item label="关键词 :" prop="name">
            <el-input  class="follow_input" v-model="ruleForm.name" placeholder="请输入关键词">
              <!--<i @click="clickIcon" slot="suffix" class="keyword_icon iconfont icon-sousuo"></i>-->
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="border: 1px solid #dcdfe6;" class="follow_btn"  @click="clickIcon">搜索 <i class="iconfont icon-sousuo"></i></el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--数据列表-->
      <div class="follow_list" ref="cueList">
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
              <el-popover trigger="hover" placement="top" max-width="400">
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
              <el-popover trigger="hover" placement="top" max-width="400">
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
              <el-button type="text" size="small">移除</el-button>
              <el-button @click="details(scope.row.XSSJBLY,scope.row.XSBH)" type="text" size="small">查看</el-button>
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
        followList: [],//关键线索列表
        tableH:0, //表格高度
        keyword:'',//查询列表关键字
        xslb:'', //线索类型
        pageNum:1, //页码
        pageSize: 20,//每页条数
        beginDate: "",//线索发布开始时间
        endDate: "",//线索发布结束时间
        formInline: {
          user: '',
          region: ''
        },
        ruleForm: {
          date1: '',
          name: ""
        },
      }
    },
    mounted() {
      this.getFollowList();//获取关注线索列表
      this.tableResize();
    },
    methods: {
      clickIcon() {
        console.log('1')
      },
      details(text,id) {
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
        this.$router.push({
          path:'/home/cueDetail',
          query:{type:5,type2:type2,id:id,}
        });
      },
      getFollowList() {//获取关注线索列表
        let _this = this;
        _this.axios({
          url: (webApi.ClueManager.GetFollowClues).format({
            'keyword': " ",
            'pageNum': 1,
            'pageSize': 20,
            'beginDate': "2018-06-05",
            'endDate': "2018-07-05",
            "xslb": " "
          }),
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
          }
          console.log(res)
        }).catch(function(err){
          console.log(err)
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
            width: 100px;
          }
          .follow_date {
            width: 150px;
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
</style>
