// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' //引入axios
import 'element-ui/lib/theme-chalk/index.css'; //element-ui主题css
import ElementUI from 'element-ui'; //引入element-ui
import 'font-awesome/css/font-awesome.css'; //引入font awsome字体图标
import '../src/static/webApi.js'; //引入接口
import '../src/static/common.js';
import vueKindEditor from 'vue-kindeditor'
import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/themes/default/default.css'

 //axios请求拦截器
axios.interceptors.request.use(config=>{
  console.log(router);
  if(router.history.current.path != '/login'){
    if(localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token');
    }else{
      console.log("请先登录");
      router.push({path:'/login'});
    }
  }
  return config;
},err => {
  return Promise.reject(err);
})
//axios响应拦截器
axios.interceptors.response.use(response=>{
  return response;
},err => {
  if(err.response){
    if(err.response.status == 403){
      router.push({path:'/login'});
    }
  }
  return Promise.reject(err);
})

Vue.use(ElementUI);   //使用elementUi
Vue.prototype.axios = axios; //vue原型上挂载axios
Vue.config.productionTip = false
Vue.use(vueKindEditor)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    
  }
})

