<template>
    <div class="login-warp">
        <div class="container">
            <p class="f18 t-c pb30">欢迎使用ALY-IMC后台管理系统</p>
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="way">
                    <el-select class="w100p" v-model="loginForm.login_type">
                        <el-option label="账号登录" value="1"></el-option>
                        <el-option label="手机号登录" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!--账号登录-->
                <div v-if="loginForm.login_type == 1">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="imgCaptcha">
                        <el-input v-model="loginForm.imgCaptcha" auto-complete="off" placeholder="验证码">
                            <template slot="append">
                                <img :src="imgCaptchaUrl" height="28" alt="" @click="refreshImage()" class="cursor" id="imgCaptcha">
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <!--手机号登录-->
                <div v-if="loginForm.login_type == 2">
                    <el-form-item prop="mobile">
                        <el-input v-model="loginForm.mobile" auto-complete="off" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" required>
                        <el-input v-model="loginForm.captcha" auto-complete="off" placeholder="验证码">
                            <template slot="append">
                                <el-button type="text" :loading="loading1" :disabled="smsBtnDisabled" @click="smsSend()">{{smsBtn}}</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var checkMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号'));
                }
                if (!this.$valid.mobile(value)) {
                    callback(new Error('请输入正确格式的手机号'));
                }
                callback();
            };
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
                smsBtn: '发送验证码',//发送验证码按钮
                smsBtnDisabled: false,//默认可点击
                waitingTime: 60,//
                imgCaptchaUrl: this.$apiUrl.refreshImage,
                loading: false,
                loading1: false,
                loginForm: { //表单字段
                    login_type: '1',
                    username: '',
                    password: '',
                    mobile: '',
                    captcha: '',
                    imgCaptcha: ''
                },
                rules: {
                    mobile: [
                        { validator: checkMobile, trigger: 'blur'  }
                    ],
                    captcha: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' },
                    ],
                    imgCaptcha: [
                        { required: true, message: '请输入图形验证码', trigger: 'blur' },
                    ]
                }
            };
        },
        watch: {
            'loginForm.login_type': function () {
                this.$refs.loginForm.resetFields();
            }
        },
        methods: {
            //刷新验证码
            refreshImage () {
                //this.imgCaptchaUrl = this.$apiUrl.refreshImage + Math.random();
                document.getElementById('imgCaptcha').src = '/api/captcha/refreshImage';
            },
            //发送验证码
            smsSend () {
                this.$refs.loginForm.validateField('mobile',(errMsg) =>{
                    if(errMsg.length == 0){
                        this.loading1 = true;
                        this.smsBtnDisabled = true;
                        this.smsBtn = this.waitingTime + 's';
                        var inter = setInterval(() => {
                            this.waitingTime--;
                            this.smsBtn = this.waitingTime + 's';
                            if(this.waitingTime === 0) {
                                this.smsBtn = '重新获取';
                                this.smsBtnDisabled = false;
                                this.waitingTime = 60;
                                clearInterval(inter);
                            }
                        },1000);
                        let params = {
                            mobile: this.loginForm.mobile
                        };
                        this.$api.post(this.$apiUrl.sendSms,params,()=>{
                            this.loading1 = false;
                            this.$message.success('发送成功');
                        },()=>{
                            this.loading1 = false;
                            this.$message.error('发送失败，请稍后再试');
                        })
                    }
                });
            },
            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let params;
                        if(this.loginForm.login_type == 1){
                            //账号登录
                            params = {
                                login_type: this.loginForm.login_type,
                                username: this.loginForm.username,
                                password: this.loginForm.password,
                                image_captcha: this.loginForm.imgCaptcha
                            };
                        }else{
                            //手机号登录
                            params = {
                                login_type: this.loginForm.login_type,
                                mobile: this.loginForm.mobile,
                                mobile_num: this.loginForm.captcha
                            };
                        }
                        this.$api.post(this.$apiUrl.login,params,(res)=>{
                            this.loading = false;
                            //保存用户id
                            localStorage.setItem('token',res.data.token);
                            localStorage.setItem('userId',res.data.id);
                            localStorage.setItem('userName',res.data.username);
                            localStorage.setItem('avatar',res.data.avatar);
                            localStorage.setItem('routers',JSON.stringify(res.data.menu));

                            this.$store.commit('SET_TOKEN',res.data.token);
                            this.$store.commit('SET_UERID',res.data.id);
                            this.$store.commit('SET_USERNAME', res.data.username);
                            this.$store.commit('SET_AVATAR', res.data.avatar);
                            this.$store.commit('SET_ROUTERS',res.data.menu);

                            this.$message.success('登录成功');
                            //跳转dashboard
                            this.$router.push({ path: '/' })
                        },(res)=>{
                            this.loading = false;
                            //图形验证码刷新
                            this.refreshImage();
                            this.$message.error(res.msg);
                        })
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