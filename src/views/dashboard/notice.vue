<template>
    <div class="container">
        <el-card class="box-card" v-loading.body="loading">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">最新公告</span>
                <i class="iconfont icon-new1"></i>
            </div>
            <div v-for="item in tableData" :key="item.id" class="item">
                <router-link :to="`/dashboard/noticeDetail/${item.id}`">{{item.title}}</router-link>
                <span class="fr">{{item.create_time}}</span>
            </div>
            <div v-if="tableData.length == 0">还没有公告哦~</div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'notice',
        computed: {

        },
        data() {
            return{
                tableData: [],
                loading: true
            }
        },
        created (){
            //获取公告列表
            this.loading = false;
//            this.$api.post(this.$apiUrl.systemNotice,{},(res)=>{
//                this.loading = false;
//                this.tableData = res.data || [];
//            },()=>{
//                this.loading = false;
//            })
        }
    }
</script>
<style lang="scss"  scoped>
    .item {
        padding: 18px 0;
        border-bottom: 1px dashed #dfe6ec;
        &:last-child{
            border-bottom: none;
        }
    }
    .iconfont{
        color: #ff0000;
    }
</style>