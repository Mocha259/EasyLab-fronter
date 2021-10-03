module.exports = {
    devServer: {
 
        proxy: {
            '/api': {
                target: 'http://rap2.taobao.org',
                changeOrigin: true,
 
            },
        }
    }
}