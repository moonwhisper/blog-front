import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

// 1.2 安装路由
Vue.use(VueRouter)

// 1.3 导入自己的router.js路由模块
import router from './router.js'

//  导入vue-resource
import VueResource from 'vue-resource'
//  安装vue-resource
Vue.use(VueResource)

// 设置请求的根路径

Vue.http.options.root = 'http://localhost:9000'
// 全局设置 发送 post 请求的时候， 表单数据格式组织形式  { emulateJSON: true }
Vue.http.options.emulateJSON = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
