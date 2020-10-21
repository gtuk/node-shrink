const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = function (options) {
  options = {
    quality: 75,
    progressive: true,
    ...options
  }

  return imageminMozjpeg(options)
}
