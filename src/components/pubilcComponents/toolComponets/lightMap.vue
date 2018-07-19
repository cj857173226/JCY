<template>
    <div class="amap-page-container">
        <el-amap ref="map" vid="amap" :center="center" :zoom="zoom" class="amap-demo">
            <el-amap-marker :events="item.events" v-for="(item,index) in markers" :position="item.position" :template="item.template"></el-amap-marker>
            <el-amap-info-window
                :position="currentWindow.position"
                :content="currentWindow.content"
                :visible="currentWindow.visible"
                :events="currentWindow.events"
            ></el-amap-info-window>
        </el-amap>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            zoom: 11, //地图放大级别
            center: [114.025973657,22.5460535462], //地图中心左边(深圳)
            markers:[], //图标标点
            windows: [
                {
                position: [114.025973657,22.5460535462],
                content: 'Hi! I am here!',
                visible: true,
                events: {
                    close() {
                    console.log('close infowindow1');
                    }
                }
                }, {
                position: [114.025173657,22.5468535462],
                content: 'Hi! I am here too!',
                visible: true,
                events: {
                    close() {
                    console.log('close infowindow2');
                    }
                }
                }
            ],
            currentWindow:{
                position:[114.025973657,22.5460535462],
                content:'HI',
                visible:true,
                events:{
                }
            },
        }
    },
    mounted(){
        this.currentWindow = this.windows[0];
        let marker = [];
        let _this = this;
        for(let i = 0;i<2;i++){
            marker.push(
                {
                    position:[114.015973657,22.5760535462 + i * 0.001],
                    template:'<i class="fa fa-bandcamp font-icon" style="font-size: 30px"></i>',
                    events:{
                        click:(o)=>{
                            _this.windows.forEach(window => {
                                window.visible = false;
                            });

                            _this.currentWindow.position = [114.015973657,22.5760535462 + i * 0.001];
                            _this.currentWindow.content = '家兴';
                            _this.$nextTick(() => {
                                _this.currentWindow.visible = true;
                            });
                        }
                    }
                }
            )
        };
        this.markers = marker;
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.amap-page-container{
    height: 100%;
    .amap-demo {
      height: 100%;
    }
}
</style>
