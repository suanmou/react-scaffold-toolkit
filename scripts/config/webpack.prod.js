const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 800000,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // node_modules内的依赖库
          chunks: 'initial', // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
          test: /[/\\]node_modules[/\\]/,
          name: 'vendor',
          minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100, // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        common: {
          // ‘src/js’ 下的js文件
          chunks: 'all',
          test: /[/\\]src[/\\]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
          name: 'common', // 生成文件名，依据output规则
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: false,
        uglifyOptions: {
          ecma: 6,
          warnings: false,
          compress: {
            drop_debugger: true,
            pure_funcs: ['console.log'],
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
  },
}
// if (
//     process.env.npm_lifecycle_event == 'build:watch' ||
//     process.env.npm_lifecycle_event == 'build:win' ||
//     process.env.npm_lifecycle_event == 'build'
// ) {
//     prodConfig = merge(prodConfig, {
//         devtool: 'cheap-source-map'
//     });
// }
// if (process.env.npm_lifecycle_event === 'build:report') {
//     const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//     prodConfig.plugins.push(new BundleAnalyzerPlugin());
// }
module.exports = merge(baseConfig, prodConfig)
