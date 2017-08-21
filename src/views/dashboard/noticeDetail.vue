<template>
    <div class="container">
        <el-card class="box-card" v-loading.body="loading">
            <div slot="header" class="t-c clearfix">
                <span class="bold" style="line-height: 36px;">{{detail.title}}</span>
            </div>
            <div class="item ql-editor" v-html="detail.notice">
            </div>
        </el-card>
        <!--<el-row class="mb15">-->
            <!--<blockquote class="elem-quote">-->
                <!--<p>{{detail.title}}</p>-->
            <!--</blockquote>-->
        <!--</el-row>-->
        <!--<el-row>-->
            <!--<p>{{detail.notice}}</p>-->
        <!--</el-row>-->
    </div>
</template>

<script>
    export default {
        name: 'notice',
        computed: {

        },
        data() {
            return{
                detail: {},
                loading: true
            }
        },
        created (){
            //获取公告列表
            let params = {
                notice_id: this.$route.params.id
            };
            this.$api.post(this.$apiUrl.systemNoticeInfo,params,(res)=>{
                this.loading = false;
                this.detail = res.data;
            },()=>{
                this.loading = false;
            })
        }
    }
</script>
<style lang="scss"  scoped>

</style>