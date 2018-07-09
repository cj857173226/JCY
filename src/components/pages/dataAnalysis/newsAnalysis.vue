<template>
  <div id="newsAnalysis">
    <heat-map :clickMap="true"></heat-map>
  </div>
</template>
<script>
  import heatMap from '../../pubilcComponents/eChartComponents/heatMap'
  export default {
    components: {heatMap}
  }
</script>
<style lang="scss">
  #newsAnalysis {
    padding: 20px;
    #heatmap_box {
      display: flex;
      #heatmap_main {
        width: 70% !important;
      }
      #heatmap_list {
        width: 30% !important;
      }
    }
  }
</style>
