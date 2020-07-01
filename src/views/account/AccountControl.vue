<template>
    <div>
        <table-search :searchList="searchList" :params.sync="searchParams" @search="getSearchList(1)">
            <div v-if="!showCurrentUserInfo" slot="add" class="mr-1">
                <el-button @click="getTableList({}, 0, 1)" size="mini" icon="el-icon-back" type="warning">返回</el-button>
            </div>
        </table-search>
        <template v-if="showCurrentUserInfo">
            <table-page :tableData="[currentUserInfo]" :columns="userColumns" :height="59">
                <div slot="role" slot-scope="data">{{data.props.row.role | roleName}}</div>
                <div slot="status" slot-scope="data">
                    <span class="table-btn" :style="transformStatus(data, 1)">
                        {{transformStatus(data, 1, 1)}}
                    </span>
                </div>
                <div slot="status2" slot-scope="data">
                    <span class="table-btn" :style="transformStatus(data, 2)">
                        {{transformStatus(data, 2, 1)}}
                    </span>
                </div>
                <span slot="liveWash" slot-scope="data">{{data.props.row.liveWash}}%</span>
                <span slot="liveOccupy" slot-scope="data">{{data.props.row.liveOccupy}}%</span>
            </table-page>
            <div class="yellow table-title">
                <el-button v-auth="'user:add'" @click="showModelFun(1)" size="mini" type="warning" :disabled="currentUserInfo.role === 'ag4'">添加下级</el-button>
                <el-button v-auth="'user:add'" @click="showModelFun(2)" size="mini" type="warning">添加会员</el-button>
                <el-button v-auth="'user:manage'" @click="getTableList(superiorList.slice(-1)[0], !isMember, 1)" class="mr-1" size="mini" type="warning">{{currentUserInfo.userName}} 的{{isMember ? '下级' : '会员'}}</el-button>
                <router-link v-auth="'default:log'" class="mr-1" :to="{path: '/operationLog/OperationLog', query: {name: currentUserInfo.userName}}">
                    <el-button size="mini" type="warning">日志</el-button>
                </router-link>
                <router-link v-auth="'user:submanage'" class="mr-1" :to="{path: '/account/SubAccount', query: {id: currentUserInfo.userId, name: currentUserInfo.userName}}">
                    <el-button size="mini" type="warning">
                        子账户
                    </el-button>
                </router-link>
                <el-button v-if="apiAgentSet" @click="showModelFun(7)" size="mini" type="warning">线路信息</el-button>
            </div>
            <div class="go-back yellow">
                <span v-for="(item, i) of superiorList" @click="goSuperior(item, i)" :key="item.userName"><span class="span">/</span>{{item.userName}}</span>
            </div>
        </template>

        <table-page
                :tableData="tableData"
                :columns="columns"
                :pageData.sync="pageData"
                :loading="loading"
                :height="tableHeight"
        >
            <div slot="userName" slot-scope="data">
                <el-button v-if="data.props.row.role !== 'member'" @click="getTableList(data.props.row, 0, 1)" class="table-btn" style="padding: 0" type="text">
                    {{data.props.row.userName}}
                </el-button>
                <span v-else>{{data.props.row.userName}}</span>
            </div>
            <div slot="role" slot-scope="data">{{data.props.row.role | roleName}}</div>
            <div slot="status" slot-scope="data">
                <el-button class="table-btn" @click="changeStatus(data, 1)" :style="transformStatus(data, 1)"
                           type="text">
                    {{transformStatus(data, 1, 1)}}
                </el-button>
            </div>
            <span slot="liveWash" slot-scope="data">{{data.props.row.liveWash}}%</span>
            <span slot="liveOccupy" slot-scope="data">{{data.props.row.liveOccupy}}%</span>
            <div slot="status2" slot-scope="data">
                <el-button class="table-btn" @click="changeStatus(data, 2)" :style="transformStatus(data, 2)"
                           type="text">
                    {{transformStatus(data, 2, 1)}}
                </el-button>
            </div>
            <div slot="createTime" slot-scope="data">{{data.props.row.createTime * 1000 | dateFormat}}</div>
            <div slot="operating" slot-scope="data">
                <el-button-group v-if="data.props.row.role === 'member'">
                    <el-button v-auth="'report:liveall'" class="table-btn plr-4" type="text">
                        <router-link :to="{path: '/gameData/GameReport', query: {name: data.props.row.userName}}">查看报表</router-link>
                    </el-button>
                    <el-button v-auth="'user:edit'" @click="showModelFun(4, data)" class="table-btn plr-4" type="text">修改</el-button>
                    <el-button v-auth="'user:money'" @click="showModelFun(5, data)" class="table-btn plr-4" type="text">加减点</el-button>
                    <el-button v-auth="'default:log'" class="table-btn plr-4" type="text">
                        <router-link :to="{path: '/operationLog/OperationLog', query: {name: data.props.row.userName, isMember: 1}}">日志</router-link>
                    </el-button>
                    <el-button v-auth="'user:gamelog'" class="table-btn plr-4" type="text">
                        <router-link :to="{path: '/gameData/GameRecord', query: {name: data.props.row.userName}}">游戏记录</router-link>
                    </el-button>
                </el-button-group>
                <el-button-group v-else>
                    <el-button v-auth="'report:liveall'" class="table-btn plr-4" type="text">
                        <router-link :to="{path: '/gameData/GameReport', query: {name: data.props.row.userName}}">查看报表</router-link>
                    </el-button>
                    <el-button v-auth="'user:edit'" @click="showModelFun(4, data)" class="table-btn plr-4" type="text">修改</el-button>
                    <el-button v-auth="'user:add'" @click="showModelFun(3, data)" class="table-btn plr-4" type="text">
                        添加下级
                    </el-button>
                    <el-button v-auth="'user:submanage'" class="table-btn plr-4" type="text">
                        <router-link :to="{path: '/account/SubAccount', query: {id: data.props.row.userId,name: data.props.row.userName}}">子账户</router-link>
                    </el-button>
                    <el-button v-auth="'user:acl'" @click="showModelFun(6, data)" class="table-btn plr-4" type="text">权限</el-button>
                    <el-button v-auth="'user:money'" @click="showModelFun(5, data)" class="table-btn plr-4" type="text">加减点</el-button>
                    <el-button v-auth="'default:log'" class="table-btn plr-4" type="text">
                        <router-link :to="{path: '/operationLog/OperationLog', query: {name: data.props.row.userName}}">日志</router-link>
                    </el-button>
                </el-button-group>
            </div>
        </table-page>
        <v-model :visible.sync="showModel" :data.sync="modelData" :cardStyle="cardStyle" @confirm="modelConfirm"></v-model>
    </div>
</template>

<script>
    import {
        columns,
        pageData,
        searchList,
        searchParams,
        addList,
        addParams,
        editList,
        editParams,
        countList,
        countParams,
        userColumns,
        authList,
        authParams
    } from "./data/AccountControl";
    import * as api from "../../http/api/account";
    import {userInfo} from "../../http/api/user";
    import {roleList} from "../../utils/filter";
    import {mapState, mapActions} from 'vuex'
    import {setMemberPermission} from "../../http/api/jurisdiction";

    export default {
        name: 'AccountControl',
        data() {
            return {
                tableData: [],
                columns,
                pageData,
                searchList,
                searchParams,
                addList,
                addParams,
                editList,
                editParams,
                countList,
                countParams,
                userColumns,
                authList,
                authParams,
                showModel: false,
                loading: false,
                modelData: {
                    title: '',
                    selectedList: [],
                    params: {},
                    list: []
                },
                cardStyle: {},
                modelType: null,
                topUserInfo: [],
                selectedUser: {},
                superiorList: [{userName: '首页'}],
                showCurrentUserInfo: true,
                tableHeight: 'calc(100vh - 280px)',
                isMember: false,
                apiAgentSet: null
            }
        },
        watch: {
            'modelData.params': {
                handler(val) {
                    if (val && val.type !== undefined) {
                        this.livePrompt(val)
                    }
                },
                deep: true
            },
            pageData() {
                if (!this.showCurrentUserInfo) {
                    this.getSearchList()
                } else {
                    this.getTableList(this.superiorList.slice(-1)[0], this.isMember)
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            from.meta.keepAlive = Object.keys(to.query).length;
            next()
        },
        mounted() {
            const {role} = this.userData;
            const roleArr = Object.keys(roleList);
            const index = roleArr.findIndex(item => item === role) + 1;
            this.searchList[2].options = [{id: '', name: '全部'}];
            for (let i = index; i < roleArr.length; i++) {
                this.searchList[2].options.push(
                    {id: roleArr[i], name: roleList[roleArr[i]]}
                )
            }
            this.getTableList(this.superiorList[0])
        },
        computed: {
            ...mapState(['userData', 'tableSelect', 'currentUserInfo'])
        },
        methods: {
            ...mapActions(['setState']),
            // 加减点提示
            livePrompt(data) {
                const topUserId = this.modelData.params.topUserId;
                if (this.topUserInfo.length && topUserId) {
                    if (data.type === '0') {
                        const {userName, liveMoney} = this.topUserInfo.find(item => item.userId === topUserId);
                        this.modelData.list[1].prompt = `上级${userName} 还有 ${liveMoney}可加`;
                        this.modelData.list[1].max = liveMoney
                    } else {
                        const {userName, liveMoney} = this.selectedUser;
                        this.modelData.list[1].prompt = `下级 ${userName} 还有 ${liveMoney} 可减`;
                        this.modelData.list[1].max = liveMoney
                    }
                }
            },
            // 获取列表信息 type: 0/1:查询下级/会员
            getTableList(data = {}, type, currentPage) {
                this.tableHeight = 'calc(100vh - 280px)';
                this.showCurrentUserInfo = true;
                const {userId, userName} = data;
                currentPage && (this.pageData.page = currentPage);
                let id = userId || this.currentUserInfo.userId || this.userData.userId;
                if (userName === '首页') {
                    id = this.userData.userId
                }
                this.isMember = !!type;
                if (userId) {
                    if (!this.superiorList.some(item => item.userName === userName)) {
                        this.superiorList.push({userId, userName});
                    }
                    this.getCurrentUserInfo(userName);
                } else {
                    this.getCurrentUserInfo();
                }
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getDirectList({page, limit, userId: id, isMember: this.isMember}).then(({data}) => {
                    this.pageData.total = data.total;
                    if (data.total) {
                        this.tableData = data.records.map(item => {
                            item.liveOccupy *= 100;
                            item.liveWash *= 100;
                            return item
                        });
                    } else {
                        this.tableData = []
                    }
                    this.loading = false
                })
            },
            // 当前获取用户信息
            getCurrentUserInfo(name = '') {
                userInfo({name}).then(({data}) => {
                    this.apiAgentSet = data.apiAgentSet
                    data.liveOccupy *= 100;
                    data.liveWash *= 100;
                    this.setState(['currentUserInfo', data]);
                })
            },
            // 返回上一级
            goSuperior(item, i) {
                this.pageData.page = 1;
                if (item.userName === '首页') {
                    this.superiorList = [{userName: '首页'}];
                    this.getTableList({userName: '首页'});
                } else {
                    if (this.superiorList.includes(item)) {
                        this.superiorList = this.superiorList.slice(0, i);
                    }
                    this.getTableList(item);
                }
            },
            // 获取搜索列表
            getSearchList(currentPage) {
                currentPage && (this.pageData.page = currentPage);
                this.tableHeight = 'calc(100vh - 160px)';
                this.showCurrentUserInfo = false;
                this.superiorList = [{userName: '首页'}];
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getAccountList({page, limit, ...this.searchParams}).then(({data}) => {
                    this.pageData.total = data.total;
                    if (data.total) {
                        this.tableData = data.records.map(item => {
                            item.liveOccupy *= 100;
                            item.liveWash *= 100;
                            return item
                        });
                    } else {
                        this.tableData = []
                    }
                    this.loading = false
                })
            },
            // 转换状态数据 type: 0: style样式， 1: 按钮文字
            transformStatus(data, num, type = 0) {
                const status = data.props.row.status;
                if (!type) {
                    return {color: (status & num) ? '' : 'red'};
                } else {
                    return (status & num) ? '开启' : '锁定';
                }
            },
            // 切换状态
            changeStatus(data, type) {
                const authList = this.userData.permission;
                if (!authList.includes('user:edit')) return;
                const {userName, userId} = data.props.row;
                this.$confirm(`确认修改【${userName}】的${type === 1 ? '登录' : '投注'}状态？`)
                    .then(() => {
                        this.loading = true;
                        api.setAccountStatus({id: userId, type}).then((res) => {
                            this.confirmSuccess(res);
                        });
                    })
                    .catch(() => {
                    });
            },
            /**
             * 显示弹出框
             * @param type 1 / 3:添加下级,2:添加会员,4:修改,5:加减点,6:权限,7:
             * @param data 列表行数据
             */
            showModelFun(type, data) {
                this.modelType = type;
                this.modelData.type = '';
                this.cardStyle = {};
                const titleArr = ['添加下级', '添加会员', '添加下级', '修改', '加减点', '权限', '线路信息'];
                const titleName = data ? data.props.row.userName : this.currentUserInfo.userName;
                this.modelData.title = titleName + titleArr[type - 1];
                // 需要先请求接口后再显示的model
                [3, 4, 6].includes(type) ? this.loading = true : this.showModel = true;
                this.setState(['addSubChipsId', this.currentUserInfo.userId]);
                if (type < 4) {
                    this.showAddModel(type, data)
                } else if (type === 4) {
                    this.showEditModel(data)
                } else if (type === 5) {
                    this.modelData.type = 'single';
                    this.cardStyle = {width: '500px'};
                    this.showCountModel(data)
                } else if (type === 6) {
                    this.modelData.type = 'auth';
                    this.cardStyle = {width: '500px'};
                    this.showAuthModel(data)
                } else if (type === 7) {
                    this.modelData.type = 'prompt';
                    this.cardStyle = {width: '500px'};
                    this.showLineModel()
                }
            },
            // 弹出框确认
            modelConfirm() {
                if (this.modelType < 4) {
                    this.addConfirm()
                } else if (this.modelType === 4) {
                    this.editConfirm()
                } else if (this.modelType === 5) {
                    this.countConfirm()
                } else if (this.modelType === 6) {
                    this.authConfirm()
                } else if (this.modelType === 7) {
                    this.setState(['isRequest', false]);
                    this.showModel = false
                }
            },
            // 显示添加/修改model [ type: 1:头部的添加下级,2:添加会员,3:列表项的添加下级 ]
            showAddModel(type, data) {
                this.modelData.params = JSON.parse(JSON.stringify(this.addParams));
                this.modelData.params.topUserName = type !== 3 ? this.currentUserInfo.userName : data.props.row.userName;
                this.modelData.selectedList = [];
                if (type === 1) {
                    const roleArr = Object.keys(roleList);
                    this.modelData.params.role = roleArr[roleArr.indexOf(this.currentUserInfo.role) + 1]
                    this.modelData.list = this.addList.filter(item => item.key !== 'showWash');
                    this.modelData.list[5].prompt = `最高${this.currentUserInfo.liveMoney}`;
                    this.modelData.list[6].prompt = `最高${this.currentUserInfo.liveOccupy}%`;
                    this.modelData.list[7].prompt = `最高${this.currentUserInfo.liveWash}%`;
                } else if (type === 2) {
                    this.modelData.params.role = 'member';
                    this.modelData.list = this.addList.filter(item => item.key !== 'liveOccupy');
                    this.modelData.list[5].prompt = `最高${this.currentUserInfo.liveMoney}`;
                    this.modelData.list[6].prompt = `最高${this.currentUserInfo.liveWash}%`;
                } else if (type === 3) {
                    const roleArr = Object.keys(roleList);
                    this.setState(['addSubChipsId', data.props.row.userId]);
                    this.modelData.params.role = roleArr[roleArr.indexOf(data.props.row.role) + 1];
                    this.modelData.list = this.addList.filter(item => item.key !== 'showWash');
                    userInfo({name: data.props.row.userName}).then(res => {
                        const {liveMoney, liveOccupy, liveWash} = res.data;
                        this.modelData.list[5].prompt = `最高${liveMoney}`;
                        this.modelData.list[6].prompt = `最高${liveOccupy * 100}%`;
                        this.modelData.list[7].prompt = `最高${liveWash * 100}%`;
                        this.showModel = true;
                        this.loading = false;
                    })
                }
            },
            // 确认添加
            addConfirm() {
                this.modelData.params.quotaIdList = this.tableSelect;
                api.getAccountAdd(this.modelData.params).then(res => {
                    this.confirmSuccess(res);
                })
            },
            // 显示修改model
            showEditModel(data) {
                this.modelData.params = JSON.parse(JSON.stringify(this.editParams));
                const topUser = data.props.row.parentTreeStr.split('/');
                this.modelData.params.topUserName = topUser[topUser.length - 2];
                this.editList[6].prompt = `最高${this.currentUserInfo.liveOccupy}%`;
                this.editList[7].prompt = `最高${this.currentUserInfo.liveWash}%`;
                if (data.props.row.role === 'member') {
                    this.modelData.list = this.editList.filter(item => item.key !== 'liveOccupy')
                } else {
                    this.modelData.list = this.editList.filter(item => item.key !== 'showWash');
                }
                api.getBjlQuotaSet({id: data.props.row.userId, isDisable: true}).then(res => {
                    res.status === 10000 && this.setState(['disabledList', res.data])
                });
                userInfo({name: data.props.row.userName}).then(res => {
                    const {userName, nickName, liveMoney, liveOccupy, liveWash, limitIds} = res.data;
                    this.modelData.selectedList = JSON.parse(limitIds);
                    this.modelData.params.userName = userName;
                    this.modelData.params.nickName = nickName;
                    this.modelData.params.liveMoney = liveMoney;
                    this.modelData.params.liveOccupy = liveOccupy * 100;
                    this.modelData.params.liveWash = liveWash * 100;
                    this.showModel = true;
                    this.loading = false
                });
            },
            // 确认修改
            editConfirm() {
                this.modelData.params.quotaIdList = this.tableSelect;
                api.getAccountEdit(this.modelData.params).then(res => {
                    this.confirmSuccess(res);
                })
            },
            // 显示加减点model
            showCountModel(data) {
                this.modelData.params = JSON.parse(JSON.stringify(this.countParams));
                this.modelData.params.userId = data.props.row.userId;
                this.modelData.list = this.countList;
                userInfo({name: data.props.row.userName}).then(res => {
                    this.selectedUser = res.data
                });
                api.getAllTopInfo({id: data.props.row.userId}).then(res => {
                    this.modelData.params.topUserId = res.data[0].userId;
                    this.topUserInfo = res.data;
                    this.modelData.list[2].options = res.data.map(item => ({id: item.userId, name: item.userName}))
                })
            },
            // 确认加减点
            countConfirm() {
                api.getAddSubPoints(this.modelData.params).then(res => {
                    this.confirmSuccess(res);
                })
            },
            // 显示权限model
            showAuthModel(data) {
                const {userName} = data.props.row;
                this.modelData.params = JSON.parse(JSON.stringify(this.authParams));
                this.modelData.list = this.authList;
                this.modelData.params.userName = userName;
                userInfo({name: userName}).then(res => {
                    this.modelData.selectedList = res.data.permission;
                    this.showModel = true;
                    this.loading = false
                });
            },
            // 确认权限修改
            authConfirm() {
                this.modelData.params.resourceIdList = this.tableSelect;
                setMemberPermission(this.modelData.params).then((res) => {
                    this.showModel = res.status !== 10000
                })
            },
            showLineModel() {
                const {serviceURL, agentName, privateKey, privateHashKey} = this.apiAgentSet
                this.modelData.message = `<div style="width: 200px;margin: 0 auto;text-align: left;white-space: nowrap">
                                            url：${serviceURL || ''} <br>
                                            agent：${agentName || ''} <br>
                                            des_key：${privateKey || ''} <br>
                                            md5_key：${privateHashKey || ''} <br>
                                        </div>`
            },
            // 确认弹出框成功
            confirmSuccess(res) {
                if (res && res.status === 10000) {
                    if (this.showCurrentUserInfo) {
                        this.getTableList(this.superiorList.slice(-1)[0], this.isMember);
                    } else {
                        this.getSearchList()
                    }
                    this.showModel = res.status !== 10000
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-title {
        line-height: 40px;
        white-space: nowrap;
        overflow-x: auto;
    }
    .go-back {
        display: inline-block;
        margin: 0 10px 8px 0;
        cursor: pointer;

        .span {
            margin: 0 5px;
        }
    }
</style>
