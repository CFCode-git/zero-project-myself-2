const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    index: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:'[name].[chunkhash].js',
    chunkFilename:'[name].[chunkhash].js'
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
  plugins:[
    new MiniCssExtractPlugin({
      filename:'[name].[contenthash].css',
      chunkFilename:'[name].[contenthash].css',
    })
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
          chunks:'all'
        },
        common:{
          priority: 5,
          minSize:0,
          minChunks:2,
          chunks:'all',
          name:'common'
        }
      }
    }
  }
})
