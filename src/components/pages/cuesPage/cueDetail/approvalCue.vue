<template>
    <div id="main">
        <div class="advise">
            <i class="timeline-icon fa fa-circle-thin"></i>
            <div class="advise-title">初核意见</div>
            <div class="advise-content">
                <span v-html="textData"></span>
            </div>
        </div>
        <div class="advise advise-notice">
            <i class="timeline-icon fa fa-circle-thin"></i>
            <span>已提交，等待领导审批</span>
            <span>已审批</span>
        </div>
        <div class="advise">
            <i class="timeline-icon fa fa-circle-thin"></i>
            <div class="advise-title">审批意见</div>
            <div class="advise-content">
                <span v-html="textData"></span>
            </div>
        </div>
        <div class="advise edit-advise">
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
    components:{
        kindedite:kindedite
    },
    data(){
        return {
            textData:'',
            type:1
        }
    },
    mounted(){
    },
    methods:{
        submitBtn(){
            this.textData = this.$refs.kindedite.getEditText();
        }
    }
}
</script>

<style lang="scss" scoped>
    #main{
        width: 100%;    
        padding: 20px;
        .advise{
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
            .advise-tip{
                height: 30px;
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
        .advise-notice{
            height: 50px;
            line-height: 50px;
            .timeline-icon{
                top: 15px;
            }
        }
        .edit-advise{
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
        .advise:before{
            content:'';
            position: absolute;
            width: 1px;
            height: 100%;
            background: #dfdfdf;
            top: 15px;
            left: 9px;
        }
        .advise:nth-child(3):before{
            display: none;
        }
        .advise:last-child:before{
            display: none;
        }
    }
</style>
