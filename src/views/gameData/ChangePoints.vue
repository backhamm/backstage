<template>
    <div>
        <table-search :searchList="searchList" :params.sync="searchParams" @search="getTableList(1)"></table-search>
        <table-page
                class="total-table"
                :tableData="tableData"
                :columns="columns"
                :loading="loading"
                :pageData.sync="pageData"
        >
            <div slot="money" slot-scope="data" v-if="data.props.row.money !== undefined">
                <span :style="{color: data.props.row.money >= 0 ? '#67c23a' : 'red'}">{{data.props.row.money}}</span>
            </div>
            <span slot="type" slot-scope="data" v-if="data.props.row.type !== undefined">{{data.props.row.type ? '下分' : '上分'}}</span>
            <span slot="time" slot-scope="data">{{data.props.row.time * 1000 | dateFormat}}</span>
        </table-page>
    </div>
</template>

<script>
    import {columns, searchParams, searchList, pageData } from "./data/ChangePoints";
    import * as api from "../../http/api/gameData";
    import mixin from '../../common/mixin'

    export default {
        name: 'ChangePoints',
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
        methods: {
            getTableList(currentPage) {
                currentPage && (this.pageData.page = currentPage);
                this.loading = true;
                const {page, limit} = this.pageData;
                api.getGameTransfer({page, limit, ...this.searchParams}).then(({data}) => {
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
