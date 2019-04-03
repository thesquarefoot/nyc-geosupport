#!/bin/bash
OUT_DIR=source-data
TMP_FILE_NAME=source-data.zip

[ `uname` == "Linux" ] || { echo "Only Linux OS is supported."; exit 1; }
mkdir -p $OUT_DIR

[ -s geosupport-base.zip ] || curl -L https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gdelx_18c.zip -o geosupport-base.zip
unzip -nq geosupport-base.zip -d "$OUT_DIR" && rm geosupport-base.zip

[ -s geosupport-data.zip ] || curl -L https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/linux_upad_tpad_19a3.zip -o geosupport-data.zip
unzip -oq geosupport-data.zip -d "$OUT_DIR/version-18c_18.3/fls" && rm geosupport-data.zip
