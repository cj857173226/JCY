function registerMap(vueObj) {
//34个省、市、自治区的名字拼音映射数组
  var provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
  };

//注册全国地图
  vueObj.axios({
    url: '@/.././static/map/china.json'
  }).then(function(data){
    echarts.registerMap('china', data.data);
  });
  //注册省级地图
  for(let i  in provinces) {
    if(provinces[i]!='taiwan') {
      vueObj.axios({
        url: '@/.././static/map/province/'+ provinces[i] +'.json'
      }).then(function(data){
        echarts.registerMap(i, data.data);
      });
    }
  }
//地图点击事件
  //注册县级地图
  // vueObj.axios({
  //   url: 'static/map/city/'+ cityMap[params.name] +'.json'
  // }).then(function(data){
  //   console.log(data);
  //   echarts.registerMap(params.name, data);
  // });
}

export  default  registerMap
