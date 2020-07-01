export default {
    mounted() {
        this.getTableList()
    },
    watch: {
        pageData() {
            this.getTableList()
        }
    }
}
