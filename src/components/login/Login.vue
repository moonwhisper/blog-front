<template>

    <div class="outer">
        <div class="login-container">
            <div class="user-name">
                <label class="label-username">用户名</label>
                <input type="text" class="username-content" v-model="userName" placeholder="邮箱账号或手机号码"/>
            </div>
            <div class="password">
                <label class="label-password">密码</label>
                <input type="password" class="password-content" v-model="password" placeholder="密码"/>
            </div>
            <div class="login-or-register">
                <mt-button class="login-btn" type="primary" size="small" @click="login">登录</mt-button>
                <router-link class="register" to="/register">新用户注册</router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "Login",
        data() {
            return {
                userName: '',
                password: '',
                userInfo: ''
            }
        },
        methods: {
            login() {
                this.userName = this.userName.trim();
                this.password = this.password.trim();

                if( this.userName === '' || this.password === '') {
                    Toast('用户名或密码不能为空')
                } else {
                    this.$http.get('blog/user/login/' + this.userName + '/' + this.password).then( result => {
                        if(result.status === 200) {
                            let data = result.body;

                            if(data.status === 0) {
                                this.userInfo = data.message;
                            } else {
                                Toast(data.message);
                            }
                        } else {
                            Toast('从后台获取用户信息失败');
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .outer{
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("../../assets/loginBgc.png");
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
    }

    .login-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .user-name{
            margin-bottom: 10px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .label-username{
                line-height: 30px;
                display: inline-block;
                width: 50px;
                text-align: center;
            }

            .username-content{
                margin-left: 10px;
                border: 1px solid darkgray;
                font-size: 14px;
                padding-left: 5px;
            }
        }

        .password{
            margin-bottom: 10px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .label-password{
                line-height: 30px;
                display: inline-block;
                width: 50px;
                text-align: center;
            }

            .password-content{
                margin-left: 10px;
                border: 1px solid darkgray;
                font-size: 14px;
                padding-left: 5px;
            }
        }

        .login-or-register{
            text-align: right;
            margin-top: 30px;

            .register{
                position: relative;
                margin-left: 20px;
                font-size: 13px;
            }
        }
    }
</style>