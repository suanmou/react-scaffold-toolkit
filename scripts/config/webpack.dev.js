const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { PORT, HOST } = require('../constants')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: PORT,
    hot: true, // 热更新
    open: true, // 打开默认浏览器
    host: HOST,
    // 使用 inline模式 并代理 dev-server 时，内联客户端脚本并不总是知道要连接到哪里。 它将尝试基于 window.location 猜测服务器的 URL，但是如果失败，则需要使用它。
    public: `localhost:${PORT}`,
    historyApiFallback: true,
    compress: true, // 是否启用 gzip 压缩
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级

    proxy: {
      '/testapi': {
        target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/testapi': '',
        },
      },
    },
  },
  plugins: [new webpack.NamedChunksPlugin(), new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
})
