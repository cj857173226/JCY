<template>
    <div id="search-pie">
        <div id="pieChart"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            myChart:null,
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
        }
    },
    mounted(){
        this.initChart();
    },
    methods:{
        initChart(){
            var _this = this;
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y:'bottom',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:_this.data
                    }
                ]
            };
            var chart = document.getElementById('pieChart');
            var width = document.getElementById('search-pie').clientWidth;
            var height = document.getElementById('search-pie').clientHeight;
            chart.style.width = width + 'px';
            chart.style.height = height + 'px';
            this.myChart = echarts.init(chart);
            this.myChart.setOption(option);
        }
    }
}
</script>

<style lang="scss" scoped>
#search-pie{
    width: 100%;
    height: 100%;
}
</style>
