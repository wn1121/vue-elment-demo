<template>
    <vue-editor v-model="content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    export default {
        name: 'editor',
        components: { VueEditor },
        data() {
            return {
                content: ''
            };
        },
        watch: {
            'content': function () {
                this.$emit('callback', this.content);
            }
        },
        methods: {
            handleImageAdded(file, Editor, cursorLocation) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                formData.append('file', file)
                xhr.onreadystatechange = (e)=>{
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            let url = JSON.parse(xhr.responseText).data; // Get url from response
                            Editor.insertEmbed(cursorLocation, 'image', url);
                        }
                    }
                }

                xhr.open('POST', this.$apiUrl.fileUpload, true);
                xhr.send(formData);
            }
        }
    }
</script>