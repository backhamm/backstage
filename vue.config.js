module.exports = {
    devServer: {
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://192.168.108.11:8081/',
                // target: 'http://192.168.20.139:8088/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
