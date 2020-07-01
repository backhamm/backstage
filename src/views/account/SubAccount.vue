<template>
    <div>
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
            <span slot="liveOccupy" slot-scope="data" v-if="data.props.row.liveWash !== undefined">{{data.props.row.liveOccupy}}%</span>
            <span slot="liveWash" slot-scope="data" v-if="data.props.row.liveWash !== undefined">{{data.props.row.liveWash}}%</span>
        </table-page>
        <div style="line-height: 40px;">
            <el-button v-if="fatherId" @click="$router.go(-1)" size="mini" icon="el-icon-back" type="warning">返回</el-button>
            <el-button @click="showModelFun(1)" size="mini" icon="el-icon-plus" type="warning">添加</el-button>
        </div>
        <table-page
                :tableData="tableData"
                :columns="columns"
                :pageData.sync="pageData"
                :loading="loading"
                :height="'calc(100vh - 220px)'"
        >
            <div slot="status" slot-scope="data">
                <el-button class="table-btn" @click="changeStatus(data)" :style="transformStatus(data)" type="text">
                    {{transformStatus(data, 1)}}
                </el-button>
            </div>
            <div slot="createTime" slot-scope="data">
                {{data.props.row.createTime * 1000 | dateFormat}}
            </div>
            <el-button-group slot="operating" slot-scope="data">
                <el-button @click="showModelFun(2, data)" class="table-btn plr-4" type="text">修改</el-button>
                <el-button v-auth="'default:log'" class="table-btn plr-4" type="text">
                    <router-link :to="{path: '/operationLog/OperationLog', query: {name: data.props.row.userName}}">日志</router-link>
                </el-button>
                <el-button @click="showModelFun(3, data)" class="table-btn plr-4" type="text">权限</el-button>
            </el-button-group>
        </table-page>
        <v-model :visible.sync="showModel" :data.sync="modelData" :cardStyle="cardStyle" @confirm="modelConfirm"></v-model>
    </div>
</template>

<script>
    import {columns, pageData, addParams, addList, editParams, editList, userColumns, authList, authParams} from "./data/SubAccount";
    import * as api from "../../http/api/account";
    import {mapState, mapActions} from 'vuex'
    import {userInfo} from "../../http/api/user";
    import mixin from '../../common/mixin'

    export default {
        name: 'SubAccount',
        mixins: [mixin],
        data() {
            return {
                columns,
                pageData,
                addParams,
                addList,
                editParams,
                editList,
                userColumns,
                authList,
                authParams,
                loading: false,
                showModel: false,
                modelData: {
                    title: '',
                    selectedList: [],
                    params: {},
                    list: []
                },
                cardStyle: {width: '500px'},
                tableData: [],
                fatherId: '',
                modelType: ''
            }
        },
        created() {
            this.init()
        },
        computed: mapState(['userData', 'tableSelect', 'currentUserInfo']),
        watch: {
            $route(val) {
                this.fatherId = val.id || '';
                this.init();
                this.getTableList();
            }
        },
        methods: {
            ...mapActions(['setState']),
            init() {
                this.fatherId = this.$route.query.id || '';
                const name = this.$route.query.name || '';
                userInfo({name}).then(({data}) => {
                    data.liveOccupy *= 100;
                    data.liveWash *= 100;
                    this.setState(['currentUserInfo', data]);
                })
            },
            getTableList() {
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getSubAccount({page, limit, fatherId: this.fatherId}).then(({data}) => {
                    this.pageData.total = data.total;
                    this.tableData = data.records;
                    this.loading = false
                })
            },
            // 切换状态
            changeStatus(data) {
                const authList = this.userData.permission;
                if (!authList.includes('user:submanage')) return;
                const {userName, userId, status} = data.props.row;
                const value = status ? 0 : 1;
                this.$confirm(`确认修改【${userName}】的登录状态？`)
                    .then(() => {
                        this.loading = true;
                        api.setSubStatus({userId, status: value}).then(() => this.getTableList());
                    })
                    .catch(() => {
                    });
            },
            // 转换状态数据 type: 0: style样式， 1: 按钮文字
            transformStatus(data, type = 0) {
                const status = data.props.row.status;
                return !type ? {color: status ? '' : 'red'} : status ? '开启' : '锁定'
            },
            /**
             * 显示弹出框
             * @param type 1 :添加,2:修改,3:权限
             * @param data 列表行数据
             */
            showModelFun(type, data) {
                this.modelType = type;
                this.modelData.type = 'single';
                const titleArr = ['添加','修改','权限'];
                const titleName = data ? data.props.row.userName : '';
                this.modelData.title = titleName + titleArr[type - 1];
                if (type === 1) {
                    this.showAddModel()
                } else if (type === 2) {
                    this.showEditModel(data)
                } else if (type === 3) {
                    this.modelData.type = 'subAuth';
                    this.showAuthModel(data)
                }
                if (type === 1) {
                    this.showModel = true
                } else {
                    this.loading = true
                }
            },
            modelConfirm() {
                if (this.modelType === 1) {
                    this.addConfirm()
                } else if (this.modelType === 2) {
                    this.editConfirm()
                } else if (this.modelType === 3) {
                    this.authConfirm()
                }
            },
            showAddModel() {
                this.modelData.params = JSON.parse(JSON.stringify(this.addParams));
                this.modelData.params.fatherId = this.fatherId ? this.fatherId : this.userData. userId;
                this.modelData.list = this.addList;
            },
            // 确认添加
            addConfirm() {
                api.addSubAccount(this.modelData.params).then(res => {
                    this.getTableList();
                    this.showModel = res.status !== 10000
                });
            },
            showEditModel(data) {
                this.modelData.params = JSON.parse(JSON.stringify(this.editParams));
                const id = data.props.row.userId;
                this.modelData.params.userId = id;
                api.getSubInfo({id}).then(res => {
                    const {nickName, tel} = res.data;
                    this.modelData.params.nickName = nickName;
                    this.modelData.params.tel = tel;
                    this.loading = false;
                    this.showModel = true
                });
                this.modelData.list = this.editList;
            },
            // 确认修改
            editConfirm() {
                api.editSubAccount(this.modelData.params).then(res => {
                    this.getTableList();
                    this.showModel = res.status !== 10000
                });
            },
            // 显示权限model
            showAuthModel(data) {
                const {userId} = data.props.row;
                this.modelData.params = JSON.parse(JSON.stringify(this.authParams));
                this.modelData.list = this.authList;
                this.modelData.params.userId = userId;
                api.getSubInfo({id: userId}).then(res => {
                    this.modelData.selectedList = res.data.permissionList;
                    this.loading = false;
                    this.showModel = true
                });
            },
            // 确认权限修改
            authConfirm() {
                this.modelData.params.resourceIdList = this.tableSelect;
                api.editSubAuth(this.modelData.params).then((res) => {
                    this.showModel = res.status !== 10000
                })
            }
        }
    }
</script>
