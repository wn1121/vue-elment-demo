<template>
    <div class="container">
        <el-row>
            <blockquote class="elem-quote">
                <p>郑重提示：请严格按照规定操作</p>
            </blockquote>
        </el-row>
        <el-row class="mt10" :gutter="20">
            <el-col :span="12">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="系统基本参数"
                            width="125">
                    </el-table-column>
                    <el-table-column
                            prop="value"
                            label="">
                        <template scope="scope">
                            <el-collapse accordion v-if="scope.$index == 2 && isHidden">
                                <el-collapse-item title="权限太多，点击查看：">
                                   <div>{{scope.row.value}}</div>
                                </el-collapse-item>
                            </el-collapse>
                            <span v-else>{{scope.row.value}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        computed: {

        },
        data() {
            return{
                auths: '暂无权限',
                tableData: [
                    {id: '当前版本',value: 'V2.0'},
                    {id: '开发作者',value: ''},
                    {id: '当前用户权限',value: ''}
                ],
                tableData1: [],
                isHidden: false,
                loading: true
            }
        },
        created (){

        }
    }
</script>
<style lang="scss"  scoped>
    .elem-quote{
        p{
            color: #1E9FFF;
        }
    }
    .el-collapse {
        border: none;
        .el-collapse-item{
            margin-left: -20px;
            margin-right: -20px;
        }
    }
</style>