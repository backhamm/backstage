<template>
    <div>
        <table-search :searchList="searchList" :params.sync="searchParams" @search="getTableList(1)"></table-search>
        <table-page
                :tableData="tableData"
                :columns="columns"
                :pageData.sync="pageData"
                :loading="loading"
        >
        </table-page>
    </div>

</template>

<script>
    import {columns, pageData, searchList, searchParams} from "./data/OnlineUser";
    import {getOnlineUser} from "../../http/api/account";
    import mixin from '../../common/mixin'

    export default {
        name: 'OnlineUser',
        mixins: [mixin],
        data() {
            return {
                loading: false,
                columns,
                pageData,
                searchList,
                searchParams,
                tableData: []
            }
        },
        methods: {
            getTableList(currentPage) {
                currentPage && (this.pageData.page = currentPage);
                this.loading = true;
                const {page, limit} = this.pageData;
                getOnlineUser({page, limit, ...this.searchParams}).then(({data}) => {
                    this.pageData.total = data.total;
                    this.tableData = data.records;
                    this.loading = false
                })
            }
        }
    }
</script>
