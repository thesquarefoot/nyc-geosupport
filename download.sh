#!/bin/bash
[ `uname` == "Linux" ] || { echo "Only Linux OS is supported."; exit 1; }
[ -s "source-data.zip" ] && exit 0;

VERSION=18b
OUT_DIR=source-data
curl http://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gdelx_$VERSION.zip -o source-data.zip
unzip source-data.zip -d $OUT_DIR && rm source-data.zip
