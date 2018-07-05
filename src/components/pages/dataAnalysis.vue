<template>
  <div id="analysis">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="14" :xl="16">
        <heat-map></heat-map>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10" :xl="8">
        <el-row>
            <el-col :span="24">
              <line-map></line-map>
            </el-col>
            <el-col :span="24">
              <cue-pie></cue-pie>
            </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import heatMap from '../pubilcComponents/eChartComponents/heatMap' //引入热力图
import lineMap from '../pubilcComponents/eChartComponents/lineMap' //引入折线图
import cuePie from '../pubilcComponents/eChartComponents/cuePieChart' //引入折线图
  export default{
    components: {heatMap,lineMap,cuePie},
    data(){
      return{

      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  #analysis{
    padding: 10px;
  }
</style>
