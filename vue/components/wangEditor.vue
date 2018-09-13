<template>
    <div id="editorElem"></div>
</template>

<script>
    import WangEditor from 'wangeditor'
    export default {
        name: 'wangEditor',
        props: ['editor'],
        components: { WangEditor },
        data() {
            return {
                e: '',
                wangEditor: {
                    content: '',
                    images: []
                }
            };
        },
        watch: {
            'editor': function () {
                if(this.editor){
                    this.e.txt.html(this.editor.content);
                    this.wangEditor = {...this.editor};
                }
            }
        },
        mounted() {
            this.e = new WangEditor('#editorElem');
            this.e.customConfig.uploadImgServer = this.$apiUrl.fileUpload;
            this.e.customConfig.uploadFileName = 'file';
            this.e.customConfig.uploadImgParams = {};
            this.e.customConfig.uploadImgHooks = {
                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: (insertImg, result, editor) => {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = result.data;
                    insertImg(url);
                    this.wangEditor.images.push(url);
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }
            // 自定义菜单配置
            this.e.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'image',  // 插入图片
                'undo',  // 撤销
                'redo'  // 重复
            ]
            this.e.customConfig.onchange = (html) => {
                this.wangEditor.content = html;
                this.$emit('callback', this.wangEditor);
            }
            this.e.create();
            document.getElementsByClassName('w-e-text')[0].addEventListener("paste", function (e) {
                if (!(e.clipboardData && e.clipboardData.items)) {
                    return;
                }
                for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
                    var item = e.clipboardData.items[i];

                    if (item.kind === "string") {
                        item.getAsString(function (str) {
                            if (str.indexOf('<img') > 0) {
                                alert('注意！粘贴内容包含图片，网页复制图片APP内无法显示，请手动删除粘贴图片再上传！');
                                return;
                            }
                        })
                    }
                }
            })
        },
        methods: {

        }
    }
</script>