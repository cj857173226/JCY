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
        <el-form :inline="true" >
          <!--<el-form-item label="审批人">-->
            <!--<el-input  placeholder="审批人"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="线索类型">-->
            <!--<el-select  placeholder="选择类型">-->
              <!--<el-option label="区域一" value="1"></el-option>-->
              <!--<el-option label="区域二"  value="2" ></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  #followCue {
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
      padding: 30px 50px;
      /*筛选*/
      .follow_filter {
        height: 60px;
        line-height: 60px;
        background-color: #eeeeee;
        color: #333333;
        padding:{
          left: 15px;
        }
      }
    }
  }
</style>
