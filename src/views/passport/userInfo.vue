<template>
    <div class="warp50">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="用户名" prop="">
                <el-input type="text" v-model="userForm.username" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="">
                <el-checkbox v-for="group in userForm.authGroup" v-if="userForm.authGroup.length>0" :label="group.title" :key="group.title" :disabled="true" checked></el-checkbox>
                <span v-if="userForm.isAuth">暂无权限</span>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input type="text" v-model="userForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="userForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-upload
                        class="avatar-uploader"
                        :action="fileUploadAction"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" :loading="loading" @click="submitForm('userForm')">修改</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
        </el-form>
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
            var checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入邮箱'));
                }
                if (!this.$valid.email(value)) {
                    callback(new Error('请输入正确格式的邮箱'));
                }
                callback();
            };
            return {
                loading: false,
                userForm: {
                    id: '',
                    username: '',
                    mobile: '',
                    email: '',
                    avatar: '',
                },
                rules: {
                    mobile: [
                        { validator: checkMobile, trigger: 'blur'}
                    ],
                    email: [
                        { validator: checkEmail, trigger: 'blur'}
                    ]
                },
                fileUploadAction: this.$apiUrl.fileUpload,
            };
        },
        created (){
            //获取用户信息
            this.$store.dispatch('GetInfo').then((res) => {
                this.userForm = res.data;
                if(this.userForm.authGroup.length==0){
                    this.userForm.isAuth = false;
                }
            })
        },
        computed: {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let params = {
                            user_id: this.userForm.id,
                            username: this.userForm.username,
                            email: this.userForm.email,
                            mobile: this.userForm.mobile,
                            avatar: this.userForm.avatar,
                            owner: this.userForm.username
                        }
                        this.$api.post(this.$apiUrl.editUserInfo,params,(res)=>{
                            this.loading = false;
                            this.$message('编辑成功');
                            localStorage.setItem('userName',this.userForm.username);
                            localStorage.setItem('avatar',this.userForm.avatar);

                            this.$store.commit('SET_USERNAME',this.userForm.username);
                            this.$store.commit('SET_AVATAR',this.userForm.avatar);
                            this.$router.push({path:'/'})
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
            },
            handleAvatarSuccess(res, file) {
                this.userForm.avatar = file.response.data;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>