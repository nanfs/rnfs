const path = require('path')

const appDirectory = path.resolve(__dirname, '..')
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appDirectory,
  appDist: resolveApp('dist'),
  appDll: resolveApp('scripts/dll'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appBuildHtml: resolveApp('public/build.html'),
  appHtml: resolveApp('public/index.html'),
  favicon: resolveApp('public/favicon.ico'),
  appIndexJs: resolveApp('src/index.js'),
  fonts: resolveApp('src/components/MyIcon/fonts'),
  appPolyfills: resolveApp('config/polyfills.js'),
  appConfig: resolveApp('config')
}
