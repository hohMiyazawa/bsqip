Low bandwidth images can be approximated by SVG shapes, as shown by [sqip](https://github.com/axe312ger/sqip) and [primitive](https://github.com/fogleman/primitive).

bsqip aims to further improve compression by using a compact binary format for the generated SVG. This will be competitive to gziped SVG at low file sizes, and less so at larger file sizes.

For larger files, look into the progressive capabilities of [mozjpeg](https://github.com/mozilla/mozjpeg)

# tools

- Native bsqip encoder and decoder, based on the SVG generated by primitive (TODO)
- Javascript bsqip decoder (TODO)

# building

Run GNU make

```make```

# usage

```
bsqip [options] -e -i infile.svg -o outfile.bsqip
bsqip -d -i infile.bsqip -o outfile.svg

-c int  Colour type. 0=8bit greyscale, 1=8bit colour, 2=16bit truecolour (default), 3=24bit rgb
-m int  Shape primitive. 0=triangles (default), 1=rectangles, 2=circles
```
