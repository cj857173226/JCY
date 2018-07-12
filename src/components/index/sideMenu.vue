<template>
  <el-menu id="menu" class="el-menu-vertical-demo"  :default-openeds="openeds">
    <router-link to="/home">
      <el-menu-item index="1" :class="isThisNav == '主页'?'is-active':''" @click="switchNav('主页')">
        <i class="iconfont icon-zhuye"></i>
        <span slot="title">主页</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/waitApproval" v-if="IdentityType==3?true:false">
      <el-menu-item index="7" :class="isThisNav == '待审批' ?'is-active':''" @click="switchNav('待审批')">
        <i class="fa fa-pencil-square-o"></i>
        <span slot="title">待审批<span class="note-tag">(0)</span></span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/allreadyApproval" v-if="IdentityType==3?true:false">
      <el-menu-item index="8" :class="isThisNav == '已审批'?'is-active':''" @click="switchNav('已审批')">
        <i class="fa fa-th-list"></i>
        <span slot="title">已审批</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/approvalResult" v-if="IdentityType==3?true:false">
      <el-menu-item index="9" :class="isThisNav == '结果反馈'?'is-active':''" @click="switchNav('结果反馈')">
        <i class="fa fa-check-square"></i>
        <span slot="title">结果反馈</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/waitReceive" v-if="IdentityType==5?true:false">
      <el-menu-item index="10" :class="isThisNav == '待接收'?'is-active':''" @click="switchNav('待接收')">
        <i class="fa fa-th-list"></i>
        <span slot="title">待确认接收<span class="note-tag">(0)</span></span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/waitFeedback" v-if="IdentityType==5?true:false">
      <el-menu-item index="11" :class="isThisNav == '待反馈'?'is-active':''" @click="switchNav('待反馈')">
        <i class="fa fa-pencil-square-o"></i>
        <span slot="title">待反馈</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/complete" v-if="IdentityType==5?true:false">
      <el-menu-item index="12" :class="isThisNav == '已反馈'?'is-active':''" @click="switchNav('已反馈')">
        <i class="fa fa-check-square"></i>
        <span slot="title">已反馈</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="2" v-if="IdentityType==1?true:false">
      <template slot="title">
        <i class="iconfont icon-fenlei1"></i>
        <span slot="title">线索资源库</span>
      </template>
      <el-menu-item-group >
        <template slot="title" id="menu-group-title" style="display:none"></template>
        <router-link to="/home/reportCue">
          <el-menu-item index="2-1" :class="isThisNav == '举报线索'?'is-active':''" @click="switchNav('举报线索')" >
            <i class="iconfont icon-biaoqian1"></i>
            <span slot="title">举报线索</span>
          </el-menu-item>
        </router-link>

        <router-link to="/home/internetCue">
          <el-menu-item index="2-2" :class="isThisNav == '互联网线索'?'is-active':''" @click="switchNav('互联网线索')">
            <i class="iconfont icon-changyonglogo46"></i>
            <span slot="title">互联网线索</span>
          </el-menu-item>
        </router-link>

       <router-link to="/home/welfareCue">
         <el-menu-item index="2-3" :class="isThisNav == '公益组织线索'?'is-active':''" @click="switchNav('公益组织线索')">
           <i class="iconfont icon-ai62"></i>
           <span slot="title">公益组织线索</span>
         </el-menu-item>
       </router-link>

        <router-link to="/home/heartCue">
          <el-menu-item index="2-4" :class="isThisNav == '热点线索'?'is-active':''" @click="switchNav('热点线索')">
            <i class="iconfont icon-remen"></i>
            <span slot="title">热点线索</span>
          </el-menu-item>
        </router-link>

      </el-menu-item-group>
    </el-submenu>
    <router-link to="/home/followCue" v-if="IdentityType==1?true:false">
      <el-menu-item index="3" :class="isThisNav == '关注线索'?'is-active':''" @click="switchNav('关注线索')">
        <i class="iconfont icon-guanzhu1"></i>
        <span slot="title">关注线索</span>
      </el-menu-item>
    </router-link>


    <router-link to="/home/news">
      <el-menu-item index="4" :class="isThisNav == '新闻页' || isThisNav == '新闻页详情'?'is-active':''" @click="switchNav('新闻页')">
        <i class="iconfont icon-xiangji"></i>
        <span slot="title">新闻聚合</span>
      </el-menu-item>
    </router-link>

    <router-link to="/home/knowledge">
      <el-menu-item index="5" :class="isThisNav == '知识库' || isThisNav == '知识库详情'?'is-active':''" @click="switchNav('知识库')">
        <i class="iconfont icon-boshimao"></i>
        <span slot="title">知识库</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="6">
      <template slot="title">
        <i class="fa fa-cubes"></i>
        <span slot="title">数据分析</span>
      </template>
      <el-menu-item-group >
        <template slot="title" id="menu-group-title" style="display:none"></template>
        <router-link to="/home/newsAnalysis">
          <el-menu-item index="6-1" :class="isThisNav == '新闻热力分析'?'is-active':''" @click="switchNav('新闻热力分析')" >
            <i class="fa fa-newspaper-o"></i>
            <span slot="title">新闻热力分析</span>
          </el-menu-item>
        </router-link>

        <router-link to="/home/cueFieldAnalysis">
          <el-menu-item index="6-2" :class="isThisNav == '线索领域分析'?'is-active':''" @click="switchNav('线索领域分析')">
            <i class="fa fa-window-restore"></i>
            <span slot="title">线索领域分析</span>
          </el-menu-item>
        </router-link>

      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="7" v-if="IdentityType==1?true:false">

      <template slot="title">
        <i class="fa fa-database"></i>
        <span slot="title">管理模块</span>
      </template>
      <el-menu-item-group >
        <template slot="title" id="menu-group-title" style="display:none"></template>
        <router-link to="/home/reviewInternetCue">
          <el-menu-item index="7-1" :class="isThisNav == '审核线索'?'is-active':''" @click="switchNav('审核线索')" >
            <i class="fa fa-list-alt"></i>
            <span slot="title">审核线索</span>
          </el-menu-item>
        </router-link>

        <router-link to="/home/knowledgeInput">
          <el-menu-item index="7-2" :class="isThisNav == '知识库录入'?'is-active':''" @click="switchNav('知识库录入')">
            <i class="fa fa-keyboard-o"></i>
            <span slot="title">知识库录入</span>
          </el-menu-item>
        </router-link>

      </el-menu-item-group>
    </el-submenu>

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
        IdentityType: localStorage.getItem('IdentityType'),//身份信息
        openeds: ['2','6','7'],
        isThisNav: '',
      }
    },
    mounted(){
      console.log(this.$route.meta.name);
      if(this.$route.query.type){
        if(this.$route.query.type == 1){
          this.isThisNav = '举报线索';
        }else if(this.$route.query.type == 2){
          this.isThisNav = '互联网线索';
        }else if(this.$route.query.type == 3){
          this.isThisNav = '公益诉讼线索';
        }else if(this.$route.query.type == 4){
          this.isThisNav = '热点线索';
        }else if(this.$route.query.type == 5){
          this.isThisNav = '关注线索';
        }else if(this.$route.query.type == 6){
          this.isThisNav = '待审批';
        }else if(this.$route.query.type == 7){
          this.isThisNav = '已审批';
        }else if(this.$route.query.type == 8){
          this.isThisNav = '结果反馈';
        }else if(this.$route.query.type == 9){
          this.isThisNav = '待接收';
        }else if(this.$route.query.type == 10){
          this.isThisNav = '待反馈';
        }else if(this.$route.query.type == 11){
          this.isThisNav = '已反馈';
        }
      }else{
        this.isThisNav = this.$route.meta.name;
      };
      var _this = this;
      this.$root.Bus.$on('changeIdentity',function(val){
        _this.IdentityType = val;
      })
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
    .note-tag{
      color: #ff6000;
      display: inline-block;
      vertical-align: bottom;
    }
  }
  /*.el-menu-item.is-active{*/
    /*color: #c0ecaa;*/
  /*}*/
  /*.el-menu-item:focus, .el-menu-item:hover{*/
    /*background: #00a65a;*/
  /*}*/
</style>
