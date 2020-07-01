<template>
    <div class="login">
        <div class="login-main">
            <input v-for="item of loginList" v-model="loginParams[item.type]" @keyup.13="submit" class="input" :class="item.className" type="text" :placeholder="item.placeholder" :key="item.type">
            <img @click="changeImg" class="img fr" :src="imgUrl" alt="">
        </div>
        <div class="login-btn" @click="submit"></div>
    </div>
</template>

<script>
    import { login } from "../../http/api/user";
    import {exportImg} from "../../http";
    import {mapState} from 'vuex';

    export default {
        name: 'Login',
        data() {
            return {
                loginParams: { userName: '', password: '', captcha: '' },
                loginList: [
                    { type: 'userName', placeholder: '用户名', className: '' },
                    { type: 'password', placeholder: '密码', className: 'password' },
                    { type: 'captcha', placeholder: '验证码', className: 'code' }
                ],
                imgUrl: '',
                isRequest: false,
            }
        },
        mounted() {
            this.changeImg()
        },
        computed: mapState(['isMB']),
        methods: {
            checkParams() {
                for (let item of this.loginList) {
                    if (!this.loginParams[item.type]) {
                        return item.placeholder
                    }
                }
                return false
            },
            changeImg() {
                exportImg().then(res => {this.imgUrl = res})
            },
            submit() {
                if (this.isRequest) return;
                this.isRequest = true;
                const error = this.checkParams();
                if (error) {
                    this.isRequest = false;
                    return this.$notification({title: `${error}不能为空！`})
                }
                login(this.loginParams).then(res => {
                    if (res.status === 10000) {
                        this.$ls.set('loginName', this.loginParams.userName);
                        this.$ls.set('TOKEN', res.data.token);
                        this.$router.replace('/')
                    } else {
                        this.isRequest = false;
                        this.changeImg()
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @font-face {
        font-family: 'password';
        src: url(./password.ttf);
    }
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: url("../../assets/bg.jpg") no-repeat center / cover;

        .login-main {
            width: 488px;
            height: 329px;
            padding: 122px 40px 0 80px;
            background: url("../../assets/bg_box_new.png") no-repeat center / 100% 100%;

            .input {
                width: 100%;
                margin-bottom: 37px;
                border: none;
                outline: none;
                background-color: transparent;
                color: #e5e4ee;

                &.password {
                    font-family: 'password';
                }

                &.code {
                    width: 245px;
                }
            }

            .img {
                vertical-align: top;
            }
        }

        .login-btn {
            width: 488px;
            height: 58px;
            background: url("../../assets/login_btn.png") no-repeat center / 100% 100%;

            &:hover {
                background: url("../../assets/login_btn_hover.png") no-repeat center / 100% 100%;
            }
        }
    }
    .mb {
        .login {
            .login-main {
                width: 90%;
                height: 230px;
                padding: 80px 40px 0 50px;

                .input {
                    margin-bottom: 19px;

                    &.code {
                        width: 50%;
                    }
                }

                .img {
                    margin-top: -10px;
                }
            }

            .login-btn {
                width: 90%;
                height: 45px;
            }
        }
    }
</style>
