module.exports = {
  port: 8888,
  protocol: 'http',
  baseURL: '/ccsvm/desktop',
  host: 'localhost',
  proxy: {
    '/ccsvm/desktop': {
      target: 'http://192.168.254.220/ccsvm/desktop',
      changeOrigin: true,
      pathRewrite: { '^/ccsvm/desktop': '' },
      secure: false
    },
    '/api': {
      target: 'http://127.0.0.1:9999',
      changeOrigin: true,
      secure: false
    }
  }
}
