<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'App',
        computed: mapState(['isMB']),
        mounted() {
            this.isMB && document.body.classList.add('mb');
        }
    }
</script>

<style>
    #app {
        width: 100%;
        height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 12px;
        color: #333;
    }
</style>
