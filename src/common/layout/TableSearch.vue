<template>
    <div class="table-search">
        <slot name="add"></slot>
        <div class="mr-1" v-for="item of searchList" :key="item.key">
            <!--添加按钮-->
            <el-button v-if="item.type === 'add'" size="mini" type="warning" icon="el-icon-plus"
                       @click="$emit('showModel')">添加
            </el-button>
            <!--输入框-->
            <el-input v-else-if="item.type === 'input'" @keyup.13.native="$emit('search')" v-model.trim="params[item.key]"
                      class="input" clearable :placeholder="item.placeholder" size="mini" type="text"></el-input>
            <!--级联选择器-->
            <el-cascader v-else-if="item.type === 'cascader'" style="width: 180px;" :placeholder="item.placeholder" v-model="params[item.key]" size="mini" :options="item.options" clearable></el-cascader>
            <!--select选择器-->
            <div v-else-if="item.type === 'select'">
                {{item.title}}:
                <el-select v-model="params[item.key]" class="select" size="mini" clearable>
                    <el-option
                            v-for="option of item.options"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id">
                    </el-option>
                </el-select>
            </div>
            <!--时间选择器-->
            <div v-else-if="item.type === 'time'">
                <el-date-picker
                        v-model="params[item.key]"
                        size="mini"
                        style="width: 175px"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="item.title"
                        :default-time="item.defaultTime">
                </el-date-picker>
            </div>
            <!--查询按钮-->
            <el-button v-else-if="item.type === 'search'" size="mini" type="warning" icon="el-icon-search"
                       @click="$emit('search')">查询
            </el-button>
        </div>
        <slot name="last"></slot>
    </div>
</template>

<script>
    import {formatDate} from "../../utils/filter";

    export default {
        name: 'tableSearch',
        props: {
            params: {
                type: Object,
                default: null
            },
            searchList: {
                type: Array,
                default: null
            }
        },
        watch: {
            'params.startTime'(val) {
                !val && this.defaultTime('startTime')
            },
            'params.endTime'(val) {
                !val && this.defaultTime('endTime')
            }
        },
        created() {
            this.params.startTime !== undefined && this.defaultTime()
        },
        methods: {
            defaultTime(type) {
                if (this.params && !this.params.startTime) {
                    const now = new Date();
                    const params = JSON.parse(JSON.stringify(this.params));
                    if (type === 'startTime') {
                        params.startTime = formatDate(now, 'yyyy-mm-dd') + ' 00:00:00';
                    } else if (type === 'endTime') {
                        params.endTime = formatDate(now, 'yyyy-mm-dd') + ' 23:59:59';
                    } else {
                        params.startTime = formatDate(now, 'yyyy-mm-dd') + ' 00:00:00';
                        params.endTime = formatDate(now, 'yyyy-mm-dd') + ' 23:59:59';
                    }
                    this.$emit('update:params', params)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-search {
        display: flex;
        margin-bottom: 8px;
        width: 100%;
        white-space: nowrap;
        line-height: 30px;
        color: #eee;

        .input {
            width: 130px;
        }

        .select {
            width: 90px;
        }
    }
</style>
