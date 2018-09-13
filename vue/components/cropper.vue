<template>
    <div class="container">
        <div class="wrapper-cropper">
            <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.width"
                    :autoCropHeight="option.height"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
            ></vueCropper>
        </div>
        <div class="wrapper-btn">
            <label class="primary mr10" for="uploads">upload</label>
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                   accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg">
            <el-button type="primary" @click="saveImg()">保存</el-button>
        </div>
    </div>
</template>

<script>
    import vueCropper from 'vue-cropper'
    export default {
        components: { vueCropper },
        props: ['img','fixedNumber'],
        data() {
            return {
                option: {
                    img: '',
                    size: 1,
                    outputType: 'jpeg',
                    canScale: true,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
//                    width: 200,
//                    height: 200,
                    // 开启宽度和高度比例
                    fixed: true,
                    fixedNumber: [1, 1]
                },
            };
        },
        created() {
            this.option.img = this.img || '';
            this.option.fixedNumber = this.fixedNumber || [1,1];
        },
        methods: {
            uploadImg (e, num) {
                //上传图片
                // this.option.img
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                var reader = new FileReader()
                reader.onload = (e) => {
                    let data;
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    this.option.img = data
                }
                // 转化为base64
                reader.readAsDataURL(file)
                // 转化为blob
                //reader.readAsArrayBuffer(file)
            },
            saveImg() {
                this.$refs.cropper.getCropData((data) => {
                    //保存到服务器
                    let params = {
                        src: data
                    }
                    this.$api.post(this.$apiUrl.uploadBase64,params,(res)=>{
                        //传到父组件
                        this.$emit('callback',res.data.path);
                    },(res)=>{
                        this.$message.warning(res.msg);
                    })
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper-cropper{
        width: 100%;
        height: 300px;
    }
    .wrapper-btn{
        text-align: right;
        padding-top: 10px;
    }
</style>