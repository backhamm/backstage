<template>
  <h1 style="color: #eee">暂无页面</h1>
</template>

<script>
  // import { mapActions } from 'vuex'

  export default {
    name: 'Exception',
    props: {
      type: {
        type: String,
        default: '404'
      }
    },
    methods: {
      // ...mapActions(['Logout']),
      // handleToHome () {
      //   this.Logout()
      // }
    }
  }
</script>
<style lang="less" scoped>
</style>
