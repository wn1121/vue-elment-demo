<template>
    <div class="login-warp">
        <div class="container">
            <h2>BMS</h2>
            <!--<img src="../../images/logo1.png" width="35" alt="">-->
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import md5 from 'md5'
    export default {
        data() {
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入密码'));
                }
                if (!this.$valid.password(value)) {
                    callback(new Error('请输入6-20位字母或者数字密码'));
                }
                callback();
            };
            return {
                loading: false,
                loginForm: { //表单字段
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' },
                    ]
                }
            };
        },
        created: function(){
            document.onkeydown = (event) => {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 13) {
                    this.submitForm('loginForm');
                }
            }
        },
        methods: {
            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
//                        this.loading = true;
                        this.$message({type: 'success', message: '登录成功', duration: 1500});
                        localStorage.setItem('userId',123);
                        this.$store.commit('SET_UERID',123);
                        //跳转dashboard、
                        this.$router.push({ path: '/' })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-input-group__append{
        img{
            vertical-align: middle;
        }
    }
</style>