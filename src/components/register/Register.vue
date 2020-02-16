<template>
    <div class="register-container">
        <div class="username-item">
            <label class="username-label">用户名</label>
            <div class="username-area">
                <input type="text" class="username-content" v-model="username" ref="username_input"  @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                <label class="username-tip" v-text="usernametip" ref="username_tip_label"></label>
            </div>
        </div>

        <div class="email-item">
            <label class="email-label">邮箱地址</label>
            <div class="email-area">
                <input type="text" class="email-content" v-model="email" ref="email_input" @blur="inputCheck($event)"/>
                <label class="email-tip" v-text="emailtip" ref="email_tip_label"></label>
            </div>
        </div>

        <div class="realname-item">
            <label class="realname-label">姓名</label>
            <div class="realname-area">
                <input type="text" class="realname-content" v-model="realname" ref="realname_input" @blur="inputCheck($event)"/>
                <label class="realname-tip" v-text="realnametip" ref="realname_tip_label"></label>
            </div>
        </div>

        <div class="telephone-item">
            <label class="telephone-label">手机号码</label>
            <div class="telephone-area">
                <input type="text" class="telephone-content" v-model="telephone" ref="telephone_input" @blur="inputCheck($event)"/>
                <label class="telephone-tip" v-text="telephonetip" ref="telephone_tip_label"></label>
            </div>
        </div>

        <div class="birthday-item">
            <label class="birthday-label">出生日期</label>
            <div class="birthday-area">
                <input type="text" class="birthday-content" v-model="birthday" ref="birthday_input" @blur="inputCheck($event)"/>
                <label class="birthday-tip" v-text="birthdaytip" ref="birthday_tip_label"></label>
            </div>
        </div>

        <div class="password-item">
            <label class="password-label">密码</label>
            <div class="password-area">
                <input type="text" class="password-content" v-model="password" ref="password_input" @blur="inputCheck($event)"/>
                <label class="password-tip" v-text="passwordtip" ref="password_tip_label"></label>
            </div>
        </div>

        <div class="confirm-password-item">
            <label class="confirm-password-label">确认密码</label>
            <div class="confirm-password-area">
                <input type="text" class="confirm-password-content" v-model="confirmpassword" ref="confirm_password_input" @blur="inputCheck($event)"/>
                <label class="confirm-password-tip" v-text="confirmpasswordtip" ref="confirm_password_tip_label"></label>
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
                captchatip: '请输入验证码: 0510',

                initusernametip: '6~18个字符，可使用字母、数字、下划线，需以字母开头',
                initemailtip: '请输入合法邮箱地址',
                initrealnametip: '请输入中文姓名',
                inittelephonetip: '请输入11位手机号',
                initbirthdaytip: '如： 1991-01-01',
                initpasswordtip: '6~16个字符，区分大小写',
                initconfirmpasswordtip: '请再次填写密码',
                initcaptchatip: '请输入验证码: 0510',

                usernamecheckflag: false,
                emailcheckflag: false,
                realnamecheckflag: false,
                telephonecheckflag: false,
                birthdaycheckflag: false,
                passwordcheckflag: false,
                confirmpasswordcheckflag: false,
                captchacheckflag: false
            }
        },
        methods: {
            // 注册信息，并提交
            register () {
                // this.inputCheck()

                // 提交注册请求给后台
                var user = {
                    username: this.username,
                    password: this.password,
                    realname: this.realname,
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
                if(event.currentTarget == this.$refs.username_input) {
                    this.username = this.username.trim()

                    if(this.username.length < 6 || this.username.length > 18) {
                        this.usernametip = "用户名长度错误"
                        this.$refs.username_tip_label.style.color = "red"
                        return
                    } else {
                        var reg1 = /[A-Za-z]/
                        var reg2 = /^[0-9a-zA-Z_]{1,}$/

                        if(!reg1.test(this.username.substr(0, 1))) {
                            this.usernametip = "第一个字符必须是字母"
                            this.$refs.username_tip_label.style.color = "red"
                            return
                        }

                        if(!reg2.test(this.username)) {
                            this.usernametip = "用户名只能是字母、数字或下划线的组合"
                            this.$refs.username_tip_label.style.color = "red"
                            return
                        }
                    }

                    this.usernamecheckflag = true
                    return
                }

            },

            // 输入框获取焦点时，重新初始化输入提示
            initInputTip(event) {
              //如果对应的是用户名的输入框
              if(event.currentTarget == this.$refs.username_input) {
                  this.usernametip = this.initusernametip
                  this.$refs.username_tip_label.style.color = "gray"
                  this.usernamecheckflag = false
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
                    color: gray;
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
                    color: gray;
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
                    color: gray;
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
                    color: gray;
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
                    color: gray;
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
                    color: gray;
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
                    color: gray;
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
                    color: gray;
                }
            }
        }

    }
</style>