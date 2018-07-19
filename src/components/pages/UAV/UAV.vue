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

    </div>
    <!--图片-->
    <div class="UAV_img">
      <!--图片-->
      <ul class="imgShow" id="imgViewer">
        <!--<li style="padding-top:100px;color:darkgray;font-size:14px;width:100%;text-align: center">暂无数据</li>-->
          <li class="img-list">
            <img src="../../../assets/UAV/UAV1.jpg">
            <p class="img-list-time">2018-06-18</p>
          </li>
          <li class="img-list">
            <img src="../../../assets/UAV/UAV2.jpg">
            <p class="img-list-time">2018-06-18</p>
          </li>
      </ul>
      <!--分页-->
      <div class="page-wrap">
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
</template>

<script>
    export default {
      data() {
        return {
          timeSearch: '',//时间范围
          pageSize: 20,//每页数量
          total: 2,//总数量
        }
      },
      methods: {
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
    }
    /*图片*/
    .UAV_img {
      padding: 10px 60px;
      margin-top: 3px;
      background-color: #f7f8fa;
      overflow-y: auto;
      overflow-x: hidden;
      .imgShow {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        .img-list {
          position: relative;
          margin: 4px;
          background-color: #eeeeee;
          max-width: 300px;
          padding-bottom: 34px;
          width: 300px;
          height: 300px;
          overflow: hidden;
          .img-list-time {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 10px 15px 5px 15px;
            color: darkgrey;
            font-size: 14px;
            margin-bottom: 0;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
            /*height: auto;*/
            &:hover {
              cursor:pointer;
              transform: scale(1.2);
            }
          }
        }
        min-height: 200px;
      }
      .page-wrap {
        margin-top: 24px;
        height: 40px;
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
    }
  }
</style>
