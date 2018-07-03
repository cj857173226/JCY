<template>
  <div id="wordCloud_main" style="width: 100%;height: 350px;"></div>
</template>

<script>
    export default {
        name: "word-cloud",
        data() {
          return {
            optionData: ""
          }
        },
        methods : {
          //图表初始化
          initChart() {
            let myChart = echarts.init(document.getElementById('wordCloud_main'));
            let  option =  this.getOption();
            myChart.setOption(option);
            this.resizeWindow();
          },
          //获取option设置
          getOption(data) {
            function createRandomItemStyle() {
              return {
                normal: {
                  color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')'
                }
              };
            }
            data =  [
              {
                name: "Sam S Club",
                value: 10000,
                itemStyle: {
                  normal: {
                    color: 'black'
                  }
                }
              },
              {
                name: "Macys",
                value: 6181,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Amy Schumer",
                value: 4386,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Jurassic World",
                value: 4055,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Charter Communications",
                value: 2467,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Chick Fil A",
                value: 2244,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Planet Fitness",
                value: 1898,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Pitch Perfect",
                value: 1484,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Express",
                value: 1112,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Home",
                value: 965,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Johnny Depp",
                value: 847,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Lena Dunham",
                value: 582,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Lewis Hamilton",
                value: 555,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "KXAN",
                value: 550,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Mary Ellen Mark",
                value: 462,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Farrah Abraham",
                value: 366,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Rita Ora",
                value: 360,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Serena Williams",
                value: 282,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "NCAA baseball tournament",
                value: 273,
                itemStyle: createRandomItemStyle()
              },
              {
                name: "Point Break",
                value: 265,
                itemStyle: createRandomItemStyle()
              }
            ];
            let option = {
              backgroundColor: '#fff',
              title: {
                text: '活跃关键词',
                x:'center'
              },
              tooltip: {
                show: true
              },
              series: [{
                name: '活跃关键词',
                type: 'wordCloud',
                size: ['80%', '80%'],
                textRotation : [0,0],
                textPadding: 0,
                autoSize: {
                  enable: true,
                  minSize: 16
                },
                data: data
              }]
            };
            return option;
          },
          //窗口改变重绘图表
          resizeWindow() {
            let _this = this;
            window.addEventListener('resize',function(){
              let myChart = echarts.init(document.getElementById('wordCloud_main'));
              let heatData = _this.optionData;
              let  option =  _this.getOption(heatData);
              myChart.setOption(option);
            })
          },
        },
        mounted() {
          this.initChart();//初始化图表
        }
    }
</script>

<style scoped>

</style>
