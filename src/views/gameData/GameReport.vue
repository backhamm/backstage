<template>
    <div>
        <table-search :searchList="searchList" :params.sync="searchParams" @search="getTableList(-1, 1)">
            <div slot="add">
                <el-button class="mr-1" v-if="$route.query.name" @click="$router.go(-1)" size="mini" icon="el-icon-back" type="warning">返回</el-button>
            </div>
            <div slot="last">
                <el-button size="mini" type="warning" @click="visible = true">报表规则说明</el-button>
            </div>
        </table-search>
        <div class="yellow table-title">
            <div v-if="superiorList.length > 1" class="go-back">
                <span v-for="(item, i) of superiorList" @click="goSuperior(item, i)" :key="item"><span class="span">/</span>{{item}}</span>
            </div>
            真人游戏总报表
        </div>
        <table-page
                 class="total-table"
                :tableData="tableDataUp"
                :columns="columns"
                :pageData.sync="pageData"
                :loading="loading"
                height="calc((100vh - 246px) / 2)"
                style="margin-bottom: 10px"
        >
            <span slot="liveWash" slot-scope="data" v-if="data.props.row.liveWash !== undefined">{{data.props.row.liveWash}}%</span>
            <span slot="liveOccupy" slot-scope="data" v-if="data.props.row.liveWash !== undefined">{{data.props.row.liveOccupy}}%</span>
            <div slot="userTotalProfit" slot-scope="data">
                <span :style="{color: data.props.row.userTotalProfit >= 0 ? '#67c23a' : 'red'}">{{data.props.row.userTotalProfit}}</span>
            </div>
            <div slot="totalBalance" slot-scope="data">
                <span :style="{color: data.props.row.totalBalance >= 0 ? '#67c23a' : 'red'}">{{data.props.row.totalBalance}}</span>
            </div>
            <div slot="userName" slot-scope="data">
                <el-button v-if="data.props.row.userName !== '总计'" @click="getTableList(data.props.row.userName, 1)" class="table-btn plr-4" type="text">{{data.props.row.userName}}</el-button>
                <span v-else>{{data.props.row.userName}}</span>
            </div>
        </table-page>
        <div class="mr-1 yellow table-title">会员真人游戏总报表</div>
        <table-page
                class="total-table"
                :tableData="tableDataDown"
                :columns="columnsDown"
                :pageData.sync="pageDataDown"
                :loading="loadingDown"
                height="calc((100vh - 246px) / 2)"
        >
            <span slot="liveWash" slot-scope="data" v-if="data.props.row.liveWash !== undefined">{{data.props.row.liveWash}}%</span>
            <div slot="userName" slot-scope="data" >
                <router-link v-if="data.props.row.userName !== '总计'" :to="{path: '/gameData/GameRecord', query: {name: data.props.row.userName, sTime: searchParams.startTime, eTime: searchParams.endTime}}">
                    {{data.props.row.userName}}
                </router-link>
                <span v-else>{{data.props.row.userName}}</span>
            </div>
            <div slot="userTotalProfit" slot-scope="data">
                <span :style="{color: data.props.row.userTotalProfit >= 0 ? '#67c23a' : 'red'}">{{data.props.row.userTotalProfit}}</span>
            </div>
            <div slot="totalBalance" slot-scope="data">
                <span :style="{color: data.props.row.totalBalance >= 0 ? '#67c23a' : 'red'}">{{data.props.row.totalBalance}}</span>
            </div>
        </table-page>
        <v-model :visible.sync="visible" :data="captionData" :cardStyle="{width: '600px'}" @confirm="visible = false"></v-model>
    </div>
</template>

<script>
    import {columns, pageData, columnsDown, pageDataDown, searchParams, searchList, captionData} from "./data/GameReport";
    import * as api from "../../http/api/gameData";

    export default {
        name: 'GameReport',
        data() {
            return {
                visible: false,
                captionData,
                loading: false,
                loadingDown: false,
                columns,
                columnsDown,
                pageData,
                pageDataDown,
                searchParams,
                searchList,
                tableDataUp: [],
                tableDataDown: [],
                superiorList: ['首页']
            }
        },
        watch: {
            'searchParams.userName'(val) {
                if (!val) {
                    this.superiorList = ['首页']
                }
            },
            pageData() {
                this.getUpTableList()
            },
            pageDataDown() {
                this.getDownTableList()
            }
        },
        created() {
            this.searchParams.userName = this.$route.query.name || ''
        },
        mounted() {
            this.getTableList(-1)
        },
        beforeRouteLeave(to, from, next) {
            from.meta.keepAlive = Object.keys(to.query).length;
            next()
        },
        methods: {
            getTableList(userName = '', page) {
                if (userName !== -1) {
                    userName && this.superiorList.push(userName);
                    this.searchParams.userName = userName;
                } else if (this.searchParams.userName) {
                    this.superiorList = ['首页'];
                    this.superiorList.push(this.searchParams.userName);
                }
                page && (this.pageData.page = page);
                this.getUpTableList();
                this.getDownTableList()
            },
            getUpTableList() {
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getGameReport({page, limit, ...this.searchParams}).then(({data}) => {
                    this.pageData.total = data.total;
                    if (data.total) {
                        this.tableDataUp = data.records.map(item => {
                            item.liveOccupy !== undefined && (item.liveOccupy *= 100);
                            item.liveWash !== undefined && (item.liveWash *= 100);
                            return item
                        });
                    } else {
                        this.tableDataUp = []
                    }
                    this.loading = false
                })
            },
            getDownTableList() {
                this.loading = true;
                const {page, limit} = this.pageDataDown;
                api.getMemberGameReport({page, limit, ...this.searchParams}).then(({data}) => {
                    this.pageDataDown.total = data.total;
                    if (data.total) {
                        this.tableDataDown = data.records.map(item => {
                            item.liveWash !== undefined && (item.liveWash *= 100);
                            return item
                        });
                    } else {
                        this.tableDataDown = []
                    }
                    this.loading = false
                })
            },
            // 返回上一级
            goSuperior(item, i) {
                this.pageData.page = 1;
                if (item === '首页') {
                    this.superiorList = ['首页'];
                    this.getTableList();
                } else {
                    if (this.superiorList.includes(item)) {
                        this.superiorList = this.superiorList.slice(0, i);
                    }
                    this.getTableList(item);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-title {
        position: relative;
        margin-bottom: 8px;
        text-align: center;

        .go-back {
            position: absolute;
            left: 0;
            cursor: pointer;

            .span {
                margin: 0 5px;
            }
        }
    }
</style>
