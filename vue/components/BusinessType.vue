<template>
    <el-select v-model="type" placeholder="请选择业务类型">
        <el-option v-for="t in bTypes" :label="t.name" :value="t.id" :key="t.id" @change="changeType()"></el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'BusinessType',
        props: ['type'],
        data() {
            return {
                bTypes: []
            }
        },
        created(){
            this.getBusinessType();
        },
        methods: {
            getBusinessType() {
                let params = {
                    userId: localStorage.getItem('userId')
                }
                this.$api.get('http://localhost:9090/businessList',params,(res)=>{
                    if(res.data.business_list && res.data.business_list.length>0){
                        this.bTypes = res.data.business_list;
                    }
                })
            },
            changeType() {
                this.$emit('type',this.type);
            }
        }
    }
</script>
