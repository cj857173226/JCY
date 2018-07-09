<template>
  <div id="homePage">
    <!--数据分析-->
    <el-row :gutter="10" class="dataAnalysis">
      <el-col :lg="6" :sm="12" class="analysisBox_wrap" v-for="(item,index) in dataCount" :key="index">
        <div class="analysisBox">
          <div class="analysisBox_top">
            <span v-text="item.val"></span>
            <i class="fa  fa-3x" :class="item.icon"></i>
          </div>
          <div class="analysis_more" v-text="item.title"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="16">
        <heatmap></heatmap>
      </el-col>
      <el-col :lg="8">
        <!--关键词图表-->
        <word-cloud></word-cloud>
        <!--线索领域占比图-->
        <pie-chart></pie-chart>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <!--新闻-->
        <div class="text_box">
          <!--标题-->
          <div class="text_head">
            <span>新闻动态</span>
            <router-link tag="span" to="home/news">更多>></router-link>
          </div>
          <!--内容-->
          <ul class="text_body" v-loading="newsLoading">
            <li v-for="(item, index) in newsData.slice(0,6)" :key="index">
              <div class="text_title">
                <p v-text="item.BT" @click="details('news',item.BH)"></p>
                <p>
                  <span>来源: {{item.LY}}</span>
                  <span>发布时间: {{item.FBSJ}}</span>
                </p>
              </div>
              <div class="text_content" v-text="item.NR"></div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :lg="12" :sm="24">
        <!--知识库-->
        <div class="text_box">
          <!--标题-->
          <div class="text_head">
            <span>理论研究 | 法律规章</span>
            <router-link tag="span" to="/home/knowledge">更多>></router-link>
          </div>
          <!--内容-->
          <ul class="text_body" v-loading="knowLoading">
            <li v-for="(item, index) in knowledgeData.slice(0,6)" :key="index">
              <div class="text_title">
                <p v-text="item.BT" @click="details('know',item.BH)"></p>
                <p>
                  <span>来源: {{item.LY}}</span>
                  <span>发布时间: {{item.FBSJ}}</span>
                </p>
              </div>
              <div class="text_content" v-text="item.NR"></div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import heatmap from '../pubilcComponents/eChartComponents/heatMap'
  import wordCloud from '../pubilcComponents/eChartComponents/wordCloud'
  import pieChart from '../pubilcComponents/eChartComponents/pieChart'
  export default {
    components: {heatmap,wordCloud,pieChart},
    data() {
      return {
        IdentityType: localStorage.getItem('IdentityType'),//身份信息
        knowLoading: false,
        newsLoading: false,
        newsData: [],//新闻动态信息
        knowledgeData: [],//知识库信息
        dataCount: [//数据统计
          {title: "线索总量", val: 0,icon:'fa-list'},
          {title: "关注线索总量", val: 0,icon:'fa-heart-o'},
          {title: "已办理线索", val: 0,icon:'fa-envelope-o'},
          {title: "举报接收线索", val: 0,icon:'fa-check-circle'}
        ]
      }
    },
    methods: {
      //跳转详情
      details(type,id) {
        let path = "";
        if(type=="news") {
          path = '/home/newsDetail';
        }else {
          path = '/home/knowledgeDetail';
        }
        this.$router.push({
          path: path,
          query: {id: id}
        })
      },
      getNewsData() {//获取新闻动态信息、知识库信息
        let _this = this;
        let setDataContent = function(data) {
          if(data.length > 0) {
            for(let i=0;i<data.length;i++){
              (data[i].NR) && (data[i].NR = data[i].NR.slice(0,200) + '...')
            }
          }
        };
        _this.knowLoading = true;
        _this.newsLoading = true;
        _this.axios({//新闻动态
          method: 'get',
          url: (webApi.News.GetTopNews).format({'top': 6}),
          timeout: 4000,
        }).then(function(res){
          if(res.data.code==0) {
            setDataContent(res.data.data.data);
            _this.newsData = res.data.data.data;
            _this.newsLoading = false;
          }
        }).catch(function(err){
          _this.newsLoading = false;
          console.log(err)
        })
        _this.axios({//知识库
          method: 'get',
          url: (webApi.Knowledge.GetTop).format({'top': 6}),
          timeout: 4000,
        }).then(function(res){
          if(res.data.code==0) {
            setDataContent(res.data.data.data);
            _this.knowledgeData = res.data.data.data;
            _this.knowLoading = false;
          }
        }).catch(function(err){
          _this.knowLoading = false;
          console.log(err)
        })
      },
      getDataCount() {//获取数据统计信息
        let _this = this;
        let setDataCount = function(obj,newObj) {
          for(let i in obj) {
            _this.$set(obj, i, newObj[i]);
          }
        }
        _this.axios({
          method: 'post',
          url: webApi.Host + webApi.Stats.CountMonthClues,
          timeout: 2000,
        }).then(function(res){
          if(res.data.code==0){
            setDataCount(_this.dataCount[0],{title: '线索总量', val: res.data.data.Total,icon:'fa-list'});
          }
        }).catch(function(err){
          console.log(err)
        })

        _this.axios({
          method: 'post',
          url: webApi.Host + webApi.Stats.CountFollowClues,
          timeout: 2000,
        }).then(function(res){
          if(res.data.code==0){
            setDataCount(_this.dataCount[1],{title: '关注线索总量', val: res.data.data,icon:'fa-heart-o'});
          }
        }).catch(function(err){
          console.log(err)
        })

        _this.axios({
          method: 'post',
          url: webApi.Host + webApi.Stats.CountUnReciveClues,
          timeout: 2000,
        }).then(function(res){
          if(res.data.code==0){
            setDataCount(_this.dataCount[2],{title: '已办理线索', val: res.data.data,icon:'fa-envelope-o'});
          }
        }).catch(function(err){
          console.log(err)
        })

        _this.axios({
          method: 'post',
          url: webApi.Host + webApi.Stats.CountReciveClues,
          timeout: 2000
        }).then(function(res){
          if(res.data.code==0){
            setDataCount(_this.dataCount[3],{title: '举报接收线索', val: res.data.data,icon:'fa-check-circle'});
          }
        }).catch(function(err){
          console.log(err)
        })
      }
    },
    mounted() {
      this.getDataCount();//数据统计信息
      this.getNewsData();//新闻和知识库信息
    }
  }
</script>

<style lang="scss" scoped>
  #homePage {
    overflow-x: hidden;
    padding: 10px 15px;
  }
  /*数据分析*/
  .dataAnalysis {
    .analysisBox_wrap {
      &:nth-child(1) {
        .analysisBox {
          background-color: #0E9E33;
        }
      }
      &:nth-child(2) {
        .analysisBox {
          background-color: #0AB1DB;
        }
      }
      &:nth-child(3) {
        .analysisBox {
          background-color: #EC9302;
        }
      }
      &:nth-child(4) {
        .analysisBox {
          background-color: #DA4630;
        }
      }
      .analysisBox {
        text-align: left;
        color: #fff;
        font-size: 16px;
        margin-bottom: 16px;
        .analysisBox_top {
          padding: 30px 32px 22px 32px;
          overflow: hidden;
          &>span {
            font-size: 38px;
            float: left;
            font-weight: bold;
          }
          &>i {
            float: right;
            color: rgba(255, 255, 255, 0.25);
          }
        }
        .analysis_more {
          clear: both;
          height: 26px;
          line-height: 26px;
          background-color: rgba(0,0,0,.4);
          margin-bottom: 0;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
  /*文本内容(新闻和知识库内容)*/
  .text_box {
    /*头部*/
    .text_head {
      overflow: hidden;
      background: url('../../assets/index/greenBg.jpg') no-repeat;
      color: white;
      font-size: 18px;
      span {
        padding: 10px 20px;
        vertical-align: center;
        &:first-child {
          position: relative;
          float: left;
          background-color: rgba(8,140,39,0.83);
          &:after {
            position: absolute;
            right: -44px;
            top: 0;
            content: "";
            width: 0;
            height: 0;
            border: 22px solid transparent;
            border-left-color: rgba(8,140,39,0.83);
          }
        }
        &:last-child {
          float: right;
          font-size: 14px;
          margin-top: 2.5px;
          color: #e5e5e5;
          &:hover {
            color: #f4f4f4;
            cursor: pointer;
          }
        }
      }
    }
    /*内容部分*/
    .text_body {
      list-style: none;
      padding-left: 0;
      margin: 0;
      font-size: 18px;
      min-height: 150px;
      li {
        margin-top: 15px;
        overflow: hidden;
        padding-bottom: 5px;
        p {
          overflow: hidden;
          margin-bottom: 5px;
        }
        /*标题信息*/
        .text_title {
          p {
            /*标题*/
            &:first-child {
              color: rgb(14, 158, 51);
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            /*来源和发布时间*/
            &:last-child {
              color: rgb(115, 115, 115);
              font-size: 12px;
              span {
                /*来源*/
                &:first-child {
                  float: left;
                }
                /*发布时间*/
                &:last-child {
                  float: right;
                }
              }
            }
          }
        }
        /*正文内容*/
        .text_content {
          font-size: 14px;
          text-indent: 27px;
        }
      }
    }
  }





</style>
