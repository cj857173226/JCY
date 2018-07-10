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
                </li><li :class="isThisNav == 2?'active':''" @click="chooseNav(2)">
                    <i class="fa fa-pencil-square-o"></i>
                    审批信息
                </li><li v-show="identity == 1" :class="isThisNav == 3?'active':''" @click="chooseNav(3)" v-if="IdentityType==1?true:false">
                    <i class="fa fa-sitemap"></i>
                    分流下级院
                </li><li :class="isThisNav == 4?'active':''" @click="chooseNav(4)">
                    <i class="fa fa-random"></i>
                    结果反馈
                </li>
            </ul>
        </div>
        <div id="content">
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
            cueData: {}, //线索数据
            cueFrom:'', //线索类别
            identity: null, //权限
        }
    },
    mounted(){
        this.identity = localStorage.IdentityType;

        // if(!this.$route.query.type || !this.$route.query.id){
        //     this.$router.go(-1);
        // }
        this.cueType = this.$route.query.type;
        if(this.cueType == 1){
            this.cueFrom = '举报线索';
        }else if(this.cueType == 2){
            this.cueFrom = '互联网线索';
        }else if(this.cueType == 3){
            this.cueFrom = '公益诉讼线索';
        }else if(this.cueType == 4){
            this.cueFrom = '热点线索';
        }else if(this.cueType == 5){
            this.cueFrom = '关注线索';
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 6){
            this.cueFrom = '待审批'
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 7){
            this.cueFrom = '已审批'
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }else if(this.cueType == 8){
            this.cueFrom = '审批结果'
            if(this.$route.query.type2){
                this.cueType = this.$route.query.type2;
            }
        }
        this.$route.meta.name = this.cueFrom;
        console.log(this.$route.meta.name);
        this.cueId = this.$route.query.id;
        this.cueDataGet();
    },
    methods: {
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
        height: 40px;
        line-height: 40px;
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
            text-decoration: underline;
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
    }
}
</style>
