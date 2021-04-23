let config = ''
config = process.env.NODE_ENV === 'development' ? require('./webpack.dev') : require('./webpack.prod')

module.exports = config
