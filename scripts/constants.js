const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../') // 项目根目录
const srcDir = path.resolve(__dirname, '../src') // 项目代码目录
const isDev = process.env.NODE_ENV === 'development'
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '9000'
module.exports = {
  PROJECT_PATH,
  HOST,
  PORT,
  srcDir,
  isDev,
}
