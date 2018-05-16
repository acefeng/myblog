// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

//jquery等布局文件
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import './assets/css/animate.css'

//html编辑器文件
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all.js'
import 'kindeditor/themes/default/default.css'

//vuex改变共享数据
import store from './store/index.js' 
Vue.use(VueKindEditor)
Vue.config.productionTip = false

//axios配置发送请求的时候
Axios.interceptors.request.use(function(config){
  store.dispatch('showLoading');
  return config;
},function(error){
  return Promise.reject(error);
})
//axios配置接受请求的时候
Axios.interceptors.response.use(function(response){
  store.dispatch('hideLoading');
  return response;
},function(error){
  return Promise.reject(error);
})

Vue.prototype.$http = Axios;//挂载axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
