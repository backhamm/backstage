<template>
    <div class="container">
        <v-header @switchSlide="showSlide = true"></v-header>
        <div class="main">
            <div class="sidebar" v-if="!isMB">
                <side-list></side-list>
            </div>
            <transition v-else name="show">
                <div v-if="showSlide" @click.self="showSlide = false" class="slider-mask">
                    <div class="sidebar">
                        <side-list @switchSlide="showSlide = false"></side-list>
                    </div>
                </div>
            </transition>
            <div class="content">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"/>
            </div>
        </div>
    </div>
</template>

<script>
    import VHeader from './components/header';
    import SideList from './components/sideList';
    import {mapState} from 'vuex'

    export default {
        name: 'DefaultLayout',
        components: {
            VHeader,
            SideList
        },
        computed: mapState(['isMB']),
        data() {
            return {
                showSlide: false
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #111;

        .main {
            flex: 1;
            display: flex;
            padding: 10px 10px 0;
            overflow: hidden;

            .sidebar {
                width: 300px;
                height: calc(100% - 15px);
                padding: 15px;
                overflow-x: hidden;
                overflow-y: auto;
                border-radius:10px;
                background:rgba(34,34,34,1);
            }

            .content {
                flex: 1;
                height: 100%;
                overflow: auto;
                overflow-x: hidden;
                padding: 0 10px 0 20px;
            }
        }
    }
    .mb {
        .slider-mask {
            position: fixed;
            z-index: 2001;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(7, 17, 27, .5);
            backdrop-filter: blur(5px);
            transition: all .2s;

            .sidebar {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                transition: all .2s;
            }

            &.show-enter, &.show-leave-to {
                opacity: 0;
                .sidebar {
                    left: -300px;
                }
            }
        }

        .main {
            padding: 5px;

            .content {
                padding: 0;
            }
        }
    }
</style>
