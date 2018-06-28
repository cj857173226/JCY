<template>
  <el-menu id="menu" default-active="1" class="el-menu-vertical-demo">
    <router-link to="/">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">线索</span>
      </template>
      <el-menu-item-group>

        <router-link to="/reportCue">
          <el-menu-item index="2-1">
            <i class="el-icon-location"></i>
            <span slot="title">举报线索</span>
          </el-menu-item>
        </router-link>

        <router-link to="/internetCue">
          <el-menu-item index="2-2">
            <i class="el-icon-location"></i>
            <span slot="title">互联网线索</span>
          </el-menu-item>
        </router-link>

       <router-link to="/welfareCue">
         <el-menu-item index="2-3">
           <i class="el-icon-location"></i>
           <span slot="title">公益组织线索</span>
         </el-menu-item>
       </router-link>

        <router-link to="/heartCue">
          <el-menu-item index="2-4">
            <i class="el-icon-location"></i>
            <span slot="title">热点线索</span>
          </el-menu-item>
        </router-link>

      </el-menu-item-group>
    </el-submenu>
    <router-link to="/followCue" >
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">关注线索</span>
      </el-menu-item>
    </router-link>


    <router-link to="/news">
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">新闻动态</span>
      </el-menu-item>
    </router-link>

    <router-link to="/knowledge">
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">知识库</span>
      </el-menu-item>
    </router-link>


    <router-link to="/dataAnalysis">
      <el-menu-item index="6">
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
    name:'side_menu'
  }
</script>

<style lang="scss" scoped>
  #menu{
    height: 100%;
  }
</style>
