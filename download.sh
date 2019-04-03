#!/bin/bash
[ `uname` == "Linux" ] || { echo "Only Linux OS is supported."; exit 1; }

OUT_DIR=source-data
mkdir -p $OUT_DIR

[ -s geosupport-base.zip ] || curl -L https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/linux_geo19a_191.zip -o geosupport-base.zip
unzip -nq geosupport-base.zip -d "$OUT_DIR" 'version-19a_19.1/*' && rm geosupport-base.zip

[ -s geosupport-data.zip ] || curl -L https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/linux_upad_tpad_19a3.zip -o geosupport-data.zip
unzip -oq geosupport-data.zip -d "$OUT_DIR/fls" && rm geosupport-data.zip
