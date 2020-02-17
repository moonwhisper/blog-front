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
                    <input type="text" class="email-content" v-model="email" ref="email_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="email-tip" ref="email_tip_label">{{ emailTip }}</label>
            </div>
        </div>

        <div class="real-name-item">
            <label class="real-name-label">姓名</label>
            <div class="real-name-area">
                <label>
                    <input type="text" class="real-name-content" v-model="realName" ref="real_name_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="real-name-tip" ref="real_name_tip_label">{{ realNameTip }}</label>
            </div>
        </div>

        <div class="telephone-item">
            <label class="telephone-label">手机号码</label>
            <div class="telephone-area">
                <label>
                    <input type="text" class="telephone-content" v-model="telephone" ref="telephone_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="telephone-tip" ref="telephone_tip_label">{{ telephoneTip }}</label>
            </div>
        </div>

        <div class="birthday-item">
            <label class="birthday-label">出生日期</label>
            <div class="birthday-area">
                <label>
                    <input type="text" class="birthday-content" v-model="birthday" ref="birthday_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="birthday-tip" ref="birthday_tip_label">{{ birthdayTip }}</label>
            </div>
        </div>

        <div class="password-item">
            <label class="password-label">密码</label>
            <div class="password-area">
                <label>
                    <input type="password" class="password-content" v-model="password" ref="password_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="password-tip" ref="password_tip_label">{{ passwordTip }}</label>
            </div>
        </div>

        <div class="confirm-password-item">
            <label class="confirm-password-label">确认密码</label>
            <div class="confirm-password-area">
                <label>
                    <input type="password" class="confirm-password-content" v-model="confirmPassword" ref="confirm_password_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
                </label>
                <label class="confirm-password-tip" ref="confirm_password_tip_label">{{ confirmPasswordTip }}</label>
            </div>
        </div>

        <div class="captcha-item">
            <label class="captcha-label">验证码</label>
            <div class="captcha-area">
                <label>
                    <input type="text" class="captcha-content" v-model="captcha" ref="captcha_input" @blur="inputCheck($event)" @focus="initInputTip($event)"/>
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
    import {Toast} from 'mint-ui'
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

                userNameTip: '',
                emailTip: '',
                realNameTip: '',
                telephoneTip: '',
                birthdayTip: '',
                passwordTip: '',
                confirmPasswordTip: '',
                captchaTip: '',

                initUserNameTip: '6~18个字符，可使用字母、数字、下划线，需以字母开头',
                initEmailTip: '请输入合法邮箱地址',
                initRealNameTip: '请输入中文姓名',
                initTelephoneTip: '请输入11位手机号',
                initBirthdayTip: '如： 1991-01-01',
                initPasswordTip: '6~18个字符，可使用字母、数字、下划线，需以字母开头',
                initConfirmPasswordTip: '请再次填写密码',
                initCaptchaTip: '请输入验证码: ',

                userNameCheckFlag: false,
                emailCheckFlag: false,
                realNameCheckFlag: false,
                telephoneCheckFlag: false,
                birthdayCheckFlag: false,
                passwordCheckFlag: false,
                confirmPasswordCheckFlag: false,
                captchaCheckFlag: false,

                initCaptcha: ''
            }
        },
        methods: {
            // 注册信息，并提交
            register () {
                if( !(this.userNameCheckFlag && this.emailCheckFlag && this.realNameCheckFlag
                    && this.telephoneCheckFlag && this.birthdayCheckFlag && this.passwordCheckFlag
                        && this.confirmPasswordCheckFlag && this.captchaCheckFlag) ) {
                    Toast({
                            message: '请检查输入的信息',
                            duration: 2000
                            });

                    return;
                }

                // 提交注册请求给后台
                let user = {
                    userName: this.userName,
                    password: this.password,
                    realName: this.realName,
                    email: this.email,
                    telephone: this.telephone,
                    birthday: this.birthday
                };

                this.$http.post('blog/user/register', user).then( result => {
                    console.log(result)

                    if(result.status === 200) {
                        let data = result.body;
                        if(data.status === 0) {
                            Toast({
                                message: '注册用户成功',
                                duration: 2000
                            });

                            let that = this;
                            setTimeout(function () {
                                that.jumpToLoginPage()
                            }, 3000);
                        } else {
                            Toast({
                                message: data.message,
                                duration: 3000
                            });
                        }

                    } else {
                        Toast({
                            message: '注册用户失败',
                            duration: 2000
                        });
                    }

                })

            },

            // 对用户输入的信息进行基础合法性检查
            inputCheck(event) {
                //如果对应的是用户名的输入框
                if(event.currentTarget === this.$refs.user_name_input) {
                    this.userName = this.userName.trim();
                    if(this.userName === "") {
                        return;
                    }

                    if(this.userName.length < 6 || this.userName.length > 18) {
                        this.userNameTip = "用户名长度错误";
                        this.$refs.user_name_tip_label.style.color = "red";
                        return;
                    } else {
                        var reg1 = /[A-Za-z]/;
                        var reg2 = /^[0-9a-zA-Z_]{1,}$/;

                        if(!reg1.test(this.userName.substr(0, 1))) {
                            this.userNameTip = "第一个字符必须是字母";
                            this.$refs.user_name_tip_label.style.color = "red";
                            return;
                        }

                        if(!reg2.test(this.userName)) {
                            this.userNameTip = "用户名只能是字母、数字或下划线的组合";
                            this.$refs.user_name_tip_label.style.color = "red";
                            return;
                        }
                    }

                    this.userNameCheckFlag = true;
                    return;
                }

                //如果对应的是邮箱的输入框
                if(event.currentTarget === this.$refs.email_input) {
                    this.email = this.email.trim();
                    if(this.email === "") {
                        return;
                    }

                    let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

                    if(!emailReg.test(this.email)) {
                        this.emailTip = "邮箱地址不合法";
                        this.$refs.email_tip_label.style.color = "red";
                        return;
                    }

                    this.emailCheckFlag = true;
                    return;
                }

                //如果对应的是姓名的输入框
                if(event.currentTarget === this.$refs.real_name_input) {

                    this.realName = this.realName.trim();
                    if(this.realName === ""){
                        return;
                    }

                    let realNameReg = /^[\u4e00-\u9fa5]{0,}$/;

                    if(!realNameReg.test(this.realName)) {
                        this.realNameTip = "请输入合法的中文姓名";
                        this.$refs.real_name_tip_label.style.color = "red";
                        return;
                    }

                    this.realNameCheckFlag = true;
                    return;

                }

                //如果对应的是手机号码输入框
                if(event.currentTarget === this.$refs.telephone_input) {
                    this.telephone = this.telephone.trim()
                    if(this.telephone === "") {
                        return;
                    }

                    let telephoneReg = /^1\d{10}$/;
                    if(!telephoneReg.test(this.telephone)) {
                        this.telephoneTip = "请输入合法的手机号";
                        this.$refs.telephone_tip_label.style.color = "red";
                        return;
                    }

                    this.telephoneCheckFlag = true;
                    return;
                }

                //如果对应的是出生日期输入框
                if(event.currentTarget === this.$refs.birthday_input) {
                    this.birthday = this.birthday.trim();
                    if(this.birthday === "") {
                        return;
                    }

                    let birthdayReg = /^((19)\d{2}|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
                    if(!birthdayReg.test(this.birthday)) {
                        this.birthdayTip = "请输入合法的出生日期";
                        this.$refs.birthday_tip_label.style.color = "red";
                        return;
                    }

                    this.birthdayCheckFlag = true;
                    return;
                }

                //如果对应的是密码输入框
                if(event.currentTarget === this.$refs.password_input) {
                    this.password = this.password.trim();
                    if(this.password === "") {
                        return;
                    }

                    if(this.password.length < 6 || this.password.length > 16) {
                        this.passwordTip = "密码长度不合法";
                        this.$refs.password_tip_label.style.color = "red";
                        return;
                    } else {
                        var reg3 = /[A-Za-z]/;
                        var reg4 = /^[0-9a-zA-Z_]{1,}$/;

                        if(!reg3.test(this.password.substr(0, 1))) {
                            this.passwordTip = "第一个字符必须是字母";
                            this.$refs.password_tip_label.style.color = "red";
                            return;
                        }

                        if(!reg4.test(this.password)) {
                            this.passwordTip = "密码只能是字母、数字或下划线的组合";
                            this.$refs.password_tip_label.style.color = "red";
                            return;
                        }
                    }

                    this.passwordCheckFlag = true;
                    return;


                }

                //如果对应的是确认密码输入框
                if(event.currentTarget === this.$refs.confirm_password_input) {
                    this.confirmPassword = this.confirmPassword.trim();
                    if(this.confirmPassword === "") {
                        return;
                    }

                    if(this.passwordCheckFlag === false) {
                        this.confirmPasswordTip = "请先输入合法的密码"
                        this.$refs.confirm_password_tip_label.style.color = "red";
                        return;
                    } else {
                        if(this.confirmPassword !== this.password) {
                            this.confirmPasswordTip = "两次输入的密码不一致，请重新输入"
                            this.$refs.confirm_password_tip_label.style.color = "red";
                            return;
                        }
                    }

                    this.confirmPasswordCheckFlag = true;
                    return;
                }

                //如果对应的是验证码输入框
                if(event.currentTarget === this.$refs.captcha_input) {
                    this.captcha = this.captcha.trim();
                    if(this.captcha === "") {
                        return;
                    }

                    if(this.captcha !== this.initCaptcha) {
                        this.$refs.captcha_tip_label.style.color = "red";
                        return;
                    }

                    this.captchaCheckFlag = true;
                }

            },

            // 输入框获取焦点时，重新初始化输入提示
            initInputTip(event) {
              //如果对应的是用户名的输入框
              if(event.currentTarget === this.$refs.user_name_input) {
                  this.userNameTip = this.initUserNameTip;
                  this.$refs.user_name_tip_label.style.color = "gray";
                  this.userNameCheckFlag = false;
                  return;
              }

              //如果对应的是邮箱的输入框
              if(event.currentTarget === this.$refs.email_input) {
                  this.emailTip = this.initEmailTip;
                  this.$refs.email_tip_label.style.color = "gray";
                  this.emailCheckFlag = false;
                  return;
              }

              //如果对应的是姓名的输入框
              if(event.currentTarget === this.$refs.real_name_input) {
                  this.realNameTip = this.initRealNameTip;
                  this.$refs.real_name_tip_label.style.color = "gray";
                  this.realNameCheckFlag = false;
                  return;
              }

              //如果对应的是手机号码输入框
              if(event.currentTarget === this.$refs.telephone_input) {
                  this.telephoneTip = this.initTelephoneTip;
                  this.$refs.telephone_tip_label.style.color = "gray";
                  this.telephoneCheckFlag = false;
                  return;
              }

              //如果对应的是出生日期输入框
              if(event.currentTarget === this.$refs.birthday_input) {
                  this.birthdayTip = this.initBirthdayTip;
                  this.$refs.birthday_tip_label.style.color = "gray";
                  this.birthdayCheckFlag = false;
                  return;
              }

              //如果对应的是密码输入框
              if(event.currentTarget === this.$refs.password_input) {
                  this.passwordTip = this.initPasswordTip;
                  this.$refs.password_tip_label.style.color = "gray";
                  this.passwordCheckFlag = false;
                  return;
              }

              //如果对应的是确认密码输入框
              if(event.currentTarget === this.$refs.confirm_password_input) {
                  this.confirmPasswordTip = this.initConfirmPasswordTip;
                  this.$refs.confirm_password_tip_label.style.color = "gray";
                  this.confirmPasswordCheckFlag = false;
                  return;
              }

              //如果对应的是验证码输入框
              if(event.currentTarget === this.$refs.captcha_input) {
                  this.captchaTip = this.initCaptchaTip;
                  this.$refs.captcha_tip_label.style.color = "gray";
                  this.captchaCheckFlag = false;
                  return;
              }
            },

            // 清空用户的输入信息
            clear() {
                this.userName = '';
                this.email = '';
                this.realName = '';
                this.telephone = '';
                this.birthday = '';
                this.password = '';
                this.confirmPassword = '';
                this.captcha = '';

                this.userNameTip = this.initUserNameTip;
                this.emailTip = this.initEmailTip;
                this.realNameTip = this.initRealNameTip;
                this.telephoneTip = this.initTelephoneTip;
                this.birthdayTip = this.initBirthdayTip;
                this.passwordTip = this.initPasswordTip;
                this.confirmPasswordTip = this.initConfirmPasswordTip;
                this.captchaTip = this.initCaptchaTip;

                this.$refs.user_name_tip_label.style.color = "gray";
                this.$refs.email_tip_label.style.color = "gray";
                this.$refs.real_name_tip_label.style.color = "gray";
                this.$refs.telephone_tip_label.style.color = "gray";
                this.$refs.birthday_tip_label.style.color = "gray";
                this.$refs.password_tip_label.style.color = "gray";
                this.$refs.confirm_password_tip_label.style.color = "gray";
                this.$refs.captcha_tip_label.style.color = "gray";

                this.userNameCheckFlag = false;
                this.emailCheckFlag = false;
                this.realNameCheckFlag = false;
                this.telephoneCheckFlag = false;
                this.birthdayCheckFlag = false;
                this.passwordCheckFlag = false;
                this.confirmPasswordCheckFlag = false;
                this.captchaCheckFlag = false;
            },

            //产生四位随机数作为验证码
            generateCaptcha() {
                let str = '';
                for(let i = 0; i < 4; i++) {
                    str += Math.floor(Math.random()*10);
                }
                return str;
            },

            //注册成功后，跳转回登录页面
            jumpToLoginPage() {
                this.$router.push('/login');
            }
        },

        created() {
            //产生初始验证码
            this.initCaptcha = this.generateCaptcha();
            this.initCaptchaTip = this.initCaptchaTip + this.initCaptcha;

            this.userNameTip = this.initUserNameTip;
            this.emailTip = this.initEmailTip;
            this.realNameTip = this.initRealNameTip;
            this.telephoneTip = this.initTelephoneTip;
            this.birthdayTip = this.initBirthdayTip;
            this.passwordTip = this.initPasswordTip;
            this.confirmPasswordTip = this.initConfirmPasswordTip;
            this.captchaTip = this.initCaptchaTip;
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