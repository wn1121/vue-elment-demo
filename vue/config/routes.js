import Vue from 'vue';
import Router from 'vue-router';

/* layout */
import Layout from '~/components/Layout.vue';

/* dashboard */
import Index from '~/views/dashboard/index.vue';

/* error page */
import Err404 from '~/views/404.vue';

/* demo */
import BreadCumb from '~/views/demo/breadCumb.vue';
import DemoForm from '~/views/demo/form.vue';
import DemoTable from '~/views/demo/table.vue';
import DemoDialog from '~/views/demo/dialog.vue';
import DemoAmap from '~/views/demo/amap.vue';
import DemoCropper from '~/views/demo/cropper.vue';
import DemoDraggable from '~/views/demo/draggable.vue';
import DemoEcharts from '~/views/demo/echarts.vue';
import DemoscaleImage from '~/views/demo/scaleImage.vue'

/* passport */
import Login from '~/views/passport/login.vue';
import ChangePassword from '~/views/passport/changePassword.vue';
import UserInfo from '~/views/passport/userInfo.vue';

Vue.use(Router);

// 配置路由

export const constantRouterMap = [
    { path: '/404', component: Err404, hidden: true },
    // {
    //     path: "*",
    //     redirect: '/dashboard',
    //     hidden: true,
    //     children: [{ path: 'dashboard', component: Dashboard }]
    // },
    {
        path: '*',
        component: Layout,
        redirect: '/index',
        name: 'Home',
        hidden: true,
        children: [{ path: 'index', component: Index }]
    },
    //passport
    {
        path: '/passport/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/passport',
        component: Layout,
        redirect: 'noredirect',
        name: 'changepwd',
        hidden: true,
        children: [{ path: 'changepwd', component: ChangePassword }]
    },
    {
        path: '/passport',
        component: Layout,
        redirect: 'noredirect',
        name: 'userinfo',
        hidden: true,
        children: [{ path: 'userinfo', component: UserInfo }]
    },

    //demo
    {
        path: '/demo',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        children: [
            { path: 'breadCumb', component: BreadCumb },
            { path: 'form', component: DemoForm },
            { path: 'table', component: DemoTable },
            { path: 'dialog', component: DemoDialog },
            { path: 'amap', component: DemoAmap },
            { path: 'cropper', component: DemoCropper },
            { path: 'draggable', component: DemoDraggable },
            { path: 'echarts', component: DemoEcharts },
            { path: 'scaleImage', component: DemoscaleImage }

        ]
    }
]

// let routers = constantRouterMap.concat(routesUserMap,routesGoodsMap,routesSupplyChain,routesTransactionMap);
export default new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

