const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ' http://10.180.209.171:3000/yuxin', // Replace with your server's URL
      changeOrigin: true,
    })
  );
};