<template>
    <div class="amap-page-container" v-loading="isLoad">
        <el-amap ref="map" vid="amap" :center="center" :zoom="zoom" class="amap-demo">
            <el-amap-marker :events="item.events" :key="index" v-for="(item,index) in markers" :position="item.position" :template="item.template"></el-amap-marker>
            <el-amap-info-window
                :position="currentWindow.position"
                :visible = "currentWindow.visible"
                :offset = "offset"
            >
                <div :style="amapWindow">
                    <div v-for="item in content">
                        <span>{{item}}</span>
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
            zoom: 10, //地图放大级别
            center: [114.055038,22.627974], //地图中心左边(深圳)
            markers:[], //图标标点
            content:{
                name:'XXXX',
                content:'撒打算'
            },
            currentWindow:{
                position:[114.025973657,22.5460535462],
                visible:false,
            },
            offset:[5,-15], //弹出框偏移量
            data:[], //数据
            amapWindow:{}, //弹出框样式
            iconClass:[
                'iconfont icon-wushui', //重点排污单位环境信息
                'iconfont icon-fenshaochang', //生活垃圾焚烧厂
                'iconfont icon-kulou-copy', //危险化学品企业
                'iconfont icon-wuranyuan', //非国家重点监控企业污染源
                'iconfont icon-jinjibinansuo', //深圳自然灾害室内应急避难场所
                'iconfont icon-yankongyiliaoanquan', //深圳严控废物经营单位
                'iconfont icon-jiance', //国家重点监控企业污染源监督性结果
                'iconfont icon-shuidi', //湿地公园
                'iconfont icon-baohudiqiu', //自然保护区
                'iconfont icon-senlingongyuan', //森林公园
                'iconfont icon-weixianyuan', //危险废物产生企业
            ],
            isLoad:false,
        }
    },
    mounted(){
        let marker = [];
        let _this = this;
        this.getData();
        this.$root.Bus.$on('moveToCenter',function(obj){
            _this.center = obj;
        })
    },
    methods: {
        //获取数据
        getData(){
            this.data = [];
            var _this = this;
            _this.isLoad = true;
            for(var i = 0 ;i<this.tableId.length;i++){
                _this.axios({
                    method:'get',
                    url:webApi.WebData.GetData.format({sjsybh:_this.tableId[i],p:1,ps:10000}),
                    timeout: 10000
                }).then(function(response){
                    if(response.data.code == 0){
                        _this.data.push(response.data.data);
                        _this.drawOnMap();
                        _this.isLoad = false;
                    }else{

                    }
                }).catch(function(error){

                })
            }
        },
        //数据上图
        drawOnMap(){
            console.log(this.data);
            var _this = this;
            let marker = [];
            for(var i = 0;i<_this.data.length;i++){
                for(var j = 0;j<_this.data[i].length;j++){
                    let position = '';
                    //获得坐标
                    if(_this.data[i][j].经纬度 != ''&&_this.data[i][j].经纬度 != null){
                        position = _this.data[i][j].经纬度.split(',');
                        position[0] = parseFloat(position[0]);
                        position[1] = parseFloat(position[1]);
                        
                        let iconName = '';
                        let styleName = '';
                        let content = {};
                        //获得内容
                        for(var z in _this.data[i][j]){
                            content[z] = _this.data[i][j][z];
                        }
                        //获得图标
                        if(_this.data[i][j].表名称 == "重点排污单位环境信息"){
                            iconName = _this.iconClass[0];
                            styleName = 'color: #795353;'
                        }else if(_this.data[i][j].表名称 == "生活垃圾焚烧厂一览表"){
                            iconName = _this.iconClass[1];
                            styleName = 'color: #c63e3e;'
                        }else if(_this.data[i][j].表名称 == "危险化学品企业信息"){
                            iconName = _this.iconClass[2];
                            styleName = 'color: #cd2506'
                        }else if(_this.data[i][j].表名称 == "非国家重点监控企业污染源监督性监测结果"){
                            iconName = _this.iconClass[3];
                            styleName = 'color: #4a58dc;'
                        }else if(_this.data[i][j].表名称 == "深圳市自然灾害室内应急避难场所"){
                            iconName = _this.iconClass[4];
                            styleName = 'color: #464646;'
                        }else if(_this.data[i][j].表名称 == "深圳市严控废物经营单位名称"){
                            iconName = _this.iconClass[5];
                            styleName = 'color: #464646;'
                        }else if(_this.data[i][j].表名称 == "国家重点监控企业污染源监督性监测结果"){
                            iconName = _this.iconClass[6];
                            styleName = 'color: #f76702;'
                        }else if(_this.data[i][j].表名称 == "湿地公园"){
                            iconName = _this.iconClass[7];
                            styleName = 'color: #6d9d11;'
                        }else if(_this.data[i][j].表名称 == "自然保护区"){
                            iconName = _this.iconClass[8];
                            styleName = 'color: #6574ff;'
                        }else if(_this.data[i][j].表名称 == "森林公园"){
                            iconName = _this.iconClass[9];
                            styleName = 'color: #317d38;'
                        }else if(_this.data[i][j].表名称 == "危险废物产生企业信息"){
                            iconName = _this.iconClass[10];
                            styleName = 'color: #464646;'
                        }


                        marker.push(
                        {
                            position:position,
                            template:'<i class="' + iconName + '" style="font-size: 25px;' + styleName + '"></i>',
                            events:{
                                click:(o)=>{
                                    // _this.showInfo = true;
                                    _this.currentWindow = {
                                        position:position,
                                        visible:false,
                                    };
                                    _this.content = content;
                                    _this.$nextTick(() => {
                                        _this.currentWindow.visible = true;
                                    });
                                }
                            }
                        }
                        )
                    }
                }
            }
            _this.markers = marker;
            console.log(_this.markers);
        }
    },
    watch:{
        tableId:function(){
            console.log(3);
            console.log(this.tableId);
            if(this.tableId.length == 0){
                this.markers = [];
            }else{
                this.getData();
            }
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
    .circle{
        display: block;
        border-radius: 50px;
        width: 20px;
        height: 20px;
        background: black;
    }
}
</style>
