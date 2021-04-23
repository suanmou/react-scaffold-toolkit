const path = require('path')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const WebpackBar = require('webpackbar') // 进度条
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const os = require('os')
const HappyPack = require('happypack') // 多线程
const { isDev, PROJECT_PATH } = require('../constants')

const srcDir = path.resolve(PROJECT_PATH, './src')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
})
module.exports = {
  entry: {
    // main: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')]
    main: ['@babel/polyfill', path.resolve(srcDir, './index.tsx')],
  },
  output: isDev
    ? {
        path: path.resolve(PROJECT_PATH, './dist'),
        filename: 'assets/js/[name].js',
      }
    : {
        filename: 'assets/js/[name].[hash:8].js',
        chunkFilename: 'assets/js/chunk/[name].[hash:8].chunk.js',
        path: path.resolve(PROJECT_PATH, './dist'), // 必须是绝对路径
      },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.less', '.css'],
    alias: {
      '@': srcDir,
      '@components': path.resolve(PROJECT_PATH, './src/components'),
      // '@utils': path.resolve(PROJECT_PATH, './src/utils'),
      // '@config': path.resolve(PROJECT_PATH, './src/config'),

      // '@assets': path.join(PROJECT_PATH, "../assets"),
      // assets: path.join(PROJECT_PATH, "../assets"),
      // src: path.join(PROJECT_PATH, "../src"),
      // app: path.join(PROJECT_PATH, "../src/app"),
      // components: path.join(PROJECT_PATH, "../src/app/components"),
      // models: path.resolve(PROJECT_PATH, '../src/models'),
      '@images': path.resolve(PROJECT_PATH, './src/assets/images'),
      // utils: path.join(PROJECT_PATH, "../src/utils"),
      // images: path.join(PROJECT_PATH, "../assets/images")
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [srcDir],
        exclude: /(node_modules|bower_components)/,
        use: ['happypack/loader?id=happybabel'],
      },
      // {
      //     // 编译antd less
      //     test: /\.less$/,
      //     include: /node_modules/,
      //     use: [
      //         isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      //         {
      //             loader: 'css-loader' // translates CSS into CommonJS
      //         },
      //         {
      //             loader: 'postcss-loader'
      //         },
      //         {
      //             loader: 'less-loader', // compiles Less to CSS
      //             options: {
      //                 modifyVars: {
      //                     //   "@primary-color": "#1899da",
      //                     '@font-family': 'Arial'
      //                 }
      //             }
      //         }
      //     ]
      // },
      {
        test: /\.less$/,
        include: [srcDir],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:base64:5]',
          },
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')({
                  autoprefixer: {
                    grid: true,
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ],
              sourceMap: isDev,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [srcDir],
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp)(\?.*)?$/,
        loader: 'url-loader',
        include: [srcDir],
        options: {
          limit: 8192,
          outputPath: 'assets/images',
          name: '[name].[hash:base64:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:base64:8].[ext]',
          outputPath: 'assets/fonts',
        },
        include: [srcDir],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.ejs`,
      filename: 'index.html',
      inject: true,
      hash: false,
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
      // baseUrl: isDev ? './src' : '.',
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      // cache: true,
      verbose: true,
    }),
    new HardSourceWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(PROJECT_PATH, './src/assets/js'),
    //       to: path.resolve(PROJECT_PATH, './dist/assets/js'),
    //       toType: 'dir',
    //     },
    //   ],
    // }),
  ],
}
