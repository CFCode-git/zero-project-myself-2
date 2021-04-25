const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const {ModuleFederationPlugin} = require('webpack').container


module.exports = {
  // cache: {
  //   type: 'filesystem',
  //   cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@image': path.resolve(__dirname, 'src/assets/image')
    }
  },
  module: {
    rules: [
      {
        test: /\.([jt])sx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc:false,
              presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
              plugins: [
                ['import',{libraryName:'antd',libraryDirectory:'lib',style:true}]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  //   new ModuleFederationPlugin({
  //     name:'project',
  //     remotes:{
  //       'project2':'project2@http://localhost:8888/federation.js'
  //     }
  //   })
  ],
  devServer: {
    historyApiFallback: true,
    port:3000
  },
}
