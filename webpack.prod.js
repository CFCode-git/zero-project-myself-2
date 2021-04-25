const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  cache: {
    type: 'filesystem'
  },
  entry: {
    index: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:10]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
               @import '~@src/scss-vars.scss';
              `,
            },
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    // new OptimizeCssAssetsPlugin({
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: {
    //     safe: true,
    //     autoprefixer: false,
    //     discardComments: {removeAll: true},
    //     canPrint: true
    //   }
    // })
  ],
  optimization:{
    moduleIds:'deterministic',
    runtimeChunk:"single",
    splitChunks:{
      cacheGroups:{
        vendor:{
          priority:10,
          minSize:0,
          test:/[\\/]node_modules[\\/]/,
          name:'vendors',
          chunks: 'all'
        },
        common: {
          priority: 5,
          minSize: 0,
          minChunks: 2,
          chunks: 'all',
          name: 'common'
        }
      }
    },
    // minimizer: [
    //   new TerserPlugin({
    //     parallel: true,
    //   }),
    // 不能将 OptimizeCssAssetsPlugin 配置在这里，否则需要同时配置 terser-plugin；minimizer 的配置会覆盖 webpack 默认的配置 https://webpack.docschina.org/configuration/optimization/#optimizationminimize
    //   new OptimizeCssAssetsPlugin({
    //     cssProcessor: require('cssnano'),
    //     cssProcessorOptions: {
    //       safe: true,
    //       autoprefixer: false,
    //       discardComments: {removeAll: true},
    //       canPrint: true
    //     }
    //   })
    // ]
    minimizer:[
      // new OptimizeCssAssetsPlugin({
      //   cssProcessor: require('cssnano'),
      //   cssProcessorOptions: {
      //     safe: true,
      //     autoprefixer: false,
      //     discardComments: {removeAll: true},
      //     canPrint: true
      //   }
      // }),
      new CssMinimizerPlugin(),
      '...' // 可以用 ... 访问默认值放在这里，防止覆盖
    ]
  }
})
