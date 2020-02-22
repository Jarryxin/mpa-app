const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const src = path.resolve(__dirname, '../src')
const staticSrc = path.resolve(__dirname, '../static')
const env = process.env.NODE_ENV

module.exports = {
  mode: env,
  entry: {
    vendor: [path.resolve(staticSrc, 'vendor.js')]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
        extractComments: true
      }),
    ],
  },
  output: {
    path: path.join(staticSrc, 'dll'),
    filename: '[name]_library.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: src,
      path: path.join(staticSrc, 'dll', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
