const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:'[name].js',
    chunkFilename:'[name].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
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
          'style-loader',
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
    ]
  }
})
