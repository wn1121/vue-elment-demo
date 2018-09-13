<!--面包屑-->
<template>
    <blockquote class="elem-quote">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path: `/local/strategy/list/${$route.params.ruleId}` }">运营策略管理</el-breadcrumb-item>-->
            <el-breadcrumb-item v-for="item in breadCumb" :key="item.name" :to="{path: item.path,query:{id:item.id}}">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </blockquote>
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
            console.log(this.breadCumb);
        },
        methods: {

        }
    }
</script>