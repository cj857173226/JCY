// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' //引入axios
import 'element-ui/lib/theme-chalk/index.css'; //element-ui主题css
import ElementUI from 'element-ui'; //引入element-ui



Vue.use(ElementUI);   //使用elementUi
Vue.prototype.axios = axios; //vue原型上挂载axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})