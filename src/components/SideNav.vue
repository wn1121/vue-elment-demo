<template>
    <div class="side-nav" :class="{'hide':!sidebar.opened}" v-cloak>
        <div class="user-photo">
            <a class="img" title="我的头像">
                <img :src="avatar" v-if="avatar">
                <img src="../images/default-avatar.png" v-if="!avatar">
            </a>
            <p>你好！<span class="userName">{{username}}</span>, 欢迎登录</p>
        </div>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="/dashboard">
                <i class="iconfont icon-computer mr5"></i>
                <router-link to="/dashboard">后台首页</router-link>
            </el-menu-item>
            <el-submenu index="/demo">
                <template slot="title"><i class="el-icon-menu"></i>demo</template>
                <el-menu-item index="/demo/dialog">
                    <router-link to="/demo/dialog">dialog</router-link>
                </el-menu-item>
                <el-menu-item index="/demo/form">
                    <router-link to="/demo/form">form</router-link>
                </el-menu-item>
                <el-menu-item index="/demo/table">
                    <router-link to="/demo/table">table</router-link>
                </el-menu-item>
                <el-menu-item index="/demo/breadCumb">
                    <router-link to="/demo/breadCumb">breadCumb</router-link>
                </el-menu-item>
            </el-submenu>
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
            }
        }
    }
</script>