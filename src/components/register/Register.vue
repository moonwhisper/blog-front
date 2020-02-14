<template>
    <div class="register-container">
        <div class="username-item">
            <label class="username-label">用户名</label>
            <div class="username-area">
                <input type="text" class="username-content" v-model="username"/>
                <label class="username-tip" v-text="usernametip"></label>
            </div>
        </div>

        <div class="email-item">
            <label class="email-label">邮箱地址</label>
            <div class="email-area">
                <input type="text" class="email-content" v-model="email"/>
                <label class="email-tip" v-text="emailtip"></label>
            </div>
        </div>

        <div class="realname-item">
            <label class="realname-label">姓名</label>
            <div class="realname-area">
                <input type="text" class="realname-content" v-model="realname"/>
                <label class="realname-tip" v-text="realnametip"></label>
            </div>
        </div>

        <div class="telephone-item">
            <label class="telephone-label">手机号码</label>
            <div class="telephone-area">
                <input type="text" class="telephone-content" v-model="telephone"/>
                <label class="telephone-tip" v-text="telephonetip"></label>
            </div>
        </div>

        <div class="birthday-item">
            <label class="birthday-label">出生日期</label>
            <div class="birthday-area">
                <input type="text" class="birthday-content" v-model="birthday"/>
                <label class="birthday-tip" v-text="birthdaytip"></label>
            </div>
        </div>

        <div class="password-item">
            <label class="password-label">密码</label>
            <div class="password-area">
                <input type="text" class="password-content" v-model="password"/>
                <label class="password-tip" v-text="passwordtip"></label>
            </div>
        </div>

        <div class="confirm-password-item">
            <label class="confirm-password-label">确认密码</label>
            <div class="confirm-password-area">
                <input type="text" class="confirm-password-content" v-model="confirmpassword"/>
                <label class="confirm-password-tip" v-text="confirmpasswordtip"></label>
            </div>
        </div>

        <div class="captcha-item">
            <label class="captcha-label">验证码</label>
            <div class="captcha-area">
                <input type="text" class="captcha-content" v-model="captcha"/>
                <label class="captcha-tip" v-text="captchatip"></label>
            </div>
        </div>

        <div class="btn-item">
            <mt-button type="primary" size="small" @click="register">注册信息</mt-button>

            <mt-button type="danger" size="small" @click="clear">清空信息</mt-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                username: '',
                email: '',
                realname: '',
                telephone: '',
                birthday: '',
                password: '',
                confirmpassword: '',
                captcha: '',

                usernametip: '6~18个字符，可使用字母、数字、下划线，需以字母开头',
                emailtip: '请输入合法邮箱地址',
                realnametip: '请输入中文姓名',
                telephonetip: '请输入11位手机号',
                birthdaytip: '如： 1991-01-01',
                passwordtip: '6~16个字符，区分大小写',
                confirmpasswordtip: '请再次填写密码',
                captchatip: '请输入验证码: 0510'
            }
        },
        methods: {
            // 注册信息，并提交
            register () {
                this.inputCheck()


                // 提交注册请求给后台

            },

            // 对用户输入的信息进行基础合法性检查
            inputCheck() {

            },

            // 清空用户的输入信息
            clear() {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register-container {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translate(-50%, 0);

        .username-item {
            margin: 10px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .username-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .username-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .username-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .username-tip{
                    font-size: 12px;
                }
            }

        }


        .email-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .email-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .email-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .email-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .email-tip{
                    font-size: 12px;
                }
            }
        }


        .realname-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .realname-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .realname-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .realname-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .realname-tip{
                    font-size: 12px;
                }
            }
        }


        .telephone-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .telephone-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .telephone-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .telephone-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .telephone-tip{
                    font-size: 12px;
                }
            }
        }


        .birthday-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .birthday-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .birthday-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .birthday-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .birthday-tip{
                    font-size: 12px;
                }
            }
        }


        .password-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .password-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .password-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .password-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .password-tip{
                    font-size: 12px;
                }
            }
        }


        .confirm-password-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .confirm-password-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .confirm-password-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .confirm-password-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .confirm-password-tip{
                    font-size: 12px;
                }
            }
        }


        .captcha-item {
            margin: 30px 0px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .captcha-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .captcha-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .captcha-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .captcha-tip{
                    font-size: 12px;
                }
            }
        }

    }
</style>