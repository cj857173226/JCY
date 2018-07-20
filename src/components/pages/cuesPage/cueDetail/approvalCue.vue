<template>
    <div id="main">
        <div class="advise">
            <i class="timeline-icon fa fa-circle-thin"></i>
            <div class="advise-title">初核意见</div>
            <div class="advise-content">
                <span class="no-result" v-show="textData == ''">暂无初核意见</span>
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
                <!-- <span v-html="textData"></span> -->
                <pre>{{textData}}</pre>
            </div>
        </div>
        <div class="advise edit-advise" v-if="identity == 1 || identity == 3">
            <div class="advise-title">编写意见</div>
            <editor id="approval-edit" height="300px" width="100%" :content="editorText"
            pluginsPath="@/../static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"
            :items="items"></editor>
            <div id="submit-btn" @click="submitBtn">
                提交
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            editorText:'',
            textData:'',
            //编辑器菜单栏设置
            items:[
            'source', '|', 'undo', 'redo', '|', 'preview', 'template', 'code', 'cut', 'copy', 'paste',
            'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
            'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
            'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'lineheight', 'removeformat', '|', 'image',
            'insertfile', 'table', 'hr', 'emoticons', 'pagebreak',
            'anchor', 'link', 'unlink', '|', 'about'
            ],
            identity:null, //权限
        }
    },
    mounted(){
        var _this = this;
        this.identity = localStorage.IdentityType;
    },
    methods:{
        //提交审批
        submitBtn(){
            var _this = this;
            if(this.editorText.trim() == ''){
                console.log('为空');
                this.$message({
                    message:'请输入内容',
                    type:'error'
                })
            }else{
                this.textData = this.editorText
                if(!localStorage.IdentityType){
                    window.location.reload()
                }else{
                    if(this.identity == 1){
                        //管理员
                        // var param = {
                            
                        // }
                        // _this.axios({
                        //     method:'post',
                        //     url:webApi.Host + webApi.ClueManager.SaveClueOpinion,
                        //     data:param,
                        //     timeout: 10000
                        // }).then(function(response){
                        //     if(response.data.code == 0){

                        //     }else{

                        //     }
                        // }).catch(function(error){

                        // })
                    }else if(this.identity == 3){
                        //领导
                    }
                }
            }
        },
        //修改内容
        onContentChange(val){
            this.editorText = val;
        }
    }
}
</script>

<style lang="scss" scoped>
    #main{
        width: 100%;
        padding: 20px;    
        padding-right: 0;
        padding-left: 0;
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
                .no-result{
                    text-align: center;
                    display: block;
                    width: 100%;
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
