<template>
    <div id="main">
        <div class="advise">
            <i class="timeline-icon fa fa-circle-o"></i>
            <div class="advise-title">初核意见:</div>
            <div class="advise-content">
                <span v-html="textData"></span>
            </div>
        </div>
        <div class="advise">
            <i class="timeline-icon fa fa-circle-o"></i>
            <div class="advise-tip">已提交，等待领导审批</div>
        </div>
        <div class="advise">
            <i class="timeline-icon fa fa-circle-o"></i>
            <div class="advise-title">审批意见:</div>
            <div class="advise-content">
                <span v-html="textData"></span>
            </div>
        </div>
        <div class="advise edit-advise">
            <div class="advise-title">编写意见:</div>
            <kindedite ref="kindedite"></kindedite>
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
            textData:''
        }
    },
    mounted(){
    },
    methods:{
        submitBtn(){
            this.textData = this.$refs.kindedite.getEditText();
            console.log(this.textData);
        }
    }
}
</script>

<style lang="scss" scoped>
    #main{
        width: 100%;
        padding-left: 20px;
        padding-top: 10px;
        .advise{
            position: relative;
            padding-left: 20px;
            .timeline-icon{
                position: absolute;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                top: 2px;
                left: 0;
                background-color: #fff;
                color: #5FB878;
                font-size: 18px;
            }
            .advise-tip{
                height: 30px;
            }
            .advise-title{
                float: left;
                width: 70px;
            }
            .advise-content{
                min-height: 30px;
                min-width: 200px;
                display: inline-block;
                border: solid 1px #ddd;
                border-radius: 5px;
                max-width: 80%;
                padding: 5px;
                pre{
                    width: 100%;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    line-height: 20px;
                    font-size: 12px;
                }
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
                margin-left: 70px;
            }
        }
        .advise:before{
            content:'';
            position: absolute;
            width: 1px;
            height: 100%;
            background: #dfdfdf;
            top: 3px;
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
