import Router from 'koa-router'
import path from 'path'
const router = new Router()
import commonWebpackConfig from '../../webpack/webpack.common'

router.get('/', async(ctx, next) => {
  ctx.body = '123'
  next()
})

module.exports = router
