<template>
    <div id="main">
        <div class="detail-item">
            <span class="item-title">举报门类</span><span class="item-content">{{cueData.XSLB}}</span>
        </div>
        <div class="detail-item">
            <span class="item-title">举报人姓名</span><span class="item-content">{{cueData.JBRXM}}</span>
        </div>
        <div class="detail-item">
            <span class="item-title">联系方式</span><span class="item-content">{{cueData.JBRLXFS}}</span>
        </div>
        <div class="detail-item">
            <span class="item-title">事发地点</span><span class="item-content">{{cueData.SFDD}}</span>
        </div>
        <div class="detail-item">
            <span class="item-title">采集时间</span><span class="item-content">{{cueData.CJSJ}}</span>
        </div>
        <div class="detail-item">
            <span class="item-title resource-box">举报内容</span><span class="item-content resource-content ">{{cueData.JBNR}}</span>
        </div>
        <div class="detail-item" v-show="cueData.TP.length">
            <span class="item-title resource-box">图片内容</span>
            <span class="item-content resource-content">
                <ul id="imgViewer">
                    <li v-for="item in TP">
                        <img :src="item">
                    </li>
                </ul>
            </span>
        </div>
        <div class="detail-item" v-show="cueData.SP.length">
            <span class="item-title resource-box">视频内容:</span>
            <span class="item-content resource-content">
                <video src="das" controls="controls"></video>
                <video src="das" controls="controls"></video>
                <video src="das" controls="controls"></video>
                <video src="das" controls="controls"></video>
                <video src="das" controls="controls"></video>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cueData:{
                TP:[],
                SP:[]
            },
            TP:[],
            SP:[]
        }
    },
    mounted(){
        this.dataGet();
    },
    methods:{
        //获取数据
        dataGet(){
            var _this = this;
            this.axios({
                method:'get',
                url:webApi.Clue.GetReportClueData.format({id:this.$route.query.id}),
                timeout: 10000
            }).then(function(response){
                if(response.data.code == 0){
                    _this.cueData = response.data.data[0];
                    var tp = JSON.parse(_this.cueData.TP);
                    var sp = JSON.parse(_this.cueData.SP);
                    _this.cueData.TP = tp;
                    _this.cueData.SP = sp;
                    _this.getTPSPData();
                }else{

                }
            }).catch(function(response){

            })
        },
        //获取图片视频
        getTPSPData(){
            var _this = this;
            if(this.cueData.TP.length > 0){
                for(var i = 0;i<this.cueData.TP.length;i++){
                   var src = webApi.Host + '/api/WxClue/DownLoadFile/' + _this.cueData.TP[i];
                   _this.TP.push(src);
                };
                _this.$nextTick(()=>{
                    let viewer = new Viewer(document.getElementById('imgViewer'));
                })
            };
            if(this.cueData.SP.length > 0){
                for(var i = 0; i<this.cueData.SP.length;i++){
                    var src = webApi.Host + '/api/WxClue/DownLoadFile/' + _this.cueData.SP[i];
                    _this.SP.push(src);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#main{
    .detail-item{
        padding-left: 40px;
        margin: 15px 0;
        padding-right: 40px;
        span{
            display: inline-block;
        }
        .item-title{
            width: 300px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: left;
            background: #c0ecaa;
        }
        .item-content{
            border: solid 1px #ddd;
            height: 30px;
            line-height: 30px;
            padding: 0px 10px;
            width: calc(100% - 300px);
        }
        .resource-box{
            float: none;
            width: 100%;
        }
        .resource-content{
            height: initial;
            padding: 10px;
            width: 100%;
            height: inherit;
            ul{
                padding: 0;
                li{
                    width: 24%;
                    display: inline-block;
                    padding: 10px;
                    border: solid 2px #fff;
                    cursor: pointer;
                    vertical-align: top;
                    img{
                        width: 100%;
                    }
                }
                li:hover{
                    border: solid 2px #00a65a
                }
            }
            video{
                width: 49%;
            }
        }
    }
}
</style>
