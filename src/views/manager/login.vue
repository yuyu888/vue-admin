<template>
<div>
    <!--flex弹性盒子模型，justify-content：主抽 flex布局：弹性盒子布局http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html-->
    <div style="display: flex;justify-content: center;margin-top: 150px" v-loading="listLoading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: left; padding: 3px 0"><strong>用户登录</strong></span>
                <el-button style="float: right; padding: 3px 0" type="text">忘记密码？</el-button>
            </div>
            <el-form :model="LoginForm" ref="LoginForm" label-width="80px" :rules="rules" class="demo-ruleForm">
                <el-form-item label="手机号" prop="mobile">
                    <el-input style="margin-bottom: 10px;" v-model="LoginForm.mobile" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input style="margin-bottom: 10px;" v-model="LoginForm.password" type="password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('LoginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</div>
</template>

<script>
import md5 from 'js-md5';
export default {
    name: 'Login',

    data() {
        return {
            listLoading: false,
            LoginForm: {
                mobile: '',
                password: ''
            },
            rules: {
                mobile: [{
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 12,
                        message: '密码长度6-12位',
                        trigger: 'blur'
                    }
                ],
            }
        }
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //登录
        login: function () {
            var self = this
            self.listLoading = true

            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/user/login', {
                mobile: self.LoginForm.mobile,
                password: md5(self.LoginForm.password) 
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    location.href = "/"
                } else {
                    this.$message.error(res.message)

                    // self.LoginForm.mobile = ''
                    // self.LoginForm.password = ''
                }
            }).catch((e) => {
                // 有异常这里会输出
                console.log(e)
            })
            self.listLoading = false
        }
    }
}
</script>

<style>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>
