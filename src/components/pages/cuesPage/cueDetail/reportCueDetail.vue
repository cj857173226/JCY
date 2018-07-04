<template>
    <div id="main">
        <div class="detail-item">
            <span class="item-title">举报门类</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">举报人姓名</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">联系方式</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">事发地点</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">采集时间</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title resource-box">举报内容</span><span class="item-content resource-content ">环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title resource-box">图片内容</span>
            <span class="item-content resource-content">
                <ul id="imgViewer">
                    <li>
                        <img src="../../../../assets/index_img.png">
                    </li>
                    <li>
                        <img src="../../../../assets/logo.png">
                    </li>
                    <li>
                        <img src="../../../../assets/construction.jpg">
                    </li>
                    <li>
                        <img src="../../../../assets/logo.png">
                    </li>
                    <li>
                        <img src="../../../../assets/logo.png">
                    </li>
                    <li>
                        <img src="../../../../assets/logo.png">
                    </li>
                </ul>
            </span>
        </div>
        <div class="detail-item">
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

        }
    },
    mounted(){
        let viewer = new Viewer(document.getElementById('imgViewer'));
    },
    methods:{

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
