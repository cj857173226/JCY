<template>
    <div id="checkBox">
      <span @click="selectSite(item)">全部</span>
      <span v-for="(item,index) in siteList" @click="selectSite(item)">{{item}}</span>
    </div>
</template>

<script>
    export default {
        name: "checkBox",
        props:['siteList'],
      data(){
          return{

          }
      },
      mounted(){

      },
      methods:{
        selectSite(item){
          this.$emit('currSite',item)
        }
      }
    }

</script>

<style lang="scss" scoped>
  #checkBox{
    position: absolute;
    padding: 10px 20px;
    height: 100px;
    max-height: 100px;
    overflow-y: auto;
    width: 100%;
    top: 40px;
    left: 0;
    background: #FFFFFF;
    z-index: 100;
    border-top: 2px solid #cccccc;
    -webkit-box-shadow: 4px 6px 8px rgba(0,0,0,0.3);
    -moz-box-shadow: 4px 6px 8px rgba(0,0,0,0.3);
    box-shadow: 4px 6px 8px rgba(0,0,0,0.3);
    span{
      margin-right: 20px;
      cursor: pointer;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }
    span:hover{
      color: #FF6600;
    }
  }
  @media (max-width: 1440px){
    #checkBox{
      top: 30px;
      span{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }

</style>
