<template>
    <table-page
            :tableData="tableData"
            :columns="columns"
            :loading="loading"
            :height="height"
    ></table-page>
</template>

<script>
    import {columns, authList, chipsList} from "./data/CounterList";
    import {getBjlQuotaSet} from "../../../http/api/account";
    import {getAuthList} from "../../../http/api/jurisdiction";
    import {mapState} from 'vuex';

    export default {
        name: 'CounterList',
        props: {
            type: {
                type: String,
                default: null
            },
            height: {
                type: [Number, String],
                default: 300
            },
            selectedList: {
                type: Array,
                default: null
            }
        },
        data() {
            return {
                columns,
                loading: false,
                tableData: []
            }
        },
        computed: mapState(['currentUserInfo', 'addSubChipsId']),
        mounted() {
            this.getTableList();
        },
        methods: {
            getTableList() {
                this.loading = true;
                if (this.type === 'auth') {
                    this.columns.list = authList;
                    getAuthList().then(res => {
                        this.tableData = res.data;
                        if (this.selectedList.length) {
                            const selectedList = this.tableData.filter(item => this.selectedList.includes(item.resource));
                            this.$bus.$emit('selectedListFun', selectedList)
                        }
                        this.loading = false
                    });
                } else if (this.type === 'subAuth') {
                    this.columns.list = authList;
                    this.tableData = this.currentUserInfo.resources;
                    if (this.selectedList.length) {
                        const selectedList = this.tableData.filter(item => this.selectedList.includes(item.resource));
                        this.$bus.$emit('selectedListFun', selectedList)
                    }
                    this.loading = false
                } else {
                    this.columns.list = chipsList;
                    getBjlQuotaSet({id: this.addSubChipsId, isDisable: false}).then(res => {
                        this.tableData = res.data;
                        if (this.selectedList.length) {
                            const selectedList = this.tableData.filter(item => this.selectedList.includes(item.id));
                            this.$bus.$emit('selectedListFun', selectedList)
                        }
                        this.loading = false
                    })
                }
            }
        }
    }
</script>
