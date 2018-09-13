<!--导出excel-->
<template>
    <div>
        <el-button type="primary" @click="exportExcel()">{{excel}}</el-button>
        <form name="downForm" method="get"></form>
    </div>
</template>

<script>
    export default {
        name: 'exportExcel',
        props: ['params','target','action','field','fieldname','filename','excelBtn'],
        data() {
            return {
                excel:"导出excel"
            }
        },
        created() {
            console.log(this.excelBtn);
            if (this.excelBtn){
                this.excel=this.excelBtn;
            }
        },
        mounted() {

        },
        methods: {
            exportExcel() {
                let params = {
                    params: this.params,
                    target: this.target,
                    action: this.action,
                    field: this.field,
                    fieldName: this.fieldname,
                    filename: this.filename
                }
                console.log(params);
                this.$api.post(this.$apiUrl.exportV3,params,(res)=>{
                    if(res.data) {
                        console.log(res.data);

//                        let url;
//                        if (location.port) {
//                            url = location.protocol + '//' + document.domain + ':' + location.port + '/' + res.data;
//                        } else {
//                            url = location.protocol + '//' + document.domain + '/' + res.data;
//                        }
                        window.location.href = res.data;
                    }
                },(res)=>{
                    this.$message.warning(res.msg);
                })
            }
        }
    }
</script>