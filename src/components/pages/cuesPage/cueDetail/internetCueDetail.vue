<template>
    <div id="main">
        <div class="detail-item">
            <span class="item-title">数据来源</span><span class="item-content">XX网</span>
        </div>
        <div class="detail-item">
            <span class="item-title">线索类别</span><span class="item-content">环境保护</span>
        </div>
        <div class="detail-item">
            <span class="item-title">发布时间</span><span class="item-content">2017-02-01 00:00:00</span>
        </div>
        <div class="detail-item">
            <span class="item-title">采集时间</span><span class="item-content">2017-02-01 00:00:00</span>
        </div>
        <div class="detail-item">
            <span class="item-title">数据地址</span><span class="item-content">https://www.cnblogs.com/xumqfaith/p/7078557.html</span>
        </div>
        <div class="detail-item">
            <span class="item-title resource-box">采集内容</span>
            <div class="item-content resource-content">
                <div class="text-title">机器分析</div>
                <div class="text-keyword">
                    <span class="text-title-item">关键字:</span>
                    <span></span>
                </div>
                <div class="text-name">
                    <span class="text-title-item">人名:</span><span>人名</span>
                    <br />
                    <span class="text-title-item">地名:</span><span>地名</span>
                    <br />
                    <span class="text-title-item">机构名:</span><span>机构名</span>
                </div>
                <div class="text-remark">
                    <span class="text-title-item">摘要:</span><span>人名</span>
                </div>
            </div>
            <div class="item-content resource-conten" style="margin-top: 20px">
                <span></span> 
            </div>
        </div>
        <div class="detail-item">
            <span class="item-title track-title">事态跟踪:</span>
            <span class="item-content timeline-content">
                <ul class="itemline-box">
                    <li class="timeline-item">
                        <i class="timeline-icon fa fa-circle-o"></i>
                        <div class="tiemline-text">
                            <h3 class="timeline-time">2018年3月2日</h3>
                            <h4 class="tiemline-name">陈吉</h4>
                            <p>擦手册去啊的v啊v请问大师v啊</p>
                        </div>
                    </li>
                    <li class="timeline-item">
                        <i class="timeline-icon fa fa-circle-o"></i>
                        <div class="tiemline-text">
                            <h3 class="timeline-time">2018年3月2日</h3>
                            <h4 class="tiemline-name">陈吉</h4>
                            <p>擦手册去啊的v啊v请问大师v啊</p>
                        </div>
                    </li>
                </ul>
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
    color: #333;
    padding-right: 40px;
    .detail-item{
        padding-left: 40px;
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
            padding: 0px 10px;
            width: calc(100% - 300px);
        }
        .resource-box{
            width: 100%;
            display: block;
            float: none;
        }
        .resource-content{
            height: initial;
            line-height: 22px;
            padding: 15px;
            width: 100%;
            .text-title{
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .text-title-item{
                font-size: 14px;
                font-weight: bold;
                margin-right: 10px;
            }
            img{
                width: 200px;
                height: 300px;
            }
            video{
                width: 300px;
                height: 200px;
            }
        }
        .track-title{
            width: 80px;
            background: #fff;
            font-weight: bold;
            line-height: 20px;
        }
        .timeline-content{
            border: none;
            .itemline-box{
                padding: 0;
                .timeline-item{
                    padding-bottom: 10px;
                    position: relative;
                    .timeline-icon{
                        position: absolute;
                        left: -5px;
                        top: 0;
                        z-index: 10;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        background-color: #fff;
                        color: #5FB878;
                        border-radius: 50%;
                        text-align: center;
                        cursor: pointer;
                    }
                    .tiemline-text{
                        line-height: 22px;
                        display: inline-block;
                        padding-left: 30px;
                        .timeline-time{
                            margin-bottom: 5px;
                            font-size: 16px;
                            color: #333;
                            font-weight: 500;
                        }
                        .tiemline-name{
                            color: #333;
                        }
                        p{
                            color: #555;
                        }
                    }
                }
                .timeline-item:before{
                        content: '';
                        position: absolute;
                        left: 5px;
                        top: 0;
                        z-index: 0;
                        width: 1px;
                        height: 100%;    
                        background-color: #e6e6e6;
                }
                .timeline-item:last-child:before{
                    display: none;
                }
            }
        }
    }
}
</style>
