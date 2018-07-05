<template>
    <div id="main">
        <div id="header">
            <span class="heart-icon">
                <i class="fa fa-heart"></i>
            </span>
            <span class="header-title"><span class="back-btn" @click="backBtn">关注线索</span>/线索</span>
        </div>
        <div id="nav">
            <ul>
                <li :class="isThisNav == 1?'active':''" @click="chooseNav(1)">
                    <i class="fa fa-file-text-o"></i>
                    线索详情
                </li><li :class="isThisNav == 2?'active':''" @click="chooseNav(2)">
                    <i class="fa fa-pencil-square-o"></i>
                    审批信息
                </li><li :class="isThisNav == 3?'active':''" @click="chooseNav(3)">
                    <i class="fa fa-random"></i>
                    分流下级院
                </li>
            </ul>
        </div>
        <div id="content">
            <div id="detail" v-show="isThisNav == 1">
                <report-detail v-if="cueType == 1"></report-detail>
                <internet-detail v-if="cueType == 2" :cueData = "cueData"></internet-detail>
            </div>
            <div id="approval" v-show="isThisNav == 2">
                <approval></approval>
            </div>
            <div id="send" v-show="isThisNav == 3">
                <send></send>
            </div>
        </div>
    </div>
</template>

<script>
import internetDetail from './internetCueDetail'; //导入互联网线索详情页组件
import reportDetail from './reportCueDetail'; //导入举报线索详情页组件
import approval from './approvalCue'; // 导入提交审批组件
import send from './sendCue'; //导入分流下院组件

export default {
    components: {internetDetail,reportDetail,approval,send},
    data(){
        return {
            isThisNav: 1, //导航
            cueType:0, //线索类型
            cueId: '' ,//线索编号
            cueData: {}, //线索数据
        }
    },
    mounted(){
        if(!this.$route.query.type || !this.$route.query.id){
            this.$router.go(-1);
        }
        this.cueType = this.$route.query.type;
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
                this.axios({
                    method: 'get',
                    url:webApi.Clue.GetWebClueData.format({id:this.cueId}),
                    timeout: 10000
                }).then(function(response){
                    console.log(response)
                    if(response.data.code == 0){
                        _this.cueData = response.data.data[0];
                        console.log(_this.cueData);
                    }else{

                    }
                }).catch(function(error){
                    console.log(error);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#main{
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

    }
}
</style>
