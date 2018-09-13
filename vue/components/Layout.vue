<template>
    <div>
        <!--左导航-->
        <el-side-nav></el-side-nav>
        <!--头部-->
        <el-header></el-header>
        <!--主体部分-->
        <el-app-main></el-app-main>
        <!--尾部-->
        <el-footer></el-footer>
    </div>
</template>

<script>
    import ElHeader from './Header.vue'
    import ElSideNav from './SideNav.vue'
    import ElFooter from './Footer.vue'
    import ElAppMain from './AppMain.vue'

    export default {
        name: 'layout',
        components: { ElHeader, ElSideNav, ElFooter, ElAppMain},
        computed: {

        }
    }
</script>
