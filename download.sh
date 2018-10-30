#!/bin/bash
VERSION=18b
OUT_DIR=source-data
TMP_FILE_NAME=source-data.zip

[ `uname` == "Linux" ] || { echo "Only Linux OS is supported."; exit 1; }
[ -d "$OUT_DIR" ] && exit 0;
[ -s "$TMP_FILE_NAME" ] || curl -L https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gdelx_$VERSION.zip -o "$TMP_FILE_NAME"
unzip -nq "$TMP_FILE_NAME" -d "$OUT_DIR" && rm "$TMP_FILE_NAME"
