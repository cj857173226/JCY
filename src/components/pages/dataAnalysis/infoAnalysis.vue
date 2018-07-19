<template>
    <div id="info">
        <div id="tool-bar"></div>
        <div id="map-bar">
            <light-map></light-map>
        </div>
    </div>
</template>

<script>
import lightMap from '../../pubilcComponents/toolComponets/lightMap'
export default {
    components:{lightMap},
    data(){

    }
}
</script>

<style lang="scss" scoped>
#info{
    width: 100%;
    height: 100%;
    #tool-bar{
        width: 300px;
        height: 100%;
        float: left;
    }
    #map-bar{
        width: calc(100% - 300px);
        height: 100%;
        margin-left: 300px;
    }
}
</style>
