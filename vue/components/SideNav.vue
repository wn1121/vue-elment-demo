<template>
    <div class="side-nav" :class="{'show': sidebar.opened}" v-cloak>
        <span class="logo" @click="toHome()">
            <img src="../images/logo.jpg" width="35" alt="">
            <h1>BMS</h1>
        </span>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="/demo/form">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/form">Form</router-link>
            </el-menu-item>
            <el-menu-item index="/demo/table">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/table">Table</router-link>
            </el-menu-item>
            <el-menu-item index="/demo/dialog">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/dialog">Dialog</router-link>
            </el-menu-item>
            <el-menu-item index="/demo/amap">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/amap">Amap</router-link>
            </el-menu-item>
            <el-menu-item index="/demo/draggable">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/draggable">Draggable</router-link>
            </el-menu-item>
            <el-menu-item index="/demo/echarts">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/echarts">Echarts</router-link>
            </el-menu-item>
            <el-menu-item index="/demo/scaleImage">
                <i class="el-icon-menu"></i>
                <router-link to="/demo/scaleImage">ScaleImage</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'sideNav',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'username',
                'avatar',
                'sidebar',
                'routers'
            ])
        },
        created() {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            toHome() {
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
            toPage(router) {
                //获取操作按钮权限
                let operations = JSON.parse(localStorage.getItem('operations'));
                for(let v of operations){
                    if(router.id == v.id){
                        localStorage.setItem('operation', JSON.stringify(v.children));
                        this.$store.commit('SET_OPERATION',v.children);
                    }
                }
                this.$router.push({ path: router.path});
            }
        }
    }
</script>