<template>
    <div class="warp50">
        <el-form :model="changePwdForm" :rules="rules" ref="changePwdForm" label-width="100px">
            <el-form-item label="旧密码" prop="pass">
                <el-input type="password" v-model="changePwdForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
                <el-input type="password" v-model="changePwdForm.newPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="changePwdForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="submitForm('changePwdForm')">修改</el-button>
                <el-button @click="resetForm('changePwdForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入密码'));
                }
                callback();
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入新密码'));
                }else if (!this.$valid.password(value)) {
                    callback(new Error('请输入6-20位字母或者数字密码'));
                }else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入确认密码'));
                }else if (value !== this.changePwdForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                changePwdForm: {
                    pass: '',
                    newPass: '',
                    checkPass: ''
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass3, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let params;
                        params = {
                            password: this.changePwdForm.pass,
                            new_password: this.changePwdForm.newPass,
                            re_password: this.changePwdForm.checkPass,
                            owner: this.$store.getters.username
                        };
                        this.$api.post(this.$apiUrl.changePassword,params,(res)=>{
                            this.loading = false;
                            this.$message('修改成功,请重新登录');
                            this.$store.dispatch('LogOut');
                        },(res)=>{
                            this.loading = false;
                            this.$message(res.msg);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>