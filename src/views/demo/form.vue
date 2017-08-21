<template>
    <div class="container">
        <el-row class="mb20">
            <blockquote class="elem-quote">
                <p>这里列出常见表单项，如有不满足的，请查询Element Ui文档<a target="_blank" class="pl10 blue" href="http://element.eleme.io/#/zh-CN/component">http://element.eleme.io/#/zh-CN/component</a></p>
            </blockquote>
        </el-row>

        <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
            <el-form-item label="text" prop="text">
                <el-input type="text" v-model="form.text" auto-complete="off" placeholder="我是文本框"></el-input>
            </el-form-item>
            <el-form-item label="select" prop="select">
                <el-select v-model="form.select" placeholder="我是下拉框" style="display: block">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="remoteSelect" prop="remoteSelect">
                <el-select
                        v-model="form.remoteSelect"
                        multiple
                        filterable
                        remote
                        placeholder="请输入远程搜索关键字"
                        :remote-method="remoteMethod">
                    <el-option
                            v-for="item in remoteList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="radio" prop="radio">
                <el-radio-group v-model="form.radio">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="switch">
                <el-switch on-text="" off-text="" v-model="form.switch"></el-switch>
            </el-form-item>
            <el-form-item label="checkbox" prop="checkbox">
                <el-checkbox-group v-model="form.checkbox">
                    <el-checkbox v-for="group in checkboxGroup" :label="group.id" :key="group.id" :disabled="group.disabled">{{group.title}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="date" prop="date">
                <el-date-picker
                        v-model="form.date"
                        type="datetime"
                        placeholder="我是日期选择" style="width: 100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="picture" prop="picture">
                <el-upload
                        :action="fileUploadAction"
                        list-type="picture-card"
                        :file-list="form.picture"
                        :on-remove="handlePictureRemove"
                        :on-success="handlePictureSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="tree" prop="tree">
                <el-tree
                        :data="form.tree"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]">
                </el-tree>
            </el-form-item>
            <el-form-item label="editor" prop="editor">
                <editor v-on:callback="receiveContent"></editor>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" :loading="loading" @click="submitForm('form')">新增</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Editor from '../../components/Editor.vue';
    export default {
        components: { Editor },
        data() {
            return {
                formLabelWidth: '100px',
                loading: false, //loading
                //表单字段，最好与传入接口的字段保持一致
                form: {
                    text: '',
                    select: '',
                    radio: '1',
                    switch: true,
                    checkbox: [1],
                    editorContent: '',
                    date: '',
                    picture: [],
                    tree: [{
                        id: 1,
                        label: '一级 2',
                        children: [{
                            id: 3,
                            label: '二级 2-1',
                            children: [{
                                id: 4,
                                label: '三级 3-1-1'
                            }, {
                                id: 5,
                                label: '三级 3-1-2',
                                disabled: true
                            }]
                        }, {
                            id: 2,
                            label: '二级 2-2',
                            disabled: true,
                            children: [{
                                id: 6,
                                label: '三级 3-2-1'
                            }, {
                                id: 7,
                                label: '三级 3-2-2',
                                disabled: true
                            }]
                        }]
                    }],
                    remoteSelect: []
                },
                //校验规则，可自定义
                rules: {
                    text: [
                        { required: true, message: '请输入文本框内容', trigger: 'blur' },
                    ],
                },

                checkboxGroup: [{id:1,title:'A'},{id:2,title:'B',disabled:true},{id:3,title:'C'}],
                fileUploadAction: this.$apiUrl.fileUpload,
                remoteList: [],
                defaultProps: {//设置tree
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.form.owner = this.$store.getters.username;

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //富文本编辑器接收
            receiveContent: function (text) {
                this.form.editorContent = text;
            },
            //upload
            beforeAvatarUpload(file) {
                //const isJPG = file.type === 'image/jpeg';
                const isLt = Math.round(file.size/1024*100)/100 < 200;

                if (!isLt) {
                    this.$message.error('图片大小不能超过 200k!');
                }
                return isLt;
            },
            handlePictureRemove(file, fileList) {
                this.form.picture = [];
                for(let f of fileList){
                    var url = f.url;
                    this.form.picture.push({url});
                }
            },
            handlePictureSuccess(file) {
                var url = file.data;
                this.form.picture.push({url});
            },
            //远程搜搜
            remoteMethod(query) {
                if (query !== '') {
                    var params = {
                        keyword: query
                    }
                    setTimeout(() => {
                        //调取远程接口获取数据
//                        this.$apiOuter.post(this.$apiUrl.schoolList,params,(res)=>{
//                            this.remoteList = res.data || [];
//                        })
                    }, 200);
                } else {
                    this.remoteList = [];
                }
            }
        }
    }
</script>