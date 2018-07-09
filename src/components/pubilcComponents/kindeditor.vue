<template>
    <div id="edit-main">
        <textarea v-if="type == 1" id="mul_input1" style="width:700px;height:200px;visibility:hidden;display: block;" name="content">
        </textarea>
        <textarea v-if="type == 2" id="mul_input2" style="width:700px;height:200px;visibility:hidden;display: block;" name="content">
        </textarea>
    </div>
</template>

<script>
import '../../../static/kindeditor/kindeditor-all.js';
import '../../../static/kindeditor/themes/default/default.css';
import '../../../static/kindeditor/lang/zh-CN.js';

export default {
    props:['type'],
    data(){
        return {
            editor1:null,
            editor2:null
        }
    },
    mounted(){
        console.log(this.type);
        this.initSPEdit();
        this.initFKEdit();
    },
    methods:{
        //初始化反馈富文本
        initFKEdit(){
            var _this = this;
            KindEditor.ready(function(k){
                _this.editor2 = k.create('#mul_input2',{
                    resizeType : 1,
                    allowPreviewEmoticons : false,
                    allowImageUpload : false,
                    items : ['source', '|', 'fullscreen', 'undo', 'redo', 'print', 'cut', 'copy', 'paste',
    'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
    'superscript', '|', 'selectall', '-',
    'title', 'fontname', 'fontsize', '|', 'textcolor', 'bgcolor', 'bold',
    'italic', 'underline', 'strikethrough', 'removeformat', '|', 'image',
    'insertfile', 'media', 'advtable', 'hr', 'emoticons', 'link', 'unlink']
                })
            })
        },
        //初始化审批富文本
        initSPEdit(){
            var _this = this;
            KindEditor.ready(function(k){
                _this.editor1 = k.create('#mul_input1',{
                    resizeType : 1,
                    allowPreviewEmoticons : false,
                    allowImageUpload : false,
                    items : ['source', '|', 'fullscreen', 'undo', 'redo', 'print', 'cut', 'copy', 'paste',
    'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
    'superscript', '|', 'selectall', '-',
    'title', 'fontname', 'fontsize', '|', 'textcolor', 'bgcolor', 'bold',
    'italic', 'underline', 'strikethrough', 'removeformat', '|', 'image',
    'insertfile', 'media', 'advtable', 'hr', 'emoticons', 'link', 'unlink', '|', 'about']
                })
            });
        },
        //获取反馈内容
        getResultText(){
            console.log(this.editor2.html());
            return this.editor2.html();
        },
        //获取审批内容
        getEditText(){
            return this.editor1.html();
        }
    }
}
</script>

<style lang="scss" scoped>
    #edit-main{
        #mul_input{
            width: 500px;
            height: 300px;
            visibility: hidden;
            display: block;
        }
    }
</style>
