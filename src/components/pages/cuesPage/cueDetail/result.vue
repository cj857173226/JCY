<template>
    <div id="result">
        <div class="result-text">
            <i class="timeline-icon fa fa-circle-thin"></i>
            <div class="advise-title">处理结果</div>
            <div class="advise-content">
                <span v-html="textData"></span>
            </div>
        </div>
        <div class="result-text result-edit">
            <div class="advise-title">编写意见</div>
            <kindedite ref="kindedite" :type = type></kindedite>
            <div id="submit-btn" @click="submitBtn">
                提交
            </div>
        </div>
    </div>
</template>

<script>
import kindedite from '../../../pubilcComponents/kindeditor.vue';
export default {
    components:{kindedite},
    data(){
        return{
            textData:'',
            isLoad:false,
            type: 2,
        }
    },
    methods:{
        //提交按钮
        submitBtn(){
            var _this = this;
            this.textData = this.$refs.kindedite.getResultText();
            console.log(this.textData);
            // this.isLoad = true;
            // this.axios({
            //     method:'post',
            //     url:webApi.ClueManager.ReportResult.format({id:this.$route.query.id,bljgjs:this.textData}),
            //     timeout: 10000
            // }).then(function(response){
            //     console.log(response);
            //     _this.isLoad = false;
            //     if(response.data.code == 0){
            //         this.textData = '';
            //     }else{

            //     }
            // }).catch(function(error){
            //     _this.isLoad = false;
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
    #result{
        width: 100%;    
        padding: 20px;
        .result-text{
            position: relative;
            padding-left: 40px;
            .timeline-icon{
                position: absolute;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                top: 10px;
                left: 0;
                background-color: #fff;
                color: #c0ecaa;
                font-size: 18px;
            }
            .advise-title{
                width: 240px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #c0ecaa;    
                color: #333;
            }
            .advise-content{
                min-height: 30px;
                min-width: 240px;
                display: inline-block;
                border: solid 1px #ddd;
                max-width: 90%;
                padding: 5px;    
                word-break: break-all;
                color: #666;
                pre{
                    width: 100%;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    line-height: 20px;
                    font-size: 12px;
                }
            }
        }
        .result-edit{
            margin-top: 10px;
            #submit-btn{
                display: inline-block;
                width: 100px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                background: #00a65a;
                border-radius: 5px;
                color: #fff;
                margin-top: 10px;
                cursor: pointer;
            }
            #submit-btn:hover{
                background: #0aba69;
            }
            #submit-btn:active{
                background: #059553;
            }
        }
        
    }
</style>
