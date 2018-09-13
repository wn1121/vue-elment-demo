<template>
    <div class="container">
        <!--form-->
        <ul v-for="(img,index) in list" @click="select(index)" :class="{big: index===selectIndex}">
            <img :src="img" class="img">
        </ul>

        <el-dialog
                title=""
                :visible.sync="imgShow"
                center>
            <BigImg :imgSrc="imgSrc" @clickit="hideimg" v-if="imgShow"></BigImg>
        </el-dialog>

        <div class="line"></div>
    </div>
</template>

<script>
    import BigImg from '~/components/BigImg.vue'
    export default {
        data() {
            return {
                imgShow:false,
                imgSrc:'',
                selectIndex:'',
                list:['https://aly-image.oss-cn-shanghai.aliyuncs.com/1512539414_822659_miantiao3.jpg','https://aly-image.oss-cn-shanghai.aliyuncs.com/1513153629_31529_tulips.jpg',
                    'https://aly-image.oss-cn-shanghai.aliyuncs.com/1512539414_165115_miantiao6.jpg']
            }
        },
        created(){

        },
        computed: {

        },
        methods: {
            select (index) {
                //this.selectIndex = this.selectIndex === index ? undefined : index
                this.imgShow = true;
                this.imgSrc = this.list[index]
            },
            hideimg:function () {
                this.imgShow = false
            }
        },
        components:{BigImg}
    }
</script>
<style lang="scss" scoped>
    .img{
        transition: all .5s linear;
        transform: scale(1);
        width: 200px;
        height: 200px;
    }
    .big{
        transform: scale(1.5);
        z-index: 1000;
    }
</style>