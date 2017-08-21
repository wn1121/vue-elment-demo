import Vue from 'vue';
import Router from 'vue-router';

/* layout */
import Layout from '../components/Layout.vue';

/* dashboard */
import Dashboard from '../views/dashboard/index.vue';
import Notice from '../views/dashboard/notice.vue';
import NoticeDetail from '../views/dashboard/noticeDetail.vue';

/* error page */
import Err404 from '../views/404.vue';

/* passport */
import Login from '../views/passport/login.vue';
import ChangePassword from '../views/passport/changePassword.vue';
import UserInfo from '../views/passport/userInfo.vue';

/* demo */
import BreadCumb from '../views/demo/breadCumb.vue';
import DemoForm from '../views/demo/form.vue';
import DemoTable from '../views/demo/table.vue';
import DemoDialog from '../views/demo/dialog.vue';

Vue.use(Router);

// 配置路由
//const root = '/';

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
        redirect: '/dashboard',
        name: 'Home',
        hidden: true,
        children: [{ path: 'dashboard', component: Dashboard }]
    },
    {
        path: '/dashboard',
        component: Layout,
        name: 'notice',
        hidden: true,
        children: [{ path: 'notice', component: Notice }]
    },
    {
        path: '/dashboard',
        component: Layout,
        name: 'noticeDetail',
        hidden: true,
        children: [{ path: 'noticeDetail/:id', component: NoticeDetail }]
    },
    //demo
    {
        path: '/demo',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        children: [{ path: 'breadCumb', component: BreadCumb }]
    },
    {
        path: '/demo',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        children: [{ path: 'form', component: DemoForm }]
    },
    {
        path: '/demo',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        children: [{ path: 'table', component: DemoTable }]
    },
    {
        path: '/demo',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        children: [{ path: 'dialog', component: DemoDialog }]
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
]

export default new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

