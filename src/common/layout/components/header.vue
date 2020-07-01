<template>
    <div class="header">
        <el-button class="slide-btn" @click="$emit('switchSlide')" v-if="isMB" type="warning" icon="el-icon-s-fold" circle></el-button>
        <img v-else src="../../../assets/logo.jpg" alt="">
        <div class="right-info">
            <div class="info-item">用户名：{{loginName}}</div>
            <div class="info-item">角色：{{userData.role | roleName}}</div>
            <div class="info-item parting">|</div>
            <div class="info-item logout" @click="logoutPrompt = true">退出登录</div>
        </div>
        <v-model :visible.sync="logoutPrompt" :data="logoutData" :cardStyle="{width: '350px'}" @confirm="Logout"></v-model>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                logoutPrompt: false,
                logoutData: {
                    title: '提示',
                    type: 'prompt',
                    message: '确定退出？'
                },
                loginName: this.$ls.get('loginName')
            }
        },
        computed: mapState(['userData', 'isMB']),
        methods: mapActions(['Logout'])
    }
</script>

<style lang="less" scoped>
    .header {
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        font-size: 0;
        background:linear-gradient(0deg,rgba(17,17,17,1),rgba(51,51,51,1));
        border-bottom: 1px solid rgb(85, 85, 85);

        .right-info {
            float: right;
            display: flex;
            font-size: 12px;
            color: #eee;

            .info-item {
                padding: 0 10px;

                &.parting {
                    color: #555;
                }
            }

            .logout {
                cursor: pointer;
                color: #E6A23C;
            }
        }
    }
    .mb {
        .header {
            padding: 0 10px;

            .slide-btn {
                vertical-align: middle;
            }
        }
    }
</style>
