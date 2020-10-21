const imageminJpegtran = require('imagemin-jpegtran')

module.exports = function (options) {
  options = {
    strip: true,
    progressive: true,
    ...options
  }

  return imageminJpegtran(options)
}
