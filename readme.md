# node-shrink

> Optimize images seamlessly (lossy or lossless)

## Install

```
$ yarn add gtuk/node-shrink#master
```

## Usage

| Image format | Lossy |  Lossless |
|----------|:-------------:|------:|
| JPEG | mozjpeg | jpegtran / jpegoptim       |
| PNG | pngquant   |   optipng / pngcrush / pngout / advpng / oxipng |
| GIF | giflossy |    gifsicle |
| WEBP | cwebp |    cwebp |
