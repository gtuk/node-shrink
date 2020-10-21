const imagemin = require('imagemin')

const lossless = require('./lossless')
const lossy = require('./lossy')

/**
 * Optimize image files
 *
 * @param buffer
 * @param options
 * @returns {Promise<*>}
 */
module.exports.optimize = async function (buffer, options) {
  if (options === undefined) {
    options = {}
  } else if (typeof options !== 'object') {
    throw Error('Options parameter is invalid')
  }

  const defaultOptions = {
    compression: 'lossy',
    strip: true
  }

  options = { ...defaultOptions, ...options }

  // Validate options
  if (options.compression !== 'lossy' && options.compression !== 'lossless') {
    throw Error('compression option must be either lossy or lossless. Default values is lossy.')
  }

  if (options.strip !== false && options.strip !== true) {
    throw Error('strip option must be either true or false. Default value is true.')
  }

  let plugins

  if (options.compression === 'lossy') {
    plugins = lossy.getPlugins(buffer, options)
  } else {
    plugins = lossless.getPlugins(buffer, options)
  }

  const result = await imagemin.buffer(buffer, {
    plugins: plugins
  })

  if (result === undefined || result.length === 0) {
    throw Error('Couldn\'t optimize image')
  }

  return result
}
