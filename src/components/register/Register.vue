<template>
    <div class="register-container">
        <div class="user-name-item">
            <label class="user-name-label">用户名</label>
            <div class="user-name-area">
                <label>
                    <input type="text" class="user-name-content" v-model="userName" ref="user_name_input"  @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="user-name-tip" ref="user_name_tip_label">{{ userNameTip }}</label>
            </div>
        </div>

        <div class="email-item">
            <label class="email-label">邮箱地址</label>
            <div class="email-area">
                <label>
                    <input type="text" class="email-content" v-model="email" ref="email_input" @blur="inputCheck($event)"/>
                </label>
                <label class="email-tip" ref="email_tip_label">{{ emailTip }}</label>
            </div>
        </div>

        <div class="real-name-item">
            <label class="real-name-label">姓名</label>
            <div class="real-name-area">
                <label>
                    <input type="text" class="real-name-content" v-model="realName" ref="real_name_input" @blur="inputCheck($event)"/>
                </label>
                <label class="real-name-tip" ref="real_name_tip_label">{{ realNameTip }}</label>
            </div>
        </div>

        <div class="telephone-item">
            <label class="telephone-label">手机号码</label>
            <div class="telephone-area">
                <label>
                    <input type="text" class="telephone-content" v-model="telephone" ref="telephone_input" @blur="inputCheck($event)"/>
                </label>
                <label class="telephone-tip" ref="telephone_tip_label">{{ telephoneTip }}</label>
            </div>
        </div>

        <div class="birthday-item">
            <label class="birthday-label">出生日期</label>
            <div class="birthday-area">
                <label>
                    <input type="text" class="birthday-content" v-model="birthday" ref="birthday_input" @blur="inputCheck($event)"/>
                </label>
                <label class="birthday-tip" ref="birthday_tip_label">{{ birthdayTip }}</label>
            </div>
        </div>

        <div class="password-item">
            <label class="password-label">密码</label>
            <div class="password-area">
                <label>
                    <input type="text" class="password-content" v-model="password" ref="password_input" @blur="inputCheck($event)"/>
                </label>
                <label class="password-tip" ref="password_tip_label">{{ passwordTip }}</label>
            </div>
        </div>

        <div class="confirm-password-item">
            <label class="confirm-password-label">确认密码</label>
            <div class="confirm-password-area">
                <label>
                    <input type="text" class="confirm-password-content" v-model="confirmPassword" ref="confirm_password_input" @blur="inputCheck($event)"/>
                </label>
                <label class="confirm-password-tip" ref="confirm_password_tip_label">{{ confirmPasswordTip }}</label>
            </div>
        </div>

        <div class="captcha-item">
            <label class="captcha-label">验证码</label>
            <div class="captcha-area">
                <label>
                    <input type="text" class="captcha-content" v-model="captcha" ref="captcha_input"/>
                </label>
                <label class="captcha-tip" ref="captcha_tip_label">{{ captchaTip }}</label>
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
                userName: '',
                email: '',
                realName: '',
                telephone: '',
                birthday: '',
                password: '',
                confirmPassword: '',
                captcha: '',

                userNameTip: '6~18个字符，可使用字母、数字、下划线，需以字母开头',
                emailTip: '请输入合法邮箱地址',
                realNameTip: '请输入中文姓名',
                telephoneTip: '请输入11位手机号',
                birthdayTip: '如： 1991-01-01',
                passwordTip: '6~16个字符，区分大小写',
                confirmPasswordTip: '请再次填写密码',
                captchaTip: '请输入验证码: 0510',

                initUserNameTip: '6~18个字符，可使用字母、数字、下划线，需以字母开头',
                initEmailTip: '请输入合法邮箱地址',
                initRealNameTip: '请输入中文姓名',
                initTelephoneTip: '请输入11位手机号',
                initBirthdayTip: '如： 1991-01-01',
                initPasswordTip: '6~16个字符，区分大小写',
                initConfirmPasswordTip: '请再次填写密码',
                initCaptchaTip: '请输入验证码: 0510',

                userNameCheckFlag: false,
                emailCheckFlag: false,
                realNameCheckFlag: false,
                telephoneCheckFlag: false,
                birthdayCheckFlag: false,
                passwordCheckFlag: false,
                confirmPasswordCheckFlag: false,
                captchaCheckFlag: false
            }
        },
        methods: {
            // 注册信息，并提交
            register () {
                // this.inputCheck()

                // 提交注册请求给后台
                var user = {
                    userName: this.userName,
                    password: this.password,
                    realName: this.realName,
                    email: this.email,
                    telephone: this.telephone,
                    birthday: this.birthday
                }

                this.$http.post('blog/user/register', user).then( result => {
                    console.log(result)
                })

            },

            // 对用户输入的信息进行基础合法性检查
            inputCheck(event) {

                // todo 规范化变量命名
                //如果对应的是用户名的输入框
                if(event.currentTarget === this.$refs.user_name_input) {
                    this.userName = this.userName.trim();

                    if(this.userName.length < 6 || this.userName.length > 18) {
                        this.userNameTip = "用户名长度错误";
                        this.$refs.user_name_tip_label.style.color = "red";
                        return
                    } else {
                        var reg1 = /[A-Za-z]/;
                        var reg2 = /^[0-9a-zA-Z_]{1,}$/;

                        if(!reg1.test(this.userName.substr(0, 1))) {
                            this.userNameTip = "第一个字符必须是字母";
                            this.$refs.user_name_tip_label.style.color = "red";
                            return
                        }

                        if(!reg2.test(this.userName)) {
                            this.userNameTip = "用户名只能是字母、数字或下划线的组合";
                            this.$refs.user_name_tip_label.style.color = "red";
                            return
                        }
                    }

                    this.userNameCheckFlag = true;
                    return
                }

            },

            // 输入框获取焦点时，重新初始化输入提示
            initInputTip(event) {
              //如果对应的是用户名的输入框
              if(event.currentTarget === this.$refs.user_name_input) {
                  this.userNameTip = this.initUserNameTip;
                  this.$refs.user_name_tip_label.style.color = "gray";
                  this.userNameCheckFlag = false;
                  return
              }

              // todo
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

        .user-name-item {
            margin-bottom: 30px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .user-name-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .user-name-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .user-name-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .user-name-tip{
                    font-size: 12px;
                    color: gray;
                }

            }
        }


        .email-item {
            margin-bottom: 30px;
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
                    color: gray;
                }
            }
        }


        .real-name-item {
            margin-bottom: 30px;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .real-name-label{
                line-height: 30px;
                display: inline-block;
                width: 100px;
                text-align: right;
                font-size: 14px;

                margin-right: 10px;
            }

            .real-name-area{
                display: flex;
                flex-direction: column;
                text-align: left;

                .real-name-content{
                    width: 350px;
                    line-height: 25px;
                    font-size: 14px;
                }

                .real-name-tip{
                    font-size: 12px;
                    color: gray;
                }
            }
        }


        .telephone-item {
            margin-bottom: 30px;
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
                    color: gray;
                }
            }
        }


        .birthday-item {
            margin-bottom: 30px;
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
                    color: gray;
                }
            }
        }


        .password-item {
            margin-bottom: 30px;
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
                    color: gray;
                }
            }
        }


        .confirm-password-item {
            margin-bottom: 30px;
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
                    color: gray;
                }
            }
        }


        .captcha-item {
            margin-bottom: 30px;
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
                    color: gray;
                }
            }
        }

    }
</style>