<template>
    <div class="container home">
        <el-alert
                title="欢迎您登录管理后台"
                type="success"
                :closable="false"
                show-icon>
        </el-alert>
        <el-row class="pt20" :gutter="20">
            <el-col :span="12">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span class="f16">待办事项</span>
                    </div>
                    <div style="height: 285px;">
                        <p></p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span class="f16">最近销售占比</span>
                        <el-select size="mini" class="fr" v-model="timeStatus" @change="" placeholder="请选择">
                            <el-option value="0" label="最近一天"></el-option>
                            <el-option value="1" label="最近3天"></el-option>
                            <el-option value="2" label="最近一周"></el-option>
                            <el-option value="3" label="最近一月"></el-option>
                        </el-select>
                    </div>
                    <div style="height: 285px;">
                        <v-chart :forceFit="true" :height="height" :data="salesRatio" :scale="scale" v-if="salesRatio.length > 0">
                            <v-tooltip :showTitle="false" dataKey="city*percent" />
                            <v-axis />
                            <v-legend dataKey="city" :offsetY="30" />
                            <v-pie
                                    position="percent"
                                    color="item"
                                    :vStyle="pieStyle"
                                    :label="labelConfig"
                            />
                            <v-coord type="theta" :radius="0.8" />
                        </v-chart>
                        <p v-if="salesRatio.length == 0">暂无数据~</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="pt20" :gutter="20">
            <el-col :span="12">
                <el-card class="box-card use" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span class="f16">常用功能</span>
                    </div>
                    <div style="height: 104px;">
                        <el-row>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    用户管理
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    用户管理
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    用户管理
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    用户管理
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    用户管理
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    用户管理
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span class="f16">数据展示</span>
                    </div>
                    <div style="height: 104px;">

                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ElBreadCumb from '~/components/BreadCumb.vue'
    const DataSet = require('@antv/data-set');

    const sourceData = [
        { item: '事例一', count: 40 },
        { item: '事例二', count: 21 },
        { item: '事例三', count: 17 },
        { item: '事例四', count: 13 },
        { item: '事例五', count: 9 }
    ];

    const scale = [{
        dataKey: 'percent',
        min: 0,
        formatter: '.0%',
    }];

    const dv = new DataSet.View().source(sourceData);
    dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
    });
    const data = dv.rows;

    export default {
        name: 'home',
        components: { ElBreadCumb },
        computed: {
            breadCumb: function(){
                return [{'name':'首页','path':'/'}]
            }
        },
        data() {
            return{
                scale,
                salesRatio: data,
                height: 280,
                pieStyle: {
                    stroke: "#fff",
                    lineWidth: 1
                },
                labelConfig: ['percent', {
                    formatter: (val, item) => {
                        const point = item.point; // 每个弧度对应的点
                        let percent = point['percent'];
                        percent = (percent * 100).toFixed(4) + '%';
                        return item.point.item + ': ' + percent;
                    },
                    offset: 10,
                    // textStyle: {
                    //     rotate: 0,
                    //     textAlign: 'center',
                    //     shadowBlur: 2,
                    //     shadowColor: 'rgba(0, 0, 0, .45)'
                    // }
                }],
                timeStatus: '0'
            }
        },
        created (){
            localStorage.setItem('sidebarStatus', 0);
            this.$store.getters.sidebar.opened = false;
        },
        methods: {


        }
    }
</script>
<style lang="scss"  scoped>
    .el-card__body{
        p{
            padding-bottom: 10px;
        }
    }
    .item{
        margin-right: 40px;
    }
    .el-button:hover{
        background-color: #fff;
        color: #606266;
        border: 1px solid #dcdfe6;
        cursor: inherit;
    }
</style>