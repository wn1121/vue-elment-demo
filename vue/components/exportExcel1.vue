<!--导出excel-->
<template>
    <div>
        <el-button type="primary" @click="exportExcel()">导出excel</el-button>
        <form name="downForm" method="get"></form>
    </div>
</template>

<script>
    export default {
        name: 'exportExcel',
        props: ['filename','field','fieldname','data'],
        data() {
            return {

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            exportExcel() {
                let params = {
                    filename: this.filename,
                    data: this.data,
                    field: this.field,
                    fieldName: this.fieldname
                }
                console.log(this.data)
                this.$api.post(this.$apiUrl.exportExcel,params,(res)=>{
                    if(res.data) {
//                        var IFrameRequest = document.createElement("iframe");
//                        IFrameRequest.id = "IFrameRequest";
                        let url;
                        if (location.port) {
                            url = location.protocol + '//' + document.domain + ':' + location.port + '/' + res.data;
                        } else {
                            url = location.protocol + '//' + document.domain + '/' + res.data;
                        }
//                        IFrameRequest.style.display = "none";
//                        document.body.appendChild(IFrameRequest);
                        window.location.href = url;
                    }
                },(res)=>{
                    this.$message.warning(res.msg);
                })
            }
        }
    }
</script>