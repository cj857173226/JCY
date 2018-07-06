<template>
    <div id="edit-main">
        <textarea id="mul_input" style="width:700px;height:200px;visibility:hidden;display: block;" name="content">
        </textarea>
    </div>
</template>

<script>
import '../../../static/kindeditor/kindeditor-all.js';
import '../../../static/kindeditor/themes/default/default.css';
import '../../../static/kindeditor/lang/zh-CN.js';

export default {
    data(){
        return {
            editor:null
        }
    },
    mounted(){
        var _this = this;
        KindEditor.ready(function(k){
            _this.editor = k.create('#mul_input',{
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
        })
    },
    methods:{
        getEditText(){
            return this.editor.html();
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
