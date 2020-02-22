import Koa from 'koa'
import chokidar from 'chokidar'
import path from 'path'
import history from 'koa2-history-api-fallback'

const app = new Koa()

let router = require('./hot-files/router')

app.use((ctx, next) => router.routes()(ctx, next)).use(router.allowedMethods())
app.use(history({
  rewrites: [{
    from: /^\/[a-zA-Z0-9/]+$/,
    to: function(context) {
      const { pathname } = context.parsedUrl
      const page = pathname.match(/^\/[^/]*/)[0].substr(1)
      return `/${page}.html`
    }
  }]
}))

app.on('error', (err, ctx) => {
  console.error(`Server error: ${err.stack} \n ctx: ${JSON.stringify(ctx)}`)
})

app.listen(3000, console.info('Server is ready for http://localhost:3000'))

process.on('uncaughtException', (err) => {
  console.log(err)
  console.error('uncaughtException:', err.message)
  if (err.message.indexOf(' EADDRINUSE ') > -1) {
    process.exit()
  }
})

process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection: ${err.message}`)
})

if (process.env.NODE_ENV === 'development') {
  const devHot = require('./dev-hot')
  const { devMiddleware, hotMiddleware } = devHot
  app.use(devMiddleware)
  app.use(hotMiddleware)

  const watcher = chokidar.watch(path.resolve(__dirname, './hot-files'))
  watcher.on('ready', () => {
    console.info(`will watching at ${path.resolve(__dirname, './hot-files')}`)
    watcher.on('all', (event, file) => {
      console.info(`server-side hot-reload due to: ${file}`)
      Object.keys(require.cache).forEach((id) => {
        if (/\/hot-files\//.test(id)) {
          cleanCache(id)
          try {
            if (id.endsWith('router.js')) {
              router = require('./hot-files/router')
            }
          } catch (e) {
            console.error(`module ${id} update failed`)
          }
        }
      })
    })
  })
}

function cleanCache(modulePath) {
  const module = require.cache[modulePath]
  if (module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1)
  }
  delete require.cache[modulePath]
}
