<template>
  <div id="homePage">
    <!--数据分析-->
    <el-row :gutter="26" class="dataAnalysis">
      <el-col :lg="6" :sm="12" class="analysisBox_wrap" v-for="item,index in dataCount" :key="index">
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
            <router-link tag="span" to="#">更多>></router-link>
          </div>
          <!--内容-->
          <ul class="text_body">
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
            </li>
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
            </li>
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
            </li>
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
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
            <router-link tag="span" to="#">更多>></router-link>
          </div>
          <!--内容-->
          <ul class="text_body">
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
            </li>
            <li>
              <p class="text_title ">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
            </li>
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
            </li>
            <li>
              <p class="text_title">
                <span>标题文字</span>
                <span>来源: 微信公众号  发布时间: 2018-06-12</span>
              </p>
              <p class="text_content">
                近期，中央纪委和云南省纪委相继通报曝光了生态环境损害责任追究典型问题，持续释放出对损害生态环境的地方和单位的领导干部真追责、敢追责、严追责、终身追责，用问责利器压实政治责任的强烈信号。第二次世界大战结...
              </p>
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
        dataCount: [//数据统计
          {title: "本月线索", val: 0,icon:'fa-list'},
          {title: "关注总线索", val: 0,icon:'fa-heart-o'},
          {title: "未接收线索", val: 0,icon:'fa-envelope-o'},
          {title: "接收线索", val: 0,icon:'fa-check-circle'}
        ]
      }
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
            color: rgba(0,0,0,0.15);
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
          &:hover {
            color: red;
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
          span {
            /*标题*/
            &:first-child {
              float: left;
              color: rgb(14, 158, 51);
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            /*来源和发布时间*/
            &:last-child {
              float: right;
              color: rgb(115, 115, 115);
              font-size: 12px;
            }
          }
        }
        /*正文内容*/
        .text_content {
          font-size: 14px;
          text-indent: 15px;
        }
      }
    }
  }





</style>
