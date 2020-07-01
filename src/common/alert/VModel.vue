<template>
    <transition name="show">
        <div class="model" v-if="visible">
            <div class="model-content" :style="cardStyle">
                <div class="title">{{data.title}}</div>
                <div v-if="data.type === 'prompt'" class="main" v-html="data.message"></div>
                <div v-else-if="data.type === 'auth' || data.type === 'subAuth'" class="main">
                    <counter-list style="width: 70%; margin: 0 auto" :selectedList="data.selectedList" :height="332" :type="data.type"></counter-list>
                </div>
                <div v-else class="main two-columns">
                    <template v-for="item of data.list">
                        <div v-if="item.sort === 'crossColumn'" class="cross-column" :key="item.key">
                            <div class="item-title">{{item.title}}:</div>
                            <div class="item-main" v-if="item.type === 'table'">
                                <counter-list :selectedList="data.selectedList"></counter-list>
                                <div style="line-height: 1.5;color: #E6A23C">{{item.tips}}</div>
                            </div>
                        </div>
                        <div v-else class="tow-item" :style="{width: data.type === 'single' ? '100%' : ''}" :key="item.key">
                            <div class="item-wrapper">
                                <div class="item-title">{{item.title}}:</div>
                                <el-select v-if="item.type === 'select'" class="item-main" v-model="data.params[item.key]" size="mini">
                                    <el-option v-for="option in item.options" :key="option.id" :label="option.name" :value="option.id"></el-option>
                                </el-select>
                                <el-switch
                                        v-else-if="item.type === 'switch'"
                                        class="item-main switch"
                                        v-model="data.params[item.key]"
                                        active-color="#E6A23C"
                                        :active-text="item.active"
                                        :inactive-text="item.inactive"
                                        active-value="0"
                                        inactive-value="1">
                                </el-switch>
                                <div v-else-if="item.type === 'input-prompt'" class="item-main">
                                    <el-input v-model="data.params[item.key]" :placeholder="item.placeholder" :disabled="item.disabled" :type="item.inputType || 'text'" size="mini">
                                        <template slot="append" v-if="item.append">{{item.append}}</template>
                                    </el-input>
                                    <div style="line-height: 1;margin-top: -5px;color: red;white-space: nowrap;" v-html="item.prompt"></div>
                                </div>
                                <el-input v-else-if="item.type === 'textarea'" class="item-main" type="textarea" v-model="data.params[item.key]"></el-input>
                                <el-input v-else class="item-main" v-model.trim="data.params[item.key]" :placeholder="item.placeholder || item.errMsg" :disabled="item.disabled" :type="item.inputType || 'text'" :maxlength="item.maxlength" size="mini"></el-input>
                                <div v-if="item.must" class="must">*</div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="footer">
                    <el-button :loading="isRequest" class="btn" @click="confirm">确定</el-button>
                    <el-button class="btn" @click="close">取消</el-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import CounterList from './components/CounterList'
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'VModel',
        components: {CounterList},
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            cardStyle: {
                type: Object,
                default: null
            },
            data: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                copyParams: {}
            }
        },
        computed: mapState(['isRequest']),
        watch: {
            visible(val) {
                if (val) {
                    this.copyParams = JSON.parse(JSON.stringify(this.data))
                } else {
                    this.$emit('update:data', JSON.parse(JSON.stringify(this.copyParams)))
                }
            }
        },
        methods: {
            ...mapActions(['setState']),
            confirm() {
                if (this.isRequest) return;
                if (this.data.list) {
                    for (let i = 0; i < this.data.list.length; i++) {
                        const item = this.data.list[i];
                        const params = this.data.params[item.key];
                        if (item.must && !params && params !== 0) {
                            return this.$notification({
                                title: `请正确填写必填项: ${this.data.list[i].title}！`
                            })
                        }
                        if (item.reg && !item.reg.test(params)) {
                            return this.$notification({
                                title: this.data.list[i].title + item.errMsg
                            })
                        }
                    }
                }
                this.setState(['isRequest', true]);
                this.$emit('confirm')
            },
            close() {
                this.setState(['isRequest', false]);
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style lang="less" scoped>
    .model {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2001;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, .2);
        opacity: 1;
        transition: all .2s;

        .model-content {
            transform-origin: top;
            transform: perspective(700px) rotateX(0);
            width: 1000px;
            text-align: center;
            border-radius: 5px;
            opacity: 1;
            background: #222;
            color: #eee;
            transition: all .2s;

            .title {
                line-height: 50px;
                border-bottom: 1px solid #666;
                font-size: 16px;
                color: #E6A23C;
            }

            .main {
                padding: 20px;
                font-size: 12px;

                .model-item {
                    display: flex;
                    width: 100%;
                    height: 45px;
                    line-height: 45px;

                    .item-text {
                        width: 40%;
                        padding-right: 10px;
                        text-align: right;
                    }

                    .item-input {
                        width: 200px;
                        text-align: left;
                    }
                }
            }

            .two-columns {
                max-height: 610px;
                overflow: auto;
                line-height: 50px;
                text-align: left;

                .cross-column {
                    display: flex;
                    margin-top: 10px;

                    .item-title {
                        width: 20%;
                        padding-right: 20px;
                        text-align: right;
                    }
                    .item-main {
                        width: 680px;
                    }
                }

                .tow-item {
                    display: inline-block;
                    width: 50%;

                    .item-wrapper {
                        display: flex;

                        .item-title {
                            width: 40%;
                            padding-right: 20px;
                            text-align: right;
                        }

                        .item-main {
                            width: 200px;

                            &.switch {
                                height: 50px;

                                /deep/ .el-switch__label{
                                    color: #eee;

                                    &.is-active {
                                        color: #E6A23C;
                                    }
                                }
                            }
                        }
                    }
                }

                .must {
                    margin-left: 5px;
                    color: red;
                }
            }

            .footer {
                line-height: 60px;
                border-top: 1px solid #666;

                .btn {
                    padding: 7px 20px;
                    border-radius: 5px;
                    background: none;
                    border: 1px solid #999;
                    color: #eee;

                    &:first-child {
                        margin-right: 80px;
                        color: #fff;
                        border: none;
                        background: #E6A23C;
                    }
                }
            }
        }

        &.show-enter, &.show-leave-to {
            opacity: 0;

            .model-content {
                transform: rotateX(40deg);
                opacity: 0;
            }
        }
    }
</style>
