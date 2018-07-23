<template>
    <div id="searchAll">
      <div class="main-box">
        <div class="title">大数据检索</div>
        <div class="search-wrap">
          <input class="search-ipt"  type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="search()">
          <span class="search-btn" @click="search()">
            <i class="el-icon-search"></i>
          </span>
        </div>
      </div>
      <div id="pie-chart">
        <search-pie></search-pie>
      </div>
    </div>
</template>

<script>
import searchPie from '../../pubilcComponents/eChartComponents/searchPie';
export default {
  name:'searchAll',
  components:{searchPie},
  data(){
    return{
      keyword:'',
    }
  },
  mounted(){

  },
  methods:{
    search(){
      let _this = this;
      if(_this.keyword.trim()==''){
        this.$message({
          message: '查询条件不能为空！',
          type: 'warning'
        });
      }else {
        this.$router.push({
          path:'/home/searchResult',
          query:{keyword:_this.keyword.trim()}
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #searchAll{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    
    flex-direction: column;
    .main-box{
      width: 100%;
      .title{
        font-size: 40px;
        font-weight: 800;
        color: #666666;
        height: 100px;
        line-height: 100px;
        width: 200px;
        margin: 0 auto;
      }
      .search-wrap{
        height: 40px;
        width: 600px;
        margin: 0 auto;
        .search-ipt{
          float: left;
          width: 500px;
          padding-left: 20px;
          height: 100%;
          font-size: 18px;
          color: #333333;
          border: 1px solid #cccccc;
        }
        .search-btn{
          float: left;
          width: 98px;
          height: 100%;
          line-height: 38px;
          font-size: 24px;
          text-align: center;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background: #00a65a;
          color: #FFFFFF;
        }
      }

    }
    #pie-chart{
      width: 500px;
      height: 300px;
      margin:0 auto;
    }
  }
</style>
