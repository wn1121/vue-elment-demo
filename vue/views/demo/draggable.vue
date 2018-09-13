<template>
    <div class="container">
        <p class="pb10">Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。 访问地址：<a class="primary" href="https://github.com/SortableJS/Vue.Draggable">Vue.Draggable</a></p>
        <el-table
                :data="list"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="id">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    //import draggable from 'vuedraggable' 非dom拖拽操作
    import Sortable from 'sortablejs'  //基于dom进行操作
    export default {
        data() {
            return {
                list:[
                    {name:'我是111',id:1,date:'2017-11-9'},
                    {name:'我是222',id:2,date:'2017-11-9'},
                    {name:'我是333',id:3,date:'2017-11-9'},
                    {name:'我是444',id:4,date:'2017-11-9'},
                    {name:'我是555',id:5,date:'2017-11-9'}
                ]
            };
        },
        methods:{

        },
        mounted(){
            let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            //let sortable = Sortable.create(el)
            let sortable = Sortable.create(el, {
                onEnd: evt => { //监听end事件 手动维护列表
                    var itemEl = evt.item;  // dragged HTMLElement
                    console.log("index====>"+evt.oldIndex+"-----"+evt.newIndex)
                }
            });
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper-cropper{
        width: 100%;
        height: 500px;
    }
    .wrapper-btn{
        padding-top: 10px;
    }
    .bg{
        width: 100%;
        height: 20px;
        background-color: #00a394;
        margin-bottom: 10px;
        text-align: center;
    }
</style>