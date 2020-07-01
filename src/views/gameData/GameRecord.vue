<template>
    <div>
        <table-search :searchList="searchList" :params.sync="searchParams" @search="getTableList(1)">
            <div slot="add">
                <el-button class="mr-1" v-if="$route.query.name" @click="$router.go(-1)" size="mini" icon="el-icon-back" type="warning">返回</el-button>
            </div>
        </table-search>
        <table-page
                class="total-table subtotal-table"
                :tableData="tableData"
                :columns="columns"
                :loading="loading"
                :pageData.sync="pageData"
        >
            <div slot="rate" slot-scope="data" v-if="data.props.row.rate !== undefined">
                <span :style="{color: data.props.row.rate >= 0 ? '#67c23a' : 'red'}">{{data.props.row.rate}}</span>
            </div>
            <div slot="userProfit" slot-scope="data" v-if="data.props.row.userProfit !== undefined">
                <span :style="{color: data.props.row.userProfit >= 0 ? '#67c23a' : 'red'}">{{data.props.row.userProfit}}</span>
            </div>
            <span slot="sTime" slot-scope="data">{{data.props.row.sTime * 1000 | dateFormat}}</span>
            <span slot="eTime" slot-scope="data">{{data.props.row.eTime * 1000 | dateFormat}}</span>
        </table-page>
    </div>
</template>

<script>
    import {columns, pageData, searchParams, searchList } from "./data/GameRecord";
    import * as api from "../../http/api/gameData";
    import mixin from '../../common/mixin'

    export default {
        name: 'GameRecord',
        mixins: [mixin],
        data() {
            return {
                columns,
                pageData,
                searchParams,
                searchList,
                loading: false,
                tableData: [],
            }
        },
        created() {
            const {name, sTime, eTime} = this.$route.query;
            this.searchParams.userName = name || '';
            this.searchParams.startTime = sTime || '';
            this.searchParams.endTime = eTime || ''
        },
        methods: {
            getTableList(currentPage) {
                currentPage && (this.pageData.page = currentPage);
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getGameRecord({page, limit, ...this.searchParams}).then(({data}) => {
                    this.pageData.total = data.total;
                    if (data.total) {
                        this.tableData = data.records;
                    } else {
                        this.tableData = []
                    }
                    this.loading = false
                })
            }
        }
    }
</script>
