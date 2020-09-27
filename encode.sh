#!/bin/bash

# create bsqip file with default settings using primitive https://github.com/fogleman/primitive
# usage:
# ./encode.sh shapeNumber infile outfile

read width height < <(identify -format "%w %h" "$2")
primitive -s $width -r 128 -m 1 -n $1 -i "$2" -o "$2".svg
if [ -f "./bsqip" ]; then
	./bsqip -c 2 -m 0 -e -i "$2".svg -o "$3"
else 
	bsqip -c 2 -m 0 -e -i "$2".svg -o "$3"
fi
