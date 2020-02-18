import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false;
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

// 1.2 安装路由
Vue.use(VueRouter);

// 1.3 导入自己的router.js路由模块
import router from './router.js'

//  导入vue-resource
import VueResource from 'vue-resource'
//  安装vue-resource
Vue.use(VueResource);

// 设置请求的根路径

Vue.http.options.root = 'http://localhost:9000';
// 全局设置 发送 post 请求的时候， 表单数据格式组织形式  { emulateJSON: true }
Vue.http.options.emulateJSON = false;

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    // 登录成功后，记录登录用户的信息
    initUserInfo(state, info) {
      state.userInfo = info;
    }
  },
  getters: {
    // 获取用户信息
    getUserInfo(state) {
      return state.userInfo;
    }
  }
});


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
Vue.prototype.dateFormat = function (fmt, date) {
  var o = {
    "M+" : date.getMonth()+1,     //月份
    "d+" : date.getDate(),     //日
    "h+" : date.getHours(),     //小时
    "m+" : date.getMinutes(),     //分
    "s+" : date.getSeconds(),     //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S" : date.getMilliseconds()    //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
