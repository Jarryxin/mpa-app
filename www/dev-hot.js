import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpackConfig from '../webpack/webpack.config.dev'
import commonWebpackConfig from '../webpack/webpack.common'

const compiler = webpack(webpackConfig)

module.exports = {
  devMiddleware: devMiddleware(compiler, {
    publicPath: commonWebpackConfig.output.publicPath,
    noInfo: true,
    quiet: true,
    stats: {
      colors: true,
      chunks: false
    }
  }),
  hotMiddleware: hotMiddleware(compiler)
}