<template>
    <div id="main">
        <div class="detail-item">
            <span class="item-title">举报门类:</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">举报人姓名:</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">联系方式:</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">事发地点:</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">采集时间:</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title resource-box">举报内容:</span><span class="item-content resource-content ">环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title resource-box">图片内容:</span>
            <span class="item-content resource-content">
                <img src="asd">
                <img src="asd">
                <img src="asd">
                <img src="asd">
                <img src="asd">
                <img src="asd">
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
    
}
</script>

<style lang="scss" scoped>
#main{
    .detail-item{
        padding-left: 40px;
        margin: 15px 0;
        span{
            display: inline-block;
        }
        .item-title{
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            float: left;
            margin-right: 10px;
        }
        .item-content{
            border: solid 1px #ddd;
            border-radius: 5px;
            height: 30px;
            line-height: 30px;
            padding: 0px 10px;
            max-width: calc(100% - 100px);
        }
        .resource-box{
            
        }
        .resource-content{
            height: initial;
            padding: 10px;
            img{
                width: 200px;
                height: 300px;
            }
            video{
                width: 300px;
                height: 200px;
            }
        }
    }
}
</style>
