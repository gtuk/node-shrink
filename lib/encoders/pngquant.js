const imageminPngquant = require('imagemin-pngquant')

module.exports = function (options) {
  options = {
    strip: true,
    ...options
  }

  return imageminPngquant(options)
}
