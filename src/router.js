import VueRouter from 'vue-router'

import login from './components/login/Login'
import register from './components/register/Register'

var router = new VueRouter({
    // 配置路由规则
    routes: [
        { path: '/', redirect: '/login'},
        { path: '/login', component: login },
        { path: '/register', component: register}
    ]
})

// 把路由对象暴露出去
export default router