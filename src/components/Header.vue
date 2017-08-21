<template>
    <header v-cloak>
        <a class="logo" href="javascript:void(0)">
            ALY-IMC
        </a>
        <span class="hide-menu cursor" @click="toggleSideBar">
            <i class="iconfont icon-menu"></i>
        </span>
        <el-menu class="el-menu-demo" :default-active="$route.path" mode="horizontal">
            <el-menu-item index="/dashboard/notice">
                <i class="iconfont icon-gonggao mr5"></i>
                <router-link to="/dashboard/notice">系统公告</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <img :src="avatar" v-if="avatar" class="avatar" width="35" height="35">
                    <img src="../images/default-avatar.png" v-if="!avatar" class="avatar" width="35" height="35">
                    {{username}}
                </template>
                <el-menu-item index="/passport/userinfo">
                    <i class="el-icon-document"></i>
                    <router-link to="/passport/userinfo">个人资料</router-link>
                </el-menu-item>
                <el-menu-item index="/passport/changepwd">
                    <i class="el-icon-setting"></i>
                    <router-link to="/passport/changepwd">修改密码</router-link>
                </el-menu-item>
                <el-menu-item index="2-3" @click="logout()">
                    <i class="iconfont icon-loginout pr10"></i>
                    退出
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'header',
        data() {
            return {

            };
        },
        //components: { ElTopNav },
        computed: {
            ...mapGetters([
                'username',
                'avatar'
            ])
        },
        methods: {
            //退出
            logout(){
                this.$store.dispatch('LogOut');
            },
            //操作左导航
            toggleSideBar(){
                this.$store.dispatch('ToggleSideBar')
            },
        }
    }
</script>