<template>
  <el-menu id="menu" class="el-menu-vertical-demo"  :default-openeds="openeds">
    <router-link to="/home">
      <el-menu-item index="1" :class="isThisNav == '主页'?'is-active':''" @click="switchNav('主页')">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">线索</span>
      </template>
      <el-menu-item-group >
        <template slot="title" id="menu-group-title" style="display:none"></template>
        <router-link to="/home/reportCue">
          <el-menu-item index="2-1" :class="isThisNav == '举报线索'?'is-active':''" @click="switchNav('举报线索')" >
            <i class="el-icon-location"></i>
            <span slot="title">举报线索</span>
          </el-menu-item>
        </router-link>

        <router-link to="/home/internetCue">
          <el-menu-item index="2-2" :class="isThisNav == '互联网线索'?'is-active':''" @click="switchNav('互联网线索')">
            <i class="el-icon-location"></i>
            <span slot="title">互联网线索</span>
          </el-menu-item>
        </router-link>

       <router-link to="/home/welfareCue">
         <el-menu-item index="2-3" :class="isThisNav == '公益组织线索'?'is-active':''" @click="switchNav('公益组织线索')">
           <i class="el-icon-location"></i>
           <span slot="title">公益组织线索</span>
         </el-menu-item>
       </router-link>

        <router-link to="/home/heartCue">
          <el-menu-item index="2-4" :class="isThisNav == '热点线索'?'is-active':''" @click="switchNav('热点线索')">
            <i class="el-icon-location"></i>
            <span slot="title">热点线索</span>
          </el-menu-item>
        </router-link>

      </el-menu-item-group>
    </el-submenu>
    <router-link to="/home/followCue" >
      <el-menu-item index="3" :class="isThisNav == '关注线索'?'is-active':''" @click="switchNav('关注线索')">
        <i class="el-icon-menu"></i>
        <span slot="title">关注线索</span>
      </el-menu-item>
    </router-link>


    <router-link to="/home/news">
      <el-menu-item index="4" :class="isThisNav == '新闻页'?'is-active':''" @click="switchNav('新闻页')">
        <i class="el-icon-document"></i>
        <span slot="title">新闻动态</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/knowledge">
      <el-menu-item index="5" :class="isThisNav == '知识库'?'is-active':''" @click="switchNav('知识库')">
        <i class="el-icon-setting"></i>
        <span slot="title">知识库</span>
      </el-menu-item>
    </router-link>


    <router-link to="/home/dataAnalysis">
      <el-menu-item index="6" :class="isThisNav == '数据分析'?'is-active':''" @click="switchNav('数据分析')">
        <i class="el-icon-setting"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
    </router-link>

    <!--<el-menu-item index="7">-->
      <!--<i class="el-icon-setting"></i>-->
      <!--<span slot="title">手动录入</span>-->
    <!--</el-menu-item>-->
  </el-menu>

</template>

<script>
  export  default {
    name:'side_menu',
    data(){
      return{
        openeds: ['2'],
        isThisNav: '',
      }
    },
    mounted(){
      this.isThisNav = this.$route.name;
    },
    methods:{
      switchNav(title){
        this.isThisNav = title;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #menu{
    // .active{
    //   color: red;
    // }
    height: 100%;
    el-menu-item-group{
      overflow: hidden;
    }
  }
</style>
