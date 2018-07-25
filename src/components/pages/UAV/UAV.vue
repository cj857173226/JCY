<template>
  <div id="UAV">
    <div class="UAV_header">
      <i class="fa fa-get-pocket"></i>
      无人机取证
    </div>
    <!--筛选-->
    <div class="UAV_filter">
      <template>
        <i class="fa fa-calendar"></i>
        时间段:
        <el-date-picker style="height: 100%;border:none;padding:0"
                        v-model="timeSearch"
                        type="daterange"
                        align="right"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">

        </el-date-picker>
        <span @click="confirm" class="confirm">确定</span>
      </template>
      <div class="search-wrap">
        <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getTheme">
        <span class="search-btn" @click="getTheme()">
            <i class="iconfont icon-sousuo"></i>
          </span>
      </div>
    </div>
    <!--内容-->
    <div class="UAV_body">
      <!--编辑主题-->
      <div class="UAV_theme">
        <!--添加主题-->
        <div class="add_theme_wrap">
          <div class="add_theme">
            <i class="fa fa-plus-square-o"></i>
            添加主题
          </div>
        </div>
        <!--主题列表-->
        <ul class="theme_list">
          <li>
            <span class="theme_name">气体污染</span>
            <span class="theme_time">2018-07-25</span>
          </li>
        </ul>
      </div>
      <!--主题图片内容-->
      <div class="UAV_img">
        <!--上传图片-->
        <div class="add_img">
          <label for="img-input">
            <i class="fa fa-camera"></i>
            上传照片
          </label>
          <input @change="changeImg" style="display:none;" id="img-input" type="file">
        </div>
        <div class="img_content">
          <ul class="img_list" id="imgViewer">
            <!--<li v-for="(item,index) in imgList" :key="index">-->
            <!--<img :src="item">-->
            <!--</li>-->
            <li>
              <img src="../../../assets/UAV/UAV1.jpg" alt="">
            </li>
            <li>
              <img src="../../../assets/UAV/UAV2.jpg" alt="">
            </li>
            <!--<li>-->
              <!--<img src="../../../assets/UAV/UAV1.jpg" alt="">-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../../assets/UAV/UAV2.jpg" alt="">-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../../assets/UAV/UAV1.jpg" alt="">-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../../assets/UAV/UAV2.jpg" alt="">-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../../assets/UAV/UAV1.jpg" alt="">-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../../assets/UAV/UAV2.jpg" alt="">-->
            <!--</li>-->
          </ul>
          <!--分页-->
          <div class="page-wrap" style="clear: both;">
            <el-pagination
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @current-change="currentChange"
              @size-change="">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyword: "",//关键字
        timeSearch: '',//时间范围
        pageSize: 20,//每页数量
        total: 2,//总数量
        imgList: [//图片数据
          '../../../assets/UAV/UAV1.jpg',
          '@/assets/UAV/UAV1.jpg',
          '@/assets/UAV/UAV1.jpg',
          '@/assets/UAV/UAV1.jpg',
          '@/assets/UAV/UAV1.jpg',
        ],
      }
    },
    methods: {
      getTheme(){//搜索主题

      },
      changeImg(){//上传图片
        // console.log(document.getElementById("img-input").value);
      },
      currentChange(val) {//页码改变
        console.log(val)
      },
      confirm() {
        this.$message({
          message: "暂无更多内容"
        })
      }
    },
    mounted() {
      let viewer = new Viewer(document.getElementById('imgViewer'));
    }
  }
</script>

<style lang="scss" scoped>
  #UAV {
    height: 100%;
    font-size: 16px;
    overflow: hidden;
    /*头部*/
    .UAV_header {
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
    /*筛选*/
    .UAV_filter {
      padding: 10px 60px;
      box-shadow: 0 2px 1px rgba(0,0,0,0.15);
      .confirm {
        user-select: none;
        &:hover {
          cursor: pointer;
          color: #00a0e9;
        }
      }
      .search-wrap{
        float: right;
        background: #FFFFFF;
        height: 42px;
        width: 320px;
        margin-right: 10px;
        margin-top: -4px;
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
    /*内容*/
    .UAV_body {
      height: calc( 100% - 102px);
      /*主题*/
      .UAV_theme {
        float: left;
        width: 370px;
        font-size: 18px;
        background-color: rgba(245,243,244,0.83);
        height: 100%;
        /*添加主题*/
        .add_theme_wrap {
          background-color: rgba(238,238,238,0.83);
          .add_theme {
            width: 150px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color:  rgba(0,166,90,0.83);
            color: #fff;
            &:hover {
              cursor: pointer;
            }
          }
        }
        /*主题列表*/
        .theme_list {
          padding: 0 25px 5px 25px;
          overflow-y: auto;
          height: calc( 100% - 40px);
          li {
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-top: 20px;
            border-bottom: 1px solid rgba(219,217,218,0.83);
            font-size: 16px;
            &:hover {
              cursor: pointer;
            }
            .theme_name {
              float: left;
            }
            .theme_time {
              float: right;
              font-size: 12px;
              color: rgba(172,170,171,0.83);
            }
          }
        }
      }
    }
    /*图片内容*/
    .UAV_img {
      float: left;
      width: calc(100% - 370px);
      height:  100%;
      padding-left:  18px;
      /*添加照片*/
      .add_img {
        background-color: rgba(238,238,238,0.83);
        label {
          display: inline-block;
          background-color: rgba(0,166,90,0.83);
          color: #fff;
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .img_content {
        height: calc( 100% - 50px);
        background-color: rgba(245,243,244,0.83);
        .img_list {
          height: calc( 100% - 50px);
          overflow-y: auto;
          padding-left: 10px;
          padding-top: 30px;
          li {
            float: left;
            width: calc(20% - 10px);
            height: 300px;
            margin-right: 10px;
            margin-bottom: 40px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              &:hover {
                transform: scale(1.2);
                cursor: pointer;
              }
            }
          }
        }
        .page-wrap {
          margin-top: 9px;
        }
      }
    }
  }
  @media (max-width: 1440px) {
    #UAV {
      font-size: 14px;
      /*头部*/
      .UAV_header {
        height: 40px;
        i {
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
      }
      .UAV_filter {
        /*搜索框*/
        /*.search-wrap{*/
          /*height: 32px;*/
          /*width: 300px;*/
          /*.search-ipt{*/
            /*width: 260px;*/
            /*font-size: 14px;*/
          /*}*/
          /*.search-btn{*/
            /*line-height: 32px;*/
            /*width: 38px;*/
          /*}*/
          /*.search-btn:after{*/
            /*content: '';*/
            /*left: 0;*/
            /*top: 8px;*/
            /*width: 2px;*/
            /*height: 14px;*/
          /*}*/
        /*}*/
      }
      .UAV_body {
        height: calc( 100% - 92px);
        /*图片内容*/
        .UAV_img {
          .img_list {
            li {
              width: calc(33% - 10px);
            }
          }
        }
      }
    }
  }
</style>
