<template>
    <div class="container">
        <!--form-->
        <el-form :inline="true" label-position="left" :label-width="queryFormLabelWidth" :model="queryForm" ref="queryForm" size="small">
            <el-form-item label="text" prop="text">
                <el-input v-model="queryForm.text" placeholder="请输入text"></el-input>
            </el-form-item>
            <el-form-item label="select" prop="select">
                <el-select v-model="queryForm.select" placeholder="请选择select">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="date" prop="date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="queryForm.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="t-c" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="queryForm.date2" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button @click="resetForm('queryForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="line"></div>
        <el-row class="pb20">
            <el-button type="primary" size="small" @click="dialogFormVisible = true">新增</el-button>
            <el-button type="primary" size="small" @click="removeItem()">删除</el-button>
        </el-row>

        <!--table-->
        <el-table
                v-loading="loading"
                :data="tableData"
                border
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="business_name"
                    label="业务类型"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="商品组ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品组名称"
                    :show-overflow-tooltip="true"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="updated_at"
                    label="最新修改时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="founder_name"
                    label="创建人"
                    :show-overflow-tooltip="true"
                    width="">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="addOrEditItem(scope.row)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--pagination-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryForm.page"
                :page-sizes="pageSizes"
                :page-size="queryForm.page_size"
                layout="total, sizes, prev, pager, next"
                :total="total">
        </el-pagination>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="100px" size="small">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryFormLabelWidth: '100px',//自定义查询表单label宽度
                queryForm: {//查询表单数据
                    page_size: 10,
                    page: 1,
                    select: '',
                    text: '',
                    date1: '',
                    date2: ''
                },

                tableData: [],//表格数据
                total: 0,//总数
                pageSizes: [10,20,30,40,50],//自定义分页条数
                multipleSelection: [],//table选中项
                loading: false,//表格是否显示加载效果

                dialogFormVisible: false,
                form: {

                }
            }
        },
        created(){
            this.fetchData();
        },
        computed: {
//            operation: function(){
//                return this.$store.getters.operation
//            }
        },
        methods: {
            //抓取列表数据
            fetchData() {

            },
            //删除
            removeItem() {
                if(this.tableData.length == 0){
                    this.$message.warning('目前没有可删除的项');
                    return;
                }
                if(this.multipleSelection.length == 0){
                    this.$message.warning('请选中需要删除的项');
                    return;
                }
                this.$confirm('是否确定删除商品组?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            },
            //表单重置 item上需要添加prop属性
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //切换每页显示条数操作
            handleSizeChange(val) {
                this.queryForm.page_size = val;
                this.fetchData();
            },
            //切换页码操作
            handleCurrentChange(val) {
                this.queryForm.page = val;
                this.fetchData();
            },
            //操作选中项
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>