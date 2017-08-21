<template>
    <div class="container">
        <el-bread-cumb :bread-cumb="breadCumb"></el-bread-cumb>
    </div>
</template>

<script>
    import ElBreadCumb from '../../components/BreadCumb.vue'

    export default {
        components: { ElBreadCumb},
        computed: {
            breadCumb: function () {
                return [
                    {'name': '父级', 'path': ''},//父级path
                    {'name': '自己', 'path': ''}
                ]
            }
        }
    }
</script>