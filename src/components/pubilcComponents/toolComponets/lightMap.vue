<template>
    <div class="amap-page-container">
        <el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo">
        </el-amap>

        <div class="toolbar">
            <button @click="getMap()">get map</button>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          plugin: ['ToolBar', {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(o) {
                console.log(o);
              }
            }
          }]
        };
      },

      methods: {
        getMap() {
          // amap vue component
          console.log(amapManager._componentMap);
          // gaode map instance
          console.log(amapManager._map);
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
