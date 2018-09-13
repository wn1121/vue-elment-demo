<template>
    <header v-cloak>
        <span class="cursor" @click="toHome()">
            <img src="../images/logo.jpg" class="logo" width="35" alt="" v-if="!sidebar.opened">
        </span>
        <span class="hide-menu cursor" @click="toggleSideBar">
            <i class="icon iconfont">&#xe786;</i>
        </span>

        <el-menu class="el-menu-demo" mode="horizontal" :default-active="$store.getters.activeIndex" id="menuList">
            <el-menu-item index="1" @click="getLeftMenu()">
                DEMO
            </el-menu-item>
            <el-submenu index="5" style="float: right">
                <template slot="title">
                    admin
                </template>
                <el-menu-item index="111">
                    <i class="el-icon-document"></i>
                    <a>帮助文档</a>
                </el-menu-item>
                <el-menu-item index="/passport/changepwd">
                    <i class="icon iconfont pr10">&#xe631;</i>
                    <router-link to="/passport/changepwd">修改密码</router-link>
                </el-menu-item>
                <el-menu-item index="2-3" @click="logout()">
                    <i class="icon iconfont pr10">&#xe65a;</i>
                    退出
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        components: {},
        name: 'elHeader',
        data() {
            return {
//                activeIndex: '',
                choseMenu: '更多',
                operations: []
            };
        },
        //components: { ElTopNav },
        computed: {
            ...mapGetters([
                'username',
                'avatar',
                'menus',
                'routers',
                'sidebar'
            ])
        },
        // 监听,当路由发生变化的时候执行
        watch:{
            $route(to,from){
                if(to.path == '/index'){
                    localStorage.removeItem('activeIndex');
                    this.$store.commit('SET_ACTIVEINDEX','');
                }
            }
        },
        created() {

        },
        methods: {
            //退出
            logout(){
                this.$store.dispatch('LogOut');
            },
            //操作左导航
            toggleSideBar(){
                this.$store.dispatch('ToggleSideBar');
            },
            toHome() {
                this.choseMenu = '更多';
                //去掉一级菜单选中
                localStorage.removeItem('activeMenuIndex');
                this.$store.commit('SET_ACTIVEINDEX','');
                //去除二级路由
                localStorage.removeItem('routers');
                this.$store.commit('SET_ROUTERS','');
                //关闭左导航
                localStorage.setItem('sidebarStatus', 0);
                this.$store.getters.sidebar.opened = false;
                this.$router.push({ path: '/' });
            },
            //获取左边导航菜单
            getLeftMenu(item) {
                if(item){
                    localStorage.setItem('activeIndex', item.path);
                    this.$store.commit('SET_ACTIVEINDEX', item.path);

                    //打开左导航
                    localStorage.setItem('sidebarStatus', 1);
                    this.$store.getters.sidebar.opened = true;
                }else{
                    //打开左导航
                    localStorage.setItem('sidebarStatus', 1);
                    this.$store.getters.sidebar.opened = true;
                }

            }
        }
    }
</script>