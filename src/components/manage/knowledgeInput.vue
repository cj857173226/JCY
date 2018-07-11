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
                <span class="item-title">标题</span><span class="item-content"><input type="text" v-model="Title"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">所属类别</span><span class="item-content"><input type="text" v-model="DataType"/>
                </span>
            </div>
            <div class="detail-item">
              <span class="item-title">作者</span><span class="item-content"><input type="text" v-model="Author"/>
                  </span>
            </div>
            <div class="detail-item">
                <span class="item-title">发布时间</span><span class="item-content"><input type="text" v-model="PublishTime"/>
                </span>
            </div>
            <div class="detail-item">
              <span class="item-title">采集站点</span><span class="item-content"><input type="text" v-model="Site"/></span>
            </div>
          <div class="detail-item">
            <span class="item-title">采集站点名称</span><span class="item-content"><input type="text" v-model="SiteName"/></span>
          </div>
            <div class="detail-item">
                <span class="item-title">来源</span><span class="item-content"><input type="text" v-model="Source"/>
                </span>
            </div>
            <div class="detail-item">
                <span class="item-title">数据地址</span><span class="item-content"><input type="text" v-model="Link"/>
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
            <textarea id="test"></textarea>
            <pre>{{editorText}}</pre>
        </div>
    </div>
</template>

<script>
import '@/../static/kindeditor/kindeditor-all-min.js'
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
            Title:'',  //标题
            Author: "",//作者
            Site: "",//采集站点,
            SiteName: "",//采集站点中文名称,
            DataType:  "",//所属类别,法律法规、理论研究,
            PublishTime:'', //发布时间
            Source:'', //来源
            Link:'', //数据地址
            editorText:'', //内容
            kindedit:null
        }
    },
    mounted(){
        var _this = this;
        KindEditor.ready(function(K) {
            _this.kindedit = K.create('#test', {
            });
        });
    },
    methods:{
        //修改编写内容
        onContentChange(val){
            // this.editorText = val;
        },
        //提交
        submitBtn(){
            let _this = this;
            this.editorText = this.kindedit.text();
            // this.axios({
            //     method: 'post',
            //     url: webApi.Host + webApi.Knowledge.Add,
            //     data: {Title: _this.Title,//标题
            //     Content: _this.editorText,//内容,
            //     Source: _this.Source,//来源,
            //     Link: _this.Link,//数据地址,
            //     Author: _this.Author,//作者
            //     PublishTime: _this.PublishTime,//发布时间
            //     PublishTimeStr: "" ,//发布时间字符串，当PublishTime不能转化为日期时使用,
            //     Site: _this.Site,//采集站点,
            //     SiteName: _this.SiteName,//采集站点中文名称,
            //     DataType: _this.DataType,//所属类别,法律法规、理论研究,
            //     },
            //     timeout: 5000
            // }).then(function(res) {
            //     if(res.data.code==0) {
            //     _this.$message({
            //         showClose: true,
            //         message: '添加成功',
            //         type: 'success'
            //     });
            //     }
            //     console.log(res)
            // }).catch(function(err){
            //     _this.$message({
            //     showClose: true,
            //     message: '添加失败,请重试',
            //     type: 'error'
            //     });
            //     console.log(err)
            // })
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
