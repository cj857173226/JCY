<template>
    <div id="main">
        <div id="header">
            <span class="heart-icon">
                <i class="fa fa-heart"></i>
            </span>
            <span class="header-title"><span class="back-btn" @click="backBtn">{{cueFrom}}</span>/线索详情</span>
        </div>
        <div id="nav">
            <ul>
                <li :class="isThisNav == 1?'active':''" @click="chooseNav(1)">
                    <i class="fa fa-file-text-o"></i>
                    线索详情
                </li><li v-show="followPage" :class="isThisNav == 2?'active':''" @click="chooseNav(2)">
                    <i class="fa fa-pencil-square-o"></i>
                    审批信息
                </li><li v-show="followPage&&IdentityType == 1" :class="isThisNav == 3?'active':''" @click="chooseNav(3)" v-if="IdentityType==1?true:false">
                    <i class="fa fa-sitemap"></i>
                    分流下级院
                </li><li v-show="followPage" :class="isThisNav == 4?'active':''" @click="chooseNav(4)">
                    <i class="fa fa-random"></i>
                    结果反馈
                </li>
                <li class="cue-item-btn" v-if="identity == 1" >
                    <span :class="['cue-btn',isFollow?'followed':'']" @click="changeCueStatus(1)">
                        <i :class="['fa',isFollow?'fa-heart':'fa-heart-o']"></i>
                        <span v-if="isFollow">已关注</span>
                        <span v-if="!isFollow">未关注</span>
                    </span>
                </li>
                <li class="cue-item-btn" v-show="identity == 5&&page">
                    <span  :class="['cue-btn',confirmReceive?'confirmReceived':'']" @click="changeCueStatus(2)">
                        <i :class="['fa',confirmReceive?'fa-check':'fa-times']"></i>
                        <span v-if="confirmReceive">已接收</span>
                        <span v-if="!confirmReceive">未接收</span>
                    </span>
                </li>
            </ul>
        </div>
        <div id="content">
            <div class="switch-btn prev-btn" @click="switchCue(1)">
                <span>
                    <i class="fa fa-chevron-left"></i>
                    上一条
                </span>
            </div><div class="content-box">
                <div id="detail" v-show="isThisNav == 1">
                    <report-detail v-if="cueType == 1"></report-detail>
                    <internet-detail v-if="cueType == 2"></internet-detail>
                </div>
                <div id="approval" v-show="isThisNav == 2">
                    <approval></approval>
                </div>
                <div id="send" v-show="isThisNav == 3">
                    <send></send>
                </div>
                <div id="result" v-show="isThisNav == 4">
                    <result></result>
                </div>
            </div><div class="switch-btn next-btn" @click="switchCue(2)">
                <span>
                    下一条
                    <i class="fa fa-chevron-right"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import internetDetail from './internetCueDetail'; //导入互联网线索详情页组件
import reportDetail from './reportCueDetail'; //导入举报线索详情页组件
import approval from './approvalCue'; // 导入提交审批组件
import send from './sendCue'; //导入分流下院组件
import result from './result'; //导入分流下院组件

export default {
    components: {internetDetail,reportDetail,approval,send,result},
    data(){
        return {
            IdentityType: localStorage.getItem('IdentityType'),//身份信息
            isThisNav: 1, //导航
            cueType:0, //线索类型
            cueId: '' ,//线索编号
            gzId:'', //关注编号
            cueData: {}, //线索数据
            cueFrom:'', //线索类别
            identity: null, //权限
            confirmReceive:false, //线索是否确认接收
            isFollow:false, //该线索是否关注
            page: false, //待接收页
            followPage: false
        }
    },
    mounted(){
        console.log("刷新");
        //获取身份权限信息
        this.identity = localStorage.IdentityType;

        //如果没有type值或id值则返回上一页
        if(!this.$route.query.type || !this.$route.query.id){
            this.$router.go(-1);
        }
        //判断跳某个导航
        if(this.$route.query.nav){
            this.isThisNav = this.$route.query.nav;
        }
        this.cueType = this.$route.query.type;
        if(this.cueType == 1){
            this.cueFrom = '举报线索';
            this.isFollow = false;
        }else if(this.cueType == 2){
            this.cueFrom = '互联网线索';
            this.isFollow = false;
        }else if(this.cueType == 3){
            this.cueFrom = '公益诉讼线索';
            this.isFollow = false;
        }else if(this.cueType == 4){
            this.cueFrom = '热点线索';
            this.isFollow = false;
        }else if(this.cueType == 5){
            this.cueFrom = '关注线索';
            this.isFollow = true;
            this.followPage = true;
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 6){
            this.cueFrom = '待审批';
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 7){
            this.cueFrom = '已审批';
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 8){
            this.cueFrom = '结果反馈';
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 9){
          this.cueFrom = '待接收';
          this.page = true;
          if(this.$route.query.type2){
            this.cueType = this.$route.query.type2;
          }
        }else if(this.cueType == 10){
          this.cueFrom = '待反馈';
          if(this.$route.query.type2){
            this.cueType = this.$route.query.type2;
          }
        }else if(this.cueType == 11){
          this.cueFrom = '已反馈';
          if(this.$route.query.type2){
            this.cueType = this.$route.query.type2;
          }
        }
        if(this.$route.query.gzid){
            this.gzId = this.$route.query.gzid;
        }
        this.$route.meta.name = this.cueFrom;
        this.cueId = this.$route.query.id;
        this.cueDataGet();
    },
    methods: {
        //切换线索
        switchCue(index){
            var params = {
                type:this.$route.query.type, //进入页面
                id:this.cueId, //线索编号
            }
            if(this.$route.query.type2){
                params['type2'] = this.cueType;
            }
            if(index == 1){
                //上一条
                console.log(1);
                this.$router.push({
                    path:'/home/cueDetail',
                    query:params
                });
            }else if(index == 2){
                //下一条
                console.log(2);
                this.$router.push({
                    path:'/home/cueDetail',
                    query:params
                });
            }
        },
        //改变线索状态(是否关注是否接收)
        changeCueStatus(index){
            var _this = this;
            if(index == 1){
                //关注线索
                if(this.isFollow == true&&this.gzId != ''){
                    //调用取消关注接口
                    this.axios({
                        method:'post',
                        url:webApi.ClueManager.UnFollowClue.format({id:this.gzId}),
                        timeout:10000
                    }).then(function(response){
                        if(response.data.code == 0){
                            _this.isFollow = false;
                        }else{

                        }
                    }).catch(function(error){
                        console.log(error);
                    })
                }else{
                    //调用关注接口
                    this.axios({
                        method:'post',
                        url:webApi.ClueManager.FollowClue.format({id:this.cueId,xssjbly:this.cueType}),
                        timeout:10000
                    }).then(function(response){
                        if(response.data.code == 0){
                            _this.isFollow = true;
                            _this.gzId = response.data.data;
                        }else{

                        }
                    }).catch(function(error){
                        console.log(error);
                    })
                }
            }else if(index == 2){
                //接收线索
                if(this.confirmReceive == true){
                    return;
                }else{
                    //调用接收线索接口
                    this.confirmReceive = true;
                }
            }
        },
        //返回上页
        backBtn(){
            this.$router.go(-1);
        },
        //切换顶部导航
        chooseNav(index){
            this.isThisNav = index;
        },
        //线索数据获取
        cueDataGet(){
            var _this = this;
            if(this.cueType == 1){
                //举报线索
            }else if(this.cueType == 2){
                //互联网线索
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#main{
    height: 100%;
    #header{
        height: 50px;
        line-height: 50px;
        color: #666;
        font-size: 16px;
        border-bottom: solid 1px #dcdcdc;
        background: #eee;
        .heart-icon{
            display: inline-block;
            height: 100%;
            width: 40px;
            text-align: center;
            border-right:solid 1px #ddd;
        }
        .header-title{
            padding-left: 15px;
        }
        .back-btn{
            cursor: pointer;
        }
        .back-btn:hover{
            color:#00a65a;
        }
    }
    #nav{
        border-bottom: solid 1px #ddd;
        height: 80px;
        ul{
            height: 100%;
            padding-left: 39px;
            li:first-child{
                border-left: solid 1px #ddd;
            }
            li{
                display: inline-block;
                height: 100%;
                line-height: 100px;
                width: 100px;
                text-align: center;
                cursor: pointer;
                position: relative;
                border-right: solid 1px #ddd;
                i{
                    position: absolute;
                    font-size: 20px;
                    top: 23%;
                    left: 50%;
                    margin-left: -8px;
                }
            }
            .cue-item-btn{
                border:none;
                float: right;
                margin-right: 60px;
                line-height: 80px;
                width: inherit;
                .cue-btn{
                    i{
                        position: initial;
                    }
                    display: inline-block;
                    height: 35px;
                    line-height: 35px;
                    border-radius: 5px;
                    border: solid 1px #ddd;
                    padding: 0 20px;
                }
            }
            .followed{
                border-color:#00a65a!important;
                color: #00a65a;
            }
            .confirmReceived{
                border-color:#00a65a!important;
                color: #00a65a;
                cursor: default;
            }
            .active{
                color: #0a8f46;
                border-bottom: solid 2px #fff;
                height: 80px;
            }
        }
    }
    #content{
        height: calc(100% - 120px - 15px);
        overflow: auto;
        .switch-btn{
            display: inline-block;
            width: 10%;
            vertical-align: top;
            text-align: center;    
            color: #00a65a;
            margin-top: 15px;
            cursor: pointer;
        }
        .switch-btn:hover{
            color:#a0cfbf;
        }
        .switch-btn:active{
            color:#04771d;
        }
        .content-box{
            display: inline-block;
            width: 80%;
            margin: 0 auto;
        }
        .prev-btn{

        }
        .next-btn{

        }
    }
}
@media (max-width: 1440px) {
    #main{
      #header{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        .heart-icon{
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
</style>
