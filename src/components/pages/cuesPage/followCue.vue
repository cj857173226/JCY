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
          <el-form-item label="线索类型 :">
            <el-select class="follow_select" v-model="formInline.region">
              <el-option label="全部" value="shanghai" selected></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线索来源 :">
            <el-select class="follow_select" v-model="formInline.region">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
              <i @click="clickIcon" slot="suffix" class="keyword_icon iconfont icon-sousuo"></i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
    methods: {
      clickIcon() {
        console.log('1')
      }
    }
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
        background-color: #eeeeee;
        color: #333333;
        padding:{
          left: 15px;
          top: 10px;
        }
        .follow_select {
          width: 100px;
        }
        .follow_date {
          width: 150px;
        }
        .follow_input {
          width: 324px;
          .keyword_icon {
            position: relative;
            display: inline-block;
            height: 40px;
            width: 38px;
            line-height: 40px;
            &:hover {
              cursor: pointer;
              color: green;
            }
            &:after {
              position: absolute;
              left: 0;
              top: 10px;
              content: "";
              height: 20px;
              width: 1px;
              background-color: #dcdfe6;
            }
          }
        }
      }
    }
  }
</style>
