<template>
    <div id="cue-map">
        <el-amap ref="cueAMap" vid="cueAMap" :events="events" :amap-manager="amapManager" :zoom="zoom" :center="center" class="amap-content"></el-amap>
    </div>
</template>

<script>
// import { VueAMap } from 'vue-amap';
// let amapManager = new VueAMap.AMapManager();
export default {
    data: function(){
        return {
            zoom: 10, //地图放大级别
            center:[114.055038,22.627974],
            amapManager,
            events: {
                init(o){

                }
            }

        }
    },
    mounted(){
        // console.log(this.amapManager);
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    #cue-map{
        width: 100%;
        height: 100%;
        .amap-content{
            width: 100%;
            height: 100%;
        }
    }
</style>
