<template>
    <div class="table-content">
            <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="tableData"
                    border
                    stripe
                    :height="tableHeight"
                    :row-style="{lineHeight: '26px'}"
                    size="mini"
                    @selection-change="handleSelectionChange"
            >
                <!--排序-->
                <el-table-column v-if="columns.type === 'index' && !isMB" type="index" width="40"></el-table-column>
                <!--选择框-->
                <el-table-column v-if="columns.type === 'select'" :selectable="row => !disabledList.includes(row.id)" type="selection" width="40"></el-table-column>
                <!--列表项-->
                <el-table-column
                        v-for="item of columns.list"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :key="item.key"
                        align="center"
                        show-overflow-tooltip
                        :fixed="item.fixed && isMB"
                >
                    <div v-if="item.slot" slot-scope="scope">
                        <slot :name="item.slot" :props="scope"></slot>
                    </div>
                    <div v-else slot-scope="scope">
                        {{scope.row[item.prop]}}
                    </div>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-if="pageData"
                    @size-change="(val) => handlePageChange({limit: val, page: 1})"
                    @current-change="(val) => handlePageChange({page: val})"
                    :current-page="pageData.page"
                    :page-sizes="pageData.pageSizes"
                    :page-size="pageData.limit"
                    :pager-count="5"
                    :layout="layout"
                    :total="pageData.total">
            </el-pagination>
</div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'TablePage',
        props: {
            tableData: {
                type: Array,
                default: null
            },
            columns: {
                type: Object,
                default: null
            },
            pageData: {
                type: Object,
                default: null
            },
            loading: {
                type: Boolean,
                default: null
            },
            height: {
                type: [Number, String],
                default: 'calc(100vh - 160px)'
            }
        },
        data() {
            return {
                selection: null,
                layoutList: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
                layout: '',
                tableHeight: null
            }
        },
        mounted() {
            this.$bus.$on('selectedListFun', (data) => {
                this.$nextTick(() => {
                    data.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                });
            });
            this.layout = this.isMB ? this.layoutList.slice(2).join(',') : this.layoutList.join(',')
            if (this.isMB && typeof this.height === 'string') {
                const vh = window.innerHeight + 10 + 'px';
                this.tableHeight = this.height.replace('100vh', vh);
            } else {
                this.tableHeight = this.height
            }
        },
        destroyed() {
            this.$bus.$off('selectedListFun');
            this.setState(['tableSelect', []]);
            this.setState(['disabledList', []])
        },
        computed: mapState(['disabledList', 'isMB']),
        methods: {
            ...mapActions(['setState', 'setTableSelect']),
            // 每页显示条数或当前页切换
            handlePageChange(val) {
                let pageData = JSON.parse(JSON.stringify(this.pageData));
                pageData = {...pageData, ...val};
                this.$emit('update:pageData', pageData);
            },
            // select选中的列
            handleSelectionChange(val) {
                this.setTableSelect(['tableSelect', val]);
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-content {
        width: 100%;
        font-size: 0;
        text-align: center;
        background: #fff;
        color: #333;
    }
</style>
