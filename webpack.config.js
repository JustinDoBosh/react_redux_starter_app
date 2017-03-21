'use strict'

const PACKAGE_VERSION = String(require('./package.json').version)

module.exports = [
  require('./webpack/webpack.client.config.js')(PACKAGE_VERSION),
  require('./webpack/webpack.server.config.js')(PACKAGE_VERSION)
]
