<template>
    <div>
        <div class="side-card" :class="{hide: hideInfo}">
            <div @click="hideInfo = !hideInfo" class="side-item side-title">
                账户概览
                <img class="icon right-icon fr" src="../../../assets/icons/xiangxia.svg" alt="">
            </div>
            <div class="side-item">用户名：<span class="fr yellow">{{userData.userName}}</span></div>
            <div class="side-item">真人点数：<span class="fr">{{userData.liveMoney}}</span></div>
            <div class="side-item">登入时间：<span class="fr" v-if="userData.lastLoginTime">{{userData.lastLoginTime * 1000 | dateFormat}}</span></div>
            <div class="side-item">登入IP：<span class="fr">{{userData.lastLoginIp}}</span></div>
            <div class="side-item">登入次数：<span class="fr">{{userData.loginTimes}}</span></div>
            <div class="side-item">功能：
                <div @click="pwdModel = true" class="btn fr">修改密码</div>
            </div>
        </div>
        <div class="side-card" v-for="(items, i) of addRouters" :class="{hide: !openCard[i].show}" :style="{height: cardHeight(items, i)}" :key="items.path">
            <div class="side-item side-title" @click="showItem(i)">
                {{ items.meta.title }}
                <img class="icon right-icon fr" src="../../../assets/icons/xiangxia.svg" alt="">
            </div>
            <div v-for="item of items.children" :key="item.path">
                <router-link style="width: 100%;height: 100%" :to="routerLink(items, item)">
                    <div class="side-item" @click="$emit('switchSlide')">
                        {{item.meta.title}}
                    </div>
                </router-link>
            </div>
        </div>
        <v-model :visible.sync="pwdModel" :data.sync="pwdData" :cardStyle="{width: '500px'}" @confirm="confirm"></v-model>
    </div>
</template>

<script>
    import {userInfo, editPassword} from "../../../http/api/user";
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                hideInfo: false,
                pwdModel: false,
                pwdData: {
                    type: 'single',
                    title: '修改密码',
                    params: {oldPassword: '', newPassword: '', verifyNewPassword: ''},
                    list: [
                        {title: '原密码', key: 'oldPassword', inputType: 'password', must: true, errMsg: '6~16位', reg: /^.{6,16}$/},
                        {title: '新密码', key: 'newPassword', inputType: 'password', must: true, errMsg: '6~16位', reg: /^.{6,16}$/},
                        {title: '确认新密码', key: 'verifyNewPassword', inputType: 'password', must: true, errMsg: '6~16位', reg: /^.{6,16}$/}
                    ]
                },
                openCard: []
            }
        },
        computed: mapState(['userData', 'addRouters']),
        watch: {
            $route(val) {
                this.openCard.find(item => val.path.indexOf(item.path) > -1).show = true
            }
        },
        created() {
            this.addRouters.forEach(item => this.openCard.push({path: item.path, show: false}));
            this.openCard.length && (this.openCard.find(item => this.$route.path.indexOf(item.path) > -1).show = true)
        },
        methods: {
            ...mapActions(['Logout', 'setState']),
            getUserInfo(showMsg = false) {
                userInfo({}, showMsg).then(res => {
                    this.setState(['userData', res.data]);
                })
            },
            routerLink(items, item) {
                return `${items.path}/${item.path}`
            },
            cardHeight(items, i) {
                if (this.openCard[i].show) {
                    return items.children.length * 36 + 36 + 'px'
                } else {
                    return 36 + 'px'
                }
            },
            // 侧边栏手风琴
            showItem(i) {
                this.openCard[i].show = !this.openCard[i].show;
            },
            // 确认修改密码
            confirm() {
                editPassword(this.pwdData.params).then((res) => {
                    if (res.status === 10000) {
                        this.pwdModel = false;
                        this.$ls.remove('TOKEN');
                        this.$router.replace('/login')
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .side-card {
        margin-bottom: 15px;
        background: #222;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 500;
        border-radius: 5px;
        transition: all .2s;

        a.active {
            .side-item {
                color: #E6A23C
            }
        }

        &:first-child {
            height: 260px;
        }

        .side-item {
            cursor: pointer;
        }

        &.hide {
            height: 36px;

            .right-icon {
                transform: rotate(-90deg);
            }
        }

        .icon {
            width: 20px;
            margin-top: 6px;
            transition: all .2s;
        }

        .side-item {
            padding: 0 10px;
            line-height: 36px;
            margin-bottom: 1px;
            background: #fff;
            color: #111;

            .btn {
                width:80px;
                height:24px;
                line-height:24px;
                margin-top: 6px;
                padding: 0 5px;
                text-align: center;
                background:rgba(34,34,34,1);
                border-radius:5px;
                color: #eee;
            }
        }

        .side-title {
            text-align: center;
            font-size: 15px;
            background: linear-gradient(0deg, #111111, #333333);
            color: #eee;
        }
    }
</style>
