<template>
    <div class="amap-page-container">
        <el-amap ref="map" vid="amap" :center="center" :zoom="zoom" class="amap-demo">
            <el-amap-marker :events="item.events" :key="index" v-for="(item,index) in markers" :position="item.position" :template="item.template"></el-amap-marker>
            <el-amap-info-window
                :position="currentWindow.position"
                :visible = "currentWindow.visible"
                :offset = "offset"
            >
                <div :style="amapWindow">
                    <div>
                        <span>名称</span>
                        <span>{{content.name}}</span>
                    </div>
                    <div>
                        <span @click="getData">内容</span>
                        <span>{{content.content}}</span>
                    </div>
                </div>
            </el-amap-info-window>
        </el-amap>
    </div>
</template>

<script>
export default {
    props:['tableId'],
    data: function() {
        return {
            zoom: 11, //地图放大级别
            center: [114.025973657,22.5460535462], //地图中心左边(深圳)
            markers:[], //图标标点
            content:{
                name:'XXXX',
                content:'撒打算'
            },
            currentWindow:{
                position:[114.025973657,22.5460535462],
                // content:'HI',
                visible:false,
                // events:{
                // }
            },
            offset:[5,-15],
            data:[]
        }
    },
    mounted(){
        let marker = [];
        let _this = this;
        for(let i = 0;i<2;i++){
            marker.push(
                {
                    position:[114.015973657,22.5760535462 + i * 0.001],
                    template:'<i class="fa fa-bandcamp font-icon" style="font-size: 30px"></i>',
                    events:{
                        click:(o)=>{
                            // _this.showInfo = true;
                            _this.currentWindow = {
                                position:[114.015973657,22.5760535462 + i * 0.001],
                                visible:false,
                            };
                            _this.content = {
                                name:i,
                                content:'XXX' + i
                            }
                            _this.$nextTick(() => {
                                _this.currentWindow.visible = true;
                            });
                            console.log(_this.currentWindow);
                        }
                    }
                }
            )
        };
        this.markers = marker;
        this.getData();
    },
    methods: {
        //获取数据
        getData(){
            console.log(this.tableId);
            var _this = this;
            for(var i = 0 ;i<this.tableId.length;i++){
                _this.axios({
                    method:'get',
                    url:webApi.WebData.GetData.format({sjsybh:_this.tableId[i],p:1,ps:20000}),
                    timeout: 10000
                }).then(function(response){
                    if(response.data.code == 0){
                        _this.data.push(response.data.data);
                        console.log(_this.data);
                    }else{

                    }
                }).catch(function(error){

                })
            }
        }
    },
    watch:{
        tableId:function(){
            this.getData();
        }
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
