import Vue from 'vue'
import './style/theme/index.css'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'

// import 'element-ui/lib/theme-default/index.css'
import './style/style.scss'
import App from './App.vue'
import router from './config/routes'
import store from './store'

import Api from './common/api'
import apiUrl from './common/apiUrl'
import Validator from './common/validator'

//Vue.use(VueRouter)
Vue.use(ElementUI)

//绑定到Vue上
Vue.prototype.$api = Api
Vue.prototype.$apiUrl = apiUrl
Vue.prototype.$valid = Validator

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})
