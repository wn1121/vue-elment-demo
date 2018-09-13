import Vue from 'vue'
import ElementUI from 'element-ui'
import './style/element-variables.scss'

// import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import './style/style.scss'
import App from './App.vue'
import router from './config/routes'
import store from './store'

import Api from './common/api'
import apiUrl from './common/apiUrl'
import Validator from './common/validator'
import Utils from './common/utils'
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false}) //浏览器的FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为false，也就是使用readAsArrayBuffer
Vue.use(ElementUI)

import viserVue from 'viser-vue'
Vue.use(viserVue)

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    key: 'b68c04faea9a02c6db4aa8ac6141a1cc', //b68c04faea9a02c6db4aa8ac6141a1cc
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','Geolocation']
});

//绑定到Vue上
Vue.prototype.$api = Api
Vue.prototype.$apiUrl = apiUrl
Vue.prototype.$valid = Validator
Vue.prototype.$utils = Utils


const whiteList = ['/passport/login'];
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (store.getters.userId) {
        if (to.path === '/passport/login') {
            next({path: '/'});
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next({path: '/passport/login'});
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})
