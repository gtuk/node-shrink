const isPng = require('is-png')
const isJpg = require('is-jpg')

const Pngcrush = require('./encoders/pngcrush')
const Jpegtran = require('./encoders/jpegtran')

module.exports.getPlugins = function (buffer, options) {
  const plugins = []

  if (isPng(buffer)) {
    /* optipng with optimizationLevel 0 gives sames file size as default optimizationLevel
     optimizationOptions.optimizationLevel = 0 */

    plugins.push(Pngcrush(options))
  } else if (isJpg(buffer)) {
    plugins.push(Jpegtran(options))
  }

  return plugins
}
