<template>
    <div id="knowledgeInput">
        <div id="knowledge-header">
            <span class="knowledge-icon">
                <i class="fa fa-graduation-cap"></i>
            </span>
            <span class="knowledge-title">知识库录入</span>
        </div>
        <div id="knowledge-content">
            <div class="detail-item">
                <span class="item-title">标题</span><span class="item-content"><input type="text" v-model="BT"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">类别</span><span class="item-content"><input type="text" v-model="SSLB"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">发布时间</span><span class="item-content"><input type="text" v-model="FBSJ"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">采集时间</span><span class="item-content"><input type="text" v-model="CJSJ"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">采集字段</span><span class="item-content"><input type="text" v-model="CJZD"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">采集字段名称</span><span class="item-content"><input type="text" v-model="CJZDMC"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">来源</span><span class="item-content"><input type="text" v-model="LY"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">数据地址</span><span class="item-content"><input type="text" v-model="SJDZ"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">内容</span>
                <editor id="result-edit" height="300px" width="100%" v-bind:content="editorText"
                pluginsPath="@/../static/kindeditor/plugins/"
                :loadStyleMode="true"
                @on-content-change="onContentChange"
                :items="items"></editor>
            </div>
            <div id="submit-btn" @click="submitBtn">
                提交
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
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
            BT:'',  //标题
            SSLB:'', //类别
            FBSJ:'', //发布时间
            CJSJ:'', //采集时间
            CJZD:'', //采集字段
            CJZDMC:'', //采集字段名称
            LY:'', //来源
            SJDZ:'', //数据地址
            editorText:'', //内容
        }
    },
    methods:{
        //修改编写内容
        onContentChange(val){
            this.editorText = val;
        },
        //提交
        submitBtn(){

        }
    }
}
</script>

<style lang="scss" scoped>
#knowledgeInput{
    height: 100%;
    overflow: hidden;
    #knowledge-header{
        width: 100%;
        height: 50px;
        background: #EEEEEE;
        border-bottom: 1px solid #dcdcdc;
        .knowledge-icon{
            display: inline-block;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            border-right: 1px solid #dcdcdc;
            color: #666666;
        }
        .knowledge-title{
            padding-left: 10px;
        }
    }
    #knowledge-content{
        padding: 0 15px;
        height: calc(100% - 50px);
        overflow: auto;
        .detail-item{
            width: 100%;
            margin: 15px 0;
            span{
                display: inline-block;
            }
            .item-title{
                width: 300px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                float: left;
                background-color: #c0ecaa;
            }
            .item-content{
                border: solid 1px #ddd;
                height: 30px;
                line-height: 30px;
                width: calc(100% - 300px);
                .link{
                    color: #3897c6;
                }
                .link:hover{
                    text-decoration: underline;
                }
                input{
                    height: 100%;
                    vertical-align: text-bottom;
                    border: none;
                    width: 100%;
                    padding: 0 10px;
                }
            }
        }
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
            margin-bottom: 20px;
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
