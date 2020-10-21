const imageminPngcrush = require('imagemin-pngcrush')

module.exports = function (options) {
  options = {
    strip: true,
    brute: false,
    ...options
  }

  return imageminPngcrush(options)
}
