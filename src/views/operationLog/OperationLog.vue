<template>
    <div>
        <table-search :searchList="searchList" :params.sync="searchParams" @search="getTableList(1)">
            <div slot="add">
                <el-button class="mr-1" v-if="$route.query.name" @click="$router.go(-1)" size="mini" icon="el-icon-back" type="warning">返回</el-button>
            </div>
        </table-search>
        <table-page
                :tableData="tableData"
                :columns="columns"
                :loading="loading"
                :pageData.sync="pageData"
        >
            <div slot="type" slot-scope="data">
                {{transform(data, 'type')}}
            </div>
            <div slot="logName" slot-scope="data">
                {{transform(data, 'logName')}}
            </div>
            <div slot="createTime" slot-scope="data">
                {{data.props.row.time * 1000 | dateFormat}}
            </div>
        </table-page>
    </div>
</template>

<script>
    import {columns, pageData, searchParams, searchList, options} from "./data/OperationLog";
    import * as api from "../../http/api/log";
    import mixin from '../../common/mixin'

    export default {
        name: 'AddAndSubPoints',
        mixins: [mixin],
        data() {
            return {
                columns,
                pageData,
                searchParams,
                searchList,
                options,
                loading: false,
                tableData: [],
            }
        },
        created() {
            const {name, isMember} = this.$route.query;
            if (isMember) {
                this.searchParams.operator = '';
                this.searchParams.userName = name || ''
            } else {
                this.searchParams.userName = '';
                this.searchParams.operator = name || ''
            }
        },
        methods: {
            getTableList(currentPage) {
                currentPage && (this.pageData.page = currentPage);
                const {event} = this.searchParams;
                const [type, logName] = event;
                this.searchParams.type = type || '';
                this.searchParams.logName = logName || '';
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getLogList({page, limit, ...this.searchParams}).then(({data}) => {
                    this.pageData.total = data.total;
                    this.tableData = data.records;
                    this.loading = false
                })
            },
            // 将状态为文字
            transform(data, state) {
                const {type, logName} = data.props.row;
                const typeArr = options.find(item => item.value === type);
                if (state === 'type') {
                    return typeArr.label
                } else if (state === 'logName') {
                    return typeArr.children.find(item => item.value === logName).label
                }
            }
        }
    }
</script>
