#!/bin/bash
[ `uname` == "Linux" ] || { echo "Only Linux OS is supported."; exit 1; }

OUT_DIR=source-data
mkdir -p "$OUT_DIR"

[ -s geosupport-base.zip ] || curl -L https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/linux_geo20d_20.4.zip -o geosupport-base.zip
unzip -nq geosupport-base.zip && rm geosupport-base.zip
mv version-20d_20.4/* -t "$OUT_DIR"

[ -s geosupport-data.zip ] || curl -L https://s-media.nyc.gov/agencies/dcp/assets/files/zip/data-tools/bytes/linux_upad_tpad_23d1.zip -o geosupport-data.zip
unzip -oq geosupport-data.zip -d "$OUT_DIR/fls" && rm geosupport-data.zip
