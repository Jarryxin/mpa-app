const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const common = require('./webpack.common')

const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  entry: {
    index: ['sanitize.css', 'webpack-hot-middleware/client', './src/index.js'],
    a: ['sanitize.css', 'webpack-hot-middleware/client', './src/a.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
      __PRODUCTION__: false,
    }),
    new webpack.DllReferencePlugin({
      context: SRC_PATH,
      manifest: require('../static/dll/vendor-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index1.html',
      template: path.resolve(__dirname, '../public/index.html'),
      chunksSortMode: 'dependency',
      chunks: ['index', 'vendor']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index2.html',
      template: path.resolve(__dirname, '../public/index.html'),
      chunksSortMode: 'dependency',
      chunks: ['a', 'vendor']
    }),
    new AddAssetHtmlPlugin(
      {
        // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
        filepath: path.resolve(__dirname, '../static/dll/vendor_library.js'),
        hash: true,
      }
    ),
    new CaseSensitivePathsPlugin(),
    new ProgressBarPlugin({
      format: '  build ' + '\x1B[32m' + '[:bar] ' + ':percent' + '\x1B[0m' + ' (:elapsed seconds)',
      clear: false
    }),
  ],
})
