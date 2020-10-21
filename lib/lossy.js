const isPng = require('is-png')
const isJpg = require('is-jpg')

const Pngquant = require('./encoders/pngquant')
const Mozjpeg = require('./encoders/mozjpeg')

const lossless = require('./lossless')

module.exports.getPlugins = function (buffer, options) {
  let plugins = []

  if (isPng(buffer)) {
    plugins.push(Pngquant(options))
  } else if (isJpg(buffer)) {
    plugins.push(Mozjpeg(options))
  }

  // Run through lossless compression after lossy compression
  plugins = plugins.concat(lossless.getPlugins(buffer, options))

  return plugins
}
