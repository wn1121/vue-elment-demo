<!--面包屑-->
<template>
    <el-row class="mb20">
        <blockquote class="elem-quote">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!--<el-breadcrumb-item :to="{ path: `/local/strategy/list/${$route.params.ruleId}` }">运营策略管理</el-breadcrumb-item>-->
                <el-breadcrumb-item v-for="item in breadCumb" :key="item.name" :to="{path: item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </blockquote>
    </el-row>
</template>

<script>
    export default {
        name: 'breadcumb',
        props: ['breadCumb'],
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }
    }
</script>