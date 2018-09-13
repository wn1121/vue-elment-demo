<template>
    <div class="container">
        <div class="warp50">
            <el-form :model="changePwdForm" :rules="rules" ref="changePwdForm" label-width="100px" size="small">
                <el-form-item label="旧密码" prop="password">
                    <el-input type="password" v-model="changePwdForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="changePwdForm.newPassword" auto-complete="off"></el-input>
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
    </div>
</template>

<script>
    import md5 from 'md5'
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
                }else if (!this.$valid.password1(value)) {
                    callback(new Error('请输入8-20位字母、数字、特殊字符两种或者以上'));
                }else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入确认密码'));
                }else if (value !== this.changePwdForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                changePwdForm: {
                    password: '',
                    newPassword: '',
                    checkPass: ''
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPassword: [
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
        created() {
            localStorage.setItem('sidebarStatus', 0);
            this.$store.getters.sidebar.opened = false;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let params;
                        params = {
                            id: this.$store.getters.userId,
                            userName: this.$store.getters.username,
                            password: md5(this.changePwdForm.password),
                            newPassword: md5(this.changePwdForm.newPassword)
                        };
                        this.$api.post(this.$apiUrl.passwordUpdate,params,(res)=>{
                            this.loading = false;
                            this.$message.success('修改成功,请重新登录');
                            localStorage.clear();
                            this.$store.commit('SET_UERID', '');
                            this.$router.push({ path: '/passport/login' })
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