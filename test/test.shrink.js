const chai = require('chai')

const path = require('path')
const fs = require('fs')
const exifr = require('exifr')

const shrink = require('../index')

function hasSameProps (obj1, obj2) {
  const obj1Props = Object.keys(obj1)
  const obj2Props = Object.keys(obj2)

  if (obj1Props.length === obj2Props.length) {
    return obj1Props.every(function (prop) {
      return obj2Props.indexOf(prop) >= 0
    })
  }

  return false
}

describe('Shrink', function () {
  describe('optimize png', async function () {
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'images/test.png'))
    const inputExif = await exifr.parse(fileBuffer, true)

    it('should optimize lossy png and strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer)
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossy_strip.png'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 1510000)
      chai.assert.isBelow(Buffer.byteLength(res), 1520000)
      chai.assert.isFalse(hasSameProps(inputExif, outputExif))
    })

    it('should optimize lossy png and not strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { strip: false })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossy_no_strip.png'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 1510000)
      chai.assert.isBelow(Buffer.byteLength(res), 1520000)
      chai.assert.isTrue(hasSameProps(inputExif, outputExif))
    })

    it('should optimize lossless png and strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { compression: 'lossless', strip: true })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossless_strip.png'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 4440000)
      chai.assert.isBelow(Buffer.byteLength(res), 44500000)
      chai.assert.isFalse(hasSameProps(inputExif, outputExif))
    })

    it('should optimize lossless png and not strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { compression: 'lossless', strip: false })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossless_no_strip.png'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 4440000)
      chai.assert.isBelow(Buffer.byteLength(res), 44500000)
      chai.assert.isTrue(hasSameProps(inputExif, outputExif))
    })
  })

  describe('optimize jpeg', async function () {
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'images/test.jpg'))
    const inputExif = await exifr.parse(fileBuffer, true)

    it('should optimize lossless jpeg and strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { compression: 'lossless', strip: true })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossless_strip.jpg'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 771500)
      chai.assert.isBelow(Buffer.byteLength(res), 771510)
      chai.assert.isFalse(hasSameProps(inputExif, outputExif))
    })

    it('should optimize lossless jpeg and not strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { compression: 'lossless', strip: false })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossless_no_strip.jpg'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 771720)
      chai.assert.isBelow(Buffer.byteLength(res), 771730)
      chai.assert.isTrue(hasSameProps(inputExif, outputExif))
    })

    it('should optimize lossy jpeg and strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { strip: true })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossy_strip.jpg'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 420500)
      chai.assert.isBelow(Buffer.byteLength(res), 420510)
      chai.assert.isFalse(hasSameProps(inputExif, outputExif))
    })

    it('should optimize lossy jpeg and not strip metadata', async function () {
      const res = await shrink.optimize(fileBuffer, { strip: false })
      const outputExif = await exifr.parse(res, true)

      fs.writeFileSync(path.join(__dirname, 'images/out/test_lossy_no_strip.jpg'), res)

      chai.assert.isAbove(Buffer.byteLength(res), 420710)
      chai.assert.isBelow(Buffer.byteLength(res), 420720)
      chai.assert.isTrue(hasSameProps(inputExif, outputExif))
    })
  })
})
